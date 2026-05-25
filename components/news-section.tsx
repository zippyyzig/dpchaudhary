'use client'

import useSWR from 'swr'
import Image from 'next/image'
import { Calendar, ArrowRight, Newspaper } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface NewsItem {
  id: string
  title_en: string
  title_hi: string
  content_en: string
  content_hi: string
  image_url: string | null
  source: string | null
  published_at: string
  slug: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function NewsSection() {
  const { t, language } = useLanguage()
  const { data, isLoading } = useSWR<NewsItem[]>('/api/news?limit=3', fetcher)

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  return (
    <section id="news" className="py-16 sm:py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3">
          <div>
            <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase tracking-widest mb-1.5">
              {language === 'en' ? 'Latest' : 'ताज़ा'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground text-balance">
              {t('news.title')}
            </h2>
            <div className="w-14 h-1 bg-primary rounded-full mt-3" />
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors self-start sm:self-auto"
          >
            {t('news.all')} <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden shadow animate-pulse">
                <div className="h-44 sm:h-48 bg-muted" />
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="h-3 bg-muted rounded w-1/3" />
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : !data?.length ? (
          <div className="text-center py-14 sm:py-16 text-muted-foreground">
            <Newspaper className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-30" />
            <p className="font-serif text-base sm:text-lg">{t('no_content')}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {data.map((item) => (
              <article
                key={item.id}
                className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-border group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-44 sm:h-48 bg-secondary overflow-hidden shrink-0">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={language === 'en' ? item.title_en : item.title_hi}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <Newspaper className="w-10 h-10 text-muted-foreground/30" />
                    </div>
                  )}
                  {item.source && (
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
                      {item.source}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-2.5 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 shrink-0" />
                    {formatDate(item.published_at)}
                  </div>

                  <h3 className="font-serif font-semibold text-foreground text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {language === 'en' ? item.title_en : item.title_hi}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {language === 'en' ? item.content_en : item.content_hi}
                  </p>

                  <a
                    href={`/news/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold mt-auto pt-1 hover:gap-2.5 transition-all"
                  >
                    {t('news.readmore')} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
