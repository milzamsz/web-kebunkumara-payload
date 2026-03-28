import type { Metadata } from "next";
import {
  fallbackPageContent,
  fallbackSiteSettings,
} from "@/lib/fallback-data";
import {
  getMediaUrl,
  getPublishedPageBySlug,
  getSiteSettings,
} from "@/lib/frontend-cms";

export const metadata: Metadata = {
  title: "Contact - Kebun Kumara",
  description:
    "Get in touch with Kebun Kumara for collaborations, garden inquiries, or to say hello. We'd love to hear from you.",
  openGraph: {
    title: "Contact - Kebun Kumara",
    description: "Reach out for collaborations, inquiries, or just to say hello.",
    url: "https://kebunkumara.id/contact",
    siteName: "Kebun Kumara",
    type: "website",
    locale: "id_ID",
  },
};

export default async function ContactPage() {
  const [contactPage, siteSettings] = await Promise.all([
    getPublishedPageBySlug("contact", "Contact"),
    getSiteSettings("Contact"),
  ]);

  const heroTitle =
    contactPage?.hero?.heading ?? fallbackPageContent.contact.heading;
  const heroDescription =
    contactPage?.hero?.subheading ?? fallbackPageContent.contact.subheading;
  const heroImage =
    getMediaUrl(contactPage?.hero?.backgroundImage) ??
    fallbackPageContent.contact.backgroundImage;

  const email = siteSettings?.email ?? fallbackSiteSettings.email;
  const address = siteSettings?.address ?? fallbackSiteSettings.address;
  const instagramUrl =
    siteSettings?.socialMedia?.instagram ??
    fallbackSiteSettings.socialMedia.instagram;
  const facebookUrl =
    siteSettings?.socialMedia?.facebook ??
    fallbackSiteSettings.socialMedia.facebook;
  const youtubeUrl =
    siteSettings?.socialMedia?.youtube ??
    fallbackSiteSettings.socialMedia.youtube;

  return (
    <main>
      <header
        className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden pt-40 pb-20 text-center"
        style={{
          backgroundColor: "#FAF9F6",
          backgroundImage: heroImage ? `url("${heroImage}")` : "none",
          backgroundSize: heroImage ? "cover" : undefined,
          backgroundPosition: heroImage ? "center" : undefined,
        }}
      >
        {heroImage ? (
          <div className="absolute inset-0 z-0 bg-[#FAF9F6]/60" />
        ) : null}

        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <h1 className="mb-8 font-display text-5xl text-[#2D3A26] md:text-7xl lg:text-8xl">
            {heroTitle}
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed tracking-wide text-[#2D3A26]/80 md:text-xl">
            {heroDescription}
          </p>
        </div>
      </header>

      <section className="relative bg-[#FAF9F6] px-4 py-16 pb-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex flex-col items-center justify-center space-y-16">
            <div className="space-y-10">
              <div className="group flex flex-col items-center">
                <span className="mb-2 block text-xs uppercase tracking-widest text-[#d4a373]">
                  Email
                </span>
                <a
                  href={`mailto:${email}`}
                  className="inline-block border-b border-transparent pb-1 font-display text-2xl text-[#2D3A26] transition-colors group-hover:border-[#2D3A26]/30 group-hover:text-[#4A5D40]"
                >
                  {email}
                </a>
              </div>

              <div className="group flex flex-col items-center">
                <span className="mb-2 block text-xs uppercase tracking-widest text-[#d4a373]">
                  Office &amp; Farm
                </span>
                <p className="max-w-sm text-lg font-light leading-relaxed text-[#2D3A26]/80">
                  {address}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#2D3A26]/60 transition-colors hover:text-[#4A5D40]"
                >
                  View Map
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xs border-t border-[#2D3A26]/10 pt-8">
              <span className="mb-6 block text-xs uppercase tracking-widest text-[#d4a373]">
                Socials
              </span>
              <div className="flex justify-center gap-6">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="text-[#2D3A26]/60 transition-transform duration-300 hover:-translate-y-1 hover:text-[#4A5D40]"
                >
                  Instagram
                </a>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="text-[#2D3A26]/60 transition-transform duration-300 hover:-translate-y-1 hover:text-[#4A5D40]"
                >
                  Facebook
                </a>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Watch us on YouTube"
                  className="text-[#2D3A26]/60 transition-transform duration-300 hover:-translate-y-1 hover:text-[#4A5D40]"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
