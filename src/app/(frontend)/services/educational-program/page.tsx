import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { fallbackPrograms } from "@/lib/fallback-data";
import { ProgramImageSlider } from "@/components/ui/ProgramImageSlider";

export const metadata: Metadata = {
    title: "Educational Programs — Kebun Kumara",
    description: "Explore Kebun Kumara's educational programs: public workshops, corporate events, school programs, and more. Learn sustainable living through hands-on gardening.",
    openGraph: {
        title: "Educational Programs — Kebun Kumara",
        description: "Hands-on gardening workshops and programs for individuals, schools, and corporations.",
        url: "https://kebunkumara.id/services/educational-program",
        siteName: "Kebun Kumara",
        type: "website",
        locale: "id_ID",
    },
};

type ProgramData = (typeof fallbackPrograms)[number];

export default async function ProgramsPage() {
    let programs: ProgramData[] = fallbackPrograms;

    const phase = process.env.NEXT_PHASE;
    if (phase !== "phase-production-build") {
        try {
            const payload = await getPayload({ config });
            const result = await payload.find({
                collection: "services",
                where: {
                    and: [
                        { serviceCategory: { equals: "educational-program" } },
                        { _status: { equals: "published" } },
                    ],
                },
                sort: "displayOrder",
                depth: 1,
                limit: 20,
            });

            if (result.docs.length > 0) {
                // Merge CMS descriptions into fallback programs (CMS is source of truth for name/description)
                programs = fallbackPrograms.map((fp) => {
                    const cms = result.docs.find((d) => d.slug === fp.slug);
                    if (!cms) return fp;
                    const img = cms.coverImage;
                    return {
                        ...fp,
                        title: cms.name,
                        description: cms.shortDescription ?? fp.description,
                        image:
                            (typeof img === "object" && img !== null && "url" in img
                                ? (img as { url?: string | null }).url ?? null
                                : null) ?? fp.image,
                    };
                });
            }
        } catch (err) {
            console.error("[Programs] Failed to fetch from CMS:", err);
        }
    }
    return (
        <main>
            <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/generated/urban-garden-hero.png"
                        alt="Educational programs at Kebun Kumara"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </div>
                <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 sm:px-6 pt-20 animate-fade-in-up">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 drop-shadow-lg">
                        Educational Programs
                    </h1>
                    <p className="text-lg text-gray-200 max-w-xl mx-auto leading-relaxed">
                        Hands-on programs for individuals, schools, and corporations to learn sustainable living through gardening.
                    </p>
                </div>
            </section>

            {/* ─── Programs List ──────────────────────────────────── */}
            <section className="pt-0 pb-0 bg-[#F7F5EF]">
                <div className="w-full space-y-0">
                    {/* Public Workshops */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                        <div className="overflow-hidden group">
                            <Link href="/services/educational-program/public-workshops">
                                <ProgramImageSlider 
                                    images={[
                                        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
                                        "/images/generated/urban-garden-hero.png",
                                        "https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=600&h=400&fit=crop"
                                    ]}
                                    alt="Public Workshops"
                                />
                            </Link>
                        </div>

                        <div className="px-4 sm:px-6 lg:px-12 py-10 lg:py-0 lg:flex lg:flex-col lg:justify-center">
                            {/* Icon removed as per request */}
                            
                            <Link href="/services/educational-program/public-workshops">
                                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-4 hover:text-[#4F772D] transition-colors">
                                    Public Workshops
                                </h2>
                            </Link>
                            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                                Workshop kami membantu warga kota mendapatkan keterampilan yang mendukung perjalanan berkelanjutan dari rumah. Dari membuat kompos, berkebun di lahan sempit, hingga fermentasi makanan.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-100">
                                    Adults
                                </span>
                                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-100">
                                    Children
                                </span>
                            </div>
                            <div className="flex gap-4">
                                <a
                                    href="https://instagram.com/kebunkumara"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[#4F772D] font-semibold hover:gap-3 transition-all duration-300"
                                >
                                    Check our Monthly Schedule
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Group & Corporate Events (formerly Company Programs) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch lg:direction-rtl">
                        <div className="lg:order-2">
                            <div className="overflow-hidden group">
                                <Link href="/services/educational-program/company-programs">
                                    <ProgramImageSlider
                                        images={[
                                            "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=400&fit=crop",
                                            "/images/generated/urban-garden-hero.png",
                                            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                                        ]}
                                        alt="Group & Corporate Events"
                                    />
                                </Link>
                            </div>
                        </div>

                        <div className="lg:order-1 px-4 sm:px-6 lg:px-12 py-10 lg:py-0 lg:flex lg:flex-col lg:justify-center">
                            {/* Icon removed as per request */}
                            
                            <Link href="/services/educational-program/company-programs">
                                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-4 hover:text-[#4F772D] transition-colors">
                                    Group & Corporate Events
                                </h2>
                            </Link>
                            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                                Program dan acara perusahaan kami memperkuat kesadaran ekologi kolektif dan pengalaman keberlanjutan yang lebih mendalam. Cocok untuk team building, CSR, dan acara privat.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {[
                                    "Company Outing", 
                                    "CSR Programs", 
                                    "Birthday Party", 
                                    "Private Corporate Workshops", 
                                    "Employee Volunteering", 
                                    "Community Gathering"
                                ].map((tag, i) => (
                                    <span key={i} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-100">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <a
                                    href="#" // Placeholder for Drive/Proposal link
                                    className="inline-flex items-center gap-2 text-[#4F772D] font-semibold hover:gap-3 transition-all duration-300"
                                >
                                    Download our Program Proposal
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Remaining programs from fallback data (skipping first two which we customized) */}
                    {programs.slice(2).filter(program => program.slug !== "holiday").map((program, i) => (
                        <div
                            key={i + 2}
                            id={program.slug === "nature-playschool" ? "holiday-program" : undefined}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch ${i % 2 === 0 ? "" : "lg:direction-rtl"}`}
                        >
                            <div className={`${i % 2 === 0 ? "" : "lg:order-2"}`}>
                                <div className="overflow-hidden group">
                                    <Link href={`/services/educational-program/${program.slug}`}>
                                        {program.slug === "school-programs" ? (
                                            <ProgramImageSlider
                                                images={[
                                                    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
                                                    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
                                                    "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&h=400&fit=crop"
                                                ]}
                                                alt={program.title}
                                            />
                                        ) : program.slug === "nature-playschool" ? (
                                            <ProgramImageSlider
                                                images={[
                                                    "/images/programs-hero-child-garden.jpg",
                                                    "/images/generated/urban-garden-hero.png",
                                                    "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=600&h=400&fit=crop"
                                                ]}
                                                alt="Holiday Program"
                                            />
                                        ) : (
                                            program.image && (
                                                <Image
                                                    src={program.image}
                                                    alt={program.title}
                                                    width={600}
                                                    height={400}
                                                    className="w-full h-[520px] sm:h-[620px] lg:h-[720px] object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            )
                                        )}
                                    </Link>
                                </div>
                            </div>

                            <div className={`${i % 2 === 0 ? "" : "lg:order-1"} px-4 sm:px-6 lg:px-12 py-10 lg:py-0 lg:flex lg:flex-col lg:justify-center`}>
                                {/* Icon removed as per request */}

                                <Link href={`/services/educational-program/${program.slug}`}>
                                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-4 hover:text-[#4F772D] transition-colors">
                                        {program.slug === "nature-playschool" ? "Holiday Program" : program.title}
                                    </h2>
                                </Link>
                                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                                    {program.description}
                                </p>
                                
                                {program.slug === "school-programs" ? (
                                    <>
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {[
                                                "Field Trips",
                                                "Speakership", 
                                                "Extracurricular Activities", 
                                                "Workshops at School"
                                            ].map((tag, k) => (
                                                <span key={k} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-100">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-4">
                                            <a
                                                href="#" // Placeholder for Drive link
                                                className="inline-flex items-center gap-2 text-[#4F772D] font-semibold hover:gap-3 transition-all duration-300"
                                            >
                                                Download Our School Proposal
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </a>
                                        </div>
                                    </>
                                ) : program.slug === "nature-playschool" ? (
                                    <>
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-100">
                                                Children 2-12 years
                                            </span>
                                        </div>
                                        <div className="flex gap-4">
                                            <a
                                                href="#" // Catatan untuk Abi: Masuk ke Folder Publik 2026
                                                className="inline-flex items-center gap-2 text-[#4F772D] font-semibold hover:gap-3 transition-all duration-300"
                                            >
                                                Past Programs
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {program.features.map((feature, j) => (
                                                <span
                                                    key={j}
                                                    className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-100"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-4">
                                            <Link
                                                href={`/services/educational-program/${program.slug}`}
                                                className="inline-flex items-center gap-2 text-[#4F772D] font-semibold hover:gap-3 transition-all duration-300"
                                            >
                                                View Details
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── CTA ───────────────────────────────────────────── */}
            <section className="py-24 bg-[#4F772D]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
                    
                    <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                        Ingin Program Khusus untuk Komunitasmu?
                    </h2>
                    <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                        Kami bisa merancang program custom sesuai kebutuhan — hubungi kami untuk konsultasi gratis.
                    </p>
                    <a
                        href="https://wa.me/6281510986060"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#4F772D] font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </main>
    );
}
