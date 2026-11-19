"use client";

import { useState } from "react";
import { BookOpen, Heart, Leaf, MoveUpRight, Music2, Package, Plus, Sparkles, Wind } from "lucide-react";
import { activities } from "@/config/content";

const icons = [Wind, MoveUpRight, Music2, BookOpen, Package];
const yogaIcons = [MoveUpRight, Heart, Sparkles, Wind, Leaf];

export function ProgrammeActivities({ items = activities, label = "THE PROPOSED EXPERIENCE", idPrefix = "activity", kind = "programme" }: {
  items?: ReadonlyArray<{ title: string; body: string }>; label?: string | null; idPrefix?: string; kind?: "programme" | "yoga";
}) {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="activities" data-reveal="up" data-delay="100">
    {label && <p className="eyebrow">{label}</p>}
    {items.map((activity, index) => {
      const Icon = (kind === "yoga" ? yogaIcons : icons)[index];
      const expanded = open === index;
      return <article className={`activity${expanded ? " is-expanded" : ""}`} key={activity.title}
        onMouseEnter={() => { if (matchMedia("(hover: hover)").matches) setOpen(index); }}
        onMouseLeave={event => { if (!event.currentTarget.contains(document.activeElement)) setOpen(null); }}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null); }}>
        <h3><button type="button" id={`${idPrefix}-title-${index}`} aria-expanded={expanded} aria-controls={`${idPrefix}-description-${index}`}
          onFocus={event => { if (event.currentTarget.matches(":focus-visible")) setOpen(index); }}
          onClick={() => setOpen(expanded ? null : index)}>
          <Icon className="activity-icon" size={23} strokeWidth={1.4} aria-hidden="true" /><span>{activity.title}</span><Plus className="activity-toggle" size={18} aria-hidden="true" />
        </button></h3>
        <div className="activity-reveal" id={`${idPrefix}-description-${index}`} role="region" aria-labelledby={`${idPrefix}-title-${index}`} inert={!expanded}><div><p>{activity.body}</p></div></div>
      </article>;
    })}
  </div>;
}
