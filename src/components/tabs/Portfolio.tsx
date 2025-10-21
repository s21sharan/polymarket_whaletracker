'use client'

import { useState } from 'react'
import WalletOverview from '../WalletOverview'
import PortfolioChart from '../PortfolioChart'
import { WalletStats, PortfolioDataPoint } from '@/types'

const mockWalletStats: WalletStats = {
  totalValue: 262500,
  totalTrades: 3,
  winRate: 66.7,
  profitLoss: 15750
}

const mockPortfolioData: PortfolioDataPoint[] = [
  { date: '2024-01-08', value: 200000, trades: 0 },
  { date: '2024-01-09', value: 205000, trades: 0 },
  { date: '2024-01-10', value: 210000, trades: 0 },
  { date: '2024-01-11', value: 208000, trades: 0 },
  { date: '2024-01-12', value: 215000, trades: 0 },
  { date: '2024-01-13', value: 265000, trades: 1 },
  { date: '2024-01-14', value: 352500, trades: 1 },
  { date: '2024-01-15', value: 477500, trades: 1 },
  { date: '2024-01-16', value: 262500, trades: 0 }
]

export default function Portfolio() {
  const [walletStats] = useState<WalletStats>(mockWalletStats)
  const [portfolioData] = useState<PortfolioDataPoint[]>(mockPortfolioData)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-gray-900">Simulated Portfolio</h3>
        <WalletOverview stats={walletStats} />
      </div>
      
      <div>
        <PortfolioChart data={portfolioData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Recent Performance</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">7 Days</span>
              <span className="text-green-600 font-medium">+12.3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">30 Days</span>
              <span className="text-green-600 font-medium">+28.7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">All Time</span>
              <span className="text-green-600 font-medium">+31.25%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Portfolio Allocation</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Politics</span>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Crypto</span>
              <span className="font-medium">35%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Business</span>
              <span className="font-medium">20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}