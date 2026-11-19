"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { onlineFaqs as faqs } from "@/config/online-content";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="faq-list">{faqs.map((faq, index) => <div className={`faq-item ${open === index ? "is-open" : ""}`} key={faq.question}>
    <h3><button id={`faq-question-${index}`} aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}><span>{faq.question}</span><Plus size={20} aria-hidden="true" /></button></h3>
    <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} inert={open !== index} className="faq-answer"><div><p>{faq.answer}</p></div></div>
  </div>)}</div>;
}
