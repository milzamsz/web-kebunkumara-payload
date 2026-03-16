import { fallbackProducts } from "@/lib/fallback-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductGallery from "./ProductGallery";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";

async function resolveProduct(slug: string) {
  const fallback = fallbackProducts.find((p) => p.slug === slug) ?? null;
  const phase = process.env.NEXT_PHASE;
  if (phase !== "phase-production-build") {
    try {
      const payload = await getPayload({ config });
      const result = await payload.find({
        collection: "services",
        where: {
          slug: { equals: slug },
          _status: { equals: "published" },
        },
        depth: 1,
        limit: 1,
      });
      if (result.docs.length > 0) {
        const doc = result.docs[0];
        const img = doc.coverImage;
        const cmsImage =
          typeof img === "object" && img !== null
            ? (img as any).url ?? null
            : null;
        return {
          ...(fallback ?? {
            slug: doc.slug,
            title: doc.name,
            tagline: "",
            description: doc.shortDescription ?? "",
            longDescription: doc.shortDescription ?? "",
            image: cmsImage ?? "/images/generated/garden-tools-soil.png",
            gallery: [cmsImage ?? "/images/generated/garden-tools-soil.png"],
            features: [] as string[],
            specs: [] as { label: string; value: string }[],
            whyChoose: [] as { icon: string; title: string; text: string }[],
            faq: [] as { q: string; a: string }[],
          }),
          title: doc.name,
          description: doc.shortDescription ?? fallback?.description ?? "",
          image: cmsImage ?? fallback?.image ?? "/images/generated/garden-tools-soil.png",
        };
      }
    } catch (err) {
      console.error("[GardenProduct/Slug] Failed to fetch from CMS:", err);
    }
  }
  return fallback;
}

async function resolveAllSlugs(): Promise<string[]> {
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
        depth: 0,
        limit: 100,
      });
      if (result.docs.length > 0) {
        return result.docs.map((doc) => doc.slug);
      }
    } catch (err) {
      console.error("[GardenProduct/AllSlugs] Failed to fetch from CMS:", err);
    }
  }
  return fallbackProducts.map((p) => p.slug);
}

export async function generateStaticParams() {
  const slugs = await resolveAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await resolveProduct(slug);
  return {
    title: product
      ? `${product.title} — Garden Products — Kebun Kumara`
      : "Product Not Found",
    description: product?.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = await resolveProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Other products for cross-sell
  const allSlugs = await resolveAllSlugs();
  const otherProducts = fallbackProducts.filter(
    (p) => p.slug !== product.slug && allSlugs.includes(p.slug)
  );

  return (
    <main className="bg-[#fcfbf9] min-h-screen">
      {/* ─── Breadcrumb ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6">
        <Link
          href="/services/garden-product"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-[#4a6741] transition-colors group"
        >
          <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
            arrow_back
          </span>
          <span className="text-xs uppercase tracking-widest font-bold">
            Back to Garden Products
          </span>
        </Link>
      </div>

      {/* ═══ HERO SECTION ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Gallery */}
          <ProductGallery
            images={product.gallery || [product.image]}
            alt={product.title}
          />

          {/* Product Info */}
          <div className="lg:sticky lg:top-32">
            <span className="text-[#d4a373] text-xs font-bold uppercase tracking-widest">
              Garden Product
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-3 leading-tight">
              {product.title}
            </h1>
            {product.tagline && (
              <p className="font-display italic text-xl text-stone-500 mb-8">
                {product.tagline}
              </p>
            )}

            <div className="prose prose-stone prose-lg max-w-none mb-10">
              <p className="text-stone-600 leading-relaxed">
                {product.longDescription || product.description}
              </p>
            </div>

            {/* Features pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {product.features.map((feature: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4a6741]/10 text-[#4a6741] rounded-full text-sm font-bold"
                >
                  <span className="material-symbols-outlined text-sm">
                    check_circle
                  </span>
                  {feature}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/6281510986060?text=Hi, saya tertarik dengan ${product.title}. Bisa info lebih lanjut?`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#4a6741] text-white px-8 py-4 rounded-full font-bold hover:bg-[#3d5a22] transition-all shadow-lg shadow-[#4a6741]/20 hover:shadow-xl hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-xl">chat</span>
                Tanya via WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-stone-200 text-stone-700 px-8 py-4 rounded-full font-bold hover:border-[#4a6741] hover:text-[#4a6741] transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SPECIFICATIONS ═══ */}
      {product.specs && product.specs.length > 0 && (
        <section className="border-y border-stone-200 bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px bg-stone-200 flex-grow"></div>
              <span className="text-[#d4a373] text-xs font-bold uppercase tracking-widest">
                Specifications
              </span>
              <div className="h-px bg-stone-200 flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {product.specs.map(
                (spec: { label: string; value: string }, idx: number) => (
                  <div
                    key={idx}
                    className="text-center p-6 bg-stone-50 rounded-xl border border-stone-100"
                  >
                    <dt className="text-xs uppercase tracking-widest font-bold text-stone-400 mb-2">
                      {spec.label}
                    </dt>
                    <dd className="text-base text-gray-900 font-medium">
                      {spec.value}
                    </dd>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══ WHY CHOOSE ═══ */}
      {product.whyChoose && product.whyChoose.length > 0 && (
        <section className="py-20 bg-[#fcfbf9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-[#d4a373] text-xs font-bold uppercase tracking-widest block mb-3">
                Why Choose This
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                What Makes It Special
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {product.whyChoose.map(
                (
                  item: { icon: string; title: string; text: string },
                  idx: number
                ) => (
                  <div
                    key={idx}
                    className="text-center p-8 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="w-14 h-14 mx-auto rounded-full bg-[#4a6741]/10 flex items-center justify-center text-[#4a6741] mb-5">
                      <span className="material-symbols-outlined text-2xl">
                        {item.icon}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-3">
                      {item.title}
                    </h4>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FAQ ═══ */}
      {product.faq && product.faq.length > 0 && (
        <section className="py-20 bg-white border-t border-stone-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-[#d4a373] text-xs font-bold uppercase tracking-widest block mb-3">
                Common Questions
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                Frequently Asked
              </h2>
            </div>
            <div className="space-y-6">
              {product.faq.map(
                (item: { q: string; a: string }, idx: number) => (
                  <div
                    key={idx}
                    className="bg-stone-50 rounded-2xl p-8 border border-stone-100"
                  >
                    <h4 className="font-display font-bold text-lg text-gray-900 mb-3 flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#4a6741] mt-0.5 text-xl flex-shrink-0">
                        help
                      </span>
                      {item.q}
                    </h4>
                    <p className="text-stone-600 leading-relaxed pl-9">
                      {item.a}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══ OTHER PRODUCTS ═══ */}
      {otherProducts.length > 0 && (
        <section className="py-20 bg-stone-50 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#4a6741] mb-10 text-center">
              Explore Other Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {otherProducts.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/garden-product/${other.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-display text-xl font-bold text-gray-900 mb-2 group-hover:text-[#4a6741] transition-colors">
                      {other.title}
                    </h4>
                    <p className="text-stone-500 text-sm line-clamp-2">
                      {other.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA BANNER ═══ */}
      <section className="py-20 bg-[#355748] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
            Ready to start
            <br />
            <span className="italic text-[#A3B18A]">growing?</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Get in touch with our team to learn more about our products, place
            an order, or schedule a visit to our garden at Scientia Square Park.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/6281510986060?text=Hi, saya ingin tanya tentang produk Kebun Kumara.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#A3B18A] hover:bg-white hover:text-[#344E41] text-white font-bold rounded-full px-10 py-4 tracking-widest uppercase text-sm transition-colors"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/services/garden-product"
              className="bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold rounded-full px-10 py-4 tracking-widest uppercase text-sm transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
