"use client";

interface QuoteSectionProps {
  dict: {
    text: string;
    author: string;
  };
}

export default function QuoteSection({ dict }: QuoteSectionProps) {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#05B2DC]/40 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-10 text-[#05B2DC]/20 select-none">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 32 32">
            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H7c0-1.7 1.3-3 3-3V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-7c0-1.7 1.3-3 3-3V8z" />
          </svg>
        </div>
        
        <blockquote className="relative">
          <p 
            className="text-3xl md:text-4xl lg:text-5xl text-[#213764] font-light italic leading-tight text-balance mb-10"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {dict.text}
          </p>
          <footer className="flex flex-col items-center gap-4">
            <div className="w-12 h-px bg-[#213764]/20" />
            <cite className="text-[#05B2DC] text-sm tracking-[0.3em] uppercase font-bold not-italic">
              {dict.author}
            </cite>
          </footer>
        </blockquote>
      </div>
      
      {/* Subtle decorative element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-[#05B2DC]/40 to-transparent" />
    </section>
  );
}
