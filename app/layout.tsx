import type { Metadata, Viewport } from "next";
import { Baskervville, Public_Sans } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ORG } from "@/lib/content";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/charts.css";

const baskervville = Baskervville({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-baskervville", display: "swap" });
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(ORG.url),
  title: { default: `${ORG.name}. ${ORG.descriptor}.`, template: `%s. ${ORG.name}` },
  description: ORG.boilerplate,
  openGraph: { siteName: ORG.name, type: "website", locale: "en_US" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${baskervville.variable} ${publicSans.variable}`}>
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        <div id="content">{children}</div>
        <SiteFooter />
        <div id="tip" role="status" aria-live="polite" hidden />
        <Script src="/enhance.js" strategy="afterInteractive" />
        <Script src="https://gc.zgo.at/count.js" data-goatcounter="https://aicharacterlab.goatcounter.com/count" strategy="afterInteractive" />
      </body>
    </html>
  );
}
