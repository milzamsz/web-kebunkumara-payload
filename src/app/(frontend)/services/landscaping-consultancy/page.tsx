import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { fallbackProjects, fallbackProjectFilterTabs, fallbackClientLogos } from "@/lib/fallback-data";

export const metadata: Metadata = {
    title: "Landscaping Consultancy — Kebun Kumara",
    description: "We design living ecosystems. Private residences, schools, and corporate offices — we integrate permaculture and native biodiversity into every space.",
    openGraph: {
        title: "Landscaping Consultancy — Kebun Kumara",
        description: "Regenerative landscape design for urban spaces.",
        url: "https://kebunkumara.id/services/landscaping-consultancy",
        siteName: "Kebun Kumara",
        type: "website",
        locale: "id_ID",
    },
};

type ProjectCard = (typeof fallbackProjects)[number];

type Args = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProjectsPage({ searchParams }: Args) {
    let projects: ProjectCard[] = fallbackProjects;

    const filterTabs = fallbackProjectFilterTabs;
    const clientLogos = fallbackClientLogos;

    const sp = await searchParams;
    const rawFilter = sp.filter;
    const activeFilter = Array.isArray(rawFilter) ? rawFilter[0] : rawFilter;
    const selectedFilter = filterTabs.includes(activeFilter ?? "") ? (activeFilter ?? "All") : "All";

    const phase = process.env.NEXT_PHASE;
    if (phase !== "phase-production-build") {
        try {
            const payload = await getPayload({ config });
            const result = await payload.find({
                collection: "portfolios",
                where: { _status: { equals: "published" } },
                sort: "-publishedAt",
                depth: 1,
                limit: 20,
            });
            if (result.docs.length > 0) {
                projects = result.docs.map((doc) => {
                    const img = doc.coverImage;
                    const slug = String(doc.slug ?? doc.id);
                    const fallback = fallbackProjects.find((p) => p.slug === slug);
                    return {
                        slug,
                        title: String(doc.projectName ?? ""),
                        category: String(doc.location ?? "Portfolio"),
                        image:
                            typeof img === "object" && img !== null && "url" in img
                                ? (img as { url?: string | null }).url ?? fallback?.image ?? "/images/projects-hero-garden.png"
                                : fallback?.image ?? "/images/projects-hero-garden.png",
                    };
                });
            }
        } catch (err) {
            console.error("[Landscaping] Failed to fetch portfolios:", err);
        }
    }

    const filteredProjects =
        selectedFilter === "All"
            ? projects
            : projects.filter((p) => {
                const category = String(p.category ?? "");
                if (selectedFilter === "Edible Gardens") {
                    return category.toLowerCase().includes("edible");
                }
                return category.toLowerCase() === selectedFilter.toLowerCase();
            });
    return (
        <main>
            {/* ─── Hero ─────────────────────────────────────────── */}
            <section className="relative h-[80vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="/images/projects-hero-garden.png"
                        alt="Garden path with colorful flowers"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/70" />
                    <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#f0efe9] to-transparent" />
                </div>
                <div className="relative z-10 text-center px-4 pt-20 max-w-4xl mx-auto animate-fade-in-up">

                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                        Landscaping <br />
                        <span>Consultancy</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        Regenerative landscape design-and-build consultancy that integrates food production, biodiversity, and sustainable systems into meaningful spaces.
                    </p>
                </div>
            </section>

            {/* ─── Selected Projects ──────────────────────────────── */}
            <section
                id="selected-projects"
                className="py-12 bg-[#f0efe9]"
            >
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-6">
                        <div>
                            <h3 className="font-sans text-2xl md:text-3xl font-bold text-gray-900">
                                Selected Projects
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                            {filterTabs.map((tab) => (
                                <Link
                                    key={tab}
                                    href={
                                        tab === "All"
                                            ? "/services/landscaping-consultancy#selected-projects"
                                            : `/services/landscaping-consultancy?filter=${encodeURIComponent(tab)}#selected-projects`
                                    }
                                    className={`whitespace-nowrap px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full transition-all ${tab === selectedFilter
                                        ? "bg-[#4a6741] text-white shadow-sm"
                                        : "bg-white text-gray-600 border border-gray-200 hover:border-[#4a6741] hover:text-[#4a6741]"
                                        }`}
                                >
                                    {tab}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[300px] grid-flow-dense">
                        {filteredProjects.map((project, index) => {
                            const isFeatured = index === 0;
                            const isTall = index % 2 !== 0;

                            return (
                                <Link
                                    key={project.slug}
                                    href={`/services/landscaping-consultancy/${project.slug}`}
                                    className={`relative group overflow-hidden rounded-2xl block ${isFeatured ? "md:col-span-2 md:row-span-2" : ""
                                        } ${!isFeatured && isTall ? "md:row-span-2" : ""}`}
                                >
                                    {project.image && (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <span className="text-[#d4a373] text-xs uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            {project.category}
                                        </span>
                                        <h4 className="text-white font-serif text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                            {project.title}
                                        </h4>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>



            {/* ─── CTA ──────────────────────────────────────────── */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#4a6741]/10" />
                <div className="relative max-w-4xl mx-auto text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Ready to transform your space?
                    </h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                        Let&apos;s collaborate to bring nature back into your daily life.
                        Book a consultation with our landscape architects today.
                    </p>
                    <a
                        href="https://wa.me/6281510986060"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#4a6741] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#364d2e] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Start a Project
                    </a>
                </div>
            </section>
        </main>
    );
}
