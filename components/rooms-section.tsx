"use client";

import { AMENITY_ICONS } from "@/lib/rooms-data";
import { RoomData } from "@/lib/get-content";
import Image from "next/image";
import Link from "next/link";

interface RoomsSectionProps {
  rooms: RoomData[];
  locale: string;
}

export default function RoomsSection({ rooms, locale }: RoomsSectionProps) {
  return (
    <section id="rooms" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#05B2DC] text-sm tracking-[0.3em] uppercase font-medium mb-3">
            {locale === "bg" ? "Настаняване" : locale === "ru" ? "Размещение" : "Accommodation"}
          </p>
          <h2
            className="text-4xl md:text-5xl font-light text-[#213764] text-balance"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {locale === "bg" ? (
              <>Нашите <span className="italic text-[#05B2DC]">стаи</span></>
            ) : locale === "ru" ? (
              <>Наши <span className="italic text-[#05B2DC]">номера</span></>
            ) : (
              <>Our <span className="italic text-[#05B2DC]">rooms</span></>
            )}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base leading-relaxed">
            {locale === "bg" 
              ? "Всяка стая е проектирана с грижа за детайла — за да се чувствате като у дома, с гледка към морето."
              : locale === "ru"
              ? "Каждый номер спроектирован с заботой о деталях — чтобы вы чувствовали себя как дома, с видом на море."
              : "Every room is designed with attention to detail — to make you feel at home, with a sea view."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-border transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <Link 
                href={`/${locale}/rooms/${room.id}`}
                className="relative aspect-[4/3] overflow-hidden block"
              >
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </Link>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <h3
                  className="text-xl font-semibold text-[#213764] mb-2"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                  }}
                >
                  {room.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  {room.description}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-muted-foreground">
                    {locale === "bg" ? "От" : locale === "ru" ? "От" : "From"}
                  </div>
                  <div className="text-xl font-bold text-[#05B2DC]">
                    {room.price_june_sept} €
                  </div>
                </div>

                <Link
                  href={`/${locale}/rooms/${room.id}`}
                  className="flex items-center justify-center bg-[#213764] hover:bg-[#05B2DC] text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-200"
                >
                  {locale === "bg" ? "Виж детайли" : locale === "ru" ? "Подробнее" : "View details"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
