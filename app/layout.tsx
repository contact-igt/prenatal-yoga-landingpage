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
  title: "Prenatal Yoga & Conscious Pregnancy | The BirthWave, Chennai",
  description: "Explore guided prenatal yoga at The BirthWave in Nungambakkam, Chennai, and register your interest in the upcoming Conscious Pregnancy Program.",
  robots: { index: site.indexable, follow: site.indexable },
  icons: { icon: "/brand/logo.png" },
  ...(site.canonical ? { alternates: { canonical: site.canonical } } : {}),
  openGraph: {
    title: "A more connected pregnancy journey | The BirthWave",
    description: "Make space for movement, breath and support. Explore prenatal yoga and the upcoming Conscious Pregnancy Program.",
    type: "website", locale: "en_IN", siteName: site.name,
    images: [{ url: "/images/pregnancy-community.webp", width: 1800, height: 956, alt: "A moment of connection during a BirthWave group activity" }],
    ...(site.canonical ? { url: site.canonical } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${jakarta.variable} ${poppins.variable}`}><body>{children}</body></html>;
}
