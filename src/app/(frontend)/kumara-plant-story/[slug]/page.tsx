import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { fallbackProjectPlants, type FallbackIconText, type FallbackPlant } from "@/lib/fallback-data";
import PlantGallery from "./PlantGallery";

const CARE_ICONS: Record<string, string> = {
  sunlight: "wb_sunny",
  watering: "water_drop",
  soil: "yard",
  temperature: "thermostat",
  humidity: "humidity_mid",
};

// Helper to flatten all plants from all projects
const getAllPlants = () => {
  const allPlants: FallbackPlant[] = [];
  Object.values(fallbackProjectPlants).forEach((project) => {
    project.plants.forEach((plant) => {
      if (!allPlants.find((p) => p.id === plant.id)) {
        allPlants.push(plant);
      }
    });
  });
  return allPlants;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const allPlants = getAllPlants();
  const plant = allPlants.find((p) => p.id === slug);
  if (!plant) return { title: "Plant Not Found — Kebun Kumara" };
  return {
    title: `${plant.name} (${plant.latin}) — Kebun Kumara`,
    description: `Learn about ${plant.name}, a plant in the Kebun Kumara collection. Explore its ecological role, care tips, and visual story.`,
    openGraph: {
      title: `${plant.name} — Kebun Kumara Plant Story`,
      description: `${plant.name} (${plant.latin}) — explore the plant story at Kebun Kumara.`,
      url: `https://kebunkumara.id/kumara-plant-story/${slug}`,
      siteName: "Kebun Kumara",
      type: "article",
      locale: "id_ID",
      ...(plant.image ? { images: [{ url: plant.image }] } : {}),
    },
  };
}

export async function generateStaticParams() {
  const allPlants = getAllPlants();
  return allPlants.map((plant) => ({
    slug: plant.id,
  }));
}

export default async function PlantDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const allPlants = getAllPlants();
  let plant = allPlants.find((p) => p.id === resolvedParams.slug);

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "plants",
      where: {
        and: [
          { slug: { equals: resolvedParams.slug } },
          { _status: { equals: "published" } },
        ],
      },
      depth: 1,
      limit: 1,
    });
    if (result.docs.length > 0) {
      const doc = result.docs[0];
      const img = doc.mainPhoto;
      const galleryUrls = (doc.gallery ?? [])
        .map((g: any) => (typeof g.image === "object" ? g.image?.url : null))
        .filter(Boolean) as string[];
      const typeRel = (doc.plantType as any[])?.[0];
      const typeName = typeof typeRel === "object" && typeRel !== null ? typeRel.name ?? "" : "";
      const care = Object.entries(doc.careGuide ?? {})
        .filter(([, v]) => v)
        .map(([key, text]) => ({ icon: CARE_ICONS[key] ?? "eco", text: text as string }));
      plant = {
        ...plant,
        id: doc.slug ?? String(doc.id),
        name: doc.commonName,
        latin: doc.scientificName,
        category: typeName as FallbackPlant["category"],
        family: doc.plantFamily ?? plant?.family,
        origin: doc.origin ?? plant?.origin,
        image: (typeof img === "object" && img !== null ? (img as any).url : null) ?? plant?.image ?? "",
        gallery: galleryUrls.length > 0 ? galleryUrls : plant?.gallery,
        care,
        benefits: plant?.benefits ?? [],
        note: doc.designersNote?.quote ?? plant?.note,
      };
    }
  } catch (err) {
    console.error("[PlantDetail] Failed to fetch from CMS:", err);
  }

  if (!plant) {
    notFound();
  }

  // Get related plants (same category)
  const relatedPlants = allPlants
    .filter((p) => p.category === plant!.category && p.id !== plant!.id)
    .slice(0, 4);
  const benefits = plant!.benefits ?? [];

  return (
    <main className="bg-[#fcfbf9] min-h-screen pb-24">
      {/* ─── Breadcrumb & Title ─────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <Link
          href="/kumara-plant-story"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-[#4a6741] transition-colors group mb-6"
        >
          <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
            arrow_back
          </span>
          <span className="text-xs uppercase tracking-widest font-bold">
            Back
          </span>
        </Link>
        
        <div className="space-y-2">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[#4a6741]">
            {plant.name}
          </h1>
          <p className="font-display text-xl text-stone-500 italic">
            {plant.latin}
          </p>
        </div>
      </div>

      {/* ─── Main Content ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* ═══ LEFT COLUMN ═══ */}
          <div className="lg:col-span-5 space-y-10">
            {/* Plant Profile */}
            <div>
              <h2 className="font-display font-bold text-3xl text-[#4a6741] mb-6 pb-4 border-b border-stone-200">
                Plant Profile
              </h2>
              <dl className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-xs uppercase tracking-widest font-bold text-stone-400">
                    Common Name
                  </dt>
                  <dd className="col-span-2 font-display text-lg text-gray-900">
                    {plant.name}
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-xs uppercase tracking-widest font-bold text-stone-400">
                    Scientific Name
                  </dt>
                  <dd className="col-span-2 font-display italic text-lg text-gray-900">
                    {plant.latin}
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-xs uppercase tracking-widest font-bold text-stone-400">
                    Family
                  </dt>
                  <dd className="col-span-2 font-display text-lg text-gray-900">
                    {plant.family || "—"}
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-xs uppercase tracking-widest font-bold text-stone-400">
                    Origin
                  </dt>
                  <dd className="col-span-2 text-base text-stone-600 leading-relaxed">
                    {plant.origin || "—"}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Visual Story (Gallery) */}
            <div className="pt-4">
              <h2 className="font-display font-bold text-3xl text-[#4a6741] mb-6 pb-4 border-b border-stone-200">
                Visual Story
              </h2>
              <PlantGallery
                images={plant.gallery || []}
                fallbackImage={plant.image}
                alt={plant.name}
              />
            </div>

          </div>

          {/* ═══ RIGHT COLUMN ═══ */}
          <div className="lg:col-span-7 space-y-16">
            {/* Care Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(plant.care ?? []).map((item: FallbackIconText, i: number) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-6 border border-stone-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-[#4a6741]/10 flex items-center justify-center text-[#4a6741] mb-4">
                    <span className="material-symbols-outlined text-2xl">
                      {item.icon}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-2">
                    {item.text.split(",")[0].split(".")[0]}
                  </h4>
                  <p className="text-sm text-stone-600">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Ecological Role */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-stone-200 flex-grow"></div>
                <span className="text-[#d4a373] text-xs font-bold uppercase tracking-widest">
                  Ecological Role
                </span>
                <div className="h-px bg-stone-200 flex-grow"></div>
              </div>
              <div className="prose prose-stone prose-lg max-w-none font-light">
                <h3 className="font-display text-2xl font-bold text-[#4a6741] mb-4">
                  Contribution to the Micro-Ecosystem
                </h3>
                {benefits.length > 0 && (
                  <div className="space-y-4 text-stone-600 leading-relaxed">
                    <p>
                      In its natural habitat, <em>{plant.latin}</em> plays a
                      crucial role in its ecosystem. The plant contributes to
                      biodiversity and supports the local micro-environment in
                      several important ways.
                    </p>
                    <p>
                      Within the context of our urban garden, this plant serves
                      as a significant resource.{" "}
                      {benefits.map((b: FallbackIconText, i: number) => (
                        <span key={i}>
                          {i > 0 && " "}
                          <strong>{b.text}</strong>
                          {i < benefits.length - 1 ? "." : "."}
                        </span>
                      ))}
                    </p>
                    {plant.note && (
                      <p className="italic text-stone-500">
                        {plant.note}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Similar Species ───────────────────────── */}
      {relatedPlants.length > 0 && (
        <section className="bg-stone-50 py-16 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#4a6741] mb-10 text-center">
              Similar Species in the Collection
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedPlants.map((related) => (
                <Link
                  key={related.id}
                  href={`/kumara-plant-story/${related.id}`}
                  className="group cursor-pointer block"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                    <Image
                      src={related.image}
                      alt={related.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="font-display font-bold text-lg group-hover:text-[#4a6741] transition-colors">
                    {related.name}
                  </h4>
                  <p className="text-xs text-stone-500 uppercase tracking-widest">
                    {related.category}
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
