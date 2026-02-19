-- Daily Price Update Script
-- Run this after market close (4:30 PM ET) to update preferred share prices
-- This can be scheduled via Supabase Cron or triggered externally

-- Update today's prices for all active preferred shares
-- In production, this would pull from TMX Money API or similar data source

-- Example: Update a few sample prices (in real implementation, fetch from API)
UPDATE preferred_shares 
SET 
    last_price = CASE 
        WHEN symbol = 'RY.PR.H' THEN 24.60
        WHEN symbol = 'TD.PR.Y' THEN 24.58
        WHEN symbol = 'BNS.PR.W' THEN 25.02
        WHEN symbol = 'BMO.PR.Q' THEN 25.05
        WHEN symbol = 'NA.PR.K' THEN 24.78
        WHEN symbol = 'CM.PR.T' THEN 25.02
        ELSE last_price
    END,
    bid_price = CASE 
        WHEN symbol = 'RY.PR.H' THEN 24.58
        WHEN symbol = 'TD.PR.Y' THEN 24.56
        WHEN symbol = 'BNS.PR.W' THEN 25.00
        WHEN symbol = 'BMO.PR.Q' THEN 25.03
        WHEN symbol = 'NA.PR.K' THEN 24.76
        WHEN symbol = 'CM.PR.T' THEN 25.00
        ELSE bid_price
    END,
    ask_price = CASE 
        WHEN symbol = 'RY.PR.H' THEN 24.62
        WHEN symbol = 'TD.PR.Y' THEN 24.60
        WHEN symbol = 'BNS.PR.W' THEN 25.04
        WHEN symbol = 'BMO.PR.Q' THEN 25.07
        WHEN symbol = 'NA.PR.K' THEN 24.80
        WHEN symbol = 'CM.PR.T' THEN 25.04
        ELSE ask_price
    END,
    updated_at = NOW()
WHERE symbol IN ('RY.PR.H', 'TD.PR.Y', 'BNS.PR.W', 'BMO.PR.Q', 'NA.PR.K', 'CM.PR.T');

-- Recalculate yields based on new prices
UPDATE preferred_shares
SET current_yield = CASE 
    WHEN last_price IS NOT NULL AND last_price > 0 AND current_dividend IS NOT NULL 
    THEN current_dividend / last_price 
    ELSE current_yield 
END,
updated_at = NOW()
WHERE last_price IS NOT NULL AND last_price > 0;

-- Insert today's price history record
INSERT INTO price_history (preferred_share_id, date, close_price, calculated_yield)
SELECT 
    ps.id,
    CURRENT_DATE,
    ps.last_price,
    ps.current_yield
FROM preferred_shares ps
WHERE ps.is_active = true
AND ps.last_price IS NOT NULL
ON CONFLICT (preferred_share_id, date) DO UPDATE
SET 
    close_price = EXCLUDED.close_price,
    calculated_yield = EXCLUDED.calculated_yield;

-- Log the update
SELECT CONCAT('Updated ', COUNT(*), ' preferred share prices for ', CURRENT_DATE) as update_log
FROM preferred_shares 
WHERE is_active = true AND updated_at > CURRENT_DATE - INTERVAL '1 hour';
