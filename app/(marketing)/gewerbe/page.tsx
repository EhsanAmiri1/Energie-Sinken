import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Zap, Flame, TrendingDown, Building2, CheckCircle2,
  ArrowRight, Euro, Users, BarChart3, FileText, Handshake,
} from 'lucide-react'
import { MarketingHeader, MarketingFooter, CTASection, PageHero, FAQSection } from '../components'

export const metadata: Metadata = {
  title: 'Energieberatung f\u00fcr Gewerbe & Unternehmen — Betriebskosten senken',
  description: 'Senken Sie die Energiekosten Ihres Unternehmens um bis zu 30%. Individuelle Gewerberabatte, mehrere Z\u00e4hler, pers\u00f6nliche Betreuung.',
  keywords: [
    'Energieberatung Gewerbe',
    'Gewerbestrom sparen',
    'Energiekosten Unternehmen senken',
    'Stromkosten Betrieb reduzieren',
    'Gaskosten Gewerbe optimieren',
  ],
  openGraph: {
    title: 'Energieberatung f\u00fcr Gewerbe | Energiekosten Sinken',
    description: 'Betriebskosten senken: Bis zu 30% weniger Strom- und Gaskosten f\u00fcr Ihr Unternehmen.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'PAKA GmbH \u2014 Energieberatung f\u00fcr Gewerbe',
  description: 'Professionelle Energieberatung f\u00fcr Unternehmen und Gewerbebetriebe.',
  url: 'https://energiepreise-sinken.de/gewerbe',
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
      name: 'Wie viel k\u00f6nnen Unternehmen bei Energiekosten sparen?',
      acceptedAnswer: { '@type': 'Answer', text: 'Je nach Verbrauch und aktuellem Tarif sind Einsparungen von 20\u201330% m\u00f6glich. Bei einem mittelst\u00e4ndischen Betrieb mit 50.000 kWh Jahresverbrauch k\u00f6nnen das mehrere tausend Euro pro Jahr sein.' },
    },
    {
      '@type': 'Question',
      name: 'K\u00f6nnen mehrere Z\u00e4hler gleichzeitig optimiert werden?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ja. Wir analysieren alle Ihre Strom- und Gasz\u00e4hler und finden f\u00fcr jeden einzelnen den optimalen Tarif.' },
    },
    {
      '@type': 'Question',
      name: 'Gibt es spezielle Gewerberabatte?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ja. Gewerbetarife bieten oft g\u00fcnstigere Konditionen als Haushaltstarife. Wir haben Zugang zu exklusiven Gewerbekonditionen.' },
    },
    {
      '@type': 'Question',
      name: 'Ist die Beratung auch f\u00fcr kleine Betriebe geeignet?',
      acceptedAnswer: { '@type': 'Answer', text: 'Absolut. Ob Friseursalon, Arztpraxis oder Produktionsbetrieb \u2014 wir beraten Unternehmen jeder Gr\u00f6\u00dfe.' },
    },
  ],
}

const faqs = [
  { frage: 'Wie viel k\u00f6nnen Unternehmen bei Energiekosten sparen?', antwort: 'Je nach Verbrauch und aktuellem Tarif sind Einsparungen von 20\u201330% m\u00f6glich. Bei einem mittelst\u00e4ndischen Betrieb mit 50.000 kWh Jahresverbrauch k\u00f6nnen das mehrere tausend Euro pro Jahr sein.' },
  { frage: 'K\u00f6nnen mehrere Z\u00e4hler gleichzeitig optimiert werden?', antwort: 'Ja. Wir analysieren alle Ihre Strom- und Gasz\u00e4hler und finden f\u00fcr jeden einzelnen den optimalen Tarif.' },
  { frage: 'Gibt es spezielle Gewerberabatte?', antwort: 'Ja. Gewerbetarife bieten oft g\u00fcnstigere Konditionen als Haushaltstarife. Wir haben Zugang zu exklusiven Gewerbekonditionen.' },
  { frage: 'Ist die Beratung auch f\u00fcr kleine Betriebe geeignet?', antwort: 'Absolut. Ob Friseursalon, Arztpraxis oder Produktionsbetrieb \u2014 wir beraten Unternehmen jeder Gr\u00f6\u00dfe.' },
]

export default function GewerbePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <MarketingHeader />
      <main>
        <PageHero
          badge="F\u00fcr Unternehmen jeder Gr\u00f6\u00dfe"
          title="Energieberatung f\u00fcr"
          titleHighlight="Gewerbe & Unternehmen"
          description="Senken Sie Ihre Betriebskosten nachhaltig. Wir optimieren Ihre Strom- und Gasvertr\u00e4ge \u2014 f\u00fcr alle Z\u00e4hler, alle Standorte."
        />

        {/* Vorteile f\u00fcr Gewerbe */}
        <section className="py-24 bg-white">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">
              Vorteile f&uuml;r Ihr Unternehmen
            </h2>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                { icon: BarChart3, title: 'Mehrere Z\u00e4hler optimieren', desc: 'Wir analysieren jeden einzelnen Strom- und Gasz\u00e4hler Ihres Betriebs und finden den optimalen Tarif.', color: 'text-brand-500', bg: 'bg-brand-50' },
                { icon: Euro, title: 'Exklusive Gewerberabatte', desc: 'Profitieren Sie von speziellen Gewerbekonditionen, die f\u00fcr Privatkunden nicht verf\u00fcgbar sind.', color: 'text-energy-yellow', bg: 'bg-amber-50' },
                { icon: Handshake, title: 'Pers\u00f6nliche Betreuung', desc: 'Ein fester Ansprechpartner begleitet Sie durch den gesamten Prozess. Kein Callcenter.', color: 'text-energy-orange', bg: 'bg-orange-50' },
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

        {/* Branchen */}
        <section className="py-24 bg-gray-50">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">
              F&uuml;r jede Branche die passende L&ouml;sung
            </h2>
            <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
              Wir betreuen Unternehmen aus allen Branchen &mdash; vom Handwerksbetrieb bis zum Industrieunternehmen.
            </p>
            <div className="mt-12 grid gap-4 grid-cols-2 md:grid-cols-4">
              {[
                'Handwerk & Produktion', 'Einzelhandel & Gastronomie',
                'B\u00fcros & Verwaltung', 'Arztpraxen & Kliniken',
                'Hotels & Pension', 'Logistik & Lager',
                'Landwirtschaft', 'Immobilienverwaltung',
              ].map((branche) => (
                <div key={branche} className="rounded-xl border border-gray-200 bg-white p-4 text-center text-sm font-medium text-gray-700">
                  {branche}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strom & Gas Links */}
        <section className="py-24 bg-white">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">
              Strom &amp; Gas f&uuml;r Ihr Unternehmen
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Link href="/strom-sparen" className="group rounded-2xl bg-gradient-to-br from-energy-yellow/10 to-amber-50 p-8 border border-amber-100 hover:shadow-lg transition-all">
                <Zap className="h-10 w-10 text-energy-yellow" />
                <h3 className="mt-4 text-2xl font-bold text-gray-900">Gewerbestrom optimieren</h3>
                <p className="mt-3 text-gray-600">Spezielle Gewerbetarife mit g&uuml;nstigeren Konditionen als Haushaltsstrom.</p>
                <span className="mt-4 inline-flex items-center text-amber-700 font-medium">
                  Mehr erfahren <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/gas-sparen" className="group rounded-2xl bg-gradient-to-br from-energy-orange/10 to-orange-50 p-8 border border-orange-100 hover:shadow-lg transition-all">
                <Flame className="h-10 w-10 text-energy-orange" />
                <h3 className="mt-4 text-2xl font-bold text-gray-900">Gewerbegas optimieren</h3>
                <p className="mt-3 text-gray-600">Heizkosten und Prozessgas: Wir finden den besten Tarif f&uuml;r Ihren Betrieb.</p>
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
            <h2 className="text-2xl font-bold text-gray-900">Energieberatung f&uuml;r Gewerbe &mdash; auf einen Blick</h2>
            <ul className="mt-6 space-y-3">
              {[
                'Bis zu 30% Einsparung bei Strom- und Gaskosten',
                'Alle Z\u00e4hler und Standorte in einer Analyse',
                'Exklusive Gewerbekonditionen und Sondertarife',
                'Pers\u00f6nlicher Ansprechpartner f\u00fcr Ihr Unternehmen',
                'Kostenlose und unverbindliche Erstanalyse',
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
          title="Betriebskosten jetzt senken"
          description="Laden Sie Ihre Gewerbe-Abrechnung hoch und erfahren Sie, wie viel Ihr Unternehmen sparen kann."
        />
      </main>
      <MarketingFooter />
    </>
  )
}
