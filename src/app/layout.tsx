import type { ReactElement, ReactNode } from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const ogImageUrl = "https://chat.orbitaly.de/orbital-og-image.png?v=20260429-1";

export const metadata: Metadata = {
  title: "Orbitaly — Independent Matrix Communication",
  description:
    "Orbitaly is a private Matrix-based communication space for secure chats, groups and independent communities.",
  alternates: {
    canonical: "https://chat.orbitaly.de"
  },
  openGraph: {
    locale: "en_US",
    title: "Orbitaly — Independent Matrix Communication",
    description:
      "Orbitaly is a private Matrix-based communication space for secure chats, groups and independent communities.",
    url: "https://chat.orbitaly.de",
    siteName: "Orbitaly",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Orbitaly OG preview badge"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbitaly — Independent Matrix Communication",
    description:
      "Orbitaly is a private Matrix-based communication space for secure chats, groups and independent communities.",
    images: [ogImageUrl]
  },
  other: {
    "og:image": ogImageUrl,
    "og:image:secure_url": ogImageUrl,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/png"
  },
  metadataBase: new URL("https://chat.orbitaly.de")
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.variable} bg-[#05070d] font-sans text-white`}>{children}</body>
    </html>
  );
}
