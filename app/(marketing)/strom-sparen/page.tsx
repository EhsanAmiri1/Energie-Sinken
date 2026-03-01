import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Zap, TrendingDown, CheckCircle2, ArrowRight,
  Lightbulb, Plug, ThermometerSun, MonitorSmartphone,
} from 'lucide-react'
import { MarketingHeader, MarketingFooter, CTASection, PageHero, FAQSection } from '../components'

export const metadata: Metadata = {
  title: 'Stromkosten senken — Bis zu 30% sparen bei Strom',
  description: 'Stromkosten senken leicht gemacht. Stromanbieter vergleichen, wechseln und bis zu 30% sparen. Kostenlose Analyse f\u00fcr Privat & Gewerbe.',
  keywords: [
    'Stromkosten senken',
    'Stromanbieter wechseln',
    'Strom sparen Tipps',
    'g\u00fcnstiger Stromanbieter',
    'Stromvergleich kostenlos',
  ],
  openGraph: {
    title: 'Stromkosten senken | Energiekosten Sinken',
    description: 'Bis zu 30% weniger Stromkosten. Kostenloser Vergleich und einfacher Anbieterwechsel.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wie kann ich meine Stromkosten senken?',
      acceptedAnswer: { '@type': 'Answer', text: 'Der effektivste Weg ist ein Anbieterwechsel. Dar\u00fcber hinaus helfen energieeffiziente Ger\u00e4te, LED-Beleuchtung und bewusstes Nutzungsverhalten.' },
    },
    {
      '@type': 'Question',
      name: 'Wie viel kann ich beim Stromanbieter-Wechsel sparen?',
      acceptedAnswer: { '@type': 'Answer', text: 'Durchschnittlich 20\u201330% der j\u00e4hrlichen Stromkosten. Bei einem Verbrauch von 3.500 kWh sind das 200\u2013400 \u20ac pro Jahr.' },
    },
    {
      '@type': 'Question',
      name: 'Gibt es beim Anbieterwechsel eine Versorgungsl\u00fccke?',
      acceptedAnswer: { '@type': 'Answer', text: 'Nein. Die Stromversorgung ist gesetzlich garantiert. Beim Wechsel gibt es keine Unterbrechung.' },
    },
    {
      '@type': 'Question',
      name: 'Wie lange dauert ein Stromanbieter-Wechsel?',
      acceptedAnswer: { '@type': 'Answer', text: 'In der Regel 2\u20134 Wochen. Der neue Anbieter k\u00fcndigt Ihren alten Vertrag und \u00fcbernimmt alles f\u00fcr Sie.' },
    },
  ],
}

const faqs = [
  { frage: 'Wie kann ich meine Stromkosten senken?', antwort: 'Der effektivste Weg ist ein Anbieterwechsel. Dar\u00fcber hinaus helfen energieeffiziente Ger\u00e4te, LED-Beleuchtung und bewusstes Nutzungsverhalten.' },
  { frage: 'Wie viel kann ich beim Stromanbieter-Wechsel sparen?', antwort: 'Durchschnittlich 20\u201330% der j\u00e4hrlichen Stromkosten. Bei einem Verbrauch von 3.500 kWh sind das 200\u2013400 \u20ac pro Jahr.' },
  { frage: 'Gibt es beim Anbieterwechsel eine Versorgungsl\u00fccke?', antwort: 'Nein. Die Stromversorgung ist gesetzlich garantiert. Beim Wechsel gibt es keine Unterbrechung.' },
  { frage: 'Wie lange dauert ein Stromanbieter-Wechsel?', antwort: 'In der Regel 2\u20134 Wochen. Der neue Anbieter k\u00fcndigt Ihren alten Vertrag und \u00fcbernimmt alles f\u00fcr Sie.' },
]

export default function StromSparenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingHeader />
      <main>
        <PageHero
          badge="F\u00fcr Privat & Gewerbe"
          title="Stromkosten senken \u2014"
          titleHighlight="bis zu 30% sparen"
          description="Vergleichen Sie Stromanbieter und finden Sie den g\u00fcnstigsten Tarif f\u00fcr Ihren Verbrauch. Einfach Abrechnung hochladen, Ergebnis erhalten, wechseln."
        />

        {/* Warum Stromkosten steigen */}
        <section className="py-24 bg-white">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">
              Warum zahlen Sie zu viel f&uuml;r Strom?
            </h2>
            <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
              Viele Haushalte und Unternehmen bleiben jahrelang beim selben Anbieter &mdash; und zahlen dadurch deutlich mehr als n&ouml;tig.
            </p>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Plug, title: 'Grundversorgung', desc: 'Der Grundversorger ist fast immer der teuerste Tarif.' },
                { icon: TrendingDown, title: 'Alte Vertr\u00e4ge', desc: 'Nach der Mindestlaufzeit steigen die Preise oft unbemerkt.' },
                { icon: ThermometerSun, title: 'Steigende Preise', desc: 'Netzentgelte und Umlagen treiben die Kosten nach oben.' },
                { icon: MonitorSmartphone, title: 'Kein Vergleich', desc: 'Ohne regelm\u00e4\u00dfigen Vergleich verpassen Sie g\u00fcnstigere Tarife.' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <item.icon className="h-8 w-8 text-energy-yellow" />
                  <h3 className="mt-3 text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tipps zum Strom sparen */}
        <section className="py-24 bg-gray-50">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">
              Die 5 besten Tipps zum Strom sparen
            </h2>
            <div className="mt-12 mx-auto max-w-3xl space-y-4">
              {[
                { title: 'Stromanbieter wechseln', desc: 'Der schnellste Weg zu niedrigeren Kosten. Ein Wechsel spart durchschnittlich 200\u2013400 \u20ac pro Jahr.' },
                { title: 'LED-Beleuchtung nutzen', desc: 'LED-Lampen verbrauchen bis zu 90% weniger Strom als herk\u00f6mmliche Gl\u00fchbirnen.' },
                { title: 'Stand-by vermeiden', desc: 'Ger\u00e4te im Stand-by-Modus verbrauchen unn\u00f6tig Strom. Schaltbare Steckdosenleisten helfen.' },
                { title: 'Energieeffiziente Ger\u00e4te kaufen', desc: 'Achten Sie beim Neukauf auf die Energieeffizienzklasse. A+++ spart langfristig.' },
                { title: 'Waschmaschine bei 30\u00b0C nutzen', desc: '30\u00b0C statt 60\u00b0C spart bis zu 70% der Stromkosten pro Waschgang.' },
              ].map((tipp, i) => (
                <div key={i} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-energy-yellow/20 text-sm font-bold text-amber-700">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{tipp.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{tipp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-gray-500">
              Mehr Tipps finden Sie in unserem{' '}
              <Link href="/blog" className="text-brand-500 font-medium hover:text-brand-600">
                Blog
              </Link>.
            </p>
          </div>
        </section>

        {/* Zusammenfassung */}
        <section className="py-16 bg-brand-50">
          <div className="container-tight max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900">Stromkosten senken &mdash; auf einen Blick</h2>
            <ul className="mt-6 space-y-3">
              {[
                'Bis zu 30% Ersparnis durch Anbieterwechsel',
                'Kostenloser und unverbindlicher Stromvergleich',
                'Kein Risiko: Gesetzlich garantierte Versorgung',
                'F\u00fcr Privathaushalte und Gewerbebetriebe',
                'Zus\u00e4tzlich sparen durch LED, Stand-by-Vermeidung und effiziente Ger\u00e4te',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FAQSection faqs={faqs} />
        <CTASection
          title="Stromkosten jetzt senken"
          description="Laden Sie Ihre Stromabrechnung hoch und erfahren Sie in wenigen Minuten Ihr Sparpotenzial."
        />
      </main>
      <MarketingFooter />
    </>
  )
}
