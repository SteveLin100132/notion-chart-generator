'use client'

import React from 'react'
import { Database, Table } from 'lucide-react'

interface DataTableProps {
  data: any[]
  className?: string
}

// Notion 屬性值解析函數
const formatNotionPropertyValue = (property: any): string => {
  if (!property) return '-'
  
  // 如果是字串或數字，直接返回
  if (typeof property === 'string' || typeof property === 'number') {
    return String(property)
  }
  
  // 如果沒有 type 屬性，可能是舊格式或簡化格式
  if (!property.type) {
    if (Array.isArray(property)) {
      return property.map(item => {
        if (typeof item === 'object' && item.plain_text) {
          return item.plain_text
        }
        return String(item)
      }).join('')
    }
    return String(property)
  }
  
  switch (property.type) {
    case 'title':
      return property.title?.map((t: any) => t.plain_text).join('') || '-'
    case 'rich_text':
      return property.rich_text?.map((t: any) => t.plain_text).join('') || '-'
    case 'number':
      return property.number?.toString() || '-'
    case 'select':
      return property.select?.name || '-'
    case 'multi_select':
      return property.multi_select?.map((s: any) => s.name).join(', ') || '-'
    case 'status':
      // 處理狀態欄位
      return property.status?.name || '-'
    case 'date':
      return property.date?.start || '-'
    case 'checkbox':
      return property.checkbox ? '✓' : '✗'
    case 'url':
      return property.url || '-'
    case 'email':
      return property.email || '-'
    case 'phone_number':
      return property.phone_number || '-'
    case 'formula':
      // 處理公式欄位
      if (property.formula) {
        if (property.formula.type === 'string') {
          return property.formula.string || '-'
        } else if (property.formula.type === 'number') {
          return property.formula.number?.toString() || '-'
        } else if (property.formula.type === 'boolean') {
          return property.formula.boolean ? '✓' : '✗'
        } else if (property.formula.type === 'date') {
          return property.formula.date?.start || '-'
        } else {
          // 遞歸處理其他類型的公式結果
          return formatNotionPropertyValue(property.formula) || '-'
        }
      }
      return '-'
    case 'relation':
      return `${property.relation?.length || 0} 個關聯`
    case 'rollup':
      // 處理彙總欄位
      if (property.rollup) {
        if (property.rollup.type === 'number') {
          return property.rollup.number?.toString() || '-'
        } else if (property.rollup.type === 'array') {
          return `${property.rollup.array?.length || 0} 個項目`
        } else if (property.rollup.type === 'date') {
          return property.rollup.date?.start || '-'
        } else {
          return formatNotionPropertyValue(property.rollup) || '-'
        }
      }
      return '-'
    case 'people':
      return property.people?.map((p: any) => p.name).join(', ') || '-'
    case 'files':
      return `${property.files?.length || 0} 個檔案`
    case 'created_time':
    case 'last_edited_time':
      return new Date(property[property.type]).toLocaleDateString('zh-TW')
    case 'created_by':
    case 'last_edited_by':
      return property[property.type]?.name || '-'
    case 'unique_id':
      return property.unique_id?.number?.toString() || property.unique_id?.prefix || '-'
    default:
      // 對於未知類型，嘗試智能解析
      console.log('Unknown property type:', property.type, property)
      
      // 檢查是否有常見的值屬性
      if (property.value !== undefined) {
        return String(property.value)
      }
      if (property.name !== undefined) {
        return String(property.name)
      }
      if (property.text !== undefined) {
        return String(property.text)
      }
      
      return `[${property.type}]`
  }
}

const DataTable: React.FC<DataTableProps> = ({ data, className = '' }) => {
  console.log('DataTable data:', data) // 調試用

  // 獲取所有可用的欄位
  const getColumns = () => {
    if (data.length === 0) return []
    
    // 檢查第一個項目的結構
    const firstItem = data[0]
    console.log('First item structure:', firstItem) // 調試用
    
    // 如果有 properties 屬性，使用 Notion 格式
    if (firstItem?.properties) {
      const columns = new Set<string>()
      data.forEach(item => {
        if (item?.properties) {
          Object.keys(item.properties).forEach(key => columns.add(key))
        }
      })
      return Array.from(columns)
    }
    
    // 如果沒有 properties，嘗試使用物件的所有鍵
    const columns = new Set<string>()
    data.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => columns.add(key))
      }
    })
    return Array.from(columns)
  }

  const columns = getColumns()
  console.log('Columns:', columns) // 調試用

  const renderCellValue = (item: any, columnName: string) => {
    let value
    
    // 如果有 properties 屬性，使用 Notion 格式
    if (item?.properties) {
      value = item.properties[columnName]
      return formatNotionPropertyValue(value)
    }
    
    // 否則直接從物件取值
    value = item[columnName]
    
    if (value === null || value === undefined) {
      return '-'
    }
    
    if (typeof value === 'object') {
      // 如果是物件但不是 Notion 格式，嘗試格式化
      if (Array.isArray(value)) {
        return value.join(', ')
      }
      // 如果是複雜物件，截取 JSON 字串
      const jsonStr = JSON.stringify(value)
      return jsonStr.length > 50 ? jsonStr.substring(0, 50) + '...' : jsonStr
    }
    
    return String(value)
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Table className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">資料表格</h3>
          <span className="text-sm text-gray-500">({data.length} 筆資料)</span>
        </div>
      </div>
      
      <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {data.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Database className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>沒有資料可顯示</p>
          </div>
        ) : columns.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Database className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>無法解析資料結構</p>
            <pre className="text-xs mt-4 text-left max-w-md mx-auto bg-gray-100 p-2 rounded">
              {JSON.stringify(data[0], null, 2).substring(0, 200)}...
            </pre>
          </div>
        ) : (
          <table className="w-full table-auto">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                {columns.map((columnName) => (
                  <th key={columnName} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    {columnName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((columnName) => {
                    const cellValue = renderCellValue(item, columnName)
                    return (
                      <td key={columnName} className="px-4 py-3 text-sm text-gray-900 border-b border-gray-100">
                        <div className="max-w-xs truncate" title={cellValue}>
                          {cellValue}
                        </div>
                      </td>
                    )
                  })}
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
