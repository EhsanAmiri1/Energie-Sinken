import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { isAdmin } from '@/lib/admin'
import { sendErgebnisEmail } from '@/lib/brevo'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !isAdmin(user.email)) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 403 })
  }

  try {
    const formData = await request.formData()
    const datei = formData.get('datei') as File | null
    const ersparnis = formData.get('ersparnis_euro') as string

    if (!datei || datei.size === 0) {
      return NextResponse.json({ error: 'Bitte eine Datei hochladen.' }, { status: 400 })
    }

    if (!ersparnis || isNaN(parseFloat(ersparnis))) {
      return NextResponse.json({ error: 'Bitte einen gültigen Ersparnis-Betrag eingeben.' }, { status: 400 })
    }

    // Anfrage laden
    const { data: anfrage } = await supabase
      .from('analyse_anfragen')
      .select('vorname, nachname, email')
      .eq('id', params.id)
      .single()

    if (!anfrage) {
      return NextResponse.json({ error: 'Anfrage nicht gefunden' }, { status: 404 })
    }

    // Datei hochladen
    const timestamp = Date.now()
    const safeFilename = datei.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const storagePath = `${params.id}/${timestamp}_${safeFilename}`
    const fileBuffer = Buffer.from(await datei.arrayBuffer())

    const { error: uploadError } = await supabase.storage
      .from('analyse-ergebnisse')
      .upload(storagePath, fileBuffer, {
        contentType: datei.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Storage Upload Fehler:', uploadError)
      return NextResponse.json({ error: 'Datei konnte nicht hochgeladen werden.' }, { status: 500 })
    }

    // DB updaten: Ergebnis + Status auf abgeschlossen
    const { error: dbError } = await supabase
      .from('analyse_anfragen')
      .update({
        ergebnis_path: storagePath,
        ergebnis_filename: datei.name,
        ersparnis_euro: parseFloat(ersparnis),
        status: 'abgeschlossen',
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)

    if (dbError) {
      console.error('DB Update Fehler:', dbError)
      return NextResponse.json({ error: 'Daten konnten nicht gespeichert werden.' }, { status: 500 })
    }

    // E-Mail an Kunden senden (nicht blockierend)
    const ergebnisBase64 = fileBuffer.toString('base64')
    sendErgebnisEmail({
      vorname: anfrage.vorname,
      nachname: anfrage.nachname,
      email: anfrage.email,
      ersparnis_euro: ersparnis,
      ergebnis_filename: datei.name,
      ergebnisBase64,
    }).catch((err) => {
      console.error('Ergebnis-E-Mail Fehler:', err)
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Ergebnis Upload Fehler:', error)
    return NextResponse.json({ error: 'Ein unerwarteter Fehler ist aufgetreten.' }, { status: 500 })
  }
}
