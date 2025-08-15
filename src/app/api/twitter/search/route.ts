import { NextResponse } from 'next/server'
import { TwitterService } from '@/services/twitter'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }
    
    const tweets = await TwitterService.searchTweets(query, limit)
    
    return NextResponse.json({ tweets })
  } catch (error) {
    console.error('Twitter search API error:', error)
    return NextResponse.json(
      { error: 'Failed to search tweets' },
      { status: 500 }
    )
  }
}