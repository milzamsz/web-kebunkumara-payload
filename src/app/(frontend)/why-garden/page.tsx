import { Metadata } from "next";
import Image from "next/image";
import { WhyGardenSection } from "@/components/sections/WhyGardenSection";
import { WhyGardenFeedbackSection } from "@/components/sections/WhyGardenFeedbackSection";
import { WhyGardenStoriesSection } from "@/components/sections/WhyGardenStoriesSection";
import { WhyGardenBlogSection } from "@/components/sections/WhyGardenBlogSection";
import { fallbackPageContent } from "@/lib/fallback-data";
import { getMediaUrl, getPublishedPageBySlug } from "@/lib/frontend-cms";

export const metadata: Metadata = {
  title: "Why Garden? | Kebun Kumara",
  description:
    "Gardening reminds us that we are part of a cycle. Explore why nature changes everything.",
};

export default async function WhyGardenPage() {
  const whyGardenPage = await getPublishedPageBySlug("why-garden", "WhyGarden");
  const heroImage =
    getMediaUrl(whyGardenPage?.hero?.backgroundImage) ??
    fallbackPageContent.whyGarden.backgroundImage;

  return (
    <main className="min-h-screen">
      <section className="relative h-[85vh] w-full md:h-screen">
        <Image
          src={heroImage}
          alt="Why Garden Hero"
          fill
          className="object-cover"
          priority
        />
      </section>

      <WhyGardenSection variant="vertical" />
      <WhyGardenFeedbackSection />
      <WhyGardenStoriesSection />
      <WhyGardenBlogSection />
    </main>
  );
}
