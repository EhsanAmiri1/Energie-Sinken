'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Mail, Lock, LogIn,
  ArrowRight, Eye, EyeOff,
} from 'lucide-react'
import { createClient } from '@/lib/supabase-browser'
import { ADMIN_EMAILS } from '@/lib/admin'

type FormMode = 'form' | 'submitting' | 'error'

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const next = searchParams.get('next') || '/dashboard'
  const callbackError = searchParams.get('error') || ''

  const [mode, setMode] = useState<FormMode>('form')
  const [errorMsg, setErrorMsg] = useState(callbackError)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMode('submitting')
    setErrorMsg('')

    const form = e.currentTarget
    const formData = new FormData(form)

    const email = formData.get('email') as string
    const passwort = formData.get('passwort') as string

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: passwort,
      })

      if (error) throw error

      const target = ADMIN_EMAILS.includes(email.toLowerCase()) ? '/admin' : next
      router.push(target)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.'
      if (message.includes('Invalid login credentials')) {
        setErrorMsg('E-Mail oder Passwort ist falsch.')
      } else if (message.includes('Email not confirmed')) {
        setErrorMsg('Bitte bestätigen Sie zuerst Ihre E-Mail-Adresse.')
      } else {
        setErrorMsg(message)
      }
      setMode('error')
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero-Bereich */}
        <section className="bg-energy-dark py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-energy-dark to-energy-dark" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-500/10 blur-3xl" />
          <div className="container-tight relative z-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm text-brand-300">
              <LogIn className="h-4 w-4" />
              Willkommen zurück
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              In Ihrem{' '}
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                Konto anmelden
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Melden Sie sich an, um Ihre Energiekosten-Analyse
              und Ihr persönliches Dashboard einzusehen.
            </p>
          </div>
        </section>

        {/* Formular */}
        <section className="py-16">
          <div className="container-tight">
            <form onSubmit={handleSubmit} className="mx-auto max-w-md">
              {/* Fehlermeldung */}
              {(mode === 'error' || callbackError) && errorMsg && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {errorMsg}
                </div>
              )}

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <Lock className="h-5 w-5 text-brand-500" />
                  Anmelden
                </h2>

                <div className="mt-6 grid gap-4">
                  {/* E-Mail */}
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
                        placeholder="Ihre E-Mail-Adresse"
                        className="block w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>
                  </div>

                  {/* Passwort */}
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
                        placeholder="Ihr Passwort"
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
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={mode === 'submitting'}
                  className="btn-primary mt-6 w-full py-4 text-lg"
                >
                  {mode === 'submitting' ? (
                    <>
                      <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Wird angemeldet...
                    </>
                  ) : (
                    <>
                      Anmelden
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>

                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>
                    Noch kein Konto?{' '}
                    <Link href="/registrieren" className="text-brand-600 font-medium hover:text-brand-700">
                      Jetzt registrieren
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

// Header
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
          <Link href="/registrieren" className="text-sm text-gray-300 hover:text-white transition-colors">
            Registrieren
          </Link>
        </nav>
      </div>
    </header>
  )
}
