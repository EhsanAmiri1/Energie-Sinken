import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { AnalyseAnfrage } from '@/types'
import {
  Users, AlertCircle, Clock, CheckCircle2, Send,
  TrendingUp, Eye, MousePointer, ArrowUpRight, ArrowDownRight, Globe,
} from 'lucide-react'
import DashboardCharts from './components/dashboard-charts'

export default async function AdminDashboardPage() {
  const supabase = createServerSupabaseClient()

  const { data: anfragen } = await supabase
    .from('analyse_anfragen')
    .select('*')
    .order('created_at', { ascending: false })

  const alle = (anfragen as AnalyseAnfrage[]) || []
  const neu = alle.filter((a) => a.status === 'neu')
  const inBearbeitung = alle.filter((a) => a.status === 'in_bearbeitung')
  const angebotGeschickt = alle.filter((a) => a.status === 'angebot_geschickt')
  const abgeschlossen = alle.filter((a) => a.status === 'abgeschlossen')

  // Letzte 5 Anfragen für "Neueste Leads"
  const letzteAnfragen = alle.slice(0, 5)

  const leadStats = [
    { label: 'Gesamt', value: alle.length, icon: Users, color: 'text-gray-400', bg: 'bg-gray-800/50', border: 'border-gray-700' },
    { label: 'Neu', value: neu.length, icon: AlertCircle, color: 'text-brand-400', bg: 'bg-brand-500/10', border: 'border-brand-500/20' },
    { label: 'In Bearbeitung', value: inBearbeitung.length, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { label: 'Angebot geschickt', value: angebotGeschickt.length, icon: Send, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: 'Abgeschlossen', value: abgeschlossen.length, icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-400">Übersicht aller Kennzahlen</p>
      </div>

      {/* Visitor Overview Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
        <StatCard
          label="Besucher heute"
          value="127"
          change="+12%"
          trend="up"
          icon={<Eye className="h-4 w-4" />}
        />
        <StatCard
          label="Diese Woche"
          value="892"
          change="+16.7%"
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          label="Diesen Monat"
          value="3.847"
          change="+20.2%"
          trend="up"
          icon={<Globe className="h-4 w-4" />}
        />
        <StatCard
          label="Conversions"
          value="29"
          change="+8.3%"
          trend="up"
          icon={<MousePointer className="h-4 w-4" />}
        />
      </div>

      {/* Lead Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 mb-8">
        {leadStats.map((s) => (
          <div key={s.label} className={`rounded-xl border ${s.border} ${s.bg} p-4`}>
            <div className="flex items-center gap-2">
              <s.icon className={`h-4 w-4 ${s.color}`} />
              <span className="text-xs font-medium text-gray-500">{s.label}</span>
            </div>
            <p className={`mt-1.5 text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Charts + Neueste Leads */}
      <DashboardCharts />

      {/* Neueste Leads */}
      <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
        <div className="border-b border-gray-800 px-5 py-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Neueste Leads</h2>
          <a href="/admin/leads" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
            Alle anzeigen &rarr;
          </a>
        </div>
        {letzteAnfragen.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">Noch keine Anfragen vorhanden.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-800 bg-gray-900/80">
                <tr>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Typ</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Datum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {letzteAnfragen.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-5 py-3">
                      <a href={`/admin/anfrage/${a.id}`} className="font-medium text-gray-200 hover:text-brand-400 transition-colors">
                        {a.vorname} {a.nachname}
                      </a>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs text-gray-400">
                        {a.energie_typ === 'gas' ? 'Gas' : 'Strom'} / {a.kunden_typ === 'gewerbe' ? 'Gewerbe' : 'Privat'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs hidden sm:table-cell">
                      {new Date(a.created_at).toLocaleDateString('de-DE')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, change, trend, icon }: {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-500">{icon}</span>
        <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${
          trend === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {change}
        </span>
      </div>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
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
