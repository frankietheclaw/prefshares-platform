# Preferred Shares Data Scripts

## Daily Price Scraper

Fetches daily prices from Yahoo Finance and updates Supabase database.

### Setup

```bash
cd scripts
pip install -r requirements.txt
```

### Configuration

Set environment variables:
```bash
export SUPABASE_URL="https://veqfwdhejertooqojnup.supabase.co"
export SUPABASE_KEY="your-service-role-key"  # Use service role key for write access
```

### Run

```bash
python daily_scraper.py
```

### Schedule with Cron

```bash
# Run daily at 4:30 PM ET (9:30 PM UTC) on weekdays
crontab -e

# Add this line:
30 21 * * 1-5 cd /home/frank/Desktop/prefshares-platform/scripts && python daily_scraper.py >> /var/log/prefshares.log 2>&1
```

### Yahoo Finance API

**Free** - No API key required!

- 2,000 requests/hour limit
- Real-time quotes for TSX
- Historical data available

### Symbol Format

| Database Format | Yahoo Finance Format |
|-----------------|---------------------|
| `RY.PR.A` | `RY-PA.TO` |
| `TD.PR.W` | `TD-PW.TO` |
| `BMO.PR.Q` | `BMO-PQ.TO` |

The script automatically converts between formats.
