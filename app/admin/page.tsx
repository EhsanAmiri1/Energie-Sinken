import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  ClipboardList, Users, Clock, CheckCircle2,
  AlertCircle, ArrowRight,
} from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { isAdmin } from '@/lib/admin'
import type { AnalyseAnfrage } from '@/types'
import LogoutButton from '@/app/dashboard/logout-button'

export default async function AdminPage() {
  const supabase = createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !isAdmin(user.email)) redirect('/dashboard')

  const { data: anfragen } = await supabase
    .from('analyse_anfragen')
    .select('*')
    .order('created_at', { ascending: false })

  const alle = (anfragen as AnalyseAnfrage[]) || []
  const neu = alle.filter((a) => a.status === 'neu')
  const inBearbeitung = alle.filter((a) => a.status === 'in_bearbeitung')
  const abgeschlossen = alle.filter((a) => a.status === 'abgeschlossen')

  const stats = [
    { label: 'Gesamt', value: alle.length, icon: Users, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' },
    { label: 'Neu', value: neu.length, icon: AlertCircle, color: 'text-brand-600', bg: 'bg-brand-50', border: 'border-brand-200' },
    { label: 'In Bearbeitung', value: inBearbeitung.length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { label: 'Abgeschlossen', value: abgeschlossen.length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <section className="bg-energy-dark py-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-energy-dark to-energy-dark" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-500/10 blur-3xl" />
          <div className="container-tight relative z-10">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                Admin
              </span>{' '}
              Dashboard
            </h1>
            <p className="mt-2 text-gray-300">
              Alle Analyse-Anfragen verwalten
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container-tight">
            {/* Statistik */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className={`rounded-2xl border ${s.border} ${s.bg} p-5`}>
                  <div className="flex items-center gap-2">
                    <s.icon className={`h-5 w-5 ${s.color}`} />
                    <span className="text-sm font-medium text-gray-500">{s.label}</span>
                  </div>
                  <p className={`mt-2 text-3xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Tabelle */}
            <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                  <ClipboardList className="h-5 w-5 text-brand-500" />
                  Analyse-Anfragen
                </h2>
              </div>

              {alle.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Noch keine Anfragen vorhanden.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-gray-200 bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 font-medium text-gray-500">Name</th>
                        <th className="px-6 py-3 font-medium text-gray-500">E-Mail</th>
                        <th className="px-6 py-3 font-medium text-gray-500 hidden sm:table-cell">Telefon</th>
                        <th className="px-6 py-3 font-medium text-gray-500 hidden md:table-cell">Verbrauch</th>
                        <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                        <th className="px-6 py-3 font-medium text-gray-500 hidden lg:table-cell">Datum</th>
                        <th className="px-6 py-3 font-medium text-gray-500"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {alle.map((a) => (
                        <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {a.vorname} {a.nachname}
                          </td>
                          <td className="px-6 py-4 text-gray-600">{a.email}</td>
                          <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">
                            {a.telefon || '—'}
                          </td>
                          <td className="px-6 py-4 text-gray-600 hidden md:table-cell">
                            {a.verbrauch_kwh ? `${Number(a.verbrauch_kwh).toLocaleString('de-DE')} kWh` : '—'}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={a.status} />
                          </td>
                          <td className="px-6 py-4 text-gray-500 hidden lg:table-cell">
                            {new Date(a.created_at).toLocaleDateString('de-DE')}
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              href={`/admin/anfrage/${a.id}`}
                              className="inline-flex items-center gap-1 text-brand-600 font-medium hover:text-brand-700"
                            >
                              Details
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string; bg: string; border: string }> = {
    neu: { label: 'Neu', color: 'text-brand-600', bg: 'bg-brand-50', border: 'border-brand-200' },
    in_bearbeitung: { label: 'In Bearbeitung', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    abgeschlossen: { label: 'Abgeschlossen', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  }
  const c = config[status] || config.neu
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${c.bg} ${c.border} ${c.color}`}>
      {c.label}
    </span>
  )
}

function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-energy-dark/80 backdrop-blur-lg">
      <div className="container-tight flex h-16 items-center justify-between">
        <Link href="/admin" className="text-lg font-bold text-white">
          <span className="text-brand-400">Energiekosten</span> Sinken
          <span className="ml-2 rounded bg-brand-500/20 px-2 py-0.5 text-xs text-brand-300">Admin</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
            Startseite
          </Link>
          <LogoutButton />
        </nav>
      </div>
    </header>
  )
}
