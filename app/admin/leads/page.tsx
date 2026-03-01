import Link from 'next/link'
import {
  Users, AlertCircle, Clock, CheckCircle2, Send,
  ArrowRight, Zap, Flame, Building2, Download,
} from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { AnalyseAnfrage } from '@/types'
import LeadsFilter from './leads-filter'

export const metadata = { title: 'Leads / CRM' }

export default async function LeadsPage() {
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

  const stats = [
    { label: 'Gesamt', value: alle.length, icon: Users, color: 'text-gray-400', bg: 'bg-gray-800/50', border: 'border-gray-700' },
    { label: 'Neu', value: neu.length, icon: AlertCircle, color: 'text-brand-400', bg: 'bg-brand-500/10', border: 'border-brand-500/20' },
    { label: 'In Bearbeitung', value: inBearbeitung.length, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { label: 'Angebot geschickt', value: angebotGeschickt.length, icon: Send, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: 'Abgeschlossen', value: abgeschlossen.length, icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads / CRM</h1>
          <p className="mt-1 text-sm text-gray-400">Alle Analyse-Anfragen verwalten</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 mb-6">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl border ${s.border} ${s.bg} p-4`}>
            <div className="flex items-center gap-2">
              <s.icon className={`h-4 w-4 ${s.color}`} />
              <span className="text-xs font-medium text-gray-500">{s.label}</span>
            </div>
            <p className={`mt-1.5 text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter + Tabelle */}
      <LeadsFilter anfragen={alle} />
    </div>
  )
}
