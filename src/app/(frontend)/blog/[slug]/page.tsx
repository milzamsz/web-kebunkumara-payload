import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { fallbackBlogPostsDetail, type FallbackBlogPostDetail } from "@/lib/fallback-data";

function lexicalToBlocks(content: unknown): FallbackBlogPostDetail["contentBlocks"] {
    if (!content || typeof content !== "object") return [];
    if (!("root" in content)) return [];
    const root = (content as { root?: unknown }).root;
    if (!root || typeof root !== "object" || !("children" in root)) return [];
    const children = (root as { children?: unknown }).children;
    if (!Array.isArray(children)) return [];

    return children
        .map((node): FallbackBlogPostDetail["contentBlocks"][number] | null => {
            if (!node || typeof node !== "object") return null;
            const type = (node as { type?: unknown }).type;
            if (type !== "heading" && type !== "paragraph") return null;

            const nodeChildren = (node as { children?: unknown }).children;
            const parts = Array.isArray(nodeChildren)
                ? nodeChildren.map((c) => {
                    if (!c || typeof c !== "object" || !("text" in c)) return "";
                    const t = (c as { text?: unknown }).text;
                    return typeof t === "string" ? t : "";
                })
                : [];
            const text = parts.join("");
            if (!text) return null;
            return type === "heading" ? { type: "heading", text } : { type: "paragraph", text };
        })
        .filter(
            (b: FallbackBlogPostDetail["contentBlocks"][number] | null): b is FallbackBlogPostDetail["contentBlocks"][number] =>
                b !== null
        );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = fallbackBlogPostsDetail[slug];
    if (!post) return { title: "Post Not Found — Kebun Kumara" };
    return {
        title: `${post.title} — Kebun Kumara`,
        description: post.title,
        openGraph: {
            title: post.title,
            description: post.title,
            url: `https://kebunkumara.id/blog/${slug}`,
            siteName: "Kebun Kumara",
            type: "article",
            locale: "id_ID",
            ...(post.heroImage ? { images: [{ url: post.heroImage }] } : {}),
        },
    };
}

export async function generateStaticParams() {
    return Object.keys(fallbackBlogPostsDetail).map((slug) => ({
        slug: slug,
    }));
}

/* ── Component ───────────────────────────────────────── */
export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    let post: FallbackBlogPostDetail | undefined = fallbackBlogPostsDetail[slug];

    try {
        const payload = await getPayload({ config });
        const result = await payload.find({
            collection: "posts",
            where: { slug: { equals: slug }, _status: { equals: "published" } },
            depth: 1,
            limit: 1,
        });
        if (result.docs.length > 0) {
            const doc = result.docs[0];
            const cat = doc.categories?.[0];
            const img = doc.featuredImage;
            const authorRel = (doc as { author?: unknown }).author;
            post = {
                title: doc.title,
                category:
                    typeof cat === "object" && cat !== null && "name" in cat
                        ? String((cat as { name?: unknown }).name ?? "")
                        : "",
                date: doc.publishedAt ?? "",
                readTime: doc.readingTime ? `${doc.readingTime} min read` : "",
                heroImage:
                    typeof img === "object" && img !== null && "url" in img
                        ? String((img as { url?: unknown }).url ?? "")
                        : "",
                author: {
                    name:
                        typeof authorRel === "object" && authorRel !== null
                            ? (() => {
                                const firstName = (authorRel as { firstName?: unknown }).firstName;
                                const lastName = (authorRel as { lastName?: unknown }).lastName;
                                const email = (authorRel as { email?: unknown }).email;
                                const fullName = `${typeof firstName === "string" ? firstName : ""} ${typeof lastName === "string" ? lastName : ""}`.trim();
                                return fullName || (typeof email === "string" ? email : "") || "Kebun Kumara";
                            })()
                            : "Kebun Kumara",
                    avatar: "",
                },
                contentBlocks: lexicalToBlocks(doc.content),
                tags: [],
                relatedPosts: [],
            };
        }
    } catch (err) {
        console.error("[BlogPost] Failed to fetch from CMS:", err);
    }

    if (!post) return notFound();

    return (
        <main className="pt-20 bg-white">
            {/* ─── Article Header ─────────────────────────────── */}
            <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4a6741] mb-6">
                    {post.category}
                </span>
                <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-8">
                    {post.title}
                </h1>

                {/* meta bar */}
                <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                    {/* author */}
                    {post.author.avatar && (
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#4a6741]/20">
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="font-medium text-gray-600">
                                {post.author.name}
                            </span>
                        </div>
                    )}
                    {!post.author.avatar && post.author.name && (
                        <span className="font-medium text-gray-600">
                            {post.author.name}
                        </span>
                    )}

                    {post.date && (
                        <>
                            <span className="hidden sm:inline text-gray-300">|</span>
                            <span>{post.date}</span>
                        </>
                    )}
                    {post.readTime && (
                        <>
                            <span className="hidden sm:inline text-gray-300">|</span>
                            <span>{post.readTime}</span>
                        </>
                    )}
                </div>
            </header>

            {/* ─── Hero Image ─────────────────────────────────── */}
            {post.heroImage && (
                <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src={post.heroImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            )}

            {/* ─── Content + Sidebar ──────────────────────────── */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-10 relative">
                {/* floating social sidebar */}
                <aside className="hidden lg:flex flex-col items-center gap-4 sticky top-32 h-max pt-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 [writing-mode:vertical-lr] rotate-180 mb-4">
                        Share
                    </span>
                    {[
                        {
                            label: "Twitter",
                            icon: (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            ),
                        },
                        {
                            label: "Facebook",
                            icon: (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            ),
                        },
                        {
                            label: "WhatsApp",
                            icon: (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            ),
                        },
                    ].map((social) => (
                        <button
                            key={social.label}
                            title={`Share on ${social.label}`}
                            aria-label={`Share on ${social.label}`}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-[#4a6741] hover:border-[#4a6741] transition-colors"
                        >
                            {social.icon}
                        </button>
                    ))}
                </aside>

                {/* main article column */}
                <article className="flex-1 max-w-3xl mx-auto pb-16">
                    {post.contentBlocks.map((block, i) => {
                        switch (block.type) {
                            case "heading":
                                return (
                                    <h2
                                        key={i}
                                        className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mt-14 mb-5"
                                    >
                                        {block.text}
                                    </h2>
                                );

                            case "paragraph":
                                return (
                                    <p
                                        key={i}
                                        className="text-gray-600 text-lg leading-relaxed mb-6"
                                    >
                                        {block.text}
                                    </p>
                                );

                            case "full-image":
                                return (
                                    <figure key={i} className="my-12 -mx-4 sm:-mx-8 md:-mx-14">
                                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-md">
                                            {block.src && (
                                                <Image
                                                    src={block.src}
                                                    alt={block.alt}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        {block.caption && (
                                            <figcaption className="text-center text-sm text-gray-400 mt-4 italic px-4">
                                                {block.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                );

                            case "callout":
                                return (
                                    <div
                                        key={i}
                                        className="my-10 bg-[#F3F1E8] rounded-2xl p-8 border-l-4 border-[#4a6741]"
                                    >
                                        <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#4a6741] mb-3">
                                            <span className="material-symbols-outlined text-lg">
                                                lightbulb
                                            </span>
                                            {block.title}
                                        </span>
                                        <p className="text-gray-700 leading-relaxed">
                                            {block.text}
                                        </p>
                                    </div>
                                );

                            default:
                                return null;
                        }
                    })}

                    {/* ─── Tags ──────────────────────────────────────── */}
                    {post.tags.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-gray-200">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-2">
                                    Tags
                                </span>
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-[#4a6741]/10 hover:text-[#4a6741] transition-colors cursor-pointer"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </div>

            {/* ─── Related Posts – "More Stories" ──────────────── */}
            {post.relatedPosts.length > 0 && (
                <section className="bg-[#F3F1E8] py-20 px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 text-center mb-14">
                            More Stories
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {post.relatedPosts.map((rp) => (
                                <Link
                                    key={rp.slug}
                                    href={`/blog/${rp.slug}`}
                                    className="group flex flex-col"
                                >
                                    <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-5 shadow-sm">
                                        {rp.image && (
                                            <Image
                                                src={rp.image}
                                                alt={rp.title}
                                                fill
                                                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                        )}
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#4a6741] mb-2">
                                        {rp.category}
                                    </span>
                                    <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-[#4a6741] transition-colors leading-snug mb-2">
                                        {rp.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm font-light line-clamp-2">
                                        {rp.excerpt}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
