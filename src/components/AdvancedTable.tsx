'use client'

import React, { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
} from '@tanstack/react-table'
import { Eye, Download, Search, Maximize2, ChevronDown, ChevronUp } from 'lucide-react'
import screenfull from 'screenfull'

interface MarketData {
  market: string
  outcome: string
  lastPrice: number
  priceChange: number
  volume: number
  trades: number
  buyers: number
  sellers: number
  uniqueAddrs: number
  whaleBuys: number
  whaleSells: number
  whaleVolumeBuy: number
  whaleVolumeSell: number
  whalePressure: number
  buySellRatio: number
  whaleBuySellRatio: number
  volatility: number
  spread: number
  category: string
}

interface AdvancedTableProps {
  data: MarketData[]
}

const columnHelper = createColumnHelper<MarketData>()

export default function AdvancedTable({ data }: AdvancedTableProps) {
  const [globalFilter, setGlobalFilter] = useState('')
  const [showColumnPanel, setShowColumnPanel] = useState(false)
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [columnVisibility, setColumnVisibility] = useState({})

  // Utility functions
  const formatPrice = (price: number) => `$${price.toFixed(2)}`
  
  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(0)}k`
    }
    return `$${volume.toFixed(0)}`
  }

  const formatPriceChange = (change: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}$${change.toFixed(2)}`
  }

  // Heatmap color generator for numeric columns
  const getHeatmapColor = (value: number, min: number, max: number, isNegative = false) => {
    if (max === min) return 'bg-gray-50'
    
    const normalized = (value - min) / (max - min)
    
    if (isNegative && value < 0) {
      const intensity = Math.abs(normalized)
      return `rgba(239, 68, 68, ${intensity * 0.3})` // Red for negative
    } else {
      const intensity = normalized
      return `rgba(34, 197, 94, ${intensity * 0.3})` // Green for positive
    }
  }

  // Calculate min/max for heatmap
  const volumeRange = useMemo(() => {
    const volumes = data.map(d => d.volume)
    return { min: Math.min(...volumes), max: Math.max(...volumes) }
  }, [data])

  const tradesRange = useMemo(() => {
    const trades = data.map(d => d.trades)
    return { min: Math.min(...trades), max: Math.max(...trades) }
  }, [data])

  const whalePressureRange = useMemo(() => {
    const pressures = data.map(d => d.whalePressure)
    return { min: Math.min(...pressures), max: Math.max(...pressures) }
  }, [data])

  const columns = useMemo<ColumnDef<MarketData>[]>(() => [
    columnHelper.accessor('market', {
      header: 'Market',
      cell: info => (
        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline text-sm">
          {info.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor('outcome', {
      header: 'Outcome',
      cell: info => <span className="text-sm font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('lastPrice', {
      header: 'Last Price',
      cell: info => (
        <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
          {formatPrice(info.getValue())}
        </span>
      ),
    }),
    columnHelper.accessor('priceChange', {
      header: 'Price Δ',
      cell: info => {
        const value = info.getValue()
        const colorClass = value >= 0 ? 'text-green-600' : 'text-red-600'
        return (
          <span className={`text-sm font-medium ${colorClass}`}>
            {formatPriceChange(value)}
          </span>
        )
      },
    }),
    columnHelper.accessor('volume', {
      header: 'Volume ($)',
      cell: info => {
        const value = info.getValue()
        const bgColor = getHeatmapColor(value, volumeRange.min, volumeRange.max)
        return (
          <div 
            className="px-2 py-1 rounded text-sm font-medium text-white bg-green-500"
            style={{ backgroundColor: bgColor }}
          >
            {formatVolume(value)}
          </div>
        )
      },
    }),
    columnHelper.accessor('trades', {
      header: '# Trades',
      cell: info => {
        const value = info.getValue()
        const bgColor = getHeatmapColor(value, tradesRange.min, tradesRange.max)
        return (
          <div 
            className="text-sm text-gray-900 px-2 py-1 rounded"
            style={{ backgroundColor: bgColor }}
          >
            {value}
          </div>
        )
      },
    }),
    columnHelper.accessor('buyers', {
      header: '# Buyers',
      cell: info => <span className="text-sm text-gray-900">{info.getValue()}</span>,
    }),
    columnHelper.accessor('sellers', {
      header: '# Sellers',
      cell: info => <span className="text-sm text-gray-900">{info.getValue()}</span>,
    }),
    columnHelper.accessor('uniqueAddrs', {
      header: '# Unique Addrs',
      cell: info => <span className="text-sm text-gray-900">{info.getValue()}</span>,
    }),
    columnHelper.accessor('whaleBuys', {
      header: 'Whale Buys',
      cell: info => {
        const value = info.getValue()
        const getColor = (buys: number) => {
          if (buys >= 20) return 'bg-red-600'
          if (buys >= 10) return 'bg-orange-500'
          if (buys >= 5) return 'bg-yellow-500'
          if (buys >= 1) return 'bg-green-500'
          return 'bg-gray-300'
        }
        return (
          <div className="flex items-center">
            <span className="text-sm text-gray-900 mr-2">{value}</span>
            <div className={`w-12 h-3 rounded ${getColor(value)}`}></div>
          </div>
        )
      },
    }),
    columnHelper.accessor('whaleSells', {
      header: 'Whale Sells',
      cell: info => <span className="text-sm text-gray-900">{info.getValue()}</span>,
    }),
    columnHelper.accessor('whaleVolumeBuy', {
      header: 'Whale Volume Buy ($)',
      cell: info => <span className="text-sm text-gray-900">{formatVolume(info.getValue())}</span>,
    }),
    columnHelper.accessor('whaleVolumeSell', {
      header: 'Whale Volume Sell ($)',
      cell: info => <span className="text-sm text-gray-900">{formatVolume(info.getValue())}</span>,
    }),
    columnHelper.accessor('whalePressure', {
      header: 'Whale Pressure ($)',
      cell: info => {
        const value = info.getValue()
        const bgColor = getHeatmapColor(value, whalePressureRange.min, whalePressureRange.max, true)
        const textColor = value >= 0 ? 'text-green-600' : 'text-red-600'
        return (
          <div 
            className={`text-sm font-medium px-2 py-1 rounded ${textColor}`}
            style={{ backgroundColor: bgColor }}
          >
            {formatVolume(value)}
          </div>
        )
      },
    }),
    columnHelper.accessor('buySellRatio', {
      header: 'Buy/Sell Ratio',
      cell: info => <span className="text-sm text-gray-900">{info.getValue().toFixed(2)}</span>,
    }),
    columnHelper.accessor('whaleBuySellRatio', {
      header: 'Whale Buy/Sell Ratio',
      cell: info => <span className="text-sm text-gray-900">{info.getValue().toFixed(2)}</span>,
    }),
    columnHelper.accessor('volatility', {
      header: 'Volatility (σ)',
      cell: info => <span className="text-sm text-gray-900">{info.getValue().toFixed(4)}</span>,
    }),
    columnHelper.accessor('spread', {
      header: 'Spread',
      cell: info => <span className="text-sm text-gray-900">{info.getValue().toFixed(3)}</span>,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: info => (
        <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs">
          {info.getValue()}
        </span>
      ),
    }),
  ], [volumeRange, tradesRange, whalePressureRange])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      columnVisibility,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
  })

  // Export to CSV function
  const exportToCSV = () => {
    const headers = table.getVisibleFlatColumns().map(col => col.id)
    const rows = table.getFilteredRowModel().rows.map(row => 
      headers.map(header => {
        const cell = row.getValue(header)
        return typeof cell === 'string' ? `"${cell}"` : cell
      })
    )
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'market-data.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle()
    }
  }

  return (
    <div className="relative group">
      {/* Floating Toolbar - Only visible on hover, positioned above table */}
      <div className="absolute -top-16 right-0 z-10 flex items-center space-x-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Column Visibility */}
        <div className="relative">
          <button
            onClick={() => setShowColumnPanel(!showColumnPanel)}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Toggle Columns"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          
          {showColumnPanel && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-h-80 overflow-y-auto">
              <h3 className="font-medium text-sm text-gray-700 mb-3">Toggle Columns</h3>
              <div className="space-y-2">
                {table.getAllColumns().map(column => (
                  <label key={column.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-600">
                      {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Download */}
        <button
          onClick={exportToCSV}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          title="Export to CSV"
        >
          <Download className="w-4 h-4 text-gray-600" />
        </button>

        {/* Search */}
        <div className="relative">
          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Global Search"
          >
            <Search className="w-4 h-4 text-gray-600" />
          </button>
          
          {showSearchInput && (
            <input
              type="text"
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Search all columns..."
              className="absolute top-full right-0 mt-2 w-64 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          )}
        </div>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead style={{ backgroundColor: '#E8E6F9' }}>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-purple-100 transition-colors"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center space-x-1">
                        <span>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        {header.column.getIsSorted() && (
                          <span className="text-gray-500">
                            {header.column.getIsSorted() === 'desc' ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <ChevronUp className="w-3 h-3" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr 
                  key={row.id} 
                  className="hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Click outside to close panels */}
      {(showColumnPanel || showSearchInput) && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => {
            setShowColumnPanel(false)
            setShowSearchInput(false)
          }}
        />
      )}
    </div>
  )
}