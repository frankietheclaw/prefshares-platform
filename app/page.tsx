import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import { TrendingUp, Building2, BarChart3, Shield, Newspaper } from 'lucide-react'

export default async function HomePage() {
  const supabase = createClient()
  
  // Fetch live counts from database
  const [preferredsResult, issuersResult, splitCorpsResult] = await Promise.all([
    supabase.from('preferred_shares').select('id', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('issuers').select('id', { count: 'exact', head: true }),
    supabase.from('split_corporations').select('id', { count: 'exact', head: true }).eq('is_active', true)
  ])
  
  const preferredsCount = preferredsResult.count || 0
  const issuersCount = issuersResult.count || 0
  const splitCorpsCount = splitCorpsResult.count || 0

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Pref Shares Data</span>
              <span className="block text-primary-600">Canadian Preferred Shares Database</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Track yields, compare issuers, analyze reset scenarios, and build your income portfolio with the most comprehensive preferred share data in Canada.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/preferreds"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg"
                >
                  Browse All Preferreds
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  href="/quiz"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg"
                >
                  Take the Quiz 🎯
                </Link>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Feature 1 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Building2 className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{issuersCount}+ Issuers</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Big 6 banks, utilities, insurance companies, pipelines, and more.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart3 className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Yield Rankings</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Find the highest yielding preferreds by type, rating, or sector.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Shield className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Credit Ratings</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      DBRS ratings and analysis for risk assessment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Newspaper className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Daily Updates</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Market summaries, new issues, and rating changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
            <div>
              <div className="text-4xl font-extrabold text-white">{preferredsCount}+</div>
              <div className="mt-2 text-base text-primary-200">Preferred Shares</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white">{issuersCount}+</div>
              <div className="mt-2 text-base text-primary-200">Issuers</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white">{splitCorpsCount}</div>
              <div className="mt-2 text-base text-primary-200">Split Corps</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-700 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Ready to analyze preferred shares?
                </h2>
                <p className="mt-3 max-w-3xl text-lg text-primary-200">
                  Create a free account to save watchlists, track your portfolio, and get daily market updates.
                </p>
              </div>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            © 2026 Pref Shares Data. Data is for informational purposes only. Not investment advice.
          </p>
        </div>
      </footer>
    </>
  )
}
