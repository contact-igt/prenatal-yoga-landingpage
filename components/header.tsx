"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/config/site";
import { EnquiryLink } from "./ui/enquiry-link";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return <header className="site-header">
    <div className="container header-inner">
      <a href="#top" className="brand" aria-label="The BirthWave — back to top"><Image src="/brand/logo.png" width={150} height={74} alt="The BirthWave" priority /></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      <div className="header-actions"><EnquiryLink className="button button-small" target="hero">Enquire About Classes</EnquiryLink>
        <button ref={toggle} className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
    <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}
      onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } }}>
      {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
    </nav>
  </header>;
}
