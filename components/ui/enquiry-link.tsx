"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Interest } from "@/lib/enquiry";

export function EnquiryLink({ children, interest, target = "final", className = "button" }: {
  children: ReactNode; interest?: Interest; target?: "hero" | "final"; className?: string;
}) {
  return <a className={className} href={target === "hero" ? "#hero-enquiry" : "#enquiry"}
    onClick={(event) => {
      const form = document.getElementById(`${target}-enquiry`);
      if (!form) return;
      event.preventDefault();
      document.dispatchEvent(new CustomEvent("birthwave:enquire", { detail: { target, interest } }));
      form.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
      (form.querySelector("input") as HTMLInputElement | null)?.focus({ preventScroll: true });
    }}>
    <span>{children}</span><ArrowUpRight size={17} aria-hidden="true" />
  </a>;
}
