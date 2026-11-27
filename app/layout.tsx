import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/config/site";
import "./globals.css";

const jakarta = localFont({ src: "../public/fonts/jakarta-latin.woff2", variable: "--font-jakarta", weight: "200 800", display: "swap" });
const poppins = localFont({ src: [
  { path: "../public/fonts/poppins-regular.ttf", weight: "400", style: "normal" },
  { path: "../public/fonts/poppins-medium.woff2", weight: "500", style: "normal" },
  { path: "../public/fonts/poppins-semibold.woff2", weight: "600", style: "normal" },
], variable: "--font-poppins", display: "swap" });

const title = "Online Prenatal Yoga Classes | The BirthWave";
const socialDescription = "Guided pregnancy-appropriate movement, breathing and relaxation from the comfort of home.";
const socialImage = {
  url: "/images/prenatal-yoga-social.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "An expectant mother practising seated prenatal yoga",
};
const productionUrl = "https://prenatal-yoga-landingpage-flame.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(site.canonical || productionUrl),
  title,
  description: "Explore guided online prenatal yoga classes with The BirthWave. Pregnancy-appropriate movement, breathing and relaxation from home. ₹4,500 per month, subject to medical suitability.",
  robots: { index: site.indexable, follow: site.indexable },
  icons: { icon: "/brand/logo.png" },
  ...(site.canonical ? { alternates: { canonical: site.canonical } } : {}),
  openGraph: {
    title,
    description: socialDescription,
    type: "website", locale: "en_IN", siteName: site.name,
    images: [socialImage],
    url: site.canonical || productionUrl,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: socialDescription,
    images: [{ url: socialImage.url, alt: socialImage.alt }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${jakarta.variable} ${poppins.variable}`}><body>{children}</body></html>;
}
