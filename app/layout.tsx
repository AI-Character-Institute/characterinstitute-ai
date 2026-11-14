import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Silkscreen, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const silkscreen = Silkscreen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-silkscreen",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-source-serif",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
});

export const metadata: Metadata = {
  title: "AI Character Institute",
  description:
    "AI Character Institute is an independent non-profit organization that builds and publishes evaluations of AI character.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${silkscreen.variable} ${sourceSerif.variable} ${plexSans.variable}`}
    >
      <body>
        {children}
        <Script
          src="https://gc.zgo.at/count.js"
          data-goatcounter="https://aicharacterlab.goatcounter.com/count"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
