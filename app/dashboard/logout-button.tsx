'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase-browser'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
    >
      <LogOut className="h-3.5 w-3.5" />
      Abmelden
    </button>
  )
}
