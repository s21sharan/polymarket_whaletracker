'use client'

interface Position {
  id: string
  user: string
  market: string
  position: 'yes' | 'no'
  size: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
}

const mockPositions: Position[] = [
  {
    id: '1',
    user: 'BigWhale42',
    market: 'Will Bitcoin reach $100k by end of 2024?',
    position: 'yes',
    size: 125000,
    entryPrice: 0.62,
    currentPrice: 0.71,
    pnl: 14516,
    pnlPercent: 14.5
  },
  {
    id: '2',
    user: 'CryptoKing',
    market: 'Will Trump win the 2024 Republican nomination?',
    position: 'yes',
    size: 87500,
    entryPrice: 0.78,
    currentPrice: 0.82,
    pnl: 4487,
    pnlPercent: 5.1
  },
  {
    id: '3',
    user: 'MarketMaker',
    market: 'Will Tesla deliver over 2M vehicles in 2024?',
    position: 'no',
    size: 50000,
    entryPrice: 0.45,
    currentPrice: 0.38,
    pnl: 7778,
    pnlPercent: 15.6
  }
]

export default function WhalePositions() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Active Whale Positions</h3>
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
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P&L
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockPositions.map((position) => (
                <tr key={position.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {position.user}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {position.market}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      position.position === 'yes' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {position.position.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${position.size.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${position.entryPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${position.currentPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className={position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                      ${position.pnl.toLocaleString()} ({position.pnlPercent > 0 ? '+' : ''}{position.pnlPercent}%)
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}