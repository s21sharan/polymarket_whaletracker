'use client'

import InsiderDetection from '@/components/tabs/InsiderDetection'

export default function InsidersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Insider Detection</h1>
          <p className="text-gray-600 mt-2">Identify suspicious trading patterns and insider activity</p>
        </div>
        <InsiderDetection />
      </div>
    </div>
  )
}