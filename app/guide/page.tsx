import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import { ArrowLeft, Download, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Canadian Preferred Shares Guide | Pref Shares Data',
  description: 'Comprehensive institutional analysis of Canadian preferred shares - rate resets, credit ratings, tax advantages, and yield strategies.',
}

export default function GuidePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-primary-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <Link href="/" className="inline-flex items-center text-primary-200 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-4">
              Canadian Preferred Shares: Institutional Analysis
            </h1>
            <p className="text-primary-200 text-lg">
              A comprehensive guide to rate resets, credit ratings, tax advantages, and yield strategies
            </p>
            <div className="mt-4 text-sm text-primary-300">
              By Frankie • February 2026
            </div>
            <div className="mt-2 text-xs text-primary-400">
              Classification: Equity Hybrid Security | Risk Profile: Moderate-Low | Target: Income-focused investors
            </div>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> This guide is for informational and educational purposes only. It does not constitute financial, investment, tax, or legal advice. Consult a licensed financial advisor before making investment decisions. Past performance is not indicative of future results.
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 prose prose-lg max-w-none">
            
            {/* Executive Summary */}
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-4 mb-6">Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Canadian preferred shares represent one of the most sophisticated preferred markets globally. The rate reset structure—pioneered in Canada—offers unique yield opportunities but requires deep structural understanding. For yield-focused Canadian investors, preferreds provide tax-advantaged income in a market dominated by high-quality financial issuers.
            </p>

            <hr className="my-8" />

            {/* Section I: Canadian Market Structure */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">I. Canadian Market Structure</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Unique Characteristics</h3>
            <p className="text-gray-700 mb-4">Canadian preferreds differ materially from US counterparts:</p>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Feature</th>
                    <th className="px-4 py-3 text-left">Canada</th>
                    <th className="px-4 py-3 text-left">US</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Dominant Structure</td>
                    <td className="px-4 py-3">Rate Reset (70%+ of market)</td>
                    <td className="px-4 py-3">Fixed-Rate Perpetual</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium">Dividend Tax Treatment</td>
                    <td className="px-4 py-3">Eligible for dividend tax credit</td>
                    <td className="px-4 py-3">Qualified dividend treatment</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Typical Par Value</td>
                    <td className="px-4 py-3">$25 CAD</td>
                    <td className="px-4 py-3">$25 USD</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium">Call Protection</td>
                    <td className="px-4 py-3">5 years standard</td>
                    <td className="px-4 py-3">5 years standard</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Rate Reset Mechanism</td>
                    <td className="px-4 py-3">Common</td>
                    <td className="px-4 py-3">Rare</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium">Minimum Rating</td>
                    <td className="px-4 py-3">Often P-1/P-2 (DBRS)</td>
                    <td className="px-4 py-3">Investment grade typical</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Market Composition by Issuer Type</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Banks (Big 6):</strong> 55%</li>
              <li><strong>Insurance Companies:</strong> 18%</li>
              <li><strong>Utilities:</strong> 12%</li>
              <li><strong>REITs:</strong> 10%</li>
              <li><strong>Pipelines/Energy:</strong> 4%</li>
              <li><strong>Other:</strong> 1%</li>
            </ul>

            <hr className="my-8" />

            {/* Section II: Types */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">II. Types of Canadian Preferred Shares</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">1. Perpetual Preferreds (Traditional)</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Structure:</strong> Fixed dividend forever, no maturity</li>
              <li><strong>Market Share:</strong> ~15% of Canadian market</li>
              <li><strong>Best For:</strong> Falling rate environment, income stability</li>
            </ul>
            <p className="text-gray-700 mb-2"><strong>Example Issues:</strong></p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              <li>RY.PR.F (Royal Bank) — 5.00% perpetual</li>
              <li>TD.PR.W (TD Bank) — 4.35% perpetual</li>
            </ul>
            <p className="text-gray-700 mb-4"><strong>Risk Profile:</strong> Highest duration sensitivity, most volatile pricing</p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2. Fixed Reset Preferreds (Dominant Structure)</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Fixed dividend for 5 years</li>
              <li>Resets at Government of Canada 5-year bond yield + spread</li>
              <li>Typically 5-year reset intervals</li>
              <li><strong>Market Share:</strong> ~55% of Canadian preferred market</li>
            </ul>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm font-mono text-gray-800 mb-2"><strong>Example:</strong></p>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">Issue: BMO.PR.K
Current Yield: 6.25%
Reset Spread: +3.05% over 5-year GoC
Next Reset: August 2028

If GoC 5-year at reset = 3.50%
New dividend = 3.50% + 3.05% = 6.55%</pre>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-800">
                <strong>Critical Point:</strong> The spread over GoC bonds is the key value driver. Wider spreads = higher reset yields = more attractive.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">3. Floating Rate Preferreds</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Structure:</strong> Dividend adjusts quarterly based on short-term rates</li>
              <li><strong>Benchmark:</strong> Typically 3-month Treasury Bill + spread</li>
              <li><strong>Market Share:</strong> ~10%</li>
              <li><strong>Best For:</strong> Rising rate environment</li>
              <li><strong>Example:</strong> NA.PR.H (National Bank) — Quarterly floating</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4. Fixed-to-Floating Preferreds</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Structure:</strong> Fixed for 5 years, then converts to floating</li>
              <li><strong>Market Share:</strong> ~15% and growing</li>
              <li><strong>Best For:</strong> Uncertain rate outlook</li>
            </ul>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">Example: CM.PR.S (CIBC)
Years 1-5: Fixed 5.25%
Year 6+: 3-month T-bill + 3.50% (quarterly resets)</pre>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">5. Split Share Corporations (Unique to Canada)</h3>
            <p className="text-gray-700 mb-4">
              <strong>Structure:</strong> Corporation holds common shares of a single company, issues:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Preferred shares (fixed dividend, priority claim)</li>
              <li>Capital shares (residual claim, equity upside)</li>
            </ul>
            <p className="text-gray-700 mb-2"><strong>Examples:</strong></p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              <li>DFN (Dividend 15 Split Corp) — holds bank stocks</li>
              <li>FFN (North American Financial 15) — holds financials</li>
            </ul>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-800">
                <strong>⚠️ Warning:</strong> Complex structures with embedded leverage. Not recommended for conservative investors.
              </p>
            </div>

            <hr className="my-8" />

            {/* Section III: 2020 Crisis */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">III. The "Preferred Share Reset Crisis" (2020)</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">What Happened</h3>
            <p className="text-gray-700 mb-4">
              In March 2020, Canadian preferred shares crashed 40-50% in weeks.
            </p>
            
            <p className="text-gray-700 font-semibold mb-2">Root Cause:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>GoC 5-year yields plummeted to 0.25%</li>
              <li>Reset preferreds faced yields of 0.25% + spread (often ~3%) = ~3.25%</li>
              <li>Investors fled to avoid rate resets at historically low rates</li>
              <li>Forced selling created cascade effect</li>
            </ol>
            
            <p className="text-gray-700 font-semibold mb-2">Recovery:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Preferreds recovered 30%+ by end of 2020</li>
              <li>Rates normalized by 2022-2023</li>
              <li>Market now prices reset risk more efficiently</li>
            </ul>
            
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
              <p className="text-amber-800">
                <strong>Lesson Learned:</strong> Rate reset preferreds carry significant rate risk. The spread matters more than the current yield.
              </p>
            </div>

            <hr className="my-8" />

            {/* Section IV: Current Yields */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">IV. Current Yield Environment (February 2026)</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Yield Analysis by Category</h3>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-3 py-2 text-left">Category</th>
                    <th className="px-3 py-2 text-left">Current Yield</th>
                    <th className="px-3 py-2 text-left">Reset Spread</th>
                    <th className="px-3 py-2 text-left">5-Year GoC</th>
                    <th className="px-3 py-2 text-left">Implied Reset</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-3 py-2 font-medium">Bank Perpetuals</td>
                    <td className="px-3 py-2">5.75% - 6.50%</td>
                    <td className="px-3 py-2">N/A</td>
                    <td className="px-3 py-2">N/A</td>
                    <td className="px-3 py-2">N/A</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-2 font-medium">Bank Resets</td>
                    <td className="px-3 py-2">5.50% - 6.75%</td>
                    <td className="px-3 py-2">+2.80% - +3.40%</td>
                    <td className="px-3 py-2">~3.25%</td>
                    <td className="px-3 py-2">6.05% - 6.65%</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-3 py-2 font-medium">Insurance Resets</td>
                    <td className="px-3 py-2">6.00% - 7.25%</td>
                    <td className="px-3 py-2">+2.90% - +3.50%</td>
                    <td className="px-3 py-2">~3.25%</td>
                    <td className="px-3 py-2">6.15% - 6.75%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-2 font-medium">Utility Resets</td>
                    <td className="px-3 py-2">5.25% - 6.25%</td>
                    <td className="px-3 py-2">+2.50% - +3.00%</td>
                    <td className="px-3 py-2">~3.25%</td>
                    <td className="px-3 py-2">5.75% - 6.25%</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-3 py-2 font-medium">REIT Preferreds</td>
                    <td className="px-3 py-2">6.50% - 8.00%</td>
                    <td className="px-3 py-2">+3.00% - +4.00%</td>
                    <td className="px-3 py-2">~3.25%</td>
                    <td className="px-3 py-2">6.25% - 7.25%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-2 font-medium">Floating Rate</td>
                    <td className="px-3 py-2">5.75% - 6.50%</td>
                    <td className="px-3 py-2">N/A</td>
                    <td className="px-3 py-2">N/A</td>
                    <td className="px-3 py-2">T-bill + spread</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Spread Analysis</h3>
            <p className="text-gray-700 mb-4">Current reset spreads are attractive vs. history:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Average Spread (2010-2020): +2.50%</li>
              <li>Average Spread (2021-2023): +2.80%</li>
              <li><strong>Current Spread (2026): +3.00% - +3.50%</strong></li>
            </ul>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <p className="text-green-800">
                <strong>→ Spreads are WIDE — favorable for reset holders</strong>
              </p>
            </div>

            <hr className="my-8" />

            {/* Section V: Major Issuers */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">V. Major Issuers Analysis</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Big 6 Banks (Investment Grade, P-1/P-2 rated)</h3>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-3 py-2 text-left">Bank</th>
                    <th className="px-3 py-2 text-left">Ticker Prefix</th>
                    <th className="px-3 py-2 text-left">Issues</th>
                    <th className="px-3 py-2 text-left">Typical Spread</th>
                    <th className="px-3 py-2 text-left">Credit Quality</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-3 py-2 font-medium">Royal Bank</td>
                    <td className="px-3 py-2">RY.PR</td>
                    <td className="px-3 py-2">15+ series</td>
                    <td className="px-3 py-2">+2.90% - +3.30%</td>
                    <td className="px-3 py-2">P-1 (Highest)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-2 font-medium">TD Bank</td>
                    <td className="px-3 py-2">TD.PR</td>
                    <td className="px-3 py-2">15+ series</td>
                    <td className="px-3 py-2">+2.85% - +3.25%</td>
                    <td className="px-3 py-2">P-1</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-3 py-2 font-medium">Bank of Nova Scotia</td>
                    <td className="px-3 py-2">BNS.PR</td>
                    <td className="px-3 py-2">12+ series</td>
                    <td className="px-3 py-2">+3.00% - +3.40%</td>
                    <td className="px-3 py-2">P-1</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-2 font-medium">BMO</td>
                    <td className="px-3 py-2">BMO.PR</td>
                    <td className="px-3 py-2">12+ series</td>
                    <td className="px-3 py-2">+2.95% - +3.35%</td>
                    <td className="px-3 py-2">P-1</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-3 py-2 font-medium">CIBC</td>
                    <td className="px-3 py-2">CM.PR</td>
                    <td className="px-3 py-2">10+ series</td>
                    <td className="px-3 py-2">+3.10% - +3.50%</td>
                    <td className="px-3 py-2">P-1</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-2 font-medium">National Bank</td>
                    <td className="px-3 py-2">NA.PR</td>
                    <td className="px-3 py-2">8+ series</td>
                    <td className="px-3 py-2">+3.05% - +3.45%</td>
                    <td className="px-3 py-2">P-1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-800">
                <strong>Recommendation:</strong> All Big 6 bank preferreds are suitable for conservative portfolios. Prioritize wider spreads and longer call protection.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Insurance Companies</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-3 py-2 text-left">Issuer</th>
                    <th className="px-3 py-2 text-left">Ticker Prefix</th>
                    <th className="px-3 py-2 text-left">Typical Yield</th>
                    <th className="px-3 py-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-3 py-2 font-medium">Sun Life</td>
                    <td className="px-3 py-2">SLF.PR</td>
                    <td className="px-3 py-2">6.00% - 7.00%</td>
                    <td className="px-3 py-2">Strong balance sheet</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-2 font-medium">Manulife</td>
                    <td className="px-3 py-2">MFC.PR</td>
                    <td className="px-3 py-2">6.25% - 7.25%</td>
                    <td className="px-3 py-2">Asian exposure</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-3 py-2 font-medium">Great-West Life</td>
                    <td className="px-3 py-2">GWO.PR</td>
                    <td className="px-3 py-2">5.75% - 6.75%</td>
                    <td className="px-3 py-2">Conservative</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-2 font-medium">Fairfax</td>
                    <td className="px-3 py-2">FFH.PR</td>
                    <td className="px-3 py-2">7.00% - 8.50%</td>
                    <td className="px-3 py-2">Higher risk, higher yield</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Utilities (Regulated, Stable)</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-3 py-2 text-left">Issuer</th>
                    <th className="px-3 py-2 text-left">Ticker Prefix</th>
                    <th className="px-3 py-2 text-left">Typical Yield</th>
                    <th className="px-3 py-2 text-left">Regulatory Environment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-3 py-2 font-medium">Fortis</td>
                    <td className="px-3 py-2">FTS.PR</td>
                    <td className="px-3 py-2">5.25% - 5.75%</td>
                    <td className="px-3 py-2">Excellent (regulated)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-2 font-medium">Emera</td>
                    <td className="px-3 py-2">EMA.PR</td>
                    <td className="px-3 py-2">5.50% - 6.00%</td>
                    <td className="px-3 py-2">Strong regulatory</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-3 py-2 font-medium">ATCO</td>
                    <td className="px-3 py-2">ACO.PR</td>
                    <td className="px-3 py-2">5.75% - 6.25%</td>
                    <td className="px-3 py-2">Alberta exposure</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">REIT Preferreds (Higher Yield, Higher Risk)</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-3 py-2 text-left">Issuer</th>
                    <th className="px-3 py-2 text-left">Ticker Prefix</th>
                    <th className="px-3 py-2 text-left">Typical Yield</th>
                    <th className="px-3 py-2 text-left">Property Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-3 py-2 font-medium">Brookfield Property</td>
                    <td className="px-3 py-2">BPY.PR</td>
                    <td className="px-3 py-2">6.50% - 7.50%</td>
                    <td className="px-3 py-2">Diversified</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-2 font-medium">RioCan</td>
                    <td className="px-3 py-2">REI.PR</td>
                    <td className="px-3 py-2">6.75% - 7.25%</td>
                    <td className="px-3 py-2">Retail</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-3 py-2 font-medium">FirstService</td>
                    <td className="px-3 py-2">FSV.PR</td>
                    <td className="px-3 py-2">6.25% - 6.75%</td>
                    <td className="px-3 py-2">Residential services</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
              <p className="text-amber-800">
                <strong>Caution:</strong> Office REIT preferreds facing structural headwinds. Avoid concentrated office exposure.
              </p>
            </div>

            <hr className="my-8" />

            {/* Section VI: Tax */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">VI. Tax Considerations for Canadian Investors</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Dividend Tax Credit (DTC)</h3>
            <p className="text-gray-700 mb-4">
              Canadian preferred dividends are <strong>eligible for the enhanced dividend tax credit</strong>:
            </p>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-3 py-2 text-left">Province</th>
                    <th className="px-3 py-2 text-left">Marginal Tax on Employment</th>
                    <th className="px-3 py-2 text-left">Tax on Eligible Dividends</th>
                    <th className="px-3 py-2 text-left">Tax Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-3 py-2">Ontario</td>
                    <td className="px-3 py-2">53.4%</td>
                    <td className="px-3 py-2">39.3%</td>
                    <td className="px-3 py-2 text-green-600 font-bold">14.1% savings</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-2">BC</td>
                    <td className="px-3 py-2">53.5%</td>
                    <td className="px-3 py-2">36.5%</td>
                    <td className="px-3 py-2 text-green-600 font-bold">17.0% savings</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-3 py-2">Alberta</td>
                    <td className="px-3 py-2">48.0%</td>
                    <td className="px-3 py-2">31.3%</td>
                    <td className="px-3 py-2 text-green-600 font-bold">16.7% savings</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-2">Quebec</td>
                    <td className="px-3 py-2">53.3%</td>
                    <td className="px-3 py-2">40.1%</td>
                    <td className="px-3 py-2 text-green-600 font-bold">13.2% savings</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm font-mono text-gray-800 mb-2"><strong>Example:</strong></p>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">Preferred Dividend: $1,000
Tax at marginal rate: $534 (Ontario)
Tax with DTC: $393

Savings: $141 (26% tax reduction)</pre>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Comparison to Fixed Income</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-3 py-2 text-left">Investment</th>
                    <th className="px-3 py-2 text-left">Gross Yield</th>
                    <th className="px-3 py-2 text-left">Tax Rate</th>
                    <th className="px-3 py-2 text-left">After-Tax Yield</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-3 py-2">GIC (Ontario)</td>
                    <td className="px-3 py-2">4.50%</td>
                    <td className="px-3 py-2">53.4%</td>
                    <td className="px-3 py-2">2.10%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-2">Corporate Bond</td>
                    <td className="px-3 py-2">5.00%</td>
                    <td className="px-3 py-2">53.4%</td>
                    <td className="px-3 py-2">2.33%</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-bold">Preferred Share</td>
                    <td className="px-3 py-2 font-bold">6.00%</td>