'use client'

import { useState } from 'react'
import { ChevronDown, TrendingDown, TrendingUp } from 'lucide-react'

interface MarketData {
  id: string
  question: string
  volume24h: number
  totalVolume: number
  liquidity: number
  uniqueTraders24h: number
  uniqueTradersDelta: number
  buyYesTrades24h: number
  buyYesTradesDelta: number
  buyNoTrades24h: number
  buyNoTradesDelta: number
  description: string
  resolutionDetails: string
  imageUrl?: string
}

const mockMarkets: MarketData[] = [
  {
    id: '1',
    question: 'Xi Jinping out by end of 2026?',
    volume24h: 22524,
    totalVolume: 1921470,
    liquidity: 96260,
    uniqueTraders24h: 108,
    uniqueTradersDelta: -3,
    buyYesTrades24h: 21,
    buyYesTradesDelta: 1,
    buyNoTrades24h: 59,
    buyNoTradesDelta: -2,
    description: 'This market will resolve to "Yes" if China\'s General Secretary of the Communist Party, Xi Jinping, is removed from power for any length of time between July 3, 2025, and December 31, 2026, 11:59 PM ET. Otherwise, this market will resolve to "No".',
    resolutionDetails: 'CCP General Secretary Xi Jinping will be considered removed from power if he announces his resignation from his role as General Secretary, or is otherwise dismissed, detained, disqualified, or otherwise loses his position or is prevented from fulfilling his duties as General Secretary within this market\'s timeframe.',
    imageUrl: '/api/placeholder/120/120'
  },
  {
    id: '2',
    question: 'Will Bitcoin reach $100k by end of 2024?',
    volume24h: 125000,
    totalVolume: 5430000,
    liquidity: 250000,
    uniqueTraders24h: 342,
    uniqueTradersDelta: 45,
    buyYesTrades24h: 156,
    buyYesTradesDelta: 23,
    buyNoTrades24h: 89,
    buyNoTradesDelta: -12,
    description: 'This market will resolve to "Yes" if the price of Bitcoin reaches or exceeds $100,000 USD on any major exchange before December 31, 2024, 11:59 PM ET.',
    resolutionDetails: 'The price must be sustained for at least 1 minute on exchanges including but not limited to: Coinbase, Binance, Kraken.',
    imageUrl: '/api/placeholder/120/120'
  }
]

// Mock chart data
const generateChartData = (baseValue: number, variance: number = 10) => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: baseValue + Math.random() * variance - variance / 2
  }))
}

export default function AnalyzeMarket() {
  const [selectedMarket, setSelectedMarket] = useState<MarketData>(mockMarkets[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const uniqueTradersData = generateChartData(selectedMarket.uniqueTraders24h, 20)
  const buyYesData = generateChartData(selectedMarket.buyYesTrades24h, 5)
  const buyNoData = generateChartData(selectedMarket.buyNoTrades24h, 10)

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}k`
    }
    return `$${num.toLocaleString()}`
  }

  const renderMiniChart = (data: { hour: number; value: number }[], color: string) => {
    const max = Math.max(...data.map(d => d.value))
    const min = Math.min(...data.map(d => d.value))
    const range = max - min || 1
    
    return (
      <svg className="w-full h-12" viewBox="0 0 100 40">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={data.map((d, i) => 
            `${(i / 23) * 100},${40 - ((d.value - min) / range) * 35}`
          ).join(' ')}
        />
      </svg>
    )
  }

  return (
    <div className="space-y-6">
      {/* Market Selector */}
      <div className="bg-purple-50 p-4 rounded-lg">
        <label className="text-sm font-medium text-gray-700">
          Select Market (top 10000 markets available - Ordered by ✨ Featured):
        </label>
        <div className="relative mt-2">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full text-left bg-white px-4 py-3 rounded-md border border-gray-300 flex items-center justify-between hover:bg-gray-50"
          >
            <span className="text-gray-900">{selectedMarket.question}</span>
            <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
              {mockMarkets.map(market => (
                <button
                  key={market.id}
                  onClick={() => {
                    setSelectedMarket(market)
                    setIsDropdownOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                >
                  {market.question}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Market Header */}
      <div className="flex items-start space-x-4">
        {selectedMarket.imageUrl && (
          <img 
            src={selectedMarket.imageUrl} 
            alt={selectedMarket.question}
            className="w-20 h-20 rounded-lg object-cover"
          />
        )}
        <h2 className="text-3xl font-bold text-gray-900 flex-1">{selectedMarket.question}</h2>
      </div>

      {/* Volume Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-1">24h Volume</p>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(selectedMarket.volume24h)}</p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-1">Total Volume</p>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(selectedMarket.totalVolume)}</p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-1">Liquidity</p>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(selectedMarket.liquidity)}</p>
        </div>
      </div>

      {/* Trading Activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Unique Traders (24h, hourly)</p>
          <div className="flex items-end justify-between mb-2">
            <p className="text-4xl font-bold text-gray-900">{selectedMarket.uniqueTraders24h}</p>
            <div className={`flex items-center text-sm ${selectedMarket.uniqueTradersDelta < 0 ? 'text-red-600' : 'text-green-600'}`}>
              {selectedMarket.uniqueTradersDelta < 0 ? <TrendingDown className="w-4 h-4 mr-1" /> : <TrendingUp className="w-4 h-4 mr-1" />}
              {Math.abs(selectedMarket.uniqueTradersDelta)}
            </div>
          </div>
          {renderMiniChart(uniqueTradersData, '#ef4444')}
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Buy YES 🔵 Trades (24h, hourly)</p>
          <div className="flex items-end justify-between mb-2">
            <p className="text-4xl font-bold text-gray-900">{selectedMarket.buyYesTrades24h}</p>
            <div className={`flex items-center text-sm ${selectedMarket.buyYesTradesDelta > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {selectedMarket.buyYesTradesDelta > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              +{selectedMarket.buyYesTradesDelta}
            </div>
          </div>
          {renderMiniChart(buyYesData, '#10b981')}
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Buy NO 🟡 Trades (24h, hourly)</p>
          <div className="flex items-end justify-between mb-2">
            <p className="text-4xl font-bold text-gray-900">{selectedMarket.buyNoTrades24h}</p>
            <div className={`flex items-center text-sm ${selectedMarket.buyNoTradesDelta < 0 ? 'text-red-600' : 'text-green-600'}`}>
              {selectedMarket.buyNoTradesDelta < 0 ? <TrendingDown className="w-4 h-4 mr-1" /> : <TrendingUp className="w-4 h-4 mr-1" />}
              {selectedMarket.buyNoTradesDelta}
            </div>
          </div>
          {renderMiniChart(buyNoData, '#ef4444')}
        </div>
      </div>

      {/* Market Description */}
      <div className="bg-green-50 rounded-lg p-6 space-y-4">
        <p className="text-gray-800">{selectedMarket.description}</p>
        <p className="text-gray-800">{selectedMarket.resolutionDetails}</p>
        <p className="text-gray-800">The primary resolution source for this market will be a consensus of credible reporting.</p>
      </div>
    </div>
  )
}