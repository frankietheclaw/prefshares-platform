'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import { ChevronRight, ArrowLeft } from 'lucide-react'

const QUESTIONS = [
  {
    id: 1,
    question: "What is a good annual yield for a preferred share?",
    options: [
      { label: "1-2%", value: "conservative" },
      { label: "3-4%", value: "moderate" },
      { label: "5-8%", value: "balanced" },
      { label: "10%+", value: "aggressive" }
    ],
    fact: "The average preferred share yield in Canada is 5.5% as of 2026."
  },
  {
    id: 2,
    question: "How long do you plan to hold your investments?",
    options: [
      { label: "Less than 1 year", value: "short" },
      { label: "1-3 years", value: "medium" },
      { label: "3-5 years", value: "long" },
      { label: "5+ years", value: "very_long" }
    ],
    fact: "Preferred shares have an average holding period of 2.5 years for retail investors."
  },
  {
    id: 3,
    question: "Which matters more to you: income or capital preservation?",
    options: [
      { label: "Income is priority", value: "income" },
      { label: "Capital preservation", value: "preservation" },
      { label: "Equal balance", value: "balanced" },
      { label: "Capital growth", value: "growth" }
    ],
    fact: "Preferred shares are designed primarily for income, not capital appreciation."
  },
  {
    id: 4,
    question: "What is your comfort level with interest rate changes?",
    options: [
      { label: "Very concerned", value: "low" },
      { label: "Somewhat concerned", value: "medium" },
      { label: "Neutral", value: "neutral" },
      { label: "Not concerned", value: "high" }
    ],
    fact: "Rate reset preferreds can actually benefit when interest rates rise."
  },
  {
    id: 5,
    question: "Which preferred share type sounds most appealing?",
    options: [
      { label: "Fixed rate forever (perpetual)", value: "perpetual" },
      { label: "Rate resets every 5 years", value: "reset" },
      { label: "Floating rate adjusts quarterly", value: "floating" },
      { label: "Not sure yet", value: "unsure" }
    ],
    fact: "Rate reset preferreds make up 55% of the Canadian preferred share market."
  },
  {
    id: 6,
    question: "How important is credit rating to you?",
    options: [
      { label: "P-1 rated only (highest)", value: "highest" },
      { label: "P-1 or P-2 acceptable", value: "high" },
      { label: "P-2 or P-3 is fine", value: "medium" },
      { label: "Rating doesn't matter", value: "low" }
    ],
    fact: "P-1 rated preferred shares from Big 6 banks have never defaulted in Canada."
  },
  {
    id: 7,
    question: "Which sector would you trust most for preferred shares?",
    options: [
      { label: "Big 6 Banks", value: "banks" },
      { label: "Utilities", value: "utilities" },
      { label: "Insurance companies", value: "insurance" },
      { label: "Pipelines/Energy", value: "energy" }
    ],
    fact: "Bank preferred shares represent over 60% of the Canadian market by value."
  },
  {
    id: 8,
    question: "What's your ideal investment size for preferred shares?",
    options: [
      { label: "Under $5,000", value: "small" },
      { label: "$5,000 - $25,000", value: "medium" },
      { label: "$25,000 - $100,000", value: "large" },
      { label: "$100,000+", value: "institutional" }
    ],
    fact: "Most preferred shares trade at $25 per share, making them accessible to all investors."
  },
  {
    id: 9,
    question: "How do you feel about reset spreads?",
    options: [
      { label: "What's a reset spread?", value: "novice" },
      { label: "Prefer higher spreads (+3.5%+)", value: "high" },
      { label: "Moderate spreads (+2.5-3.5%)", value: "medium" },
      { label: "Lower spreads are fine", value: "low" }
    ],
    fact: "Reset spreads above +3.00% are considered attractive in the current market."
  },
  {
    id: 10,
    question: "What's your primary investment goal?",
    options: [
      { label: "Retirement income", value: "retirement" },
      { label: "Portfolio diversification", value: "diversify" },
      { label: "Regular cash flow", value: "cashflow" },
      { label: "Tax-efficient income", value: "tax" }
    ],
    fact: "Preferred share dividends are taxed at a lower rate than interest income in Canada."
  },
  {
    id: 11,
    question: "How would you react if your preferred share dropped 10%?",
    options: [
      { label: "Sell immediately", value: "sell" },
      { label: "Hold and wait for recovery", value: "hold" },
      { label: "Buy more at lower price", value: "buy" },
      { label: "Review fundamentals first", value: "analyze" }
    ],
    fact: "During the 2020 market crash, many bank preferred shares recovered within 6 months."
  },
  {
    id: 12,
    question: "Do you reinvest dividends?",
    options: [
      { label: "Always", value: "always" },
      { label: "Sometimes", value: "sometimes" },
      { label: "Rarely", value: "rarely" },
      { label: "Never - need the income", value: "never" }
    ],
    fact: "DRIPs (Dividend Reinvestment Plans) can boost your total return by 15-20% over 10 years."
  },
  {
    id: 13,
    question: "How familiar are you with preferred shares?",
    options: [
      { label: "Complete beginner", value: "beginner" },
      { label: "Some knowledge", value: "intermediate" },
      { label: "Fairly experienced", value: "advanced" },
      { label: "Expert level", value: "expert" }
    ],
    fact: "Preferred shares are often overlooked by retail investors, creating opportunities."
  },
  {
    id: 14,
    question: "What's your view on callable preferred shares?",
    options: [
      { label: "Prefer non-callable", value: "non_callable" },
      { label: "Callable is fine", value: "callable_ok" },
      { label: "Depends on yield premium", value: "premium" },
      { label: "What's callable mean?", value: "unsure" }
    ],
    fact: "Most rate reset preferreds are callable at $25 on their reset date."
  },
  {
    id: 15,
    question: "How important is liquidity to you?",
    options: [
      { label: "Must sell within days", value: "high" },
      { label: "Within a week is fine", value: "medium" },
      { label: "Can wait weeks", value: "low" },
      { label: "Long-term holder", value: "minimal" }
    ],
    fact: "Major bank preferred shares trade over 100,000 shares daily on the TSX."
  },
  {
    id: 16,
    question: "What yield spread would make you nervous?",
    options: [
      { label: "Yields below 4%", value: "low_yield" },
      { label: "Yields above 8%", value: "high_yield" },
      { label: "Yields above 10%", value: "very_high" },
      { label: "Not concerned about yield level", value: "neutral" }
    ],
    fact: "Higher yields often indicate higher risk. The safest bank preferreds yield 5-6%."
  },
  {
    id: 17,
    question: "Do you follow dividend payment schedules?",
    options: [
      { label: "Track all payment dates", value: "active" },
      { label: "Check occasionally", value: "moderate" },
      { label: "Let it run on autopilot", value: "passive" },
      { label: "Not sure how to track", value: "novice" }
    ],
    fact: "Most Canadian preferred shares pay dividends quarterly, typically in Jan/Apr/Jul/Oct."
  },
  {
    id: 18,
    question: "What's your risk tolerance overall?",
    options: [
      { label: "Very conservative", value: "conservative" },
      { label: "Moderately conservative", value: "moderate" },
      { label: "Moderate", value: "balanced" },
      { label: "Aggressive", value: "aggressive" }
    ],
    fact: "Preferred shares offer a middle ground between bonds (lower risk) and stocks (higher risk)."
  },
  {
    id: 19,
    question: "How do you research investments?",
    options: [
      { label: "Financial advisor", value: "advisor" },
      { label: "Online research myself", value: "self" },
      { label: "News and reports", value: "news" },
      { label: "Recommendations from others", value: "social" }
    ],
    fact: "Independent research platforms like Pref Shares Data help level the playing field."
  },
  {
    id: 20,
    question: "What would make you switch preferred shares?",
    options: [
      { label: "Better yield elsewhere", value: "yield" },
      { label: "Credit rating change", value: "rating" },
      { label: "Approaching reset date", value: "reset" },
      { label: "Never - buy and hold", value: "hold" }
    ],
    fact: "Savvy investors review their preferred share holdings before each reset date."
  }
]

export default function QuestionPage() {
  const router = useRouter()
  const params = useParams()
  const questionId = parseInt(params.id as string)
  const question = QUESTIONS.find(q => q.id === questionId)
  
  const [selected, setSelected] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  useEffect(() => {
    // Load saved answers from sessionStorage
    const saved = sessionStorage.getItem('quiz_answers')
    if (saved) {
      setAnswers(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    // Set selected from saved answers
    if (answers[questionId]) {
      setSelected(answers[questionId])
    } else {
      setSelected(null)
    }
  }, [questionId, answers])

  const handleSelect = (value: string) => {
    setSelected(value)
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)
    sessionStorage.setItem('quiz_answers', JSON.stringify(newAnswers))
  }

  const handleNext = () => {
    if (!selected) return
    
    if (questionId < 20) {
      router.push(`/quiz/question/${questionId + 1}`)
    } else {
      router.push('/quiz/results')
    }
  }

  if (!question) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Question not found</h1>
            <Link href="/quiz" className="text-primary-600 mt-4 inline-block">Back to Quiz</Link>
          </div>
        </div>
      </>
    )
  }

  const progress = (questionId / 20) * 100

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {questionId} of 20</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selected === option.value
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fun Fact */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
            <p className="text-sm text-yellow-800">
              <strong>💡 Did you know?</strong> {question.fact}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            {questionId > 1 ? (
              <Link
                href={`/quiz/question/${questionId - 1}`}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous
              </Link>
            ) : (
              <Link
                href="/quiz"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Link>
            )}

            <button
              onClick={handleNext}
              disabled={!selected}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold ${
                selected
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {questionId === 20 ? 'See Results' : 'Next Question'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
