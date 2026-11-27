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

// The revised client PDF specifies the online programme and monthly fee.
export const yoga = {
  showPrice: true,
  monthlyFee: 4500,
  currency: "INR",
  tax: "Applicable taxes, if any, and final enrolment details will be confirmed before registration.",
  format: "Online",
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
  { href: "#gallery", label: "Gallery" },
  { href: "#benefits", label: "Benefits" },
  { href: "#getting-started", label: "How It Works" },
  { href: "#our-approach", label: "Our Approach" },
  { href: "#faqs", label: "FAQs" },
  { href: "#contact", label: "Contact" },
];

export const onlineFooterLinks = {
  care: [
    { label: "Pregnancy Care", href: site.antenatal },
    { label: "Birth Preparation", href: site.birthPreparation },
  ],
  explore: [
    { label: "About The BirthWave", href: `${site.official}/about` },
    { label: "Contact", href: `${site.official}/contact` },
    { label: "Privacy Policy", href: site.privacy },
  ],
} as const;

// Verified against the official homepage footer; campaign contacts above stay separate.
export const footerLinks = {
  care: [
    {label:"Fertility & Preconception",href:"https://www.thebirthwave.in/services/fertility-preconception"},
    {label:"Vaginismus & Intimate Wellness",href:"https://www.thebirthwave.in/services/vaginismus"},
    {label:"Pregnancy & Antenatal Care",href:site.antenatal},
    {label:"Birth Preparation & Childbirth Education",href:site.birthPreparation},
    {label:"Natural Birth",href:"https://www.thebirthwave.in/services/natural-birth"},
    {label:"VBAC — Vaginal Birth After Caesarean",href:"https://www.thebirthwave.in/services/vbac"},
  ],
  explore: [
    {label:"About Us",href:"https://www.thebirthwave.in/about"},
    {label:"Our Care Team",href:"https://www.thebirthwave.in/doctors"},
    {label:"Blog",href:"https://www.thebirthwave.in/blog"},
    {label:"FAQ",href:"https://www.thebirthwave.in/faq"},
    {label:"Contact Us",href:"https://www.thebirthwave.in/contact"},
  ],
  contact: [
    {kind:"phone",label:"+91 79042 51378",href:"tel:+917904251378"},
    {kind:"phone",label:"+91 98407 98472",href:"tel:+919840798472"},
    {kind:"email",label:"thebirthwave@gmail.com",href:"mailto:thebirthwave@gmail.com"},
    {kind:"address",label:"No. 8/15, Mahalingapuram Main Road, Nungambakkam, Chennai – 600034",href:"https://maps.app.goo.gl/7bLsmm87HDyki1DJA"},
  ],
} as const;
