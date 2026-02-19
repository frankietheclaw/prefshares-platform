# PrefShares.ca - Canadian Preferred Shares Platform

A modern web application for tracking and analyzing Canadian preferred shares.

## Features

- **Complete Database**: 56+ preferred shares from 25+ issuers
- **Yield Rankings**: Find the highest yielding preferreds by type, rating, or sector
- **Issuer Comparisons**: Compare all preferreds from the same issuer
- **Split Share Analysis**: Track split share corporations and their metrics
- **Daily Blog**: AI-generated market updates and analysis
- **Member Tools**: Watchlists, portfolio tracking, and calculators

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Payments**: Stripe
- **Charts**: Recharts
- **Tables**: TanStack Table

## Getting Started

### 1. Install Dependencies

```bash
cd prefshares-platform
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### 3. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the schema file in the SQL Editor:
   ```bash
   # Copy contents of supabase/schema.sql into Supabase SQL Editor
   ```
3. Run the seed data:
   ```bash
   # Copy contents of ../preferred_shares_seed_data.sql into Supabase SQL Editor
   ```
4. Get your credentials from Settings > API

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
prefshares-platform/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── preferreds/        # Preferred shares listing
│   ├── issuers/           # Issuer pages
│   ├── rankings/          # Yield rankings
│   └── blog/              # Blog posts
├── components/            # React components
├── lib/                   # Utilities
│   ├── supabase/         # Supabase clients
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript types
└── supabase/             # Database schema
```

## Database Schema

### Core Tables
- **issuers**: Banks, utilities, insurance companies
- **preferred_shares**: Individual preferred share issues
- **split_corporations**: Split share corporations
- **blog_posts**: Daily market updates
- **watchlists/portfolio_holdings**: User data

### Key Features
- Row Level Security (RLS) enabled
- Auto-updating timestamps
- Indexed for performance
- Views for common queries

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Connect Custom Domain

1. Add domain in Vercel project settings
2. Update DNS records
3. Update `NEXT_PUBLIC_APP_URL` env variable

## Data Updates

### Daily Price Updates
Options:
1. **Manual CSV Upload**: Upload daily from TMX Money
2. **API Integration**: Use TMX or Yahoo Finance API
3. **Web Scraping**: Automated scraper (requires maintenance)

### Blog Posts
- AI-generated daily summaries
- Can be scheduled via cron job
- Manual posts for special analysis

## Next Steps

1. [ ] Implement individual preferred share detail pages
2. [ ] Add comparison tool
3. [ ] Build yield calculators
4. [ ] Add charts and visualizations
5. [ ] Implement member authentication
6. [ ] Add watchlist/portfolio features
7. [ ] Set up Stripe payments
8. [ ] Create admin panel for data updates

## Resources

- [PrefBlog](https://prefblog.com) - Canadian preferred shares news
- [TMX Money](https://money.tmx.com) - Price data
- [DBRS](https://dbrs.morningstar.com) - Credit ratings

## License

MIT
