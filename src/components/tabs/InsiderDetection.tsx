'use client'

interface SuspiciousTrade {
  id: string
  user: string
  market: string
  timing: string
  profitPercent: number
  suspicionScore: number
  reason: string
}

const mockSuspiciousTrades: SuspiciousTrade[] = [
  {
    id: '1',
    user: 'Anonymous_0x4f2a',
    market: 'Will Company X announce merger?',
    timing: '2 hours before news',
    profitPercent: 312,
    suspicionScore: 95,
    reason: 'Large position opened shortly before major news announcement'
  },
  {
    id: '2',
    user: 'QuickTrader99',
    market: 'Will regulatory approval pass?',
    timing: '1 day before announcement',
    profitPercent: 189,
    suspicionScore: 87,
    reason: 'Pattern of profitable trades before regulatory decisions'
  },
  {
    id: '3',
    user: 'MarketPro_2024',
    market: 'Will CEO resign this month?',
    timing: '3 hours before news',
    profitPercent: 425,
    suspicionScore: 92,
    reason: 'Unusually large bet with perfect timing'
  }
]

export default function InsiderDetection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Insider Detection System</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            ⚠️ This system flags potentially suspicious trading patterns. High scores indicate trades that may warrant further investigation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Flagged Trades</h4>
          <p className="text-3xl font-bold text-red-600">3</p>
          <p className="text-sm text-gray-500">Last 7 days</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Average Score</h4>
          <p className="text-3xl font-bold text-orange-600">91.3</p>
          <p className="text-sm text-gray-500">Suspicion level</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Total Profit</h4>
          <p className="text-3xl font-bold text-gray-900">$847K</p>
          <p className="text-sm text-gray-500">From flagged trades</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Market
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockSuspiciousTrades.map((trade) => (
              <tr key={trade.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {trade.user}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {trade.market}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {trade.timing}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  +{trade.profitPercent}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${
                      trade.suspicionScore >= 90 ? 'text-red-600' : 
                      trade.suspicionScore >= 80 ? 'text-orange-600' : 
                      'text-yellow-600'
                    }`}>
                      {trade.suspicionScore}
                    </span>
                    <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          trade.suspicionScore >= 90 ? 'bg-red-600' : 
                          trade.suspicionScore >= 80 ? 'bg-orange-600' : 
                          'bg-yellow-600'
                        }`}
                        style={{ width: `${trade.suspicionScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {trade.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}