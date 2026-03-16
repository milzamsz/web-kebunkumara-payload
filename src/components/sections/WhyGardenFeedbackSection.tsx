import React from "react";

export function WhyGardenFeedbackSection() {
  return (
    <section className="w-full bg-white py-20 lg:py-32 border-t border-[#4F772D]/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <span className="block font-serif text-sm tracking-[0.2em] uppercase mb-6 text-[#4F772D]">
          How We Work
        </span>

        {/* Heading */}
        <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 leading-tight mb-8">
          How do we tackle urban disconnection?
        </h2>

        {/* Content Paragraph */}
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
          We work with local experts and community members to find the best
          sustainable solution in each place where we work, whether it&apos;s a home
          garden, a school program, or a corporate green space. And with every
          garden we build, we foster a deeper connection between people and
          nature, helping to restore the balance in our urban ecosystems.
        </p>
      </div>
    </section>
  );
}
