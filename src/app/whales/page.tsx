'use client'

import { useState } from 'react'
import WhalePositions from '@/components/tabs/WhalePositions'
import WhaleTrades from '@/components/tabs/WhaleTrades'

export default function WhalesPage() {
  const [activeView, setActiveView] = useState<'positions' | 'trades'>('positions')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Whale Tracking</h1>
          <p className="text-gray-600 mt-2">Monitor large positions and trades</p>
        </div>
        
        {/* View Toggle */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveView('positions')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'positions' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Whale Positions
          </button>
          <button
            onClick={() => setActiveView('trades')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'trades' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Whale Trades
          </button>
        </div>

        {activeView === 'positions' ? <WhalePositions /> : <WhaleTrades />}
      </div>
    </div>
  )
}