"use client";

import Link from "next/link";
import Image from "next/image";

interface FooterProps {
    global?: {
        siteName?: string;
    };
    footer?: {
        logo?: { url?: string | null; alt?: string | null } | string | null;
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
    siteSettings?: {
        socialMedia?: {
            instagram?: string | null;
            facebook?: string | null;
            youtube?: string | null;
            tiktok?: string | null;
            linkedin?: string | null;
        } | null;
    };
}

type FooterLink = { label: string; href: string };

export default function Footer({ global, footer, siteSettings }: FooterProps) {
    const footerLogo =
        typeof footer?.logo === "object" && footer?.logo && "url" in footer.logo && footer.logo.url
            ? footer.logo.url
            : "/images/logo-footer.png";

    const fallbackInstagramUrl = "https://www.instagram.com/kebunkumara/";
    const fallbackFacebookUrl = "https://www.facebook.com/kebunkumara/";
    const fallbackYoutubeUrl = "https://www.youtube.com/c/kebunkumara";

    const cmsInstagramUrl =
        footer?.socialLinks?.find((l) => l.platform.toLowerCase() === "instagram")?.url ??
        siteSettings?.socialMedia?.instagram ??
        null;
    const cmsYoutubeUrl =
        footer?.socialLinks?.find((l) => l.platform.toLowerCase() === "youtube")?.url ??
        siteSettings?.socialMedia?.youtube ??
        null;
    const cmsFacebookUrl =
        footer?.socialLinks?.find((l) => l.platform.toLowerCase() === "facebook")?.url ??
        siteSettings?.socialMedia?.facebook ??
        null;

    const instagramUrl = cmsInstagramUrl ?? fallbackInstagramUrl;
    const youtubeUrl = cmsYoutubeUrl ?? fallbackYoutubeUrl;
    const facebookUrl = cmsFacebookUrl ?? fallbackFacebookUrl;

    const cmsFooterLinks: FooterLink[] =
        footer?.columns?.length
            ? footer.columns
                .flatMap((col) => col.links ?? [])
                .filter((l): l is { label: string; url: string } => Boolean(l && l.label && l.url))
                .map((l) => ({ label: l.label, href: l.url }))
            : [];

    const fallbackFooterLinks: FooterLink[] = [
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact Us", href: "/contact" },
        { label: "In The Media", href: "/media" },
    ];

    const footerLinks = (cmsFooterLinks.length ? cmsFooterLinks : fallbackFooterLinks).slice(0, 4);

    const copyrightText =
        footer?.copyrightText ?? "© 2026 Kebun Kumara. All rights reserved.";

    return (
        <footer className="bg-gradient-to-b from-[#F9F7F0] to-[#E6E2D0] text-[#2A3C24] py-16 md:py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center">
                    
                    {/* Left: Navigation */}
                    <div className="flex flex-col items-center md:items-start gap-4 order-2 md:order-1">
                        {footerLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-lg font-medium hover:text-[#4F772D] transition-colors underline decoration-1 underline-offset-4 decoration-[#2A3C24]/30 hover:decoration-[#4F772D]"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    {/* Center: Logo */}
                    <div className="flex flex-col items-center gap-6 order-1 md:order-2">
                        <div className="relative w-64 h-64 md:w-96 md:h-96">
                            <Image
                                src={footerLogo}
                                alt={global?.siteName ?? "Kebun Kumara"}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 256px, 384px"
                            />
                        </div>
                    </div>

                    {/* Right: Socials */}
                    <div className="flex flex-col items-center md:items-end gap-6 order-3">
                        <h3 className="font-serif text-xl italic text-[#2A3C24]">Find Us Around The Web!</h3>
                        <div className="flex gap-6">
                            <a
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2A3C24] hover:text-[#4F772D] transition-colors transform hover:scale-110 duration-300"
                                aria-label="Instagram"
                            >
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href={facebookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2A3C24] hover:text-[#4F772D] transition-colors transform hover:scale-110 duration-300"
                                aria-label="Facebook"
                            >
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href={youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2A3C24] hover:text-[#4F772D] transition-colors transform hover:scale-110 duration-300"
                                aria-label="YouTube"
                            >
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-20 border-t border-[#2A3C24]/10 pt-8 text-center text-sm text-[#2A3C24]/60">
                    <p>{copyrightText}</p>
                </div>
            </div>
        </footer>
    );
}
