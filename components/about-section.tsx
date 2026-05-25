'use client'

import Image from 'next/image'
import { Award, Users, MapPin, Zap } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export default function AboutSection() {
  const { t, language } = useLanguage()

  const stats = [
    { icon: Award, value: '15+', label: t('about.years_service') },
    { icon: Zap, value: '200+', label: t('about.projects') },
    { icon: MapPin, value: '120+', label: t('about.villages') },
    { icon: Users, value: '50K+', label: t('about.youth') },
  ]

  return (
    <section id="about" className="py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            {language === 'en' ? 'About' : 'परिचय'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground text-balance mb-4">
            {t('about.title')}
          </h2>
          <div className="flex items-center justify-center gap-0 w-24 h-1 rounded-full overflow-hidden mx-auto">
            <div className="flex-1 h-full bg-primary" />
            <div className="flex-1 h-full bg-foreground/10" />
            <div className="flex-1 h-full bg-secondary" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Image */}
          <div className="relative mx-auto w-full max-w-sm md:max-w-none">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/666768704_26452342877760204_102214510471351974_n.jpg-Ig5RkemRvFCIrcEx9PFvBEOjhUSY9M.jpeg"
                alt="D.P. Chaudhary holding BJP flag — Kurukshetra"
                fill
                className="object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[oklch(0.15_0.04_250)] to-transparent p-5 sm:p-6">
                <p className="text-white font-serif text-lg sm:text-xl font-bold">
                  {language === 'en' ? 'D.P. Chaudhary' : 'डी.पी. चौधरी'}
                </p>
                <p className="text-[oklch(0.85_0.18_52)] text-xs sm:text-sm font-medium mt-0.5">
                  {language === 'en'
                    ? 'BJP District President, Kurukshetra'
                    : 'भाजपा जिलाध्यक्ष, कुरुक्षेत्र'}
                </p>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-primary/15 rounded-2xl -z-10 border-2 border-primary/20 hidden sm:block" />
            <div className="absolute -top-3 -left-3 w-20 h-20 bg-secondary/15 rounded-xl -z-10 border-2 border-secondary/20 hidden sm:block" />
          </div>

          {/* Content */}
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground">
              {t('about.subtitle')}
            </h3>

            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-primary" />
              <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <div className="w-20 h-0.5 bg-primary/30" />
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t('about.description1')}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t('about.description2')}
            </p>

            {/* BJP party badge */}
            <div className="flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs shrink-0">
                BJP
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {language === 'en' ? 'Bharatiya Janata Party' : 'भारतीय जनता पार्टी'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {language === 'en'
                    ? 'Senior District President — Kurukshetra'
                    : 'वरिष्ठ जिला अध्यक्ष — कुरुक्षेत्र'}
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="bg-muted rounded-xl p-3 sm:p-4 flex items-center gap-3 border border-border hover:border-primary/40 transition-colors"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg sm:text-xl font-serif font-bold text-foreground leading-tight">{value}</p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5 line-clamp-2">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
