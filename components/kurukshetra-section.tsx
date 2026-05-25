'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'

const highlights = [
  {
    en: { title: 'Brahma Sarovar', desc: 'Sacred tank where Lord Brahma performed yajna — one of India\'s holiest sites.' },
    hi: { title: 'ब्रह्म सरोवर', desc: 'पवित्र सरोवर जहां ब्रह्मा जी ने यज्ञ किया — भारत के सबसे पवित्र स्थलों में से एक।' },
  },
  {
    en: { title: 'Bhagavad Gita Jayanti', desc: 'Birthplace of timeless Gita wisdom — the spiritual guide of billions.' },
    hi: { title: 'भगवद गीता जयंती', desc: 'गीता के कालातीत ज्ञान की जन्मभूमि — अरबों लोगों का आध्यात्मिक मार्गदर्शक।' },
  },
  {
    en: { title: 'Mahabharata Battleground', desc: 'Historic battlefield where the greatest war reshaped the destiny of mankind.' },
    hi: { title: 'महाभारत का युद्धक्षेत्र', desc: 'ऐतिहासिक युद्धभूमि जहां महानतम युद्ध ने मानवता की नियति बदल दी।' },
  },
  {
    en: { title: 'Sthaneshwar Mahadev', desc: 'Ancient Shiva temple where the Pandavas prayed — a living link to the Puranas.' },
    hi: { title: 'स्थाणेश्वर महादेव', desc: 'प्राचीन शिव मंदिर जहां पांडवों ने युद्ध से पहले प्रार्थना की — पुराणों से जुड़ाव।' },
  },
]

export default function KurukshetraSection() {
  const { t, language } = useLanguage()

  return (
    <section id="kurukshetra" className="py-16 sm:py-20 bg-[oklch(0.13_0.04_250)] text-white relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/kurukshetra-brahma-sarovar.jpg"
        alt="Kurukshetra"
        fill
        className="object-cover opacity-20"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-[oklch(0.85_0.14_72)] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            {language === 'en' ? 'Our Heritage' : 'हमारी विरासत'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white text-balance mb-3">
            {t('kurukshetra.title')}
          </h2>
          <p className="text-[oklch(0.85_0.14_72)] font-serif text-base sm:text-lg italic px-2">
            {t('kurukshetra.subtitle')}
          </p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 items-start">
          {/* Quote + image */}
          <div className="space-y-5 sm:space-y-6">
            <blockquote className="border-l-4 border-primary pl-5 sm:pl-6">
              <p className="text-[oklch(0.9_0.03_75)] text-base sm:text-lg leading-relaxed font-serif italic">
                {language === 'en'
                  ? '"Yada yada hi dharmasya glanir bhavati Bharata... tadatmanam srijamy aham"'
                  : '"यदा यदा हि धर्मस्य ग्लानिर्भवति भारत... तदात्मानं सृजाम्यहम्"'}
              </p>
              <footer className="text-[oklch(0.75_0.14_72)] text-xs sm:text-sm mt-2">
                — {language === 'en' ? 'Bhagavad Gita, Chapter 4:7' : 'भगवद गीता, अध्याय 4:7'}
              </footer>
            </blockquote>

            <p className="text-[oklch(0.85_0.03_75)] text-sm sm:text-base leading-relaxed">
              {t('kurukshetra.desc')}
            </p>

            <div className="relative rounded-xl overflow-hidden aspect-video shadow-xl">
              <Image
                src="/images/kurukshetra-brahma-sarovar.jpg"
                alt="Brahma Sarovar, Kurukshetra"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white text-xs sm:text-sm font-serif">
                  {language === 'en' ? 'Brahma Sarovar, Kurukshetra' : 'ब्रह्म सरोवर, कुरुक्षेत्र'}
                </p>
              </div>
            </div>
          </div>

          {/* Highlights grid — 2 cols on mobile */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {highlights.map((item, i) => {
              const content = language === 'en' ? item.en : item.hi
              return (
                <div
                  key={i}
                  className="bg-[oklch(0.20_0.05_250/0.7)] border border-[oklch(0.64_0.22_40/0.3)] rounded-xl p-3 sm:p-4 hover:border-primary/60 hover:bg-[oklch(0.22_0.05_250/0.8)] transition-all"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/20 flex items-center justify-center mb-2 sm:mb-3">
                    <span className="text-primary text-sm sm:text-base font-serif font-bold">{i + 1}</span>
                  </div>
                  <h4 className="font-serif font-semibold text-[oklch(0.93_0.08_72)] mb-1.5 text-xs sm:text-sm leading-snug">
                    {content.title}
                  </h4>
                  <p className="text-[oklch(0.75_0.03_75)] text-xs leading-relaxed">
                    {content.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
