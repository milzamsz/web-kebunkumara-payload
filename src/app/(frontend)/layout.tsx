import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import { fallbackSiteSettings } from "@/lib/fallback-data";
import { getPayload } from "payload";
import config from "@payload-config";

export const metadata: Metadata = {
  title: "Kebun Kumara — Growing Gardens for Human-Nature Connection",
  description:
    "Kebun Kumara creates beautiful, sustainable gardens and landscapes that reconnect people with nature. Serving South Tangerang and Greater Jakarta.",
  keywords: [
    "kebun kumara",
    "landscaping",
    "garden design",
    "sustainable garden",
    "urban farming",
    "Jakarta",
    "Tangerang",
  ],
  openGraph: {
    title: "Kebun Kumara",
    description: "Growing gardens for human-nature connection",
    url: "https://kebunkumara.id",
    siteName: "Kebun Kumara",
    type: "website",
    locale: "id_ID",
  },
};

type MediaDoc = {
  url?: string | null;
  alt?: string | null;
};

type HeaderGlobal = {
  logo?: string | MediaDoc | null;
  navLinks?: Array<{
    label: string;
    url: string;
    subLinks?: Array<{
      label: string;
      url: string;
    }> | null;
  }> | null;
  ctaButton?: {
    label?: string | null;
    url?: string | null;
  } | null;
};

type FooterGlobal = {
  logo?: string | MediaDoc | null;
  columns?: Array<{
    title: string;
    links?: Array<{
      label: string;
      url: string;
    }> | null;
  }> | null;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }> | null;
  copyrightText?: string | null;
};

type SiteSettingsGlobal = {
  siteName?: string | null;
  whatsappNumber?: string | null;
  socialMedia?: {
    instagram?: string | null;
    facebook?: string | null;
    youtube?: string | null;
    tiktok?: string | null;
    linkedin?: string | null;
  } | null;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fallbackGlobal = {
    whatsappNumber: fallbackSiteSettings.whatsappNumber,
    logo: null as null,
    siteName: fallbackSiteSettings.siteName,
  };

  let header: HeaderGlobal | null = null;
  let footer: FooterGlobal | null = null;
  let siteSettings: SiteSettingsGlobal | null = null;

  const phase = process.env.NEXT_PHASE;
  const shouldQueryCMS = phase !== "phase-production-build";

  if (shouldQueryCMS) {
    try {
      const payload = await getPayload({ config });
      const [headerResult, footerResult, siteSettingsResult] = await Promise.all([
        payload.findGlobal({ slug: "header", depth: 2 }),
        payload.findGlobal({ slug: "footer", depth: 2 }),
        payload.findGlobal({ slug: "siteSettings", depth: 1 }),
      ]);

      header = headerResult as unknown as HeaderGlobal;
      footer = footerResult as unknown as FooterGlobal;
      siteSettings = siteSettingsResult as unknown as SiteSettingsGlobal;
    } catch (err) {
      console.error('[Layout] Failed to fetch CMS globals:', err)
      header = null;
      footer = null;
      siteSettings = null;
    }
  }

  const global = {
    ...fallbackGlobal,
    siteName: siteSettings?.siteName ?? fallbackGlobal.siteName,
    whatsappNumber: siteSettings?.whatsappNumber ?? fallbackGlobal.whatsappNumber,
  };

  return (
    <html lang="id">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Navbar global={global} header={header ?? undefined} />
        <main className="flex-1">{children}</main>
        <Footer global={global} footer={footer ?? undefined} siteSettings={siteSettings ?? undefined} />
        <WhatsAppFab phoneNumber={global.whatsappNumber} />
      </body>
    </html>
  );
}
