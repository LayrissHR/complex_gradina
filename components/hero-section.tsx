import { MessageCircle, Phone } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  dict: {
    location: string;
    title_part1: string;
    title_part2: string;
    subtitle: string;
    cta_phone: string;
    cta_messenger: string;
  };
}

export default function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/images/cover.jpg"
        alt={dict.title_part1}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Dark overlay with ocean tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#213764]/40 via-[#213764]/30 to-[#05B2DC]/15" />

      {/* Wave shape at bottom */}
      <div className="absolute bottom-0 left-0 right-0 wave-divider">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-20"
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="#FAFAFB"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
          <p className="text-[#05B2DC] text-sm md:text-base tracking-[0.3em] uppercase font-medium mb-4">
            {dict.location}
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight text-balance"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {dict.title_part1}
            <br />
            <span className="italic font-normal text-[#05B2DC]">
              {dict.title_part2}
            </span>
          </h1>
          <p className="text-white text-base md:text-xl mb-10 leading-relaxed max-w-xl mx-auto text-pretty">
            {dict.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+359889716096"
              className="flex items-center justify-center gap-3 bg-[#F4A261] hover:bg-[#e8945a] text-white font-semibold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5" />
              {dict.cta_phone}
            </a>
            <a
              href="https://m.me/KompleksGradina"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold text-base px-8 py-4 rounded-full border border-white/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              {dict.cta_messenger}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 12L2 6h12z" />
        </svg>
      </div>
    </section>
  );
}
