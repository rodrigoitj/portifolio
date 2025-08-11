import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Correa.Dev",
  description: "Portfolio of Rodrigo Corrêa",
};

export const viewport: Viewport = {
  themeColor: "#2bdde9",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = "G-NQ138V50D8" ;//process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased magicpattern`}
      >
        {GA_ID ? (
          <>
            <Script
              id="ga-loader"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                window.gtag = window.gtag || gtag;
                gtag('js', new Date());
                gtag('config', 'G-NQ138V50D8');
              `}
            </Script>
          </>
        ) : null}
        {GA_ID ? (
          <Suspense fallback={null}>
            <GoogleAnalytics gaId={GA_ID} />
          </Suspense>
        ) : null}
        {children}
      </body>
    </html>
  );
}
