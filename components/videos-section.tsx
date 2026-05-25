'use client'

import useSWR from 'swr'
import { Play, Youtube, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface VideoItem {
  id: string
  title_en: string
  title_hi: string
  youtube_url: string
  thumbnail_url: string | null
  published_at: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export default function VideosSection() {
  const { t, language } = useLanguage()
  const { data, isLoading } = useSWR<VideoItem[]>('/api/videos?limit=4', fetcher)

  return (
    <section id="videos" className="py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3">
          <div>
            <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase tracking-widest mb-1.5">
              {language === 'en' ? 'Watch' : 'देखें'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground text-balance">
              {t('videos.title')}
            </h2>
            <div className="w-14 h-1 bg-primary rounded-full mt-3" />
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors self-start sm:self-auto"
          >
            {t('videos.all')} <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-muted" />
                <div className="p-3 sm:p-4 space-y-2">
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : !data?.length ? (
          <div className="text-center py-14 sm:py-16 text-muted-foreground">
            <Youtube className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-30" />
            <p className="font-serif text-base sm:text-lg">{t('no_content')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {data.map((video) => {
              const ytId = getYouTubeId(video.youtube_url)
              const thumb =
                video.thumbnail_url ||
                (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null)

              return (
                <div
                  key={video.id}
                  className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-border group transition-all hover:-translate-y-1 flex flex-col"
                >
                  <a
                    href={video.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-video bg-muted overflow-hidden shrink-0"
                    aria-label={language === 'en' ? video.title_en : video.title_hi}
                  >
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={language === 'en' ? video.title_en : video.title_hi}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted">
                        <Youtube className="w-8 h-8 text-muted-foreground/30" />
                      </div>
                    )}
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </a>

                  <div className="p-3 sm:p-4 flex-1">
                    <h3 className="font-serif font-semibold text-foreground text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {language === 'en' ? video.title_en : video.title_hi}
                    </h3>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
