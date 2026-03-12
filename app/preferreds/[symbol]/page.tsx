import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'

interface PreferredPageProps {
  params: { symbol: string }
}

export default async function PreferredPage({ params }: PreferredPageProps) {
  const supabase = createClient()
  
  // Get the preferred share
  const { data: share, error } = await supabase
    .from('preferred_shares')
    .select('symbol, issuer_id')
    .eq('symbol', params.symbol)
    .single()

  if (error || !share) {
    notFound()
  }

  // Get the issuer ticker
  const { data: issuer } = await supabase
    .from('issuers')
    .select('ticker')
    .eq('id', share.issuer_id)
    .single()

  if (issuer?.ticker) {
    redirect(`/issuers/${issuer.ticker}`)
  }

  notFound()
}
