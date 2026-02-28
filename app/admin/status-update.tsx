'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, CheckCircle2 } from 'lucide-react'

const statusOptions = [
  { value: 'neu', label: 'Neu' },
  { value: 'in_bearbeitung', label: 'In Bearbeitung' },
  { value: 'abgeschlossen', label: 'Abgeschlossen' },
]

export default function StatusUpdate({
  id,
  currentStatus,
}: {
  id: string
  currentStatus: string
}) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setSaving(true)
    setSaved(false)

    try {
      const res = await fetch(`/api/admin/anfrage/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!res.ok) throw new Error('Fehler beim Speichern')

      setSaved(true)
      router.refresh()
      setTimeout(() => setSaved(false), 3000)
    } catch {
      alert('Fehler beim Speichern. Bitte versuchen Sie es erneut.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-bold text-gray-900">Status ändern</h2>

      <div className="mt-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Aktueller Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSave}
        disabled={saving || status === currentStatus}
        className="btn-primary mt-6 w-full"
      >
        {saving ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Wird gespeichert...
          </>
        ) : saved ? (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Gespeichert
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Speichern
          </>
        )}
      </button>
    </div>
  )
}
