'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import { CheckCircle, Award, TrendingUp, Shield, Target, AlertTriangle } from 'lucide-react'

export default function ResultsPage() {
  const router = useRouter()
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

  useEffect(() => {
    // Load Mailchimp script after component mounts
    const script = document.createElement('script')
    script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

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

          {/* Mailchimp Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div id="mc_embed_shell">
              <style dangerouslySetInnerHTML={{__html: `
                #mc_embed_signup { background: #fff; clear: left; font: 14px Helvetica, Arial, sans-serif; width: 100%; }
                #mc_embed_signup .mc-field-group { margin-bottom: 15px; }
                #mc_embed_signup .mc-field-group label { display: block; margin-bottom: 5px; font-weight: 500; color: #374151; }
                #mc_embed_signup .mc-field-group input { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
                #mc_embed_signup .mc-field-group input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
                #mc_embed_signup .asterisk { color: #ef4444; }
                #mc_embed_signup .button { background: #3b82f6; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; width: 100%; font-size: 16px; }
                #mc_embed_signup .button:hover { background: #2563eb; }
                #mc_embed_signup h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 15px; color: #111827; }
              `}} />
              <div id="mc_embed_signup">
                <form 
                  action="https://Com.us9.list-manage.com/subscribe/post?u=1575b4f449976702ed7e9002c&amp;id=bcc90ae32d&amp;f_id=003ee9e3f0" 
                  method="post" 
                  id="mc-embedded-subscribe-form" 
                  name="mc-embedded-subscribe-form" 
                  className="validate" 
                  target="_blank"
                >
                  <div id="mc_embed_signup_scroll">
                    <h2>Subscribe & Get the Full Report</h2>
                    <div className="indicates-required mb-4 text-sm text-gray-500">
                      <span className="asterisk">*</span> indicates required
                    </div>
                    
                    <div className="mc-field-group">
                      <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label>
                      <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required />
                    </div>
                    
                    <div className="mc-field-group">
                      <label htmlFor="mce-FNAME">First Name</label>
                      <input type="text" name="FNAME" className="text" id="mce-FNAME" />
                    </div>
                    
                    <div className="mc-field-group">
                      <label htmlFor="mce-LNAME">Last Name</label>
                      <input type="text" name="LNAME" className="text" id="mce-LNAME" />
                    </div>
                    
                    <div className="mc-field-group">
                      <label htmlFor="mce-PHONE">Phone Number</label>
                      <input type="text" name="PHONE" className="REQ_CSS" id="mce-PHONE" />
                    </div>
                    
                    <div hidden>
                      <input type="hidden" name="tags" value="15370241" />
                    </div>
                    
                    <div id="mce-responses" className="clear">
                      <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                      <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                    </div>
                    
                    <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                      <input type="text" name="b_1575b4f449976702ed7e9002c_bcc90ae32d" tabIndex={-1} />
                    </div>
                    
                    <div className="clear mt-6">
                      <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Subscribe & Get Report" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>

          {/* Bottom Links */}
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
        </div>
      </div>
    </>
  )
}
