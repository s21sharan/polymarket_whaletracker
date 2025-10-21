'use client'

import { useState } from 'react'

export default function AnalyzeUser() {
  const [userAddress, setUserAddress] = useState('')
  const [analyzing, setAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!userAddress) return
    setAnalyzing(true)
    // TODO: Implement user analysis
    setTimeout(() => setAnalyzing(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">User Analysis</h3>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Address or Username
              </label>
              <input
                type="text"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                placeholder="Enter wallet address or username..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={analyzing || !userAddress}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {analyzing ? 'Analyzing...' : 'Analyze User'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Total Volume</h4>
          <p className="text-2xl font-bold text-gray-900">$0</p>
          <p className="text-sm text-gray-500">All-time</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Win Rate</h4>
          <p className="text-2xl font-bold text-green-600">0%</p>
          <p className="text-sm text-gray-500">Success rate</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Profit/Loss</h4>
          <p className="text-2xl font-bold text-gray-900">$0</p>
          <p className="text-sm text-gray-500">Total P&L</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Active Positions</h4>
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-500">Current</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Recent Trades</h4>
        <div className="text-sm text-gray-500">No trades found</div>
      </div>
    </div>
  )
}