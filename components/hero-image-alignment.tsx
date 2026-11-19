"use client";

import { useEffect } from "react";

// Copy and validation messages can change the shared form's measured height.
// Adjust only the photograph's clipping frame, keeping its source scale fixed.
export function HeroImageAlignment() {
  useEffect(() => {
    const photo = document.querySelector<HTMLElement>(".hero-background");
    const content = document.querySelector<HTMLElement>(".hero-content");
    const wrapper = document.querySelector<HTMLElement>(".hero-form-wrap");
    const form = document.getElementById("hero-enquiry");
    if (!photo || !content || !wrapper || !form) return;
    const align = () => {
      if (matchMedia("(min-width: 901px)").matches) {
        photo.style.height = `${wrapper.offsetTop + form.offsetTop + form.getBoundingClientRect().height - content.offsetTop - photo.offsetTop}px`;
      } else {
        photo.style.removeProperty("height");
      }
    };
    const observer = new ResizeObserver(align);
    observer.observe(form);
    observer.observe(content);
    window.addEventListener("resize", align);
    align();
    return () => { observer.disconnect(); window.removeEventListener("resize", align); photo.style.removeProperty("height"); };
  }, []);
  return null;
}
