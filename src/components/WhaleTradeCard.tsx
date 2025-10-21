import { WhaleTradeType } from '@/types'
import TwitterSentiment from './TwitterSentiment'

interface WhaleTradeCardProps {
  trade: WhaleTradeType
}

export default function WhaleTradeCard({ trade }: WhaleTradeCardProps) {
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {trade.profile.username?.charAt(0) || '?'}
          </div>
          <div className="ml-3">
            <p className="font-semibold text-gray-900">
              {trade.profile.username || trade.profile.address}
            </p>
            <p className="text-sm text-gray-500">{formatDate(trade.timestamp)}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          trade.position === 'yes' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {trade.position.toUpperCase()}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-900">{formatValue(trade.value)}</p>
        <p className="text-gray-600 mt-2">{trade.market.question}</p>
        <p className="text-sm text-gray-500 mt-1">
          <span className="inline-block px-2 py-1 bg-gray-100 rounded">
            {trade.market.category}
          </span>
        </p>
      </div>

      <TwitterSentiment marketQuestion={trade.market.question} />

      {trade.news && trade.news.length > 0 && (
        <div className="border-t pt-4 mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Related News</h4>
          {trade.news.map(newsItem => (
            <div key={newsItem.id} className="mb-2 last:mb-0">
              <a 
                href={newsItem.url} 
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {newsItem.title}
              </a>
              <p className="text-xs text-gray-500">
                {newsItem.source} • {new Date(newsItem.publishedAt).toLocaleDateString()}
              </p>
              {newsItem.snippet && (
                <p className="text-xs text-gray-600 mt-1">{newsItem.snippet}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}