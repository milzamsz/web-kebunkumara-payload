import { fallbackProjectPlants } from "@/lib/fallback-data";
import PlantsPageClient, { type CmsPlant } from "./PlantsPageClient";

export async function generateStaticParams() {
    return Object.keys(fallbackProjectPlants).map((slug) => ({
        slug: slug,
    }));
}

export default async function PlantsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // Get fallback data for this project
    const projectPlantsData = fallbackProjectPlants[slug] || { title: "Project Plants", plants: [] };

    return (
        <PlantsPageClient
            slug={slug}
            cmsProjectTitle={projectPlantsData.title}
            cmsPlants={projectPlantsData.plants as CmsPlant[]}
        />
    );
}
