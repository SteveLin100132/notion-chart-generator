'use client'

import React from 'react'
import { BarChart3, Table } from 'lucide-react'

interface ViewSwitchProps {
  currentView: 'chart' | 'data'
  onViewChange: (view: 'chart' | 'data') => void
  className?: string
}

const ViewSwitch: React.FC<ViewSwitchProps> = ({
  currentView,
  onViewChange,
  className = ''
}) => {
  return (
    <div className={`inline-flex rounded-lg border border-gray-200 bg-gray-100 p-1 ${className}`}>
      <button
        onClick={() => onViewChange('data')}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          currentView === 'data'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <Table className="h-4 w-4" />
        Data
      </button>
      <button
        onClick={() => onViewChange('chart')}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          currentView === 'chart'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <BarChart3 className="h-4 w-4" />
        Chart
      </button>
    </div>
  )
}

export { ViewSwitch }
