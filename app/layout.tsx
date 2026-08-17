import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import {
  APP_DESCRIPTION,
  APP_ENG_NAME,
  APP_INSTAGRAM_URL,
  APP_KEYWORDS,
  APP_NAME,
  APP_SITE_URL,
  APP_SLOGAN,
  APP_THREADS_URL,
} from "@/lib/constants";

import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

const anyvid = localFont({
  variable: "--font-anyvid",
  display: "swap",
  preload: true,
  src: [
    { path: "../public/fonts/anyvid.woff2", weight: "400", style: "normal" },
  ],
});

const nanumSquare = localFont({
  variable: "--font-nanumNeo",
  display: "swap",
  preload: true,
  src: [
    {
      path: "../public/fonts/nanum-square-neo.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});

const paperlogy = localFont({
  variable: "--font-paperlogy",
  display: "swap",
  preload: true,
  src: [
    {
      path: "../public/fonts/paperlogy-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/paperlogy-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/paperlogy-black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME} | ${APP_SLOGAN}`,
  },
  description: APP_DESCRIPTION,
  keywords: APP_KEYWORDS,
  authors: [{ name: "webstoryboy", url: "https://webstoryboy.com" }],
  metadataBase: new URL(APP_SITE_URL),
  alternates: { canonical: APP_SITE_URL },
  icons: {
    icon: [
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: APP_SITE_URL,
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${APP_SITE_URL}/kcalzoa.webp`,
        width: 1200,
        height: 800,
        alt: `${APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kcalzoa",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`${APP_SITE_URL}/kcalzoa.webp`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${APP_SITE_URL}/#website`,
        url: APP_SITE_URL,
        name: APP_NAME,
        alternateName: APP_ENG_NAME,
        description: APP_DESCRIPTION,
        inLanguage: "ko-KR",
        publisher: { "@id": `${APP_SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${APP_SITE_URL}/#organization`,
        name: APP_NAME,
        alternateName: APP_ENG_NAME,
        url: APP_SITE_URL,
        logo: `${APP_SITE_URL}/icons/icon512.png`,
        sameAs: [APP_INSTAGRAM_URL, APP_THREADS_URL],
      },
    ],
  };

  return (
    <html lang="ko">
      <body
        className={`${anyvid.variable} ${nanumSquare.variable} ${paperlogy.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <TooltipProvider>
          <Header />
          <main className="main__container">{children}</main>
          <Footer />
        </TooltipProvider>
        <GoogleAnalytics gaId="G-DR1XQP3F0V" />
      </body>
    </html>
  );
}
