import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'

interface PreferredPageProps {
  params: { symbol: string }
}

export default async function PreferredPage({ params }: PreferredPageProps) {
  const supabase = createClient()
  
  // Get the preferred share with issuer info
  const { data: share, error } = await supabase
    .from('preferred_shares')
    .select(`
      symbol,
      issuers(ticker)
    `)
    .eq('symbol', params.symbol)
    .single()

  if (error || !share) {
    notFound()
  }

  // Redirect to issuer page
  const issuerTicker = (share.issuers as any)?.ticker
  if (issuerTicker) {
    redirect(`/issuers/${issuerTicker}`)
  }

  notFound()
}
