'use client'

import { useState } from 'react'
import { Phone, MapPin, Mail, Send, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/dharmpal.chaudhary.94',
    icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/dpchaudhary_11',
    icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/dp.indian/',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@dharampalchaudharyindia',
    icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
]

export default function ContactSection() {
  const { t, language } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
    setForm({ name: '', email: '', message: '' })
  }

  const contactItems = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: 'contact@dpchaudhary.in',
    },
  ]

  return (
    <section id="contact" className="py-16 sm:py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            {language === 'en' ? 'Contact' : 'संपर्क'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground text-balance mb-2">
            {t('contact.title')}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
          <div className="w-14 h-1 bg-primary rounded-full mt-4 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-10 max-w-4xl mx-auto">
          {/* Info side */}
          <div className="space-y-4 sm:space-y-5">
            {/* Contact cards */}
            <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border space-y-4 sm:space-y-5 shadow-sm">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm">{label}</p>
                    <p className="text-muted-foreground text-sm mt-0.5 break-words">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-[oklch(0.13_0.04_250)] rounded-2xl p-4 sm:p-6 text-white">
              <p className="font-serif font-semibold mb-3 sm:mb-4 text-[oklch(0.85_0.14_72)] text-sm sm:text-base">
                {t('footer.follow')}
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center gap-2 bg-[oklch(0.22_0.05_250)] hover:bg-primary text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-lg transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
                      <path d={icon} />
                    </svg>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border shadow-sm">
            {sent ? (
              <div className="h-full min-h-64 flex flex-col items-center justify-center text-center gap-4 py-8">
                <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-primary" />
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground">
                  {language === 'en' ? 'Message Sent!' : 'संदेश भेजा गया!'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'en'
                    ? 'Thank you for reaching out. We will get back to you soon.'
                    : 'संपर्क करने के लिए धन्यवाद। हम जल्द ही आपसे संपर्क करेंगे।'}
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  {language === 'en' ? 'Send another message' : 'एक और संदेश भेजें'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    placeholder={language === 'en' ? 'Your full name' : 'आपका पूरा नाम'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    placeholder={language === 'en' ? 'your@email.com' : 'आपका ईमेल'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('contact.message')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                    placeholder={language === 'en' ? 'Write your message...' : 'अपना संदेश लिखें...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-semibold py-3.5 rounded-lg transition-all shadow-md text-sm sm:text-base"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {t('contact.send')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
