'use client'

import { useState } from 'react'
import { Phone, MapPin, Mail, Send, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

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
      icon: Phone,
      label: t('contact.phone'),
      value: '+91 98765 43210',
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: 'contact@dpchaudhary.in',
    },
    {
      icon: MapPin,
      label: t('contact.address'),
      value: t('contact.address_val'),
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
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {['Facebook', 'Twitter / X', 'YouTube', 'Instagram'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="bg-[oklch(0.22_0.05_250)] hover:bg-primary text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition-colors"
                    title={s}
                  >
                    {s.slice(0, 2)}
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
