import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, User, Mail, Phone, Calendar,
  Hash, Zap, MapPin, FileText, ClipboardList, Download, Flame, Building2,
} from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { AnalyseAnfrage } from '@/types'
import StatusUpdate from '../../status-update'
import ErgebnisUpload from '../../ergebnis-upload'

export default async function AnfrageDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerSupabaseClient()

  const { data: anfrage } = await supabase
    .from('analyse_anfragen')
    .select('*')
    .eq('id', params.id)
    .single<AnalyseAnfrage>()

  if (!anfrage) notFound()

  const rows = [
    { icon: User, label: 'Vorname', value: anfrage.vorname },
    { icon: User, label: 'Nachname', value: anfrage.nachname },
    { icon: Calendar, label: 'Geburtsdatum', value: anfrage.geburtsdatum ? new Date(anfrage.geburtsdatum).toLocaleDateString('de-DE') : '—' },
    { icon: Mail, label: 'E-Mail', value: anfrage.email },
    { icon: Phone, label: 'Telefon', value: anfrage.telefon || '—' },
    { icon: anfrage.energie_typ === 'gas' ? Flame : Zap, label: 'Energieart', value: anfrage.energie_typ === 'gas' ? 'Gas' : 'Strom' },
    { icon: anfrage.kunden_typ === 'gewerbe' ? Building2 : User, label: 'Kundentyp', value: anfrage.kunden_typ === 'gewerbe' ? 'Gewerbe' : 'Privat' },
    { icon: Hash, label: 'Zählernummer', value: anfrage.zaehler_nummer || '—' },
    { icon: Zap, label: 'Verbrauch', value: anfrage.verbrauch_kwh ? `${Number(anfrage.verbrauch_kwh).toLocaleString('de-DE')} kWh` : '—' },
    { icon: MapPin, label: 'Marktlokations-ID', value: anfrage.marktlokations_id || '—' },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zu Leads
        </Link>
        <h1 className="text-2xl font-bold text-white">
          {anfrage.vorname}{' '}
          <span className="text-brand-400">{anfrage.nachname}</span>
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Eingereicht am {new Date(anfrage.created_at).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Kundendaten */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
              <ClipboardList className="h-5 w-5 text-brand-400" />
              Kundendaten
            </h2>
            <div className="mt-6 divide-y divide-gray-800/50">
              {rows.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 py-3">
                  <Icon className="h-4 w-4 shrink-0 text-gray-500" />
                  <span className="w-40 shrink-0 text-sm font-medium text-gray-400">{label}</span>
                  <span className="text-sm text-gray-200">{value}</span>
                </div>
              ))}

              {/* Abrechnung mit Download-Link */}
              <div className="flex items-center gap-3 py-3">
                <FileText className="h-4 w-4 shrink-0 text-gray-500" />
                <span className="w-40 shrink-0 text-sm font-medium text-gray-400">Abrechnung</span>
                {anfrage.abrechnung_path ? (
                  <a
                    href={`/api/admin/anfrage/${anfrage.id}/datei`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-500/10 border border-brand-500/20 px-3 py-1.5 text-sm font-medium text-brand-400 hover:bg-brand-500/20 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    {anfrage.abrechnung_filename || 'Datei öffnen'}
                  </a>
                ) : (
                  <span className="text-sm text-gray-500">Keine Datei hochgeladen</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status & Ergebnis */}
        <div className="lg:col-span-1 space-y-6">
          <StatusUpdate
            id={anfrage.id}
            currentStatus={anfrage.status}
          />
          <ErgebnisUpload
            id={anfrage.id}
            ergebnis_filename={anfrage.ergebnis_filename}
            ersparnis_euro={anfrage.ersparnis_euro}
          />
        </div>
      </div>
    </div>
  )
}
