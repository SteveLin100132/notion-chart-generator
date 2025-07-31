'use client'

import React from 'react'
import { Database, Table } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

interface DataTableProps {
  data: any[]
  className?: string
}

// Notion 屬性值解析函數 - 返回結構化數據以支持不同的渲染方式
const parseNotionPropertyValue = (property: any): { type: string, value: any, displayText: string } => {
  if (!property) return { type: 'text', value: '-', displayText: '-' }
  
  // 如果是字串或數字，直接返回
  if (typeof property === 'string' || typeof property === 'number') {
    return { type: 'text', value: property, displayText: String(property) }
  }
  
  // 如果沒有 type 屬性，可能是舊格式或簡化格式
  if (!property.type) {
    if (Array.isArray(property)) {
      const text = property.map(item => {
        if (typeof item === 'object' && item.plain_text) {
          return item.plain_text
        }
        return String(item)
      }).join('')
      return { type: 'text', value: text, displayText: text }
    }
    return { type: 'text', value: property, displayText: String(property) }
  }
  
  switch (property.type) {
    case 'title':
      const titleText = property.title?.map((t: any) => t.plain_text).join('') || '-'
      return { type: 'text', value: titleText, displayText: titleText }
      
    case 'rich_text':
      const richText = property.rich_text?.map((t: any) => t.plain_text).join('') || '-'
      return { type: 'text', value: richText, displayText: richText }
      
    case 'number':
      const numberValue = property.number?.toString() || '-'
      return { type: 'text', value: numberValue, displayText: numberValue }
      
    case 'select':
      const selectValue = property.select?.name || '-'
      const selectColor = property.select?.color || 'default'
      return { 
        type: 'select', 
        value: { name: selectValue, color: selectColor }, 
        displayText: selectValue 
      }
      
    case 'multi_select':
      const multiSelectItems = property.multi_select || []
      return { 
        type: 'multi_select', 
        value: multiSelectItems, 
        displayText: multiSelectItems.map((s: any) => s.name).join(', ') || '-'
      }
      
    case 'status':
      const statusValue = property.status?.name || '-'
      const statusColor = property.status?.color || 'default'
      return { 
        type: 'status', 
        value: { name: statusValue, color: statusColor }, 
        displayText: statusValue 
      }
      
    case 'date':
      const dateValue = property.date?.start || '-'
      return { type: 'text', value: dateValue, displayText: dateValue }
      
    case 'checkbox':
      const checkboxValue = property.checkbox
      return { 
        type: 'checkbox', 
        value: checkboxValue, 
        displayText: checkboxValue ? '✓' : '✗' 
      }
      
    case 'url':
      const urlValue = property.url || '-'
      return { type: 'text', value: urlValue, displayText: urlValue }
      
    case 'email':
      const emailValue = property.email || '-'
      return { type: 'text', value: emailValue, displayText: emailValue }
      
    case 'phone_number':
      const phoneValue = property.phone_number || '-'
      return { type: 'text', value: phoneValue, displayText: phoneValue }
      
    case 'formula':
      if (property.formula) {
        if (property.formula.type === 'string') {
          const formulaText = property.formula.string || '-'
          return { type: 'text', value: formulaText, displayText: formulaText }
        } else if (property.formula.type === 'number') {
          const formulaNumber = property.formula.number?.toString() || '-'
          return { type: 'text', value: formulaNumber, displayText: formulaNumber }
        } else if (property.formula.type === 'boolean') {
          const formulaBool = property.formula.boolean
          return { 
            type: 'checkbox', 
            value: formulaBool, 
            displayText: formulaBool ? '✓' : '✗' 
          }
        } else if (property.formula.type === 'date') {
          const formulaDate = property.formula.date?.start || '-'
          return { type: 'text', value: formulaDate, displayText: formulaDate }
        } else {
          const result = parseNotionPropertyValue(property.formula)
          return result
        }
      }
      return { type: 'text', value: '-', displayText: '-' }
      
    case 'relation':
      const relationText = `${property.relation?.length || 0} 個關聯`
      return { type: 'text', value: relationText, displayText: relationText }
      
    case 'rollup':
      if (property.rollup) {
        if (property.rollup.type === 'number') {
          const rollupNumber = property.rollup.number?.toString() || '-'
          return { type: 'text', value: rollupNumber, displayText: rollupNumber }
        } else if (property.rollup.type === 'array') {
          const rollupArray = `${property.rollup.array?.length || 0} 個項目`
          return { type: 'text', value: rollupArray, displayText: rollupArray }
        } else if (property.rollup.type === 'date') {
          const rollupDate = property.rollup.date?.start || '-'
          return { type: 'text', value: rollupDate, displayText: rollupDate }
        } else {
          const result = parseNotionPropertyValue(property.rollup)
          return result
        }
      }
      return { type: 'text', value: '-', displayText: '-' }
      
    case 'people':
      const peopleText = property.people?.map((p: any) => p.name).join(', ') || '-'
      return { type: 'text', value: peopleText, displayText: peopleText }
      
    case 'files':
      const filesText = `${property.files?.length || 0} 個檔案`
      return { type: 'text', value: filesText, displayText: filesText }
      
    case 'created_time':
    case 'last_edited_time':
      const timeValue = new Date(property[property.type]).toLocaleDateString('zh-TW')
      return { type: 'text', value: timeValue, displayText: timeValue }
      
    case 'created_by':
    case 'last_edited_by':
      const userValue = property[property.type]?.name || '-'
      return { type: 'text', value: userValue, displayText: userValue }
      
    case 'unique_id':
      const uniqueIdValue = property.unique_id?.number?.toString() || property.unique_id?.prefix || '-'
      return { type: 'text', value: uniqueIdValue, displayText: uniqueIdValue }
      
    default:
      console.log('Unknown property type:', property.type, property)
      
      if (property.value !== undefined) {
        return { type: 'text', value: property.value, displayText: String(property.value) }
      }
      if (property.name !== undefined) {
        return { type: 'text', value: property.name, displayText: String(property.name) }
      }
      if (property.text !== undefined) {
        return { type: 'text', value: property.text, displayText: String(property.text) }
      }
      
      return { type: 'text', value: `[${property.type}]`, displayText: `[${property.type}]` }
  }
}

// Badge 組件
const Badge: React.FC<{ text: string; color?: string; size?: 'sm' | 'md' }> = ({ 
  text, 
  color = 'default', 
  size = 'sm' 
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'gray':
      case 'default':
        return 'bg-gray-100 text-gray-800'
      case 'brown':
        return 'bg-amber-100 text-amber-800'
      case 'orange':
        return 'bg-orange-100 text-orange-800'
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800'
      case 'green':
        return 'bg-green-100 text-green-800'
      case 'blue':
        return 'bg-blue-100 text-blue-800'
      case 'purple':
        return 'bg-purple-100 text-purple-800'
      case 'pink':
        return 'bg-pink-100 text-pink-800'
      case 'red':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'

  return (
    <span className={`inline-flex items-center rounded-full font-medium whitespace-nowrap ${getColorClasses(color)} ${sizeClasses}`}>
      {text}
    </span>
  )
}

// 渲染表格單元格內容
const renderCellContent = (parsedValue: { type: string, value: any, displayText: string }) => {
  switch (parsedValue.type) {
    case 'select':
    case 'status':
      return (
        <Badge 
          text={parsedValue.value.name} 
          color={parsedValue.value.color}
        />
      )
      
    case 'multi_select':
      if (!parsedValue.value || parsedValue.value.length === 0) {
        return <span className="text-gray-400">-</span>
      }
      return (
        <div className="flex flex-wrap gap-1">
          {parsedValue.value.map((item: any, index: number) => (
            <Badge 
              key={index} 
              text={item.name} 
              color={item.color}
            />
          ))}
        </div>
      )
      
    case 'checkbox':
      return (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={parsedValue.value}
            disabled
            className="cursor-default"
          />
        </div>
      )
      
    default:
      return (
        <div className="max-w-48 truncate whitespace-nowrap" title={parsedValue.displayText}>
          {parsedValue.displayText}
        </div>
      )
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
    let property
    
    // 如果有 properties 屬性，使用 Notion 格式
    if (item?.properties) {
      property = item.properties[columnName]
      const parsedValue = parseNotionPropertyValue(property)
      return renderCellContent(parsedValue)
    }
    
    // 否則直接從物件取值
    const value = item[columnName]
    
    if (value === null || value === undefined) {
      return <span className="text-gray-400">-</span>
    }
    
    if (typeof value === 'object') {
      // 如果是物件但不是 Notion 格式，嘗試格式化
      if (Array.isArray(value)) {
        return <div className="max-w-48 truncate whitespace-nowrap">{value.join(', ')}</div>
      }
      // 如果是複雜物件，截取 JSON 字串
      const jsonStr = JSON.stringify(value)
      const displayStr = jsonStr.length > 50 ? jsonStr.substring(0, 50) + '...' : jsonStr
      return <div className="max-w-48 truncate whitespace-nowrap" title={jsonStr}>{displayStr}</div>
    }
    
    const displayValue = String(value)
    return <div className="max-w-48 truncate whitespace-nowrap" title={displayValue}>{displayValue}</div>
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <Table className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">資料表格</h3>
          <span className="text-sm text-gray-500">({data.length} 筆資料)</span>
        </div>
      </div>
      
      <div className="overflow-auto data-table-scroll" style={{ maxHeight: 'calc(100vh - 200px)' }}>
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
          <div className="overflow-x-auto data-table-scroll">
            <table className="w-full min-w-max table-auto">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  {columns.map((columnName) => (
                    <th key={columnName} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-32 whitespace-nowrap">
                      {columnName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {columns.map((columnName) => {
                      const cellContent = renderCellValue(item, columnName)
                      return (
                        <td key={columnName} className="px-4 py-3 text-sm text-gray-900 border-b border-gray-100 min-w-32 table-cell-nowrap">
                          {cellContent}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default DataTable
