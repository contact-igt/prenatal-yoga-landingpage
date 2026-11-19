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

export const metadata: Metadata = {
  metadataBase: new URL(site.canonical || "http://127.0.0.1:3000"),
  title: "Online Prenatal Yoga Classes | The BirthWave",
  description: "Explore guided online prenatal yoga classes with The BirthWave. Pregnancy-appropriate movement, breathing and relaxation from home. ₹4,500 per month, subject to medical suitability.",
  robots: { index: site.indexable, follow: site.indexable },
  icons: { icon: "/brand/logo.png" },
  ...(site.canonical ? { alternates: { canonical: site.canonical } } : {}),
  openGraph: {
    title: "Online Prenatal Yoga Classes | The BirthWave",
    description: "Guided pregnancy-appropriate movement, breathing and relaxation from the comfort of home.",
    type: "website", locale: "en_IN", siteName: site.name,
    images: [{ url: "/images/d056632c-5977-49a3-97ed-7995e66680f7-clean.webp", width: 1774, height: 887, alt: "An expectant mother practising seated prenatal yoga" }],
    ...(site.canonical ? { url: site.canonical } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${jakarta.variable} ${poppins.variable}`}><body>{children}</body></html>;
}
