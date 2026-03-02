'use client'

import { useState } from 'react'
import { UserPlus, CheckCircle2, Mail } from 'lucide-react'

export default function InviteButton({ id, email }: { id: string; email: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleInvite() {
    setStatus('sending')

    try {
      const res = await fetch(`/api/admin/anfrage/${id}/invite`, {
        method: 'POST',
      })

      if (!res.ok) throw new Error('Fehler beim Senden')

      setStatus('sent')
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
      <h2 className="text-lg font-semibold text-white">Kunde einladen</h2>
      <p className="mt-2 text-sm text-gray-400">
        Senden Sie eine Einladung an <strong className="text-gray-300">{email}</strong>,
        um ein Konto zu erstellen.
      </p>
      <button
        onClick={handleInvite}
        disabled={status === 'sending' || status === 'sent'}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'sending' ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Wird gesendet...
          </>
        ) : status === 'sent' ? (
          <>
            <CheckCircle2 className="h-4 w-4" />
            Einladung gesendet
          </>
        ) : status === 'error' ? (
          <>
            <Mail className="h-4 w-4" />
            Fehler — Erneut versuchen
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4" />
            Einladung senden
          </>
        )}
      </button>
    </div>
  )
}
