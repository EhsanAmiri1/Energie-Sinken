'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRight, ArrowLeft, Upload, FileText, X, CheckCircle2,
  Zap, Flame, User, Building2, Hash, MapPin, Mail, Lock,
  Phone, Eye, EyeOff, Shield,
} from 'lucide-react'
import { createClient } from '@/lib/supabase-browser'

type Step = 'loading' | 'register' | 'confirm_email' | 'energy_data' | 'uploading' | 'success'

export default function KontoAnalysePage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('loading')
  const [errorMsg, setErrorMsg] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [userData, setUserData] = useState({
    userId: '',
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Beim Laden: Auth-Status prüfen
  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Eingeloggt → Profil laden → Energiedaten-Schritt
        const { data: profile } = await supabase
          .from('profiles')
          .select('vorname, nachname, email, telefon')
          .eq('id', user.id)
          .single()

        setUserData({
          userId: user.id,
          vorname: profile?.vorname || '',
          nachname: profile?.nachname || '',
          email: profile?.email || user.email || '',
          telefon: profile?.telefon || '',
        })
        setStep('energy_data')
      } else {
        // Nicht eingeloggt → Registrieren
        setStep('register')
      }
    }

    checkAuth()
  }, [])

  // Registrierung absenden
  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg('')

    const form = e.currentTarget
    const formData = new FormData(form)

    const vorname = formData.get('vorname') as string
    const nachname = formData.get('nachname') as string
    const email = formData.get('email') as string
    const telefon = formData.get('telefon') as string
    const passwort = formData.get('passwort') as string
    const passwortConfirm = formData.get('passwort_confirm') as string

    if (passwort.length < 8) {
      setErrorMsg('Das Passwort muss mindestens 8 Zeichen lang sein.')
      return
    }

    if (passwort !== passwortConfirm) {
      setErrorMsg('Die Passw\u00f6rter stimmen nicht \u00fcberein.')
      return
    }

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.signUp({
        email,
        password: passwort,
        options: {
          data: { vorname, nachname, telefon },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/analyse/konto`,
        },
      })

      if (error) {
        if (error.message.includes('already registered')) {
          setErrorMsg('Diese E-Mail-Adresse ist bereits registriert. Bitte melden Sie sich an.')
          return
        }
        throw error
      }

      // Daten merken für später
      setUserData({ userId: '', vorname, nachname, email, telefon })
      setStep('confirm_email')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.')
    }
  }

  // Energiedaten absenden
  async function handleEnergySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStep('uploading')
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

      setStep('success')
      setTimeout(() => router.push('/dashboard'), 2000)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.')
      setStep('energy_data')
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

  // ===== LOADING =====
  if (step === 'loading') {
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

  // ===== ERFOLG =====
  if (step === 'success') {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 pt-20">
          <div className="container-tight py-24 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-100">
              <CheckCircle2 className="h-10 w-10 text-brand-500" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              Analyse erfolgreich gestartet!
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Sie werden in K&uuml;rze zu Ihrem Dashboard weitergeleitet...
            </p>
          </div>
        </main>
      </>
    )
  }

  // ===== E-MAIL BESTÄTIGEN =====
  if (step === 'confirm_email') {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 pt-20">
          <div className="container-tight py-24">
            <div className="mx-auto max-w-lg text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-100">
                <Mail className="h-10 w-10 text-brand-500" />
              </div>
              <h1 className="mt-6 text-3xl font-bold text-gray-900">
                E-Mail best&auml;tigen
              </h1>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Wir haben Ihnen eine Best&auml;tigungs-E-Mail an{' '}
                <strong className="text-gray-900">{userData.email}</strong>{' '}
                gesendet. Bitte klicken Sie auf den Link in der E-Mail, um fortzufahren.
              </p>
              <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
                <p className="text-sm font-medium text-amber-800">
                  Nach der Best&auml;tigung werden Sie automatisch zur&uuml;ckgeleitet,
                  um Ihre Energiedaten einzugeben.
                </p>
              </div>
              <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
                <p className="text-sm text-gray-600">
                  Keine E-Mail erhalten? Pr&uuml;fen Sie Ihren Spam-Ordner oder{' '}
                  <button
                    onClick={() => setStep('register')}
                    className="text-brand-600 font-medium hover:text-brand-700"
                  >
                    versuchen Sie es erneut
                  </button>
                  .
                </p>
              </div>
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
        {/* Hero */}
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
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
                <Shield className="h-4 w-4" />
                {step === 'register' ? 'Schritt 1 von 2 — Konto erstellen' : 'Schritt 2 von 2 — Energiedaten'}
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Analyse{' '}
                <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                  mit Konto
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                {step === 'register'
                  ? 'Erstellen Sie Ihr kostenloses Konto, um Ihre Analyse im Dashboard zu verfolgen.'
                  : 'Geben Sie Ihre Energiedaten ein oder laden Sie Ihre Abrechnung hoch.'}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-tight">
            {/* Fehlermeldung */}
            {errorMsg && (
              <div className="mx-auto mb-6 max-w-2xl rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {errorMsg}
              </div>
            )}

            {/* ===== REGISTRIEREN STEP ===== */}
            {step === 'register' && (
              <form onSubmit={handleRegister} className="mx-auto max-w-2xl">
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
                    <div>
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

                {/* Passwort */}
                <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Lock className="h-5 w-5 text-brand-500" />
                    Passwort w&auml;hlen
                  </h2>

                  <div className="mt-6 grid gap-4">
                    <div>
                      <label htmlFor="passwort" className="block text-sm font-medium text-gray-700">
                        Passwort <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-1">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          id="passwort"
                          name="passwort"
                          type={showPassword ? 'text' : 'password'}
                          required
                          minLength={8}
                          placeholder="Mindestens 8 Zeichen"
                          className="block w-full rounded-xl border border-gray-300 py-3 pl-10 pr-12 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Mindestens 8 Zeichen</p>
                    </div>
                    <div>
                      <label htmlFor="passwort_confirm" className="block text-sm font-medium text-gray-700">
                        Passwort best&auml;tigen <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-1">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          id="passwort_confirm"
                          name="passwort_confirm"
                          type={showConfirm ? 'text' : 'password'}
                          required
                          minLength={8}
                          placeholder="Passwort wiederholen"
                          className="block w-full rounded-xl border border-gray-300 py-3 pl-10 pr-12 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
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
                      zu.
                      <span className="text-red-500"> *</span>
                    </span>
                  </label>

                  <button type="submit" className="btn-primary mt-6 w-full py-4 text-lg">
                    Konto erstellen &amp; weiter
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>

                  <p className="mt-4 text-center text-sm text-gray-500">
                    Bereits ein Konto?{' '}
                    <Link href="/login" className="font-medium text-brand-600 hover:text-brand-700">
                      Jetzt anmelden
                    </Link>
                  </p>
                </div>
              </form>
            )}

            {/* ===== ENERGIEDATEN STEP ===== */}
            {(step === 'energy_data' || step === 'uploading') && (
              <form onSubmit={handleEnergySubmit} className="mx-auto max-w-2xl">
                {/* Hidden Fields */}
                <input type="hidden" name="anfrage_typ" value="registriert" />
                <input type="hidden" name="user_id" value={userData.userId} />
                <input type="hidden" name="vorname" value={userData.vorname} />
                <input type="hidden" name="nachname" value={userData.nachname} />
                <input type="hidden" name="email" value={userData.email} />
                <input type="hidden" name="telefon" value={userData.telefon} />

                {/* Info: Eingeloggt als */}
                <div className="mb-6 rounded-xl border border-brand-200 bg-brand-50 p-4">
                  <p className="text-sm text-brand-800">
                    Eingeloggt als <strong>{userData.vorname} {userData.nachname}</strong> ({userData.email})
                  </p>
                </div>

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
                    Optional &mdash; Foto oder PDF Ihrer letzten Abrechnung.
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
                  disabled={step === 'uploading'}
                  className="btn-primary mt-6 w-full py-4 text-lg"
                >
                  {step === 'uploading' ? (
                    <>
                      <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      Analyse starten
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            )}
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
