"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useCallback } from "react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const handlePrevious = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") onClose();
    };

    // Prevent scrolling when lightbox is open
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrevious, handleNext, onClose]);

  if (currentIndex < 0 || currentIndex >= images.length) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/70 hover:text-white transition-all hover:scale-110 z-[110]"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="w-8 h-8 sm:w-10 sm:h-10" />
      </button>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-all hover:scale-110 z-[110] p-2 group"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10 sm:w-16 sm:h-16 group-active:scale-95" />
          </button>
          <button
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-all hover:scale-110 z-[110] p-2 group"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10 sm:w-16 sm:h-16 group-active:scale-95" />
          </button>
        </>
      )}

      {/* Main Image Container */}
      <div
        className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          fill
          className="object-contain select-none transition-all duration-300"
          sizes="100vw"
          priority
        />
      </div>

      {/* Pagination Counter */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-white/80 text-sm font-medium tracking-wider">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
