import { WalletStats } from '@/types'

interface WalletOverviewProps {
  stats: WalletStats
}

export default function WalletOverview({ stats }: WalletOverviewProps) {
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Total Portfolio Value</h3>
        <p className="text-3xl font-bold text-gray-900">{formatValue(stats.totalValue)}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Total Trades</h3>
        <p className="text-3xl font-bold text-gray-900">{stats.totalTrades}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Win Rate</h3>
        <p className="text-3xl font-bold text-green-600">{formatPercentage(stats.winRate)}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Profit/Loss</h3>
        <p className={`text-3xl font-bold ${stats.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatValue(stats.profitLoss)}
        </p>
      </div>
    </div>
  )
}