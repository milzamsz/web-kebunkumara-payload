"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface BlogPostCard {
    title: string;
    excerpt: string;
    category: string;
    slug: string;
    image: string | null;
    date: string;
}

interface BlogPageClientProps {
    posts: BlogPostCard[];
    categories: string[];
}

export default function BlogPageClient({ posts, categories }: BlogPageClientProps) {
    const [activeCategory, setActiveCategory] = useState("All Posts");
    const [query, setQuery] = useState("");

    const filteredPosts = posts
        .filter((p) =>
            activeCategory === "All Posts" ? true : p.category === activeCategory
        )
        .filter((p) => {
            if (!query.trim()) return true;
            const q = query.toLowerCase();
            return (
                p.title.toLowerCase().includes(q) ||
                p.excerpt.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        });

    return (
        <main className="pt-20">
            {/* ─── Hero ─────────────────────────────────────────── */}
            <header className="relative pt-12 pb-20 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8 bg-[#F3F1E8] overflow-hidden">
                {/* decorative blurs */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#4a6741]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#4a6741]/5 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6">
                        Blog
                    </h1>
                </div>
            </header>

            {/* ─── Category Filters + Search ─────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-14 mb-12">
                <div className="border-b border-[#4a6741]/20 pb-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                                Filter by
                            </span>
                            <span className="text-xs text-gray-500">
                                {activeCategory}
                            </span>
                        </div>
                        <div className="w-full md:w-72 relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">
                                search
                            </span>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search posts by title, topic..."
                                className="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-gray-200 bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4a6741] focus:border-transparent placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-xs md:text-sm uppercase tracking-wide transition-all focus-visible:ring-2 focus-visible:ring-[#4a6741] focus-visible:ring-offset-2 rounded-full px-3 py-1.5 ${
                                    activeCategory === cat
                                        ? "bg-[#4a6741] text-white font-semibold shadow-sm"
                                        : "bg-white text-gray-500 hover:text-[#4a6741] hover:bg-[#4a6741]/5 border border-gray-200"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Blog Grid ────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="material-symbols-outlined text-5xl text-gray-300 mb-4 block">
                            search_off
                        </span>
                        <p className="text-gray-400 text-lg">
                            No posts found in &ldquo;{activeCategory}&rdquo;.
                        </p>
                        <button
                            onClick={() => setActiveCategory("All Posts")}
                            className="mt-4 text-[#4a6741] font-semibold underline underline-offset-4 hover:text-[#364d2e] transition-colors"
                        >
                            View all posts
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {filteredPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group cursor-pointer flex flex-col h-full"
                            >
                                {/* thumbnail */}
                                <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-6 shadow-sm">
                                    {post.image && (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                    <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#4a6741] shadow-sm z-10">
                                        {post.category}
                                    </span>
                                </div>

                                {/* text */}
                                <div className="flex flex-col flex-grow">
                                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-[#4a6741] transition-colors leading-tight">
                                        {post.title}
                                    </h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
