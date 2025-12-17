'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Copy } from 'lucide-react'
import Image from 'next/image'

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo and Copy Trading on the left */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="rounded-md"
              />
            </Link>

            <Link
              href="/"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Copy className="w-4 h-4" />
              Copy Trade
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
