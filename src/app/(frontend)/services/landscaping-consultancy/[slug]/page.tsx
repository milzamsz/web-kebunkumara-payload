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
                    typeof img === "object" && img !== null
                        ? (img as any).url ?? null
                        : null;
                const gallery = (doc.gallery ?? []).map((g: any) => {
                    const gImg = g.image;
                    return {
                        image:
                            typeof gImg === "object" && gImg !== null
                                ? (gImg as any).url ?? null
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

    const gridItemClasses = [
        "grid-item-1",
        "grid-item-2",
        "grid-item-3",
        "grid-item-4",
        "grid-item-5",
    ];

    return (
        <main className="pt-20">
            {/* ─── Hero ─────────────────────────────────────────── */}
            <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
                {proj.heroImage && (
                    <Image
                        src={proj.heroImage}
                        alt={`${proj.title} Hero`}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c18]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                            <div>

                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-2 leading-tight">
                                    {proj.title}
                                </h1>
                                <p className="text-white/80 text-lg md:text-xl font-light">
                                    {proj.tagline}
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <a
                                    className="flex items-center gap-2 text-white hover:text-[#d4a373] transition-colors text-sm uppercase tracking-widest font-bold"
                                    href="#technical-specs"
                                >
                                    View Technical Specs{" "}
                                    <span className="material-symbols-outlined">
                                        arrow_downward
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Technical Specs ──────────────────────────────── */}
            <section
                id="technical-specs"
                className="py-16 bg-white border-b border-stone-200"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                        <div className="md:col-span-1">
                            <h3 className="font-serif text-2xl text-[#4a6741] mb-4">
                                Project Data
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Detailed specifications for the {proj.title} landscaping
                                implementation.
                            </p>
                            <button className="w-full py-3 px-4 border border-[#4a6741] text-[#4a6741] hover:bg-[#4a6741] hover:text-white transition-colors text-xs uppercase tracking-widest font-bold rounded">
                                Download Blueprint
                            </button>
                        </div>
                        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
                            {proj.specs.map((spec) => (
                                <div key={spec.label} className="technical-border pl-4">
                                    <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                                        {spec.label}
                                    </span>
                                    <span className="block text-xl font-serif font-bold text-gray-900">
                                        {spec.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Technical Implementation Gallery ─────────────── */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-12 max-w-2xl">
                    <span className="text-[#d4a373] text-xs font-bold uppercase tracking-widest mb-2 block">
                        The Anatomy of the Design
                    </span>
                    <h2 className="font-serif text-4xl text-gray-900 mb-4">
                        Technical Implementation
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Every corner of the {proj.title} serves a specific ecological or
                        aesthetic function. We utilized a grid-based planting strategy to
                        maximize biodiversity within a constrained urban footprint.
                    </p>
                </div>

                <div className="grid-asymmetric">
                    {proj.gallery.map((item, i) => (
                        <div
                            key={i}
                            className={`${gridItemClasses[i] || ""} group relative overflow-hidden rounded-lg`}
                        >
                            {item.image && (
                                <Image
                                    src={item.image}
                                    alt={item.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}

                            {/* Item 0: System overview card at bottom */}
                            {i === 0 && item.label && (
                                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded border-l-4 border-[#4a6741]">
                                    <h4 className="font-bold text-[#4a6741] uppercase tracking-wider text-xs mb-1">
                                        {item.label}
                                    </h4>
                                    <p className="text-sm text-gray-700">{item.caption}</p>
                                </div>
                            )}

                            {/* Item 1: Hover tooltip */}
                            {i === 1 && (
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="bg-white p-3 rounded shadow-lg text-center mx-4">
                                        <p className="text-xs font-bold uppercase tracking-widest text-[#d4a373]">
                                            {item.badge}
                                        </p>
                                        <p className="text-sm font-serif mt-1">{item.caption}</p>
                                    </div>
                                </div>
                            )}

                            {/* Item 2: Bottom gradient label */}
                            {i === 2 && (
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                                    <p className="text-white text-xs font-mono">
                                        <span className="text-[#d4a373]">03.</span> {item.caption}
                                    </p>
                                </div>
                            )}

                            {/* Item 3: Badge + info card */}
                            {i === 3 && (
                                <>
                                    {item.badge && (
                                        <div className="absolute top-4 left-4 bg-[#4a6741] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                            {item.badge}
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="bg-[#f0efe9] p-3 rounded shadow-sm border border-stone-200">
                                            <h5 className="font-bold text-gray-900 text-sm">
                                                {item.label}
                                            </h5>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {item.caption}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Item 4: Badge at top + info panel at bottom */}
                            {i === 4 && (
                                <>
                                    {item.badge && (
                                        <div className="absolute top-4 right-4 bg-white/90 text-gray-900 text-xs font-bold px-3 py-1 rounded shadow uppercase tracking-widest">
                                            {item.badge}
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 w-full bg-white p-4 border-t border-[#d4a373]/30">
                                        <h5 className="font-bold text-[#4a6741] text-sm mb-1">
                                            {item.label}
                                        </h5>
                                        <p className="text-xs text-gray-600">{item.caption}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Plant Palette ────────────────────────────────── */}
            <section className="bg-stone-100 py-20 border-y border-stone-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">
                                Plant Palette
                            </h2>
                            <p className="text-gray-500 max-w-xl">
                                Curated selection of flora used in this ecosystem, chosen for
                                their resilience and aesthetic harmony.
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <Link href={`/projects/${slug}/plants`} className="text-[#4a6741] hover:text-[#364d2e] font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                                Full Plant List{" "}
                                <span className="material-symbols-outlined text-lg">
                                    list_alt
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {proj.plants.map((plant) => (
                            <div
                                key={plant.name}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md group-hover:border-[#4a6741] transition-colors duration-300">
                                    {plant.image && (
                                        <Image
                                            src={plant.image}
                                            alt={plant.name}
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform"
                                        />
                                    )}
                                </div>
                                <h4 className="font-serif italic text-lg text-gray-900">
                                    {plant.name}
                                </h4>
                                <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                                    {plant.common}
                                </span>
                            </div>
                        ))}
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
