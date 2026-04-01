import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import RoomsSection from "@/components/rooms-section";
import { getDictionary, Locale } from "@/lib/get-dictionary";
import { getCollection, RoomData } from "@/lib/get-content";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  
  const title = locale === "bg" ? "Стаи и апартаменти" : locale === "ru" ? "Номера и апартаменты" : "Rooms and Apartments";
  const description = locale === "bg" 
      ? "Разгледайте нашите уютни стаи и апартаменти в Черноморец. Всяко помещение е оборудвано с климатик, WiFi и предлага всичко необходимо за Вашия престой."
      : locale === "ru"
      ? "Посмотрите наши уютные номера и апартаменты в Черноморце. Каждый номер оборудован кондиционером, WiFi и всем необходимым для вашего пребывания."
      : "Explore our cozy rooms and apartments in Chernomorets. Each unit is equipped with air conditioning, WiFi, and everything needed for your stay.";

  return {
    title,
    description,
  };
}

export default async function RoomsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const dict = await getDictionary(locale as Locale);
  const rooms = await getCollection<RoomData>("rooms", locale);

  return (
    <>
      <Navbar locale={locale} dict={dict.nav} />
      <main className="pt-20 bg-background min-h-screen">
        {/* Page header */}
        <div className="bg-[#213764] py-16 md:py-20 text-center">
          <p className="text-[#05B2DC] text-sm tracking-[0.3em] uppercase font-medium mb-3">
            {locale === "bg" ? "Настаняване" : locale === "ru" ? "Размещение" : "Accommodation"}
          </p>
          <h1
            className="text-4xl md:text-5xl font-light text-white text-balance"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {locale === "bg" ? (
              <>Нашите <span className="italic text-[#05B2DC]">стаи</span></>
            ) : locale === "ru" ? (
              <>Наши <span className="italic text-[#05B2DC]">номера</span></>
            ) : (
              <>Our <span className="italic text-[#05B2DC]">rooms</span></>
            )}
          </h1>
          <p className="text-white/70 mt-4 max-w-xl mx-auto text-base leading-relaxed px-4 text-balance">
            {locale === "bg" 
              ? "Изберете стаята, която отговаря на Вашите нужди — всяка с морска гледка и модерни удобства."
              : locale === "ru"
              ? "Выберите номер, который подходит вам — каждый с видом на море и современными удобствами."
              : "Choose the room that fits your needs — each with a sea view and modern amenities."}
          </p>
        </div>
        <RoomsSection rooms={rooms} locale={locale} />
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
