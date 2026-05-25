import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import BannerSlider from '@/components/banner-slider'
import AboutSection from '@/components/about-section'
import GallerySection from '@/components/gallery-section'
import KurukshetraSection from '@/components/kurukshetra-section'
import NewsSection from '@/components/news-section'
import VideosSection from '@/components/videos-section'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <BannerSlider />
      <AboutSection />
      <GallerySection />
      <KurukshetraSection />
      <NewsSection />
      <VideosSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
