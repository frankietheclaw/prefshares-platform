import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { Building2 } from 'lucide-react'

export default async function IssuersPage() {
  const supabase = createClient()
  
  // Get all issuers with their preferred share counts
  const { data: issuers, error } = await supabase
    .from('issuers')
    .select(`
      *,
      preferred_shares(count)
    `)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching issuers:', error)
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-red-500">Error loading issuers</p>
        </div>
      </>
    )
  }

  // Group by sector
  const sectors = Array.from(new Set(issuers?.map((i: any) => i.sector))).filter(Boolean)

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Issuers</h1>
          <p className="mt-2 text-gray-600">
            Browse {issuers?.length || 0} Canadian companies that issue preferred shares.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issuers?.map((issuer: any) => (
            <Link
              key={issuer.id}
              href={`/issuers/${issuer.ticker}`}
              className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Building2 className="h-10 w-10 text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{issuer.name}</h3>
                      <p className="text-sm text-primary-600 font-medium">{issuer.ticker}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {issuer.sector || 'Other'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {issuer.preferred_shares?.[0]?.count || 0} preferreds
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {sectors.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">By Sector</h2>
            <div className="flex flex-wrap gap-2">
              {sectors.map((sector) => (
                <span
                  key={sector}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                >
                  {sector}
                </span>
              ))}
            </div>          </div>
        )}
      </div>
    </>
  )
}
