'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { ArrowUpIcon, ArrowDownIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline'

type Preferred = {
  id: string
  symbol: string
  name: string
  issue_type: string
  last_price: number | null
  current_yield: number | null
  credit_rating: string | null
  reset_spread: number | null
  sector: string | null
  industry: string | null
  week_52_high: number | null
  week_52_low: number | null
  volume: number | null
  price_change_percent: number | null
  market_cap: number | null
  dividend_rate: number | null
  dividend_frequency: string | null
  description: string | null
  issuers?: {
    ticker: string
    name: string
    sector: string
  }
}

type SortKey = 'symbol' | 'issuer' | 'issue_type' | 'last_price' | 'current_yield' | 'credit_rating' | 'reset_spread' | 'sector' | 'week_52_high' | 'volume' | 'price_change_percent' | 'market_cap'

const SUPABASE_URL = 'https://veqfwdhejertooqojnup.supabase.co'
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlcWZ3ZGhlamVydG9vcW9qbnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDY3MjQsImV4cCI6MjA4NzAyMjcyNH0.Nl822bymoaQtdAEbLm-N-h-2PvUdNGYqV9lXnwOn1iU'

export default function PreferredsPage() {
  const [preferreds, setPreferreds] = useState<Preferred[]>([])
  const [loading, setLoading] = useState(true)
  const [sortKey, setSortKey] = useState<SortKey>('current_yield')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    fetchPreferreds()
  }, [])

  const fetchPreferreds = async () => {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/preferred_shares?select=*,issuers(ticker,name,sector)&is_active=eq.true&order=current_yield.desc`,
        {
          headers: {
            'apikey': ANON_KEY,
            'Authorization': `Bearer ${ANON_KEY}`,
          },
        }
      )
      const data = await res.json()
      setPreferreds(data || [])
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection(key === 'current_yield' || key === 'reset_spread' || key === 'week_52_high' || key === 'volume' || key === 'market_cap' ? 'desc' : 'asc')
    }
  }

  const sortedPreferreds = [...preferreds].sort((a, b) => {
    let aVal: any
    let bVal: any

    switch (sortKey) {
      case 'symbol':
        aVal = a.symbol
        bVal = b.symbol
        break
      case 'issuer':
        aVal = a.issuers?.name || ''
        bVal = b.issuers?.name || ''
        break
      case 'issue_type':
        aVal = a.issue_type
        bVal = b.issue_type
        break
      case 'last_price':
        aVal = a.last_price || 0
        bVal = b.last_price || 0
        break
      case 'current_yield':
        aVal = a.current_yield || 0
        bVal = b.current_yield || 0
        break
      case 'credit_rating':
        aVal = a.credit_rating || 'Z'
        bVal = b.credit_rating || 'Z'
        break
      case 'reset_spread':
        aVal = a.reset_spread || 0
        bVal = b.reset_spread || 0
        break
      case 'sector':
        aVal = a.sector || ''
        bVal = b.sector || ''
        break
      case 'week_52_high':
        aVal = a.week_52_high || 0
        bVal = b.week_52_high || 0
        break
      case 'volume':
        aVal = a.volume || 0
        bVal = b.volume || 0
        break
      case 'price_change_percent':
        aVal = a.price_change_percent || 0
        bVal = b.price_change_percent || 0
        break
      case 'market_cap':
        aVal = a.market_cap || 0
        bVal = b.market_cap || 0
        break
      default:
        return 0
    }

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' 
        ? aVal.localeCompare(bVal) 
        : bVal.localeCompare(aVal)
    }

    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
  })

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) {
      return <ArrowsUpDownIcon className="w-4 h-4 text-gray-400 ml-1" />
    }
    return sortDirection === 'asc' 
      ? <ArrowUpIcon className="w-4 h-4 text-primary-600 ml-1" />
      : <ArrowDownIcon className="w-4 h-4 text-primary-600 ml-1" />
  }

  const formatYield = (val: number | null) => val ? `${val.toFixed(2)}%` : '-'
  const formatPrice = (val: number | null) => val ? `$${val.toFixed(2)}` : '-'
  const formatSpread = (val: number | null) => val ? `+${val.toFixed(2)}%` : '-'
  const formatVolume = (val: number | null) => val ? (val / 1000000).toFixed(2) + 'M' : '-'
  const formatMarketCap = (val: number | null) => val ? '$' + (val / 1000000000).toFixed(2) + 'B' : '-'
  const formatChange = (val: number | null) => {
    if (!val) return '-'
    const sign = val >= 0 ? '+' : ''
    return `${sign}${val.toFixed(2)}%`
  }
  
  const getIssueTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      reset: 'bg-blue-100 text-blue-800',
      perpetual: 'bg-purple-100 text-purple-800',
      floating: 'bg-green-100 text-green-800',
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }
  
  const getRatingColor = (rating: string | null) => {
    if (!rating) return 'text-gray-400'
    if (rating === 'P-1') return 'text-green-600 font-semibold'
    if (rating === 'P-2') return 'text-blue-600'
    return 'text-gray-600'
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-gray-500">Loading preferred shares...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">All Preferred Shares</h1>
            <p className="mt-2 text-sm text-gray-700">
              Browse all {preferreds?.length || 0} Canadian preferred shares. Click column headers to sort.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th onClick={() => handleSort('symbol')} className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center">Symbol <SortIcon column="symbol" /></div>
                      </th>
                      <th onClick={() => handleSort('issuer')} className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center">Issuer <SortIcon column="issuer" /></div>
                      </th>
                      <th onClick={() => handleSort('issue_type')} className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center">Type <SortIcon column="issue_type" /></div>
                      </th>
                      <th onClick={() => handleSort('last_price')} className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center justify-end">Price <SortIcon column="last_price" /></div>
                      </th>
                      <th onClick={() => handleSort('price_change_percent')} className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center justify-end">Change <SortIcon column="price_change_percent" /></div>
                      </th>
                      <th onClick={() => handleSort('current_yield')} className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center justify-end">Yield <SortIcon column="current_yield" /></div>
                      </th>
                      <th onClick={() => handleSort('credit_rating')} className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center justify-center">Rating <SortIcon column="credit_rating" /></div>
                      </th>
                      <th onClick={() => handleSort('reset_spread')} className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center justify-end">Spread <SortIcon column="reset_spread" /></div>
                      </th>
                      <th onClick={() => handleSort('week_52_high')} className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center justify-end">52W High <SortIcon column="week_52_high" /></div>
                      </th>
                      <th onClick={() => handleSort('volume')} className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center justify-end">Volume <SortIcon column="volume" /></div>
                      </th>
                      <th onClick={() => handleSort('sector')} className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center">Sector <SortIcon column="sector" /></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {sortedPreferreds?.map((pref: Preferred) => (
                      <tr key={pref.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <Link 
                            href={`/preferreds/${pref.symbol}`}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            {pref.symbol}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <Link 
                            href={`/issuers/${pref.issuers?.ticker}`}
                            className="hover:text-gray-900"
                          >
                            {pref.issuers?.name}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getIssueTypeColor(pref.issue_type)}`}>
                            {pref.issue_type}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                          {formatPrice(pref.last_price)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                          <span className={pref.price_change_percent && pref.price_change_percent >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {formatChange(pref.price_change_percent)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium text-gray-900">
                          {formatYield(pref.current_yield)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                          <span className={getRatingColor(pref.credit_rating)}>
                            {pref.credit_rating || '-'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                          {formatSpread(pref.reset_spread)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                          {formatPrice(pref.week_52_high)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                          {formatVolume(pref.volume)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-xs">{pref.sector || '-'}</div>
                          {pref.industry && <div className="text-xs text-gray-400">{pref.industry}</div>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
