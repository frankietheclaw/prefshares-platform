import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import { ArrowLeft, Download, AlertTriangle } from 'lucide-react'

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
            
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-4 mb-6">Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed">
              Canadian preferred shares represent one of the most sophisticated preferred markets globally. The rate reset structure—pioneered in Canada—offers unique yield opportunities but requires deep structural understanding. For yield-focused Canadian investors, preferreds provide tax-advantaged income in a market dominated by high-quality financial issuers.
            </p>

            <hr className="my-8" />

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
                    <td className="px-4 py-3 font-medium">Rate Reset Mechanism</td>
                    <td className="px-4 py-3">Common</td>
                    <td className="px-4 py-3">Rare</td>
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

            <h2 className="text-2xl font-bold text-gray-900 mb-6">II. Types of Canadian Preferred Shares</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">1. Perpetual Preferreds (Traditional)</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Structure:</strong> Fixed dividend forever, no maturity</li>
              <li><strong>Market Share:</strong> ~15% of Canadian market</li>
              <li><strong>Best For:</strong> Falling rate environment, income stability</li>
              <li><strong>Risk Profile:</strong> Highest duration sensitivity, most volatile pricing</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2. Fixed Reset Preferreds (Dominant Structure)</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Fixed dividend for 5 years</li>
              <li>Resets at Government of Canada 5-year bond yield + spread</li>
              <li>Typically 5-year reset intervals</li>
              <li><strong>Market Share:</strong> ~55% of Canadian preferred market</li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <p className="text-blue-800">
                <strong>Key Insight:</strong> The spread over GoC bonds is the key value driver. Wider spreads = higher reset yields = more attractive.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">3. Floating Rate Preferreds</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Structure:</strong> Dividend adjusts quarterly based on short-term rates</li>
              <li><strong>Benchmark:</strong> Typically 3-month Treasury Bill + spread</li>
              <li><strong>Market Share:</strong> ~10%</li>
              <li><strong>Best For:</strong> Rising rate environment</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4. Fixed-to-Floating Preferreds</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Structure:</strong> Fixed for 5 years, then converts to floating</li>
              <li><strong>Market Share:</strong> ~15% and growing</li>
              <li><strong>Best For:</strong> Uncertain rate outlook</li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
              <p className="text-red-800">
                <strong>⚠️ Warning:</strong> Split Share Corporations are complex structures with embedded leverage. Not recommended for conservative investors.
              </p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-6">III. Tax Considerations</h2>
            
            <p className="text-gray-700 mb-4">
              Canadian preferred dividends are <strong>eligible for the enhanced dividend tax credit</strong>, providing significant tax advantages:
            </p>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Province</th>
                    <th className="px-4 py-3 text-left">Marginal Tax Rate</th>
                    <th className="px-4 py-3 text-left">Tax on Eligible Dividends</th>
                    <th className="px-4 py-3 text-left">Tax Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-4 py-3">Ontario</td>
                    <td className="px-4 py-3">53.4%</td>
                    <td className="px-4 py-3">39.3%</td>
                    <td className="px-4 py-3 text-green-600 font-bold">14.1%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3">BC</td>
                    <td className="px-4 py-3">53.5%</td>
                    <td className="px-4 py-3">36.5%</td>
                    <td className="px-4 py-3 text-green-600 font-bold">17.0%</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3">Alberta</td>
                    <td className="px-4 py-3">48.0%</td>
                    <td className="px-4 py-3">31.3%</td>
                    <td className="px-4 py-3 text-green-600 font-bold">16.7%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
              <p className="text-green-800">
                <strong>Strategic Recommendation:</strong> Hold preferreds in non-registered accounts to maximize tax efficiency. RRSP/TFSA accounts waste the dividend tax credit benefit.
              </p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-6">IV. Key Risks</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">1. Rate Reset Risk</h4>
                <p className="text-gray-700">At reset date, dividend recalculates based on GoC 5-year yield. If rates have fallen, income drops.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">2. Negative Convexity</h4>
                <p className="text-gray-700">Rate reset preferreds behave counterintuitively: capped upside when rates rise, full downside when rates fall.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">3. Liquidity Risk</h4>
                <p className="text-gray-700">Many issues trade infrequently. Bid-ask spreads can be 1-2%+. Always use limit orders.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">4. Extension Risk</h4>
                <p className="text-gray-700">Issuer may choose not to call at call date, forcing continued holding at reset rate.</p>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-6">V. Current Recommendations</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">What to Buy</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Bank rate resets with spreads of <strong>+3.00% or wider</strong></li>
              <li>Perpetuals at par or below from P-1 rated issuers</li>
              <li>Utility preferreds for stability</li>
              <li>Floating rate if you expect rates to rise</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">What to Avoid</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Issues trading <strong>&gt;$27</strong> (above par, call risk)</li>
              <li>Split share corporations (DFN, FFN, etc.)</li>
              <li>Issues resetting in &lt;6 months when rates falling</li>
              <li>Low-volume issues (&lt;10,000 daily)</li>
              <li>Below P-2 rated issuers (unless seeking high yield)</li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-6">VI. Final Assessment</h2>
            
            <div className="bg-primary-50 rounded-lg p-6 my-6">
              <h3 className="text-xl font-bold text-primary-900 mb-4">Verdict: Moderately Bullish</h3>
              <p className="text-primary-800">
                Current yields and reset spreads compensate for structural risks. Suitable for income-focused investors with 3+ year horizon.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 my-8">
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary-600">3/5</div>
                <div className="text-sm text-gray-600">Risk Rating</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary-600">Moderate</div>
                <div className="text-sm text-gray-600">Suitability</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-600">Favorable</div>
                <div className="text-sm text-gray-600">Environment</div>
              </div>
            </div>

          </div>

          {/* Download CTA */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Want to Save This Guide?
            </h3>
            <p className="text-gray-600 mb-6">
              Download the complete PDF version for offline reading.
            </p>
            <a
              href="/canadian-preferred-shares-guide.pdf"
              download
              className="inline-flex items-center bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF Guide
            </a>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="font-bold text-yellow-800 mb-2">⚠️ Important Disclaimer</h4>
            <p className="text-sm text-yellow-800">
              This guide is for informational and educational purposes only. It does not constitute financial, investment, tax, or legal advice. 
              Past performance is not indicative of future results. All investments carry risk of loss. 
              You should consult with a licensed financial advisor before making any investment decisions. 
              The author is not a registered investment advisor. This content does not consider your personal financial situation.
            </p>
          </div>

        </div>
      </div>
    </>
  )
}
