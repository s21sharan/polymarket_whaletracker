import { TwitterApi } from 'twitter-api-v2'

// Initialize Twitter client with bearer token for app-only auth
const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!)

// Export read-only client
export const twitterV2 = twitterClient.readOnly.v2