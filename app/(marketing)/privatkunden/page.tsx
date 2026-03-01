import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Zap, Flame, TrendingDown, Upload, Calendar, CheckCircle2,
  Home, Euro, ArrowRight, Shield, Clock, Users,
} from 'lucide-react'
import { MarketingHeader, MarketingFooter, CTASection, PageHero, FAQSection } from '../components'

export const metadata: Metadata = {
  title: 'Energieberatung f\u00fcr Privatkunden — Strom & Gas sparen',
  description: 'Senken Sie Ihre Strom- und Gaskosten als Privathaushalt um bis zu 30%. Kostenlose Analyse, pers\u00f6nliche Beratung, garantiert einfacher Wechsel.',
  keywords: [
    'Energieberatung Privatkunden',
    'Stromkosten senken Haushalt',
    'Gaskosten sparen privat',
    'Stromanbieter wechseln privat',
    'Energiekosten Privathaushalt reduzieren',
  ],
  openGraph: {
    title: 'Energieberatung f\u00fcr Privatkunden | Energiekosten Sinken',
    description: 'Bis zu 30% weniger Strom- und Gaskosten f\u00fcr Ihren Haushalt.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'PAKA GmbH — Energieberatung',
  description: 'Energieberatung f\u00fcr Privatkunden: Strom- und Gaskosten senken.',
  url: 'https://energiepreise-sinken.de/privatkunden',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Josephsplatz 8',
    addressLocality: 'N\u00fcrnberg',
    postalCode: '90403',
    addressCountry: 'DE',
  },
  priceRange: 'Kostenlos',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wie viel kann ich als Privatkunde bei Strom und Gas sparen?',
      acceptedAnswer: { '@type': 'Answer', text: 'Durchschnittlich sparen unsere Kunden 20\u201330% ihrer j\u00e4hrlichen Energiekosten. Bei einem typischen 3-Personen-Haushalt sind das 200\u2013500 \u20ac pro Jahr.' },
    },
    {
      '@type': 'Question',
      name: 'Ist der Anbieterwechsel kompliziert?',
      acceptedAnswer: { '@type': 'Answer', text: 'Nein. Wir \u00fcbernehmen den gesamten Wechselprozess f\u00fcr Sie. Sie m\u00fcssen lediglich Ihre Abrechnung hochladen. Es gibt keine Versorgungsl\u00fccke.' },
    },
    {
      '@type': 'Question',
      name: 'Kostet die Beratung etwas?',
      acceptedAnswer: { '@type': 'Answer', text: 'Nein, unsere Analyse und Beratung ist komplett kostenlos und unverbindlich.' },
    },
    {
      '@type': 'Question',
      name: 'Wie lange dauert der Wechsel?',
      acceptedAnswer: { '@type': 'Answer', text: 'Die Analyse dauert wenige Minuten. Der eigentliche Anbieterwechsel wird nahtlos durchgef\u00fchrt \u2014 meist innerhalb von 2\u20134 Wochen.' },
    },
  ],
}

const faqs = [
  { frage: 'Wie viel kann ich als Privatkunde bei Strom und Gas sparen?', antwort: 'Durchschnittlich sparen unsere Kunden 20\u201330% ihrer j\u00e4hrlichen Energiekosten. Bei einem typischen 3-Personen-Haushalt sind das 200\u2013500 \u20ac pro Jahr.' },
  { frage: 'Ist der Anbieterwechsel kompliziert?', antwort: 'Nein. Wir \u00fcbernehmen den gesamten Wechselprozess f\u00fcr Sie. Sie m\u00fcssen lediglich Ihre Abrechnung hochladen. Es gibt keine Versorgungsl\u00fccke.' },
  { frage: 'Kostet die Beratung etwas?', antwort: 'Nein, unsere Analyse und Beratung ist komplett kostenlos und unverbindlich.' },
  { frage: 'Wie lange dauert der Wechsel?', antwort: 'Die Analyse dauert wenige Minuten. Der eigentliche Anbieterwechsel wird nahtlos durchgef\u00fchrt \u2014 meist innerhalb von 2\u20134 Wochen.' },
]

export default function PrivatkundenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <MarketingHeader />
      <main>
        <PageHero
          badge="Kostenlos & unverbindlich f\u00fcr Privathaushalte"
          title="Energieberatung f\u00fcr"
          titleHighlight="Privatkunden"
          description="Zahlen Sie zu viel f\u00fcr Strom oder Gas? Wir analysieren Ihre Abrechnung, finden den besten Tarif und \u00fcbernehmen den Wechsel. Ohne Aufwand, ohne Risiko."
        />

        {/* Vorteile */}
        <section className="py-24 bg-white">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">
              Warum Privatkunden uns vertrauen
            </h2>
            <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
              Wir machen Energiesparen einfach &mdash; ohne Fachwissen, ohne Papierkram.
            </p>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                { icon: Euro, title: 'Bis zu 30% sparen', desc: 'Wir vergleichen hunderte Tarife und finden das beste Angebot f\u00fcr Ihren Verbrauch.', color: 'text-brand-500', bg: 'bg-brand-50' },
                { icon: Shield, title: 'Kein Risiko', desc: 'Keine Versorgungsl\u00fccke, keine versteckten Kosten. Der Wechsel ist jederzeit sicher.', color: 'text-energy-yellow', bg: 'bg-amber-50' },
                { icon: Clock, title: 'In 3 Minuten erledigt', desc: 'Abrechnung hochladen, Ergebnis erhalten, fertig. Den Rest erledigen wir.', color: 'text-energy-orange', bg: 'bg-orange-50' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <div className={`inline-flex rounded-xl ${item.bg} p-3`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* So funktioniert es */}
        <section className="py-24 bg-gray-50">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">
              So senken Sie Ihre Energiekosten
            </h2>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                { icon: Upload, title: 'Abrechnung hochladen', desc: 'Laden Sie Ihre aktuelle Jahresabrechnung hoch. Ein Foto oder PDF gen\u00fcgt.', color: 'text-brand-500', bg: 'bg-brand-50' },
                { icon: TrendingDown, title: 'Ersparnis erfahren', desc: 'Wir vergleichen f\u00fcr Sie die besten Angebote und zeigen Ihr Sparpotenzial.', color: 'text-energy-yellow', bg: 'bg-amber-50' },
                { icon: Calendar, title: 'Beratung erhalten', desc: 'In einem pers\u00f6nlichen Gespr\u00e4ch erkl\u00e4ren wir Ihnen alles. Kostenlos.', color: 'text-energy-orange', bg: 'bg-orange-50' },
              ].map((step, i) => (
                <div key={i} className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                  <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div className={`inline-flex rounded-xl ${step.bg} p-3`}>
                    <step.icon className={`h-6 w-6 ${step.color}`} />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strom & Gas */}
        <section className="py-24 bg-white">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">
              Wir optimieren Strom &amp; Gas
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Link href="/strom-sparen" className="group rounded-2xl bg-gradient-to-br from-energy-yellow/10 to-amber-50 p-8 border border-amber-100 hover:shadow-lg transition-all">
                <Zap className="h-10 w-10 text-energy-yellow" />
                <h3 className="mt-4 text-2xl font-bold text-gray-900">Stromkosten senken</h3>
                <p className="mt-3 text-gray-600">Vergleichen Sie Stromanbieter und sparen Sie bis zu 30% bei Ihren j&auml;hrlichen Stromkosten.</p>
                <span className="mt-4 inline-flex items-center text-amber-700 font-medium">
                  Mehr erfahren <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/gas-sparen" className="group rounded-2xl bg-gradient-to-br from-energy-orange/10 to-orange-50 p-8 border border-orange-100 hover:shadow-lg transition-all">
                <Flame className="h-10 w-10 text-energy-orange" />
                <h3 className="mt-4 text-2xl font-bold text-gray-900">Gaskosten senken</h3>
                <p className="mt-3 text-gray-600">Auch bei Gas gibt es erhebliche Einsparpotenziale. Wir finden den besten Tarif.</p>
                <span className="mt-4 inline-flex items-center text-orange-700 font-medium">
                  Mehr erfahren <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Zusammenfassung */}
        <section className="py-16 bg-brand-50">
          <div className="container-tight max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900">Energieberatung f&uuml;r Privatkunden &mdash; auf einen Blick</h2>
            <ul className="mt-6 space-y-3">
              {[
                'Bis zu 30% weniger Strom- und Gaskosten f\u00fcr Ihren Haushalt',
                'Komplett kostenlose und unverbindliche Analyse',
                'Kein Risiko: Nahtloser Anbieterwechsel ohne Versorgungsl\u00fccke',
                'Pers\u00f6nliche Beratung durch erfahrene Energieexperten',
                'F\u00fcr alle Haushalte in ganz Deutschland verf\u00fcgbar',
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
          title="Jetzt Ihre Ersparnis berechnen"
          description="Laden Sie Ihre Abrechnung hoch und erfahren Sie in wenigen Minuten, wie viel Sie als Privathaushalt sparen k\u00f6nnen."
        />
      </main>
      <MarketingFooter />
    </>
  )
}
