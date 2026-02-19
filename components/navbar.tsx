import Link from 'next/link'
import { TrendingUp, Menu, X } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">PrefShares.ca</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/issuers" className="text-gray-600 hover:text-primary-600 font-medium">
              Issuers
            </Link>
            <Link href="/preferreds" className="text-gray-600 hover:text-primary-600 font-medium">
              All Preferreds
            </Link>
            <Link href="/rankings" className="text-gray-600 hover:text-primary-600 font-medium">
              Rankings
            </Link>
            <Link href="/split-corps" className="text-gray-600 hover:text-primary-600 font-medium">
              Split Corps
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-primary-600 font-medium">
              Blog
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
