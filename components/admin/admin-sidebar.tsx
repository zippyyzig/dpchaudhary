'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Newspaper,
  Video,
  Image as ImageIcon,
  FileText,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/posts', label: 'Posts', icon: FileText },
  { href: '/admin/news', label: 'News & Blogs', icon: Newspaper },
  { href: '/admin/videos', label: 'Videos', icon: Video },
  { href: '/admin/banners', label: 'Banners', icon: ImageIcon },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="p-5 border-b border-[oklch(0.25_0.04_50)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-base border border-[oklch(0.75_0.14_72)]">
            DP
          </div>
          <div>
            <p className="text-white font-serif font-bold text-sm leading-tight">DP Chaudhary</p>
            <p className="text-[oklch(0.75_0.14_72)] text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-primary text-white shadow-md'
                  : 'text-[oklch(0.72_0.03_75)] hover:bg-[oklch(0.22_0.04_50)] hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-[oklch(0.25_0.04_50)] space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[oklch(0.72_0.03_75)] hover:bg-[oklch(0.22_0.04_50)] hover:text-white transition-all"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          View Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[oklch(0.72_0.03_75)] hover:bg-destructive/20 hover:text-[oklch(0.75_0.2_27)] transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-56 shrink-0 bg-[oklch(0.17_0.04_50)] border-r border-[oklch(0.25_0.04_50)] flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-[oklch(0.17_0.04_50)] border border-[oklch(0.3_0.04_50)] rounded-lg flex items-center justify-center text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed left-0 top-0 bottom-0 w-56 bg-[oklch(0.17_0.04_50)] border-r border-[oklch(0.25_0.04_50)] z-50 flex flex-col md:hidden">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  )
}
