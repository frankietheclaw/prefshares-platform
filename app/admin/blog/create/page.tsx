import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/navbar'

export default async function CreatePostPage() {
  async function createPost(formData: FormData) {
    'use server'
    
    const supabase = createClient()
    
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const content = formData.get('content') as string
    const excerpt = formData.get('excerpt') as string
    const post_type = formData.get('post_type') as string
    
    const { error } = await supabase
      .from('blog_posts')
      .insert({
        title,
        slug,
        content,
        excerpt,
        post_type,
        status: 'published',
        published_at: new Date().toISOString(),
        author: 'AI Analyst'
      } as any)
    
    if (error) {
      console.error('Error creating post:', error)
      return
    }
    
    redirect('/blog')
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Blog Post</h1>
        
        <form action={createPost} className="space-y-6 bg-white shadow rounded-lg p-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="e.g., Canadian Preferred Shares Market Update - February 18, 2026"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
              URL Slug
            </label>
            <input
              type="text"
              name="slug"
              id="slug"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="e.g., market-update-february-18-2026"
            />
            <p className="mt-1 text-xs text-gray-500">This will be the URL: /blog/your-slug</p>
          </div>

          <div>
            <label htmlFor="post_type" className="block text-sm font-medium text-gray-700">
              Post Type
            </label>
            <select
              name="post_type"
              id="post_type"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="daily_update">Daily Market Update</option>
              <option value="analysis">In-Depth Analysis</option>
              <option value="news">News Alert</option>
            </select>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
              Excerpt (Short Summary)
            </label>
            <textarea
              name="excerpt"
              id="excerpt"
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Brief summary for the blog listing page..."
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              rows={20}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm font-mono"
              placeholder="## Market Overview

Write your post here...

### Key Highlights
- Point 1
- Point 2

Use ## for headers, **bold** for emphasis"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
