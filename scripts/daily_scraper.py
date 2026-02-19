#!/usr/bin/env python3
"""
Preferred Shares Data Scraper
Pulls daily prices from Yahoo Finance and updates Supabase database
Run daily after market close (4:30 PM ET)
"""

import os
import json
import requests
from datetime import datetime
from typing import Optional, Dict, List

# Configuration
SUPABASE_URL = os.environ.get('SUPABASE_URL', 'https://veqfwdhejertooqojnup.supabase.co')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlcWZ3ZGhlamVydG9vcW9qbnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDY3MjQsImV4cCI6MjA4NzAyMjcyNH0.Nl822bymoaQtdAEbLm-N-h-2PvUdNGYqV9lXnwOn1iU')

# Yahoo Finance API (free, no key required)
YAHOO_FINANCE_BASE = 'https://query1.finance.yahoo.com/v8/finance/chart/'

# Canadian preferred share symbols (TSX)
PREFERRED_SYMBOLS = [
    # Royal Bank
    'RY-PA.TO', 'RY-PB.TO', 'RY-PC.TO', 'RY-PD.TO', 'RY-PE.TO', 'RY-PF.TO',
    'RY-PG.TO', 'RY-PH.TO', 'RY-PJ.TO', 'RY-PK.TO', 'RY-PL.TO', 'RY-PM.TO',
    # TD Bank
    'TD-PA.TO', 'TD-PB.TO', 'TD-PC.TO', 'TD-PD.TO', 'TD-PE.TO', 'TD-PF.TO',
    'TD-PG.TO', 'TD-PH.TO', 'TD-PJ.TO', 'TD-PK.TO', 'TD-PL.TO', 'TD-PW.TO',
    'TD-PY.TO', 'TD-PZ.TO', 'TD-PAA.TO',
    # Scotiabank
    'BNS-PA.TO', 'BNS-PB.TO', 'BNS-PC.TO', 'BNS-PD.TO', 'BNS-PE.TO', 'BNS-PF.TO',
    'BNS-PG.TO', 'BNS-PH.TO', 'BNS-PJ.TO', 'BNS-PK.TO', 'BNS-PL.TO', 'BNS-PM.TO',
    'BNS-PW.TO',
    # BMO
    'BMO-PA.TO', 'BMO-PB.TO', 'BMO-PC.TO', 'BMO-PD.TO', 'BMO-PE.TO', 'BMO-PF.TO',
    'BMO-PG.TO', 'BMO-PH.TO', 'BMO-PJ.TO', 'BMO-PK.TO', 'BMO-PN.TO', 'BMO-PQ.TO',
    # CIBC
    'CM-PA.TO', 'CM-PB.TO', 'CM-PC.TO', 'CM-PD.TO', 'CM-PE.TO', 'CM-PF.TO',
    'CM-PG.TO', 'CM-PH.TO', 'CM-PJ.TO', 'CM-PK.TO', 'CM-PT.TO', 'CM-PV.TO',
    # National Bank
    'NA-PA.TO', 'NA-PB.TO', 'NA-PC.TO', 'NA-PD.TO', 'NA-PE.TO', 'NA-PF.TO',
    'NA-PG.TO', 'NA-PH.TO', 'NA-PJ.TO', 'NA-PK.TO', 'NA-PS.TO',
    # Insurance
    'SLF-PA.TO', 'SLF-PB.TO', 'SLF-PC.TO', 'SLF-PD.TO', 'SLF-PE.TO', 'SLF-PF.TO',
    'SLF-PG.TO', 'SLF-PH.TO',
    'MFC-PA.TO', 'MFC-PB.TO', 'MFC-PC.TO', 'MFC-PD.TO', 'MFC-PE.TO', 'MFC-PF.TO',
    'MFC-PG.TO', 'MFC-PH.TO', 'MFC-PJ.TO', 'MFC-PK.TO', 'MFC-PQ.TO',
    'GWO-PA.TO', 'GWO-PB.TO', 'GWO-PC.TO', 'GWO-PD.TO', 'GWO-PE.TO', 'GWO-PF.TO',
    'GWO-PG.TO',
    'IFC-PA.TO', 'IFC-PB.TO', 'IFC-PC.TO',
    'FFH-PA.TO', 'FFH-PB.TO', 'FFP-PC.TO', 'FFH-PD.TO', 'FFH-PE.TO', 'FFH-PG.TO',
    # Utilities
    'FTS-PA.TO', 'FTS-PB.TO', 'FTS-PC.TO', 'FTS-PD.TO', 'FTS-PE.TO', 'FTS-PF.TO',
    'FTS-PG.TO', 'FTS-PH.TO', 'FTS-PJ.TO',
    'EMA-PA.TO', 'EMA-PB.TO', 'EMA-PC.TO', 'EMA-PD.TO',
    'CU-PA.TO', 'CU-PB.TO', 'CU-PC.TO', 'CU-PD.TO', 'CU-PE.TO', 'CU-PF.TO',
    'CU-PG.TO', 'CU-PH.TO', 'CU-PJ.TO', 'CU-PK.TO',
    # Pipelines
    'ENB-PA.TO', 'ENB-PB.TO', 'ENP-PC.TO', 'ENB-PD.TO',
    'TRP-PA.TO', 'TRP-PB.TO', 'TRP-PC.TO',
    'PPL-PA.TO', 'PPL-PB.TO', 'PPL-PC.TO',
    # Telecom
    'BCE-PA.TO', 'BCE-PB.TO', 'BCE-PC.TO', 'BCE-PD.TO', 'BCE-PE.TO',
    'T-PA.TO', 'T-PB.TO', 'T-PC.TO', 'T-PD.TO',
]


def get_yahoo_quote(symbol: str) -> Optional[Dict]:
    """Fetch quote data from Yahoo Finance API"""
    try:
        url = f"{YAHOO_FINANCE_BASE}{symbol}"
        params = {
            'interval': '1d',
            'range': '1d'
        }
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = requests.get(url, params=params, headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'chart' in data and 'result' in data['chart'] and data['chart']['result']:
                result = data['chart']['result'][0]
                meta = result.get('meta', {})
                
                # Get latest price
                quote = result.get('indicators', {}).get('quote', [{}])[0]
                closes = quote.get('close', [])
                close_price = closes[-1] if closes else None
                
                return {
                    'symbol': symbol,
                    'price': close_price,
                    'currency': meta.get('currency', 'CAD'),
                    'exchange': meta.get('exchangeName', 'TOR'),
                    'regularMarketPrice': meta.get('regularMarketPrice'),
                    'previousClose': meta.get('previousClose'),
                }
    except Exception as e:
        print(f"Error fetching {symbol}: {e}")
    
    return None


def convert_symbol_to_db_format(yahoo_symbol: str) -> str:
    """Convert Yahoo Finance symbol to database format"""
    # RY-PA.TO -> RY.PR.A
    symbol = yahoo_symbol.replace('.TO', '')
    parts = symbol.split('-')
    if len(parts) == 2:
        ticker = parts[0]
        series = parts[1]
        # PA -> PR.A, PB -> PR.B
        series_letter = series[1] if len(series) > 1 else series[0]
        return f"{ticker}.PR.{series_letter}"
    return symbol


def get_all_preferred_shares() -> List[Dict]:
    """Get all active preferred shares from Supabase"""
    url = f"{SUPABASE_URL}/rest/v1/preferred_shares?select=id,symbol,is_active&is_active=eq.true"
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}'
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    return []


def update_preferred_share(symbol: str, price: float, bid: float = None, ask: float = None):
    """Update a preferred share in Supabase"""
    db_symbol = convert_symbol_to_db_format(symbol)
    
    url = f"{SUPABASE_URL}/rest/v1/preferred_shares?symbol=eq.{db_symbol}"
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
    }
    
    update_data = {
        'last_price': price,
        'updated_at': datetime.utcnow().isoformat()
    }
    
    if bid:
        update_data['bid_price'] = bid
    if ask:
        update_data['ask_price'] = ask
    
    # Recalculate yield if we have dividend data
    response = requests.patch(url, headers=headers, json=update_data)
    
    if response.status_code in [200, 204]:
        print(f"✅ Updated {db_symbol}: ${price:.2f}")
        return True
    else:
        print(f"❌ Failed to update {db_symbol}: {response.text}")
        return False


def calculate_yield(symbol: str, price: float):
    """Recalculate yield for a preferred share"""
    db_symbol = convert_symbol_to_db_format(symbol)
    
    # Get current dividend
    url = f"{SUPABASE_URL}/rest/v1/preferred_shares?symbol=eq.{db_symbol}&select=current_dividend"
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}'
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code == 200 and response.json():
        dividend = response.json()[0].get('current_dividend')
        if dividend and price > 0:
            return dividend / price
    return None


def run_daily_update():
    """Main function to run daily price updates"""
    print(f"\n{'='*60}")
    print(f"PREFERRED SHARES DAILY UPDATE")
    print(f"Started: {datetime.now().isoformat()}")
    print(f"{'='*60}\n")
    
    success_count = 0
    fail_count = 0
    
    for yahoo_symbol in PREFERRED_SYMBOLS:
        quote = get_yahoo_quote(yahoo_symbol)
        
        if quote and quote.get('price'):
            success = update_preferred_share(yahoo_symbol, quote['price'])
            if success:
                success_count += 1
            else:
                fail_count += 1
        else:
            print(f"⚠️ No data for {yahoo_symbol}")
            fail_count += 1
    
    print(f"\n{'='*60}")
    print(f"UPDATE COMPLETE")
    print(f"Updated: {success_count}")
    print(f"Failed: {fail_count}")
    print(f"{'='*60}\n")
    
    return success_count, fail_count


if __name__ == '__main__':
    run_daily_update()
