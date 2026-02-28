import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, User, Mail, Phone, Calendar,
  Hash, Zap, MapPin, FileText, ClipboardList, Download,
} from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { isAdmin } from '@/lib/admin'
import type { AnalyseAnfrage } from '@/types'
import StatusUpdate from '../../status-update'
import LogoutButton from '@/app/dashboard/logout-button'

export default async function AnfrageDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !isAdmin(user.email)) redirect('/dashboard')

  const { data: anfrage } = await supabase
    .from('analyse_anfragen')
    .select('*')
    .eq('id', params.id)
    .single<AnalyseAnfrage>()

  if (!anfrage) notFound()

  const rows = [
    { icon: User, label: 'Vorname', value: anfrage.vorname },
    { icon: User, label: 'Nachname', value: anfrage.nachname },
    { icon: Calendar, label: 'Geburtsdatum', value: anfrage.geburtsdatum ? new Date(anfrage.geburtsdatum).toLocaleDateString('de-DE') : '—' },
    { icon: Mail, label: 'E-Mail', value: anfrage.email },
    { icon: Phone, label: 'Telefon', value: anfrage.telefon || '—' },
    { icon: Hash, label: 'Zählernummer', value: anfrage.zaehler_nummer || '—' },
    { icon: Zap, label: 'Verbrauch', value: anfrage.verbrauch_kwh ? `${Number(anfrage.verbrauch_kwh).toLocaleString('de-DE')} kWh` : '—' },
    { icon: MapPin, label: 'Marktlokations-ID', value: anfrage.marktlokations_id || '—' },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        <section className="bg-energy-dark py-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-energy-dark to-energy-dark" />
          <div className="container-tight relative z-10">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zur Übersicht
            </Link>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {anfrage.vorname}{' '}
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                {anfrage.nachname}
              </span>
            </h1>
            <p className="mt-1 text-gray-300">
              Eingereicht am {new Date(anfrage.created_at).toLocaleDateString('de-DE', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container-tight grid gap-6 lg:grid-cols-3">
            {/* Kundendaten */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <ClipboardList className="h-5 w-5 text-brand-500" />
                  Kundendaten
                </h2>
                <div className="mt-6 divide-y divide-gray-100">
                  {rows.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3 py-3">
                      <Icon className="h-4 w-4 shrink-0 text-gray-400" />
                      <span className="w-40 shrink-0 text-sm font-medium text-gray-500">{label}</span>
                      <span className="text-sm text-gray-900">{value}</span>
                    </div>
                  ))}

                  {/* Abrechnung mit Download-Link */}
                  <div className="flex items-center gap-3 py-3">
                    <FileText className="h-4 w-4 shrink-0 text-gray-400" />
                    <span className="w-40 shrink-0 text-sm font-medium text-gray-500">Abrechnung</span>
                    {anfrage.abrechnung_path ? (
                      <a
                        href={`/api/admin/anfrage/${anfrage.id}/datei`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-100 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        {anfrage.abrechnung_filename || 'Datei öffnen'}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">Keine Datei hochgeladen</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Notizen */}
            <div className="lg:col-span-1">
              <StatusUpdate
                id={anfrage.id}
                currentStatus={anfrage.status}
              />
            </div>
          </div>
        </section>
      </main>
    </>
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
          <Link href="/admin" className="text-sm text-gray-300 hover:text-white transition-colors">
            Übersicht
          </Link>
          <LogoutButton />
        </nav>
      </div>
    </header>
  )
}
