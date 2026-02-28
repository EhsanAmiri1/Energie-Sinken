import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { isAdmin } from '@/lib/admin'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !isAdmin(user.email)) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 403 })
  }

  // Anfrage laden um den Dateipfad zu bekommen
  const { data: anfrage } = await supabase
    .from('analyse_anfragen')
    .select('abrechnung_path, abrechnung_filename')
    .eq('id', params.id)
    .single()

  if (!anfrage?.abrechnung_path) {
    return NextResponse.json({ error: 'Keine Datei vorhanden' }, { status: 404 })
  }

  // Signierte URL erstellen (60 Sekunden gültig)
  const { data, error } = await supabase.storage
    .from('analyse-abrechnungen')
    .createSignedUrl(anfrage.abrechnung_path, 60)

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: 'Datei konnte nicht geladen werden' }, { status: 500 })
  }

  return NextResponse.redirect(data.signedUrl)
}
