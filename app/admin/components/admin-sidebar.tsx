'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, Search, Megaphone,
  Menu, X, LogOut, ChevronRight,
} from 'lucide-react'
import { createClient } from '@/lib/supabase-browser'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads / CRM', icon: Users },
  { href: '/admin/seo', label: 'SEO Analytics', icon: Search },
  { href: '/admin/sea', label: 'SEA / Ads', icon: Megaphone },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-gray-900 p-2 text-gray-400 hover:text-white lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-64 flex-col bg-gray-950 border-r border-gray-800 transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-gray-800">
          <Link href="/admin" className="text-lg font-bold text-white" onClick={() => setOpen(false)}>
            <span className="text-brand-400">Energie</span>kosten
            <span className="ml-1.5 rounded bg-brand-500/20 px-1.5 py-0.5 text-[10px] text-brand-300 uppercase tracking-wider">
              Admin
            </span>
          </Link>
          <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Demo-Modus Banner */}
        <div className="mx-3 mt-3 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2">
          <p className="text-[10px] font-medium text-amber-400 uppercase tracking-wider">Demo-Modus</p>
          <p className="text-[11px] text-amber-300/70 mt-0.5">Google APIs nicht verbunden</p>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-brand-500/15 text-brand-400'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
              >
                <item.icon className={`h-4.5 w-4.5 ${active ? 'text-brand-400' : 'text-gray-500'}`} />
                {item.label}
                {active && <ChevronRight className="ml-auto h-4 w-4 text-brand-400/50" />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-800 p-3 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-800/50 hover:text-gray-300 transition-colors"
          >
            Zur Webseite
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Abmelden
          </button>
        </div>
      </aside>
    </>
  )
}
