"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { galleryImages } from "@/config/prenatal-gallery";
import styles from "./prenatal-gallery.module.css";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(change: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", change);
  return () => query.removeEventListener("change", change);
}
const reducedSnapshot = () => window.matchMedia(motionQuery).matches;

function GalleryRow({ paused }: { paused: boolean }) {
  const images = galleryImages;
  const railRef = useRef<HTMLDivElement>(null);
  const metrics = useRef({ step: 0, cycle: 0 });
  const drag = useRef({ active: false, x: 0, scroll: 0, moved: false });
  const normalize = useCallback(() => {
    const el = railRef.current;
    const { cycle } = metrics.current;
    if (!el || !cycle) return;
    if (el.scrollLeft < cycle) el.scrollLeft += cycle;
    else if (el.scrollLeft >= cycle * 2) el.scrollLeft -= cycle;
  }, [railRef]);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const resize = new ResizeObserver(() => {
      const first = el.children[0] as HTMLElement;
      const step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(el).gap || "0");
      const previous = metrics.current;
      const fraction = previous.cycle ? (el.scrollLeft % previous.cycle) / previous.cycle : 0;
      metrics.current = { step, cycle: step * images.length };
      el.scrollLeft = metrics.current.cycle * (1 + fraction);
    });
    resize.observe(el);
    el.addEventListener("scrollend", normalize);
    return () => { resize.disconnect(); el.removeEventListener("scrollend", normalize); };
  }, [images.length, railRef, normalize]);

  useEffect(() => {
    const el = railRef.current;
    if (!el || paused) return;
    let frame = 0, last = 0, position = el.scrollLeft, visible = false, previousCycle = 0;
    const tick = (time: number) => {
      const { cycle } = metrics.current;
      const delta = last ? Math.min(time - last, 40) : 0;
      last = time;
      if (cycle) {
        if (cycle !== previousCycle) { position = el.scrollLeft; previousCycle = cycle; }
        position += delta * .055;
        if (position < cycle) position += cycle;
        if (position >= cycle * 2) position -= cycle;
        el.scrollLeft = position;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); frame = 0; last = 0;
      if (visible && !document.hidden) { position = el.scrollLeft; frame = requestAnimationFrame(tick); }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .05 });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, [paused, railRef]);

  return <div className={styles.galleryRail} ref={railRef} role="region" aria-roledescription="carousel" aria-label="Prenatal yoga photos" tabIndex={0}
    onKeyDown={event => {
      const el = event.currentTarget;
      const { step, cycle } = metrics.current;
      if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        if (event.key === "Home" || event.key === "End") el.scrollTo({ left: cycle + (event.key === "Home" ? 0 : (images.length - 1) * step), behavior: "instant" });
        else el.scrollBy({ left: step * (event.key === "ArrowRight" ? 1 : -1), behavior: reducedSnapshot() ? "instant" : "smooth" });
      }
    }}
    onPointerDown={event => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      drag.current = { active: true, x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false };
    }}
    onPointerMove={event => {
      const state = drag.current;
      if (!state.active) return;
      const delta = event.clientX - state.x;
      if (Math.abs(delta) > 6) { state.moved = true; event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.dataset.dragging = "true"; }
      if (state.moved) event.currentTarget.scrollLeft = state.scroll - delta;
    }}
    onPointerUp={event => {
      drag.current.active = false; delete event.currentTarget.dataset.dragging;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      if (drag.current.moved) {
        const step = metrics.current.step;
        event.currentTarget.scrollTo({ left: Math.round(event.currentTarget.scrollLeft / step) * step, behavior: reducedSnapshot() ? "instant" : "smooth" });
      }
    }}
    onPointerCancel={event => { drag.current.active = false; delete event.currentTarget.dataset.dragging; }}
    onClickCapture={event => { if (drag.current.moved) { event.preventDefault(); event.stopPropagation(); drag.current.moved = false; } }}>
    {[0, 1, 2].flatMap(copy => images.map((item, index) => {

      const duplicate = copy !== 1;
      return <div className={styles.galleryItem} key={`${copy}-${item.src}`} aria-hidden={duplicate || undefined} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${images.length}`}><figure>
        <div className={styles.galleryOpen}><Image src={item.src} alt={duplicate ? "" : item.alt} fill draggable={false} sizes="(max-width: 600px) 82vw, (max-width: 850px) 45vw, (max-width: 1032px) 320px, (max-width: 1806px) 31vw, 560px" className={styles.galleryImage} /></div>
      </figure></div>;
    }))}
  </div>;
}

export function PrenatalGallery() {
  const reduced = useSyncExternalStore(subscribeMotion, reducedSnapshot, () => true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);

  return (
    <div className={styles.gallery}>
      <div
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={() => setFocused(false)}
        onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
        onTouchStart={() => setTouching(true)}
        onTouchEnd={() => setTouching(false)}
        onTouchCancel={() => setTouching(false)}
      >
        <GalleryRow paused={hovered || focused || reduced || touching} />
      </div>
    </div>
  );
}
