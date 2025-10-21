'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, Home } from 'lucide-react'
import Image from 'next/image'

export default function Navigation() {
  const [showAnalysisDropdown, setShowAnalysisDropdown] = useState(false)
  const [showWhalesDropdown, setShowWhalesDropdown] = useState(false)
  const [showSimulationsDropdown, setShowSimulationsDropdown] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={32} 
                height={32}
                className="rounded-md"
              />
            </Link>
            {/* Analysis dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowAnalysisDropdown(true)}
              onMouseLeave={() => setShowAnalysisDropdown(false)}
            >
              <button className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/analysis') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <span>Analysis</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showAnalysisDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <Link 
                    href="/analysis" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Analyze Market
                  </Link>
                </div>
              )}
            </div>

            {/* Whales dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowWhalesDropdown(true)}
              onMouseLeave={() => setShowWhalesDropdown(false)}
            >
              <button className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/whales') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <span>Whales</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showWhalesDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <Link 
                    href="/whales" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Whale Positions
                  </Link>
                  <Link 
                    href="/whales" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Whale Trades
                  </Link>
                </div>
              )}
            </div>

            {/* Insiders */}
            <Link 
              href="/insiders" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/insiders') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Insiders
            </Link>

            {/* Simulations dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowSimulationsDropdown(true)}
              onMouseLeave={() => setShowSimulationsDropdown(false)}
            >
              <button className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/simulations') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <span>Simulations</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showSimulationsDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <Link 
                    href="/simulations" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Portfolio
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Home button */}
          <Link 
            href="/" 
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <span>Home</span>
            <Home className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  )
}