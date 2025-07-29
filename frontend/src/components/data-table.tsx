'use client'

import React, { useEffect, useRef } from 'react'
import { Database, Table, Loader2 } from 'lucide-react'
import { useNotionStore } from '@/lib/store'
import { notionApi } from '@/lib/api'

interface DataTableProps {
  data: any[]
  className?: string
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  className = '',
}) => {
  const {
    token,
    selectedDatabase,
    tableData,
    setTableData,
    hasMoreData,
    setHasMoreData,
    nextCursor,
    setNextCursor,
    isLoadingMore,
    setIsLoadingMore,
    setError
  } = useNotionStore()

  const scrollRef = useRef<HTMLDivElement>(null)

  // 初始化表格資料
  useEffect(() => {
    const loadInitialData = async () => {
      if (!token || !selectedDatabase) return

      try {
        setIsLoadingMore(true)
        const response = await notionApi.queryDatabase(
          token,
          selectedDatabase,
          undefined,
          20 // 預設載入 20 筆
        )
        
        setTableData(response.results)
        setHasMoreData(response.has_more)
        setNextCursor(response.next_cursor)
      } catch (error) {
        console.error('載入初始資料失敗:', error)
        setError('載入資料失敗')
      } finally {
        setIsLoadingMore(false)
      }
    }

    if (data.length > 0 && tableData.length === 0) {
      loadInitialData()
    }
  }, [data, tableData.length, token, selectedDatabase, setTableData, setHasMoreData, setNextCursor, setIsLoadingMore, setError])

  const loadMoreData = async () => {
    if (!token || !selectedDatabase || !hasMoreData || isLoadingMore || !nextCursor) return

    try {
      setIsLoadingMore(true)
      const response = await notionApi.queryDatabase(
        token,
        selectedDatabase,
        undefined,
        20,
        nextCursor
      )
      
      setTableData([...tableData, ...response.results])
      setHasMoreData(response.has_more)
      setNextCursor(response.next_cursor)
    } catch (error) {
      console.error('載入更多資料失敗:', error)
      setError('載入更多資料失敗')
    } finally {
      setIsLoadingMore(false)
    }
  }

  const handleScroll = () => {
    if (!scrollRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100

    if (isNearBottom && hasMoreData && !isLoadingMore) {
      loadMoreData()
    }
  }

  const displayData = tableData.length > 0 ? tableData : data

  if (!displayData.length) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <Table className="h-16 w-16 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">無資料可顯示</h3>
          <p className="text-gray-600">
            請先連接 Notion 資料庫並選擇要視覺化的資料。
          </p>
        </div>
      </div>
    )
  }

  // 獲取所有欄位名稱 - 從第一筆資料中提取所有 properties
  const firstItem = displayData[0]
  const columns = firstItem?.properties ? Object.keys(firstItem.properties) : (firstItem ? Object.keys(firstItem) : [])

  // 輔助函數：格式化 Notion 屬性值
  const formatNotionProperty = (property: any): string => {
    if (!property) return '-'
    
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
        return property.formula?.string || property.formula?.number?.toString() || '-'
      case 'relation':
        return `${property.relation?.length || 0} 個關聯`
      case 'rollup':
        return property.rollup?.array?.length ? `${property.rollup.array.length} 項` : '-'
      case 'people':
        return property.people?.map((p: any) => p.name).join(', ') || '-'
      case 'files':
        return property.files?.length ? `${property.files.length} 個檔案` : '-'
      case 'created_time':
      case 'last_edited_time':
        return new Date(property[property.type]).toLocaleString('zh-TW') || '-'
      case 'created_by':
      case 'last_edited_by':
        return property[property.type]?.name || '-'
      default:
        return typeof property === 'object' ? JSON.stringify(property) : String(property || '-')
    }
  }

  return (
    <div className={`h-full flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">資料表格</h3>
          <span className="text-sm text-gray-500">({displayData.length} 筆資料)</span>
          {hasMoreData && (
            <span className="text-sm text-blue-600">(還有更多資料)</span>
          )}
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-auto"
        onScroll={handleScroll}
      >
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayData.map((row, index) => (
              <tr key={row.id || index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column}
                    className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap max-w-xs overflow-hidden text-ellipsis"
                  >
                    {row.properties 
                      ? formatNotionProperty(row.properties[column])
                      : String((row as any)[column] || '-')
                    }
                  </td>
                ))}
              </tr>
            ))}
            {isLoadingMore && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-600">載入更多資料...</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
