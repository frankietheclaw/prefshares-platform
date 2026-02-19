import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { formatDate } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

interface BlogPostPageProps {
  params: { slug: string }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const supabase = createClient()
  
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  if (error || !post) {
    notFound()
  }

  const postData = post as any

  // Convert markdown-like content to HTML (simple version)
  const contentHtml = postData.content
    .replace(/## (.*)/g, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/### (.*)/g, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p class="mt-4">')
    .replace(/\n/g, '<br/>')

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/blog"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to all posts
        </Link>

        <article className="bg-white shadow rounded-lg p-8">
          <header>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {postData.post_type === 'daily_update' ? 'Daily Update' : 'Analysis'}
              </span>
              <span>•</span>
              <time dateTime={postData.published_at || ''}>
                {formatDate(postData.published_at)}
              </time>
              <span>•</span>
              <span>By {postData.author}</span>
            </div>
            
            <h1 className="mt-4 text-3xl font-bold text-gray-900">
              {postData.title}
            </h1>
          </header>

          <div 
            className="mt-8 prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: `<p class="mt-4">${contentHtml}</p>` }}
          />
        </article>
      </div>
    </>
  )
}
