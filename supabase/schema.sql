# Supabase Database Schema
# Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. ISSUERS TABLE
-- =====================================================
CREATE TABLE issuers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticker VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    sector VARCHAR(50) NOT NULL,
    website VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 2. PREFERRED SHARES TABLE
-- =====================================================
CREATE TABLE preferred_shares (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    issuer_id UUID REFERENCES issuers(id) ON DELETE CASCADE,
    symbol VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255),
    
    -- Issue Details
    issue_type VARCHAR(30) NOT NULL CHECK (issue_type IN ('perpetual', 'reset', 'floating', 'split_share')),
    issue_date DATE,
    call_date DATE,
    reset_date DATE,
    maturity_date DATE,
    
    -- Financial Terms
    par_value DECIMAL(10,2) DEFAULT 25.00,
    current_dividend DECIMAL(8,4),
    reset_spread DECIMAL(5,4),
    current_yield DECIMAL(5,4),
    yield_to_worst DECIMAL(5,4),
    
    -- Credit & Risk
    credit_rating VARCHAR(10),
    credit_agency VARCHAR(20),
    is_cumulative BOOLEAN DEFAULT true,
    
    -- Market Data
    last_price DECIMAL(8,2),
    bid_price DECIMAL(8,2),
    ask_price DECIMAL(8,2),
    volume_30day INTEGER,
    
    -- Metadata
    is_active BOOLEAN DEFAULT true,
    tmx_link VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 3. SPLIT SHARE CORPORATIONS
-- =====================================================
CREATE TABLE split_corporations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticker VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    manager VARCHAR(100),
    
    -- Structure
    class_a_yield DECIMAL(5,4),
    preferred_yield DECIMAL(5,4),
    nav_per_unit DECIMAL(8,2),
    downside_protection DECIMAL(5,2),
    
    -- Portfolio
    portfolio_description TEXT,
    dividend_coverage_ratio DECIMAL(4,2),
    
    -- Dates
    maturity_date DATE,
    inception_date DATE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 4. PRICE HISTORY
-- =====================================================
CREATE TABLE price_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    preferred_share_id UUID REFERENCES preferred_shares(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    close_price DECIMAL(8,2),
    volume INTEGER,
    calculated_yield DECIMAL(5,4),
    UNIQUE(preferred_share_id, date)
);

-- =====================================================
-- 5. BLOG POSTS
-- =====================================================
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author VARCHAR(100) DEFAULT 'AI Analyst',
    
    post_type VARCHAR(30) DEFAULT 'daily_update',
    market_date DATE,
    
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 6. USER DATA (Watchlists & Portfolios)
-- =====================================================
CREATE TABLE watchlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE watchlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    watchlist_id UUID REFERENCES watchlists(id) ON DELETE CASCADE,
    preferred_share_id UUID REFERENCES preferred_shares(id),
    notes TEXT,
    alert_price DECIMAL(8,2),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE portfolio_holdings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    preferred_share_id UUID REFERENCES preferred_shares(id),
    shares_owned INTEGER NOT NULL,
    purchase_price DECIMAL(8,2),
    purchase_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 7. INDEX VIEWS
-- =====================================================

-- Issuer Summary View
CREATE OR REPLACE VIEW v_issuer_summary AS
SELECT 
    i.ticker,
    i.name,
    i.sector,
    COUNT(ps.id) as preferred_count,
    MIN(ps.current_yield) as min_yield,
    MAX(ps.current_yield) as max_yield,
    AVG(ps.current_yield) as avg_yield,
    STRING_AGG(DISTINCT ps.credit_rating, ', ' ORDER BY ps.credit_rating) as credit_ratings
FROM issuers i
LEFT JOIN preferred_shares ps ON ps.issuer_id = i.id AND ps.is_active = true
GROUP BY i.ticker, i.name, i.sector;

-- Top Yielding View
CREATE OR REPLACE VIEW v_top_yielding AS
SELECT 
    ps.symbol,
    i.name as issuer,
    i.sector,
    ps.issue_type,
    ps.current_yield,
    ps.credit_rating,
    ps.last_price,
    ps.reset_spread
FROM preferred_shares ps
JOIN issuers i ON ps.issuer_id = i.id
WHERE ps.is_active = true
ORDER BY ps.current_yield DESC;

-- =====================================================
-- 8. ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on user data tables
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_holdings ENABLE ROW LEVEL SECURITY;

-- Users can only see their own watchlists
CREATE POLICY "Users can view own watchlists" ON watchlists
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own watchlists" ON watchlists
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own watchlists" ON watchlists
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own watchlists" ON watchlists
    FOR DELETE USING (auth.uid() = user_id);

-- Watchlist items (through watchlist ownership)
CREATE POLICY "Users can view own watchlist items" ON watchlist_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM watchlists w 
            WHERE w.id = watchlist_items.watchlist_id 
            AND w.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can modify own watchlist items" ON watchlist_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM watchlists w 
            WHERE w.id = watchlist_items.watchlist_id 
            AND w.user_id = auth.uid()
        )
    );

-- Portfolio holdings
CREATE POLICY "Users can view own holdings" ON portfolio_holdings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can modify own holdings" ON portfolio_holdings
    FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- 9. INDEXES
-- =====================================================

CREATE INDEX idx_preferred_shares_issuer ON preferred_shares(issuer_id);
CREATE INDEX idx_preferred_shares_sector ON preferred_shares(issue_type);
CREATE INDEX idx_preferred_shares_yield ON preferred_shares(current_yield);
CREATE INDEX idx_preferred_shares_rating ON preferred_shares(credit_rating);
CREATE INDEX idx_preferred_shares_active ON preferred_shares(is_active);
CREATE INDEX idx_price_history_share_date ON price_history(preferred_share_id, date);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_date ON blog_posts(published_at);

-- =====================================================
-- 10. FUNCTIONS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_issuers_updated_at BEFORE UPDATE ON issuers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_preferred_shares_updated_at BEFORE UPDATE ON preferred_shares
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_split_corps_updated_at BEFORE UPDATE ON split_corporations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DONE!
-- =====================================================

-- =====================================================
-- SPLIT CORP HOLDINGS (Missing from original schema)
-- =====================================================
CREATE TABLE split_corp_holdings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    split_corp_id UUID REFERENCES split_corporations(id) ON DELETE CASCADE,
    stock_symbol VARCHAR(10) NOT NULL,
    stock_name VARCHAR(255),
    weight_percent DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_split_corp_holdings_corp ON split_corp_holdings(split_corp_id);
