import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-9xl font-bold text-primary-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          The page may have been moved or deleted.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Go Home
          </Link>
          <Link
            href="/preferreds"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Browse Preferred Shares
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Read Blog
          </Link>
        </div>
      </div>
      
      <div className="mt-12 text-center text-sm text-gray-400">
        <p>
          Looking for a specific preferred share? 
          <Link href="/preferreds" className="text-primary-600 hover:text-primary-500 ml-1">
            View all issues →
          </Link>
        </p>
      </div>
    </div>
  )
}
