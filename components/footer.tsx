'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

export default function Footer() {
  const { t, language } = useLanguage()
  const year = new Date().getFullYear()

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
    <footer className="bg-[oklch(0.13_0.04_250)] text-[oklch(0.85_0.02_75)]">
      {/* Tri-color accent */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-[oklch(0.75_0.14_72)] to-primary" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-lg border-2 border-[oklch(0.75_0.14_72)] shrink-0">
                DP
              </div>
              <div>
                <p className="font-serif font-bold text-white text-base sm:text-lg leading-tight">
                  {language === 'en' ? 'DP Chaudhary' : 'डीपी चौधरी'}
                </p>
                <p className="text-[oklch(0.75_0.14_72)] text-xs mt-0.5">
                  {language === 'en' ? 'Kurukshetra, Haryana' : 'कुरुक्षेत्र, हरियाणा'}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[oklch(0.72_0.02_75)]">
              {t('footer.tagline')}
            </p>
            <p className="text-[oklch(0.78_0.14_72)] font-serif text-sm italic">
              {language === 'en'
                ? '"Service to the people is service to God" — Official website of DP Chaudhary, Kurukshetra, Haryana'
                : '"जन सेवा ही ईश्वर सेवा है" — डीपी चौधरी, कुरुक्षेत्र, हरियाणा की आधिकारिक वेबसाइट'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-white mb-4 text-sm sm:text-base">
              {t('footer.quicklinks')}
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs sm:text-sm text-[oklch(0.75_0.02_75)] hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-semibold text-white mb-4 text-sm sm:text-base">
              {t('nav.contact')}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[oklch(0.72_0.02_75)]">
              <p>Kurukshetra, Haryana — 136118</p>
              <p>contact@dpchaudhary.in</p>
              <p>+91 98765 43210</p>
              <div className="flex gap-2 sm:gap-3 pt-2">
                {['FB', 'TW', 'YT', 'IG'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-8 h-8 rounded-full bg-[oklch(0.22_0.05_250)] hover:bg-primary flex items-center justify-center text-xs font-bold transition-colors"
                    aria-label={s}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[oklch(0.22_0.05_250)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[oklch(0.55_0.02_75)]">
          <p className="text-center sm:text-left">
            © {year} DP Chaudhary. {t('footer.rights')}.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="hover:text-primary transition-colors">
              {language === 'en' ? 'Admin Login' : 'एडमिन लॉगिन'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
