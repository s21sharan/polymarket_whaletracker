import { twitterV2 } from '@/lib/twitter'

interface TwitterSearchResult {
  id: string
  text: string
  created_at: string
  author_id: string
  author: {
    username: string
    name: string
  }
  url: string
}

export const TwitterService = {
  async searchTweets(query: string, maxResults = 10): Promise<TwitterSearchResult[]> {
    try {
      const tweets = await twitterV2.search(query, {
        max_results: maxResults,
        'tweet.fields': ['created_at', 'author_id'],
        'user.fields': ['username', 'name'],
        expansions: ['author_id']
      })

      if (!tweets.data.data) return []

      const users = tweets.includes?.users || []
      const userMap = new Map(users.map(user => [user.id, user]))

      return tweets.data.data.map(tweet => {
        const author = userMap.get(tweet.author_id!) || { username: 'unknown', name: 'Unknown' }
        return {
          id: tweet.id,
          text: tweet.text,
          created_at: tweet.created_at!,
          author_id: tweet.author_id!,
          author: {
            username: author.username,
            name: author.name
          },
          url: `https://twitter.com/${author.username}/status/${tweet.id}`
        }
      })
    } catch (error) {
      console.error('Error searching tweets:', error)
      return []
    }
  },

  async getMarketSentiment(marketQuestion: string, limit = 20) {
    try {
      // Extract key terms from the market question for better search
      const searchTerms = this.extractSearchTerms(marketQuestion)
      const searchQuery = `${searchTerms} -is:retweet lang:en`
      
      const tweets = await this.searchTweets(searchQuery, limit)
      
      // Analyze sentiment (basic implementation)
      const sentiment = this.analyzeSentiment(tweets)
      
      return {
        tweets,
        sentiment,
        searchQuery
      }
    } catch (error) {
      console.error('Error getting market sentiment:', error)
      return {
        tweets: [],
        sentiment: { positive: 0, negative: 0, neutral: 0 },
        searchQuery: ''
      }
    }
  },

  extractSearchTerms(marketQuestion: string): string {
    // Remove common words and extract key terms
    const stopWords = ['will', 'does', 'is', 'the', 'a', 'by', 'in', 'at', 'to', 'for', 'of', 'reach']
    const words = marketQuestion.toLowerCase().split(' ')
    const keywords = words.filter(word => 
      !stopWords.includes(word) && word.length > 2
    )
    
    // Take the most relevant 3-4 keywords
    return keywords.slice(0, 4).join(' ')
  },

  analyzeSentiment(tweets: TwitterSearchResult[]) {
    // Basic sentiment analysis based on keywords
    const positiveWords = ['good', 'great', 'excellent', 'positive', 'bullish', 'up', 'high', 'win', 'success', 'agree', 'yes']
    const negativeWords = ['bad', 'terrible', 'negative', 'bearish', 'down', 'low', 'lose', 'fail', 'disagree', 'no']
    
    let positive = 0
    let negative = 0
    let neutral = 0
    
    tweets.forEach(tweet => {
      const text = tweet.text.toLowerCase()
      const hasPositive = positiveWords.some(word => text.includes(word))
      const hasNegative = negativeWords.some(word => text.includes(word))
      
      if (hasPositive && !hasNegative) positive++
      else if (hasNegative && !hasPositive) negative++
      else neutral++
    })
    
    return { positive, negative, neutral }
  },

  async getUserTweets(username: string, maxResults = 10) {
    try {
      // First get user by username
      const user = await twitterV2.userByUsername(username)
      if (!user.data) return []
      
      // Then get their tweets
      const tweets = await twitterV2.userTimeline(user.data.id, {
        max_results: maxResults,
        'tweet.fields': ['created_at'],
        exclude: ['retweets', 'replies']
      })
      
      if (!tweets.data.data) return []
      
      return tweets.data.data.map(tweet => ({
        id: tweet.id,
        text: tweet.text,
        created_at: tweet.created_at!,
        url: `https://twitter.com/${username}/status/${tweet.id}`
      }))
    } catch (error) {
      console.error('Error getting user tweets:', error)
      return []
    }
  }
}