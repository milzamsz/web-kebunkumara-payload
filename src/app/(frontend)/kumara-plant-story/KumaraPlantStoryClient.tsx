"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface Plant {
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
    projectSource?: string;
    gallery?: string[];
    designersNote?: {
        text: string;
        author: string;
        role: string;
        initials: string;
    };
}

interface KumaraPlantStoryClientProps {
    plants: Plant[];
}

const filterCategories = ["All", "Edible", "Ornamental", "Shade-loving"] as const;

export default function KumaraPlantStoryClient({ plants }: KumaraPlantStoryClientProps) {
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [search, setSearch] = useState("");
    const [modalPlant, setModalPlant] = useState<Plant | null>(null);

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
                <div className="flex flex-col items-center text-center gap-8 mb-12">
                    <div>
                        <h1 className="font-display text-4xl md:text-5xl text-[#4a6741] font-bold leading-tight">
                            Kumara Plant Story
                        </h1>
                        <p className="mt-2 text-gray-500 max-w-2xl mx-auto font-light text-lg">
                            A comprehensive catalog of {plants.length} species from our regenerative ecosystems.
                        </p>
                    </div>

                    <div className="w-full flex flex-col items-center gap-4">
                        {/* Search */}
                        <div className="relative w-full max-w-md">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search plant name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm w-full focus:ring-1 focus:ring-[#4a6741] focus:border-[#4a6741] outline-none shadow-sm"
                            />
                        </div>

                        {/* Filter pills */}
                        <div className="flex flex-wrap gap-2 justify-center">
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
                                className="group cursor-pointer flex flex-col"
                                onClick={() => setModalPlant(plant)}
                            >
                                <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-3">
                                    {plant.image ? (
                                        <Image
                                            src={plant.image}
                                            alt={plant.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-300">
                                            <span className="material-symbols-outlined text-4xl">local_florist</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    <span
                                        className={`absolute top-3 left-3 z-10 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm ${plant.category === "Edible"
                                            ? "bg-white/90 text-[#4a6741] shadow-sm"
                                            : "bg-white/90 text-gray-500 shadow-sm"
                                            }`}
                                    >
                                        {plant.category}
                                    </span>
                                </div>
                                <h3 className="font-display text-lg font-bold text-gray-800 leading-tight group-hover:text-[#4a6741] transition-colors">
                                    {plant.name}
                                </h3>
                                <p className="text-xs text-gray-500 italic mb-1">
                                    {plant.latin}
                                </p>
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

                                <div className="space-y-4">
                                    {modalPlant.note && (
                                        <div className="pt-6 border-t border-gray-100">
                                            <p className="text-sm text-gray-500 italic">
                                                &ldquo;{modalPlant.note}&rdquo;
                                            </p>
                                        </div>
                                    )}
                                    <div className="pt-4 border-t border-gray-100">
                                        <Link
                                            href={`/kumara-plant-story/${modalPlant.id}`}
                                            className="text-xs text-[#4a6741] uppercase tracking-widest font-bold hover:underline"
                                        >
                                            Learn more
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
