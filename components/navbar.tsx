"use client";

import { Menu, Phone, X, Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";

interface NavbarProps {
  locale: string;
  dict: {
    home: string;
    accommodation: string;
    gallery: string;
    prices: string;
    contact: string;
  };
}

const languages = [
  { code: "bg", label: "BG" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

export default function Navbar({ locale, dict }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: dict.home, href: `/${locale}#hero` },
    { label: dict.accommodation, href: `/${locale}/rooms` },
    { label: dict.gallery, href: `/${locale}#gallery` },
    { label: dict.prices, href: `/${locale}/prices` },
    { label: dict.contact, href: `/${locale}#contact` },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLanguagePath = (code: string) => {
    const segments = pathname.split("/");
    segments[1] = code;
    return segments.join("/") || "/";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#213764] shadow-lg" : "bg-[#213764]/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex flex-col leading-tight group">
            <span
              className="text-white text-xl md:text-2xl font-semibold tracking-wide group-hover:text-[#05B2DC] transition-colors duration-200"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              комплекс "Градина", Черноморец
            </span>
            <span className="text-[#05B2DC] text-xs tracking-[0.2em] uppercase">
              {locale === "ru" ? "Семейный отель" : locale === "en" ? "Family Hotel" : "Семеен хотел"}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-[#05B2DC] text-sm tracking-wide transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center gap-2 border-l border-white/20 pl-4 ml-2">
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  href={getLanguagePath(lang.code)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    locale === lang.code
                      ? "bg-[#05B2DC] text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {lang.label}
                </Link>
              ))}
            </div>

            <a
              href="tel:+359888000000"
              className="flex items-center gap-2 bg-[#F4A261] hover:bg-[#e8945a] text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:shadow-lg"
            >
              <Phone className="w-4 h-4" />
              {locale === "bg" ? "Обади се" : locale === "ru" ? "Позвонить" : "Call us"}
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Затвори меню" : "Отвори меню"}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#213764] border-t border-white/10 px-4 pt-4 pb-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white/80 hover:text-[#05B2DC] text-base py-2 border-b border-white/10 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-4 py-2">
            <Globe className="w-4 h-4 text-[#05B2DC]" />
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={getLanguagePath(lang.code)}
                className={`text-sm px-3 py-1 rounded ${
                  locale === lang.code
                    ? "bg-[#05B2DC] text-white"
                    : "text-white/60"
                }`}
                onClick={() => setOpen(false)}
              >
                {lang.label}
              </Link>
            ))}
          </div>

          <a
            href="tel:+359888000000"
            className="flex items-center justify-center gap-2 bg-[#F4A261] text-white text-sm font-semibold px-4 py-3 rounded-full mt-2"
          >
            <Phone className="w-4 h-4" />
            {locale === "bg" ? "Обади се" : locale === "ru" ? "Позвонить" : "Call us"}
          </a>
        </div>
      )}
    </header>
  );
}
