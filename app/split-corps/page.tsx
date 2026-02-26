import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { Split } from 'lucide-react'

export default async function SplitCorpsPage() {
  const supabase = createClient()
  
  const { data: splitCorps, error } = await supabase
    .from('split_corporations')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching split corps:', error)
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-red-500">Error loading split corporations</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Split Corporations</h1>
          <p className="mt-2 text-gray-600">
            Split-share corporations that divide their investments into preferred and capital shares.
          </p>
        </div>

        {splitCorps?.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Split className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No split corporations found</h3>
            <p className="mt-2 text-gray-500">Split corporation data is coming soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {splitCorps?.map((corp: any) => (
              <div
                key={corp.id}
                className="bg-white rounded-lg shadow border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Split className="h-10 w-10 text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{corp.name}</h3>
                      <p className="text-sm text-primary-600 font-medium">{corp.symbol}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">NAV:</span>
                      <span className="text-sm font-medium">${corp.nav?.toFixed(2) || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Preferred Yield:</span>
                      <span className="text-sm font-medium text-green-600">{corp.preferred_yield?.toFixed(2) || 'N/A'}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Asset Coverage:</span>
                      <span className="text-sm font-medium">{corp.asset_coverage?.toFixed(2) || 'N/A'}x</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link
                      href={`/split-corps/${corp.symbol}`}
                      className="text-sm text-primary-600 hover:text-primary-800 font-medium"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
