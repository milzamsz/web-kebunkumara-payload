"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
    images: string[];
    alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 shadow-sm">
                <Image
                    src={mainImage}
                    alt={`${alt} — main`}
                    fill
                    className="object-cover transition-opacity duration-500 ease-in-out"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                    {images.map((imgSrc, index) => (
                        <button
                            key={index}
                            onClick={() => setMainImage(imgSrc)}
                            className={`flex-shrink-0 w-20 aspect-square rounded-lg overflow-hidden border-2 snap-start transition-all duration-300 hover:opacity-80 relative ${mainImage === imgSrc
                                    ? "border-[#4a6741] ring-2 ring-[#4a6741]/20"
                                    : "border-transparent hover:border-[#4a6741]/50"
                                }`}
                            aria-label={`View image ${index + 1}`}
                        >
                            <Image
                                src={imgSrc}
                                alt={`${alt} thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
