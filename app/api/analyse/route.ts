import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendKundenBestaetigung, sendAdminBenachrichtigung } from '@/lib/brevo'

// Supabase Admin Client (umgeht RLS)
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Supabase Umgebungsvariablen fehlen')
  }
  return createClient(url, serviceKey)
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Felder extrahieren
    const vorname = formData.get('vorname') as string
    const nachname = formData.get('nachname') as string
    const geburtsdatum = formData.get('geburtsdatum') as string | null
    const email = formData.get('email') as string
    const telefon = formData.get('telefon') as string | null
    const zaehler_nummer = formData.get('zaehler_nummer') as string | null
    const verbrauch_kwh = formData.get('verbrauch_kwh') as string | null
    const marktlokations_id = formData.get('marktlokations_id') as string | null
    const abrechnung = formData.get('abrechnung') as File | null

    // Pflichtfelder validieren
    if (!vorname || !nachname || !email) {
      return NextResponse.json(
        { error: 'Vorname, Nachname und E-Mail sind Pflichtfelder.' },
        { status: 400 }
      )
    }

    // E-Mail Format validieren
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()

    // Datei hochladen (falls vorhanden)
    let abrechnung_path: string | null = null
    let abrechnung_filename: string | null = null
    let abrechnungBase64: string | undefined

    if (abrechnung && abrechnung.size > 0) {
      // Dateiname bereinigen und eindeutig machen
      const timestamp = Date.now()
      const safeFilename = abrechnung.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const storagePath = `${timestamp}_${safeFilename}`

      // Datei in Buffer konvertieren
      const fileBuffer = Buffer.from(await abrechnung.arrayBuffer())

      // In Supabase Storage hochladen
      const { error: uploadError } = await supabase.storage
        .from('analyse-abrechnungen')
        .upload(storagePath, fileBuffer, {
          contentType: abrechnung.type,
          upsert: false,
        })

      if (uploadError) {
        console.error('Storage Upload Fehler:', uploadError)
        return NextResponse.json(
          { error: 'Datei konnte nicht hochgeladen werden.' },
          { status: 500 }
        )
      }

      abrechnung_path = storagePath
      abrechnung_filename = abrechnung.name

      // Base64 für E-Mail-Anhang
      abrechnungBase64 = fileBuffer.toString('base64')
    }

    // In Datenbank speichern
    const { error: dbError } = await supabase
      .from('analyse_anfragen')
      .insert({
        vorname,
        nachname,
        geburtsdatum: geburtsdatum || null,
        email,
        telefon: telefon || null,
        zaehler_nummer: zaehler_nummer || null,
        verbrauch_kwh: verbrauch_kwh ? parseFloat(verbrauch_kwh) : null,
        marktlokations_id: marktlokations_id || null,
        abrechnung_path,
        abrechnung_filename,
      })

    if (dbError) {
      console.error('Datenbank Fehler:', dbError)
      return NextResponse.json(
        { error: 'Daten konnten nicht gespeichert werden.' },
        { status: 500 }
      )
    }

    // E-Mails senden (parallel, Fehler nicht blockierend)
    const emailPromises = [
      sendKundenBestaetigung(nachname, email).catch((err) => {
        console.error('Kunden-E-Mail Fehler:', err)
      }),
      sendAdminBenachrichtigung({
        vorname,
        nachname,
        geburtsdatum: geburtsdatum || undefined,
        email,
        telefon: telefon || undefined,
        zaehler_nummer: zaehler_nummer || undefined,
        verbrauch_kwh: verbrauch_kwh || undefined,
        marktlokations_id: marktlokations_id || undefined,
        abrechnung_filename: abrechnung_filename || undefined,
        abrechnungBase64,
      }).catch((err) => {
        console.error('Admin-E-Mail Fehler:', err)
      }),
    ]

    await Promise.all(emailPromises)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analyse API Fehler:', error)
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    )
  }
}
