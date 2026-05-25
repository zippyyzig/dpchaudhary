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
  'nav.story': { en: 'Story', hi: 'कहानी' },

  // Hero Section
  'hero.tagline': { en: 'Grounded Leadership for a Stronger Haryana', hi: 'मजबूत हरियाणा के लिए जमीनी नेतृत्व' },
  'hero.subtitle': {
    en: 'Committed public leader from Kurukshetra, dedicated to development, social welfare, youth empowerment, and community service — जनता के साथ • जनता के लिए',
    hi: 'कुरुक्षेत्र के समर्पित जनप्रतिनिधि — विकास, समाज कल्याण, युवा सशक्तिकरण और जनसेवा के लिए प्रतिबद्ध',
  },
  'hero.cta_connect': { en: 'Connect With Me', hi: 'जुड़ें' },
  'hero.cta_vision': { en: 'Our Vision', hi: 'हमारी दृष्टि' },

  // About Section
  'about.title': { en: 'About DP Chaudhary', hi: 'डीपी चौधरी के बारे में' },
  'about.subtitle': { en: 'A Visionary Leader for Kurukshetra & Haryana', hi: 'कुरुक्षेत्र और हरियाणा के लिए एक दूरदर्शी नेता' },
  'about.description1': {
    en: 'DP Chaudhary is a respected public servant and social worker, rooted in the sacred land of Kurukshetra. He believes that true leadership comes from dedication, accessibility, and continuous engagement with citizens. Inspired by the principles of service, nationalism, and inclusive development, he actively works to empower communities across youth initiatives, education, rural development, infrastructure growth, women empowerment, digital literacy, and social welfare.',
    hi: 'डी.पी. चौधरी कुरुक्षेत्र की पवित्र भूमि से जुड़े एक सम्मानित जनसेवक और सामाजिक कार्यकर्ता हैं। उनका मानना है कि सच्चा नेतृत्व समर्पण, सुलभता और नागरिकों के साथ निरंतर संवाद से आता है। सेवा, राष्ट्रवाद और समावेशी विकास के सिद्धांतों से प्रेरित होकर, वे युवा पहल, शिक्षा, ग्रामीण विकास, बुनियादी ढांचे, महिला सशक्तिकरण, डिजिटल साक्षरता और समाज कल्याण में सक्रिय रूप से कार्य करते हैं।',
  },
  'about.description2': {
    en: 'DP Chaudhary envisions a self-reliant, opportunity-driven Kurukshetra, where progress, culture, and public welfare advance together. His mission is to contribute to a stronger Haryana and a developed India — empowering citizens, strengthening communities, and fostering sustainable growth for future generations. "जनता का विश्वास ही सबसे बड़ी शक्ति है।"',
    hi: 'डी.पी. चौधरी एक आत्मनिर्भर, अवसर-समृद्ध कुरुक्षेत्र की कल्पना करते हैं जहां प्रगति, संस्कृति और जन कल्याण एक साथ आगे बढ़ें। उनका लक्ष्य एक मजबूत हरियाणा और विकसित भारत में योगदान देना है — नागरिकों को सशक्त बनाना, समुदायों को मजबूत करना और भावी पीढ़ियों के लिए सतत विकास को बढ़ावा देना।',
  },
  'about.years_service': { en: 'Years of Service', hi: 'सेवा के वर्ष' },
  'about.projects': { en: 'Projects Completed', hi: 'परियोजनाएं पूर्ण' },
  'about.villages': { en: 'Villages Covered', hi: 'गांव कवर' },
  'about.youth': { en: 'Youth Empowered', hi: 'युवा सशक्त' },

  // Kurukshetra Section
  'kurukshetra.title': { en: 'The Sacred Land of Kurukshetra', hi: 'कुरुक्षेत्र — पवित्र भूमि' },
  'kurukshetra.subtitle': {
    en: 'Where Dharma Was Spoken, and History Was Written',
    hi: 'जहाँ धर्म की वाणी गूंजी, और इतिहास लिखा गया',
  },
  'kurukshetra.desc': {
    en: 'Kurukshetra is not just a city — it is a symbol of faith, knowledge, sacrifice, and dharma. Revered as the sacred land where Lord Krishna delivered the Bhagavad Gita to Arjuna, it is central to India\'s spiritual and cultural heritage. DP Chaudhary emphasises preserving this heritage while promoting modern development, spiritual tourism, and infrastructure growth.',
    hi: 'कुरुक्षेत्र केवल एक शहर नहीं है — यह आस्था, ज्ञान, त्याग और धर्म का प्रतीक है। यह वह पवित्र भूमि है जहाँ भगवान श्रीकृष्ण ने अर्जुन को भगवद गीता का उपदेश दिया था। डीपी चौधरी इस विरासत को संरक्षित करते हुए आधुनिक विकास, आध्यात्मिक पर्यटन और बुनियादी ढांचे की वृद्धि को बढ़ावा देने पर जोर देते हैं।',
  },

  // News Section
  'news.title': { en: 'Latest News', hi: 'ताज़ा समाचार' },
  'news.subtitle': { en: 'Stay updated with the most recent developments, announcements, and initiatives led by DP Chaudhary in Kurukshetra and Haryana', hi: 'कुरुक्षेत्र और हरियाणा में डीपी चौधरी के नवीनतम विकास, घोषणाओं और पहलों से अपडेट रहें' },
  'news.readmore': { en: 'Read More', hi: 'और पढ़ें' },
  'news.all': { en: 'View All News', hi: 'सभी समाचार देखें' },

  // Videos Section
  'videos.title': { en: 'Videos', hi: 'वीडियो' },
  'videos.subtitle': { en: 'Watch public meetings, social welfare activities, cultural programs, and insights into local governance and leadership in Haryana', hi: 'जनसभाएं, सामाजिक कल्याण गतिविधियाँ, सांस्कृतिक कार्यक्रम और हरियाणा में नेतृत्व की झलकियाँ देखें' },
  'videos.all': { en: 'View All Videos', hi: 'सभी वीडियो देखें' },

  // Contact Section
  'contact.title': { en: 'Contact DP Chaudhary', hi: 'डीपी चौधरी से संपर्क करें' },
  'contact.subtitle': { en: 'Your voice matters — reach out for inquiries, suggestions, or feedback', hi: 'आपकी आवाज़ मायने रखती है — प्रश्नों, सुझावों या प्रतिक्रिया के लिए संपर्क करें' },
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
  'footer.tagline': { en: 'Official website of DP Chaudhary — "Service to the people is service to God"', hi: 'डीपी चौधरी की आधिकारिक वेबसाइट — "जन सेवा ही ईश्वर सेवा है"' },
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
