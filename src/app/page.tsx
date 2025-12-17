'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search,
  Wallet,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Copy,
  Check,
  X,
  AlertCircle,
  Play,
  Pause,
  Settings,
  RefreshCw,
  ExternalLink,
  Zap
} from 'lucide-react'
import { CopyTrade, TargetWallet } from '@/types'

// Mock data for demonstration
const generateMockTrade = (id: number): CopyTrade => {
  const markets = [
    'Will Bitcoin reach $100k by end of 2025?',
    'Will Trump win the 2028 election?',
    'Will ETH flip BTC market cap?',
    'Will Fed cut rates in Q1 2025?',
    'Will there be a US recession in 2025?',
  ]
  const sides: ('BUY' | 'SELL')[] = ['BUY', 'SELL']
  const outcomes: ('YES' | 'NO')[] = ['YES', 'NO']
  const statuses: CopyTrade['status'][] = ['pending', 'copied', 'skipped', 'failed']

  return {
    id: `trade-${id}`,
    timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    market: {
      id: `market-${id}`,
      question: markets[Math.floor(Math.random() * markets.length)],
    },
    side: sides[Math.floor(Math.random() * sides.length)],
    outcome: outcomes[Math.floor(Math.random() * outcomes.length)],
    amount: Math.floor(Math.random() * 10000) + 100,
    price: Math.random() * 0.9 + 0.05,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    txHash: Math.random() > 0.5 ? `0x${Math.random().toString(16).slice(2, 18)}` : undefined,
  }
}

const mockWalletData: TargetWallet = {
  address: '0x1234...5678',
  pnl: 125420.50,
  winRate: 68.5,
  totalTrades: 342,
  activePositions: 12,
  lastActive: new Date(Date.now() - 300000).toISOString(),
}

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState('')
  const [isTracking, setIsTracking] = useState(false)
  const [isCopyingEnabled, setIsCopyingEnabled] = useState(false)
  const [targetWallet, setTargetWallet] = useState<TargetWallet | null>(null)
  const [trades, setTrades] = useState<CopyTrade[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [copyAmount, setCopyAmount] = useState('100')
  const [copyPercentage, setCopyPercentage] = useState('10')
  const [copyMode, setCopyMode] = useState<'fixed' | 'percentage'>('fixed')
  const [showSettings, setShowSettings] = useState(false)
  const [autoApprove, setAutoApprove] = useState(false)
  const [minTradeSize, setMinTradeSize] = useState('50')

  const handleSearch = useCallback(() => {
    if (!walletAddress.trim()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setTargetWallet({
        ...mockWalletData,
        address: walletAddress.length > 10
          ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
          : walletAddress
      })
      setTrades(Array.from({ length: 10 }, (_, i) => generateMockTrade(i)))
      setIsTracking(true)
      setIsLoading(false)
    }, 1000)
  }, [walletAddress])

  // Simulate real-time trade updates
  useEffect(() => {
    if (!isTracking) return

    const interval = setInterval(() => {
      const newTrade = generateMockTrade(Date.now())
      newTrade.status = 'pending'
      newTrade.timestamp = new Date().toISOString()

      setTrades(prev => [newTrade, ...prev].slice(0, 50))
    }, 8000) // New trade every 8 seconds

    return () => clearInterval(interval)
  }, [isTracking])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return date.toLocaleDateString()
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getStatusColor = (status: CopyTrade['status']) => {
    switch (status) {
      case 'copied': return 'text-green-600 bg-green-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'skipped': return 'text-gray-600 bg-gray-100'
      case 'failed': return 'text-red-600 bg-red-50'
    }
  }

  const getStatusIcon = (status: CopyTrade['status']) => {
    switch (status) {
      case 'copied': return <Check className="w-3 h-3" />
      case 'pending': return <Clock className="w-3 h-3" />
      case 'skipped': return <X className="w-3 h-3" />
      case 'failed': return <AlertCircle className="w-3 h-3" />
    }
  }

  const handleCopyTrade = (tradeId: string) => {
    setTrades(prev => prev.map(t =>
      t.id === tradeId ? { ...t, status: 'copied' as const } : t
    ))
  }

  const handleSkipTrade = (tradeId: string) => {
    setTrades(prev => prev.map(t =>
      t.id === tradeId ? { ...t, status: 'skipped' as const } : t
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Copy className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Copy Trading</h1>
          </div>
          <p className="text-gray-600">Track and copy trades from any wallet in real-time</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter target wallet address (e.g., 0x...)"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading || !walletAddress.trim()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              {isLoading ? 'Loading...' : 'Track Wallet'}
            </button>
          </div>
        </div>

        {targetWallet && (
          <>
            {/* Wallet Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <Wallet className="w-4 h-4" />
                  Address
                </div>
                <div className="font-mono text-gray-900 font-semibold">{targetWallet.address}</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  {targetWallet.pnl >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  Total PnL
                </div>
                <div className={`font-semibold ${targetWallet.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {targetWallet.pnl >= 0 ? '+' : ''}{formatCurrency(targetWallet.pnl)}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <Activity className="w-4 h-4" />
                  Win Rate
                </div>
                <div className="font-semibold text-gray-900">{targetWallet.winRate}%</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <Zap className="w-4 h-4" />
                  Total Trades
                </div>
                <div className="font-semibold text-gray-900">{targetWallet.totalTrades}</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <Clock className="w-4 h-4" />
                  Last Active
                </div>
                <div className="font-semibold text-gray-900">{formatTime(targetWallet.lastActive)}</div>
              </div>
            </div>

            {/* Copy Trading Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsCopyingEnabled(!isCopyingEnabled)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                      isCopyingEnabled
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {isCopyingEnabled ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Stop Copying
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Start Copying
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                      showSettings ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Status:</span>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                    isCopyingEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${isCopyingEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                    {isCopyingEnabled ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>

              {/* Settings Panel */}
              {showSettings && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Copy Mode</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCopyMode('fixed')}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            copyMode === 'fixed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          Fixed Amount
                        </button>
                        <button
                          onClick={() => setCopyMode('percentage')}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            copyMode === 'percentage' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          Percentage
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {copyMode === 'fixed' ? 'Copy Amount ($)' : 'Copy Percentage (%)'}
                      </label>
                      <input
                        type="number"
                        value={copyMode === 'fixed' ? copyAmount : copyPercentage}
                        onChange={(e) => copyMode === 'fixed' ? setCopyAmount(e.target.value) : setCopyPercentage(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Min Trade Size ($)</label>
                      <input
                        type="number"
                        value={minTradeSize}
                        onChange={(e) => setMinTradeSize(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => setAutoApprove(!autoApprove)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        autoApprove ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        autoApprove ? 'left-7' : 'left-1'
                      }`} />
                    </button>
                    <span className="text-sm text-gray-700">Auto-approve trades (no manual confirmation)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Live Trade Feed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-gray-900">Live Trade Feed</h2>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Live
                  </div>
                </div>
                <span className="text-sm text-gray-500">{trades.length} trades</span>
              </div>

              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {trades.map((trade) => (
                  <div key={trade.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            trade.side === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {trade.side}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            trade.outcome === 'YES' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {trade.outcome}
                          </span>
                          <span className="text-xs text-gray-400">{formatTime(trade.timestamp)}</span>
                        </div>
                        <p className="text-gray-900 font-medium truncate">{trade.market.question}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-gray-600">
                            Amount: <span className="font-semibold text-gray-900">{formatCurrency(trade.amount)}</span>
                          </span>
                          <span className="text-gray-600">
                            Price: <span className="font-semibold text-gray-900">{(trade.price * 100).toFixed(1)}¢</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(trade.status)}`}>
                          {getStatusIcon(trade.status)}
                          {trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}
                        </span>

                        {trade.status === 'pending' && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleCopyTrade(trade.id)}
                              className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                              title="Copy this trade"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleSkipTrade(trade.id)}
                              className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                              title="Skip this trade"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {trade.txHash && (
                          <a
                            href={`https://polygonscan.com/tx/${trade.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                            title="View transaction"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {trades.length === 0 && (
                  <div className="px-6 py-12 text-center text-gray-500">
                    <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No trades yet. Waiting for activity...</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {!targetWallet && !isLoading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Wallet className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter a Wallet Address</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Paste a Polymarket wallet address above to start tracking trades and enable copy trading functionality.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
