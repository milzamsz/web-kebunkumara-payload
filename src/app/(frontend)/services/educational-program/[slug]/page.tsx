import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { fallbackPrograms } from "@/lib/fallback-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = fallbackPrograms.find((p) => p.slug === slug);
  return {
    title: program ? `${program.title} — Kebun Kumara` : "Program — Kebun Kumara",
    description: program?.description ?? "",
  };
}

export function generateStaticParams() {
  return fallbackPrograms.map((program) => ({
    slug: program.slug,
  }));
}

type Program = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image?: string | null;
};

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let program: Program | undefined = fallbackPrograms.find((p) => p.slug === slug) as unknown as Program | undefined;

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "services",
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: "published" } },
        ],
      },
      depth: 1,
      limit: 1,
    });
    if (result.docs.length > 0) {
      const doc = result.docs[0];
      const img = doc.coverImage;
      const base: Program =
        program ??
        {
          slug,
          title: "",
          description: "",
          image: null,
          icon: "eco",
          features: [],
        };
      program = {
        ...base,
        title: doc.name,
        description: doc.shortDescription ?? base.description ?? "",
        image:
          (typeof img === "object" && img !== null && "url" in img
            ? (img as { url?: string | null }).url ?? null
            : null) ?? base.image ?? null,
      };
    }
  } catch (err) {
    console.error("[ProgramDetail] Failed to fetch from CMS:", err);
  }

  if (!program) {
    notFound();
  }

  return (
    <main>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {program.image && (
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 pt-20">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20">
            <span className="material-symbols-outlined text-3xl text-white">
              {program.icon}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            {program.title}
          </h1>
        </div>
      </section>

      {/* ─── Content ──────────────────────────────────────── */}
      <section className="py-24 bg-[#F7F5EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl -mt-32 relative z-20">
            <div className="prose prose-lg max-w-none text-gray-600">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                About the Program
              </h2>
              <p className="text-lg leading-relaxed mb-8">
                {program.description}
              </p>
              
              <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                What to Expect
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose mb-12">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="material-symbols-outlined text-[#4F772D]">
                      check_circle
                    </span>
                    <span className="font-medium text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 pt-8 mt-8">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                  Interested in joining?
                </h3>
                <p className="mb-6">
                  Contact us to learn more about schedules, pricing, and how to register for this program.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`https://wa.me/6281510986060?text=Hi, I'm interested in the ${program.title} program.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#4F772D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3d5a22] transition-colors shadow-lg shadow-[#4F772D]/20"
                  >
                    Register via WhatsApp
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                  <Link
                    href="/services/educational-program"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Back to Programs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
