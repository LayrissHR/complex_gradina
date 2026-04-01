import { Waves, Coffee, Eye, Car, Sun, ShieldCheck } from 'lucide-react'

const ICON_MAP = [Waves, Coffee, Eye, Car, Sun, ShieldCheck];

interface AmenitiesSectionProps {
  dict: {
    title: string;
    heading: string;
    accent: string;
    items: { title: string; desc: string }[];
  };
}

export default function AmenitiesSection({ dict }: AmenitiesSectionProps) {
  return (
    <section id="amenities" className="py-20 md:py-28 bg-[#F9DFFF]/30 relative">
      {/* Wave top */}
      <div className="wave-divider absolute -top-1 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-14"
        >
          <path
            d="M0,40 C360,0 720,80 1080,40 C1260,20 1360,60 1440,40 L1440,0 L0,0 Z"
            fill="#FAFAFB"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#05B2DC] text-sm tracking-[0.3em] uppercase font-medium mb-3">
            {dict.title}
          </p>
          <h2
            className="text-4xl md:text-5xl font-light text-[#213764] text-balance"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {dict.heading}{' '}
            <span className="italic text-[#05B2DC]">{dict.accent}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {dict.items.map((item, index) => {
            const Icon = ICON_MAP[index] || ShieldCheck;
            return (
              <div
                key={item.title}
                className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md border border-border transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#05B2DC]/10 group-hover:bg-[#05B2DC]/20 flex items-center justify-center transition-colors duration-200">
                  <Icon className="w-6 h-6 text-[#05B2DC]" />
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold text-[#213764] mb-1"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
