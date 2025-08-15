import { NextResponse } from 'next/server'
import { TwitterService } from '@/services/twitter'

export async function POST(request: Request) {
  try {
    const { marketQuestion } = await request.json()
    
    if (!marketQuestion) {
      return NextResponse.json(
        { error: 'Market question is required' },
        { status: 400 }
      )
    }
    
    const sentimentData = await TwitterService.getMarketSentiment(marketQuestion)
    
    return NextResponse.json(sentimentData)
  } catch (error) {
    console.error('Twitter sentiment API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sentiment data' },
      { status: 500 }
    )
  }
}