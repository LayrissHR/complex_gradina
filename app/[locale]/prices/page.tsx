import { getCollection, RoomData } from "@/lib/get-content";
import { getDictionary, Locale } from "@/lib/get-dictionary";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Table, Users, Check, Waves, Coffee, Car } from "lucide-react";

export async function generateStaticParams() {
  return [{ locale: "bg" }, { locale: "en" }, { locale: "ru" }];
}

export default async function PricesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const dict = await getDictionary(locale as Locale);
  const rooms = await getCollection<RoomData>("rooms", locale);

  const t = {
    bg: {
      title: "Цени за сезон 2026",
      subtitle: "Прозрачни цени за всякакъв тип настаняване",
      roomType: "Тип стая",
      capacity: "Капацитет",
      lowSeason: "Юни / Септември",
      highSeason: "Юли / Август",
      perNight: "нощувка",
      included: "Какво включва цената:",
      facilities: ["Външен басейн и шезлонги", "Вътрешен бар до басейна", "Климатик и WiFi", "Хладилник и TV"],
      apartmentBonus: "Апартаментите включват морска гледка и частен паркинг.",
    },
    en: {
      title: "Pricing for 2026 Season",
      subtitle: "Transparent pricing for all types of accommodation",
      roomType: "Room Type",
      capacity: "Capacity",
      lowSeason: "June / September",
      highSeason: "July / August",
      perNight: "night",
      included: "What's included in the price:",
      facilities: ["Outdoor pool & Sunbeds", "Indoor pool bar", "AC & WiFi", "Refrigerator & TV"],
      apartmentBonus: "Apartments include sea view and private parking.",
    },
    ru: {
      title: "Цены на сезон 2026",
      subtitle: "Прозрачные цены на все типы размещения",
      roomType: "Тип номера",
      capacity: "Капацитет",
      lowSeason: "Июнь / Сентябрь",
      highSeason: "Июль / Август",
      perNight: "ночь",
      included: "Что включено в стоимость:",
      facilities: ["Открытый бассейн и шезлонги", "Крытый пул-бар", "Кондиционер и WiFi", "Холодильник и ТВ"],
      apartmentBonus: "В апартаментах есть вид на море и частная парковка.",
    },
  }[locale as "bg" | "en" | "ru"];

  return (
    <main className="bg-[#FAFAFB] min-h-screen">
      <Navbar locale={locale} dict={dict.nav} />

      <div className="pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 
              className="text-4xl md:text-5xl font-light text-[#213764] mb-4"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg italic decoration-[#05B2DC]">
              {t.subtitle}
            </p>
          </div>

          {/* Pricing Table */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-divider mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#213764] text-white">
                    <th className="px-6 py-5 font-semibold text-sm uppercase tracking-wider">{t.roomType}</th>
                    <th className="px-6 py-5 font-semibold text-sm uppercase tracking-wider text-center">{t.capacity}</th>
                    <th className="px-6 py-5 font-semibold text-sm uppercase tracking-wider text-center">{t.lowSeason}</th>
                    <th className="px-6 py-5 font-semibold text-sm uppercase tracking-wider text-center bg-[#05B2DC]">{t.highSeason}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-divider">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-[#f0f8fc]/30 transition-colors">
                      <td className="px-6 py-6 font-medium text-[#213764]">{room.title}</td>
                      <td className="px-6 py-6 text-center text-muted-foreground">
                        <div className="flex items-center justify-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {room.capacity}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-[#213764]">{room.price_june_sept} €</span>
                          <span className="text-[10px] text-muted-foreground uppercase">/{t.perNight}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center bg-[#05B2DC]/5">
                        <div className="flex flex-col">
                          <span className="text-xl font-extrabold text-[#05B2DC]">{room.price_july_aug} €</span>
                          <span className="text-[10px] text-[#05B2DC]/70 uppercase font-bold">/{t.perNight}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-divider shadow-sm">
              <h3 className="text-xl font-bold text-[#213764] mb-6 flex items-center gap-2">
                <Check className="text-[#05B2DC]" />
                {t.included}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.facilities.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#05B2DC]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#05B2DC] rounded-2xl p-8 text-white flex flex-col justify-center shadow-lg relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-xl font-bold mb-4">{locale === "bg" ? "Специално за апартамените" : locale === "ru" ? "Специально для апартаментов" : "Special for Apartments"}</h3>
                 <p className="text-white/90 leading-relaxed mb-6">
                    {t.apartmentBonus}
                 </p>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Waves className="w-5 h-5" /></div>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Car className="w-5 h-5" /></div>
                 </div>
               </div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <Footer dict={dict.footer} locale={locale} />
    </main>
  );
}
