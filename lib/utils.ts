import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatYield(yield_value: number | null): string {
  if (yield_value === null) return '-'
  return (yield_value * 100).toFixed(2) + '%'
}

export function formatPrice(price: number | null): string {
  if (price === null) return '-'
  return '$' + price.toFixed(2)
}

export function formatSpread(spread: number | null): string {
  if (spread === null) return '-'
  return '+' + (spread * 100).toFixed(2) + '%'
}

export function formatDate(date: string | null): string {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function getIssueTypeColor(type: string): string {
  const colors: Record<string, string> = {
    reset: 'bg-green-100 text-green-800',
    perpetual: 'bg-indigo-100 text-indigo-800',
    floating: 'bg-yellow-100 text-yellow-800',
    split_share: 'bg-pink-100 text-pink-800',
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

export function getRatingColor(rating: string | null): string {
  if (!rating) return 'text-gray-500'
  
  if (rating.startsWith('P-1') || rating === 'Pfd-1') {
    return 'text-green-600 font-semibold'
  }
  if (rating.startsWith('P-2') || rating === 'Pfd-2') {
    return 'text-blue-600'
  }
  if (rating.startsWith('P-3') || rating === 'Pfd-3') {
    return 'text-yellow-600'
  }
  return 'text-orange-600'
}

export function getSectorLabel(sector: string): string {
  const labels: Record<string, string> = {
    bank: 'Banks',
    utility: 'Utilities',
    insurance: 'Insurance',
    pipeline: 'Pipelines',
    telecom: 'Telecom',
    financial: 'Financials',
    energy: 'Energy',
    other: 'Other',
  }
  return labels[sector] || sector
}
