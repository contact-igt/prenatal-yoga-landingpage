import { CalendarDays, Instagram, MessageCircle, Phone, Youtube } from "lucide-react";
import { site } from "@/config/site";

const actions = [
  { label: "Message on WhatsApp", href: site.whatsappHref, Icon: MessageCircle, external: true },
  { label: "Call The BirthWave", href: site.phoneHref, Icon: Phone, external: false },
  { label: "Follow The BirthWave on Instagram", href: site.instagramHref, Icon: Instagram, external: true },
  { label: "Book an appointment", href: site.appointmentHref, Icon: CalendarDays, external: true },
  { label: "Watch The BirthWave on YouTube", href: site.youtubeHref, Icon: Youtube, external: true },
] as const;

export function FloatingToolbar() {
  return <nav className="floating-toolbar" aria-label="Quick contact links">
    {actions.map(({ label, href, Icon, external }) => <a key={label} className="floating-action" href={href} aria-label={label} title={label} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
    </a>)}
  </nav>;
}
