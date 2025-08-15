'use client'

import { useState } from 'react'
import TopNavigation, { TabKey } from './TopNavigation'
import Home from './tabs/Home'
import AnalyzeMarket from './tabs/AnalyzeMarket'
import AnalyzeUser from './tabs/AnalyzeUser'
import WhalePositions from './tabs/WhalePositions'
import WhaleTrades from './tabs/WhaleTrades'
import InsiderDetection from './tabs/InsiderDetection'
import Portfolio from './tabs/Portfolio'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>('home')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />
      case 'analyze-market':
        return <AnalyzeMarket />
      case 'analyze-user':
        return <AnalyzeUser />
      case 'whale-positions':
        return <WhalePositions />
      case 'whale-trades':
        return <WhaleTrades />
      case 'insider-detection':
        return <InsiderDetection />
      case 'portfolio':
        return <Portfolio />
      default:
        return <Home />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-8">
        {renderTabContent()}
      </div>
    </div>
  )
}