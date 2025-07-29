'use client'

import React from 'react'
import { Database, Table } from 'lucide-react'

interface DataTableProps {
  data: any[]
  className?: string
}

const DataTable: React.FC<DataTableProps> = ({ data, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Table className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">資料表格</h3>
          <span className="text-sm text-gray-500">({data.length} 筆資料)</span>
        </div>
      </div>
      
      <div className="overflow-auto max-h-96">
        {data.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Database className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>沒有資料可顯示</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                {Object.keys(data[0]?.properties || {}).map((key) => (
                  <th key={key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {Object.entries(item?.properties || {}).map(([key, value]: [string, any]) => (
                    <td key={key} className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {typeof value === 'object' && value !== null
                        ? JSON.stringify(value, null, 2).substring(0, 100) + '...'
                        : String(value || '-')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default DataTable
