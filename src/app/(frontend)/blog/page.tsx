import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { fallbackBlogPosts, fallbackBlogCategories } from "@/lib/fallback-data";
import BlogPageClient, { type BlogPostCard } from "./BlogPageClient";

export const metadata: Metadata = {
    title: "Blog — Kebun Kumara",
    description: "Stories, tips, and insights on sustainable gardening, permaculture, and urban farming from the Kebun Kumara team.",
    openGraph: {
        title: "Blog — Kebun Kumara",
        description: "Stories, tips, and insights on sustainable gardening and urban farming.",
        url: "https://kebunkumara.id/blog",
        siteName: "Kebun Kumara",
        type: "website",
        locale: "id_ID",
    },
};

export default async function BlogPage() {
    let posts: BlogPostCard[] = fallbackBlogPosts;
    let categories: string[] = fallbackBlogCategories;

    const phase = process.env.NEXT_PHASE;
    if (phase !== "phase-production-build") {
        try {
            const payload = await getPayload({ config });
            const [postsResult, categoriesResult] = await Promise.all([
                payload.find({
                    collection: "posts",
                    where: { _status: { equals: "published" } },
                    sort: "-publishedAt",
                    depth: 1,
                    limit: 50,
                }),
                payload.find({
                    collection: "categories",
                    limit: 50,
                }),
            ]);

            if (postsResult.docs.length > 0) {
                posts = postsResult.docs.map((post) => {
                    const cat = post.categories?.[0];
                    const img = post.featuredImage;
                    return {
                        title: post.title,
                        excerpt: post.excerpt ?? "",
                        category: typeof cat === "object" && cat !== null ? (cat as any).name ?? "" : "",
                        slug: post.slug ?? "",
                        image: typeof img === "object" && img !== null ? (img as any).url ?? null : null,
                        date: post.publishedAt ?? "",
                    };
                });
            }

            if (categoriesResult.docs.length > 0) {
                categories = ["All Posts", ...categoriesResult.docs.map((c) => c.name)];
            }
        } catch (err) {
            console.error("[Blog] Failed to fetch from CMS:", err);
        }
    }

    return <BlogPageClient posts={posts} categories={categories} />;
}
