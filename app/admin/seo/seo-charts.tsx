'use client'

import {
  Search, TrendingUp, Globe, FileCheck, AlertTriangle,
  ArrowUpRight, ArrowDownRight, CheckCircle2, XCircle,
} from 'lucide-react'
import { KeywordTrendChart } from '../components/charts'
import {
  topKeywords, coreWebVitals, keywordTrend,
  indexierungsStatus, contentPerformance,
} from '../lib/demo-data'

export default function SeoCharts() {
  return (
    <>
      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <div className="flex items-center justify-between">
            <Search className="h-4 w-4 text-gray-500" />
            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-green-400">
              <ArrowUpRight className="h-3 w-3" />+18%
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">1.798</p>
          <p className="text-xs text-gray-500 mt-0.5">Organische Klicks</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <div className="flex items-center justify-between">
            <Globe className="h-4 w-4 text-gray-500" />
            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-green-400">
              <ArrowUpRight className="h-3 w-3" />+12%
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">89.400</p>
          <p className="text-xs text-gray-500 mt-0.5">Impressionen</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <div className="flex items-center justify-between">
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-white">2.0%</p>
          <p className="text-xs text-gray-500 mt-0.5">Durchschn. CTR</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <div className="flex items-center justify-between">
            <FileCheck className="h-4 w-4 text-gray-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-white">7.2</p>
          <p className="text-xs text-gray-500 mt-0.5">Durchschn. Position</p>
        </div>
      </div>

      {/* Keyword Trend + Core Web Vitals */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2 rounded-xl border border-gray-800 bg-gray-900/50 p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Keyword-Positionen (Trend)</h2>
          <KeywordTrendChart data={keywordTrend} />
          <p className="mt-2 text-[11px] text-gray-500">Niedrigere Position = besseres Ranking</p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Core Web Vitals</h2>
          <div className="space-y-4">
            {Object.entries(coreWebVitals).map(([key, v]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-300 uppercase">{key}</p>
                  <p className="text-xs text-gray-500">{v.ziel}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{v.wert}{v.einheit}</p>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                    v.status === 'gut' ? 'text-green-400' : v.status === 'mittel' ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {v.status === 'gut' ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                    {v.status === 'gut' ? 'Gut' : v.status === 'mittel' ? 'Verbesserbar' : 'Schlecht'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Indexierung */}
          <div className="mt-6 pt-4 border-t border-gray-800">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Indexierung</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Indexiert</span>
              <span className="font-medium text-green-400">{indexierungsStatus.indexiert}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-400">Nicht indexiert</span>
              <span className="font-medium text-amber-400">{indexierungsStatus.nichtIndexiert}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-400">Fehler</span>
              <span className="font-medium text-gray-500">{indexierungsStatus.fehler}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Keywords */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden mb-6">
        <div className="border-b border-gray-800 px-5 py-4">
          <h2 className="text-sm font-semibold text-white">Top Keywords (Google Search Console)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-800 bg-gray-900/80">
              <tr>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Position</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right hidden sm:table-cell">Klicks</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right hidden md:table-cell">Impressionen</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {topKeywords.map((kw) => (
                <tr key={kw.keyword} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-200">{kw.keyword}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      kw.position <= 5 ? 'bg-green-500/15 text-green-400'
                        : kw.position <= 10 ? 'bg-amber-500/15 text-amber-400'
                        : 'bg-gray-800 text-gray-400'
                    }`}>
                      #{kw.position}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-right hidden sm:table-cell">{kw.klicks.toLocaleString('de-DE')}</td>
                  <td className="px-5 py-3 text-gray-400 text-right hidden md:table-cell">{kw.impressionen.toLocaleString('de-DE')}</td>
                  <td className="px-5 py-3 text-gray-400 text-right">{kw.ctr}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Performance */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
        <div className="border-b border-gray-800 px-5 py-4">
          <h2 className="text-sm font-semibold text-white">Content-Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-800 bg-gray-900/80">
              <tr>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Seite</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Klicks</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right hidden sm:table-cell">Impressionen</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right hidden md:table-cell">Position</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {contentPerformance.map((p) => (
                <tr key={p.seite} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-200">{p.seite}</td>
                  <td className="px-5 py-3 text-gray-400 text-right">{p.klicks.toLocaleString('de-DE')}</td>
                  <td className="px-5 py-3 text-gray-400 text-right hidden sm:table-cell">{p.impressionen.toLocaleString('de-DE')}</td>
                  <td className="px-5 py-3 text-right hidden md:table-cell">
                    <span className={`text-sm ${p.position < 10 ? 'text-green-400' : 'text-amber-400'}`}>
                      {p.position.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-right">{p.ctr}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
