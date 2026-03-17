"use client";

import Image from "next/image";
import { useState } from "react";

interface PlantGalleryProps {
    images: string[];
    fallbackImage: string;
    alt: string;
}

export default function PlantGallery({ images, fallbackImage, alt }: PlantGalleryProps) {
    // Build gallery: use explicit images if available, otherwise create a set from the fallback
    const rawImages = images && images.length > 0 ? images : [fallbackImage];
    const galleryImages = rawImages.filter(Boolean);
    const [mainImage, setMainImage] = useState(galleryImages[0] ?? null);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-100">
                {mainImage && (
                <Image
                    src={mainImage}
                    alt={`${alt} Primary`}
                    fill
                    className="object-cover transition-opacity duration-500 ease-in-out"
                    priority
                />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Thumbnails Row — always visible */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {galleryImages.map((imgSrc, index) => (
                    <button
                        key={index}
                        onClick={() => setMainImage(imgSrc)}
                        className={`flex-shrink-0 w-20 aspect-square rounded-lg overflow-hidden border-2 snap-start transition-all duration-300 hover:opacity-80 relative ${mainImage === imgSrc
                                ? "border-[#4a6741] ring-2 ring-[#4a6741]/20"
                                : "border-transparent hover:border-[#4a6741]/50 hover:opacity-80"
                            }`}
                        aria-label={`View gallery image ${index + 1}`}
                    >
                        <Image
                            src={imgSrc}
                            alt={`${alt} gallery thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
