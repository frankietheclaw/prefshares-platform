'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { formatYield, formatPrice, formatSpread, getIssueTypeColor, getRatingColor } from '@/lib/utils'
import { ArrowUp, ArrowDown, ArrowsUpDown } from '@heroicons/react/24/outline'

type Preferred = {
  id: string
  symbol: string
  issue_type: string
  last_price: number | null
  current_yield: number | null
  credit_rating: string | null
  reset_spread: number | null
  issuers?: {
    ticker: string
    name: string
    sector: string
  }
}

type SortKey = 'symbol' | 'issuer' | 'issue_type' | 'last_price' | 'current_yield' | 'credit_rating' | 'reset_spread'

export default function PreferredsPage() {
  const [preferreds, setPreferreds] = useState<Preferred[]>([])
  const [loading, setLoading] = useState(true)
  const [sortKey, setSortKey] = useState<SortKey>('current_yield')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    fetchPreferreds()
  }, [])

  const fetchPreferreds = async () => {
    const res = await fetch('/api/preferreds')
    const data = await res.json()
    setPreferreds(data || [])
    setLoading(false)
  }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection(key === 'current_yield' || key === 'reset_spread' ? 'desc' : 'asc')
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
      return <ArrowsUpDown className="w-4 h-4 text-gray-400 ml-1" />
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-4 h-4 text-primary-600 ml-1" />
      : <ArrowDown className="w-4 h-4 text-primary-600 ml-1" />
  }

  const SortableHeader = ({ label, column }: { label: string; column: SortKey }) => (
    <th 
      scope="col" 
      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 select-none"
      onClick={() => handleSort(column)}
    >
      <div className={`flex items-center ${column === 'last_price' || column === 'current_yield' || column === 'reset_spread' ? 'justify-end' : ''}`}>
        {label}
        <SortIcon column={column} />
      </div>
    </th>
  )

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                      <SortableHeader label="Symbol" column="symbol" />
                      <SortableHeader label="Issuer" column="issuer" />
                      <SortableHeader label="Type" column="issue_type" />
                      <SortableHeader label="Price" column="last_price" />
                      <SortableHeader label="Yield" column="current_yield" />
                      <SortableHeader label="Rating" column="credit_rating" />
                      <SortableHeader label="Reset Spread" column="reset_spread" />
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
                          <div className="text-xs text-gray-400">{pref.issuers?.sector}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getIssueTypeColor(pref.issue_type)}`}>
                            {pref.issue_type}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                          {formatPrice(pref.last_price)}
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
