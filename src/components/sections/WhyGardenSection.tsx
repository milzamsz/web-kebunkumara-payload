"use client";

import React, { useState } from "react";
import Image from "next/image";

type WhyGardenItem = {
   id: string;
   tag: string;
   description: string;
   image: string;
 };

type WhyGardenSectionProps = {
  variant?: "tabs" | "vertical";
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

function ImagePlaceholder() {
  return (
    <figure className="relative w-full h-[260px] sm:h-[320px] md:h-[420px] bg-[#DCE1E8] overflow-hidden rounded-[5px] shadow-xl">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#B8C2CE] rounded-[5px] flex items-center justify-center">
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white/90"
          >
            <path
              d="M21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M21 16L16 11L5 22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </figure>
  );
}

export function WhyGardenSection({ variant = "tabs" }: WhyGardenSectionProps) {
  const [activeId, setActiveId] = useState<string>(items[0].id);
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  if (variant === "vertical") {
    return (
      <section id="why-garden" className="relative w-full bg-[#F3F1E8] py-20 lg:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-10">
            <span className="block font-serif text-sm tracking-[0.2em] uppercase mb-4 text-stone-600">
              Why Garden?
            </span>
          </div>

          <div className="flex flex-col gap-16 lg:gap-20">
            {items.map((item) => (
              <article key={item.id} className="text-center">
                <h3 className="font-serif text-3xl md:text-4xl tracking-wide text-gray-900 mb-4">
                  {item.tag}
                </h3>
                <p className="text-stone-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-sans mb-10">
                  {item.description}
                </p>
                <ImagePlaceholder />
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
     <section id="why-garden" className="relative w-full bg-[#F3F1E8] py-20 lg:py-32">
       <div className="max-w-7xl mx-auto px-6">
         <div className="max-w-5xl mx-auto text-center mb-8 md:mb-10">
           <span className="block font-serif text-sm tracking-[0.2em] uppercase mb-4 text-stone-600">
             Why Garden?
           </span>
           <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight">
             Gardening reminds us that we are part of a cycle.
           </h2>
           <p className="mt-4 text-stone-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-sans">
             Explore why nature changes everything.
           </p>
         </div>

         <div className="relative w-full h-[600px] lg:h-[700px] rounded-[5px] overflow-hidden shadow-2xl group transition-all duration-500">
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
                 className="object-cover object-center transition-transform duration-[2000ms] ease-out scale-110 group-hover:scale-115"
                 priority={item.id === items[0].id}
               />
               <div className="absolute inset-0 bg-black/20" />
             </div>
           ))}

           <div className="absolute top-8 left-0 right-0 z-20 flex justify-center flex-wrap gap-4 md:gap-6 px-4">
             {items.map((item) => (
               <button
                 key={item.id}
                 onClick={() => setActiveId(item.id)}
                 className={`px-6 py-2 rounded-[5px] text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-lg ${
                   activeId === item.id
                     ? "bg-white text-gray-900 scale-105"
                     : "bg-white/60 text-gray-800 hover:bg-white/80 hover:scale-105 backdrop-blur-sm"
                 }`}
               >
                 {item.tag}
               </button>
             ))}
           </div>

           <div className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 z-20 max-w-md w-[calc(100%-3rem)] bg-white p-8 rounded-[5px] shadow-xl transition-all duration-500 transform translate-y-0 opacity-100">
             <p className="text-stone-700 text-base leading-relaxed font-sans">
               {activeItem.description}
             </p>
           </div>
         </div>
       </div>
    </section>
  );
}
