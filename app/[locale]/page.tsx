import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import AboutSection from '@/components/about-section'
import AmenitiesSection from '@/components/amenities-section'
import QuoteSection from '@/components/quote-section'
import RoomsSection from '@/components/rooms-section'
import GallerySection from '@/components/gallery-section'
import LocationSection from '@/components/location-section'
import ContactSection from '@/components/contact-section'
import FacebookSection from '@/components/facebook-section'
import Footer from '@/components/footer'
import { getDictionary, Locale } from '@/lib/get-dictionary'
import { getCollection, RoomData } from '@/lib/get-content'

export default async function Home(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const dict = await getDictionary(locale as Locale);
  const rooms = await getCollection<RoomData>('rooms', locale);

  return (
    <main>
      <Navbar locale={locale} dict={dict.nav} />
      <HeroSection dict={dict.hero} />
      <QuoteSection dict={dict.quote} />
      <AboutSection dict={dict.about} rooms={rooms} locale={locale} />
      <AmenitiesSection dict={dict.amenities} />
      <RoomsSection rooms={rooms} locale={locale} />
      <GallerySection dict={dict.gallery} />
      <LocationSection dict={dict.location} />
      <ContactSection dict={dict.contact} />
      <FacebookSection dict={dict.facebook} locale={locale} />
      <Footer dict={dict.footer} locale={locale} />
    </main>
  )
}
