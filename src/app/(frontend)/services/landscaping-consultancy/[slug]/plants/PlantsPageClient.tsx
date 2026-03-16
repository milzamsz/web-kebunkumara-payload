"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ── Plant data per project ─────────────────────────────── */
const plantsByProject: Record<
    string,
    {
        projectTitle: string;
        plants: {
            id: string;
            name: string;
            latin: string;
            category: "Edible" | "Ornamental" | "Shade-loving";
            image: string;
            family?: string;
            origin?: string;
            care: { icon: string; text: string }[];
            benefits: { icon: string; text: string }[];
            note?: string;
        }[];
    }
> = {
    "menteng-glass-house": {
        projectTitle: "Menteng Glass House",
        plants: [
            {
                id: "monstera",
                name: "Swiss Cheese Plant",
                latin: "Monstera deliciosa",
                category: "Ornamental",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtXEv-klcY2RGfZxNXrXumwC6zMu-XFYo531bLro71tMBw1HQ2Uk49qZvw2UiNntriWtL4Rp4h59g_KhxHvf9CU18aRotCYBefUe2IUJDUT0gbxxCeMjeU3vZqXvMXXM0dLQfogbcGUoor4ilLSKHUwB9PlZt3VtC9uZ2CNySywWxafQmHVza5Yo79LA_qTk4wCzh9myNZQkUvhiAsjmUxW7Fnx_nTCTiDt5WVIbeuvoruBpGE2yXXiyHJrfoFxkkZfOmFnnCoYmaW",
                family: "Araceae Family",
                origin: "Tropical",
                care: [
                    { icon: "water_drop", text: "Water weekly, allow soil to dry" },
                    { icon: "light_mode", text: "Bright, indirect sunlight" },
                    { icon: "thermostat", text: "High humidity preferred" },
                ],
                benefits: [
                    { icon: "air", text: "Excellent air purifier" },
                    { icon: "psychology", text: "Stress reduction visual" },
                ],
                note: "A statement piece in the Menteng Glass House, used primarily in the shaded atrium to create depth and tropical texture against the concrete walls.",
            },
            {
                id: "calathea",
                name: "Prayer Plant",
                latin: "Calathea orbifolia",
                category: "Shade-loving",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjJ5t5H2IIOr8v84OO-7l4vQuD79KB-TTcgtChAKGm-aunajD-lnODjHCH_6wRwE0CSl7-nX-awbbjnKdoPTDEVtUkG8eDURQncnnodH9N7ShRoKNdPJh9Vs-PkMu6yBgZE3yhScZpZ8YSs5g8zIwDVm8lYiFZZkd08jqr-YtypAqroaG2u7amKfXd01fl16KvtSTMFsih4HAU5hE5AuE3iFMeLyd6IPGr-zE3_2DqidarWbX6A1fSf5wRc7Y5ahEf0Rp608Pp2DqG",
                family: "Marantaceae",
                origin: "Understory",
                care: [
                    { icon: "water_drop", text: "Keep moist, do not overwater" },
                    { icon: "wb_twilight", text: "Low to medium light" },
                ],
                benefits: [
                    { icon: "local_florist", text: "Bio-indicator for humidity" },
                ],
            },
            {
                id: "ficus-lyrata",
                name: "Fiddle Leaf Fig",
                latin: "Ficus lyrata",
                category: "Ornamental",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAapx4_yliDtRJziWKg5ZsTaR2An0GFKoCWMMeibPUXhx6RUM3I-pgIZN0dPlfHzrvnFGi0oj8wpUl8m-oeD0kpeL1jDHXUD8d-B8KVn3pBqSeOlH5gAHIvsdB6NDx5YEysu1-oJzUNMgtcSThHq4CGKUWK4v4Cj1YZQOZX6mGz7ZegLH8Pl7cHgHA8qbEPuWslRKv9F3FXLR34jSLfvMhtGRCOI8mFMHwOwb_F5DK_KHa8EW6LhFiSz_SfAnjFeTDdyhvAAQIvoDF0",
                family: "Moraceae",
                origin: "Tropical",
                care: [
                    { icon: "water_drop", text: "Moderate watering, avoid moist roots" },
                    { icon: "light_mode", text: "Bright indirect light" },
                ],
                benefits: [
                    { icon: "air", text: "Good air purifier" },
                    { icon: "psychiatry", text: "Dramatic foliage accent" },
                ],
            },
            {
                id: "basil",
                name: "Sweet Basil",
                latin: "Ocimum basilicum",
                category: "Edible",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgt0yjri8SVi1PApTGeweVaudyEY9TJK3uFPIBY9n0RQwheckj3SAm9rq_4dPluayoqPYN7TYnYT7G6rc63QuZoJ1hKe9VbWlyOFYaNqxYN4Lv_n-rCgUZQDaV6IflDSURjZZmQ4-9dzb2ZSnzy-eEJAkyY6GRTaEvOglrVzSSyCx1mw7eno5fOiaipAqg7TUJ9c1VovQw_B-jwJrQbX4LY9lTPRsf4lKI8TpIu1Jz45q94kxyfd0qbO97fNOd0ZlyiFWWXPpe3CKI",
                family: "Lamiaceae",
                origin: "Mediterranean",
                care: [
                    { icon: "water_drop", text: "Regular watering, moist soil" },
                    { icon: "light_mode", text: "Full sun or bright light" },
                ],
                benefits: [
                    { icon: "restaurant", text: "Culinary herb" },
                    { icon: "pest_control", text: "Natural pest repellent" },
                ],
            },
            {
                id: "heartleaf-philo",
                name: "Heartleaf Philo",
                latin: "Philodendron hederaceum",
                category: "Shade-loving",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsYtINOTN6aIl6zB9n4MfExfYhWA9XLPDf8KAf_I0JYpZS5c-9ytf2c55BlC39D3ntc69I_vb8G82GbCeRDYZgZDV4EhHDMn9jU_qrkWZhMW1z1khJLcty5PP2GRYXZKZ0-e4Zzr1zb3qYTOIFwCawUOObEsHmLiXML10EGrz_OSCgcfhgqVORucj8CRMCk2oW9xtcKCUv5Q4NThxo7zASmQOUJtdjymhM1QLtj-TgIj5lv0q_l5rwP5annin7bTM-7HYHuNLghcdn",
                family: "Araceae",
                origin: "Tropical Americas",
                care: [
                    { icon: "water_drop", text: "Water when top soil dries" },
                    { icon: "wb_twilight", text: "Low to bright indirect light" },
                ],
                benefits: [
                    { icon: "air", text: "Removes formaldehyde" },
                    { icon: "local_florist", text: "Fast grower, easy propagation" },
                ],
            },
            {
                id: "snake-plant",
                name: "Snake Plant",
                latin: "Sansevieria trifasciata",
                category: "Ornamental",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnrBlG1LDwMHucJwo4xeTfB8egtV9oHwefD_CsM3sSHKa6Hfwemq26_BWeV8UJOBrMnaOwOQFKDRgZgL-AqIc4W5_tX3iYNz9oRCmO6gmLC8IbSK7jBokRIXz2Il_342RCRuo5XqVNagCZAtqKwFRtTs3UJgsvIOZ_dVCxi6TUHJXZSUhb_Avx7BUcbOlNLWRzu24fBiGN1A_h0YwqmaWx9GTmuNZIVohBc3Iu6tHJuC_w-w1vbBu3PtGwfUhObP38jvBsmAxo52-B",
                family: "Asparagaceae",
                origin: "West Africa",
                care: [
                    { icon: "water_drop", text: "Very low water needs" },
                    { icon: "light_mode", text: "Any light condition" },
                ],
                benefits: [
                    { icon: "air", text: "Nighttime oxygen producer" },
                    { icon: "local_florist", text: "Nearly indestructible" },
                ],
            },
            {
                id: "elephant-ear",
                name: "Elephant Ear",
                latin: "Alocasia macrorrhizos",
                category: "Ornamental",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjJ5t5H2IIOr8v84OO-7l4vQuD79KB-TTcgtChAKGm-aunajD-lnODjHCH_6wRwE0CSl7-nX-awbbjnKdoPTDEVtUkG8eDURQncnnodH9N7ShRoKNdPJh9Vs-PkMu6yBgZE3yhScZpZ8YSs5g8zIwDVm8lYiFZZkd08jqr-YtypAqroaG2u7amKfXd01fl16KvtSTMFsih4HAU5hE5AuE3iFMeLyd6IPGr-zE3_2DqidarWbX6A1fSf5wRc7Y5ahEf0Rp608Pp2DqG",
                family: "Araceae",
                origin: "Southeast Asia",
                care: [
                    { icon: "water_drop", text: "Regular watering, humid conditions" },
                    { icon: "light_mode", text: "Bright indirect light" },
                ],
                benefits: [
                    { icon: "psychiatry", text: "Bold architectural foliage" },
                ],
            },
            {
                id: "chili",
                name: "Bird's Eye Chili",
                latin: "Capsicum frutescens",
                category: "Edible",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtXEv-klcY2RGfZxNXrXumwC6zMu-XFYo531bLro71tMBw1HQ2Uk49qZvw2UiNntriWtL4Rp4h59g_KhxHvf9CU18aRotCYBefUe2IUJDUT0gbxxCeMjeU3vZqXvMXXM0dLQfogbcGUoor4ilLSKHUwB9PlZt3VtC9uZ2CNySywWxafQmHVza5Yo79LA_qTk4wCzh9myNZQkUvhiAsjmUxW7Fnx_nTCTiDt5WVIbeuvoruBpGE2yXXiyHJrfoFxkkZfOmFnnCoYmaW",
                family: "Solanaceae",
                origin: "Southeast Asia",
                care: [
                    { icon: "light_mode", text: "Full sun exposure" },
                    { icon: "water_drop", text: "Regular watering" },
                ],
                benefits: [
                    { icon: "restaurant", text: "Essential kitchen ingredient" },
                    { icon: "pest_control", text: "Companion planting pest deterrent" },
                ],
            },
            {
                id: "rubber-fig",
                name: "Rubber Fig",
                latin: "Ficus elastica",
                category: "Ornamental",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgt0yjri8SVi1PApTGeweVaudyEY9TJK3uFPIBY9n0RQwheckj3SAm9rq_4dPluayoqPYN7TYnYT7G6rc63QuZoJ1hKe9VbWlyOFYaNqxYN4Lv_n-rCgUZQDaV6IflDSURjZZmQ4-9dzb2ZSnzy-eEJAkyY6GRTaEvOglrVzSSyCx1mw7eno5fOiaipAqg7TUJ9c1VovQw_B-jwJrQbX4LY9lTPRsf4lKI8TpIu1Jz45q94kxyfd0qbO97fNOd0ZlyiFWWXPpe3CKI",
                family: "Moraceae",
                origin: "Southeast Asia",
                care: [
                    { icon: "water_drop", text: "Let top soil dry between waterings" },
                    { icon: "light_mode", text: "Bright indirect light" },
                ],
                benefits: [
                    { icon: "air", text: "Effective air purifier" },
                ],
            },
            {
                id: "golden-pothos",
                name: "Golden Pothos",
                latin: "Epipremnum aureum",
                category: "Shade-loving",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnrBlG1LDwMHucJwo4xeTfB8egtV9oHwefD_CsM3sSHKa6Hfwemq26_BWeV8UJOBrMnaOwOQFKDRgZgL-AqIc4W5_tX3iYNz9oRCmO6gmLC8IbSK7jBokRIXz2Il_342RCRuo5XqVNagCZAtqKwFRtTs3UJgsvIOZ_dVCxi6TUHJXZSUhb_Avx7BUcbOlNLWRzu24fBiGN1A_h0YwqmaWx9GTmuNZIVohBc3Iu6tHJuC_w-w1vbBu3PtGwfUhObP38jvBsmAxo52-B",
                family: "Araceae",
                origin: "Southeast Asia",
                care: [
                    { icon: "water_drop", text: "Water when soil is dry" },
                    { icon: "wb_twilight", text: "Tolerates low light" },
                ],
                benefits: [
                    { icon: "air", text: "Top air-purifying plant" },
                    { icon: "local_florist", text: "Beginner-friendly" },
                ],
            },
        ],
    },
};

const filterCategories = ["All", "Edible", "Ornamental", "Shade-loving"] as const;

export interface CmsPlant {
    id: string;
    name: string;
    latin: string;
    category: "Edible" | "Ornamental" | "Shade-loving";
    image: string | null;
    family?: string;
    origin?: string;
    care: { icon: string; text: string }[];
    benefits: { icon: string; text: string }[];
    note?: string;
}

interface PlantsPageClientProps {
    slug: string;
    cmsProjectTitle?: string;
    cmsPlants?: CmsPlant[];
}

export default function PlantsPageClient({ slug, cmsProjectTitle, cmsPlants }: PlantsPageClientProps) {
    const data = plantsByProject[slug];

    const projectTitle = cmsProjectTitle ?? data?.projectTitle ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    // Use CMS plants if available, otherwise fall back to hardcoded data
    const plants = cmsPlants?.length ? cmsPlants : (data?.plants ?? []);

    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [search, setSearch] = useState("");
    const [modalPlant, setModalPlant] = useState<(typeof plants)[number] | null>(null);

    if (plants.length === 0) {
        return (
            <main className="min-h-screen bg-[#fcfbf9] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
                        No Plant Data Available
                    </h1>
                    <Link href={`/projects/${slug}`} className="text-[#4F772D] hover:underline">
                        &larr; Back to Project
                    </Link>
                </div>
            </main>
        );
    }

    const filtered = plants.filter((p) => {
        const matchCategory = activeFilter === "All" || p.category === activeFilter;
        const matchSearch =
            search === "" ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.latin.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <main className="pt-28 min-h-screen bg-[#fcfbf9]">
            {/* ── Header + Search ─────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <Link
                            href={`/projects/${slug}`}
                            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#4F772D] transition-colors mb-4 group"
                        >
                            <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
                                arrow_back
                            </span>
                            <span className="text-xs uppercase tracking-widest font-bold">
                                Back to {projectTitle}
                            </span>
                        </Link>
                        <h1 className="font-display text-4xl md:text-5xl text-[#4a6741] font-bold leading-tight">
                            Botanical Index
                        </h1>
                        <p className="mt-2 text-gray-500 max-w-2xl font-light text-lg">
                            A comprehensive catalog of the {plants.length}+ species curated for the {projectTitle} ecosystem.
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                        {/* Search */}
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search plant name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm w-full sm:w-64 focus:ring-1 focus:ring-[#4a6741] focus:border-[#4a6741] outline-none shadow-sm"
                            />
                        </div>

                        {/* Filter pills */}
                        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                            {filterCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`whitespace-nowrap px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full transition-all ${activeFilter === cat
                                        ? "bg-[#4a6741] text-white shadow-sm"
                                        : "bg-white text-gray-600 border border-gray-200 hover:border-[#4a6741] hover:text-[#4a6741]"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-px w-full bg-gray-200" />
            </section>

            {/* ── Plant Grid ──────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                {filtered.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <span className="material-symbols-outlined text-5xl mb-4 block">search_off</span>
                        <p className="text-lg">No plants found matching your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
                        {filtered.map((plant) => (
                            <div
                                key={plant.id}
                                className="group cursor-pointer flex flex-col items-center text-center"
                                onClick={() => setModalPlant(plant)}
                            >
                                {/* Circular thumbnail */}
                                <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6">
                                    <div className="absolute inset-0 rounded-full border border-gray-200 group-hover:border-[#4a6741]/50 transition-colors duration-500" />
                                    <div className="absolute inset-1 rounded-full overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-500">
                                        {plant.image && (
                                            <Image
                                                src={plant.image}
                                                alt={plant.name}
                                                fill
                                                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        )}
                                    </div>
                                    {/* Info icon on hover */}
                                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        <span className="material-symbols-outlined text-[#4a6741] text-sm">
                                            info
                                        </span>
                                    </div>
                                </div>

                                <h3 className="font-display font-bold text-xl text-gray-900 group-hover:text-[#4a6741] transition-colors">
                                    {plant.name}
                                </h3>
                                <p className="font-display italic text-gray-500 mt-1">{plant.latin}</p>
                                <span
                                    className={`mt-3 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm ${plant.category === "Edible"
                                        ? "bg-[#4a6741]/10 text-[#4a6741]"
                                        : "bg-gray-100 text-gray-500"
                                        }`}
                                >
                                    {plant.category}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ── Modal ────────────────────────────────────────── */}
            {modalPlant && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setModalPlant(null)}
                >
                    <div
                        className="bg-white w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden animate-[fadeInUp_0.3s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col md:flex-row h-full">
                            {/* Image panel */}
                            <div className="w-full md:w-5/12 h-64 md:h-auto bg-gray-100 relative">
                                {modalPlant.image && (
                                    <Image
                                        src={modalPlant.image}
                                        alt={modalPlant.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                                <button
                                    className="absolute top-4 left-4 md:hidden w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-gray-800 shadow-sm z-10"
                                    onClick={() => setModalPlant(null)}
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {/* Detail panel */}
                            <div className="w-full md:w-7/12 p-8 md:p-12 relative flex flex-col justify-between">
                                <button
                                    className="absolute top-6 right-6 hidden md:flex w-8 h-8 rounded-full items-center justify-center text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                                    onClick={() => setModalPlant(null)}
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>

                                <div>
                                    {/* Tags */}
                                    <div className="flex items-center gap-3 mb-2">
                                        {modalPlant.family && (
                                            <span className="px-2 py-1 bg-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-500 rounded">
                                                {modalPlant.family}
                                            </span>
                                        )}
                                        {modalPlant.origin && (
                                            <span className="px-2 py-1 bg-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-500 rounded">
                                                {modalPlant.origin}
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="font-display font-bold text-3xl md:text-4xl text-[#4a6741] mb-1">
                                        {modalPlant.name}
                                    </h2>
                                    <p className="font-display italic text-lg text-gray-500 mb-6">
                                        {modalPlant.latin}
                                    </p>

                                    <div className="grid grid-cols-2 gap-8 mb-8">
                                        {/* Care */}
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4a373] mb-3">
                                                Care Instructions
                                            </h4>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                {modalPlant.care.map((c, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="material-symbols-outlined text-base text-gray-400">
                                                            {c.icon}
                                                        </span>
                                                        <span>{c.text}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Benefits */}
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4a373] mb-3">
                                                Ecological Benefits
                                            </h4>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                {modalPlant.benefits.map((b, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="material-symbols-outlined text-base text-gray-400">
                                                            {b.icon}
                                                        </span>
                                                        <span>{b.text}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {modalPlant.note && (
                                    <div className="pt-6 border-t border-gray-100">
                                        <p className="text-sm text-gray-500 italic">
                                            &ldquo;{modalPlant.note}&rdquo;
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
