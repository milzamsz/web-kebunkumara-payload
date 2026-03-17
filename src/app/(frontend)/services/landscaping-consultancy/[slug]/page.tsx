import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

/* ── Fallback project data ────────────────────────────────── */
type ProjectDetail = {
    title: string;
    category: string;
    tagline: string;
    heroImage: string | null;
    specs: { label: string; value: string }[];
    gallery: {
        image: string | null;
        alt: string;
        label?: string;
        caption?: string;
        badge?: string;
    }[];
    plants: { name: string; common: string; image: string | null }[];
};

const fallbackProjectsData: Record<string, ProjectDetail> = {
    "menteng-glass-house": {
        title: "Menteng Glass House",
        category: "Residential Project",
        tagline:
            "A symbiotic living space integrating light, flora, and modern architecture.",
        heroImage:
            "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2832&auto=format&fit=crop",
        specs: [
            { label: "Total Area", value: "450 m²" },
            { label: "Completion", value: "Nov 2022" },
            { label: "Soil Type", value: "Loamy Sand Mix" },
            { label: "Irrigation", value: "Drip System II" },
            { label: "Plant Count", value: "120+ Species" },
            { label: "Sun Exposure", value: "Partial Shade" },
            { label: "Client", value: "Private" },
            { label: "Lead Architect", value: "Sarah D." },
        ],
        gallery: [
            {
                image:
                    "/images/generated/landscaping-project.png",
                alt: "Main irrigation layout",
                label: "System Overview",
                caption:
                    "Integrated rainwater harvesting system feeding into a sub-surface drip irrigation network.",
            },
            {
                image:
                    "/images/generated/landscaping-project.png",
                alt: "Native plant detail",
                badge: "Macro Detail",
                caption: "Leaf Texture Variation",
            },
            {
                image:
                    "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=800&h=1200&fit=crop",
                alt: "Edible corner detail",
                caption: "Edible Corner: Thai Basil & Chili",
            },
            {
                image:
                    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=800&fit=crop",
                alt: "Pathway materials",
                badge: "Materiality",
                label: "Andesite Stepping Stones",
                caption:
                    "Selected for high friction coefficient and natural weathering.",
            },
            {
                image:
                    "/images/generated/garden-tools-soil.png",
                alt: "Vertical garden structure",
                badge: "Structural",
                label: "Vertical Integration",
                caption:
                    "Custom steel framework supporting climbing Philodendrons to maximize vertical green ratio.",
            },
        ],
        plants: [
            {
                name: "Monstera Deliciosa",
                common: "Swiss Cheese Plant",
                image:
                    "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop",
            },
            {
                name: "Calathea Orbifolia",
                common: "Prayer Plant",
                image:
                    "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=400&h=400&fit=crop",
            },
            {
                name: "Ficus Lyrata",
                common: "Fiddle Leaf Fig",
                image:
                    "/images/generated/landscaping-team.png",
            },
            {
                name: "Ocimum Basilicum",
                common: "Sweet Basil",
                image:
                    "/images/generated/tropical-plant.png",
            },
        ],
    },
    "kemang-rooftop-oasis": {
        title: "Kemang Rooftop Oasis",
        category: "Commercial Project",
        tagline:
            "An elevated green space transforming a concrete rooftop into a productive urban farm.",
        heroImage:
            "/images/generated/landscaping-project.png",
        specs: [
            { label: "Total Area", value: "320 m²" },
            { label: "Completion", value: "Mar 2023" },
            { label: "Soil Type", value: "Lightweight Mix" },
            { label: "Irrigation", value: "Automated Drip" },
            { label: "Plant Count", value: "80+ Species" },
            { label: "Sun Exposure", value: "Full Sun" },
            { label: "Client", value: "Office Building" },
            { label: "Lead Architect", value: "Andi K." },
        ],
        gallery: [
            {
                image:
                    "/images/generated/landscaping-project.png",
                alt: "Rooftop overview",
                label: "System Overview",
                caption:
                    "Modular planting beds with integrated drainage and waterproofing.",
            },
        ],
        plants: [
            {
                name: "Capsicum Annuum",
                common: "Chili Pepper",
                image: "/images/generated/tropical-plant.png",
            },
        ],
    },
    "native-flora-study": {
        title: "Native Flora Study",
        category: "Detailing",
        tagline: "A meticulous study of native flora integration in urban landscapes.",
        heroImage:
            "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=2000&auto=format&fit=crop",
        specs: [
            { label: "Total Area", value: "N/A" },
            { label: "Completion", value: "Ongoing" },
            { label: "Soil Type", value: "Varied" },
            { label: "Irrigation", value: "Manual" },
            { label: "Plant Count", value: "200+ Species" },
            { label: "Sun Exposure", value: "Varied" },
            { label: "Client", value: "Research" },
            { label: "Lead Architect", value: "Research Team" },
        ],
        gallery: [
            {
                image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=600&fit=crop",
                alt: "Native flora details",
                label: "Flora Detail",
                caption: "Close-up of native species.",
            }
        ],
        plants: [],
    },
    "cilandak-zen-garden": {
        title: "Cilandak Zen Garden",
        category: "Residential",
        tagline: "A peaceful retreat designed for meditation and relaxation.",
        heroImage:
            "/images/generated/garden-tools-soil.png",
        specs: [
            { label: "Total Area", value: "150 m²" },
            { label: "Completion", value: "June 2023" },
            { label: "Soil Type", value: "Clay Mix" },
            { label: "Irrigation", value: "Drip System" },
            { label: "Plant Count", value: "40+ Species" },
            { label: "Sun Exposure", value: "Shade" },
            { label: "Client", value: "Private" },
            { label: "Lead Architect", value: "Dian S." },
        ],
        gallery: [
             {
                image: "/images/generated/garden-tools-soil.png",
                alt: "Zen garden view",
                label: "Garden View",
                caption: "Main view of the zen garden.",
            }
        ],
        plants: [],
    },
    "school-learning-farm": {
        title: "School Learning Farm",
        category: "Community",
        tagline: "An educational space for students to learn about agriculture.",
        heroImage:
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=2000&auto=format&fit=crop",
        specs: [
            { label: "Total Area", value: "500 m²" },
            { label: "Completion", value: "Aug 2023" },
            { label: "Soil Type", value: "Compost Rich" },
            { label: "Irrigation", value: "Sprinkler" },
            { label: "Plant Count", value: "50+ Species" },
            { label: "Sun Exposure", value: "Full Sun" },
            { label: "Client", value: "International School" },
            { label: "Lead Architect", value: "Rizky G." },
        ],
        gallery: [
             {
                image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
                alt: "Learning farm",
                label: "Farm Overview",
                caption: "Students learning area.",
            }
        ],
        plants: [],
    },
    "bintaro-office-park": {
        title: "Bintaro Office Park",
        category: "Commercial",
        tagline: "Greening the corporate environment for better well-being.",
        heroImage:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&auto=format&fit=crop",
        specs: [
            { label: "Total Area", value: "1000 m²" },
            { label: "Completion", value: "Dec 2023" },
            { label: "Soil Type", value: "Standard Mix" },
            { label: "Irrigation", value: "Automated" },
            { label: "Plant Count", value: "300+ Species" },
            { label: "Sun Exposure", value: "Partial Sun" },
            { label: "Client", value: "Corporate" },
            { label: "Lead Architect", value: "Budi L." },
        ],
        gallery: [
             {
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
                alt: "Office park",
                label: "Park View",
                caption: "Green area between buildings.",
            }
        ],
        plants: [],
    },
    "sustainable-kitchen-garden": {
        title: "Sustainable Kitchen Garden",
        category: "Edible",
        tagline: "Fresh herbs and vegetables right at your doorstep.",
        heroImage:
            "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=2000&auto=format&fit=crop",
        specs: [
            { label: "Total Area", value: "20 m²" },
            { label: "Completion", value: "Jan 2024" },
            { label: "Soil Type", value: "Potting Mix" },
            { label: "Irrigation", value: "Manual" },
            { label: "Plant Count", value: "15+ Species" },
            { label: "Sun Exposure", value: "Partial Sun" },
            { label: "Client", value: "Private" },
            { label: "Lead Architect", value: "Sari C." },
        ],
        gallery: [
             {
                image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800&h=600&fit=crop",
                alt: "Kitchen garden",
                label: "Garden Setup",
                caption: "Vertical herb garden.",
            }
        ],
        plants: [],
    },
    "peruri": {
        title: "Taman Kota Peruri",
        category: "Public Space",
        tagline: "Transforming a neglected public space into a thriving community hub.",
        heroImage: "/images/generated/urban-garden-hero.png",
        specs: [
            { label: "Total Area", value: "2000 m²" },
            { label: "Completion", value: "Oct 2022" },
            { label: "Soil Type", value: "Mixed" },
            { label: "Irrigation", value: "Sprinkler" },
            { label: "Plant Count", value: "150+ Species" },
            { label: "Sun Exposure", value: "Full Sun" },
            { label: "Client", value: "Peruri" },
            { label: "Lead Architect", value: "Sarah D." },
        ],
        gallery: [
             {
                image: "/images/generated/urban-garden-hero.png",
                alt: "Peruri Park",
                label: "Park View",
                caption: "Community gathering space.",
            }
        ],
        plants: [],
    },
    "sqp": {
        title: "Scientia Square Park",
        category: "Educational Farm",
        tagline: "Our flagship educational farm located in the heart of Gading Serpong.",
        heroImage: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=2000&auto=format&fit=crop",
        specs: [
            { label: "Total Area", value: "5000 m²" },
            { label: "Completion", value: "2018" },
            { label: "Soil Type", value: "Compost Rich" },
            { label: "Irrigation", value: "Automated" },
            { label: "Plant Count", value: "500+ Species" },
            { label: "Sun Exposure", value: "Full Sun" },
            { label: "Client", value: "SQP" },
            { label: "Lead Architect", value: "Dhira N." },
        ],
        gallery: [
             {
                image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800&h=600&fit=crop",
                alt: "SQP Farm",
                label: "Farm View",
                caption: "Educational beds.",
            }
        ],
        plants: [],
    },
    "gresk": {
        title: "Community Greenspace",
        category: "Community",
        tagline: "Integrating edible landscapes into residential areas.",
        heroImage: "https://images.unsplash.com/photo-1584473457406-6240486418e9?q=80&w=2000&auto=format&fit=crop",
        specs: [
            { label: "Total Area", value: "300 m²" },
            { label: "Completion", value: "Feb 2023" },
            { label: "Soil Type", value: "Raised Beds" },
            { label: "Irrigation", value: "Manual" },
            { label: "Plant Count", value: "50+ Species" },
            { label: "Sun Exposure", value: "Partial Sun" },
            { label: "Client", value: "Community" },
            { label: "Lead Architect", value: "Ade" },
        ],
        gallery: [
             {
                image: "https://images.unsplash.com/photo-1584473457406-6240486418e9?w=800&h=600&fit=crop",
                alt: "Community Garden",
                label: "Garden View",
                caption: "Residents gardening together.",
            }
        ],
        plants: [],
    },
};

const fallbackSlugs = Object.keys(fallbackProjectsData);

async function resolveProject(slug: string): Promise<ProjectDetail | null> {
    const phase = process.env.NEXT_PHASE;
    if (phase !== "phase-production-build") {
        try {
            const payload = await getPayload({ config });
            const result = await payload.find({
                collection: "portfolios",
                where: { slug: { equals: slug }, _status: { equals: "published" } },
                depth: 1,
                limit: 1,
            });
            if (result.docs.length > 0) {
                const doc = result.docs[0];
                const img = doc.coverImage;
                const heroImage =
                    typeof img === "object" && img !== null && "url" in img
                        ? (img as { url?: string | null }).url ?? null
                        : null;
                const gallery = (Array.isArray(doc.gallery) ? doc.gallery : []).map((g) => {
                    const gImg =
                        typeof g === "object" && g !== null && "image" in g
                            ? (g as { image?: unknown }).image
                            : null;
                    return {
                        image:
                            typeof gImg === "object" && gImg !== null && "url" in gImg
                                ? (gImg as { url?: string | null }).url ?? null
                                : null,
                        alt: doc.projectName,
                    };
                });
                const specs: { label: string; value: string }[] = [];
                if (doc.location) specs.push({ label: "Location", value: doc.location });
                if (doc.yearCompleted)
                    specs.push({ label: "Completion", value: String(doc.yearCompleted) });
                if (doc.clientName) specs.push({ label: "Client", value: doc.clientName });
                return {
                    title: doc.projectName,
                    category: doc.location ?? "Portfolio",
                    tagline: doc.location
                        ? `A landscaping project in ${doc.location}.`
                        : "A Kebun Kumara signature project.",
                    heroImage,
                    specs: specs.length > 0 ? specs : [{ label: "Project", value: doc.projectName }],
                    gallery:
                        gallery.length > 0
                            ? gallery
                            : [{ image: heroImage, alt: doc.projectName }],
                    plants: [],
                };
            }
        } catch (err) {
            console.error("[Landscaping/Slug] Failed to fetch from CMS:", err);
        }
    }
    return fallbackProjectsData[slug] ?? null;
}

async function resolveAllSlugs(): Promise<string[]> {
    const phase = process.env.NEXT_PHASE;
    if (phase !== "phase-production-build") {
        try {
            const payload = await getPayload({ config });
            const result = await payload.find({
                collection: "portfolios",
                where: { _status: { equals: "published" } },
                depth: 0,
                limit: 100,
            });
            if (result.docs.length > 0) {
                return result.docs.map((doc) => doc.slug ?? String(doc.id));
            }
        } catch (err) {
            console.error("[Landscaping/AllSlugs] Failed to fetch from CMS:", err);
        }
    }
    return fallbackSlugs;
}

export async function generateStaticParams() {
    const slugs = await resolveAllSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const proj = await resolveProject(slug);
    return {
        title: proj
            ? `${proj.title} — Design & Build — Kebun Kumara`
            : "Project Not Found",
        description: proj?.tagline,
    };
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const proj = await resolveProject(slug);
    if (!proj) return notFound();

    const allSlugs = await resolveAllSlugs();
    const currentIndex = allSlugs.indexOf(slug);
    const prevSlug =
        currentIndex > 0 ? allSlugs[currentIndex - 1] : allSlugs[allSlugs.length - 1];
    const nextSlug =
        currentIndex < allSlugs.length - 1
            ? allSlugs[currentIndex + 1]
            : allSlugs[0];
    const findSpecValue = (labels: string[]) => {
        for (const label of labels) {
            const hit = proj.specs.find((s) => s.label.toLowerCase() === label.toLowerCase());
            if (hit?.value) return hit.value;
        }
        return "—";
    };

    const typeValue = proj.category || "—";
    const locationValue = findSpecValue(["Location"]);
    const areaValue = findSpecValue(["Total Area", "Area"]);
    const yearValue = findSpecValue(["Year", "Completion"]);

    const displayTitle = proj.title?.trim() || "Forest Garden";
    const displayYear = yearValue !== "—" ? yearValue : "2023";
    const displayLocation =
        locationValue !== "—"
            ? locationValue
            : proj.category && proj.category !== "—"
                ? proj.category
                : "BSD";
    const displayArea = areaValue !== "—" ? areaValue : "50 sqm";
    const displayType =
        typeValue === "—" || typeValue.toLowerCase() === displayLocation.toLowerCase()
            ? "Forest Garden"
            : typeValue;

    const dummySliderImages = [
        "/images/projects-hero-garden.png",
        "/images/generated/landscaping-project.png",
        "/images/generated/garden-tools-soil.png",
        "/images/generated/urban-garden-hero.png",
        "/images/generated/chicken-coop.png",
    ];

    const allImages = [
        proj.heroImage,
        ...proj.gallery.map((g) => g.image),
    ].filter((img): img is string => typeof img === "string" && img.length > 0);

    const sliderImages: string[] = [];
    const seenImages = new Set<string>();

    for (const img of allImages) {
        if (sliderImages.length >= 5) break;
        if (seenImages.has(img)) continue;
        seenImages.add(img);
        sliderImages.push(img);
    }

    for (const img of dummySliderImages) {
        if (sliderImages.length >= 5) break;
        if (seenImages.has(img)) continue;
        seenImages.add(img);
        sliderImages.push(img);
    }

    while (sliderImages.length < 5) {
        const fallback = dummySliderImages[sliderImages.length % dummySliderImages.length];
        sliderImages.push(fallback);
    }

    return (
        <main className="pt-20">
            <section className="px-4 sm:px-6 lg:px-8 pt-10">
                <div className="max-w-7xl mx-auto">
                    <div className="relative w-full aspect-[16/9] bg-stone-200 overflow-hidden rounded">
                        <div className="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
                            {sliderImages.map((img, i) => (
                                (() => {
                                    const prevIndex = (i - 1 + sliderImages.length) % sliderImages.length;
                                    const nextIndex = (i + 1) % sliderImages.length;
                                    return (
                                <div
                                    key={`${slug}-${i}`}
                                    id={`${slug}-slide-${i + 1}`}
                                    className="relative min-w-full h-full snap-start"
                                >
                                    <Image
                                        src={img}
                                        alt={`${proj.title} photo ${i + 1}`}
                                        fill
                                        className="object-cover"
                                        priority={i === 0}
                                    />

                                    <a
                                        href={`#${slug}-slide-${prevIndex + 1}`}
                                        aria-label="Previous photo"
                                        className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/85 backdrop-blur flex items-center justify-center text-gray-900 hover:bg-white transition-colors shadow-sm"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            chevron_left
                                        </span>
                                    </a>

                                    <a
                                        href={`#${slug}-slide-${nextIndex + 1}`}
                                        aria-label="Next photo"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/85 backdrop-blur flex items-center justify-center text-gray-900 hover:bg-white transition-colors shadow-sm"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            chevron_right
                                        </span>
                                    </a>
                                </div>
                                    );
                                })()
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
                        {sliderImages.map((img, i) => (
                            <a
                                key={`${slug}-thumb-${i}`}
                                href={`#${slug}-slide-${i + 1}`}
                                className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 overflow-hidden rounded border border-stone-200 bg-white hover:border-[#4a6741] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a6741]"
                                aria-label={`Go to photo ${i + 1}`}
                            >
                                <Image
                                    src={img}
                                    alt={`${proj.title} thumbnail ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    <h1 className="font-sans text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-widest">
                        {displayTitle}
                    </h1>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <dl className="text-sm text-gray-700 space-y-3">
                            <div className="grid grid-cols-[90px_1fr] gap-4">
                                <dt className="font-bold text-gray-600">Type:</dt>
                                <dd className="text-gray-900">{displayType}</dd>
                            </div>
                            <div className="grid grid-cols-[90px_1fr] gap-4">
                                <dt className="font-bold text-gray-600">Location:</dt>
                                <dd className="text-gray-900">{displayLocation}</dd>
                            </div>
                            <div className="grid grid-cols-[90px_1fr] gap-4">
                                <dt className="font-bold text-gray-600">Area:</dt>
                                <dd className="text-gray-900">{displayArea}</dd>
                            </div>
                            <div className="grid grid-cols-[90px_1fr] gap-4">
                                <dt className="font-bold text-gray-600">Year:</dt>
                                <dd className="text-gray-900">{displayYear}</dd>
                            </div>
                        </dl>

                        <div className="text-gray-700 leading-relaxed">
                            <p>{proj.tagline}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Project Navigation ───────────────────────────── */}
            <section className="py-16 px-4 border-t border-stone-200">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link
                        href={`/projects/${prevSlug}`}
                        className="group flex items-center gap-4 text-left"
                    >
                        <div>
                            <span className="block text-xs uppercase tracking-widest text-gray-400 group-hover:text-[#4a6741] transition-colors">
                                Previous
                            </span>
                            <span className="font-serif text-xl text-gray-900">
                                {prevSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                            </span>
                        </div>
                    </Link>

                    <div className="h-8 w-px bg-stone-300 hidden sm:block" />

                    <Link
                        href={`/projects/${nextSlug}`}
                        className="group flex items-center gap-4 text-right flex-row-reverse"
                    >
                        <div>
                            <span className="block text-xs uppercase tracking-widest text-gray-400 group-hover:text-[#4a6741] transition-colors">
                                Next Project
                            </span>
                            <span className="font-serif text-xl text-gray-900">
                                {nextSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                            </span>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    );
}
