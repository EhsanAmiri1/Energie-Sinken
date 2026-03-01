import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  User, Mail, Phone, Zap, Hash, MapPin,
  FileText, Clock, CheckCircle2, ArrowRight,
  ClipboardList, Plus, Flame, Download, Euro,
} from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { Profile, AnalyseAnfrage } from '@/types'
import LogoutButton from './logout-button'

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Profil laden
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single<Profile>()

  // Alle Analyse-Anfragen des Users laden
  const { data: anfragenData } = await supabase
    .from('analyse_anfragen')
    .select('*')
    .eq('email', user.email!)
    .order('created_at', { ascending: false })

  const anfragen = (anfragenData as AnalyseAnfrage[]) || []
  const vorname = profile?.vorname || anfragen[0]?.vorname || 'Kunde'

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Begrüßung */}
        <section className="bg-energy-dark py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-energy-dark to-energy-dark" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-500/10 blur-3xl" />
          <div className="container-tight relative z-10">
            <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Willkommen,{' '}
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                {vorname}!
              </span>
            </h1>
            <p className="mt-2 text-gray-300">
              Hier sehen Sie alle Ihre Energiekosten-Analysen.
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="container-tight grid gap-6 lg:grid-cols-3">
            {/* Anfragen-Liste */}
            <div className="lg:col-span-2">
              <AnfragenListe anfragen={anfragen} />
            </div>

            {/* Seitenleiste */}
            <div className="lg:col-span-1 space-y-6">
              <InfoCard anfragen={anfragen} />
              <DatenCard profile={profile} anfragen={anfragen} />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

// ───────── Anfragen-Liste ─────────

function AnfragenListe({ anfragen }: { anfragen: AnalyseAnfrage[] }) {
  if (anfragen.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 text-center">
        <ClipboardList className="mx-auto h-12 w-12 text-gray-300" />
        <h2 className="mt-4 text-lg font-bold text-gray-900">
          Noch keine Analysen vorhanden
        </h2>
        <p className="mt-2 text-gray-500">
          Starten Sie Ihre erste kostenlose Energiekosten-Analyse.
        </p>
        <Link href="/dashboard/neue-anfrage" className="btn-primary mt-6 inline-flex">
          Erste Analyse starten
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <ClipboardList className="h-5 w-5 text-brand-500" />
          Ihre Analysen ({anfragen.length})
        </h2>
        <Link href="/dashboard/neue-anfrage" className="btn-primary text-sm px-4 py-2">
          <Plus className="mr-1.5 h-4 w-4" />
          Neue Analyse
        </Link>
      </div>

      {anfragen.map((anfrage) => (
        <AnfrageCard key={anfrage.id} anfrage={anfrage} />
      ))}
    </div>
  )
}

// ───────── Einzelne Anfrage-Karte ─────────

const statusConfig = {
  neu: { label: 'Eingereicht', color: 'text-brand-600', bg: 'bg-brand-50', border: 'border-brand-200', step: 1 },
  in_bearbeitung: { label: 'In Bearbeitung', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', step: 2 },
  abgeschlossen: { label: 'Abgeschlossen', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', step: 3 },
} as const

const steps = [
  { label: 'Eingereicht' },
  { label: 'In Bearbeitung' },
  { label: 'Ergebnis' },
]

function AnfrageCard({ anfrage }: { anfrage: AnalyseAnfrage }) {
  const config = statusConfig[anfrage.status] || statusConfig.neu
  const currentStep = config.step

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
          anfrage.energie_typ === 'gas'
            ? 'bg-orange-50 border border-orange-200 text-orange-700'
            : 'bg-amber-50 border border-amber-200 text-amber-700'
        }`}>
          {anfrage.energie_typ === 'gas' ? <Flame className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
          {anfrage.energie_typ === 'gas' ? 'Gas' : 'Strom'}
        </span>

        <span className="inline-flex items-center rounded-full bg-gray-50 border border-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-600">
          {anfrage.kunden_typ === 'gewerbe' ? 'Gewerbe' : 'Privat'}
        </span>

        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.border} ${config.color}`}>
          {config.label}
        </span>
      </div>

      {/* Fortschrittsbalken */}
      <div className="mt-4">
        <div className="relative h-1.5 rounded-full bg-gray-200">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-brand-500 transition-all duration-500"
            style={{ width: currentStep === 1 ? '16.5%' : currentStep === 2 ? '50%' : '100%' }}
          />
          {steps.map((_, i) => {
            const isActive = i + 1 <= currentStep
            return (
              <div
                key={i}
                className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 transition-colors ${
                  isActive ? 'border-brand-500 bg-brand-500' : 'border-gray-300 bg-white'
                }`}
                style={{ left: i === 0 ? '0%' : i === 1 ? '50%' : '100%', transform: 'translate(-50%, -50%)' }}
              />
            )
          })}
        </div>
        <div className="mt-2 flex justify-between">
          {steps.map((step, i) => {
            const isActive = i + 1 <= currentStep
            return (
              <span
                key={step.label}
                className={`text-[10px] font-medium sm:text-xs ${isActive ? 'text-brand-600' : 'text-gray-400'} ${
                  i === 0 ? 'text-left' : i === 1 ? 'text-center' : 'text-right'
                }`}
              >
                {step.label}
              </span>
            )
          })}
        </div>
      </div>

      {/* Daten */}
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
        {anfrage.zaehler_nummer && (
          <span className="flex items-center gap-1">
            <Hash className="h-3.5 w-3.5 text-gray-400" />
            {anfrage.zaehler_nummer}
          </span>
        )}
        {anfrage.verbrauch_kwh && (
          <span className="flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-gray-400" />
            {Number(anfrage.verbrauch_kwh).toLocaleString('de-DE')} kWh
          </span>
        )}
        {anfrage.abrechnung_filename && (
          <span className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5 text-gray-400" />
            Abrechnung vorhanden
          </span>
        )}
      </div>

      {/* Ergebnis-Bereich */}
      {anfrage.ergebnis_path && (
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              {anfrage.ersparnis_euro && (
                <p className="flex items-center gap-1.5 text-sm font-bold text-green-700">
                  <Euro className="h-4 w-4" />
                  Sie sparen {Number(anfrage.ersparnis_euro).toLocaleString('de-DE', { minimumFractionDigits: 2 })} € / Jahr
                </p>
              )}
            </div>
            <a
              href={`/api/admin/anfrage/${anfrage.id}/ergebnis-datei`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Ergebnis herunterladen
            </a>
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-gray-400">
        Eingereicht am {new Date(anfrage.created_at).toLocaleDateString('de-DE', {
          day: '2-digit', month: 'long', year: 'numeric',
        })}
      </p>
    </div>
  )
}

// ───────── Info-Karte ─────────

function InfoCard({ anfragen }: { anfragen: AnalyseAnfrage[] }) {
  const neu = anfragen.filter((a) => a.status === 'neu').length
  const inBearbeitung = anfragen.filter((a) => a.status === 'in_bearbeitung').length
  const abgeschlossen = anfragen.filter((a) => a.status === 'abgeschlossen').length

  if (anfragen.length === 0) {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <ArrowRight className="h-5 w-5 text-brand-500" />
          So funktioniert es
        </h2>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Erstellen Sie eine Analyse-Anfrage mit Ihren Zählerdaten. Unser Team vergleicht
          Ihre Kosten mit den besten Angeboten und meldet sich bei Ihnen.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 shadow-sm">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
        <ClipboardList className="h-5 w-5 text-brand-500" />
        Übersicht
      </h2>
      <div className="mt-4 space-y-2">
        {neu > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Eingereicht</span>
            <span className="font-medium text-brand-600">{neu}</span>
          </div>
        )}
        {inBearbeitung > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">In Bearbeitung</span>
            <span className="font-medium text-amber-600">{inBearbeitung}</span>
          </div>
        )}
        {abgeschlossen > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Abgeschlossen</span>
            <span className="font-medium text-green-600">{abgeschlossen}</span>
          </div>
        )}
      </div>
      <div className="mt-4 rounded-xl border border-brand-200 bg-white p-4">
        <p className="text-xs font-medium text-brand-700">
          Fragen? Kontaktieren Sie uns:
        </p>
        <p className="mt-1 text-sm text-gray-600">
          info@energiekosten-sinken.de
        </p>
      </div>
    </div>
  )
}

// ───────── Ihre Daten ─────────

function DatenCard({ profile, anfragen }: { profile: Profile | null; anfragen: AnalyseAnfrage[] }) {
  const neuste = anfragen[0] || null
  const name = profile
    ? `${profile.vorname} ${profile.nachname}`.trim()
    : neuste
      ? `${neuste.vorname} ${neuste.nachname}`.trim()
      : '—'
  const email = profile?.email || neuste?.email || '—'
  const telefon = profile?.telefon || neuste?.telefon || '—'

  const rows = [
    { icon: User, label: 'Name', value: name || '—' },
    { icon: Mail, label: 'E-Mail', value: email },
    { icon: Phone, label: 'Telefon', value: telefon },
  ]

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
        <User className="h-5 w-5 text-brand-500" />
        Ihre Daten
      </h2>
      <div className="mt-4 divide-y divide-gray-100">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 py-2.5">
            <Icon className="h-4 w-4 shrink-0 text-gray-400" />
            <span className="w-24 shrink-0 text-sm font-medium text-gray-500">{label}</span>
            <span className="text-sm text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ───────── Header ─────────

function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-energy-dark/80 backdrop-blur-lg">
      <div className="container-tight flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold text-white">
          <span className="text-brand-400">Energiekosten</span> Sinken
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
            Startseite
          </Link>
          <LogoutButton />
        </nav>
      </div>
    </header>
  )
}
