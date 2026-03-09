import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { ArrowLeft, Globe, Building2, ExternalLink, TrendingUp, Shield } from 'lucide-react'

export default async function IssuerDetailPage({ params }: { params: { ticker: string } }) {
  const supabase = createClient()
  const { ticker } = params

  // Fetch issuer
  const { data: issuer, error: issuerError } = await supabase
    .from('issuers')
    .select('*')
    .eq('ticker', ticker)
    .single()

  if (issuerError || !issuer) {
    notFound()
  }

  const typedIssuer = issuer as {
    id: string
    ticker: string
    name: string
    sector: string | null
    website: string | null
    description: string | null
    sedar_url: string | null
  }

  // Fetch issuer's preferred shares
  const { data: preferreds } = await supabase
    .from('preferred_shares')
    .select('*')
    .eq('issuer_id', typedIssuer.id)
    .eq('is_active', true)
    .order('current_yield', { ascending: false })

  const typedPreferreds = preferreds as {
    id: string
    symbol: string
    name: string | null
    issue_type: string
    last_price: number | null
    current_yield: number | null
    credit_rating: string | null
    reset_spread: number | null
    reset_date: string | null
  }[]

  const formatYield = (val: number | null) => val ? `${(val * 100).toFixed(2)}%` : '-'
  const formatPrice = (val: number | null) => val ? `$${val.toFixed(2)}` : '-'
  const formatSpread = (val: number | null) => val ? `+${(val * 100).toFixed(2)}%` : '-'

  const getIssueTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      reset: 'bg-blue-100 text-blue-800',
      perpetual: 'bg-purple-100 text-purple-800',
      floating: 'bg-green-100 text-green-800',
      split_share: 'bg-orange-100 text-orange-800',
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const getRatingColor = (rating: string | null) => {
    if (!rating) return 'text-gray-400'
    if (rating === 'P-1') return 'text-green-600 font-semibold'
    if (rating === 'P-2') return 'text-blue-600'
    if (rating === 'P-3') return 'text-yellow-600'
    return 'text-gray-600'
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          href="/issuers"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Issuers
        </Link>

        {/* Issuer Header */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 rounded-lg p-4">
                <Building2 className="h-12 w-12 text-primary-600" />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">{typedIssuer.name}</h1>
                <p className="text-lg text-primary-600 font-medium">{typedIssuer.ticker}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 capitalize">
                {typedIssuer.sector || 'Other'}
              </span>
              {typedIssuer.sedar_url && (
                <a
                  href={typedIssuer.sedar_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
                >
                  SEDAR+
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
              {typedIssuer.website && (
                <a
                  href={typedIssuer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 hover:bg-green-200"
                >
                  <Globe className="w-3 h-3 mr-1" />
                  Website
                </a>
              )}
            </div>
          </div>

          {typedIssuer.description && (
            <p className="mt-4 text-gray-600">{typedIssuer.description}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-500">Preferred Shares</p>
                <p className="text-2xl font-bold text-gray-900">{typedPreferreds?.length || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-500">Credit Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {typedPreferreds?.[0]?.credit_rating || '-'}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">%</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Avg Yield</p>
                <p className="text-2xl font-bold text-gray-900">
                  {typedPreferreds?.length ? formatYield(typedPreferreds.reduce((sum, p) => sum + (p.current_yield || 0), 0) / typedPreferreds.length) : '-'}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">$</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Avg Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  {typedPreferreds?.length ? formatPrice(typedPreferreds.reduce((sum, p) => sum + (p.last_price || 0), 0) / typedPreferreds.length) : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preferred Shares Table */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Preferred Shares</h2>
          </div>
          
          {typedPreferreds && typedPreferreds.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Issue Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Yield</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Reset Spread</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900 uppercase tracking-wider">Reset Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {typedPreferreds.map((pref) => (
                    <tr key={pref.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={`/preferreds/${pref.symbol}`}
                          className="text-primary-600 hover:text-primary-900 font-medium"
                        >
                          {pref.symbol}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {pref.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getIssueTypeColor(pref.issue_type)}`}>
                          {pref.issue_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-medium">
                        {formatPrice(pref.last_price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <span className="text-green-600 font-medium">{formatYield(pref.current_yield)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={getRatingColor(pref.credit_rating)}>
                          {pref.credit_rating || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                        {formatSpread(pref.reset_spread)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                        {pref.reset_date || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center text-gray-500">
              No active preferred shares for this issuer.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
