# Quick Start Guide - Get Live in 30 Minutes

## Step 1: Supabase Setup (10 minutes)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Name it: `prefshares-db`
4. Choose region: `US East` (or closest to you)
5. Wait for database to provision (~2 minutes)

## Step 2: Run Database Schema (5 minutes)

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy entire contents of `supabase/schema.sql`
4. Paste into SQL Editor
5. Click **Run**
6. Wait for "Success" message

## Step 3: Load Seed Data (5 minutes)

1. Open new query in SQL Editor
2. Copy entire contents of `../preferred_shares_seed_data.sql`
3. Paste and run
4. Verify: Should show 25 issuers, 56 preferred shares inserted

## Step 4: Load Sample Blog Posts (2 minutes)

1. Open new query in SQL Editor  
2. Copy contents of `supabase/sample_blog_posts.sql`
3. Paste and run
4. Verify: Should show 2 blog posts inserted

## Step 5: Get Credentials (2 minutes)

1. In Supabase dashboard, go to **Project Settings** (gear icon)
2. Click **API** in left sidebar
3. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** API key (starts with `eyJ...`)

## Step 6: Configure Environment (3 minutes)

1. In your project folder:
   ```bash
   cd prefshares-platform
   cp .env.example .env.local
   ```

2. Open `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 7: Install & Run (3 minutes)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🚀

---

## What You'll See

✅ Homepage with hero, stats, features  
✅ /preferreds - Table with all 56 preferred shares  
✅ /blog - Two sample blog posts  
✅ /blog/[slug] - Individual post pages  
✅ /admin/blog/create - Create new posts (no auth yet)

---

## Test Creating a Blog Post

1. Go to [http://localhost:3000/admin/blog/create](http://localhost:3000/admin/blog/create)
2. Fill in:
   - Title: "Test Post"
   - Slug: "test-post"
   - Type: "Daily Update"
   - Content: "## Hello World\n\nThis is a test post."
3. Click **Publish Post**
4. Visit [http://localhost:3000/blog](http://localhost:3000/blog)

---

## Next Steps

### Immediate (Today)
- [ ] Deploy to Vercel (see README.md)
- [ ] Connect your Cloudflare domain
- [ ] Add Google Analytics

### This Week
- [ ] Style the blog content better
- [ ] Add issuer detail pages
- [ ] Add individual preferred share pages
- [ ] Implement user authentication

### This Month
- [ ] Create comparison tools
- [ ] Add yield calculators
- [ ] Set up Stripe payments
- [ ] Add portfolio tracking

---

## Troubleshooting

**Error: "relation 'issuers' does not exist"**
→ Schema didn't run. Check SQL Editor for errors.

**Error: "null value in column 'issuer_id'"**
→ Run issuers INSERT before preferred_shares.

**Site loads but no data**
→ Check browser console for Supabase connection errors.
→ Verify .env.local has correct credentials.

**Changes not reflecting**
→ Next.js caches aggressively. Try:
```bash
rm -rf .next
npm run dev
```

---

## Need Help?

1. Check Supabase logs: Dashboard → Database → Logs
2. Check browser console for frontend errors
3. Verify database: SQL Editor → `SELECT COUNT(*) FROM preferred_shares;`

---

**Ready? Start with Step 1 above!** 🚀
