import { createClient } from '@/lib/supabase/server'
import { Newspaper, Video, Image as ImageIcon, FileText, TrendingUp } from 'lucide-react'
import Link from 'next/link'

async function getStats() {
  const supabase = await createClient()
  const [posts, news, videos, banners] = await Promise.all([
    supabase.from('posts').select('id', { count: 'exact', head: true }),
    supabase.from('news').select('id', { count: 'exact', head: true }),
    supabase.from('videos').select('id', { count: 'exact', head: true }),
    supabase.from('banners').select('id', { count: 'exact', head: true }),
  ])
  return {
    posts: posts.count ?? 0,
    news: news.count ?? 0,
    videos: videos.count ?? 0,
    banners: banners.count ?? 0,
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const statCards = [
    { label: 'Total Posts', value: stats.posts, icon: FileText, href: '/admin/posts', color: 'text-[oklch(0.7_0.15_250)]', bg: 'bg-[oklch(0.7_0.15_250)/0.1]' },
    { label: 'News Articles', value: stats.news, icon: Newspaper, href: '/admin/news', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Videos', value: stats.videos, icon: Video, href: '/admin/videos', color: 'text-[oklch(0.7_0.15_160)]', bg: 'bg-[oklch(0.7_0.15_160)/0.1]' },
    { label: 'Banners', value: stats.banners, icon: ImageIcon, href: '/admin/banners', color: 'text-[oklch(0.75_0.14_72)]', bg: 'bg-[oklch(0.75_0.14_72)/0.1]' },
  ]

  const quickLinks = [
    { href: '/admin/posts/new', label: 'New Post', icon: FileText },
    { href: '/admin/news/new', label: 'New Article', icon: Newspaper },
    { href: '/admin/videos/new', label: 'Add Video', icon: Video },
    { href: '/admin/banners/new', label: 'Add Banner', icon: ImageIcon },
  ]

  return (
    <div className="p-6 md:p-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">
          Welcome back
        </h1>
        <p className="text-[oklch(0.6_0.03_75)] text-sm mt-1">{user?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-[oklch(0.2_0.04_50)] border border-[oklch(0.28_0.04_50)] rounded-xl p-5 hover:border-primary/40 transition-all hover:-translate-y-0.5 group"
          >
            <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mb-3`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className="text-3xl font-serif font-bold text-white">{card.value}</p>
            <p className="text-[oklch(0.6_0.03_75)] text-sm mt-0.5">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-white font-serif font-semibold text-lg mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-primary/10 hover:bg-primary border border-primary/30 hover:border-primary rounded-xl p-4 flex items-center gap-3 text-[oklch(0.85_0.14_55)] hover:text-white transition-all group"
            >
              <link.icon className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Manage sections */}
      <div>
        <h2 className="text-white font-serif font-semibold text-lg mb-4">Manage Content</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'Posts', desc: 'Create and manage public posts and updates', href: '/admin/posts', icon: FileText },
            { title: 'News & Articles', desc: 'Manage news articles and blog posts (bilingual)', href: '/admin/news', icon: Newspaper },
            { title: 'Videos', desc: 'Add YouTube videos to the video gallery', href: '/admin/videos', icon: Video },
            { title: 'Banners', desc: 'Manage homepage banner slides and promotions', href: '/admin/banners', icon: ImageIcon },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-[oklch(0.2_0.04_50)] border border-[oklch(0.28_0.04_50)] rounded-xl p-5 hover:border-primary/40 transition-all flex items-start gap-4 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                <p className="text-[oklch(0.55_0.03_75)] text-xs mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
