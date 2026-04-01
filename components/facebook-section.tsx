'use client'

import React, { useEffect, useRef } from 'react';
import { Facebook, ExternalLink, Share2, MessageCircle } from 'lucide-react';

interface FacebookSectionProps {
  dict: {
    title: string;
    heading: string;
    accent: string;
    subheading: string;
  };
  locale: string;
}

export default function FacebookSection({ dict, locale }: FacebookSectionProps) {
  const fbContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Facebook SDK locale mapping
    const fbLocale = locale === 'bg' ? 'bg_BG' : locale === 'ru' ? 'ru_RU' : 'en_US';

    // Remove existing script if any (to handle navigation/hot-reload)
    const existingScript = document.getElementById('facebook-jssdk');
    if (existingScript) {
      existingScript.remove();
    }

    // Load Facebook SDK
    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = `https://connect.facebook.net/${fbLocale}/sdk.js#xfbml=1&version=v18.0`;
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    // Re-parse XFBML when component mounts or internal state changes
    script.onload = () => {
      if ((window as any).FB) {
        (window as any).FB.XFBML.parse();
      }
    };

    return () => {
      // Cleanup script if needed
    };
  }, [locale]);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-[#05B2DC]/5 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#213764]/5 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Descriptive Content */}
          <div className="flex flex-col">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#05B2DC]/10 text-[#05B2DC] text-xs font-bold tracking-widest uppercase mb-6">
                <Facebook className="w-3 h-3 fill-current" />
                {dict.title}
              </div>
              <h2
                className="text-5xl md:text-7xl font-light text-[#213764] leading-[1.1] mb-8"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                {dict.heading} <br />
                <span className="italic text-[#05B2DC] font-normal">{dict.accent}</span>
              </h2>
              <div className="w-20 h-1.5 bg-[#05B2DC] mb-10 rounded-full" />
              <p className="text-[#213764]/70 max-w-lg text-xl leading-relaxed font-light">
                {dict.subheading}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center text-[#05B2DC]">
                    <Share2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#213764]">
                    {locale === 'bg' ? 'Актуални новини' : locale === 'ru' ? 'Актуальные новости' : 'Live Updates'}
                </h4>
                <p className="text-sm text-[#213764]/60 leading-relaxed">
                    {locale === 'bg' ? 'Следете нашите ежедневни събития и оферти.' : locale === 'ru' ? 'Следите за нашими событиями и предложениями.' : 'Track our daily events and special seasonal offers.'}
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center text-[#05B2DC]">
                    <MessageCircle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#213764]">
                    {locale === 'bg' ? 'Бърза връзка' : locale === 'ru' ? 'Быстрая связь' : 'Instant Contact'}
                </h4>
                <p className="text-sm text-[#213764]/60 leading-relaxed">
                    {locale === 'bg' ? 'Пишете ни директно чрез Messenger.' : locale === 'ru' ? 'Пишите нам напрямую через Messenger.' : 'Message us directly via Facebook Messenger.'}
                </p>
              </div>
            </div>

            <div>
              <a 
                href="https://www.facebook.com/KompleksGradina/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 bg-[#213764] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#05B2DC] transition-all duration-300 shadow-xl hover:shadow-[#05B2DC]/30 hover:-translate-y-1"
              >
                <Facebook className="w-6 h-6 fill-current" />
                {locale === 'bg' ? 'Вижте ни във Facebook' : locale === 'ru' ? 'Наш Facebook' : 'Follow us on Facebook'}
                <ExternalLink className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </div>

          {/* Right Column: Large Widget */}
          <div className="relative lg:justify-self-end">
            {/* Glow effect behind the widget */}
            <div className="absolute -inset-10 bg-[#05B2DC]/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#05B2DC] to-[#213764] rounded-[2.2rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                <div className="relative bg-white p-3 rounded-[2.2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
                    <div 
                        ref={fbContainerRef}
                        className="fb-page w-full min-w-[320px] sm:min-w-[400px] md:min-w-[500px] rounded-2xl overflow-hidden"
                        data-href="https://www.facebook.com/KompleksGradina/"
                        data-tabs="timeline"
                        data-width="500"
                        data-height="800"
                        data-small-header="false"
                        data-adapt-container-width="true"
                        data-hide-cover="false"
                        data-show-facepile="true"
                    >
                        <blockquote cite="https://www.facebook.com/KompleksGradina/" className="fb-xfbml-parse-ignore">
                            <a href="https://www.facebook.com/KompleksGradina/">Комплекс Градина</a>
                        </blockquote>
                    </div>
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute -bottom-8 -right-8 bg-[#213764] text-white px-8 py-6 rounded-[2rem] shadow-2xl hidden md:flex flex-col gap-1 items-center justify-center border-4 border-white">
                    <Facebook className="w-8 h-8 fill-current mb-2" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Verified Page</p>
                    <p className="font-bold text-lg">Complex Gradina</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
