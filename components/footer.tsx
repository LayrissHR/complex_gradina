'use client'

import Link from 'next/link';

interface FooterProps {
  dict: {
    about_title: string;
    about_text: string;
    links_title: string;
    contact_title: string;
    rights: string;
  };
  locale: string;
}

export default function Footer({ dict, locale }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#213764] text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-light mb-3" style={{ fontFamily: 'var(--font-cormorant)' }}>
              {dict.about_title}
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {dict.about_text}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
              {dict.links_title}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}#rooms`} className="text-gray-300 hover:text-[#05B2DC] transition-colors">
                  {locale === "bg" ? "Стаи" : locale === "ru" ? "Номера" : "Rooms"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#amenities`} className="text-gray-300 hover:text-[#05B2DC] transition-colors">
                  {locale === "bg" ? "Удобства" : locale === "ru" ? "Удобства" : "Amenities"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#gallery`} className="text-gray-300 hover:text-[#05B2DC] transition-colors">
                  {locale === "bg" ? "Галерия" : locale === "ru" ? "Галерея" : "Gallery"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#location`} className="text-gray-300 hover:text-[#05B2DC] transition-colors">
                  {locale === "bg" ? "Местоположение" : locale === "ru" ? "Расположение" : "Location"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#contact`} className="text-gray-300 hover:text-[#05B2DC] transition-colors">
                  {locale === "bg" ? "Контакти" : locale === "ru" ? "Контакт" : "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
              {dict.contact_title}
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                <strong>{locale === "bg" ? "Телефон" : locale === "ru" ? "Телефон" : "Phone"}:</strong>{' '}
                <a href="tel:+359889716096" className="hover:text-[#05B2DC] transition-colors">
                  +359 88 971 6096
                </a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:complex_gradina@gmail.com" className="hover:text-[#05B2DC] transition-colors">
                  complex_gradina@gmail.com
                </a>
              </p>
              <p>
                <strong>{locale === "bg" ? "Адрес" : locale === "ru" ? "Адрес" : "Address"}:</strong> {locale === "bg" ? "Черноморец, България" : "Chernomorets, Bulgaria"}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} {dict.about_title}. {dict.rights}</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://www.facebook.com/KompleksGradina/" target="_blank" rel="noopener noreferrer" className="hover:text-[#05B2DC] transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
