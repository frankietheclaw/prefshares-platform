'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import { CheckCircle, Award, TrendingUp, Shield, Target, AlertTriangle, Loader2 } from 'lucide-react'

export default function ResultsPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [profile, setProfile] = useState<any>(null)
  
  // Form state
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('quiz_answers')
    if (!saved) {
      router.push('/quiz')
      return
    }
    
    const parsedAnswers = JSON.parse(saved)
    setAnswers(parsedAnswers)
    
    const calculatedProfile = calculateProfile(parsedAnswers)
    setProfile(calculatedProfile)
  }, [router])

  const calculateProfile = (answers: Record<number, string>) => {
    let riskScore = 0
    let incomeFocus = 0
    let knowledgeLevel = 2
    
    if (answers[1] === 'conservative') riskScore += 1
    else if (answers[1] === 'moderate') riskScore += 2
    else if (answers[1] === 'balanced') riskScore += 3
    else if (answers[1] === 'aggressive') riskScore += 4
    
    if (answers[3] === 'income') incomeFocus += 3
    else if (answers[3] === 'preservation') incomeFocus -= 2
    else if (answers[3] === 'balanced') incomeFocus += 1
    
    if (answers[13] === 'beginner') knowledgeLevel = 1
    else if (answers[13] === 'intermediate') knowledgeLevel = 2
    else if (answers[13] === 'advanced') knowledgeLevel = 3
    else if (answers[13] === 'expert') knowledgeLevel = 4
    
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
    
    return { type, description, recommendations, riskScore, incomeFocus, knowledgeLevel }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !profile) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('https://veqfwdhejertooqojnup.supabase.co/rest/v1/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlcWZ3ZGhlamVydG9vcW9qbnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDY3MjQsImV4cCI6MjA4NzAyMjcyNH0.Nl822bymoaQtdAEbLm-N-h-2PvUdNGYqV9lXnwOn1iU',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          email,
          first_name: firstName || null,
          last_name: lastName || null,
          phone: phone || null,
          investor_type: profile.type,
          risk_score: profile.riskScore,
          knowledge_level: profile.knowledgeLevel,
          quiz_answers: answers
        })
      })
      
      if (response.ok) {
        setSuccess(true)
        sessionStorage.removeItem('quiz_answers')
      } else if (response.status === 409) {
        setError('This email is already registered.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Connection error. Please try again.')
    }
    
    setLoading(false)
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
        <div className="max-w-3xl mx-auto px-4">
          
          {/* Results Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Investor Profile
              </h1>
              <p className="text-gray-600">
                Based on your 20 answers, here's your personalized analysis
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
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> This analysis is for informational purposes only and does not constitute investment advice. Past performance is not indicative of future results. Please consult a licensed financial advisor before making investment decisions.
              </div>
            </div>
          </div>

          {/* Email Capture Form */}
          {!success ? (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Get Your Full Report
              </h2>
              <p className="text-gray-600 mb-6">
                Enter your details to receive your complete investment analysis with specific preferred share recommendations.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full mt-6 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Get My Report'
                  )}
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  🔒 Your data is stored securely. We never share your information.
                </p>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                You're In!
              </h2>
              <p className="text-gray-600 mb-6">
                Your personalized investment report has been saved. We'll send updates to <strong>{email}</strong>.
              </p>
              
              {/* Free PDF Download */}
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-primary-900 mb-2">
                  📚 Free Download: Canadian Preferred Shares Guide
                </h3>
                <p className="text-sm text-primary-700 mb-4">
                  Get our comprehensive institutional analysis of Canadian preferred shares — covering rate resets, credit ratings, tax advantages, and yield strategies.
                </p>
                <a
                  href="/canadian-preferred-shares-guide.pdf"
                  download
                  className="inline-flex items-center bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF Guide
                </a>
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

          {/* Bottom Links */}
          {!success && (
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Link
                href="/preferreds"
                className="block text-center bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Browse Preferred Shares
              </Link>
              <Link
                href="/rankings"
                className="block text-center bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                View Yield Rankings
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
