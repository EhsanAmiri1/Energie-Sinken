import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react'
import { MarketingHeader, MarketingFooter, CTASection } from '../../components'

export const metadata: Metadata = {
  title: '10 Tipps zum Stromsparen im Haushalt',
  description: 'Die 10 besten Tipps zum Stromsparen: LED nutzen, Stand-by vermeiden, effizient waschen. So senken Sie Ihre Stromkosten sofort.',
  keywords: ['Strom sparen Tipps', 'Stromsparen Haushalt', 'Stromverbrauch senken', 'Energie sparen zuhause'],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '10 Tipps zum Stromsparen im Haushalt',
  author: { '@type': 'Organization', name: 'PAKA GmbH' },
  publisher: { '@type': 'Organization', name: 'PAKA GmbH', url: 'https://energiepreise-sinken.de' },
  datePublished: '2026-02-28',
  description: 'Die 10 besten Tipps zum Stromsparen im Haushalt.',
}

const tipps = [
  { title: 'LED-Lampen verwenden', text: 'LED-Lampen verbrauchen bis zu 90% weniger Strom als Gl\u00fchbirnen und halten 25-mal l\u00e4nger. Die Investition rechnet sich oft schon nach wenigen Monaten.' },
  { title: 'Stand-by-Verbrauch eliminieren', text: 'Ger\u00e4te im Stand-by kosten einen durchschnittlichen Haushalt bis zu 100 \u20ac pro Jahr. Schaltbare Steckdosenleisten l\u00f6sen das Problem sofort.' },
  { title: 'Waschmaschine bei 30\u00b0C nutzen', text: 'Moderne Waschmittel reinigen bereits bei 30\u00b0C hervorragend. Das spart bis zu 70% Strom gegen\u00fcber einer 60\u00b0C-W\u00e4sche.' },
  { title: 'K\u00fchlschrank richtig einstellen', text: '7\u00b0C im K\u00fchlschrank und -18\u00b0C im Gefrierfach sind ausreichend. Jedes Grad k\u00e4lter erh\u00f6ht den Verbrauch um ca. 6%.' },
  { title: 'Trockner seltener nutzen', text: 'W\u00e4sche an der Luft trocknen spart pro Durchgang ca. 3 kWh. Im Sommer ein leichter Schritt zur Kostensenkung.' },
  { title: 'Energieeffiziente Ger\u00e4te kaufen', text: 'Beim Neukauf auf das Energielabel achten. Ein A-Ger\u00e4t verbraucht deutlich weniger als \u00e4ltere Modelle.' },
  { title: 'Kochen mit Deckel', text: 'Ein Deckel auf dem Topf spart bis zu 70% der Kochenergie. Auch die Restwärme der Herdplatte l\u00e4sst sich nutzen.' },
  { title: 'Wasserkocher statt Herd', text: 'Ein Wasserkocher erhitzt Wasser doppelt so effizient wie ein Kochtopf auf dem Herd.' },
  { title: 'Sp\u00fclmaschine voll beladen', text: 'Die Sp\u00fclmaschine nur voll beladen starten. Das Eco-Programm spart bis zu 45% Strom gegen\u00fcber dem Normalprogramm.' },
  { title: 'Stromanbieter wechseln', text: 'Der schnellste Weg zu niedrigeren Stromkosten: Ein Anbieterwechsel spart durchschnittlich 200\u2013400 \u20ac pro Jahr.' },
]

export default function StromSparenTippsPage() {
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
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs text-amber-300 mb-4">
              <Lightbulb className="h-3.5 w-3.5" /> Ratgeber
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              10 Tipps zum Stromsparen im Haushalt
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
              <span>PAKA GmbH</span>
              <span>&middot;</span>
              <span>28. Februar 2026</span>
              <span>&middot;</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 6 Min Lesezeit</span>
            </div>
          </div>
        </section>

        <article className="py-16 bg-white">
          <div className="container-tight max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              Stromsparen muss nicht kompliziert sein. Mit diesen 10 praktischen Tipps senken Sie Ihren Stromverbrauch sofort &mdash; ohne auf Komfort verzichten zu m&uuml;ssen.
            </p>

            <div className="mt-12 space-y-8">
              {tipps.map((tipp, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-energy-yellow/20 text-sm font-bold text-amber-700">
                    {i + 1}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{tipp.title}</h2>
                    <p className="mt-2 text-gray-600 leading-relaxed">{tipp.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-2xl border border-brand-200 bg-brand-50 p-8">
              <h2 className="text-xl font-bold text-gray-900">Fazit: Der gr&ouml;&szlig;te Hebel ist der Anbieterwechsel</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Alle Tipps zusammen sparen Ihnen einiges. Aber der gr&ouml;&szlig;te Einzeleffekt entsteht durch einen Wechsel des Stromanbieters. Lassen Sie jetzt kostenlos pr&uuml;fen, wie viel Sie sparen k&ouml;nnen.
              </p>
              <Link href="/analyse" className="btn-primary mt-6 inline-flex">
                Jetzt kostenlos pr&uuml;fen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 flex gap-4 text-sm text-gray-500">
              <span>Weitere Artikel:</span>
              <Link href="/blog/stromanbieter-wechseln" className="text-brand-500 hover:text-brand-600">Stromanbieter wechseln</Link>
              <Link href="/blog/gaskosten-senken-ratgeber" className="text-brand-500 hover:text-brand-600">Gaskosten senken</Link>
            </div>
          </div>
        </article>

        <CTASection />
      </main>
      <MarketingFooter />
    </>
  )
}
