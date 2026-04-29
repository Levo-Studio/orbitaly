import type { ReactElement, ReactNode } from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Orbitaly — Independent Matrix Communication",
  description:
    "Orbitaly is a private Matrix-based communication space for secure chats, groups and independent communities.",
  alternates: {
    canonical: "https://orbitaly.de"
  },
  openGraph: {
    title: "Orbitaly — Independent Matrix Communication",
    description:
      "Orbitaly is a private Matrix-based communication space for secure chats, groups and independent communities.",
    url: "https://orbitaly.de",
    siteName: "Orbitaly",
    type: "website",
    images: [
      {
        url: "https://orbitaly.de/orbital-og-image.png?v=4",
        width: 1200,
        height: 630,
        alt: "Orbitaly"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbitaly — Independent Matrix Communication",
    description:
      "Orbitaly is a private Matrix-based communication space for secure chats, groups and independent communities.",
    images: ["https://orbitaly.de/orbital-og-image.png?v=4"]
  },
  metadataBase: new URL("https://orbitaly.de")
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.variable} bg-[#05070d] font-sans text-white`}>{children}</body>
    </html>
  );
}
