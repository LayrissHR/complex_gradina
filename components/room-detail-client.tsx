'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Phone, CheckCircle2 } from 'lucide-react'
import { Room, AMENITY_ICONS } from '@/lib/rooms-data'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function RoomDetailClient({ room }: { room: Room }) {
  const [activeImg, setActiveImg] = useState(0)

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-background">
        {/* Back link */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-[#213764] hover:text-[#05B2DC] text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад към всички стаи
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={room.gallery[activeImg]}
                  alt={room.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex gap-3">
                {room.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative flex-1 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImg === i ? 'border-[#05B2DC]' : 'border-transparent hover:border-[#05B2DC]/50'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${room.name} - снимка ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="15vw"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Room info */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[#05B2DC] text-sm tracking-[0.3em] uppercase font-medium mb-2">
                  Настаняване
                </p>
                <h1
                  className="text-4xl md:text-5xl font-light text-[#213764] leading-tight"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  {room.name}
                </h1>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed">
                {room.description}
              </p>

              {/* Amenities icons */}
              <div>
                <h2
                  className="text-lg font-semibold text-[#213764] mb-3"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Включени удобства
                </h2>
                <div className="flex flex-wrap gap-3">
                  {(Object.keys(room.amenities) as (keyof typeof room.amenities)[])
                    .filter((key) => room.amenities[key])
                    .map((key) => {
                      const { icon: Icon, label } = AMENITY_ICONS[key]
                      return (
                        <div
                          key={key}
                          className="flex items-center gap-2 bg-[#05B2DC]/10 text-[#213764] px-3 py-2 rounded-lg text-sm"
                        >
                          <Icon className="w-4 h-4 text-[#05B2DC]" />
                          <span>{label}</span>
                        </div>
                      )
                    })}
                </div>
              </div>

              {/* Details list */}
              <div>
                <h2
                  className="text-lg font-semibold text-[#213764] mb-3"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Описание на стаята
                </h2>
                <ul className="flex flex-col gap-2">
                  {room.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-3 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-[#05B2DC] shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-[#213764] rounded-2xl p-6 flex flex-col gap-4 mt-2">
                <p className="text-white font-medium">
                  За наличност и резервации, свържете се с нас:
                </p>
                <a
                  href="tel:+359888000000"
                  className="flex items-center justify-center gap-3 bg-[#F4A261] hover:bg-[#e8945a] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 text-base"
                >
                  <Phone className="w-5 h-5" />
                  +359 888 000 000
                </a>
                <a
                  href="https://m.me/gradinachernomorets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-white/30 hover:bg-white/10 text-white font-medium py-3 rounded-xl transition-colors duration-200 text-sm"
                >
                  Пишете ни в Messenger
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
