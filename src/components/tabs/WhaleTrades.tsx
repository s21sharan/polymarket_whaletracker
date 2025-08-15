'use client'

import { WhaleTradeType } from '@/types'
import WhaleTradesComponent from '@/components/WhaleTrades'

const mockWhaleTrades: WhaleTradeType[] = [
  {
    id: '1',
    profile: {
      address: '0x1234...5678',
      username: 'BigWhale42',
      avatar: '/api/placeholder/40/40'
    },
    value: 125000,
    market: {
      id: 'm1',
      question: 'Will Bitcoin reach $100k by end of 2024?',
      category: 'Crypto'
    },
    position: 'yes',
    timestamp: '2024-01-15T10:30:00Z',
    news: [
      {
        id: 'n1',
        title: 'Bitcoin ETF Approval Sparks Rally',
        source: 'CoinDesk',
        url: '#',
        publishedAt: '2024-01-14T08:00:00Z',
        snippet: 'Bitcoin surges following SEC approval of spot ETFs...'
      }
    ]
  },
  {
    id: '2',
    profile: {
      address: '0xabcd...efgh',
      username: 'CryptoKing',
      avatar: '/api/placeholder/40/40'
    },
    value: 87500,
    market: {
      id: 'm2',
      question: 'Will Trump win the 2024 Republican nomination?',
      category: 'Politics'
    },
    position: 'yes',
    timestamp: '2024-01-14T15:45:00Z',
    news: [
      {
        id: 'n2',
        title: 'Trump Leads in Iowa Polls',
        source: 'Reuters',
        url: '#',
        publishedAt: '2024-01-13T12:00:00Z',
        snippet: 'Latest polls show Trump with commanding lead...'
      }
    ]
  },
  {
    id: '3',
    profile: {
      address: '0x9876...5432',
      username: 'MarketMaker',
      avatar: '/api/placeholder/40/40'
    },
    value: 50000,
    market: {
      id: 'm3',
      question: 'Will Tesla deliver over 2M vehicles in 2024?',
      category: 'Business'
    },
    position: 'no',
    timestamp: '2024-01-13T09:20:00Z',
    news: [
      {
        id: 'n3',
        title: 'Tesla Faces Production Challenges',
        source: 'Bloomberg',
        url: '#',
        publishedAt: '2024-01-12T16:30:00Z',
        snippet: 'Supply chain issues may impact Tesla deliveries...'
      }
    ]
  }
]

export default function WhaleTrades() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Recent Whale Trades</h3>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option>All Markets</option>
            <option>Crypto</option>
            <option>Politics</option>
            <option>Business</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option>Last 24h</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
      </div>

      <WhaleTradesComponent trades={mockWhaleTrades} />
    </div>
  )
}