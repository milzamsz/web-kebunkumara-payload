import { getPayload } from "payload";
import config from "@payload-config";
import { fallbackProjectPlants, type FallbackPlant } from "@/lib/fallback-data";
import KumaraPlantStoryClient, { Plant } from "./KumaraPlantStoryClient";

export const metadata = {
    title: "Kumara Plant Story | Kebun Kumara",
    description: "A comprehensive catalog of plant species used in our regenerative landscapes.",
};

const CARE_ICONS: Record<string, string> = {
    sunlight: "wb_sunny",
    watering: "water_drop",
    soil: "yard",
    temperature: "thermostat",
    humidity: "humidity_mid",
};

function getFallbackPlants(): Plant[] {
    const allPlants: Plant[] = [];
    const seen = new Set<string>();
    Object.values(fallbackProjectPlants).forEach((project) => {
        project.plants.forEach((plant: FallbackPlant) => {
            if (!seen.has(plant.id)) {
                seen.add(plant.id);
                allPlants.push({ ...plant, care: plant.care ?? [], benefits: plant.benefits ?? [], projectSource: project.title });
            }
        });
    });
    return allPlants.sort((a, b) => a.name.localeCompare(b.name));
}

export default async function KumaraPlantStoryPage() {
    let plants: Plant[] = getFallbackPlants();

    const phase = process.env.NEXT_PHASE;
    if (phase !== "phase-production-build") {
        try {
            const payload = await getPayload({ config });
            const result = await payload.find({
                collection: "plants",
                where: { _status: { equals: "published" } },
                sort: "commonName",
                depth: 1,
                limit: 200,
            });

            if (result.docs.length > 0) {
                plants = result.docs.map((doc) => {
                    const img = doc.mainPhoto;
                    const plantTypeValue = doc.plantType as unknown;
                    const typeRel = Array.isArray(plantTypeValue) ? plantTypeValue[0] : null;
                    const typeName =
                        typeof typeRel === "object" && typeRel !== null && "name" in typeRel
                            ? String((typeRel as { name?: unknown }).name ?? "")
                            : "";
                    const care = Object.entries(doc.careGuide ?? {})
                        .filter(([, v]) => v)
                        .map(([key, text]) => ({ icon: CARE_ICONS[key] ?? "eco", text: text as string }));
                    return {
                        id: doc.slug ?? String(doc.id),
                        name: doc.commonName,
                        latin: doc.scientificName,
                        category: (typeName.charAt(0).toUpperCase() + typeName.slice(1)) as Plant["category"],
                        image:
                            typeof img === "object" && img !== null && "url" in img
                                ? (img as { url?: string | null }).url ?? null
                                : null,
                        family: doc.plantFamily ?? undefined,
                        origin: doc.origin ?? undefined,
                        care,
                        benefits: [],
                    };
                });
            }
        } catch (err) {
            console.error("[PlantStory] Failed to fetch from CMS:", err);
        }
    }

    return <KumaraPlantStoryClient plants={plants} />;
}
