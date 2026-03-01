import {
  Search, TrendingUp, Globe, FileCheck, AlertTriangle,
} from 'lucide-react'
import SeoCharts from './seo-charts'

export const metadata = { title: 'SEO Analytics' }

export default function SeoPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">SEO Analytics</h1>
        <p className="mt-1 text-sm text-gray-400">Suchmaschinenoptimierung & Google Search Console</p>
      </div>

      <SeoCharts />
    </div>
  )
}
