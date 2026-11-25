"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, VolumeX, X } from "lucide-react";
import type { VideoCarouselItem } from "@/config/online-content";

const AUTOPLAY_DELAY = 5000;

export function VideoCarousel({ items }: { items: ReadonlyArray<VideoCarouselItem> }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
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

  useEffect(() => {
    if (isPaused || modalIndex !== null || items.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [isPaused, items.length, modalIndex]);

  if (!items.length) return null;

  const goTo = (index: number) => setActiveIndex((index + items.length) % items.length);
  const openVideo = (index: number) => {
    setActiveIndex(index);
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

  const visibleIndexes = Array.from({ length: Math.min(5, items.length) }, (_, offset) => (activeIndex + offset) % items.length);

  return <div
    className="video-carousel"
    role="region"
    aria-roledescription="carousel"
    aria-label="BirthWave prenatal yoga videos"
    tabIndex={0}
    onKeyDown={handleKeyDown}
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
    onFocus={() => setIsPaused(true)}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false); }}
  >
    <div className="video-carousel-window">
      <button type="button" className="video-carousel-side-arrow video-carousel-side-arrow-left" onClick={() => goTo(activeIndex - 1)} aria-label="Previous video">
        <ArrowLeft size={20} aria-hidden="true" />
      </button>
      <div
        className="video-carousel-track"
        onPointerDown={(event) => { pointerStart.current = event.clientX; }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) return;
          const distance = event.clientX - pointerStart.current;
          pointerStart.current = null;
          if (Math.abs(distance) > 48) goTo(activeIndex + (distance < 0 ? 1 : -1));
        }}
        onPointerCancel={() => { pointerStart.current = null; }}
      >
        {visibleIndexes.map((index) => {
          const item = items[index];
          return <article className="video-carousel-card" key={`${item.id}-${index}`}>
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
      <button type="button" className="video-carousel-side-arrow video-carousel-side-arrow-right" onClick={() => goTo(activeIndex + 1)} aria-label="Next video">
        <ArrowRight size={20} aria-hidden="true" />
      </button>
    </div>

    <div className="video-carousel-controls" aria-label="Video carousel controls">
      <button type="button" className="video-autoplay-toggle" onClick={() => setIsPaused((paused) => !paused)} aria-label={isPaused ? "Resume carousel autoplay" : "Pause carousel autoplay"} title={isPaused ? "Resume autoplay" : "Pause autoplay"}>
        {isPaused ? <Play size={14} fill="currentColor" aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
      </button>
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
