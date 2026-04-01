import { getDoc, getCollection, RoomData } from "@/lib/get-content";
import { getDictionary, Locale } from "@/lib/get-dictionary";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Users, Bath, Eye, Tv, Wind, Wifi, Phone } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const locales = ["bg", "en", "ru"];
  const params = [];

  for (const locale of locales) {
    const rooms = await getCollection<RoomData>("rooms", locale);
    for (const room of rooms) {
      params.push({ locale, slug: room.id });
    }
  }

  return params;
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params;
  const room = await getDoc<RoomData>("rooms", locale as Locale, slug);

  if (!room) {
    return {
      title: "Room Not Found",
    };
  }

  return {
    title: room.title,
    description: room.description.substring(0, 160),
    openGraph: {
      title: room.title,
      description: room.description.substring(0, 160),
      images: [
        {
          url: room.image,
          width: 1200,
          height: 630,
          alt: room.title,
        },
      ],
    },
  };
}

export default async function RoomPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const params = await props.params;
  const { locale, slug } = params;
  const dict = await getDictionary(locale as Locale);
  const room = await getDoc<RoomData>("rooms", locale, slug);

  if (!room) {
    notFound();
  }

  return (
    <main className="bg-[#FAFAFB] min-h-screen">
      <Navbar locale={locale} dict={dict.nav} />

      <div className="pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/#rooms`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#05B2DC] transition-colors mb-8 group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {locale === "bg" ? "Назад към стаите" : locale === "ru" ? "Назад к номерам" : "Back to rooms"}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[3/2] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {room.gallery && room.gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {room.gallery.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-md">
                      <Image
                        src={img}
                        alt={`${room.title} - ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Room Details */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border">
              <p className="text-[#05B2DC] text-sm tracking-[0.3em] uppercase font-medium mb-4">
                {locale === "bg" ? "Детайли за стаята" : locale === "ru" ? "Детали номера" : "Room details"}
              </p>
              <h1 
                className="text-4xl md:text-5xl font-light text-[#213764] mb-6"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                {room.title}
              </h1>
              
              <div className="flex flex-col gap-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-[#f0f8fc] px-4 py-2 rounded-full text-[#213764] text-sm font-medium">
                    <Users className="w-4 h-4" />
                    {room.capacity} {locale === "ru" ? "гостей" : locale === "en" ? "guests" : (room.capacity > 1 ? "госта" : "гост")}
                  </div>
                </div>

                <div className="bg-[#05B2DC]/5 p-6 rounded-2xl border border-[#05B2DC]/10">
                  <h4 className="text-sm font-bold text-[#213764] uppercase tracking-wider mb-4 opacity-70">
                    {locale === "bg" ? "Цени по сезони" : locale === "ru" ? "Цены по сезонам" : "Seasonal Pricing"}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white px-4 py-3 rounded-xl shadow-sm border border-border">
                      <span className="text-sm font-medium text-[#213764]">
                        {locale === "bg" ? "Юни / Септември" : locale === "ru" ? "Июнь / Сентябрь" : "June / September"}
                      </span>
                      <div className="text-lg font-bold text-[#05B2DC]">
                        {room.price_june_sept} €
                        <span className="text-xs font-normal text-muted-foreground ml-1 uppercase">
                          /{locale === "bg" ? "нощувка" : locale === "ru" ? "ночь" : "night"}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-white px-4 py-3 rounded-xl shadow-sm border border-border">
                      <span className="text-sm font-medium text-[#213764]">
                        {locale === "bg" ? "Юли / Август" : locale === "ru" ? "Июль / Август" : "July / August"}
                      </span>
                      <div className="text-lg font-bold text-[#05B2DC]">
                        {room.price_july_aug} €
                        <span className="text-xs font-normal text-muted-foreground ml-1 uppercase">
                          /{locale === "bg" ? "нощувка" : locale === "ru" ? "ночь" : "night"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
                {room.description}
              </p>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-12 border-t border-b border-divider py-8">
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-[#05B2DC]" />
                  <span className="text-sm font-medium">{locale === "bg" ? "Безплатен WiFi" : locale === "ru" ? "Бесплатный WiFi" : "Free WiFi"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wind className="w-5 h-5 text-[#05B2DC]" />
                  <span className="text-sm font-medium">{locale === "bg" ? "Климатик" : locale === "ru" ? "Кондиционер" : "Air Conditioning"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Tv className="w-5 h-5 text-[#05B2DC]" />
                  <span className="text-sm font-medium">{locale === "bg" ? "Телевизор" : locale === "ru" ? "Телевизор" : "TV"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bath className="w-5 h-5 text-[#05B2DC]" />
                  <span className="text-sm font-medium">{locale === "bg" ? "Собствена баня" : locale === "ru" ? "Собственная ванная" : "Private Bathroom"}</span>
                </div>
                {/* Conditional Apartment Amenities */}
                {slug.includes("apartment") && (
                  <>
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-[#05B2DC]" />
                      <span className="text-sm font-medium">{locale === "bg" ? "Морска панорама" : locale === "ru" ? "Вид на море" : "Sea View"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-[#05B2DC] rounded-md flex items-center justify-center text-[10px] font-bold text-[#05B2DC]">P</div>
                      <span className="text-sm font-medium">{locale === "bg" ? "Частен паркинг" : locale === "ru" ? "Частная парковка" : "Private Parking"}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <a
                  href={`tel:+359889716096`}
                  className="flex items-center justify-center gap-3 bg-[#F4A261] hover:bg-[#e8945a] text-white font-semibold text-lg px-8 py-5 rounded-2xl shadow-lg transition-all duration-200"
                >
                  <Phone className="w-5 h-5" />
                  {locale === "bg" ? "Обадете се сега" : locale === "ru" ? "Позвоните сейчас" : "Call Now"}
                </a>
                <p className="text-center text-sm font-semibold text-[#213764]">
                  +359 88 971 6096
                </p>
                <p className="text-center text-xs text-muted-foreground">
                  * {locale === "bg" ? "Цените са ориентировъчни." : locale === "ru" ? "Цены ориентировочные." : "Prices are estimated."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer dict={dict.footer} locale={locale} />
    </main>
  );
}
