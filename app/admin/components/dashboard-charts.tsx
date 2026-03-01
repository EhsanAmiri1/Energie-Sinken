'use client'

import { VisitorAreaChart, TrafficSourcesBar, DevicePieChart } from './charts'
import {
  visitorChartData, trafficSources, deviceStats, topPages, geoData,
} from '../lib/demo-data'
import { MapPin } from 'lucide-react'

export default function DashboardCharts() {
  return (
    <>
      {/* Besucher Chart + Traffic Sources */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-gray-800 bg-gray-900/50 p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Besucher & Seitenaufrufe</h2>
          <VisitorAreaChart data={visitorChartData} />
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Traffic-Quellen</h2>
          <TrafficSourcesBar data={trafficSources} />
        </div>
      </div>

      {/* Top Seiten + Geräte + Geo */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Top Seiten */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Top Seiten</h2>
          <div className="space-y-3">
            {topPages.slice(0, 6).map((page) => (
              <div key={page.seite} className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm text-gray-300 truncate">{page.titel}</p>
                  <p className="text-[11px] text-gray-500">{page.seite}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-sm font-medium text-white">{page.aufrufe.toLocaleString('de-DE')}</p>
                  <p className="text-[11px] text-gray-500">{page.absprungrate}% Absprung</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geräte */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Geräte</h2>
          <DevicePieChart data={deviceStats} />
        </div>

        {/* Top Regionen */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
          <h2 className="text-sm font-semibold text-white mb-4">
            <MapPin className="h-4 w-4 inline mr-1.5 text-brand-400" />
            Top Regionen
          </h2>
          <div className="space-y-2.5">
            {geoData.slice(0, 8).map((g) => (
              <div key={g.bundesland} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-300 truncate">{g.bundesland}</span>
                    <span className="text-xs text-gray-500 shrink-0 ml-2">{g.anteil}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-800">
                    <div
                      className="h-1.5 rounded-full bg-brand-500"
                      style={{ width: `${(g.anteil / geoData[0].anteil) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
