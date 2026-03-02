'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Upload, FileText, CheckCircle2, User, Mail,
  Phone, Calendar, Zap, Hash, MapPin, ShieldCheck, ArrowLeft, X,
  Flame, Building2,
} from 'lucide-react'

type FormMode = 'form' | 'uploading' | 'success' | 'error'

export default function GastAnalysePage() {
  const [mode, setMode] = useState<FormMode>('form')
  const [errorMsg, setErrorMsg] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMode('uploading')
    setErrorMsg('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get('email') as string

    try {
      const response = await fetch('/api/analyse', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Ein Fehler ist aufgetreten.')
      }

      setSubmittedEmail(email)
      setMode('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.')
      setMode('error')
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setFileName(file ? file.name : null)
  }

  function clearFile() {
    setFileName(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Erfolgsseite
  if (mode === 'success') {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 pt-20">
          <div className="container-tight py-24">
            <div className="mx-auto max-w-lg text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-100">
                <CheckCircle2 className="h-10 w-10 text-brand-500" />
              </div>
              <h1 className="mt-6 text-3xl font-bold text-gray-900">
                Analyse erfolgreich gestartet!
              </h1>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Vielen Dank! Wir haben Ihre Daten erhalten und analysieren jetzt Ihre
                Energiekosten. Sie erhalten in K&uuml;rze eine E-Mail mit weiteren Informationen.
              </p>
              <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50 p-6">
                <p className="text-sm font-medium text-brand-800">
                  Tipp: Pr&uuml;fen Sie Ihren Posteingang (und ggf. den Spam-Ordner)
                  f&uuml;r Ihre Best&auml;tigungs-E-Mail.
                </p>
              </div>

              {/* Prominenter Konto-erstellen-CTA */}
              <div className="mt-8 rounded-2xl border-2 border-amber-300 bg-amber-50 p-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Ergebnis im Dashboard verfolgen?
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Erstellen Sie jetzt ein kostenloses Konto, um Ihre Analyse
                  jederzeit im pers&ouml;nlichen Dashboard einzusehen.
                </p>
                <Link
                  href={`/registrieren?email=${encodeURIComponent(submittedEmail)}`}
                  className="btn-primary mt-4 inline-flex w-full justify-center py-3"
                >
                  Kostenloses Konto erstellen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <Link
                href="/"
                className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-4 w-4" />
                Zur&uuml;ck zur Startseite
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero-Bereich */}
        <section className="bg-energy-dark py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-energy-dark to-energy-dark" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-500/10 blur-3xl" />
          <div className="container-tight relative z-10">
            <Link
              href="/analyse"
              className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Zur&uuml;ck zur Auswahl
            </Link>
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm text-brand-300">
                <ShieldCheck className="h-4 w-4" />
                Kein Login erforderlich &mdash; 100% kostenlos
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Schnell-
                <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                  Analyse
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                Geben Sie Ihre Daten ein oder laden Sie Ihre Jahresabrechnung hoch.
                Wir finden das beste Angebot f&uuml;r Sie.
              </p>
            </div>
          </div>
        </section>

        {/* Formular */}
        <section className="py-16">
          <div className="container-tight">
            <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
              {/* Hidden: Anfrage-Typ */}
              <input type="hidden" name="anfrage_typ" value="gast" />

              {/* Fehlermeldung */}
              {mode === 'error' && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {errorMsg}
                </div>
              )}

              {/* Persönliche Daten */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <User className="h-5 w-5 text-brand-500" />
                  Pers&ouml;nliche Daten
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="vorname" className="block text-sm font-medium text-gray-700">
                      Vorname <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="vorname"
                      name="vorname"
                      type="text"
                      required
                      placeholder="Max"
                      className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="nachname" className="block text-sm font-medium text-gray-700">
                      Nachname <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="nachname"
                      name="nachname"
                      type="text"
                      required
                      placeholder="Mustermann"
                      className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="geburtsdatum" className="block text-sm font-medium text-gray-700">
                      Geburtsdatum
                    </label>
                    <div className="relative mt-1">
                      <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        id="geburtsdatum"
                        name="geburtsdatum"
                        type="date"
                        className="block w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      E-Mail <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-1">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="max@beispiel.de"
                        className="block w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="telefon" className="block text-sm font-medium text-gray-700">
                      Telefon
                    </label>
                    <div className="relative mt-1">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        id="telefon"
                        name="telefon"
                        type="tel"
                        placeholder="+49 123 456789"
                        className="block w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Angebotstyp */}
              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <Zap className="h-5 w-5 text-brand-500" />
                  Angebotstyp
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Energieart <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 flex gap-3">
                      <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition-colors has-[:checked]:border-amber-400 has-[:checked]:bg-amber-50 has-[:checked]:text-amber-800">
                        <input type="radio" name="energie_typ" value="strom" defaultChecked className="sr-only" />
                        <Zap className="h-4 w-4" />
                        Strom
                      </label>
                      <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition-colors has-[:checked]:border-orange-400 has-[:checked]:bg-orange-50 has-[:checked]:text-orange-800">
                        <input type="radio" name="energie_typ" value="gas" className="sr-only" />
                        <Flame className="h-4 w-4" />
                        Gas
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Kundentyp <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 flex gap-3">
                      <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition-colors has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-800">
                        <input type="radio" name="kunden_typ" value="privat" defaultChecked className="sr-only" />
                        <User className="h-4 w-4" />
                        Privat
                      </label>
                      <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition-colors has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-800">
                        <input type="radio" name="kunden_typ" value="gewerbe" className="sr-only" />
                        <Building2 className="h-4 w-4" />
                        Gewerbe
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Energiedaten */}
              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <Zap className="h-5 w-5 text-energy-yellow" />
                  Energiedaten
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Optional &mdash; Falls Sie die Daten von Ihrer Abrechnung haben.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="zaehler_nummer" className="block text-sm font-medium text-gray-700">
                      Z&auml;hlernummer
                    </label>
                    <div className="relative mt-1">
                      <Hash className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        id="zaehler_nummer"
                        name="zaehler_nummer"
                        type="text"
                        placeholder="z.B. 1ESY1234567890"
                        className="block w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="verbrauch_kwh" className="block text-sm font-medium text-gray-700">
                      Jahresverbrauch (kWh)
                    </label>
                    <div className="relative mt-1">
                      <Zap className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        id="verbrauch_kwh"
                        name="verbrauch_kwh"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="z.B. 3500"
                        className="block w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="marktlokations_id" className="block text-sm font-medium text-gray-700">
                      Marktlokations-ID
                    </label>
                    <div className="relative mt-1">
                      <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        id="marktlokations_id"
                        name="marktlokations_id"
                        type="text"
                        placeholder="z.B. DE000561234567890000000000012345"
                        className="block w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Datei-Upload */}
              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <FileText className="h-5 w-5 text-energy-orange" />
                  Jahresabrechnung hochladen
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Optional &mdash; Laden Sie ein Foto oder PDF Ihrer letzten Abrechnung hoch.
                </p>

                <div className="mt-6">
                  {fileName ? (
                    <div className="flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50 p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-brand-600" />
                        <span className="text-sm font-medium text-brand-800 truncate max-w-xs">
                          {fileName}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={clearFile}
                        className="rounded-lg p-1 text-brand-600 hover:bg-brand-100 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="abrechnung"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-colors hover:border-brand-400 hover:bg-brand-50/50"
                    >
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="mt-3 text-sm font-medium text-gray-700">
                        Klicken zum Hochladen
                      </span>
                      <span className="mt-1 text-xs text-gray-500">
                        PDF, JPG oder PNG (max. 10 MB)
                      </span>
                    </label>
                  )}
                  <input
                    ref={fileInputRef}
                    id="abrechnung"
                    name="abrechnung"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Datenschutz & Submit */}
              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                  <span className="text-sm text-gray-600">
                    Ich stimme der Verarbeitung meiner Daten gem&auml;&szlig; der{' '}
                    <Link href="/datenschutz" className="text-brand-600 underline hover:text-brand-700">
                      Datenschutzerkl&auml;rung
                    </Link>{' '}
                    zu. Meine Daten werden ausschlie&szlig;lich zur Energiekosten-Analyse verwendet.
                    <span className="text-red-500"> *</span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={mode === 'uploading'}
                  className="btn-primary mt-6 w-full py-4 text-lg"
                >
                  {mode === 'uploading' ? (
                    <>
                      <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      Kostenlose Analyse starten
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
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
