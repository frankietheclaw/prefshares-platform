import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types/database'

export default async function BlogPage() {
  const supabase = createClient()
  
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error fetching posts:', error)
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Market Updates & Analysis
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Daily preferred share market commentary and analysis
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {posts?.map((post: BlogPost) => (
            <div
              key={post.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {post.post_type === 'daily_update' ? 'Daily Update' : 'Analysis'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(post.published_at)}
                  </span>
                </div>
                
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="mt-3 text-lg font-semibold text-gray-900 hover:text-primary-600">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-4 flex items-center">
                  <span className="text-sm text-gray-500">By {post.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!posts || posts.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </>
  )
}
