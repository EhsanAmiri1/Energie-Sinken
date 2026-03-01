import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 403 })
  }

  // Anfrage laden
  const { data: anfrage } = await supabase
    .from('analyse_anfragen')
    .select('ergebnis_path, ergebnis_filename, email')
    .eq('id', params.id)
    .single()

  if (!anfrage?.ergebnis_path) {
    return NextResponse.json({ error: 'Kein Ergebnis vorhanden' }, { status: 404 })
  }

  // Signierte URL erstellen (60 Sekunden gültig)
  const { data, error } = await supabase.storage
    .from('analyse-ergebnisse')
    .createSignedUrl(anfrage.ergebnis_path, 60)

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: 'Datei konnte nicht geladen werden' }, { status: 500 })
  }

  return NextResponse.redirect(data.signedUrl)
}
