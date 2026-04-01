"use client";

import { useState, useMemo } from "react";
import { RoomData } from "@/lib/get-content";
import { Calculator, MessageCircle } from "lucide-react";

interface PriceEstimatorProps {
  rooms: RoomData[];
  locale: string;
}

const SEASONS = [
  { id: "low", label: { bg: "Нисък сезон (Юни/Септември)", en: "Low Season (June/Sept)", ru: "Низкий сезон (Июнь/Сент)" }, multiplier: 0.8 },
  { id: "high", label: { bg: "Висок сезон (Юли/Август)", en: "High Season (July/Aug)", ru: "Высокий сезон (Июль/Авг)" }, multiplier: 1.2 },
];

export default function PriceEstimator({ rooms, locale }: PriceEstimatorProps) {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]?.id || "");
  const [seasonId, setSeasonId] = useState("low");
  const [nights, setNights] = useState(1);

  const total = useMemo(() => {
    const room = rooms.find(r => r.id === selectedRoom);
    if (!room) return 0;
    
    const pricePerNight = seasonId === "low" ? room.price_june_sept : room.price_july_aug;
    return Math.round(pricePerNight * nights);
  }, [selectedRoom, seasonId, nights, rooms]);

  const sendInquiry = () => {
    const room = rooms.find(r => r.id === selectedRoom);
    const season = SEASONS.find(s => s.id === seasonId);
    const text = locale === "bg" 
      ? `Здравейте, интересувам се от ${room?.title} за ${nights} нощувки (${season?.label.bg}). Очаквана цена: ${total} €. Свободно ли е?` 
      : locale === "ru"
      ? `Здравствуйте, меня интересует ${room?.title} на ${nights} ночей (${season?.label.ru}). Ожидаемая цена: ${total} €. Есть ли свободные места?`
      : `Hello, I'm interested in ${room?.title} for ${nights} nights (${season?.label.en}). Estimated price: ${total} €. Is it available?`;
    
    window.open(`https://m.me/KompleksGradina`, "_blank");
  };

  if (!rooms.length) return null;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-[#05B2DC]/20 max-w-lg mx-auto lg:mx-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#05B2DC] rounded-xl flex items-center justify-center text-white">
          <Calculator className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold text-[#213764]" style={{ fontFamily: "var(--font-cormorant), serif" }}>
          {locale === "bg" ? "Калкулатор за цена" : locale === "ru" ? "Калькулятор цены" : "Price Estimator"}
        </h3>
      </div>

      <div className="space-y-4">
        {/* Room Select */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 ml-1">
            {locale === "bg" ? "Изберете стая" : locale === "ru" ? "Выберите номер" : "Select Room"}
          </label>
          <select 
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full bg-[#f8fafc] border border-[#e2eaf2] rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#05B2DC] focus:border-[#05B2DC] outline-none transition-all"
          >
            {rooms.map(r => (
              <option key={r.id} value={r.id}>{r.title}</option>
            ))}
          </select>
        </div>

        {/* Season Select */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 ml-1">
            {locale === "bg" ? "Период" : locale === "ru" ? "Период" : "Period"}
          </label>
          <select 
            value={seasonId}
            onChange={(e) => setSeasonId(e.target.value)}
            className="w-full bg-[#f8fafc] border border-[#e2eaf2] rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#05B2DC] focus:border-[#05B2DC] outline-none transition-all"
          >
            {SEASONS.map(s => (
              <option key={s.id} value={s.id}>
                {locale === "ru" ? s.label.ru : locale === "en" ? s.label.en : s.label.bg}
              </option>
            ))}
          </select>
        </div>

        {/* Nights Count */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 ml-1">
            {locale === "bg" ? "Брой нощувки" : locale === "ru" ? "Кол-во ночей" : "Number of nights"}
          </label>
          <input 
            type="number"
            min="1"
            max="30"
            value={nights}
            onChange={(e) => setNights(parseInt(e.target.value) || 1)}
            className="w-full bg-[#f8fafc] border border-[#e2eaf2] rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#05B2DC] focus:border-[#05B2DC] outline-none transition-all"
          />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-dashed border-divider">
        <div className="flex justify-between items-end">
          <span className="text-muted-foreground text-sm">
            {locale === "bg" ? "Предварителна сума:" : locale === "ru" ? "Предварительная цена:" : "Estimated Total:"}
          </span>
          <div className="text-right">
            <span className="text-3xl font-bold text-[#213764]">{total}</span>
            <span className="text-sm font-semibold text-[#05B2DC] ml-1">€</span>
          </div>
        </div>
      </div>
    </div>
  );
}
