import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('preferred_shares')
    .select('id, symbol, issue_type, last_price, current_yield, credit_rating, reset_spread, issuers(ticker, name, sector)')
    .eq('is_active', true)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
