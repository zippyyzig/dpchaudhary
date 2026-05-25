'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'hi'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.about': { en: 'About', hi: 'परिचय' },
  'nav.news': { en: 'News', hi: 'समाचार' },
  'nav.videos': { en: 'Videos', hi: 'वीडियो' },
  'nav.gallery': { en: 'Gallery', hi: 'गैलरी' },
  'nav.contact': { en: 'Contact', hi: 'संपर्क' },

  // Hero Section
  'hero.tagline': { en: 'Serving the People of Kurukshetra', hi: 'कुरुक्षेत्र की जनता की सेवा में' },
  'hero.subtitle': {
    en: 'Committed to the development, culture, and prosperity of the sacred land of Kurukshetra',
    hi: 'कुरुक्षेत्र की पवित्र भूमि के विकास, संस्कृति और समृद्धि के लिए समर्पित',
  },
  'hero.cta_connect': { en: 'Connect With Me', hi: 'जुड़ें' },
  'hero.cta_vision': { en: 'Our Vision', hi: 'हमारी दृष्टि' },

  // About Section
  'about.title': { en: 'About DP Chaudhary', hi: 'डीपी चौधरी के बारे में' },
  'about.subtitle': { en: 'A Leader Rooted in Kurukshetra', hi: 'कुरुक्षेत्र की जड़ों से जुड़े नेता' },
  'about.description1': {
    en: "D.P. Chaudhary is a dedicated public servant and political leader from the sacred city of Kurukshetra, Haryana. Born and raised in the land of the Bhagavad Gita, he has dedicated his life to the welfare and development of the region's people.",
    hi: 'डी.पी. चौधरी हरियाणा के पवित्र शहर कुरुक्षेत्र के एक समर्पित जनसेवक और राजनीतिक नेता हैं। भगवद गीता की भूमि पर जन्मे और पले-बढ़े, उन्होंने अपना जीवन क्षेत्र के लोगों के कल्याण और विकास के लिए समर्पित कर दिया है।',
  },
  'about.description2': {
    en: 'With a vision to transform Kurukshetra into a model constituency, he works tirelessly for infrastructure development, education, healthcare, and preserving the rich cultural heritage of this ancient holy land.',
    hi: 'कुरुक्षेत्र को एक आदर्श निर्वाचन क्षेत्र बनाने की दृष्टि से, वह बुनियादी ढांचे के विकास, शिक्षा, स्वास्थ्य सेवा और इस प्राचीन पवित्र भूमि की समृद्ध सांस्कृतिक विरासत को संरक्षित करने के लिए अथक परिश्रम करते हैं।',
  },
  'about.years_service': { en: 'Years of Service', hi: 'सेवा के वर्ष' },
  'about.projects': { en: 'Projects Completed', hi: 'परियोजनाएं पूर्ण' },
  'about.villages': { en: 'Villages Covered', hi: 'गांव कवर' },
  'about.youth': { en: 'Youth Empowered', hi: 'युवा सशक्त' },

  // Kurukshetra Section
  'kurukshetra.title': { en: 'The Sacred Land of Kurukshetra', hi: 'कुरुक्षेत्र — पवित्र भूमि' },
  'kurukshetra.subtitle': {
    en: 'Where the Bhagavad Gita was revealed, where history was made',
    hi: 'जहां भगवद गीता का उपदेश हुआ, जहां इतिहास बना',
  },
  'kurukshetra.desc': {
    en: 'Kurukshetra holds an unparalleled place in Hindu culture and history. The battlefield of Mahabharata, the birthplace of the Bhagavad Gita, Brahma Sarovar — this land is both our identity and our inspiration.',
    hi: 'कुरुक्षेत्र हिन्दू संस्कृति और इतिहास में एक अद्वितीय स्थान रखता है। महाभारत का युद्धक्षेत्र, भगवद गीता की जन्मस्थली, ब्रह्म सरोवर — यह भूमि हमारी पहचान और हमारी प्रेरणा है।',
  },

  // News Section
  'news.title': { en: 'Latest News', hi: 'ताज़ा समाचार' },
  'news.subtitle': { en: 'Stay updated with our latest activities and announcements', hi: 'हमारी नवीनतम गतिविधियों और घोषणाओं से अपडेट रहें' },
  'news.readmore': { en: 'Read More', hi: 'और पढ़ें' },
  'news.all': { en: 'View All News', hi: 'सभी समाचार देखें' },

  // Videos Section
  'videos.title': { en: 'Videos', hi: 'वीडियो' },
  'videos.subtitle': { en: 'Watch our latest speeches and events', hi: 'हमारे नवीनतम भाषण और कार्यक्रम देखें' },
  'videos.all': { en: 'View All Videos', hi: 'सभी वीडियो देखें' },

  // Contact Section
  'contact.title': { en: 'Connect With Us', hi: 'हमसे जुड़ें' },
  'contact.subtitle': { en: 'Your voice matters — reach out to us', hi: 'आपकी आवाज़ मायने रखती है — हमसे संपर्क करें' },
  'contact.name': { en: 'Your Name', hi: 'आपका नाम' },
  'contact.email': { en: 'Email Address', hi: 'ईमेल पता' },
  'contact.message': { en: 'Your Message', hi: 'आपका संदेश' },
  'contact.send': { en: 'Send Message', hi: 'संदेश भेजें' },
  'contact.phone': { en: 'Phone', hi: 'फोन' },
  'contact.address': { en: 'Address', hi: 'पता' },
  'contact.address_val': {
    en: 'Kurukshetra, Haryana, India',
    hi: 'कुरुक्षेत्र, हरियाणा, भारत',
  },

  // Footer
  'footer.rights': { en: 'All Rights Reserved', hi: 'सर्वाधिकार सुरक्षित' },
  'footer.tagline': { en: 'Official website of DP Chaudhary', hi: 'डीपी चौधरी की आधिकारिक वेबसाइट' },
  'footer.quicklinks': { en: 'Quick Links', hi: 'त्वरित लिंक' },
  'footer.follow': { en: 'Follow Us', hi: 'हमें फॉलो करें' },

  // Misc
  'loading': { en: 'Loading...', hi: 'लोड हो रहा है...' },
  'no_content': { en: 'No content available', hi: 'कोई सामग्री उपलब्ध नहीं है' },
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[key]?.[language] ?? key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
