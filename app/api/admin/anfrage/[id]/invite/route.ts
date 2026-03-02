import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { sendKundenBestaetigung } from '@/lib/brevo'

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient()

    // Admin-Check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
    }

    // Anfrage laden
    const { data: anfrage, error } = await supabase
      .from('analyse_anfragen')
      .select('nachname, email')
      .eq('id', params.id)
      .single()

    if (error || !anfrage) {
      return NextResponse.json({ error: 'Anfrage nicht gefunden' }, { status: 404 })
    }

    // Einladungs-E-Mail senden
    await sendKundenBestaetigung(anfrage.nachname, anfrage.email)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Invite API Fehler:', err)
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten.' },
      { status: 500 }
    )
  }
}
