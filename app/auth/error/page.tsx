'use client'

import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 p-8">
        <h1 className="text-2xl font-bold text-foreground">Authentication Error</h1>
        <p className="text-muted-foreground">Something went wrong during authentication.</p>
        <Link href="/auth/login" className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
          Back to Login
        </Link>
      </div>
    </div>
  )
}
