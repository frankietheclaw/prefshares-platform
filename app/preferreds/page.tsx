'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { ArrowUpIcon, ArrowDownIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import { Filter, Columns3, X, Settings2 } from 'lucide-react'

type Preferred = {
  id: string
  symbol: string
  name: string | null
  issue_type: string
  last_price: number | null
  bid_price: number | null
  ask_price: number | null
  current_yield: number | null
  current_dividend: number | null
  dividend_rate: number | null
  dividend_frequency: string | null
  credit_rating: string | null
  credit_agency: string | null
  reset_spread: number | null
  reset_date: string | null
  reset_benchmark: string | null
  call_date: string | null
  maturity_date: string | null
  issue_date: string | null
  sector: string | null
  industry: string | null
  week_52_high: number | null
  week_52_low: number | null
  volume: number | null
  volume_30day: number | null
  price_change_percent: number | null
  par_value: number | null
  is_cumulative: boolean | null
  yield_to_worst: number | null
  issuers?: {
    ticker: string
    name: string
    sector: string
  }
}

type ColumnConfig = {
  key: string
  label: string
  sortable: boolean
  format?: (val: any) => string
  align?: 'left' | 'right' | 'center'
  width?: string
}

const SUPABASE_URL = 'https://veqfwdhejertooqojnup.supabase.co'
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlcWZ3ZGhlamVydG9vcW9qbnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDY3MjQsImV4cCI6MjA4NzAyMjcyNH0.Nl822bymoaQtdAEbLm-N-h-2PvUdNGYqV9lXnwOn1iU'

// All available columns
const ALL_COLUMNS: ColumnConfig[] = [
  { key: 'symbol', label: 'Symbol', sortable: true, align: 'left', width: 'w-24' },
  { key: 'issuer', label: 'Issuer', sortable: true, align: 'left', width: 'w-40' },
  { key: 'name', label: 'Issue Name', sortable: true, align: 'left', width: 'w-48' },
  { key: 'issue_type', label: 'Type', sortable: true, align: 'left', width: 'w-24' },
  { key: 'last_price', label: 'Price', sortable: true, align: 'right', width: 'w-20', format: (v) => v ? `$${v.toFixed(2)}` : '-' },
  { key: 'bid_price', label: 'Bid', sortable: true, align: 'right', width: 'w-20', format: (v) => v ? `$${v.toFixed(2)}` : '-' },
  { key: 'ask_price', label: 'Ask', sortable: true, align: 'right', width: 'w-20', format: (v) => v ? `$${v.toFixed(2)}` : '-' },
  { key: 'price_change_percent', label: 'Change %', sortable: true, align: 'right', width: 'w-24', format: (v) => v ? `${v >= 0 ? '+' : ''}${v.toFixed(2)}%` : '-' },
  { key: 'current_yield', label: 'Current Yield', sortable: true, align: 'right', width: 'w-24', format: (v) => v ? `${(v * 100).toFixed(2)}%` : '-' },
  { key: 'current_dividend', label: 'Annual Div', sortable: true, align: 'right', width: 'w-24', format: (v) => v ? `$${v.toFixed(3)}` : '-' },
  { key: 'dividend_rate', label: 'Div Rate', sortable: true, align: 'right', width: 'w-20', format: (v) => v ? `${v.toFixed(2)}%` : '-' },
  { key: 'dividend_frequency', label: 'Frequency', sortable: true, align: 'center', width: 'w-24' },
  { key: 'credit_rating', label: 'Rating', sortable: true, align: 'center', width: 'w-20' },
  { key: 'credit_agency', label: 'Agency', sortable: true, align: 'center', width: 'w-20' },
  { key: 'reset_spread', label: 'Reset Spread', sortable: true, align: 'right', width: 'w-28', format: (v) => v ? `+${(v * 100).toFixed(2)}%` : '-' },
  { key: 'reset_date', label: 'Reset Date', sortable: true, align: 'center', width: 'w-28' },
  { key: 'reset_benchmark', label: 'Benchmark', sortable: true, align: 'center', width: 'w-28' },
  { key: 'call_date', label: 'Call Date', sortable: true, align: 'center', width: 'w-28' },
  { key: 'maturity_date', label: 'Maturity', sortable: true, align: 'center', width: 'w-24' },
  { key: 'issue_date', label: 'Issue Date', sortable: true, align: 'center', width: 'w-28' },
  { key: 'sector', label: 'Sector', sortable: true, align: 'left', width: 'w-28' },
  { key: 'industry', label: 'Industry', sortable: true, align: 'left', width: 'w-32' },
  { key: 'week_52_high', label: '52W High', sortable: true, align: 'right', width: 'w-24', format: (v) => v ? `$${v.toFixed(2)}` : '-' },
  { key: 'week_52_low', label: '52W Low', sortable: true, align: 'right', width: 'w-24', format: (v) => v ? `$${v.toFixed(2)}` : '-' },
  { key: 'volume', label: 'Volume', sortable: true, align: 'right', width: 'w-24', format: (v) => v ? (v / 1000000).toFixed(2) + 'M' : '-' },
  { key: 'volume_30day', label: 'Avg Volume', sortable: true, align: 'right', width: 'w-24', format: (v) => v ? (v / 1000000).toFixed(2) + 'M' : '-' },
  { key: 'par_value', label: 'Par Value', sortable: true, align: 'right', width: 'w-24', format: (v) => v ? `$${v.toFixed(2)}` : '-' },
  { key: 'is_cumulative', label: 'Cumulative', sortable: true, align: 'center', width: 'w-24', format: (v) => v ? 'Yes' : 'No' },
  { key: 'yield_to_worst', label: 'YTW', sortable: true, align: 'right', width: 'w-20', format: (v) => v ? `${(v * 100).toFixed(2)}%` : '-' },
]

// Preset views
const VIEW_PRESETS: Record<string, string[]> = {
  overview: ['symbol', 'issuer', 'issue_type', 'last_price', 'price_change_percent', 'current_yield', 'credit_rating', 'sector'],
  yield: ['symbol', 'issuer', 'issue_type', 'last_price', 'current_yield', 'current_dividend', 'dividend_rate', 'dividend_frequency', 'credit_rating'],
  reset: ['symbol', 'issuer', 'issue_type', 'last_price', 'current_yield', 'reset_spread', 'reset_date', 'reset_benchmark', 'call_date'],
  trading: ['symbol', 'issuer', 'last_price', 'bid_price', 'ask_price', 'price_change_percent', 'volume', 'volume_30day', 'week_52_high', 'week_52_low'],
  all: ALL_COLUMNS.map(c => c.key),
}

export default function PreferredsScreener() {
  const [preferreds, setPreferreds] = useState<Preferred[]>([])
  const [loading, setLoading] = useState(true)
  const [sortKey, setSortKey] = useState<string>('current_yield')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [activeView, setActiveView] = useState<string>('overview')
  const [visibleColumns, setVisibleColumns] = useState<string[]>(VIEW_PRESETS.overview)
  const [showColumnPicker, setShowColumnPicker] = useState(true)
  
  // Filters
  const [filters, setFilters] = useState({
    issueType: '',
    sector: '',
    creditRating: '',
    minYield: '',
    maxYield: '',
    issuer: '',
  })
  const [showFilters, setShowFilters] = useState(true)

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

  // Get unique filter options
  const filterOptions = useMemo(() => {
    const issueTypes = Array.from(new Set(preferreds.map(p => p.issue_type).filter((v): v is string => !!v))).sort()
    const sectors = Array.from(new Set(preferreds.map(p => p.sector).filter((v): v is string => !!v))).sort()
    const creditRatings = Array.from(new Set(preferreds.map(p => p.credit_rating).filter((v): v is string => !!v))).sort()
    const issuers = Array.from(new Set(preferreds.map(p => p.issuers?.name).filter((v): v is string => !!v))).sort()
    return { issueTypes, sectors, creditRatings, issuers }
  }, [preferreds])

  // Apply filters
  const filteredPreferreds = useMemo(() => {
    return preferreds.filter(pref => {
      if (filters.issueType && pref.issue_type !== filters.issueType) return false
      if (filters.sector && pref.sector !== filters.sector) return false
      if (filters.creditRating && pref.credit_rating !== filters.creditRating) return false
      if (filters.issuer && pref.issuers?.name !== filters.issuer) return false
      if (filters.minYield && pref.current_yield && pref.current_yield < parseFloat(filters.minYield) / 100) return false
      if (filters.maxYield && pref.current_yield && pref.current_yield > parseFloat(filters.maxYield) / 100) return false
      return true
    })
  }, [preferreds, filters])

  // Sort
  const sortedPreferreds = useMemo(() => {
    const col = ALL_COLUMNS.find(c => c.key === sortKey)
    if (!col) return filteredPreferreds

    return [...filteredPreferreds].sort((a, b) => {
      let aVal: any, bVal: any

      if (sortKey === 'issuer') {
        aVal = a.issuers?.name || ''
        bVal = b.issuers?.name || ''
      } else {
        aVal = (a as any)[sortKey]
        bVal = (b as any)[sortKey]
      }

      if (aVal === null || aVal === undefined) aVal = sortDirection === 'asc' ? Infinity : -Infinity
      if (bVal === null || bVal === undefined) bVal = sortDirection === 'asc' ? Infinity : -Infinity

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }

      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
    })
  }, [filteredPreferreds, sortKey, sortDirection])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('desc')
    }
  }

  const handleViewChange = (view: string) => {
    setActiveView(view)
    setVisibleColumns(VIEW_PRESETS[view])
  }

  const toggleColumn = (key: string) => {
    setVisibleColumns(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key)
        : [...prev, key]
    )
  }

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
    return 'text-gray-600'
  }

  const activeColumns = ALL_COLUMNS.filter(c => visibleColumns.includes(c.key))
  const filteredCount = filteredPreferreds.length
  const totalCount = preferreds.length

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-full mx-auto px-4 py-8">
          <p className="text-gray-500">Loading preferred shares...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Preferred Shares Screener</h1>
          <p className="text-sm text-gray-600 mt-1">
            {filteredCount} of {totalCount} preferred shares
          </p>
        </div>

        {/* View Tabs */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="flex space-x-1">
            {Object.keys(VIEW_PRESETS).map((view) => (
              <button
                key={view}
                onClick={() => handleViewChange(view)}
                className={`px-3 py-2 text-sm font-medium rounded-t-lg capitalize ${
                  activeView === view
                    ? 'bg-primary-100 text-primary-700 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {view}
              </button>
            ))}
          </nav>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              showFilters ? 'bg-primary-100 text-primary-700' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          
          <button
            onClick={() => setShowColumnPicker(!showColumnPicker)}
            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              showColumnPicker ? 'bg-primary-100 text-primary-700' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Columns3 className="w-4 h-4 mr-2" />
            Columns ({visibleColumns.length})
          </button>

          {Object.entries(filters).some(([_, v]) => v) && (
            <button
              onClick={() => setFilters({ issueType: '', sector: '', creditRating: '', minYield: '', maxYield: '', issuer: '' })}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Filters
            </button>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Issue Type</label>
              <select
                value={filters.issueType}
                onChange={(e) => setFilters(f => ({ ...f, issueType: e.target.value }))}
                className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All</option>
                {filterOptions.issueTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Sector</label>
              <select
                value={filters.sector}
                onChange={(e) => setFilters(f => ({ ...f, sector: e.target.value }))}
                className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All</option>
                {filterOptions.sectors.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Credit Rating</label>
              <select
                value={filters.creditRating}
                onChange={(e) => setFilters(f => ({ ...f, creditRating: e.target.value }))}
                className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All</option>
                {filterOptions.creditRatings.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Issuer</label>
              <select
                value={filters.issuer}
                onChange={(e) => setFilters(f => ({ ...f, issuer: e.target.value }))}
                className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All</option>
                {filterOptions.issuers.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Min Yield %</label>
              <input
                type="number"
                step="0.1"
                value={filters.minYield}
                onChange={(e) => setFilters(f => ({ ...f, minYield: e.target.value }))}
                placeholder="e.g. 5"
                className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Max Yield %</label>
              <input
                type="number"
                step="0.1"
                value={filters.maxYield}
                onChange={(e) => setFilters(f => ({ ...f, maxYield: e.target.value }))}
                placeholder="e.g. 10"
                className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        )}

        {/* Column Picker */}
        {showColumnPicker && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-900">Select Columns</h3>
              <button
                onClick={() => setVisibleColumns(ALL_COLUMNS.map(c => c.key))}
                className="text-xs text-primary-600 hover:text-primary-800"
              >
                Select All
              </button>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-48 overflow-y-auto">
              {ALL_COLUMNS.map(col => (
                <label key={col.key} className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-100 p-1 rounded">
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.key)}
                    onChange={() => toggleColumn(col.key)}
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700">{col.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Results Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {activeColumns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={`px-3 py-2 text-xs font-semibold text-gray-900 uppercase tracking-wider whitespace-nowrap ${
                      col.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                    } ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                  >
                    <div className={`flex items-center ${col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : ''}`}>
                      {col.label}
                      {col.sortable && (
                        sortKey === col.key ? (
                          sortDirection === 'asc' ? <ArrowUpIcon className="w-3 h-3 ml-1 text-primary-600" /> : <ArrowDownIcon className="w-3 h-3 ml-1 text-primary-600" />
                        ) : (
                          <ArrowsUpDownIcon className="w-3 h-3 ml-1 text-gray-400" />
                        )
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sortedPreferreds.map((pref) => (
                <tr key={pref.id} className="hover:bg-gray-50">
                  {activeColumns.map((col) => {
                    let content: React.ReactNode
                    
                    if (col.key === 'symbol') {
                      content = (
                        <Link href={`/preferreds/${pref.symbol}`} className="text-primary-600 hover:text-primary-900 font-medium">
                          {pref.symbol}
                        </Link>
                      )
                    } else if (col.key === 'issuer') {
                      content = (
                        <Link href={`/issuers/${pref.issuers?.ticker}`} className="text-gray-600 hover:text-gray-900">
                          {pref.issuers?.name || '-'}
                        </Link>
                      )
                    } else if (col.key === 'issue_type') {
                      content = (
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getIssueTypeColor(pref.issue_type)}`}>
                          {pref.issue_type}
                        </span>
                      )
                    } else if (col.key === 'credit_rating') {
                      content = <span className={getRatingColor(pref.credit_rating)}>{pref.credit_rating || '-'}</span>
                    } else if (col.key === 'price_change_percent') {
                      const val = pref.price_change_percent
                      content = <span className={val && val >= 0 ? 'text-green-600' : 'text-red-600'}>{col.format?.(val) || val || '-'}</span>
                    } else {
                      const val = col.key === 'issuer' ? undefined : (pref as any)[col.key]
                      content = col.format ? col.format(val) : (val || '-')
                    }

                    return (
                      <td
                        key={col.key}
                        className={`px-3 py-2 text-sm whitespace-nowrap ${
                          col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                        }`}
                      >
                        {content}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-500">
          Showing {sortedPreferreds.length} of {totalCount} preferred shares
        </div>
      </div>
    </>
  )
}
