import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { Archive, ArrowLeft } from 'lucide-react'

export default async function DelistedPage() {
  const supabase = createClient()
  
  const { data: delisted, error } = await supabase
    .from('delisted_preferred_shares')
    .select(`
      *,
      issuers(ticker, name)
    `)
    .order('delisted_date', { ascending: false })

  // Type the result
  type DelistedShare = {
    id: string
    symbol: string
    name: string | null
    issue_type: string | null
    last_price: number | null
    current_yield: number | null
    credit_rating: string | null
    reset_spread: number | null
    delisted_date: string | null
    notes: string | null
    issuers: { ticker: string; name: string } | null
  }

  const typedDelisted = (delisted || []) as DelistedShare[]

  const formatYield = (val: number | null) => val ? `${(val * 100).toFixed(2)}%` : '-'
  const formatPrice = (val: number | null) => val ? `$${val.toFixed(2)}` : '-'

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/preferreds"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Active Preferreds
        </Link>

        <div className="mb-8">
          <div className="flex items-center">
            <Archive className="h-8 w-8 text-gray-400 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Delisted Preferred Shares</h1>
              <p className="mt-1 text-gray-600">
                Archive of preferred shares that are no longer trading. For reference only.
              </p>
            </div>
          </div>
        </div>

        {typedDelisted.length > 0 ? (
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Issuer</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Last Price</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Last Yield</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900 uppercase tracking-wider">Delisted Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {typedDelisted.map((share) => (
                    <tr key={share.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {share.symbol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {share.issuers?.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                        {share.issue_type || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        {formatPrice(share.last_price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                        {formatYield(share.current_yield)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                        {share.credit_rating || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                        {share.delisted_date || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {share.notes || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
            <Archive className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No delisted preferred shares yet.</p>
          </div>
        )}

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This list contains preferred shares that have been delisted or are no longer trading. 
            Data shown is the last known information before delisting and is not updated.
          </p>
        </div>
      </div>
    </>
  )
}
