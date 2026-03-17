"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4tJ2Jwe8V_5ymf9NiwSXDvq9K8G5Ybf-bjma_KgzeEneOmZlXlPKaUuU_0-4Miuw2mOQUZ61_5S5qeaeUhW68_qpG_AGLDy2NjC3DBNTOvpnq4pElsaZ0CiynaWoLqsTFhusd5VIkYY0xkfLa8lZ_X2oyETc1YozY_6_TwCxP6fegQnrm7DldIAHBrZck2ZJ_yDQnw1rvqcBafwNXkaoF8bfG8y_8_kwgaO3MSVntjv8qedztdXMwgIZfLNkDYOMMp1buuAvMUa4Y",
    alt: "Lush green garden landscape",
    caption: "The Learning Farm",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfkXyo9RRnmThGIVIlMrCSpxU9nffh8IxFwMUukGZ9n8JYTHzXSLzylv2zKwPLxnI61HvXwLm4mrE-SCfLGWDC0ezt-cy8j5lvrtUFlGQasj1nvcLmsyzr6pgHzfIIa3Istz4DE20SJ1RUNjMA-2reFhOeELbGYs97Bok_bkV8j-6l8GoEYxFSRdTD6E45Sar28D7ZpEYU17NMdkb9uX5VF3eTOWmJAX6lT2JJQr8oKrE8DyFINzw0v52Yatq5YPZCfSyQcYwDAfBH",
    alt: "Hands holding soil",
    caption: "Reconnect with Nature",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXR2zkv-rEHCmxVajj9K_4f6FRKx4Zfg30ugCXxtQSgxwaKQb4obWaNwYSO1UwE580IlM6_xxrH_ttdfknGubvJrqika4PX5jtw1_i4EcZx19CJ1fD2GneaR9WUTcyy-qYvSwca0K8Dl4226vWbzflsa6bkPmN52Gq_APZeAuz1psRvogegZCgqDBt0R9VpwT6-H778eobkZxiFXYL13CzC9Pbm5-ueN3-zKWYMd20Ht91kCZc6967vcTe7iPzoOz3g-tlOM8BGIDz",
    alt: "Community gathering",
    caption: "Community Gathering",
  },
];

export function GardenSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
        emblaApi.off("select", onSelect);
        emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-xl bg-gray-100 h-full min-h-[400px] lg:min-h-[500px]">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] min-w-0 h-full"
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
        onClick={scrollNext}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
