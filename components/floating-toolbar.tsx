import type { LucideProps } from "lucide-react";
import { CalendarDays, Instagram, Phone } from "lucide-react";
import { site } from "@/config/site";

export function WhatsAppIcon({ size = 18, "aria-hidden": ariaHidden }: LucideProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden={ariaHidden}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.884-.788-1.48-1.761-1.653-2.06-.173-.297-.018-.457.13-.605.134-.133.298-.347.446-.52.15-.174.199-.298.298-.497.1-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.075-.792.372-.272.298-1.04 1.017-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.199 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.569-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.511-5.266C2.168 6.43 6.601 2 12.054 2a9.82 9.82 0 0 1 6.988 2.9 9.825 9.825 0 0 1 2.893 6.994c-.003 5.454-4.437 9.891-9.885 9.891zM20.462 3.488A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.333.157 11.885c0 2.095.547 4.139 1.588 5.94L.057 24l6.316-1.657a11.88 11.88 0 0 0 5.672 1.444h.005c6.55 0 11.888-5.334 11.891-11.886a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function YouTubeIcon({ size = 18, "aria-hidden": ariaHidden }: LucideProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden={ariaHidden}>
      <path fillRule="evenodd" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6 15.8 12 9.6 8.4v7.2Z" />
    </svg>
  );
}

const actions = [
  { label: "Message on WhatsApp", mobileLabel: "WhatsApp", href: site.whatsappHref, Icon: WhatsAppIcon, external: true, color: "#1a7d45" },
  { label: "Call The BirthWave", mobileLabel: "Call", href: site.phoneHref, Icon: Phone, external: false, color: "#865b4e" },
  { label: "Follow on Instagram", mobileLabel: "Instagram", href: site.instagramHref, Icon: Instagram, external: true, color: "#E1306C" },
  { label: "Book an appointment", mobileLabel: "Book", href: site.appointmentHref, Icon: CalendarDays, external: true, color: "#865b4e" },
  { label: "Watch on YouTube", mobileLabel: "YouTube", href: site.youtubeHref, Icon: YouTubeIcon, external: true, color: "#FF0000" },
] as const;

export function FloatingToolbar() {
  return <nav className="floating-toolbar" aria-label="Quick contact links">
    {actions.map(({ label, mobileLabel, href, Icon, external, color }) => <a key={label} className="floating-action" data-action={mobileLabel.toLowerCase()} href={href} aria-label={label} title={label} style={{ "--action-color": color } as React.CSSProperties} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      <span className="floating-action-icon"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>
      <span className="floating-action-label">{mobileLabel}</span>
    </a>)}
  </nav>;
}
