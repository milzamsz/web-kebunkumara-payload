import { Metadata } from "next";
import Image from "next/image";
import { WhyGardenSection } from "@/components/sections/WhyGardenSection";
import { WhyGardenFeedbackSection } from "@/components/sections/WhyGardenFeedbackSection";
import { WhyGardenStoriesSection } from "@/components/sections/WhyGardenStoriesSection";
import { WhyGardenBlogSection } from "@/components/sections/WhyGardenBlogSection";

export const metadata: Metadata = {
  title: "Why Garden? | Kebun Kumara",
  description: "Gardening reminds us that we are part of a cycle. Explore why nature changes everything.",
};

export default function WhyGardenPage() {
  return (
    <main className="min-h-screen">
      {/* 0. Hero (Photo Only) */}
      <section className="relative w-full h-[85vh] md:h-screen">
        <Image
          src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2000&auto=format&fit=crop"
          alt="Why Garden Hero"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* 1. Main Why Garden Section (Intro) */}
      <WhyGardenSection />
      
      {/* 2. Feedback / How We Work Section (Philosophy) */}
      <WhyGardenFeedbackSection />

      {/* 3. Stories Section (Interactive Showcase: Projects & Impact) */}
      <WhyGardenStoriesSection />

      {/* 4. Blog / Impact Section (Call to Action & Resources) */}
      <WhyGardenBlogSection />
    </main>
  );
}
