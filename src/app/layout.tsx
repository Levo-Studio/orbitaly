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
    canonical: "https://chat.orbitaly.de"
  },
  openGraph: {
    title: "Orbitaly — Independent Matrix Communication",
    description:
      "Orbitaly is a private Matrix-based communication space for secure chats, groups and independent communities.",
    url: "https://chat.orbitaly.de",
    siteName: "Orbitaly",
    type: "website",
    images: [
      {
        url: "/orbital-logo-rectangle.png?v=2",
        width: 1200,
        height: 1200,
        alt: "Orbitaly"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbitaly — Independent Matrix Communication",
    description:
      "Orbitaly is a private Matrix-based communication space for secure chats, groups and independent communities.",
    images: ["/orbital-logo-rectangle.png?v=2"]
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
