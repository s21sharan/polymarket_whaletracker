'use client'

import { useState } from 'react'
import InsiderTradesTable from '../InsiderTradesTable'

interface InsiderTrade {
  market: string
  outcome: string
  user: string
  currentPrice: number
  avgEntryPrice: number
  pnlPercent: number
  invested: number
  zScore: number
  nPositions: number
  daysSince1stTrade: number
  marketMeanInvested: number
}

interface InsiderMarket {
  market: string
  outcome: 'Yes' | 'No'
  invested: number
  suspicionScore: number
}

const mockInsiderTrades: InsiderTrade[] = [
  {
    market: 'Will Company X announce merger?',
    outcome: 'Yes',
    user: 'Anonymous_0x4f2a',
    currentPrice: 0.89,
    avgEntryPrice: 0.12,
    pnlPercent: 641.7,
    invested: 125000,
    zScore: 3.2,
    nPositions: 1,
    daysSince1stTrade: 2,
    marketMeanInvested: 2500
  },
  {
    market: 'Will regulatory approval pass?',
    outcome: 'Yes', 
    user: 'QuickTrader99',
    currentPrice: 0.85,
    avgEntryPrice: 0.28,
    pnlPercent: 203.6,
    invested: 87500,
    zScore: 2.8,
    nPositions: 3,
    daysSince1stTrade: 1,
    marketMeanInvested: 3200
  },
  {
    market: 'Will CEO resign this month?',
    outcome: 'Yes',
    user: 'MarketPro_2024',
    currentPrice: 0.92,
    avgEntryPrice: 0.18,
    pnlPercent: 411.1,
    invested: 95000,
    zScore: 3.5,
    nPositions: 2,
    daysSince1stTrade: 0,
    marketMeanInvested: 1800
  },
  {
    market: 'Fed interest rates by 25 bps after December 18th meeting?',
    outcome: 'No',
    user: 'InsiderBot_v2',
    currentPrice: 0.23,
    avgEntryPrice: 0.78,
    pnlPercent: -70.5,
    invested: 45000,
    zScore: 2.1,
    nPositions: 1,
    daysSince1stTrade: 5,
    marketMeanInvested: 4500
  },
  {
    market: 'Will Bitcoin win the 2024 AFC Divisional Playoffs?',
    outcome: 'Yes',
    user: 'CryptoWhale88',
    currentPrice: 0.67,
    avgEntryPrice: 0.15,
    pnlPercent: 346.7,
    invested: 78000,
    zScore: 2.9,
    nPositions: 4,
    daysSince1stTrade: 3,
    marketMeanInvested: 2100
  }
]

const mockInsiderMarkets: InsiderMarket[] = [
  {
    market: 'Fed decreases interest rates by 25 bps after December 18th meeting?',
    outcome: 'Yes',
    invested: 850000,
    suspicionScore: 95
  },
  {
    market: 'Will Pelosi Markets win the USMR ticker?',
    outcome: 'Yes',
    invested: 650000,
    suspicionScore: 88
  },
  {
    market: 'Lord Miles completes 30-day water fast in the desert?',
    outcome: 'No',
    invested: 480000,
    suspicionScore: 82
  },
  {
    market: 'Fed decreases interest rates by 50+ bps after September 18th meeting?',
    outcome: 'Yes',
    invested: 420000,
    suspicionScore: 79
  },
  {
    market: 'Will BTC reach $100k by end of 2024?',
    outcome: 'Yes',
    invested: 380000,
    suspicionScore: 75
  },
  {
    market: 'Will Trump win 2024 Presidential Election?',
    outcome: 'No',
    invested: 320000,
    suspicionScore: 72
  },
  {
    market: 'Will Andrew Come win the 2024 NYC Mayoral Election?',
    outcome: 'Yes',
    invested: 280000,
    suspicionScore: 68
  },
  {
    market: 'Will George Santos win the 2024 NYC Mayoral Election?',
    outcome: 'No',
    invested: 240000,
    suspicionScore: 65
  },
  {
    market: 'US x Venezuela military engagement by September 30?',
    outcome: 'No',
    invested: 200000,
    suspicionScore: 62
  },
  {
    market: 'Will Fed cut interest rates after September 2024 meeting?',
    outcome: 'Yes',
    invested: 180000,
    suspicionScore: 58
  }
]

export default function InsiderDetection() {
  const [selectedView, setSelectedView] = useState<'trades' | 'markets'>('trades')

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`
    }
    return `$${value.toFixed(0)}`
  }

  const formatPercent = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(1)}%`
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">Insider Detection System</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            ⚠️ This system flags potentially suspicious trading patterns based on statistical analysis and timing anomalies.
          </p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSelectedView('trades')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedView === 'trades' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Suspicious Trades
        </button>
        <button
          onClick={() => setSelectedView('markets')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedView === 'markets' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Most Insider Traded Markets
        </button>
      </div>

      {selectedView === 'trades' ? (
        <div>
          <h4 className="text-lg font-semibold mb-4">Suspicious Trading Activity</h4>
          <InsiderTradesTable data={mockInsiderTrades} />
        </div>
      ) : (
        <div>
          <h4 className="text-lg font-semibold mb-4">Invested USD per Market, Stacked by Users</h4>
          <p className="text-sm text-gray-600 mb-6">
            Shows markets where insider trading patterns are most prevalent. Green bars represent YES positions, red bars represent NO positions.
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-2">
              {mockInsiderMarkets.map((market, index) => {
                const maxInvested = Math.max(...mockInsiderMarkets.map(m => m.invested))
                // Scale to 1000k (1M) max on the bottom scale
                const scaleMax = 1000000 // 1M
                const barWidth = (market.invested / scaleMax) * 500 // 500px represents full scale
                const isYes = market.outcome === 'Yes'
                
                return (
                  <div key={index} className="flex items-center py-1">
                    {/* Market name - fixed width */}
                    <div className="w-96 text-xs text-gray-700 pr-4 flex-shrink-0">
                      {market.market} - {market.outcome}
                    </div>
                    
                    {/* Chart area - aligned with scale */}
                    <div className="w-[500px] flex items-center flex-shrink-0">
                      <div 
                        className={`h-3 ${isYes ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.max(barWidth, 2)}px` }}
                      ></div>
                    </div>
                    
                    {/* Values - fixed width for alignment */}
                    <div className="w-20 text-right ml-4 flex-shrink-0">
                      <div className="text-xs font-medium text-gray-900">
                        {formatCurrency(market.invested)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-8 text-sm mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-3 bg-green-500"></div>
                  <span className="font-medium">YES Positions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-3 bg-red-500"></div>
                  <span className="font-medium">NO Positions</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xs text-gray-500 font-mono pl-96">
                  0 ────── 200k ────── 400k ────── 600k ────── 800k ────── 1000k
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}