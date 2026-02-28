'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Lock, KeyRound, Eye, EyeOff,
  ArrowRight, CheckCircle2,
} from 'lucide-react'
import { createClient } from '@/lib/supabase-browser'

type FormMode = 'form' | 'submitting' | 'success' | 'error'

export default function PasswortResetPage() {
  const router = useRouter()
  const [mode, setMode] = useState<FormMode>('form')
  const [errorMsg, setErrorMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMode('submitting')
    setErrorMsg('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const passwort = formData.get('passwort') as string
    const passwortConfirm = formData.get('passwort_confirm') as string

    if (passwort.length < 8) {
      setErrorMsg('Das Passwort muss mindestens 8 Zeichen lang sein.')
      setMode('error')
      return
    }

    if (passwort !== passwortConfirm) {
      setErrorMsg('Die Passwörter stimmen nicht überein.')
      setMode('error')
      return
    }

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.updateUser({
        password: passwort,
      })

      if (error) throw error

      setMode('success')
      setTimeout(() => router.push('/login'), 3000)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.'
      setErrorMsg(message)
      setMode('error')
    }
  }

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
                Passwort geändert!
              </h1>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Ihr Passwort wurde erfolgreich geändert.
                Sie werden automatisch zum Login weitergeleitet...
              </p>
              <div className="mt-8">
                <Link href="/login" className="btn-primary">
                  Zum Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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
        <section className="bg-energy-dark py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-energy-dark to-energy-dark" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-500/10 blur-3xl" />
          <div className="container-tight relative z-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm text-brand-300">
              <KeyRound className="h-4 w-4" />
              Neues Passwort festlegen
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Neues{' '}
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                Passwort
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Geben Sie Ihr neues Passwort ein.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-tight">
            <form onSubmit={handleSubmit} className="mx-auto max-w-md">
              {mode === 'error' && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {errorMsg}
                </div>
              )}

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <Lock className="h-5 w-5 text-brand-500" />
                  Neues Passwort
                </h2>

                <div className="mt-6 grid gap-4">
                  <div>
                    <label htmlFor="passwort" className="block text-sm font-medium text-gray-700">
                      Neues Passwort <span className="text-red-500">*</span>
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
                      Passwort bestätigen <span className="text-red-500">*</span>
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
                      Wird gespeichert...
                    </>
                  ) : (
                    <>
                      Passwort ändern
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
