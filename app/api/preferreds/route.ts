import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('preferred_shares')
    .select('*, issuers(ticker, name, sector)')
    .eq('is_active', true)

  if (error) {
    return NextResponse.json({ error: 'Failed to load preferreds' }, { status: 500 })
  }

  return NextResponse.json(data)
}
