'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-[oklch(0.14_0.04_50)] flex items-center justify-center px-4">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center text-white font-serif font-bold text-2xl border-2 border-[oklch(0.75_0.14_72)] mb-4">
            DP
          </div>
          <h1 className="text-white font-serif text-2xl font-bold">DP Chaudhary</h1>
          <p className="text-[oklch(0.65_0.03_75)] text-sm mt-1">Admin Panel — Kurukshetra</p>
        </div>

        <div className="bg-[oklch(0.2_0.04_50)] border border-[oklch(0.3_0.04_50)] rounded-2xl p-8 shadow-2xl">
          <h2 className="text-white font-serif text-xl font-semibold mb-6 text-center">Sign In</h2>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 text-[oklch(0.75_0.2_27)] text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[oklch(0.8_0.02_75)] text-sm font-medium mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.5_0.03_75)]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[oklch(0.15_0.03_50)] border border-[oklch(0.35_0.04_50)] text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-[oklch(0.45_0.03_75)]"
                  placeholder="admin@dpchaudhary.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-[oklch(0.8_0.02_75)] text-sm font-medium mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.5_0.03_75)]" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[oklch(0.15_0.03_50)] border border-[oklch(0.35_0.04_50)] text-white rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-[oklch(0.45_0.03_75)]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[oklch(0.5_0.03_75)] hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-[oklch(0.55_0.19_44)] disabled:opacity-60 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              Sign In to Admin Panel
            </button>
          </form>
        </div>

        <p className="text-center text-[oklch(0.45_0.03_75)] text-xs mt-6">
          © {new Date().getFullYear()} DP Chaudhary. All Rights Reserved.
        </p>
      </div>
    </div>
  )
}
