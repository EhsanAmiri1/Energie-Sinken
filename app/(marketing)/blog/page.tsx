import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Lightbulb, ArrowRight, Clock, Zap, Flame, RefreshCw,
} from 'lucide-react'
import { MarketingHeader, MarketingFooter, CTASection } from '../components'

export const metadata: Metadata = {
  title: 'Blog \u2014 Energiespartipps & Ratgeber',
  description: 'Praktische Tipps zum Strom- und Gassparen. Ratgeber f\u00fcr Anbieterwechsel, Energieeffizienz und niedrigere Energiekosten.',
  keywords: [
    'Energiespartipps',
    'Strom sparen Tipps',
    'Gas sparen Ratgeber',
    'Stromanbieter wechseln Anleitung',
    'Energiekosten senken Blog',
  ],
  openGraph: {
    title: 'Blog | Energiekosten Sinken',
    description: 'Praktische Tipps und Ratgeber f\u00fcr niedrigere Strom- und Gaskosten.',
  },
}

const artikel = [
  {
    slug: '10-tipps-strom-sparen',
    title: '10 Tipps zum Stromsparen im Haushalt',
    excerpt: 'Mit diesen einfachen Ma\u00dfnahmen senken Sie Ihren Stromverbrauch sofort \u2014 ohne Komfortverlust.',
    icon: Lightbulb,
    color: 'text-energy-yellow',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    datum: '28. Februar 2026',
    lesezeit: '6 Min',
  },
  {
    slug: 'stromanbieter-wechseln',
    title: 'Stromanbieter wechseln: So einfach geht\u2019s',
    excerpt: 'Schritt-f\u00fcr-Schritt-Anleitung zum Anbieterwechsel. Ohne Risiko, ohne Versorgungsl\u00fccke.',
    icon: RefreshCw,
    color: 'text-brand-500',
    bg: 'bg-brand-50',
    border: 'border-brand-100',
    datum: '25. Februar 2026',
    lesezeit: '5 Min',
  },
  {
    slug: 'gaskosten-senken-ratgeber',
    title: 'Gaskosten senken: Der ultimative Ratgeber',
    excerpt: 'Alles, was Sie wissen m\u00fcssen, um Ihre Gasrechnung deutlich zu reduzieren.',
    icon: Flame,
    color: 'text-energy-orange',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    datum: '20. Februar 2026',
    lesezeit: '7 Min',
  },
]

export default function BlogPage() {
  return (
    <>
      <MarketingHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-energy-dark pt-28 pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-energy-dark to-energy-dark" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-500/10 blur-3xl" />
          <div className="container-tight relative z-10">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Blog &amp;{' '}
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                Energiespartipps
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-300">
              Praktische Ratgeber und Tipps, mit denen Sie Ihre Strom- und Gaskosten nachhaltig senken.
            </p>
          </div>
        </section>

        {/* Artikel-Liste */}
        <section className="py-24 bg-white">
          <div className="container-tight">
            <div className="grid gap-8 md:grid-cols-3">
              {artikel.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className={`group rounded-2xl border ${a.border} bg-white p-8 shadow-sm hover:shadow-lg transition-all`}
                >
                  <div className={`inline-flex rounded-xl ${a.bg} p-3`}>
                    <a.icon className={`h-6 w-6 ${a.color}`} />
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {a.title}
                  </h2>
                  <p className="mt-2 text-gray-600 leading-relaxed text-sm">
                    {a.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3.5 w-3.5" />
                      {a.lesezeit} Lesezeit
                    </span>
                    <span className="text-xs text-gray-400">{a.datum}</span>
                  </div>
                  <span className="mt-4 inline-flex items-center text-brand-500 font-medium text-sm">
                    Weiterlesen <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <MarketingFooter />
    </>
  )
}
