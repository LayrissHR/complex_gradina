import { MapPin, Navigation } from "lucide-react";

interface LocationSectionProps {
  dict: {
    title: string;
    heading: string;
    accent: string;
    address_label: string;
    distances_label: string;
    beach: string;
    center: string;
    sozopol: string;
    airport: string;
    cta: string;
  };
}

export default function LocationSection({ dict }: LocationSectionProps) {
  return (
    <section id="location" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#05B2DC] text-sm tracking-[0.3em] uppercase font-medium mb-3">
            {dict.title}
          </p>
          <h2
            className="text-4xl md:text-5xl font-light text-[#213764] text-balance"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {dict.heading} <span className="italic text-[#05B2DC]">{dict.accent}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Info cards */}
          <div className="flex flex-col gap-5">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#05B2DC]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#05B2DC]" />
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold text-[#213764] mb-1"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                    }}
                  >
                    {dict.address_label}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    ул. "9-ти Септември" 99
                    <br />
                    Черноморец 8142
                    <br />
                    България
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4A261]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Navigation className="w-5 h-5 text-[#F4A261]" />
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold text-[#213764] mb-2"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                    }}
                  >
                    {dict.distances_label}
                  </h3>
                  <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <li className="flex items-center justify-between">
                      <span>{dict.beach}</span>
                      <span className="font-semibold text-[#213764]">100 м</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>{dict.center}</span>
                      <span className="font-semibold text-[#213764]">
                        400 м
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>{dict.sozopol}</span>
                      <span className="font-semibold text-[#213764]">8 км</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>{dict.airport}</span>
                      <span className="font-semibold text-[#213764]">
                        36 км
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/g6f9CLt4iChHZaWg8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#213764] hover:bg-[#05B2DC] text-white text-sm font-semibold py-3.5 rounded-xl transition-all duration-200"
            >
              {dict.cta}
            </a>
          </div>

          {/* Map embed */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg border border-border h-80 md:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.7926383165745!2d27.640004688157486!3d42.42013889689626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a6c79d9c327c87%3A0x163a3e50f65802d4!2zS9C-0LzQv9C70LXQutGBICLQk9GA0LDQtNC40L3QsCIgLSDQp9C10YDQvdC-0LzQvtGA0LXRhg!5e1!3m2!1sbg!2sbg!4v1774947328740!5m2!1sbg!2sbg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={dict.title}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
