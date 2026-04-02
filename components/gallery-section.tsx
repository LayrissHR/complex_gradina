"use client";

import { ZoomIn } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "./ui/lightbox";

interface GallerySectionProps {
  dict: {
    title: string;
    heading: string;
    subheading: string;
  };
}

const photos = [
  {
    src: "/images/cover.jpg",
    alt: "Общ изглед на комплекс Градина",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/pool.jpg",
    alt: "Басейнът на комплекса",
    span: "",
  },
  {
    src: "/images/Pool_with_outside_parking.jpg",
    alt: "Басейн и паркинг пред хотела",
    span: "col-span-2",
  },
  {
    src: "/images/Apartment_1.JPG",
    alt: "Интериор на апартамент",
    span: "",
  },
  {
    src: "/images/Apartment_2.JPG",
    alt: "Просторен апартамент с гледка",
    span: "",
  },
  {
    src: "/images/Double_room.JPG",
    alt: "Уютна двойна стая",
    span: "row-span-2",
  },
  {
    src: "/images/Double_room_2.jpg",
    alt: "Комфортна стая за гости",
    span: "",
  },
  {
    src: "/images/Bathroom_1.JPG",
    alt: "Модерна баня",
    span: "",
  },
  {
    src: "/images/Bathroom_2.JPG",
    alt: "Баня в стаите",
    span: "",
  },
  {
    src: "/images/night.JPG",
    alt: "Вечерен изглед на комплекса",
    span: "col-span-2",
  },
  {
    src: "/images/pool_2.jpg",
    alt: "Зона за релакс около басейна",
    span: "",
  },
  {
    src: "/images/Apartment_3.jpg",
    alt: "Детайл от апартамент",
    span: "",
  },
  {
    src: "/images/Apartment_4.jpg",
    alt: "Светъл апартамент",
    span: "col-span-2",
  },
  {
    src: "/images/Apartment_5.jpg",
    alt: "Обзавеждане на апартамент",
    span: "",
  },
  {
    src: "/images/bedroom_in_apartment.jpg",
    alt: "Спалня в апартамент",
    span: "",
  },
  {
    src: "/images/Bathroom_3.jpg",
    alt: "Луксозна баня",
    span: "",
  },
  {
    src: "/images/terrace_apartment_1.jpg",
    alt: "Тераса с морска гледка",
    span: "",
  },
  {
    src: "/images/terrace_apartment_2.jpg",
    alt: "Панорамна тераса",
    span: "",
  },
];

export default function GallerySection({ dict }: GallerySectionProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#213764]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#05B2DC] text-sm tracking-[0.3em] uppercase font-medium mb-3">
            {dict.title}
          </p>
          <h2
            className="text-4xl md:text-5xl font-light text-white text-balance"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {dict.heading}
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            {dict.subheading}
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {photos.map((photo, i) => (
            <button
              key={i}
              className={`relative rounded-xl overflow-hidden group cursor-pointer ${photo.span}`}
              onClick={() => setLightbox(i)}
              aria-label={`${dict.title}: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-[#213764]/0 group-hover:bg-[#213764]/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          images={photos.map((p) => p.src)}
          currentIndex={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={(index) => setLightbox(index)}
        />
      )}
    </section>
  );
}
