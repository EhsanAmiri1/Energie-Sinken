import SeaCharts from './sea-charts'

export const metadata = { title: 'SEA / Google Ads' }

export default function SeaPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">SEA / Google Ads</h1>
        <p className="mt-1 text-sm text-gray-400">Kampagnen-Performance & Anzeigen-Optimierung</p>
      </div>

      <SeaCharts />
    </div>
  )
}
