import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Flame, CheckCircle2, ArrowRight } from 'lucide-react'
import { MarketingHeader, MarketingFooter, CTASection } from '../../components'

export const metadata: Metadata = {
  title: 'Gaskosten senken: Der ultimative Ratgeber 2026',
  description: 'Gaskosten senken: Anbieterwechsel, Heizung optimieren, richtig l\u00fcften. Der komplette Ratgeber mit den besten Spartipps.',
  keywords: ['Gaskosten senken', 'Gas sparen Ratgeber', 'Gasanbieter wechseln', 'Heizkosten reduzieren'],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Gaskosten senken: Der ultimative Ratgeber',
  author: { '@type': 'Organization', name: 'PAKA GmbH' },
  publisher: { '@type': 'Organization', name: 'PAKA GmbH', url: 'https://energiepreise-sinken.de' },
  datePublished: '2026-02-20',
  description: 'Alles, was Sie wissen m\u00fcssen, um Ihre Gasrechnung deutlich zu reduzieren.',
}

export default function GaskostenRatgeberPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden bg-energy-dark pt-28 pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-energy-dark to-energy-dark" />
          <div className="container-tight relative z-10">
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Zur\u00fcck zum Blog
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/30 px-3 py-1 text-xs text-orange-300 mb-4">
              <Flame className="h-3.5 w-3.5" /> Ratgeber
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Gaskosten senken: Der ultimative Ratgeber
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
              <span>PAKA GmbH</span>
              <span>&middot;</span>
              <span>20. Februar 2026</span>
              <span>&middot;</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 7 Min Lesezeit</span>
            </div>
          </div>
        </section>

        <article className="py-16 bg-white">
          <div className="container-tight max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              Gas ist f&uuml;r viele Haushalte der gr&ouml;&szlig;te Posten bei den Energiekosten. In diesem Ratgeber zeigen wir Ihnen alle M&ouml;glichkeiten, Ihre Gasrechnung deutlich zu senken &mdash; vom Anbieterwechsel bis zur Heizungsoptimierung.
            </p>

            {/* Abschnitt 1: Anbieterwechsel */}
            <h2 className="mt-16 text-2xl font-bold text-gray-900">1. Gasanbieter wechseln &mdash; der gr&ouml;&szlig;te Hebel</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Der effektivste Weg zu niedrigeren Gaskosten ist ein Anbieterwechsel. Viele Haushalte zahlen 20&ndash;30% mehr als n&ouml;tig, weil sie noch beim Grundversorger sind oder einen veralteten Vertrag haben.
            </p>
            <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
              <p className="font-semibold text-orange-800">Rechenbeispiel:</p>
              <p className="mt-2 text-sm text-gray-700">
                Ein Haushalt mit 20.000 kWh Gasverbrauch zahlt beim Grundversorger ca. 2.400 &euro;/Jahr.
                Nach einem Wechsel oft nur noch 1.700&ndash;1.900 &euro;/Jahr. <strong>Ersparnis: 300&ndash;600 &euro;</strong>.
              </p>
            </div>

            {/* Abschnitt 2: Heizung optimieren */}
            <h2 className="mt-16 text-2xl font-bold text-gray-900">2. Heizung richtig einstellen</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Jedes Grad Raumtemperatur weniger spart ca. 6% Heizkosten. Kleine Anpassungen machen einen gro&szlig;en Unterschied.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { raum: 'Wohnzimmer', temp: '20\u00b0C' },
                { raum: 'K\u00fcche', temp: '18\u00b0C' },
                { raum: 'Schlafzimmer', temp: '16\u201318\u00b0C' },
                { raum: 'Badezimmer', temp: '22\u00b0C' },
                { raum: 'Flur & G\u00e4stezimmer', temp: '15\u201316\u00b0C' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-6 py-3">
                  <span className="font-medium text-gray-700">{item.raum}</span>
                  <span className="font-bold text-energy-orange">{item.temp}</span>
                </div>
              ))}
            </div>

            {/* Abschnitt 3: Richtig l\u00fcften */}
            <h2 className="mt-16 text-2xl font-bold text-gray-900">3. Richtig l&uuml;ften</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Falsches L&uuml;ften ist einer der h&auml;ufigsten Gr&uuml;nde f&uuml;r hohe Heizkosten. Die goldene Regel: Sto&szlig;l&uuml;ften statt Kippfenster.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                '3\u20134x t\u00e4glich f\u00fcr 5\u201310 Minuten alle Fenster weit \u00f6ffnen',
                'Heizung w\u00e4hrend des L\u00fcftens herunterdrehen',
                'Kippfenster im Winter komplett vermeiden',
                'Querlüften ist am effektivsten (gegen\u00fcberliegende Fenster)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Abschnitt 4: Abdichten */}
            <h2 className="mt-16 text-2xl font-bold text-gray-900">4. Fenster und T&uuml;ren abdichten</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Undichte Fenster und T&uuml;ren lassen W&auml;rme entweichen und treiben die Heizkosten nach oben. Selbstklebende Dichtungsb&auml;nder aus dem Baumarkt kosten wenige Euro und sparen bis zu 10% Heizkosten.
            </p>

            {/* Abschnitt 5: Heizk&ouml;rper */}
            <h2 className="mt-16 text-2xl font-bold text-gray-900">5. Heizk&ouml;rper freihalten und entl&uuml;ften</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              M&ouml;bel, Vorh&auml;nge oder Verkleidungen vor Heizk&ouml;rpern blockieren die W&auml;rmeabgabe. Halten Sie mindestens 20 cm Abstand. Entl&uuml;ften Sie Ihre Heizk&ouml;rper zu Beginn der Heizsaison &mdash; glucksende Heizk&ouml;rper verbrauchen mehr Energie.
            </p>

            {/* Zusammenfassung */}
            <div className="mt-16 rounded-2xl border border-brand-200 bg-brand-50 p-8">
              <h2 className="text-xl font-bold text-gray-900">Zusammenfassung: So senken Sie Ihre Gaskosten</h2>
              <ul className="mt-4 space-y-2">
                {[
                  'Gasanbieter wechseln: 300\u2013600 \u20ac/Jahr sparen',
                  'Raumtemperatur um 1\u20132\u00b0C senken: 6\u201312% weniger Kosten',
                  'Sto\u00dfl\u00fcften statt Kippfenster: W\u00e4rmeverluste vermeiden',
                  'Fenster und T\u00fcren abdichten: Bis zu 10% sparen',
                  'Heizk\u00f6rper freihalten und entl\u00fcften: Effizienz steigern',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0 text-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/analyse" className="btn-primary mt-6 inline-flex">
                Jetzt Gaskosten pr&uuml;fen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 flex gap-4 text-sm text-gray-500">
              <span>Weitere Artikel:</span>
              <Link href="/blog/10-tipps-strom-sparen" className="text-brand-500 hover:text-brand-600">10 Tipps zum Stromsparen</Link>
              <Link href="/blog/stromanbieter-wechseln" className="text-brand-500 hover:text-brand-600">Stromanbieter wechseln</Link>
            </div>
          </div>
        </article>

        <CTASection />
      </main>
      <MarketingFooter />
    </>
  )
}
