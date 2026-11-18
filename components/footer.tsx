import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerLinks, site } from "@/config/site";

export function Footer() {
  return <footer className="site-footer"><div className="footer-container">
    <div className="footer-main">
      <div className="footer-brand"><a href={site.official} aria-label="The BirthWave — home"><Image src="/brand/logo-cream.png" width={320} height={157} alt="The BirthWave" /></a><p>Care that meets you where you are.</p></div>
      <div><h2>Care &amp; Services</h2><nav aria-label="Care and services">{footerLinks.care.map(item=><a key={item.href} href={item.href}>{item.label}</a>)}</nav></div>
      <div><h2>Explore</h2><nav aria-label="Footer navigation">{footerLinks.explore.map(item=><a key={item.href} href={item.href}>{item.label}</a>)}</nav></div>
      <div className="footer-contact"><h2>Contact Info</h2><ul>{footerLinks.contact.map(item=>{const Icon=item.kind==='email'?Mail:item.kind==='address'?MapPin:Phone;return <li key={item.href}><Icon size={16} aria-hidden="true" /><a href={item.href} {...(item.kind==='address'?{target:'_blank',rel:'noreferrer'}:{})}>{item.label}</a></li>;})}</ul></div>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} The Birthwave. All rights reserved.</p><div><a href={site.privacy}>Privacy Policy</a><a href={site.terms}>Terms &amp; Conditions</a></div></div>
  </div></footer>;
}
