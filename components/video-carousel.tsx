"use client";

import { createPortal } from "react-dom";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Play, VolumeX, X } from "lucide-react";
import type { VideoCarouselItem } from "@/config/online-content";

const AUTOPLAY_DELAY = 3000;
const compactCards = "(max-width: 700px)";
const mediumCards = "(max-width: 1150px)";

function subscribeToCardCount(onChange: () => void) {
  const queries = [window.matchMedia(compactCards), window.matchMedia(mediumCards)];
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

function getCardCount() {
  if (window.matchMedia(compactCards).matches) return 1;
  return window.matchMedia(mediumCards).matches ? 3 : 5;
}

const getServerCardCount = () => 5;

export function VideoCarousel({ items }: { items: ReadonlyArray<VideoCarouselItem> }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transition, setTransition] = useState<{ index: number; direction: number; adjacent: boolean } | null>(null);
  const cardCount = useSyncExternalStore(subscribeToCardCount, getCardCount, getServerCardCount);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);
  const [isPreviewFocused, setIsPreviewFocused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modalIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalIndex(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [modalIndex]);

  const goTo = useCallback((index: number) => {
    if (transition || index === activeIndex || items.length < 2) return;
    const nextIndex = (index + items.length) % items.length;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveIndex(nextIndex);
      return;
    }
    const direction = Math.sign(index - activeIndex);
    const adjacent = (activeIndex + direction + items.length) % items.length === nextIndex;
    if (!adjacent) setActiveIndex(nextIndex);
    setTransition({ index: nextIndex, direction, adjacent });
  }, [activeIndex, items.length, transition]);

  useEffect(() => {
    if (transition || isPreviewHovered || isPreviewFocused || modalIndex !== null || items.length < 2) return;
    const timer = window.setTimeout(() => goTo(activeIndex + 1), AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [activeIndex, goTo, isPreviewHovered, isPreviewFocused, items.length, modalIndex, transition]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!transition || !track) return;
    const { adjacent, direction, index } = transition;
    const first = track.children[0] as HTMLElement;
    const second = track.children[1] as HTMLElement | undefined;
    const distance = second ? second.offsetLeft - first.offsetLeft : 0;
    const frames = adjacent
      ? [
          { transform: `translateX(${direction < 0 ? -distance : 0}px)` },
          { transform: `translateX(${direction > 0 ? -distance : 0}px)` },
        ]
      : [
          { transform: `translateX(${direction * 40}px)`, opacity: 0.55 },
          { transform: "translateX(0)", opacity: 1 },
        ];
    const animation = track.animate(
      frames,
      { duration: adjacent ? 560 : 400, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" },
    );
    animation.onfinish = () => {
      setActiveIndex(index);
      setTransition(null);
    };
    return () => animation.cancel();
  }, [cardCount, transition]);

  if (!items.length) return null;

  const openVideo = (index: number) => {
    setIsPreviewFocused(false);
    goTo(index);
    setModalIndex(index);
  };
  const getFileUrl = (item: VideoCarouselItem) => encodeURI(item.src ?? "");
  const getEmbedUrl = (item: VideoCarouselItem, preview = false) => {
    const params = preview
      ? "autoplay=1&mute=1&controls=0&loop=1&playsinline=1&rel=0&modestbranding=1"
      : "autoplay=1&playsinline=1&rel=0&modestbranding=1";
    return `https://www.youtube.com/embed/${item.videoId}?${params}${preview ? `&playlist=${item.videoId}` : ""}`;
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      goTo(items.length - 1);
    }
  };

  const isSliding = transition?.adjacent === true;
  const isSlidingBackward = isSliding && transition.direction < 0;
  const firstIndex = activeIndex - Number(isSlidingBackward);
  const visibleCount = Math.min(cardCount, items.length);
  const visibleIndexes = Array.from({ length: visibleCount + Number(isSliding) }, (_, offset) => (
    (firstIndex + offset + items.length) % items.length
  ));

  return <div
    className="video-carousel"
    role="region"
    aria-roledescription="carousel"
    aria-label="BirthWave prenatal yoga videos"
    tabIndex={0}
    onKeyDown={handleKeyDown}
  >
    <div className="video-carousel-window">
      <button type="button" className="video-carousel-side-arrow video-carousel-side-arrow-left" onClick={() => goTo(activeIndex - 1)} aria-label="Previous video">
        <ArrowLeft size={20} aria-hidden="true" />
      </button>
      <div
        className="video-carousel-viewport"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setIsPreviewHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setIsPreviewHovered(false);
        }}
      >
      <div
        ref={trackRef}
        className="video-carousel-track"
        onFocus={() => setIsPreviewFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsPreviewFocused(false);
        }}
        onPointerDown={(event) => { pointerStart.current = event.clientX; }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) return;
          const distance = event.clientX - pointerStart.current;
          pointerStart.current = null;
          if (Math.abs(distance) > 48) goTo(activeIndex + (distance < 0 ? 1 : -1));
        }}
        onPointerCancel={() => { pointerStart.current = null; }}
      >
        {visibleIndexes.map((index, offset) => {
          const item = items[index];
          const isBuffer = isSliding && offset === (isSlidingBackward ? 0 : visibleCount);
          return <article className="video-carousel-card" key={`${item.id}-${isBuffer && items.length <= visibleCount ? "buffer" : index}`} inert={isBuffer}>
            <div className="video-card-media">
              {item.source === "file" ? <video
                className="video-carousel-preview video-file-preview"
                src={getFileUrl(item)}
                title={`${item.title} — muted preview`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              /> : <iframe
                className="video-carousel-preview"
                src={getEmbedUrl(item, true)}
                title={`${item.title} — muted preview`}
                loading="lazy"
                tabIndex={-1}
                aria-hidden="true"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />}
              <button type="button" className="video-card-open-overlay" onClick={() => openVideo(index)} aria-label={`Open ${item.title}`} />
              <button type="button" className="video-watch-button" onClick={() => openVideo(index)}>
                <Play size={13} fill="currentColor" aria-hidden="true" />
                <span>Watch video</span>
              </button>
              <span className="video-muted-label"><VolumeX size={12} aria-hidden="true" />Muted preview</span>
            </div>
            <button type="button" className="video-card-caption" onClick={() => openVideo(index)} aria-label={`Open ${item.title}`}>
              <span className="video-card-category">{item.category ?? "PRENATAL YOGA"}</span>
              <strong>{item.title}</strong>
              <span className="video-card-presenter">{item.presenter ?? "The BirthWave Care Team"}</span>
              <small>{item.role ?? "Prenatal Yoga Support"}</small>
            </button>
          </article>;
        })}
      </div>
      </div>
      <button type="button" className="video-carousel-side-arrow video-carousel-side-arrow-right" onClick={() => goTo(activeIndex + 1)} aria-label="Next video">
        <ArrowRight size={20} aria-hidden="true" />
      </button>
    </div>

    <div className="video-carousel-controls" aria-label="Video carousel controls">
      <div className="video-carousel-dots" role="tablist" aria-label="Choose a video">
        {items.map((item, index) => <button
          type="button"
          key={item.id}
          className={`video-carousel-dot${index === activeIndex ? " is-active" : ""}`}
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={`Show video ${index + 1}: ${item.title}`}
          onClick={() => goTo(index)}
        />)}
      </div>
    </div>

    {modalIndex !== null && typeof document !== "undefined" && createPortal(<div
      className="video-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => { if (event.target === event.currentTarget) setModalIndex(null); }}
    >
      <div className="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-modal-title">
        <div className="video-modal-header">
          <div>
            <p className="eyebrow">BIRTHWAVE VIDEO</p>
            <h3 id="video-modal-title">{items[modalIndex].title}</h3>
          </div>
          <button ref={closeButtonRef} type="button" className="video-modal-close" onClick={() => setModalIndex(null)} aria-label="Close video">
            <X size={21} aria-hidden="true" />
          </button>
        </div>
        <div className="video-modal-player-frame">
          {items[modalIndex].source === "file" ? <video
            className="video-modal-player video-file-modal-player"
            src={getFileUrl(items[modalIndex])}
            autoPlay
            controls
            playsInline
            preload="metadata"
          /> : <iframe
            className="video-modal-player"
            src={getEmbedUrl(items[modalIndex])}
            title={items[modalIndex].title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />}
        </div>
        <p className="video-modal-description">{items[modalIndex].description}</p>
      </div>
    </div>, document.body)}
  </div>;
}
