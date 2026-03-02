'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Zap, Flame, Search, Download, Filter,
} from 'lucide-react'
import type { AnalyseAnfrage } from '@/types'

export default function LeadsFilter({ anfragen }: { anfragen: AnalyseAnfrage[] }) {
  const [suchbegriff, setSuchbegriff] = useState('')
  const [statusFilter, setStatusFilter] = useState('alle')
  const [typFilter, setTypFilter] = useState('alle')
  const [kundenFilter, setKundenFilter] = useState('alle')
  const [anfrageTypFilter, setAnfrageTypFilter] = useState('alle')

  const gefiltert = useMemo(() => {
    return anfragen.filter((a) => {
      if (statusFilter !== 'alle' && a.status !== statusFilter) return false
      if (typFilter !== 'alle' && a.energie_typ !== typFilter) return false
      if (kundenFilter !== 'alle' && a.kunden_typ !== kundenFilter) return false
      if (anfrageTypFilter !== 'alle' && a.anfrage_typ !== anfrageTypFilter) return false
      if (suchbegriff) {
        const s = suchbegriff.toLowerCase()
        const match =
          a.vorname.toLowerCase().includes(s) ||
          a.nachname.toLowerCase().includes(s) ||
          a.email.toLowerCase().includes(s) ||
          (a.telefon && a.telefon.toLowerCase().includes(s))
        if (!match) return false
      }
      return true
    })
  }, [anfragen, suchbegriff, statusFilter, typFilter, kundenFilter, anfrageTypFilter])

  function exportCSV() {
    const header = 'Vorname;Nachname;E-Mail;Telefon;Energietyp;Kundentyp;Anfrage-Typ;Verbrauch kWh;Status;Datum\n'
    const rows = gefiltert.map((a) =>
      [
        a.vorname, a.nachname, a.email, a.telefon || '',
        a.energie_typ, a.kunden_typ, a.anfrage_typ || 'gast',
        a.verbrauch_kwh || '', a.status,
        new Date(a.created_at).toLocaleDateString('de-DE'),
      ].join(';')
    ).join('\n')
    const blob = new Blob(['\ufeff' + header + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {/* Filter-Leiste */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 mb-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Name, E-Mail oder Telefon suchen..."
              value={suchbegriff}
              onChange={(e) => setSuchbegriff(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-9 pr-3 text-sm text-gray-200 placeholder-gray-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-brand-500 focus:outline-none"
          >
            <option value="alle">Alle Status</option>
            <option value="neu">Neu</option>
            <option value="in_bearbeitung">In Bearbeitung</option>
            <option value="angebot_geschickt">Angebot geschickt</option>
            <option value="abgeschlossen">Abgeschlossen</option>
          </select>
          <select
            value={typFilter}
            onChange={(e) => setTypFilter(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-brand-500 focus:outline-none"
          >
            <option value="alle">Strom & Gas</option>
            <option value="strom">Strom</option>
            <option value="gas">Gas</option>
          </select>
          <select
            value={kundenFilter}
            onChange={(e) => setKundenFilter(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-brand-500 focus:outline-none"
          >
            <option value="alle">Alle Kunden</option>
            <option value="privat">Privat</option>
            <option value="gewerbe">Gewerbe</option>
          </select>
          <select
            value={anfrageTypFilter}
            onChange={(e) => setAnfrageTypFilter(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-brand-500 focus:outline-none"
          >
            <option value="alle">Gast &amp; Registriert</option>
            <option value="gast">Gast</option>
            <option value="registriert">Registriert</option>
          </select>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <Download className="h-4 w-4" />
            CSV
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          {gefiltert.length} von {anfragen.length} Anfragen
        </p>
      </div>

      {/* Tabelle */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
        {gefiltert.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            Keine Anfragen gefunden.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-800 bg-gray-900/80">
                <tr>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">E-Mail</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Telefon</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Typ</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Verbrauch</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Anfrage</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Datum</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {gefiltert.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-200">
                      {a.vorname} {a.nachname}
                    </td>
                    <td className="px-5 py-3 text-gray-400">{a.email}</td>
                    <td className="px-5 py-3 text-gray-400 hidden sm:table-cell">{a.telefon || '—'}</td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <div className="flex gap-1.5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          a.energie_typ === 'gas'
                            ? 'bg-orange-500/15 text-orange-400'
                            : 'bg-amber-500/15 text-amber-400'
                        }`}>
                          {a.energie_typ === 'gas' ? <Flame className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
                          {a.energie_typ === 'gas' ? 'Gas' : 'Strom'}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-gray-800 px-2 py-0.5 text-[11px] font-medium text-gray-400">
                          {a.kunden_typ === 'gewerbe' ? 'Gewerbe' : 'Privat'}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-400 hidden lg:table-cell">
                      {a.verbrauch_kwh ? `${Number(a.verbrauch_kwh).toLocaleString('de-DE')} kWh` : '—'}
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        a.anfrage_typ === 'registriert'
                          ? 'bg-brand-500/15 text-brand-400'
                          : 'bg-gray-700/50 text-gray-400'
                      }`}>
                        {a.anfrage_typ === 'registriert' ? 'Registriert' : 'Gast'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs hidden lg:table-cell">
                      {new Date(a.created_at).toLocaleDateString('de-DE')}
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/anfrage/${a.id}`}
                        className="inline-flex items-center gap-1 text-brand-400 text-xs font-medium hover:text-brand-300 transition-colors"
                      >
                        Details
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string; bg: string }> = {
    neu: { label: 'Neu', color: 'text-brand-400', bg: 'bg-brand-500/15' },
    in_bearbeitung: { label: 'In Bearbeitung', color: 'text-amber-400', bg: 'bg-amber-500/15' },
    angebot_geschickt: { label: 'Angebot geschickt', color: 'text-blue-400', bg: 'bg-blue-500/15' },
    abgeschlossen: { label: 'Abgeschlossen', color: 'text-green-400', bg: 'bg-green-500/15' },
  }
  const c = config[status] || config.neu
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${c.bg} ${c.color}`}>
      {c.label}
    </span>
  )
}
