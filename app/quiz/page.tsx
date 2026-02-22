import Link from 'next/link'
import Navbar from '@/components/navbar'
import { Brain, TrendingUp, Award } from 'lucide-react'

export const metadata = {
  title: 'Financial Analyst Test | Pref Shares Data',
  description: 'Test your knowledge of Canadian preferred shares and get a personalized investment report.'
}

const FUN_FACTS = [
  "The highest yielding preferred share in 2026 offered over 10% annual yield.",
  "Canadian preferred shares have a total market value of over $25 billion.",
  "Rate reset preferreds became the dominant structure after 2008.",
  "The Big 6 banks issue over 60% of all Canadian preferred shares.",
  "Preferred shares rank between bonds and common equity in the capital structure.",
  "The first preferred shares were issued by railroads in the 1800s.",
  "DBRS rates preferred shares on a scale from Pfd-1 (highest) to Pfd-5 (lowest).",
  "Reset spreads above +3.00% are considered attractive in today's market.",
  "Floating rate preferreds adjust their dividends quarterly based on benchmark rates.",
  "Perpetual preferreds have no maturity date but often trade at wider spreads."
]

export default function QuizPage() {
  const randomFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-3xl mx-auto px-4 py-16">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
              <Brain className="w-10 h-10 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Financial Analyst Test
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Test your knowledge of Canadian preferred shares and receive a personalized investment analysis report.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">20</div>
              <div className="text-sm text-gray-500">Questions</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">5 min</div>
              <div className="text-sm text-gray-500">Average Time</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">Free</div>
              <div className="text-sm text-gray-500">Report</div>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What You'll Learn</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <TrendingUp className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <span className="text-gray-600">Your risk tolerance and investment style</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <span className="text-gray-600">Which preferred share types match your goals</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <span className="text-gray-600">Current market opportunities based on your profile</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <span className="text-gray-600">Personalized recommendations from our database</span>
              </li>
            </ul>
          </div>

          {/* Fun Fact */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
            <p className="text-sm text-yellow-800">
              <strong>Did you know?</strong> {randomFact}
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/quiz/question/1"
            className="block w-full bg-primary-600 text-white text-center py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg"
          >
            Start the Test
          </Link>

          <p className="text-center text-sm text-gray-500 mt-4">
            Your results will be emailed to you upon completion
          </p>
        </div>
      </div>
    </>
  )
}
