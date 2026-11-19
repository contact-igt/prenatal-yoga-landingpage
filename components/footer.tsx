import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { onlineFooterLinks, site } from "@/config/site";
import { onlineCopy } from "@/config/online-content";

export function Footer() {
  return <footer className="site-footer"><div className="footer-container">
    <div className="footer-main">
      <div className="footer-brand"><a href={site.official} aria-label="The BirthWave — home"><Image src="/brand/logo-cream.png" width={320} height={157} alt="The BirthWave" /></a><p>Care that meets you where you are.</p></div>
      <div><h2>Care &amp; Services</h2><nav aria-label="Care and services">{onlineFooterLinks.care.map(item=><a key={item.href} href={item.href}>{item.label}</a>)}</nav></div>
      <div><h2>Explore</h2><nav aria-label="Footer navigation">{onlineFooterLinks.explore.map(item=><a key={item.href} href={item.href}>{item.label}</a>)}</nav></div>
      <div className="footer-contact"><h2>Contact Info</h2><ul><li><Phone size={16} aria-hidden="true" /><a href={site.phoneHref}>{site.phone}</a></li><li><Phone size={16} aria-hidden="true" /><a href={site.whatsappHref}>{site.whatsapp}</a></li><li><Mail size={16} aria-hidden="true" /><a href="mailto:thebirthwave@gmail.com">thebirthwave@gmail.com</a></li><li><MapPin size={16} aria-hidden="true" /><a href="https://maps.app.goo.gl/7bLsmm87HDyki1DJA" target="_blank" rel="noreferrer">{onlineCopy.contact.address}</a></li></ul></div>
    </div>
    <div className="footer-bottom"><p>© 2026 The BirthWave. All rights reserved.</p><div><a href={site.privacy}>Privacy Policy</a><a href={site.terms}>Terms &amp; Conditions</a></div></div>
  </div></footer>;
}
