import { WhaleTradeType } from '@/types'
import WhaleTradeCard from './WhaleTradeCard'

interface WhaleTradesProps {
  trades: WhaleTradeType[]
}

export default function WhaleTrades({ trades }: WhaleTradesProps) {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      {trades.map(trade => (
        <WhaleTradeCard key={trade.id} trade={trade} />
      ))}
    </div>
  )
}