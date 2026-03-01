'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, Upload, FileText, X,
  Zap, Flame, User, Building2, Hash, MapPin,
} from 'lucide-react'
import { createClient } from '@/lib/supabase-browser'

type FormMode = 'loading' | 'form' | 'uploading' | 'success' | 'error'

export default function NeueAnfragePage() {
  const router = useRouter()
  const [mode, setMode] = useState<FormMode>('loading')
  const [errorMsg, setErrorMsg] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [userData, setUserData] = useState({ vorname: '', nachname: '', email: '', telefon: '' })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function loadUserData() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      // Profil laden
      const { data: profile } = await supabase
        .from('profiles')
        .select('vorname, nachname, email, telefon')
        .eq('id', user.id)
        .single()

      if (profile) {
        setUserData({
          vorname: profile.vorname || '',
          nachname: profile.nachname || '',
          email: profile.email || user.email || '',
          telefon: profile.telefon || '',
        })
      } else {
        // Fallback: Aus neuester Anfrage
        const { data: anfrage } = await supabase
          .from('analyse_anfragen')
          .select('vorname, nachname, email, telefon')
          .eq('email', user.email!)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        setUserData({
          vorname: anfrage?.vorname || '',
          nachname: anfrage?.nachname || '',
          email: anfrage?.email || user.email || '',
          telefon: anfrage?.telefon || '',
        })
      }

      setMode('form')
    }

    loadUserData()
  }, [router])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMode('uploading')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch('/api/analyse', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Ein Fehler ist aufgetreten.')
      }

      setMode('success')
      setTimeout(() => router.push('/dashboard'), 1500)
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
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  if (mode === 'loading') {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 pt-20">
          <div className="container-tight py-24 text-center">
            <svg className="mx-auto h-8 w-8 animate-spin text-brand-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="mt-4 text-gray-500">Wird geladen...</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <section className="bg-energy-dark py-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-energy-dark to-energy-dark" />
          <div className="container-tight relative z-10">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zum Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Neue{' '}
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                Analyse
              </span>{' '}
              erstellen
            </h1>
            <p className="mt-2 text-gray-300">
              Erstellen Sie eine weitere Analyse für einen Strom- oder Gaszähler.
            </p>
          </div>
        </section>

        {/* Formular */}
        <section className="py-10">
          <div className="container-tight">
            <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
              {mode === 'error' && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {errorMsg}
                </div>
              )}

              {mode === 'success' && (
                <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                  Analyse erfolgreich erstellt! Sie werden weitergeleitet...
                </div>
              )}

              {/* Hidden Fields — persönliche Daten */}
              <input type="hidden" name="vorname" value={userData.vorname} />
              <input type="hidden" name="nachname" value={userData.nachname} />
              <input type="hidden" name="email" value={userData.email} />
              <input type="hidden" name="telefon" value={userData.telefon} />

              {/* Angebotstyp */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
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
                  Falls Sie die Daten von Ihrer Abrechnung haben.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="zaehler_nummer" className="block text-sm font-medium text-gray-700">
                      Zählernummer
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
                  Optional — Foto oder PDF Ihrer letzten Abrechnung.
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

              {/* Submit */}
              <button
                type="submit"
                disabled={mode === 'uploading' || mode === 'success'}
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
                    Analyse erstellen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
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
        <Link href="/dashboard" className="text-lg font-bold text-white">
          <span className="text-brand-400">Energiekosten</span> Sinken
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  )
}
