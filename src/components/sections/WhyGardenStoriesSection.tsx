"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Story {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  linkText: string;
  linkUrl: string;
  color: string;
}

const stories: Story[] = [
  {
    id: "peruri",
    label: "TAMAN KOTA PERURI",
    title: "Urban Oasis Revitalized",
    description:
      "Transforming a neglected public space into a thriving community hub. Taman Kota Peruri now serves as a green lung for the neighborhood, hosting educational workshops and community gatherings.",
    image: "/images/generated/urban-garden-hero.png", // Urban park/garden
    linkText: "EXPLORE PERURI",
    linkUrl: "/services/landscaping-consultancy/peruri",
    color: "#4F772D",
  },
  {
    id: "sqp",
    label: "SQP",
    title: "Scientia Square Park",
    description:
      "Our flagship educational farm located in the heart of Gading Serpong. A place where families and schools come to learn about sustainable farming, composting, and biodiversity.",
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=2000&auto=format&fit=crop", // Educational farm
    linkText: "VISIT SQP",
    linkUrl: "/services/landscaping-consultancy/sqp",
    color: "#d97706",
  },
  {
    id: "gresk",
    label: "GRESIK",
    title: "Community Greenspace",
    description:
      "Integrating edible landscapes into residential areas. The GRESIK project demonstrates how small urban spaces can be productive, beautiful, and foster neighborly connections.",
    image: "https://images.unsplash.com/photo-1584473457406-6240486418e9?q=80&w=2000&auto=format&fit=crop", // Community garden
    linkText: "SEE GRESIK",
    linkUrl: "/services/landscaping-consultancy/gresk",
    color: "#15803d",
  },
  {
    id: "holiday",
    label: "HOLIDAY PROGRAM",
    title: "Nurturing Young Minds",
    description:
      "Our seasonal programs designed to reconnect children with nature. Through hands-on activities, kids learn the magic of growing food and the importance of caring for our planet.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2000&auto=format&fit=crop", // Kids gardening
    linkText: "JOIN PROGRAM",
    linkUrl: "/services/educational-program/holiday",
    color: "#b45309",
  },
];

export function WhyGardenStoriesSection() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const activeStory = stories[activeStoryIndex];

  const handleNext = () => {
    setActiveStoryIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setActiveStoryIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="w-full bg-[#F3F1E8] py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <h2 className="font-serif text-3xl lg:text-5xl text-gray-900 text-center mb-16 max-w-4xl mx-auto leading-tight">
          Access to nature changed the lives of communities in{" "}
          <span className="italic text-[#4F772D]">Jakarta, Tangerang,</span> and beyond.
        </h2>

        {/* Main Content Area */}
        <div className="relative">
          {/* Tabs / Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 z-10 relative">
            {stories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => setActiveStoryIndex(index)}
                className={`px-6 py-2 rounded-full text-sm font-bold tracking-wider transition-all duration-300 border-2 ${
                  index === activeStoryIndex
                    ? "bg-white text-gray-900 border-white shadow-lg scale-105"
                    : "bg-transparent text-gray-500 border-gray-300 hover:border-gray-400 hover:bg-white/50"
                }`}
              >
                {story.label}
              </button>
            ))}
          </div>

          {/* Image Container */}
          <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] group">
            {/* Main Image Wrapper with Overflow Hidden */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={activeStory.image}
                alt={activeStory.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/10"></div>

              {/* Navigation Arrows (Desktop) */}
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg z-20 hidden lg:flex"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg z-20 hidden lg:flex"
                aria-label="Next story"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>
            </div>

            {/* Floating Card Content - Outside overflow hidden */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] lg:w-[600px] z-30">
              <div className="bg-white p-8 rounded-xl shadow-xl text-center relative overflow-hidden">
                {/* Top Colored Bar */}
                <div 
                  className="absolute top-0 left-0 w-full h-2" 
                  style={{ backgroundColor: activeStory.color }}
                />
                
                <h3 className="font-serif text-2xl text-gray-900 mb-4 mt-2">
                  {activeStory.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {activeStory.description}
                </p>
                
                <Link 
                  href={activeStory.linkUrl}
                  className="inline-flex items-center text-sm font-bold tracking-widest uppercase hover:underline underline-offset-4 decoration-2 decoration-[#4F772D]"
                  style={{ color: activeStory.color }}
                >
                  {activeStory.linkText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Spacer for the floating card */}
          <div className="h-32 lg:h-24"></div>

          {/* Mobile Navigation Controls */}
          <div className="flex justify-center gap-4 mt-8 lg:hidden">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
