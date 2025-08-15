export interface WhaleTradeType {
  id: string
  profile: {
    address: string
    username?: string
    avatar?: string
  }
  value: number
  market: {
    id: string
    question: string
    category: string
  }
  position: 'yes' | 'no'
  timestamp: string
  news?: NewsItem[]
}

export interface NewsItem {
  id: string
  title: string
  source: string
  url: string
  publishedAt: string
  snippet?: string
}

export interface WalletStats {
  totalValue: number
  totalTrades: number
  winRate: number
  profitLoss: number
}

export interface PortfolioDataPoint {
  date: string
  value: number
  trades: number
}