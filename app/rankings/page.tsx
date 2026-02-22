import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { formatYield, formatPrice, getIssueTypeColor, getRatingColor } from '@/lib/utils'

export default async function RankingsPage() {
  const supabase = createClient()
  
  // Get preferreds ranked by yield
  const { data: preferreds, error } = await supabase
    .from('preferred_shares')
    .select('*, issuers(ticker, name, sector)')
    .eq('is_active', true)
    .order('current_yield', { ascending: false })

  if (error) {
    console.error('Error fetching preferreds:', error)
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-red-500">Error loading data</p>
        </div>
      </>
    )
  }

  // Group by type
  const resetShares = preferreds?.filter((p: any) => p.issue_type === 'reset') || []
  const perpetualShares = preferreds?.filter((p: any) => p.issue_type === 'perpetual') || []
  const floatingShares = preferreds?.filter((p: any) => p.issue_type === 'floating') || []

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Yield Rankings</h1>
          <p className="mt-2 text-gray-600">
            Canadian preferred shares ranked by current yield. Higher yields typically indicate higher risk.
          </p>
        </div>

        {/* Top Yielders Overall */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Yielders</h2>
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Rank</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Symbol</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Issuer</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Yield</th>
                  <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {preferreds?.slice(0, 10).map((pref: any, index: number) => (
                  <tr key={pref.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                      #{index + 1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">
                      <Link 
                        href={`/preferreds/${pref.symbol}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        {pref.symbol}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {pref.issuers?.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getIssueTypeColor(pref.issue_type)}`}>
                        {pref.issue_type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                      {formatPrice(pref.last_price)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-bold text-green-600">
                      {formatYield(pref.current_yield)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                      <span className={getRatingColor(pref.credit_rating)}>
                        {pref.credit_rating || '-'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reset Shares */}
        {resetShares.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Reset Shares (Top 5)</h2>
            <p className="text-sm text-gray-600 mb-4">
              Reset preferred shares offer a fixed dividend until their reset date, when the rate adjusts based on a spread over government bonds.
            </p>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Symbol</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Issuer</th>
                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Yield</th>
                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Reset Spread</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {resetShares.slice(0, 5).map((pref: any) => (
                    <tr key={pref.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium">
                        <Link 
                          href={`/preferreds/${pref.symbol}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          {pref.symbol}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {pref.issuers?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-bold text-green-600">
                        {formatYield(pref.current_yield)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                        +{pref.reset_spread}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Perpetual Shares */}
        {perpetualShares.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Perpetual Shares (Top 5)</h2>
            <p className="text-sm text-gray-600 mb-4">
              Perpetual preferred shares have no maturity date and typically offer a fixed dividend rate indefinitely.
            </p>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Symbol</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Issuer</th>
                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Yield</th>
                    <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {perpetualShares.slice(0, 5).map((pref: any) => (
                    <tr key={pref.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium">
                        <Link 
                          href={`/preferreds/${pref.symbol}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          {pref.symbol}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {pref.issuers?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-bold text-green-600">
                        {formatYield(pref.current_yield)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                        <span className={getRatingColor(pref.credit_rating)}>
                          {pref.credit_rating || '-'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Floating Rate Shares */}
        {floatingShares.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Floating Rate Shares</h2>
            <p className="text-sm text-gray-600 mb-4">
              Floating rate preferred shares have dividends that adjust periodically based on a benchmark rate.
            </p>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Symbol</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Issuer</th>
                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Yield</th>
                    <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {floatingShares.map((pref: any) => (
                    <tr key={pref.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium">
                        <Link 
                          href={`/preferreds/${pref.symbol}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          {pref.symbol}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {pref.issuers?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-bold text-green-600">
                        {formatYield(pref.current_yield)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                        <span className={getRatingColor(pref.credit_rating)}>
                          {pref.credit_rating || '-'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
