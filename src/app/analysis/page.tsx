'use client'

import AnalyzeMarket from '@/components/tabs/AnalyzeMarket'

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analysis</h1>
          <p className="text-gray-600 mt-2">Analyze markets and user behavior</p>
        </div>
        <AnalyzeMarket />
      </div>
    </div>
  )
}