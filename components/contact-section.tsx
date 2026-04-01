import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react'

interface ContactSectionProps {
  dict: {
    title: string;
    heading: string;
    accent: string;
    subheading: string;
    phone: string;
    email: string;
    address: string;
    cta: string;
  };
}

export default function ContactSection({ dict }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F9DFFF]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#05B2DC] text-sm tracking-[0.3em] uppercase font-medium mb-3">
            {dict.title}
          </p>
          <h2
            className="text-4xl md:text-5xl font-light text-[#213764] text-balance"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {dict.heading} <span className="italic text-[#05B2DC]">{dict.accent}</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base leading-relaxed">
            {dict.subheading}
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F4A261]/10 flex items-center justify-center">
              <Phone className="w-7 h-7 text-[#F4A261]" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold text-[#213764] mb-1"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                {dict.phone}
              </h3>
              <a
                href="tel:+359889716096"
                className="text-[#213764] font-bold text-lg hover:text-[#05B2DC] transition-colors"
              >
                +359 88 971 6096
              </a>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#05B2DC]/10 flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-[#05B2DC]" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold text-[#213764] mb-1"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Messenger
              </h3>
              <a
                href="https://m.me/KompleksGradina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#05B2DC] font-semibold text-sm hover:underline transition-colors"
              >
                @KompleksGradina
              </a>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold text-[#213764] mb-1"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                {dict.email}
              </h3>
              <a
                href="mailto:complex_gradina@gmail.com"
                className="text-[#213764] font-semibold text-sm hover:text-[#05B2DC] transition-colors overflow-hidden text-ellipsis"
              >
                complex_gradina@gmail.com
              </a>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#213764]/10 flex items-center justify-center">
              <MapPin className="w-7 h-7 text-[#213764]" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold text-[#213764] mb-1"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                {dict.address}
              </h3>
              <p className="text-muted-foreground text-sm">
                ул. Черноморска 12<br />
                Черноморец 8142, България
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative bg-[#213764] rounded-3xl px-8 py-12 md:py-16 text-center overflow-hidden">
          {/* Decorative waves */}
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <path d="M0,100 C200,150 400,50 600,100 C700,125 750,75 800,100 L800,200 L0,200 Z" fill="#05B2DC" />
              <path d="M0,120 C150,80 350,160 550,120 C650,100 750,140 800,120 L800,200 L0,200 Z" fill="#05B2DC" opacity="0.5" />
            </svg>
          </div>

          <div className="relative z-10">
            <h3
              className="text-3xl md:text-4xl font-light text-white mb-4 text-balance"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              {dict.heading} {dict.accent}
            </h3>
            <p className="text-white/70 mb-8 max-w-md mx-auto text-base leading-relaxed">
              {dict.subheading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+359889716096"
                className="flex items-center justify-center gap-3 bg-[#F4A261] hover:bg-[#e8945a] text-white font-semibold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                +359 88 971 6096
              </a>
              <a
                href="https://m.me/KompleksGradina"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border-2 border-white/40 hover:bg-white/10 text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                Messenger
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
