import Link from 'next/link'
import {
  Zap, Shield, Clock, Mail, BarChart3, FileText,
  CheckCircle2, Lock, ArrowRight,
} from 'lucide-react'

export default function AnalyseAuswahlPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <section className="bg-energy-dark py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-energy-dark to-energy-dark" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-500/10 blur-3xl" />
          <div className="container-tight relative z-10 text-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Kostenlose{' '}
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                Energiekosten-Analyse
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Finden Sie heraus, wie viel Sie bei Strom und Gas sparen k&ouml;nnen.
              W&auml;hlen Sie Ihren Weg:
            </p>
          </div>
        </section>

        {/* Auswahl-Karten */}
        <section className="py-16">
          <div className="container-tight">
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {/* Karte A: Gast / Schnell-Analyse */}
              <Link
                href="/analyse/gast"
                className="group relative rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-brand-400 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100">
                  <Zap className="h-7 w-7 text-brand-600" />
                </div>
                <h2 className="mt-6 text-xl font-bold text-gray-900">
                  Schnell-Analyse
                </h2>
                <p className="mt-2 text-gray-600">
                  Direkt loslegen &mdash; ohne Registrierung. Sie erhalten Ihr Ergebnis per E-Mail.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-500" />
                    Kein Konto erforderlich
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="h-4 w-4 shrink-0 text-brand-500" />
                    Sofort starten, in 2 Minuten fertig
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="h-4 w-4 shrink-0 text-brand-500" />
                    Ergebnis per E-Mail
                  </li>
                </ul>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                  Schnell-Analyse starten
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

              {/* Karte B: Mit Konto (Empfohlen) */}
              <Link
                href="/analyse/konto"
                className="group relative rounded-2xl border-2 border-amber-300 bg-white p-8 shadow-sm transition-all hover:border-amber-400 hover:shadow-lg"
              >
                {/* Empfohlen Badge */}
                <div className="absolute -top-3 right-6 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-900">
                  Empfohlen
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
                  <Shield className="h-7 w-7 text-amber-600" />
                </div>
                <h2 className="mt-6 text-xl font-bold text-gray-900">
                  Analyse mit Konto
                </h2>
                <p className="mt-2 text-gray-600">
                  Erstellen Sie ein kostenloses Konto und verfolgen Sie Ihren Status im Dashboard.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <BarChart3 className="h-4 w-4 shrink-0 text-amber-500" />
                    Pers&ouml;nliches Dashboard
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <FileText className="h-4 w-4 shrink-0 text-amber-500" />
                    Dokumente &amp; Ergebnisse einsehen
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Lock className="h-4 w-4 shrink-0 text-amber-500" />
                    Sicher &amp; DSGVO-konform
                  </li>
                </ul>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-600 group-hover:text-amber-700">
                  Konto erstellen &amp; starten
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>

            {/* Trust-Elemente */}
            <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-500" />
                100% kostenlos
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-brand-500" />
                DSGVO-konform
              </span>
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-brand-500" />
                Unverbindlich
              </span>
            </div>

            {/* Bereits ein Konto? */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Bereits ein Konto?{' '}
              <Link href="/login" className="font-medium text-brand-600 hover:text-brand-700">
                Jetzt anmelden
              </Link>{' '}
              und direkt eine neue Analyse starten.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

// Mini-Header
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
          <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
        </nav>
      </div>
    </header>
  )
}
