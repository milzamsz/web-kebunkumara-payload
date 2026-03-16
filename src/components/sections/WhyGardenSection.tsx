"use client";

import React, { useState } from "react";
import Image from "next/image";

type WhyGardenItem = {
  id: string;
  tag: string;
  description: string;
  image: string;
};

const items: WhyGardenItem[] = [
  {
    id: "foundation",
    tag: "Foundation of Life",
    description:
      "In a garden, food, soil, water, waste, and biodiversity are no longer abstract ideas, but observed truths and lived experiences. Through gardens, life systems become visible and we get to rediscover our role within the web of life.",
    image: "/images/generated/landscaping-project.png",
  },
  {
    id: "bridge",
    tag: "Bridge for Reconnection",
    description:
      "Modern life has distanced us from the systems that sustain us. Gardening restores the relationship between humans and nature, while teaching us how ecosystems work, how resources cycle, and how our daily choices impact the world around us.",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2000&auto=format&fit=crop",
  },
];

export function WhyGardenSection() {
  const [activeId, setActiveId] = useState<string>(items[0].id);
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <section id="why-garden" className="relative w-full bg-[#F3F1E8] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="block font-serif text-sm tracking-[0.2em] uppercase mb-4 text-stone-600">
            Why Garden?
          </span>
          <h2 className="font-serif text-4xl lg:text-6xl text-gray-900 leading-tight max-w-4xl mx-auto">
            Because nature <br className="hidden md:block" />
            changes everything
          </h2>
        </div>

        {/* Main Interactive Card */}
        <div className="relative w-full h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl group transition-all duration-500">
          
          {/* Background Images (Stacking for crossfade) */}
          {items.map((item) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                activeId === item.id ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={item.image}
                alt={item.tag}
                fill
                className="object-cover transition-transform duration-[2000ms] ease-out scale-105"
                priority={item.id === items[0].id}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}

          {/* Top Navigation Tags */}
          <div className="absolute top-8 left-0 right-0 z-20 flex justify-center flex-wrap gap-3 px-4">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-lg ${
                  activeId === item.id
                    ? "bg-white text-gray-900 scale-105"
                    : "bg-white/60 text-gray-800 hover:bg-white/80 hover:scale-105 backdrop-blur-sm"
                }`}
              >
                {item.tag}
              </button>
            ))}
          </div>

          {/* Floating Content Card */}
          <div className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 z-20 max-w-md w-[calc(100%-3rem)] bg-white p-8 rounded-2xl shadow-xl transition-all duration-500 transform translate-y-0 opacity-100">
            <p className="text-stone-700 text-base leading-relaxed font-sans">
              {activeItem.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
