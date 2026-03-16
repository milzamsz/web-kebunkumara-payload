import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Leaf } from "lucide-react";

const categories = [
  { id: "edu", label: "Education", color: "bg-[#e6f4ea] text-[#1e4620]" },
  { id: "insight", label: "Insight", color: "bg-[#e8f0fe] text-[#174ea6]" },
  { id: "updates", label: "Project Updates", color: "bg-[#fef7e0] text-[#b06000]" },
  { id: "teaching", label: "Teaching", color: "bg-[#f3e8fd] text-[#9333ea]" },
  { id: "wrapup", label: "Program Wrap Up", color: "bg-[#fce8e6] text-[#c5221f]" },
];

export function WhyGardenBlogSection() {
  return (
    <section className="w-full bg-white py-20 lg:py-32 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 lg:mb-16 text-center max-w-3xl mx-auto">
          <span className="text-[#4F772D] font-bold tracking-widest uppercase text-sm mb-4 block">
            Resources
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl text-[#2A2A2A] leading-tight mb-6">
            Grow Your Knowledge
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Dive into our plant database or explore our latest stories, insights, and updates from the garden.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Kumara Plant Story (Creative Design) */}
          <div className="bg-[#4F772D] rounded-3xl relative overflow-hidden text-white group cursor-pointer transition-all duration-500 hover:shadow-2xl">
             <Link href="/kumara-plant-story" className="absolute inset-0 z-20">
               <span className="sr-only">Explore Kumara Plant Story</span>
             </Link>
             
             <div className="p-10 lg:p-14 h-full flex flex-col relative z-10">
                <div className="flex items-center gap-2 mb-6 opacity-80">
                  <Leaf className="w-5 h-5" />
                  <span className="font-serif text-sm tracking-[0.2em] uppercase">
                    Plant Story
                  </span>
                </div>
                
                <h2 className="font-serif text-3xl lg:text-5xl text-white leading-tight mb-6 max-w-md">
                  Kumara Plant Story
                </h2>
                
                <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-sm">
                  Explore a comprehensive catalog of species from our regenerative ecosystems.
                </p>

                <div className="mt-auto">
                   <span className="inline-flex items-center px-8 py-4 bg-white text-[#4F772D] rounded-full font-bold tracking-wider group-hover:bg-[#f0f0f0] transition-colors shadow-lg">
                      BROWSE STORY
                   </span>
                </div>
             </div>

             {/* Creative Visual: Floating Plant Cards */}
             <div className="absolute top-1/2 right-[-20px] md:right-8 lg:right-[-40px] xl:right-8 -translate-y-1/2 w-48 md:w-56 lg:w-48 xl:w-56 rotate-6 transition-transform duration-700 ease-out group-hover:rotate-3 group-hover:scale-105 group-hover:-translate-y-[55%]">
                {/* Card 1 (Back) */}
                <div className="absolute top-4 right-[-40px] w-full bg-white p-2 pb-4 rounded-xl shadow-lg opacity-60 scale-90 rotate-12">
                   <div className="relative aspect-[4/5] bg-gray-200 rounded-lg overflow-hidden mb-2">
                       <Image 
                         src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=500&fit=crop" 
                         alt="Plant" 
                         fill 
                         className="object-cover" 
                       />
                   </div>
                </div>
                
                {/* Card 2 (Front) */}
                <div className="relative w-full bg-white p-3 pb-5 rounded-2xl shadow-2xl rotate-[-6deg] group-hover:rotate-0 transition-transform duration-500">
                   <div className="relative aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-3">
                       <Image 
                         src="/images/generated/urban-garden-hero.png" 
                         alt="Featured Plant" 
                         fill 
                         className="object-cover" 
                       />
                       <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded text-white text-[10px] font-bold uppercase">
                          Edible
                       </div>
                   </div>
                   <div className="px-1">
                      <div className="h-1.5 w-1/3 bg-green-100 rounded mb-1.5"></div>
                      <div className="h-3 w-3/4 bg-gray-200 rounded mb-2"></div>
                      <div className="flex gap-1">
                         <div className="h-1.5 w-1.5 rounded-full bg-gray-200"></div>
                         <div className="h-1.5 w-1.5 rounded-full bg-gray-200"></div>
                         <div className="h-1.5 w-1.5 rounded-full bg-gray-200"></div>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Background Pattern */}
             <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          {/* Right Column: Blog Categories */}
          <div className="bg-[#F3F1E8] p-10 lg:p-14 rounded-3xl relative overflow-hidden flex flex-col justify-center">
            <span className="block font-serif text-sm tracking-[0.2em] uppercase mb-6 text-[#4F772D]">
              Blog
            </span>
            <h3 className="font-serif text-3xl lg:text-4xl text-gray-900 mb-8 leading-tight">
              Explore by Topic
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Link 
                  key={cat.id}
                  href={`/blog/category/${cat.id}`}
                  className={`px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all hover:scale-105 hover:shadow-md ${cat.color} flex items-center gap-2`}
                >
                  {cat.label}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              ))}
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#4F772D]/5 rounded-full blur-3xl pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
