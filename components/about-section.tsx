'use client'

import Image from 'next/image'
import { Zap, Tractor, Users, Building2, BookOpen } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const priorities = [
  {
    icon: Zap,
    en: { title: 'Youth Empowerment & Employment', desc: 'Education, skill development, entrepreneurship, innovation, and digital literacy — preparing youth to lead a capable future.' },
    hi: { title: 'युवा सशक्तिकरण और रोजगार', desc: 'शिक्षा, कौशल विकास, उद्यमिता, नवाचार और डिजिटल साक्षरता — युवाओं को सक्षम भविष्य के लिए तैयार करना।' },
  },
  {
    icon: Tractor,
    en: { title: 'Farmers & Rural Progress', desc: 'Supporting farmers, enhancing village infrastructure, and improving rural livelihoods — a strong India starts from its villages.' },
    hi: { title: 'किसान और ग्रामीण प्रगति', desc: 'किसानों का समर्थन, गांव के बुनियादी ढांचे को मजबूत करना — मजबूत भारत की नींव गांवों से।' },
  },
  {
    icon: Users,
    en: { title: 'Women-Led Growth', desc: 'Promoting safety, respect, equal opportunities, and leadership participation for women across all sectors.' },
    hi: { title: 'महिला नेतृत्व में विकास', desc: 'महिलाओं की सुरक्षा, सम्मान, समान अवसर और नेतृत्व भागीदारी को बढ़ावा देना।' },
  },
  {
    icon: Building2,
    en: { title: 'Infrastructure & Modern Development', desc: 'Better roads, smart connectivity, clean environments, digital access, and modern civic facilities throughout Kurukshetra.' },
    hi: { title: 'बुनियादी ढांचा और आधुनिक विकास', desc: 'बेहतर सड़कें, स्मार्ट कनेक्टिविटी, स्वच्छ पर्यावरण, डिजिटल पहुंच और आधुनिक नागरिक सुविधाएं।' },
  },
  {
    icon: BookOpen,
    en: { title: 'Cultural Heritage & National Values', desc: "Preserving Kurukshetra's spiritual and historical identity while advancing modern development and national pride." },
    hi: { title: 'सांस्कृतिक विरासत और राष्ट्रीय मूल्य', desc: 'आधुनिक विकास के साथ-साथ कुरुक्षेत्र की आध्यात्मिक और ऐतिहासिक पहचान को संरक्षित करना।' },
  },
]

export default function AboutSection() {
  const { t, language } = useLanguage()

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

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
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

            {/* Inspired by quote */}
            <blockquote className="border-l-4 border-primary pl-4 py-1">
              <p className="text-sm text-foreground font-serif italic leading-relaxed">
                {language === 'en'
                  ? '"Sabka Saath, Sabka Vikas, Sabka Vishwas" — inspired by the goal of a developed and self-reliant India.'
                  : '"सबका साथ, सबका विकास, सबका विश्वास" — विकसित और आत्मनिर्भर भारत के लक्ष्य से प्रेरित।'}
              </p>
            </blockquote>

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
          </div>
        </div>

        {/* Our Vision — Priorities */}
        <div className="mt-14 sm:mt-20">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
              {language === 'en' ? 'Our Vision' : 'हमारी दृष्टि'}
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground text-balance mb-2">
              {language === 'en' ? 'Priorities for Development' : 'विकास की प्राथमिकताएं'}
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              {language === 'en'
                ? 'Ensuring that development reaches every village, every family, and every aspiring youth — with progress that benefits all sections of society.'
                : 'यह सुनिश्चित करना कि विकास हर गांव, हर परिवार और हर महत्वाकांक्षी युवा तक पहुंचे।'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {priorities.map(({ icon: Icon, en, hi }, i) => {
              const content = language === 'en' ? en : hi
              return (
                <div
                  key={i}
                  className="bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-serif font-semibold text-foreground text-sm leading-snug">{content.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{content.desc}</p>
                </div>
              )
            })}

            {/* Quote card */}
            <div className="bg-[oklch(0.13_0.04_250)] rounded-2xl p-5 text-white sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
              <p className="font-serif italic text-sm leading-relaxed text-white/90">
                {language === 'en'
                  ? '"Service is our resolve, development is our goal, and the trust of the people is our greatest strength."'
                  : '"सेवा हमारा संकल्प है, विकास हमारा लक्ष्य है, और जनता का विश्वास हमारी सबसे बड़ी शक्ति है।"'}
              </p>
              <p className="text-[oklch(0.78_0.14_72)] text-xs mt-4 font-medium">— DP Chaudhary</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
