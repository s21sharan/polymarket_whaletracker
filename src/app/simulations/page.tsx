'use client'

import Portfolio from '@/components/Portfolio'

export default function SimulationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Simulations</h1>
          <p className="text-gray-600 mt-2">Portfolio tracking and simulation tools</p>
        </div>
        <Portfolio />
      </div>
    </div>
  )
}