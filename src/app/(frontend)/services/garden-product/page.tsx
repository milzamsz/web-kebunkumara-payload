
import Image from "next/image";
import Link from "next/link";
import { fallbackProducts } from "@/lib/fallback-data";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Garden Products — Kebun Kumara",
  description: "Essential tools and supplies for your urban farming journey. Sustainably crafted products from Kebun Kumara.",
  openGraph: {
    title: "Garden Products — Kebun Kumara",
    description: "Essential tools and supplies for your urban farming journey.",
    url: "https://kebunkumara.id/services/garden-product",
    siteName: "Kebun Kumara",
    type: "website",
    locale: "id_ID",
  },
};

type ProductCard = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export default async function GardenProductPage() {
  let products: ProductCard[] = fallbackProducts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    image: p.image,
  }));

  const phase = process.env.NEXT_PHASE;
  if (phase !== "phase-production-build") {
    try {
      const payload = await getPayload({ config });
      const result = await payload.find({
        collection: "services",
        where: {
          serviceCategory: { equals: "garden-product" },
          _status: { equals: "published" },
        },
        sort: "displayOrder",
        depth: 1,
        limit: 50,
      });
      if (result.docs.length > 0) {
        products = result.docs.map((doc) => {
          const img = doc.coverImage;
          return {
            slug: doc.slug,
            title: doc.name,
            description: doc.shortDescription ?? "",
            image:
              typeof img === "object" && img !== null && "url" in img
                ? (img as { url?: string | null }).url ?? "/images/generated/garden-tools-soil.png"
                : "/images/generated/garden-tools-soil.png",
          };
        });
      }
    } catch (err) {
      console.error("[GardenProduct] Failed to fetch from CMS:", err);
    }
  }

  return (
    <main>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/garden-tools-soil.png"
            alt="Garden tools and plants"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 sm:px-6 pt-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            Garden Products
          </h1>
          <p className="text-lg text-gray-200 max-w-xl mx-auto leading-relaxed">
            Essential tools and supplies for your urban farming journey.
          </p>
        </div>
      </section>

      {/* ─── Products List ────────────────────────────────── */}
      <section className="py-24 bg-[#F7F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <Link
                key={i}
                href={`/services/garden-product/${product.slug}`}
                className="group block bg-white rounded-[5px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-3 group-hover:text-[#4F772D] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center text-[#4F772D] font-semibold">
                    View Details
                    <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
