export const site = {
  name: "The BirthWave",
  phone: "+91 93630 31925",
  phoneHref: "tel:+919363031925",
  whatsapp: "+91 79042 51378",
  whatsappHref: "https://wa.me/917904251378",
  instagramHref: "https://www.instagram.com/thebirthwave",
  youtubeHref: "https://www.youtube.com/@thebirthwaveclinic",
  appointmentHref: "https://www.thebirthwave.in/contact#contact-form",
  address: "The BirthWave, 8/15 Mahalingapuram Main Road, Nungambakkam, Chennai – 600034.",
  official: "https://www.thebirthwave.in",
  privacy: "https://www.thebirthwave.in/privacy",
  terms: "https://www.thebirthwave.in/terms",
  postpartum: "https://www.thebirthwave.in/services#postpartum-care",
  antenatal: "https://www.thebirthwave.in/services/pregnancy-antenatal-care",
  birthPreparation: "https://www.thebirthwave.in/services/birth-preparation",
  canonical: process.env.NEXT_PUBLIC_CANONICAL_URL || undefined,
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
} as const;

// The master prompt explicitly requests this discussed fee for local review.
// Confirm fee, tax treatment and inclusions with the clinic before public launch.
export const yoga = {
  showPrice: true,
  monthlyFee: 4500,
  currency: "INR",
  tax: "Tax details confirmed at enrolment.",
  format: "Ask about current online and in-clinic options.",
  frequency: "Ask our team about class frequency and duration.",
  batches: "Ask about batch days, timings and capacity.",
  instructor: "Ask our team about the instructor and verified credentials.",
  inclusions: "Our team will confirm the current rate and class inclusions before you join.",
};

export const yogaFee = new Intl.NumberFormat("en-IN", {
  style: "currency", currency: yoga.currency, maximumFractionDigits: 0,
}).format(yoga.monthlyFee);

export const privacyMessage = "We will use the details you provide to respond to your enquiry. Please do not share sensitive medical records or urgent pregnancy concerns in this form. If you need urgent medical assistance, contact an appropriate healthcare professional or emergency service.";

export const navigation = [
  { href: "#prenatal-yoga", label: "Prenatal Yoga" },
  { href: "#conscious-pregnancy", label: "Conscious Pregnancy" },
  { href: "#our-approach", label: "Care Approach" },
  { href: "#faqs", label: "FAQs" },
  { href: "#enquiry", label: "Contact" },
];
