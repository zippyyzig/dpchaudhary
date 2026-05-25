'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface Slide {
  image: string
  titleEn: string
  titleHi: string
  wordsEn: string[]
  wordsHi: string[]
  fullTextEn: string
  fullTextHi: string
}

const slides: Slide[] = [
  {
    image: '/images/story-slide-1.jpg',
    titleEn: 'The Sacred Land',
    titleHi: 'पवित्र भूमि',
    wordsEn: ['Kurukshetra', '—', 'where', 'dharma', 'was', 'spoken', 'and', 'history', 'was', 'written.'],
    wordsHi: ['कुरुक्षेत्र', '—', 'जहाँ', 'धर्म', 'की', 'वाणी', 'गूँजी', 'और', 'इतिहास', 'लिखा', 'गया।'],
    fullTextEn: 'Kurukshetra — where dharma was spoken and history was written. This is the sacred land where Lord Krishna delivered the Bhagavad Gita to Arjuna, shaping the destiny of civilization.',
    fullTextHi: 'कुरुक्षेत्र — जहाँ धर्म की वाणी गूँजी और इतिहास लिखा गया। यह वह पवित्र भूमि है जहाँ भगवान श्रीकृष्ण ने अर्जुन को भगवद गीता का उपदेश दिया था।',
  },
  {
    image: '/images/story-slide-2.jpg',
    titleEn: 'Grounded Leadership',
    titleHi: 'जमीनी नेतृत्व',
    wordsEn: ['DP', 'Chaudhary', '—', 'committed', 'to', 'every', 'village,', 'every', 'family,', 'every', 'dream.'],
    wordsHi: ['डीपी', 'चौधरी', '—', 'हर', 'गाँव,', 'हर', 'परिवार,', 'हर', 'सपने', 'के', 'लिए', 'समर्पित।'],
    fullTextEn: 'DP Chaudhary — committed to every village, every family, every dream. His mission is people-centric leadership rooted in service, trust, and inclusive development for Kurukshetra and Haryana.',
    fullTextHi: 'डीपी चौधरी — हर गाँव, हर परिवार, हर सपने के लिए समर्पित। उनका मिशन जनकेंद्रित नेतृत्व है जो सेवा, विश्वास और समावेशी विकास में निहित है।',
  },
  {
    image: '/images/story-slide-3.jpg',
    titleEn: 'Empowering Youth',
    titleHi: 'युवाओं का सशक्तिकरण',
    wordsEn: ['Education.', 'Skills.', 'Innovation.', 'The', 'future', 'belongs', 'to', 'an', 'empowered', 'youth.'],
    wordsHi: ['शिक्षा।', 'कौशल।', 'नवाचार।', 'सशक्त', 'युवाओं', 'का', 'भविष्य', 'उज्ज्वल', 'होगा।'],
    fullTextEn: 'Education. Skills. Innovation. The future belongs to an empowered youth. Creating opportunities through skill development, entrepreneurship, and digital literacy — preparing the youth to lead a strong and capable future.',
    fullTextHi: 'शिक्षा। कौशल। नवाचार। सशक्त युवाओं का भविष्य उज्ज्वल होगा। कौशल विकास, उद्यमिता और डिजिटल साक्षरता के माध्यम से युवाओं को सक्षम भविष्य के लिए तैयार करना।',
  },
  {
    image: '/images/story-slide-4.jpg',
    titleEn: 'Strength in Unity',
    titleHi: 'एकता में शक्ति',
    wordsEn: ['Women-led', 'growth.', 'Farmer', 'welfare.', 'Rural', 'progress.', 'Together', 'we', 'rise.'],
    wordsHi: ['महिला', 'नेतृत्व।', 'किसान', 'कल्याण।', 'ग्रामीण', 'प्रगति।', 'मिलकर', 'आगे', 'बढ़ेंगे।'],
    fullTextEn: 'Women-led growth. Farmer welfare. Rural progress. Together we rise. Supporting farmers, promoting women leadership, and improving rural livelihoods — because a strong India starts from its villages.',
    fullTextHi: 'महिला नेतृत्व। किसान कल्याण। ग्रामीण प्रगति। मिलकर आगे बढ़ेंगे। किसानों का समर्थन, महिला नेतृत्व को बढ़ावा और ग्रामीण आजीविका में सुधार — क्योंकि मजबूत भारत की नींव गाँवों से है।',
  },
  {
    image: '/images/story-slide-5.jpg',
    titleEn: 'Our Resolve',
    titleHi: 'हमारा संकल्प',
    wordsEn: ['Service', 'is', 'our', 'resolve.', 'Development', 'is', 'our', 'goal.', 'Your', 'trust', '—', 'our', 'strength.'],
    wordsHi: ['सेवा', 'हमारा', 'संकल्प', 'है।', 'विकास', 'हमारा', 'लक्ष्य', 'है।', 'जनता', 'का', 'विश्वास', '—', 'हमारी', 'शक्ति।'],
    fullTextEn: 'Service is our resolve. Development is our goal. Your trust — our strength. Envisioning a self-reliant, opportunity-driven Kurukshetra where progress, culture, and public welfare advance together.',
    fullTextHi: 'सेवा हमारा संकल्प है। विकास हमारा लक्ष्य है। जनता का विश्वास — हमारी शक्ति। एक आत्मनिर्भर, अवसर-समृद्ध कुरुक्षेत्र की कल्पना जहाँ प्रगति, संस्कृति और जन कल्याण एक साथ आगे बढ़ें।',
  },
]

interface Props {
  onClose: () => void
}

export default function StorySlideshow({ onClose }: Props) {
  const { language } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [visibleWords, setVisibleWords] = useState<number>(0)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const wordTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const slide = slides[current]
  const words = language === 'en' ? slide.wordsEn : slide.wordsHi
  const fullText = language === 'en' ? slide.fullTextEn : slide.fullTextHi

  const stopAll = useCallback(() => {
    if (wordTimerRef.current) clearInterval(wordTimerRef.current)
    if (progressTimerRef.current) clearInterval(progressTimerRef.current)
    window.speechSynthesis?.cancel()
    utteranceRef.current = null
  }, [])

  const startSlide = useCallback(
    (slideIndex: number) => {
      stopAll()
      setVisibleWords(0)
      setProgress(0)
      setIsAnimating(true)

      const targetSlide = slides[slideIndex]
      const targetWords = language === 'en' ? targetSlide.wordsEn : targetSlide.wordsHi
      const targetText = language === 'en' ? targetSlide.fullTextEn : targetSlide.fullTextHi

      // Word-by-word reveal — each word appears every 350ms
      let wordIndex = 0
      wordTimerRef.current = setInterval(() => {
        wordIndex += 1
        setVisibleWords(wordIndex)
        if (wordIndex >= targetWords.length) {
          if (wordTimerRef.current) clearInterval(wordTimerRef.current)
        }
      }, 350)

      // Progress bar over ~10 seconds per slide
      const totalMs = 10000
      const tickMs = 50
      let elapsed = 0
      progressTimerRef.current = setInterval(() => {
        elapsed += tickMs
        setProgress(Math.min((elapsed / totalMs) * 100, 100))
        if (elapsed >= totalMs) {
          if (progressTimerRef.current) clearInterval(progressTimerRef.current)
        }
      }, tickMs)

      // TTS
      if (!isMuted && window.speechSynthesis) {
        const utter = new SpeechSynthesisUtterance(targetText)
        utter.lang = language === 'hi' ? 'hi-IN' : 'en-IN'
        utter.rate = 0.88
        utter.pitch = 1
        utter.volume = 1
        utteranceRef.current = utter
        window.speechSynthesis.speak(utter)
      }
    },
    [language, isMuted, stopAll]
  )

  // Start slide on mount and whenever current changes
  useEffect(() => {
    startSlide(current)
    return () => stopAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  // When mute toggles, restart TTS
  useEffect(() => {
    if (isMuted) {
      window.speechSynthesis?.cancel()
    } else if (utteranceRef.current === null) {
      const targetSlide = slides[current]
      const targetText = language === 'en' ? targetSlide.fullTextEn : targetSlide.fullTextHi
      const utter = new SpeechSynthesisUtterance(targetText)
      utter.lang = language === 'hi' ? 'hi-IN' : 'en-IN'
      utter.rate = 0.88
      utter.pitch = 1
      utter.volume = 1
      utteranceRef.current = utter
      window.speechSynthesis?.speak(utter)
    }
  }, [isMuted, current, language])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { stopAll(); onClose() }
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  const goNext = useCallback(() => {
    if (current < slides.length - 1) {
      setCurrent((c) => c + 1)
    } else {
      stopAll()
      onClose()
    }
  }, [current, onClose, stopAll])

  const goPrev = useCallback(() => {
    if (current > 0) setCurrent((c) => c - 1)
  }, [current])

  const handleTap = (e: React.MouseEvent) => {
    // Ignore clicks on control buttons
    const target = e.target as HTMLElement
    if (target.closest('button')) return
    goNext()
  }

  const title = language === 'en' ? slide.titleEn : slide.titleHi

  return (
    <div
      className="fixed inset-0 z-[100] bg-black select-none cursor-pointer"
      onClick={handleTap}
      role="presentation"
    >
      {/* Background image with ken-burns zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          key={current}
          src={slide.image}
          alt={title}
          fill
          className="object-cover scale-110 animate-[kenburns_12s_ease-out_forwards]"
          priority
        />
        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </div>

      {/* Top bar: progress dots + close */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-safe pt-4 flex flex-col gap-2">
        {/* Progress bars */}
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-0.5 rounded-full bg-white/30 overflow-hidden"
            >
              <div
                className="h-full bg-white rounded-full transition-none"
                style={{
                  width:
                    i < current
                      ? '100%'
                      : i === current
                      ? `${progress}%`
                      : '0%',
                  transition: i === current ? 'width 50ms linear' : 'none',
                }}
              />
            </div>
          ))}
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-bold text-[10px] font-serif border border-white/30">
              DP
            </div>
            <div>
              <p className="text-white text-xs font-semibold leading-none">DP Chaudhary</p>
              <p className="text-white/60 text-[10px] mt-0.5">BJP — Kurukshetra</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); setIsMuted((m) => !m) }}
              className="w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); stopAll(); onClose() }}
              className="w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              aria-label="Close story"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide title */}
      <div className="absolute top-1/3 left-0 right-0 z-10 px-6 sm:px-10">
        <p className="text-white/50 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
          {current + 1} / {slides.length}
        </p>
        <h2 className="text-white font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-balance leading-tight drop-shadow-lg mb-6">
          {title}
        </h2>

        {/* Animated word-by-word text */}
        <p className="text-white/90 text-lg sm:text-xl md:text-2xl font-serif leading-relaxed max-w-2xl drop-shadow-md">
          {words.map((word, i) => (
            <span
              key={i}
              className={`inline-block mr-2 transition-all duration-300 ${
                i < visibleWords
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Saffron accent line */}
      <div className="absolute bottom-24 left-6 sm:left-10 w-12 h-1 bg-primary rounded-full" />

      {/* Tap hint */}
      <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-3 z-10 pointer-events-none">
        <span className="text-white/40 text-xs tracking-widest uppercase">
          {current < slides.length - 1
            ? (language === 'en' ? 'Tap to continue' : 'आगे बढ़ने के लिए टैप करें')
            : (language === 'en' ? 'Tap to finish' : 'समाप्त करने के लिए टैप करें')}
        </span>
      </div>

      {/* Prev/Next nav buttons (desktop) */}
      {current > 0 && (
        <button
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 border border-white/20 items-center justify-center text-white hover:bg-primary transition-all"
          onClick={(e) => { e.stopPropagation(); goPrev() }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {current < slides.length - 1 && (
        <button
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 border border-white/20 items-center justify-center text-white hover:bg-primary transition-all"
          onClick={(e) => { e.stopPropagation(); goNext() }}
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
