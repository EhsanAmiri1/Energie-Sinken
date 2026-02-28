import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  User, Mail, Phone, Zap, Hash, MapPin,
  FileText, Clock, CheckCircle2, ArrowRight,
  ClipboardList,
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

  // Analyse-Anfrage laden (neueste per E-Mail)
  const { data: analyse } = await supabase
    .from('analyse_anfragen')
    .select('*')
    .eq('email', user.email!)
    .order('created_at', { ascending: false })
    .limit(1)
    .single<AnalyseAnfrage>()

  const vorname = profile?.vorname || 'Kunde'

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
              Hier sehen Sie den Status Ihrer Energiekosten-Analyse.
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="container-tight grid gap-6 lg:grid-cols-3">
            {/* ── Analyse-Status (volle Breite auf lg) ── */}
            <div className="lg:col-span-2">
              <AnalyseStatusCard analyse={analyse} />
            </div>

            {/* ── Nächste Schritte ── */}
            <div className="lg:col-span-1">
              <NaechsteSchritteCard status={analyse?.status} />
            </div>

            {/* ── Ihre Daten ── */}
            <div className="lg:col-span-3">
              <DatenCard profile={profile} analyse={analyse} />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

// ───────── Analyse-Status ─────────

const statusConfig = {
  neu: {
    label: 'Eingereicht',
    color: 'text-brand-600',
    bg: 'bg-brand-50',
    border: 'border-brand-200',
    step: 1,
  },
  in_bearbeitung: {
    label: 'In Bearbeitung',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    step: 2,
  },
  abgeschlossen: {
    label: 'Abgeschlossen',
    color: 'text-brand-600',
    bg: 'bg-brand-50',
    border: 'border-brand-200',
    step: 3,
  },
} as const

const steps = [
  { label: 'Eingereicht', icon: ClipboardList },
  { label: 'In Bearbeitung', icon: Clock },
  { label: 'Ergebnis', icon: CheckCircle2 },
]

function AnalyseStatusCard({ analyse }: { analyse: AnalyseAnfrage | null }) {
  if (!analyse) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <ClipboardList className="h-5 w-5 text-brand-500" />
          Analyse-Status
        </h2>
        <p className="mt-4 text-gray-500">
          Noch keine Analyse-Anfrage vorhanden.{' '}
          <Link href="/analyse" className="text-brand-600 font-medium hover:text-brand-700">
            Jetzt Analyse starten
            <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </p>
      </div>
    )
  }

  const config = statusConfig[analyse.status] || statusConfig.neu
  const currentStep = config.step

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <ClipboardList className="h-5 w-5 text-brand-500" />
          Analyse-Status
        </h2>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${config.bg} ${config.border} ${config.color}`}>
          {config.label}
        </span>
      </div>

      {/* Fortschrittsanzeige */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => {
            const StepIcon = step.icon
            const isActive = i + 1 <= currentStep
            const isCurrent = i + 1 === currentStep
            return (
              <div key={step.label} className="flex flex-1 flex-col items-center text-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? isCurrent
                      ? 'bg-brand-500 text-white ring-4 ring-brand-100'
                      : 'bg-brand-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <StepIcon className="h-5 w-5" />
                </div>
                <span className={`mt-2 text-xs font-medium sm:text-sm ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
        {/* Verbindungslinien */}
        <div className="relative mx-auto mt-[-36px] mb-6 flex items-center px-[20%]" aria-hidden>
          <div className={`h-0.5 flex-1 ${currentStep >= 2 ? 'bg-brand-500' : 'bg-gray-200'}`} />
          <div className={`h-0.5 flex-1 ${currentStep >= 3 ? 'bg-brand-500' : 'bg-gray-200'}`} />
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Eingereicht am{' '}
        {new Date(analyse.created_at).toLocaleDateString('de-DE', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </div>
  )
}

// ───────── Nächste Schritte ─────────

function NaechsteSchritteCard({ status }: { status?: string }) {
  const messages: Record<string, { title: string; text: string }> = {
    neu: {
      title: 'Wir prüfen Ihre Daten',
      text: 'Unser Team hat Ihre Anfrage erhalten und analysiert jetzt Ihre Energiekosten. Sie werden benachrichtigt, sobald wir ein Ergebnis für Sie haben.',
    },
    in_bearbeitung: {
      title: 'Analyse läuft',
      text: 'Wir vergleichen gerade Ihre aktuellen Kosten mit den besten Angeboten auf dem Markt. In Kürze erhalten Sie Ihr persönliches Ergebnis.',
    },
    abgeschlossen: {
      title: 'Ihr Ergebnis liegt vor!',
      text: 'Die Analyse Ihrer Energiekosten ist abgeschlossen. Unser Team wird sich bei Ihnen melden, um die Ergebnisse zu besprechen.',
    },
  }

  const msg = messages[status || 'neu'] || messages.neu

  return (
    <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 shadow-sm sm:p-8">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
        <ArrowRight className="h-5 w-5 text-brand-500" />
        Nächste Schritte
      </h2>
      <h3 className="mt-4 font-semibold text-gray-800">{msg.title}</h3>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{msg.text}</p>
      <div className="mt-6 rounded-xl border border-brand-200 bg-white p-4">
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

function DatenCard({ profile, analyse }: { profile: Profile | null; analyse: AnalyseAnfrage | null }) {
  const rows = [
    { icon: User, label: 'Name', value: profile ? `${profile.vorname} ${profile.nachname}` : '—' },
    { icon: Mail, label: 'E-Mail', value: profile?.email || '—' },
    { icon: Phone, label: 'Telefon', value: profile?.telefon || '—' },
    { icon: Hash, label: 'Zählernummer', value: analyse?.zaehler_nummer || '—' },
    { icon: Zap, label: 'Jahresverbrauch', value: analyse?.verbrauch_kwh ? `${Number(analyse.verbrauch_kwh).toLocaleString('de-DE')} kWh` : '—' },
    { icon: MapPin, label: 'Marktlokations-ID', value: analyse?.marktlokations_id || '—' },
    { icon: FileText, label: 'Abrechnung', value: analyse?.abrechnung_filename || 'Keine Datei hochgeladen' },
  ]

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
        <User className="h-5 w-5 text-brand-500" />
        Ihre Daten
      </h2>
      <div className="mt-6 divide-y divide-gray-100">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 py-3">
            <Icon className="h-4 w-4 shrink-0 text-gray-400" />
            <span className="w-40 shrink-0 text-sm font-medium text-gray-500">{label}</span>
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
