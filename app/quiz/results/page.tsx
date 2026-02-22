'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import { Mail, CheckCircle, ArrowRight, Award, TrendingUp, Shield, Target, AlertTriangle } from 'lucide-react'

export default function ResultsPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('quiz_answers')
    if (!saved) {
      router.push('/quiz')
      return
    }
    
    const parsedAnswers = JSON.parse(saved)
    setAnswers(parsedAnswers)
    
    // Calculate profile
    const calculatedProfile = calculateProfile(parsedAnswers)
    setProfile(calculatedProfile)
  }, [router])

  const calculateProfile = (answers: Record<number, string>) => {
    let riskScore = 0
    let incomeFocus = 0
    let knowledgeLevel = 2
    
    // Q1 - Yield preference
    if (answers[1] === 'conservative') riskScore += 1
    else if (answers[1] === 'moderate') riskScore += 2
    else if (answers[1] === 'balanced') riskScore += 3
    else if (answers[1] === 'aggressive') riskScore += 4
    
    // Q3 - Income vs preservation
    if (answers[3] === 'income') incomeFocus += 3
    else if (answers[3] === 'preservation') incomeFocus -= 2
    else if (answers[3] === 'balanced') incomeFocus += 1
    
    // Q13 - Knowledge
    if (answers[13] === 'beginner') knowledgeLevel = 1
    else if (answers[13] === 'intermediate') knowledgeLevel = 2
    else if (answers[13] === 'advanced') knowledgeLevel = 3
    else if (answers[13] === 'expert') knowledgeLevel = 4
    
    // Q18 - Risk tolerance
    if (answers[18] === 'conservative') riskScore += 1
    else if (answers[18] === 'moderate') riskScore += 2
    else if (answers[18] === 'balanced') riskScore += 3
    else if (answers[18] === 'aggressive') riskScore += 4
    
    let type: string
    let description: string
    let recommendations: string[]
    
    if (riskScore <= 5 && incomeFocus > 0) {
      type = "Conservative Income Investor"
      description = "You prioritize steady income and capital preservation. You prefer lower-risk preferred shares with reliable dividend payments."
      recommendations = [
        "Focus on P-1 rated bank preferreds with yields of 5-6%",
        "Consider rate reset preferreds with wide reset spreads (+3.00% or more)",
        "Look at perpetual preferreds from major utilities",
        "Avoid higher-yielding but riskier issuers"
      ]
    } else if (riskScore <= 7) {
      type = "Balanced Income Investor"
      description = "You seek a balance between income and moderate risk. You're comfortable with some volatility for higher yields."
      recommendations = [
        "Mix of P-1 and P-2 rated preferreds targeting 6-7% yield",
        "Rate reset preferreds with upcoming reset dates",
        "Consider some floating rate preferreds for rate protection",
        "Maintain 60% in banks, 40% diversified across utilities/insurance"
      ]
    } else if (riskScore >= 8) {
      type = "Aggressive Yield Hunter"
      description = "You prioritize maximum yield and are comfortable with higher risk. You understand the trade-offs involved."
      recommendations = [
        "Target preferreds yielding 7-9% including some P-2 rated issues",
        "Consider split share preferreds for enhanced yields",
        "Look at reset preferreds trading below par",
        "Active management around reset dates for maximum return"
      ]
    } else {
      type = "Income-Focused Moderate"
      description = "You value steady income with careful attention to risk management."
      recommendations = [
        "Focus on blue-chip issuers with 5.5-6.5% yields",
        "Build a ladder of reset dates for income stability",
        "Monitor credit ratings and issuer financials",
        "Consider tax implications in non-registered accounts"
      ]
    }
    
    return {
      type,
      description,
      recommendations,
      riskScore,
      incomeFocus,
      knowledgeLevel,
      completedAt: new Date().toISOString()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !profile) return
    
    setLoading(true)
    
    // TODO: Send to Supabase or email service
    // For now, simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSubmitted(true)
    setLoading(false)
    
    // Clear answers
    sessionStorage.removeItem('quiz_answers')
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Calculating your results...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="max-w-2xl mx-auto px-4">
          {!submitted ? (
            <>
              {/* Results Preview */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Your Results Are Ready!
                  </h1>
                  <p className="text-gray-600">
                    Based on your 20 answers, we've identified your investor profile
                  </p>
                </div>

                <div className="bg-primary-50 rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-bold text-primary-900 mb-2">
                    {profile.type}
                  </h2>
                  <p className="text-primary-700">
                    {profile.description}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="text-gray-700">Risk Score: {profile.riskScore}/10</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Income Focus: {profile.incomeFocus > 0 ? 'High' : 'Moderate'}</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="w-5 h-5 text-purple-500 mr-3" />
                    <span className="text-gray-700">Knowledge Level: {['Beginner', 'Intermediate', 'Advanced', 'Expert'][profile.knowledgeLevel - 1] || 'Intermediate'}</span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Your Personalized Recommendations:</h3>
                  <ul className="space-y-2">
                    {profile.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-800">
                      <strong>Disclaimer:</strong> This analysis is for informational purposes only and does not constitute investment advice. Past performance is not indicative of future results. Please consult a licensed financial advisor before making investment decisions.
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Capture */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Get Your Full Report
                </h2>
                <p className="text-gray-600 mb-6">
                  Enter your email to receive your complete investment analysis, including specific preferred share recommendations from our database of 246+ shares.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Report...
                      </>
                    ) : (
                      <>
                        Send My Report
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Report Sent!
              </h2>
              <p className="text-gray-600 mb-6">
                Your personalized investment analysis has been sent to <strong>{email}</strong>. Check your inbox (and spam folder) in a few minutes.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <strong>Reminder:</strong> This analysis is for informational purposes only and does not constitute investment advice. Please consult a licensed financial advisor before making investment decisions.
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/preferreds"
                  className="block w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Browse Preferred Shares
                </Link>
                <Link
                  href="/rankings"
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  View Yield Rankings
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
