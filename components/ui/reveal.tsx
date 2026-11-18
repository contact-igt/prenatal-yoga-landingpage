"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    if (!window.IntersectionObserver || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        const variant = element.dataset.reveal;
        const start = variant === "image" ? "scale(1.025)" : variant === "side" ? "translateX(-16px)" : "translateY(20px)";
        element.animate([{ opacity: 0, transform: start }, { opacity: 1, transform: "none" }], {
          duration: 650, delay: Number(element.dataset.delay || 0), easing: "cubic-bezier(.2,.65,.3,1)", fill: "backwards",
        });
        observer.unobserve(element);
      }
    }, { threshold: 0.08 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
