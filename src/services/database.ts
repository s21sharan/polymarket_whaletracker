import { supabase } from '@/lib/supabase'
import { WhaleTradeType, WalletStats, PortfolioDataPoint } from '@/types'

export const DatabaseService = {
  async getWhaleTrades(limit = 10) {
    const { data, error } = await supabase
      .from('whale_trades')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching whale trades:', error)
      return []
    }
    
    return data as WhaleTradeType[]
  },

  async getWalletStats(walletAddress?: string) {
    const { data, error } = await supabase
      .from('wallet_stats')
      .select('*')
      .eq(walletAddress ? 'wallet_address' : 'is_aggregate', walletAddress || true)
      .single()
    
    if (error) {
      console.error('Error fetching wallet stats:', error)
      return null
    }
    
    return data as WalletStats
  },

  async getPortfolioHistory(walletAddress?: string, days = 30) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const { data, error } = await supabase
      .from('portfolio_history')
      .select('*')
      .gte('date', startDate.toISOString())
      .order('date', { ascending: true })
    
    if (error) {
      console.error('Error fetching portfolio history:', error)
      return []
    }
    
    return data as PortfolioDataPoint[]
  },

  async subscribeToWhaleTrades(callback: (trade: WhaleTradeType) => void) {
    const subscription = supabase
      .channel('whale_trades_channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'whale_trades' },
        (payload) => {
          callback(payload.new as WhaleTradeType)
        }
      )
      .subscribe()
    
    return subscription
  }
}