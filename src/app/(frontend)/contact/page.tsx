import type { Metadata } from "next";
import {
    fallbackContactDetails,
} from "@/lib/fallback-data";
import { getPayload } from "payload";
import config from "@payload-config";

export const metadata: Metadata = {
    title: "Contact — Kebun Kumara",
    description: "Get in touch with Kebun Kumara for collaborations, garden inquiries, or to say hello. We'd love to hear from you.",
    openGraph: {
        title: "Contact — Kebun Kumara",
        description: "Reach out for collaborations, inquiries, or just to say hello.",
        url: "https://kebunkumara.id/contact",
        siteName: "Kebun Kumara",
        type: "website",
        locale: "id_ID",
    },
};

type SiteSettingsGlobal = {
    socialMedia?: {
        instagram?: string | null;
        youtube?: string | null;
    } | null;
};

export default async function ContactPage() {
    const email = fallbackContactDetails.email;
    const address = fallbackContactDetails.address;

    // Contact page hero data
    const heroTitle = "Let's Grow Together";
    const heroDescription = "We are here to help you reconnect with nature. Reach out for collaborations, inquiries, or just to say hello.";
    const heroImage = null;

    // Social links from fallback
    const fallbackInstagramUrl = "https://www.instagram.com/kebunkumara/";
    const fallbackYoutubeUrl = "https://www.youtube.com/@kebunkumara";

    let siteSettings: SiteSettingsGlobal | null = null;
    const phase = process.env.NEXT_PHASE;
    const shouldQueryCMS = phase !== "phase-production-build";

    if (shouldQueryCMS) {
        try {
            const payload = await getPayload({ config });
            const result = await payload.findGlobal({ slug: "siteSettings", depth: 0 });
            siteSettings = result as unknown as SiteSettingsGlobal;
        } catch (err) {
            console.error('[Contact] Failed to fetch CMS siteSettings:', err)
            siteSettings = null;
        }
    }

    const instagramUrl = siteSettings?.socialMedia?.instagram ?? fallbackInstagramUrl;
    const youtubeUrl = siteSettings?.socialMedia?.youtube ?? fallbackYoutubeUrl;

    return (
        <main>
            {/* ── Hero ──────────────────────────────────────────── */}
            <header
                className="relative pt-40 pb-20 w-full overflow-hidden flex flex-col items-center justify-center min-h-[60vh] text-center"
                style={{
                    backgroundColor: "#FAF9F6",
                    backgroundImage: heroImage ? `url("${heroImage}")` : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D3A26' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: heroImage ? 'cover' : 'auto',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay for better readability if background image exists */}
                {heroImage && <div className="absolute inset-0 bg-[#FAF9F6]/60 z-0" />}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF9F6]/20 to-[#FAF9F6] z-0" />

                <div className="relative z-10 px-4 max-w-4xl mx-auto">
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#2D3A26] mb-8 leading-tight">
                        {heroTitle}
                    </h1>
                    <p className="text-lg md:text-xl text-[#2D3A26]/80 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
                        {heroDescription}
                    </p>
                </div>
            </header>

            {/* ── Contact Details ─────────────────────────── */}
            <section className="py-16 pb-32 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] relative">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex flex-col items-center justify-center space-y-16">
                        <div className="space-y-10">
                            <div className="group flex flex-col items-center">
                                <span className="block text-xs uppercase tracking-widest text-[#d4a373] mb-2">
                                    Email
                                </span>
                                <a
                                    href={`mailto:${email}`}
                                    className="text-2xl font-display text-[#2D3A26] group-hover:text-[#4A5D40] transition-colors border-b border-transparent group-hover:border-[#2D3A26]/30 inline-block pb-1"
                                >
                                    {email}
                                </a>
                            </div>

                            <div className="group flex flex-col items-center">
                                <span className="block text-xs uppercase tracking-widest text-[#d4a373] mb-2">
                                    Office &amp; Farm
                                </span>
                                <p className="text-[#2D3A26]/80 text-lg font-light leading-relaxed max-w-sm">
                                    {address}
                                </p>
                                <a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 text-xs text-[#2D3A26]/60 hover:text-[#4A5D40] uppercase tracking-widest transition-colors"
                                >
                                    View Map{" "}
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_forward
                                    </span>
                                </a>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="pt-8 border-t border-[#2D3A26]/10 w-full max-w-xs mx-auto">
                            <span className="block text-xs uppercase tracking-widest text-[#d4a373] mb-6">
                                Socials
                            </span>
                            <div className="flex gap-6 justify-center">
                                {/* Instagram */}
                                <a
                                    href={instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow us on Instagram"
                                    className="text-[#2D3A26]/60 hover:text-[#4A5D40] transition-transform hover:-translate-y-1 duration-300"
                                >
                                    Instagram
                                </a>
                                {/* YouTube */}
                                <a
                                    href={youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Watch us on YouTube"
                                    className="text-[#2D3A26]/60 hover:text-[#4A5D40] transition-transform hover:-translate-y-1 duration-300"
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
