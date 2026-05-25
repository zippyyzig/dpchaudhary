'use client'

import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export default function HeroSection() {
  const { t, language } = useLanguage()

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <Image
        src="/images/kurukshetra-hero.jpg"
        alt="Kurukshetra landscape"
        fill
        className="object-cover"
        priority
      />

      {/* BJP overlay */}
      <div className="absolute inset-0 saffron-gradient" />

      {/* BJP tri-color top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bjp-stripe" />

      {/* Lotus pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 sm:pt-32 sm:pb-24">
        {/* Mobile: portrait on top, text below. Desktop: side by side */}
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Text Content */}
          <div className="text-white space-y-5 text-center md:text-left">
            {/* BJP badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-3.5 py-1.5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[oklch(0.78_0.14_72)] shrink-0" />
              <span className="text-white/90 font-serif text-xs sm:text-sm font-medium">
                {language === 'en'
                  ? 'BJP — Bharatiya Janata Party, Kurukshetra'
                  : 'भाजपा — भारतीय जनता पार्टी, कुरुक्षेत्र'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight text-balance">
              {language === 'en' ? 'DP Chaudhary' : 'डीपी चौधरी'}
            </h1>

            <p className="text-lg sm:text-xl font-serif text-white/90 leading-relaxed text-balance">
              {t('hero.tagline')}
            </p>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-md mx-auto md:mx-0">
              {t('hero.subtitle')}
            </p>

            {/* BJP tri-color divider */}
            <div className="flex items-center gap-0 w-36 h-1 rounded-full overflow-hidden mx-auto md:mx-0">
              <div className="flex-1 h-full bg-[oklch(0.64_0.22_40)]" />
              <div className="flex-1 h-full bg-white/80" />
              <div className="flex-1 h-full bg-[oklch(0.52_0.17_145)]" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1 justify-center md:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[oklch(0.64_0.22_40)] hover:bg-[oklch(0.58_0.22_40)] text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-lg text-sm sm:text-base"
              >
                {t('hero.cta_connect')}
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-full transition-all text-sm sm:text-base"
              >
                {t('hero.cta_vision')}
              </a>
            </div>

            <p className="text-[oklch(0.88_0.14_72)] font-serif text-sm italic">
              {language === 'en' ? '"Sabka Saath, Sabka Vikas"' : '"सबका साथ, सबका विकास"'}
            </p>
          </div>

          {/* Portrait */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow rings */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-full border-2 border-[oklch(0.64_0.22_40/0.5)] animate-pulse" />
              <div className="absolute -inset-6 sm:-inset-8 rounded-full border border-[oklch(0.64_0.22_40/0.2)]" />

              <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-[oklch(0.64_0.22_40)] shadow-2xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/131472165_3691842500903565_7111204223340451811_n-rD0sQeZEyCQiNsDniiTfLH5BUdqnVk.jpg"
                  alt="DP Chaudhary — BJP Leader, Kurukshetra"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Name badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[oklch(0.15_0.04_250)] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap border border-[oklch(0.64_0.22_40)/0.6]">
                {language === 'en' ? 'Kurukshetra, Haryana' : 'कुरुक्षेत्र, हरियाणा'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8" />
      </a>
    </section>
  )
}
