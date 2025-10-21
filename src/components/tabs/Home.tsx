'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import AdvancedTable from '../AdvancedTable'

interface MarketData {
  market: string
  outcome: string
  lastPrice: number
  priceChange: number
  volume: number
  trades: number
  buyers: number
  sellers: number
  uniqueAddrs: number
  whaleBuys: number
  whaleSells: number
  whaleVolumeBuy: number
  whaleVolumeSell: number
  whalePressure: number
  buySellRatio: number
  whaleBuySellRatio: number
  volatility: number
  spread: number
  category: string
}

const mockMarketData: MarketData[] = [
  {
    market: 'Xi Jinping out in 2025?',
    outcome: 'No',
    lastPrice: 0.93,
    priceChange: -0.02,
    volume: 1705273.99,
    trades: 625,
    buyers: 359,
    sellers: 33,
    uniqueAddrs: 380,
    whaleBuys: 24,
    whaleSells: 1,
    whaleVolumeBuy: 1191496.3,
    whaleVolumeSell: 48043.51,
    whalePressure: 1143452.79,
    buySellRatio: 10.88,
    whaleBuySellRatio: 24.8,
    volatility: 0.0085,
    spread: 0.01,
    category: 'Politics'
  },
  {
    market: 'Will Zohran Mamdani win the 2025 NYC mayoral election?',
    outcome: 'Yes',
    lastPrice: 0.926,
    priceChange: 0.00,
    volume: 1230231.36,
    trades: 2649,
    buyers: 487,
    sellers: 332,
    uniqueAddrs: 555,
    whaleBuys: 4,
    whaleSells: 10,
    whaleVolumeBuy: 96290.84,
    whaleVolumeSell: 135745.97,
    whalePressure: -39455.13,
    buySellRatio: 1.47,
    whaleBuySellRatio: 0.71,
    volatility: 0.0009,
    spread: 0.001,
    category: 'Politics'
  },
  {
    market: 'OpenAI browser by October 31?',
    outcome: 'Yes',
    lastPrice: 0.91,
    priceChange: 0.32,
    volume: 1125308.55,
    trades: 2032,
    buyers: 189,
    sellers: 126,
    uniqueAddrs: 248,
    whaleBuys: 7,
    whaleSells: 6,
    whaleVolumeBuy: 243500.36,
    whaleVolumeSell: 127744.36,
    whalePressure: 115756,
    buySellRatio: 1.5,
    whaleBuySellRatio: 1.91,
    volatility: 0.0762,
    spread: 0.01,
    category: 'Other'
  },
  {
    market: 'Will the Miami Dolphins win Super Bowl 2026?',
    outcome: 'No',
    lastPrice: 0.995,
    priceChange: 0.00,
    volume: 922883.29,
    trades: 1884,
    buyers: 919,
    sellers: 915,
    uniqueAddrs: 952,
    whaleBuys: 0,
    whaleSells: 0,
    whaleVolumeBuy: 0,
    whaleVolumeSell: 0,
    whalePressure: 0,
    buySellRatio: 1,
    whaleBuySellRatio: 0,
    volatility: 0.0005,
    spread: 0.001,
    category: 'Sport'
  },
  {
    market: 'Will the price of Ethereum be greater than $4,500 on October 21?',
    outcome: 'No',
    lastPrice: 0.999,
    priceChange: 0.00,
    volume: 575710.96,
    trades: 138,
    buyers: 4,
    sellers: 2,
    uniqueAddrs: 4,
    whaleBuys: 0,
    whaleSells: 0,
    whaleVolumeBuy: 0,
    whaleVolumeSell: 0,
    whalePressure: 0,
    buySellRatio: 2,
    whaleBuySellRatio: 0,
    volatility: 0,
    spread: 0.005,
    category: 'Crypto'
  }
]

export default function Home() {
  const [timeWindow, setTimeWindow] = useState('6h')
  const [screener, setScreener] = useState('Choose options')
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false)
  const [isScreenerDropdownOpen, setIsScreenerDropdownOpen] = useState(false)


  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Select time window:</label>
          <div className="relative">
            <button
              onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
              className="bg-purple-100 px-4 py-2 rounded-md border border-gray-300 flex items-center justify-between min-w-[80px] hover:bg-purple-200"
            >
              <span>{timeWindow}</span>
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isTimeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isTimeDropdownOpen && (
              <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-md border border-gray-200 min-w-[80px]">
                {['1h', '6h', '24h', '7d'].map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setTimeWindow(option)
                      setIsTimeDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Filter screener on</label>
          <div className="relative">
            <button
              onClick={() => setIsScreenerDropdownOpen(!isScreenerDropdownOpen)}
              className="bg-white px-4 py-2 rounded-md border border-gray-300 flex items-center justify-between min-w-[200px] hover:bg-gray-50"
            >
              <span className="text-gray-500">{screener}</span>
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isScreenerDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isScreenerDropdownOpen && (
              <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-md border border-gray-200 min-w-[200px]">
                {['All Categories', 'Politics', 'Crypto', 'Sport', 'Other'].map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setScreener(option)
                      setIsScreenerDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info text */}
      <p className="text-sm text-gray-600">
        Only markets with over $5,000 in volume are currently displayed.
      </p>

      {/* Advanced Table */}
      <AdvancedTable data={mockMarketData} />
    </div>
  )
}