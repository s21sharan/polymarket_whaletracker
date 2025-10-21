-- Whale Trades Table
CREATE TABLE whale_trades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_address TEXT NOT NULL,
  profile_username TEXT,
  profile_avatar TEXT,
  value NUMERIC NOT NULL,
  market_id TEXT NOT NULL,
  market_question TEXT NOT NULL,
  market_category TEXT NOT NULL,
  position TEXT CHECK (position IN ('yes', 'no')) NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- News Items Table
CREATE TABLE news_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trade_id UUID REFERENCES whale_trades(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  url TEXT NOT NULL,
  published_at TIMESTAMPTZ NOT NULL,
  snippet TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wallet Stats Table
CREATE TABLE wallet_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT UNIQUE,
  is_aggregate BOOLEAN DEFAULT FALSE,
  total_value NUMERIC NOT NULL,
  total_trades INTEGER NOT NULL,
  win_rate NUMERIC NOT NULL,
  profit_loss NUMERIC NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio History Table
CREATE TABLE portfolio_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT,
  date DATE NOT NULL,
  value NUMERIC NOT NULL,
  trades INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_whale_trades_timestamp ON whale_trades(timestamp DESC);
CREATE INDEX idx_whale_trades_value ON whale_trades(value DESC);
CREATE INDEX idx_portfolio_history_date ON portfolio_history(date);
CREATE INDEX idx_news_items_trade_id ON news_items(trade_id);

-- Enable Row Level Security
ALTER TABLE whale_trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_history ENABLE ROW LEVEL SECURITY;

-- Create policies for read access (anon users can read)
CREATE POLICY "Enable read access for all users" ON whale_trades
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON news_items
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON wallet_stats
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON portfolio_history
  FOR SELECT USING (true);