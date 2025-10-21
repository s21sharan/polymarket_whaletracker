'use client'

import { useState } from 'react'

export type TabKey = 'analyze-market' | 'analyze-user' | 'whale-positions' | 'whale-trades' | 'insider-detection'

interface Tab {
  key: TabKey
  label: string
  category: string
}

interface TabNavigationProps {
  activeTab: TabKey
  onTabChange: (tab: TabKey) => void
}

const tabs: Tab[] = [
  { key: 'analyze-market', label: 'Analyze Market', category: 'Analysis' },
  { key: 'analyze-user', label: 'Analyze User', category: 'Analysis' },
  { key: 'whale-positions', label: 'Whale Positions', category: 'Whales' },
  { key: 'whale-trades', label: 'Whale Trades', category: 'Whales' },
  { key: 'insider-detection', label: 'Insider Detection', category: 'Insiders' }
]

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const categories = [...new Set(tabs.map(tab => tab.category))]

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8" aria-label="Tabs">
        {categories.map(category => (
          <div key={category} className="relative">
            <div className="text-sm font-semibold text-gray-500 mb-2">{category}</div>
            <div className="flex space-x-4">
              {tabs
                .filter(tab => tab.category === category)
                .map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key)}
                    className={`
                      pb-4 px-1 border-b-2 font-medium text-sm transition-colors
                      ${activeTab === tab.key
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}