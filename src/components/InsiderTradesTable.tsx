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

interface InsiderTrade {
  market: string
  outcome: string
  user: string
  currentPrice: number
  avgEntryPrice: number
  pnlPercent: number
  invested: number
  zScore: number
  nPositions: number
  daysSince1stTrade: number
  marketMeanInvested: number
}

interface InsiderTradesTableProps {
  data: InsiderTrade[]
}

const columnHelper = createColumnHelper<InsiderTrade>()

export default function InsiderTradesTable({ data }: InsiderTradesTableProps) {
  const [globalFilter, setGlobalFilter] = useState('')
  const [showColumnPanel, setShowColumnPanel] = useState(false)
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [columnVisibility, setColumnVisibility] = useState({})

  // Utility functions
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`
    }
    return `$${value.toFixed(0)}`
  }

  const formatPrice = (price: number) => `$${price.toFixed(2)}`
  
  const formatPercent = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(1)}%`
  }

  // Heatmap color generator for numeric columns
  const getHeatmapColor = (value: number, min: number, max: number, isPercent = false) => {
    if (max === min) return 'bg-gray-50'
    
    const normalized = (value - min) / (max - min)
    
    if (isPercent && value < 0) {
      const intensity = Math.abs(normalized)
      return `rgba(239, 68, 68, ${intensity * 0.3})` // Red for negative
    } else {
      const intensity = normalized
      return `rgba(239, 68, 68, ${intensity * 0.4})` // Red intensity for suspicious activity
    }
  }

  // Calculate min/max for heatmap
  const pnlRange = useMemo(() => {
    const pnls = data.map(d => d.pnlPercent)
    return { min: Math.min(...pnls), max: Math.max(...pnls) }
  }, [data])

  const investedRange = useMemo(() => {
    const invested = data.map(d => d.invested)
    return { min: Math.min(...invested), max: Math.max(...invested) }
  }, [data])

  const zScoreRange = useMemo(() => {
    const zScores = data.map(d => d.zScore)
    return { min: Math.min(...zScores), max: Math.max(...zScores) }
  }, [data])

  const columns = useMemo<ColumnDef<InsiderTrade>[]>(() => [
    columnHelper.accessor('market', {
      header: 'Market',
      cell: info => (
        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline text-sm max-w-xs block truncate">
          {info.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor('outcome', {
      header: 'Outcome',
      cell: info => {
        const value = info.getValue()
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            value === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {value}
          </span>
        )
      },
    }),
    columnHelper.accessor('user', {
      header: 'User',
      cell: info => <span className="text-sm font-mono text-gray-700">{info.getValue()}</span>,
    }),
    columnHelper.accessor('currentPrice', {
      header: 'Current Price',
      cell: info => (
        <span className="text-sm font-medium text-gray-900">
          {formatPrice(info.getValue())}
        </span>
      ),
    }),
    columnHelper.accessor('avgEntryPrice', {
      header: 'Avg Entry Price',
      cell: info => (
        <span className="text-sm text-gray-600">
          {formatPrice(info.getValue())}
        </span>
      ),
    }),
    columnHelper.accessor('pnlPercent', {
      header: 'P&L %',
      cell: info => {
        const value = info.getValue()
        const bgColor = getHeatmapColor(value, pnlRange.min, pnlRange.max, true)
        const textColor = value >= 0 ? 'text-green-600' : 'text-red-600'
        return (
          <div 
            className={`text-sm font-bold px-2 py-1 rounded ${textColor}`}
            style={{ backgroundColor: bgColor }}
          >
            {formatPercent(value)}
          </div>
        )
      },
    }),
    columnHelper.accessor('invested', {
      header: 'Invested (USD)',
      cell: info => {
        const value = info.getValue()
        const bgColor = getHeatmapColor(value, investedRange.min, investedRange.max)
        return (
          <div 
            className="text-sm font-medium text-gray-900 px-2 py-1 rounded"
            style={{ backgroundColor: bgColor }}
          >
            {formatCurrency(value)}
          </div>
        )
      },
    }),
    columnHelper.accessor('zScore', {
      header: 'Z-Score',
      cell: info => {
        const value = info.getValue()
        const bgColor = getHeatmapColor(value, zScoreRange.min, zScoreRange.max)
        const textColor = value >= 2.5 ? 'text-red-600 font-bold' : 'text-gray-900'
        return (
          <div 
            className={`text-sm px-2 py-1 rounded ${textColor}`}
            style={{ backgroundColor: bgColor }}
          >
            {value.toFixed(2)}
          </div>
        )
      },
    }),
    columnHelper.accessor('nPositions', {
      header: 'N Positions',
      cell: info => <span className="text-sm text-gray-900">{info.getValue()}</span>,
    }),
    columnHelper.accessor('daysSince1stTrade', {
      header: 'Days Since 1st Trade',
      cell: info => {
        const value = info.getValue()
        const urgencyColor = value <= 1 ? 'text-red-600 font-bold' : value <= 3 ? 'text-orange-600' : 'text-gray-900'
        return <span className={`text-sm ${urgencyColor}`}>{value}</span>
      },
    }),
    columnHelper.accessor('marketMeanInvested', {
      header: 'Market Mean Invested',
      cell: info => (
        <span className="text-sm text-gray-600">
          {formatCurrency(info.getValue())}
        </span>
      ),
    }),
  ], [pnlRange, investedRange, zScoreRange])

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
    a.download = 'insider-trades.csv'
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