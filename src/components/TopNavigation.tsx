'use client'

import { useState } from 'react'
import { ChevronDown, Home } from 'lucide-react'

export type TabKey = 'home' | 'analyze-market' | 'analyze-user' | 'whale-positions' | 'whale-trades' | 'insider-detection' | 'portfolio'

interface TopNavigationProps {
  activeTab: TabKey
  onTabChange: (tab: TabKey) => void
}

interface NavItem {
  label: string
  children?: { key: TabKey; label: string }[]
}

const navItems: NavItem[] = [
  {
    label: 'Analysis',
    children: [
      { key: 'analyze-market', label: 'Analyze Market' },
      { key: 'analyze-user', label: 'Analyze User' }
    ]
  },
  {
    label: 'Whales',
    children: [
      { key: 'whale-positions', label: 'Whale Positions' },
      { key: 'whale-trades', label: 'Whale Trades' }
    ]
  },
  {
    label: 'Insiders',
    children: [
      { key: 'insider-detection', label: 'Insider Detection' }
    ]
  },
  {
    label: 'Simulations',
    children: [
      { key: 'portfolio', label: 'Portfolio' }
    ]
  }
]

export default function TopNavigation({ activeTab, onTabChange }: TopNavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  const handleTabSelect = (tab: TabKey) => {
    onTabChange(tab)
    setOpenDropdown(null)
  }

  const getActiveParent = () => {
    for (const item of navItems) {
      if (item.children?.some(child => child.key === activeTab)) {
        return item.label
      }
    }
    return null
  }

  const activeParent = getActiveParent()

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center space-x-1">
          <div className="w-6 h-6 bg-orange-500 rounded mr-4" />
          
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              <button
                onClick={() => item.children && handleDropdownToggle(item.label)}
                className={`
                  flex items-center px-4 py-4 text-sm font-medium transition-colors
                  ${activeParent === item.label
                    ? 'text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {item.label}
                {item.children && (
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                    openDropdown === item.label ? 'rotate-180' : ''
                  }`} />
                )}
              </button>

              {item.children && openDropdown === item.label && (
                <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {item.children.map((child) => (
                    <button
                      key={child.key}
                      onClick={() => handleTabSelect(child.key)}
                      className={`
                        block w-full text-left px-4 py-2 text-sm
                        ${activeTab === child.key
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex-1" />
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onTabChange('home')}
              className={`
                flex items-center px-4 py-4 text-sm font-medium transition-colors
                ${activeTab === 'home'
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </button>
            <button className="flex items-center px-4 py-4 text-sm font-medium text-gray-600 hover:text-gray-900">
              Account
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}