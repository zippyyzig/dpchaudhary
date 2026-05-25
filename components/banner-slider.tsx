'use client'

import useSWR from 'swr'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface Banner {
  id: string
  title_en: string
  title_hi: string
  subtitle_en: string | null
  subtitle_hi: string | null
  image_url: string
  link: string | null
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function BannerSlider() {
  const { language } = useLanguage()
  const { data: banners } = useSWR<Banner[]>('/api/banners', fetcher)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!banners?.length) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [banners])

  if (!banners?.length) return null

  const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length)
  const next = () => setCurrent((c) => (c + 1) % banners.length)
  const banner = banners[current]

  return (
    <section className="relative w-full aspect-[16/7] sm:aspect-[21/7] md:aspect-[21/6] overflow-hidden bg-[oklch(0.18_0.04_50)]">
      {banners.map((b, idx) => (
        <div
          key={b.id}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <Image
            src={b.image_url}
            alt={language === 'en' ? b.title_en : b.title_hi}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center px-5 sm:px-10 md:px-16">
        <div className="max-w-xs sm:max-w-sm md:max-w-lg text-white space-y-2 sm:space-y-3">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-balance leading-tight drop-shadow">
            {language === 'en' ? banner.title_en : banner.title_hi}
          </h3>
          {(language === 'en' ? banner.subtitle_en : banner.subtitle_hi) && (
            <p className="text-white/80 text-xs sm:text-sm md:text-base drop-shadow leading-relaxed">
              {language === 'en' ? banner.subtitle_en : banner.subtitle_hi}
            </p>
          )}
          {banner.link && (
            <a
              href={banner.link}
              className="inline-block bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all mt-1"
            >
              {language === 'en' ? 'Learn More' : 'अधिक जानें'}
            </a>
          )}
        </div>
      </div>

      {/* Nav arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-primary text-white flex items-center justify-center transition-all"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-primary text-white flex items-center justify-center transition-all"
            aria-label="Next banner"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === current ? 'w-5 sm:w-6 bg-primary' : 'w-1.5 bg-white/50'}`}
                aria-label={`Go to banner ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
