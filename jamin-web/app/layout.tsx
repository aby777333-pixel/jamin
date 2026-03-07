import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Cinzel } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Jamin Properties | Premium Land Investment in India | Signature for Fortune',
  description: 'Invest in verified, high-return land across India. Residential plots, agricultural land, and commercial plots in top-growth corridors. Transparent. Secure. Jamin Properties.',
  keywords: [
    'land investment India', 'buy land India', 'plot investment India',
    'agricultural land investment India', 'residential plots India',
    'land investment 2025', 'best land to buy India', 'NRI land investment India',
    'Tamil Nadu land investment', 'Andhra Pradesh plots', 'Telangana land',
    'Karnataka plots', 'verified land India', 'land near highways India',
    'RERA approved plots', 'premium land developer India',
    'Jamin Properties', 'jaminproperties.com', 'signature for Fortune',
    'land investment returns India', 'best states for land investment India',
    'safe land investment India', 'low-risk land investment',
    'land near expressway India', 'land near airport India'
  ],
  openGraph: {
    title: 'Jamin Properties — Signature for Fortune',
    description: 'Premium verified land investments across India. Transparent. Secure. Future-proof.',
    url: 'https://jaminproperties.com',
    siteName: 'Jamin Properties',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jamin Properties | Premium Land Investment India',
    description: 'Invest in verified land opportunities across India.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://jaminproperties.com' },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Jamin Properties",
              "url": "https://jaminproperties.com",
              "logo": "https://jaminproperties.com/logo.png",
              "description": "Premium land investment opportunities across India",
              "areaServed": "India",
              "slogan": "Signature for Fortune"
            })
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${outfit.variable} ${cinzel.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
