import { RoomData } from "@/lib/get-content";
import { Sun, Waves, Wind } from "lucide-react";
import Image from "next/image";
import PriceEstimator from "./price-estimator";

interface AboutSectionProps {
  dict: {
    title: string;
    heading: string;
    accent: string;
    p1: string;
    p2: string;
    cta: string;
  };
  rooms: RoomData[];
  locale: string;
}

export default function AboutSection({ dict, rooms, locale }: AboutSectionProps) {
  const highlights = [
    { icon: Waves, label: locale === "bg" ? "Външен басейн и бар до басейна" : locale === "ru" ? "Бассейн и Бар у бассейна" : "Outdoor Pool & Pool Bar" },
    { icon: Sun, label: locale === "bg" ? "Гледка към морето (Апартаменти)" : locale === "ru" ? "Вид на море (Апартаменты)" : "Sea view (Apartments)" },
    { icon: Wind, label: locale === "bg" ? "Свеж морски въздух" : locale === "ru" ? "Свежий морской воздух" : "Fresh sea air" },
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text block */}
          <div className="flex flex-col gap-6">
            <p className="text-[#05B2DC] text-sm tracking-[0.3em] uppercase font-medium">
              {dict.title}
            </p>
            <h2
              className="text-4xl md:text-5xl font-light leading-tight text-balance text-[#213764]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              {dict.heading}
              <br />
              <span className="italic text-[#05B2DC]">{dict.accent}</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              {dict.p1}
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              {dict.p2}
            </p>

            {/* Highlights */}
            <div className="flex flex-col gap-3 mt-2">
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#05B2DC]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#05B2DC]" />
                  </div>
                  <span className="text-[#213764] font-medium text-sm">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <PriceEstimator rooms={rooms} locale={locale} />
          </div>

          {/* Image block */}
          <div className="relative sticky top-32">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/cover.jpg"
                alt="Комплекс Градина"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative accent box */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#05B2DC]/10 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#F9DFFF] rounded-xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
