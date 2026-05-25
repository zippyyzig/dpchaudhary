'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const galleryImages = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/654207817_26259809577013536_6955516948871892651_n.jpg-nh2aCcufqhPxZC7cIPxWCS9TkwQ4K4.jpeg',
    captionEn: 'BJP Party Event — Kurukshetra',
    captionHi: 'भाजपा पार्टी कार्यक्रम — कुरुक्षेत्र',
    category: 'party',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/641168372_26043193872008442_4607444067832944551_n.jpg-fRTSSxqrUUuzNogi2sbHnxuk0Ug8T8.jpeg',
    captionEn: 'Inaugurating Dharamshala — Abhimanpur',
    captionHi: 'धर्मशाला का उद्घाटन — अभिमानपुर',
    category: 'development',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/656918496_26321092187551941_7558458772505131089_n.jpg-2jfZE1lCJbrbqf5YaMuOY2Dib8n8yR.jpeg',
    captionEn: 'Addressing the Public',
    captionHi: 'जनसभा को संबोधित करते हुए',
    category: 'public',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/666768704_26452342877760204_102214510471351974_n.jpg-Ig5RkemRvFCIrcEx9PFvBEOjhUSY9M.jpeg',
    captionEn: 'Hoisting the BJP Flag',
    captionHi: 'भाजपा का ध्वज फहराते हुए',
    category: 'party',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/641176628_26043202952007534_6503863634057582403_n.jpg-UgXHbpBccMrO7MNTgIYa2CJDjej13B.jpeg',
    captionEn: 'Community Havan Ceremony',
    captionHi: 'सामुदायिक हवन समारोह',
    category: 'social',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/656447783_26321093164218510_2287401719152200014_n.jpg-kjJ3TIOYL4R7LVrEEz7tg5ydXWRNfm.jpeg',
    captionEn: 'Religious Puja & Cultural Event',
    captionHi: 'धार्मिक पूजा एवं सांस्कृतिक कार्यक्रम',
    category: 'social',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/660475488_26375330318794794_8611207253525008259_n.jpg-9X07VO9lnDpBH092pSWBDwWijJRLUn.jpeg',
    captionEn: 'Temple Inauguration Ceremony',
    captionHi: 'मंदिर उद्घाटन समारोह',
    category: 'development',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/656887211_26284466361214524_4201999442521962623_n.jpg-8w5npejNw95JUGSJpG60GaJ6fPRJvp.jpeg',
    captionEn: 'Navratri Mata Celebration',
    captionHi: 'नवरात्रि माता उत्सव',
    category: 'social',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/633369676_25960857676908729_5617339780610484006_n.jpg-aOWH2RFSGs4eWnejl0WkWNHqf9wwgQ.jpeg',
    captionEn: 'With Women Constituents',
    captionHi: 'महिला जनप्रतिनिधियों के साथ',
    category: 'public',
  },
]

const categories = [
  { key: 'all', en: 'All', hi: 'सभी' },
  { key: 'party', en: 'Party', hi: 'पार्टी' },
  { key: 'development', en: 'Development', hi: 'विकास' },
  { key: 'public', en: 'Public Events', hi: 'जन कार्यक्रम' },
  { key: 'social', en: 'Social', hi: 'सामाजिक' },
]

export default function GallerySection() {
  const { language } = useLanguage()
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered =
    activeFilter === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter)

  const openLightbox = (img: typeof galleryImages[0]) => {
    setLightbox(galleryImages.indexOf(img))
  }

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightbox === null) return
    setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length)
  }

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightbox === null) return
    setLightbox((lightbox + 1) % galleryImages.length)
  }

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            {language === 'en' ? 'Photo Gallery' : 'फोटो गैलरी'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground text-balance mb-4">
            {language === 'en' ? 'On the Ground — With the People' : 'जनता के बीच — हर कदम पर'}
          </h2>
          <div className="flex items-center justify-center gap-0 w-24 h-1 rounded-full overflow-hidden mx-auto mb-6 sm:mb-8">
            <div className="flex-1 h-full bg-primary" />
            <div className="flex-1 h-full bg-foreground/10" />
            <div className="flex-1 h-full bg-secondary" />
          </div>

          {/* Filter pills — horizontally scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 justify-start sm:justify-center px-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border whitespace-nowrap shrink-0 ${
                  activeFilter === cat.key
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-background text-foreground border-border hover:border-primary/50 hover:text-primary'
                }`}
              >
                {language === 'en' ? cat.en : cat.hi}
              </button>
            ))}
          </div>
        </div>

        {/* Grid — 2 cols on mobile, 3 on md+ */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {filtered.map((img, i) => (
            <button
              key={img.src}
              onClick={() => openLightbox(img)}
              className={`relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-[1.02] group focus:outline-none focus:ring-2 focus:ring-primary ${
                i === 0 ? 'col-span-2 sm:col-span-2 md:col-span-2 aspect-video' : 'aspect-square sm:aspect-video'
              }`}
              aria-label={language === 'en' ? img.captionEn : img.captionHi}
            >
              <Image
                src={img.src}
                alt={language === 'en' ? img.captionEn : img.captionHi}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
              />
              {/* Caption overlay — always visible on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3">
                <p className="text-white text-xs sm:text-sm font-medium leading-tight text-left">
                  {language === 'en' ? img.captionEn : img.captionHi}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-primary transition-colors z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image container */}
          <div
            className="relative w-full max-w-3xl max-h-[80vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightbox].src}
              alt={language === 'en' ? galleryImages[lightbox].captionEn : galleryImages[lightbox].captionHi}
              width={1200}
              height={800}
              className="object-contain w-full max-h-[70vh]"
            />
            <div className="bg-[oklch(0.15_0.04_250)] px-4 py-3">
              <p className="text-white font-serif text-sm leading-relaxed">
                {language === 'en'
                  ? galleryImages[lightbox].captionEn
                  : galleryImages[lightbox].captionHi}
              </p>
              <p className="text-white/40 text-xs mt-1">
                {lightbox + 1} / {galleryImages.length}
              </p>
            </div>
          </div>

          {/* Prev/Next — larger tap area on mobile */}
          <button
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center transition-all"
            onClick={goPrev}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center transition-all"
            onClick={goNext}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}
    </section>
  )
}
