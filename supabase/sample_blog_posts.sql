-- Sample Blog Posts for PrefShares Platform
-- Run this in Supabase SQL Editor after creating tables

INSERT INTO blog_posts (title, slug, content, excerpt, post_type, status, published_at, author) VALUES
(
  'Canadian Preferred Shares Market Update - February 18, 2026',
  'market-update-february-18-2026',
  E'## Market Overview

The Canadian preferred share market showed mixed signals today with bank reset preferreds leading gains while utility issues saw modest pressure.

### Key Highlights

**Bank Preferreds Rally**
- Royal Bank (RY.PR.H) gained 0.8% as investors anticipate the upcoming August reset
- National Bank (NA.PR.K) remained strong at 6.55% yield with its wide +3.40% spread
- BMO Series Q (BMO.PR.Q) holding firm at 6.20% yield

**Utility Sector**
- Fortis (FTS.PR.J) declined slightly to $23.35, offering a 5.35% yield
- Canadian Utilities (CU.PR.H) gained 7.1% on strong volume
- Emera preferreds remain premium-priced but stable

**Split Share News**
- Brompton Split Banc Corp (SBC) announced a 20% stock split effective February 24
- Class A distributions increasing to $0.12/month from $0.10
- Preferred shares maintaining 54% downside protection

**Credit Rating Watch**
- DBRS downgraded Canadian Large Cap Leaders Split Corp to Pfd-3 from Pfd-3 (high)
- Dividend coverage ratio dropped to 0.8x - monitor closely

### Top Yielding Issues Today

1. **MFC.PR.J** - 7.00% yield (Manulife, reset 2026)
2. **FFH.PR.G** - 8.00% yield (Fairfax, higher risk)
3. **ENB.PR.B** - 6.18% yield (Enbridge, P-2 rated)
4. **NA.PR.K** - 6.55% yield (National Bank, P-1 rated)
5. **SLF.PR.H** - 6.50% yield (Sun Life, P-1 rated)

### Market Outlook

With the Bank of Canada signaling potential rate cuts in 2026, reset preferreds with wide spreads remain attractive. The +3.00%+ reset spreads currently available offer good protection against rising rates while providing income.

**Recommended Action**: Consider accumulating bank reset preferreds with 2026-2027 reset dates while yields remain elevated.

---

*Data as of market close February 18, 2026. Not investment advice.*',
  'Bank reset preferreds rally while utility issues see modest pressure. Brompton announces 20% stock split.',
  'daily_update',
  'published',
  '2026-02-18T21:00:00Z',
  'AI Analyst'
),
(
  'Understanding Rate Reset Preferreds: A Guide for Income Investors',
  'understanding-rate-reset-preferreds',
  E'## What Are Rate Reset Preferreds?

Rate reset preferreds are the dominant structure in the Canadian preferred share market, representing approximately 55% of all outstanding issues. Unlike traditional perpetual preferreds with fixed dividends forever, rate resets offer a mechanism to adjust yields based on interest rate changes.

### How They Work

**Initial Period (5 Years)**
- Fixed dividend for the first 5 years from issue date
- Known yield at purchase
- Predictable income stream

**Reset Date**
- Dividend recalculates based on: Government of Canada 5-year bond yield + spread
- New rate fixed for another 5 years
- Issuer has option to call (redeem) at par ($25)

**Example:**
If a preferred has a +3.00% spread and the GoC 5-year yield is 3.25% at reset:
New yield = 3.25% + 3.00% = 6.25%

### Key Terms to Understand

| Term | Definition | Importance |
|------|-----------|------------|
| **Reset Spread** | Fixed margin added to GoC 5-year yield | Higher = better protection |
| **Reset Date** | When dividend recalculates | Plan your holding period |
| **Call Date** | When issuer can redeem | Usually same as reset |
| **Yield to Worst** | Lowest possible return | Conservative estimate |

### Pros and Cons

**Advantages:**
- Protection against rising interest rates (upside)
- Known reset formula provides transparency
- Typically higher yields than perpetuals
- Call feature can benefit investors if rates fall

**Disadvantages:**
- "Negative convexity" - limited upside if rates rise
- Reset risk if GoC yields are low at reset date
- More complex than perpetuals
- Price volatility around reset dates

### Current Opportunities (February 2026)

With reset spreads averaging +3.00% or higher, the current environment favors rate reset preferreds:

**Attractive Spreads:**
- NA.PR.K: +3.40% spread, 6.55% yield
- MFC.PR.J: +3.50% spread, 7.00% yield
- BMO.PR.Q: +3.25% spread, 6.20% yield

These spreads are historically wide, providing good value.

### Who Should Own Rate Resets?

Rate reset preferreds are suitable for:
- Income investors comfortable with moderate complexity
- Those seeking protection against rising rates
- Investors with 3+ year time horizons
- Taxable accounts (eligible for dividend tax credit)

They may not be suitable for:
- Investors needing guaranteed income levels
- Those uncomfortable with reset date uncertainty
- Short-term investors (under 2 years)

### Bottom Line

Rate reset preferreds offer a compelling middle ground between fixed-rate bonds (rate risk) and perpetuals (duration risk). In the current environment with wide spreads, they represent good value for patient income investors.

---

*This educational content is for informational purposes only. Consult a financial advisor before making investment decisions.*',
  'A comprehensive guide to understanding rate reset preferreds - how they work, key terms, and current opportunities.',
  'analysis',
  'published',
  '2026-02-17T15:00:00Z',
  'AI Analyst'
);

-- Verify posts were inserted
SELECT id, title, slug, status, published_at FROM blog_posts ORDER BY published_at DESC;
