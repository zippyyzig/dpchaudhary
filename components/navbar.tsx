'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Globe, PlayCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import dynamic from 'next/dynamic'

const StorySlideshow = dynamic(() => import('@/components/story-slideshow'), { ssr: false })

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [storyOpen, setStoryOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#gallery', label: language === 'en' ? 'Gallery' : 'गैलरी' },
    { href: '#news', label: t('nav.news') },
    { href: '#videos', label: t('nav.videos') },
    { href: '#kurukshetra', label: language === 'en' ? 'Kurukshetra' : 'कुरुक्षेत्र' },
    { href: '#contact', label: t('nav.contact') },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[oklch(0.15_0.04_250)] shadow-lg shadow-black/30'
            : 'bg-gradient-to-b from-[oklch(0.15_0.04_250/0.95)] to-transparent'
        }`}
      >
        {/* Top official strip — desktop only */}
        <div className="bg-primary text-primary-foreground text-xs py-1 px-4 text-center hidden md:block">
          <span className="font-serif tracking-wide">
            {language === 'en'
              ? 'Official Website of DP Chaudhary — Serving the People of Kurukshetra'
              : 'डीपी चौधरी की आधिकारिक वेबसाइट — कुरुक्षेत्र की जनता की सेवा में'}
          </span>
        </div>

        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-base border-2 border-[oklch(0.75_0.14_72)]">
              DP
            </div>
            <div className="text-white leading-tight">
              <p className="font-serif font-bold text-sm sm:text-base">
                {language === 'en' ? 'DP Chaudhary' : 'डीपी चौधरी'}
              </p>
              <p className="text-[10px] sm:text-xs text-[oklch(0.75_0.14_72)]">
                {language === 'en' ? 'BJP — Kurukshetra' : 'भाजपा — कुरुक्षेत्र'}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[oklch(0.9_0.02_75)] hover:text-primary transition-colors text-sm font-medium whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Story button */}
            <button
              onClick={() => setStoryOpen(true)}
              className="hidden sm:flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md border border-[oklch(0.75_0.22_40)]"
              aria-label="Watch story"
            >
              <PlayCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{t('nav.story')}</span>
            </button>

            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 bg-[oklch(0.22_0.05_250)] hover:bg-primary text-white px-2.5 py-1.5 sm:px-3 rounded-full text-xs sm:text-sm font-medium transition-all border border-[oklch(0.35_0.06_250)]"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span>{language === 'en' ? 'हिंदी' : 'EN'}</span>
            </button>

            <button
              className="lg:hidden text-white w-9 h-9 flex items-center justify-center rounded-lg bg-[oklch(0.22_0.05_250)] border border-[oklch(0.35_0.06_250)]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Nav drawer */}
        {isOpen && (
          <div className="lg:hidden bg-[oklch(0.15_0.04_250)] border-t border-[oklch(0.28_0.05_250)]">
            <div className="px-4 py-2">
              {/* Story button in mobile menu */}
              <button
                onClick={() => { setIsOpen(false); setStoryOpen(true) }}
                className="flex items-center gap-2 w-full text-primary py-3 text-base font-semibold border-b border-[oklch(0.22_0.05_250)]"
              >
                <PlayCircle className="w-5 h-5 shrink-0" />
                {t('nav.story')}
              </button>

              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center text-[oklch(0.9_0.02_75)] hover:text-primary py-3 text-base font-medium border-b border-[oklch(0.22_0.05_250)] last:border-0 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {/* Admin link at bottom of mobile nav */}
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center text-[oklch(0.6_0.02_75)] py-3 text-sm border-t border-[oklch(0.22_0.05_250)] mt-1 hover:text-primary transition-colors"
              >
                {language === 'en' ? 'Admin Login' : 'एडमिन लॉगिन'}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Story Slideshow overlay */}
      {storyOpen && <StorySlideshow onClose={() => setStoryOpen(false)} />}
    </>
  )
}
