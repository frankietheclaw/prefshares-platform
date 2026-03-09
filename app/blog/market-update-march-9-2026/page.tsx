import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'BCE Conversion Notice & Market Update | Preferred Shares Data',
  description: 'BCE preferred share conversion rights, TransAlta Series A & B notices, and current preferred share yields across Canadian markets.',
}

export default async function BlogPost() {
  const supabase = createClient()
  
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', 'market-update-march-9-2026')
    .single()

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
          <Link href="/blog" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            ← Back to Blog
          </Link>
        </div>
      </>
    )
  }

  const typedPost = post as { title: string; content: string; created_at: string }

  return (
    <>
      <Navbar />
      <article className="max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{typedPost.title}</h1>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span className="inline-flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(typedPost.created_at).toLocaleDateString('en-CA', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="inline-flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              5 min read
            </span>
          </div>
        </header>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: typedPost.content }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Links</h2>
          <div className="flex flex-wrap gap-3">
            <Link 
              href="/preferreds" 
              className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200"
            >
              Browse Preferred Shares
            </Link>
            <Link 
              href="/rankings" 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Yield Rankings
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
