'use client'

import {
  Euro, MousePointer, TrendingUp, Target,
  ArrowUpRight, Pause, Play, Star,
} from 'lucide-react'
import { SeaSpendChart } from '../components/charts'
import { seaCampaigns, seaOverview, seaChartData, seaKeywords } from '../lib/demo-data'

export default function SeaCharts() {
  return (
    <>
      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 mb-8">
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <Euro className="h-4 w-4 text-gray-500" />
          <p className="mt-2 text-xl font-bold text-white">{seaOverview.gesamtAusgaben.toLocaleString('de-DE')} &euro;</p>
          <p className="text-xs text-gray-500 mt-0.5">Gesamtausgaben</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <MousePointer className="h-4 w-4 text-gray-500" />
          <p className="mt-2 text-xl font-bold text-white">{seaOverview.gesamtKlicks.toLocaleString('de-DE')}</p>
          <p className="text-xs text-gray-500 mt-0.5">Klicks</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <Target className="h-4 w-4 text-gray-500" />
          <p className="mt-2 text-xl font-bold text-white">{seaOverview.gesamtConversions}</p>
          <p className="text-xs text-gray-500 mt-0.5">Conversions</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <Euro className="h-4 w-4 text-gray-500" />
          <p className="mt-2 text-xl font-bold text-white">{seaOverview.durchschnittCpc.toFixed(2)} &euro;</p>
          <p className="text-xs text-gray-500 mt-0.5">Durchschn. CPC</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <TrendingUp className="h-4 w-4 text-gray-500" />
          <p className="mt-2 text-xl font-bold text-white">{seaOverview.durchschnittCtr}%</p>
          <p className="text-xs text-gray-500 mt-0.5">Durchschn. CTR</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <ArrowUpRight className="h-4 w-4 text-green-400" />
          <p className="mt-2 text-xl font-bold text-green-400">{seaOverview.roas}x</p>
          <p className="text-xs text-gray-500 mt-0.5">ROAS</p>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 mb-6">
        <h2 className="text-sm font-semibold text-white mb-4">Ausgaben & Conversions pro Woche</h2>
        <SeaSpendChart data={seaChartData} />
      </div>

      {/* Kampagnen */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden mb-6">
        <div className="border-b border-gray-800 px-5 py-4">
          <h2 className="text-sm font-semibold text-white">Kampagnen</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-800 bg-gray-900/80">
              <tr>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Kampagne</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right hidden sm:table-cell">Budget</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right hidden sm:table-cell">Ausgaben</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Klicks</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right hidden md:table-cell">CTR</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right hidden md:table-cell">CPC</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Conv.</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right hidden lg:table-cell">Kosten/Conv.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {seaCampaigns.map((c) => (
                <tr key={c.name} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-200">{c.name}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      c.status === 'Aktiv' ? 'bg-green-500/15 text-green-400' : 'bg-gray-800 text-gray-500'
                    }`}>
                      {c.status === 'Aktiv' ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-right hidden sm:table-cell">{c.budget} &euro;</td>
                  <td className="px-5 py-3 text-gray-400 text-right hidden sm:table-cell">{c.ausgaben} &euro;</td>
                  <td className="px-5 py-3 text-gray-400 text-right">{c.klicks}</td>
                  <td className="px-5 py-3 text-gray-400 text-right hidden md:table-cell">{c.ctr}%</td>
                  <td className="px-5 py-3 text-gray-400 text-right hidden md:table-cell">{c.cpc.toFixed(2)} &euro;</td>
                  <td className="px-5 py-3 text-right">
                    <span className={c.conversions > 0 ? 'text-green-400 font-medium' : 'text-gray-500'}>{c.conversions}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-right hidden lg:table-cell">
                    {c.kosten_pro_conversion > 0 ? `${c.kosten_pro_conversion.toFixed(2)} €` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEA Keywords */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
        <div className="border-b border-gray-800 px-5 py-4">
          <h2 className="text-sm font-semibold text-white">Keyword-Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-800 bg-gray-900/80">
              <tr>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Kampagne</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Klicks</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right hidden sm:table-cell">CPC</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Conv.</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right hidden sm:table-cell">Qualität</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {seaKeywords.map((kw) => (
                <tr key={kw.keyword} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-200">{kw.keyword}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">{kw.kampagne}</td>
                  <td className="px-5 py-3 text-gray-400 text-right">{kw.klicks}</td>
                  <td className="px-5 py-3 text-gray-400 text-right hidden sm:table-cell">{kw.cpc.toFixed(2)} &euro;</td>
                  <td className="px-5 py-3 text-right">
                    <span className={kw.conversions > 0 ? 'text-green-400 font-medium' : 'text-gray-500'}>{kw.conversions}</span>
                  </td>
                  <td className="px-5 py-3 text-right hidden sm:table-cell">
                    <span className="inline-flex items-center gap-1">
                      <Star className={`h-3 w-3 ${kw.qualitaet >= 8 ? 'text-green-400' : kw.qualitaet >= 6 ? 'text-amber-400' : 'text-red-400'}`} />
                      <span className="text-gray-400">{kw.qualitaet}/10</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
