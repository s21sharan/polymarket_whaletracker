'use client'

import { useState, useEffect } from 'react'

interface TwitterSentimentProps {
  marketQuestion: string
}

interface SentimentData {
  positive: number
  negative: number
  neutral: number
}

export default function TwitterSentiment({ marketQuestion }: TwitterSentimentProps) {
  const [sentiment, setSentiment] = useState<SentimentData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchSentiment()
  }, [marketQuestion])

  const fetchSentiment = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/twitter/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marketQuestion })
      })
      
      if (response.ok) {
        const data = await response.json()
        setSentiment(data.sentiment)
      }
    } catch (error) {
      console.error('Failed to fetch sentiment:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-sm text-gray-500">Loading sentiment...</div>
  if (!sentiment) return null

  const total = sentiment.positive + sentiment.negative + sentiment.neutral
  const positivePercent = total > 0 ? (sentiment.positive / total) * 100 : 0
  const negativePercent = total > 0 ? (sentiment.negative / total) * 100 : 0

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
      <p className="text-xs font-semibold text-gray-600 mb-2">Twitter Sentiment</p>
      <div className="flex items-center space-x-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
          <span className="text-green-700">{positivePercent.toFixed(0)}% Positive</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
          <span className="text-red-700">{negativePercent.toFixed(0)}% Negative</span>
        </div>
      </div>
      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden flex">
        <div 
          className="bg-green-500 h-full transition-all duration-300"
          style={{ width: `${positivePercent}%` }}
        ></div>
        <div 
          className="bg-gray-400 h-full transition-all duration-300"
          style={{ width: `${100 - positivePercent - negativePercent}%` }}
        ></div>
        <div 
          className="bg-red-500 h-full transition-all duration-300"
          style={{ width: `${negativePercent}%` }}
        ></div>
      </div>
    </div>
  )
}