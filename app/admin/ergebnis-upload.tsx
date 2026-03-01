'use client'

import { useState, useRef } from 'react'
import {
  Upload, FileText, X, Euro, CheckCircle2, Send,
} from 'lucide-react'

type UploadMode = 'idle' | 'uploading' | 'success' | 'error'

export default function ErgebnisUpload({
  id,
  ergebnis_filename,
  ersparnis_euro,
}: {
  id: string
  ergebnis_filename?: string | null
  ersparnis_euro?: number | null
}) {
  const [mode, setMode] = useState<UploadMode>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [gespeichert, setGespeichert] = useState(!!ergebnis_filename)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMode('uploading')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch(`/api/admin/anfrage/${id}/ergebnis`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten.')
      }

      if (data.emailError) {
        setErrorMsg(`Datei gespeichert, aber E-Mail fehlgeschlagen: ${data.emailError}`)
        setMode('error')
        return
      }

      setMode('success')
      setGespeichert(true)
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

  // Bereits hochgeladenes Ergebnis anzeigen
  if (gespeichert && mode !== 'error') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          Ergebnis gesendet
        </h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <FileText className="h-4 w-4 text-green-600" />
            <span className="font-medium">{ergebnis_filename || fileName}</span>
          </div>
          {(ersparnis_euro || mode === 'success') && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Euro className="h-4 w-4 text-green-600" />
              <span className="font-medium">
                {ersparnis_euro
                  ? `${Number(ersparnis_euro).toLocaleString('de-DE', { minimumFractionDigits: 2 })} € / Jahr`
                  : 'Ersparnis gespeichert'
                }
              </span>
            </div>
          )}
          {mode === 'success' && (
            <p className="text-xs text-green-700 mt-2">
              E-Mail mit Ergebnis wurde an den Kunden gesendet.
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
        <Send className="h-5 w-5 text-brand-500" />
        Ergebnis hochladen
      </h3>
      <p className="mt-1 text-xs text-gray-500">
        Datei wird an den Kunden per E-Mail gesendet.
      </p>

      {mode === 'error' && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Datei-Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ergebnis-Datei <span className="text-red-500">*</span>
          </label>
          {fileName ? (
            <div className="flex items-center justify-between rounded-lg border border-brand-200 bg-brand-50 p-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-brand-600" />
                <span className="text-xs font-medium text-brand-800 truncate max-w-[150px]">
                  {fileName}
                </span>
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="rounded p-0.5 text-brand-600 hover:bg-brand-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <label
              htmlFor={`ergebnis-${id}`}
              className="flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition-colors hover:border-brand-400 hover:bg-brand-50/50"
            >
              <Upload className="h-6 w-6 text-gray-400" />
              <span className="mt-1 text-xs font-medium text-gray-600">PDF oder JPG</span>
            </label>
          )}
          <input
            ref={fileInputRef}
            id={`ergebnis-${id}`}
            name="datei"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
            required
          />
        </div>

        {/* Ersparnis-Betrag */}
        <div>
          <label htmlFor={`ersparnis-${id}`} className="block text-sm font-medium text-gray-700 mb-1">
            Ersparnis (€ / Jahr) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Euro className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id={`ersparnis-${id}`}
              name="ersparnis_euro"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="z.B. 450.00"
              className="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={mode === 'uploading'}
          className="btn-primary w-full py-3 text-sm"
        >
          {mode === 'uploading' ? (
            <>
              <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Wird gesendet...
            </>
          ) : (
            <>
              <Send className="mr-1.5 h-4 w-4" />
              Ergebnis senden
            </>
          )}
        </button>
      </form>
    </div>
  )
}
