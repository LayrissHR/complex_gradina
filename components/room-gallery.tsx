"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import Lightbox from "./ui/lightbox";

interface RoomGalleryProps {
  mainImage: string;
  gallery: string[];
  roomTitle: string;
}

export default function RoomGallery({ mainImage, gallery, roomTitle }: RoomGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Combine the main image and the additional gallery images
  const allImages = [mainImage, ...(gallery || [])];

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <button
        onClick={() => setLightboxIdx(activeIdx)}
        className="relative aspect-[3/2] w-full rounded-3xl overflow-hidden shadow-xl group cursor-zoom-in block"
      >
        <Image
          src={allImages[activeIdx]}
          alt={roomTitle}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100" />
        </div>
      </button>

      {/* Thumbnails Grid */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-3 gap-4">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIdx(idx);
                // The user said "clickable like the gallery", 
                // in the homepage gallery, a click opens the lightbox immediately.
                setLightboxIdx(idx);
              }}
              className={`relative aspect-square rounded-2xl overflow-hidden shadow-md group transition-all duration-300 ${
                activeIdx === idx ? "ring-2 ring-[#05B2DC] ring-offset-2" : "hover:shadow-lg"
              }`}
            >
              <Image
                src={img}
                alt={`${roomTitle} - thumbnail ${idx + 1}`}
                fill
                className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                  activeIdx !== idx ? "opacity-70 group-hover:opacity-100" : ""
                }`}
                sizes="(max-width: 768px) 33vw, 15vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <Lightbox
          images={allImages}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNavigate={(index) => {
            setLightboxIdx(index);
            setActiveIdx(index);
          }}
        />
      )}
    </div>
  );
}
