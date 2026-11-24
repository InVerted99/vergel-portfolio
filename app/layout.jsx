import localFont from "next/font/local";
import { site } from "@/data/site";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { EasterEgg } from "@/components/fx/EasterEgg";
import "./globals.css";
// All fonts are self-hosted: no runtime or build-time requests to Google.
const geist = localFont({
  src: "./fonts/Geist-Variable.woff2",
  weight: "100 900",
  variable: "--font-geist",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});
const clash = localFont({
  variable: "--font-clash",
  display: "swap",
  src: [
    { path: "./fonts/ClashDisplay-500.woff2", weight: "500" },
    { path: "./fonts/ClashDisplay-600.woff2", weight: "600" },
    { path: "./fonts/ClashDisplay-700.woff2", weight: "700" },
  ],
});
export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Vergel Cortez",
    "Frontend Developer",
    "UI Designer",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Figma",
    "Philippines",
    "Portfolio",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
  width: "device-width",
  initialScale: 1,
};
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.description,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressRegion: "Tarlac", addressCountry: "PH" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Tarlac State University" },
    { "@type": "HighSchool", name: "Moncada Catholic School" },
  ],
  knowsAbout: [
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Responsive Design",
    "Figma",
    "UI/UX Design",
  ],
  sameAs: Object.values(site.socials).filter(Boolean),
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${clash.variable}`}
    >
      <head>
        {/* Without JS, scroll-reveal styles would leave content invisible. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important}[style*="transform"]{transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body id="top">
        <ThemeProvider>
          <SmoothScroll />
          <div aria-hidden className="grain" />
          <Header />
          <div className="relative z-10">{children}</div>
          <Footer />
          <CommandPalette />
          <EasterEgg />
        </ThemeProvider>
      </body>
    </html>
  );
}
