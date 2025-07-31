'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNotionStore } from '@/lib/store'
import { notionApi, dataProcessor, snapshotApi } from '@/lib/api'
import { BarChart3, TrendingUp, PieChart, Loader2, Target, Link, BarChart, Lightbulb } from 'lucide-react'
import { NotionLogo } from '@/components/ui/notion-logo'

export const SettingsPanel: React.FC = () => {
  const {
    token,
    setToken,
    databases,
    setDatabases,
    selectedDatabase,
    setSelectedDatabase,
    databaseProperties,
    setDatabaseProperties,
    chartType,
    setChartType,
    xAxisProperty,
    setXAxisProperty,
    yAxisProperty,
    setYAxisProperty,
    labelProperty,
    setLabelProperty,
    aggregateFunction,
    setAggregateFunction,
    setChartData,
    setRawDatabaseData,
    setTableData,
    setHasMoreData,
    setNextCursor,
    isLoading,
    setIsLoading,
    error,
    setError,
    snapshotMode,
    setSnapshotMode,
    cacheExpireMinutes,
    setCacheExpireMinutes,
    currentSnapshotId,
    setCurrentSnapshotId,
  } = useNotionStore()

  const [isLoadingDatabases, setIsLoadingDatabases] = useState(false)

  const handleLoadDatabases = async () => {
    if (!token.trim()) {
      setError('請輸入有效的 Notion Token')
      return
    }

    setIsLoadingDatabases(true)
    setError(null)

    try {
      const databaseList = await notionApi.getDatabases(token)
      setDatabases(databaseList)
      if (databaseList.length === 0) {
        setError('未找到可訪問的資料庫，請檢查 Token 權限')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || '載入資料庫失敗，請檢查 Token 是否有效')
    } finally {
      setIsLoadingDatabases(false)
    }
  }

  const handleDatabaseSelect = async (databaseId: string) => {
    setSelectedDatabase(databaseId)
    setError(null)

    try {
      const dbInfo = await notionApi.getDatabaseProperties(token, databaseId)
      setDatabaseProperties(dbInfo.properties)
    } catch (err: any) {
      setError(err.response?.data?.error || '載入資料庫屬性失敗')
    }
  }

  const handleGenerateChart = async () => {
    console.log('開始生成圖表...')
    console.log('設定:', { selectedDatabase, xAxisProperty, yAxisProperty, labelProperty, aggregateFunction, snapshotMode })
    
    if (!selectedDatabase || !xAxisProperty) {
      setError('請選擇資料庫和 X 軸屬性')
      return
    }

    // 檢查是否需要使用 COUNT 模式
    const hasNumericProperties = getCompatibleProperties(true).length > 0
    const isCountMode = !yAxisProperty || !hasNumericProperties
    const actualYAxisProperty = isCountMode ? '__count__' : yAxisProperty
    const actualAggregateFunction = isCountMode ? 'COUNT' : aggregateFunction

    // 如果是 COUNT 模式，確保聚合函數設為 COUNT
    if (isCountMode) {
      setAggregateFunction('COUNT')
    }

    setIsLoading(true)
    setError(null)
    
    // 重設表格分頁狀態
    setTableData([])
    setHasMoreData(false)
    setNextCursor(null)

    try {
      if (snapshotMode === 'static') {
        // 靜態模式：直接查詢資料並處理
        await generateStaticChart(actualYAxisProperty, actualAggregateFunction)
      } else {
        // 動態或快取模式：使用新的快照 API
        await generateDynamicChart(actualYAxisProperty, actualAggregateFunction)
      }
    } catch (err: any) {
      console.error('生成圖表錯誤:', err)
      console.error('錯誤詳情:', err.response?.data)
      setError(err.response?.data?.message || err.message || '生成圖表失敗')
    } finally {
      setIsLoading(false)
    }
  }

  const generateStaticChart = async (actualYAxisProperty: string, actualAggregateFunction: string) => {
    console.log('正在查詢資料庫資料（靜態模式）...')
    // 查詢資料庫資料 - 獲取所有資料用於圖表生成
    const response = await notionApi.queryDatabase(token, selectedDatabase, undefined, 100)
    console.log('API 回應:', response)
    
    let allData = response.results || response // 相容新舊格式
    let hasMore = response.has_more
    let nextCursor = response.next_cursor

    console.log('初始資料數量:', allData.length)
    console.log('是否有更多資料:', hasMore)

    // 如果有更多資料，繼續獲取
    while (hasMore && nextCursor) {
      console.log('載入更多資料，游標:', nextCursor)
      const nextResponse = await notionApi.queryDatabase(token, selectedDatabase, undefined, 100, nextCursor)
      allData = [...allData, ...nextResponse.results]
      hasMore = nextResponse.has_more
      nextCursor = nextResponse.next_cursor
      console.log('累積資料數量:', allData.length)
    }
    
    if (allData.length === 0) {
      setError('資料庫中沒有資料')
      return
    }

    console.log('最終資料數量:', allData.length)
    console.log('資料範例:', allData[0])

    // 存儲原始資料
    setRawDatabaseData(allData)

    console.log('開始處理資料...')
    // 處理資料
    const processedData = dataProcessor.processNotionData(
      allData,
      xAxisProperty,
      actualYAxisProperty,
      labelProperty === 'none' ? '' : labelProperty,
      actualAggregateFunction
    )

    console.log('處理後的圖表資料:', processedData)
    setChartData(processedData)
    console.log('圖表生成成功（靜態模式）！')
  }

  const generateDynamicChart = async (actualYAxisProperty: string, actualAggregateFunction: string) => {
    console.log('正在建立動態快照...')
    
    try {
      // 建立動態快照
      const snapshotResponse = await snapshotApi.saveQuerySnapshot({
        databaseId: selectedDatabase,
        notionToken: token,
        xProperty: xAxisProperty,
        yProperty: actualYAxisProperty,
        chartType,
        aggregateFunction: actualAggregateFunction,
        title: `動態圖表 - ${new Date().toLocaleString()}`,
        snapshotMode,
        cacheExpireMinutes: snapshotMode === 'cached' ? cacheExpireMinutes : undefined,
        isDemo: false,
      })

      console.log('動態快照建立成功:', snapshotResponse)
      
      // 執行動態查詢以取得資料
      const chartData = await snapshotApi.executeQuerySnapshot(snapshotResponse.id)
      console.log('動態查詢執行成功:', chartData)
      
      // 更新狀態
      setChartData(chartData.data)
      setCurrentSnapshotId(snapshotResponse.id)
      console.log('圖表生成成功（動態模式）！')
      
    } catch (error) {
      console.error('動態快照建立失敗:', error)
      // 如果動態快照失敗，回退到靜態模式
      console.log('回退到靜態模式...')
      await generateStaticChart(actualYAxisProperty, actualAggregateFunction)
    }
  }

  const chartTypeOptions = [
    { value: 'bar', label: '長條圖', icon: 'BarChart3' },
    { value: 'line', label: '線圖', icon: 'TrendingUp' },
    { value: 'pie', label: '圓餅圖', icon: 'PieChart' },
    { value: 'radar', label: '雷達圖', icon: 'Target' },
  ]

  const aggregateFunctionOptions = [
    { value: 'SUM', label: 'SUM (加總)' },
    { value: 'AVG', label: 'AVG (平均值)' },
    { value: 'MIN', label: 'MIN (最小值)' },
    { value: 'MAX', label: 'MAX (最大值)' },
    { value: 'COUNT', label: 'COUNT (計數)' },
  ]

  const getCompatibleProperties = (forYAxis = false) => {
    if (forYAxis) {
      return databaseProperties.filter(prop => 
        ['number', 'formula', 'rollup'].includes(prop.type)
      )
    }
    return databaseProperties
  }

  return (
    <div className="w-80 min-w-80 max-w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto flex-shrink-0">
      <div className="space-y-6">
        {/* Notion 連接 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <NotionLogo className="" size={20} />
            Notion 連接
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Integration Token
              </label>
              <Input
                type="password"
                placeholder="secret_xxx 或 ntn_xxx"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>
            
            <Button
              onClick={handleLoadDatabases}
              disabled={isLoadingDatabases || !token.trim()}
              className="w-full bg-black hover:bg-gray-800 text-white"
            >
              {isLoadingDatabases ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  載入中...
                </>
              ) : (
                '載入資料庫'
              )}
            </Button>

            {databases.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  選擇資料庫
                </label>
                <Select value={selectedDatabase} onValueChange={handleDatabaseSelect}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="選擇資料庫" />
                  </SelectTrigger>
                  <SelectContent>
                    {databases.map((db) => (
                      <SelectItem key={db.id} value={db.id}>
                        {db.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        {/* 圖表設定 */}
        {databaseProperties.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              圖表設定
            </h3>
            <div className="space-y-4">
              {/* 圖表類型 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  圖表類型
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {chartTypeOptions.map((option) => {
                    const renderIcon = () => {
                      switch (option.icon) {
                        case 'BarChart3':
                          return <BarChart3 className="h-5 w-5 mb-1" />
                        case 'TrendingUp':
                          return <TrendingUp className="h-5 w-5 mb-1" />
                        case 'PieChart':
                          return <PieChart className="h-5 w-5 mb-1" />
                        case 'Target':
                          return <Target className="h-5 w-5 mb-1" />
                        default:
                          return null
                      }
                    }
                    
                    return (
                      <Button
                        key={option.value}
                        variant={chartType === option.value ? 'default' : 'outline'}
                        onClick={() => setChartType(option.value as any)}
                        className={`flex flex-col items-center p-3 h-auto ${
                          chartType === option.value 
                            ? 'bg-black hover:bg-gray-800 text-white' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {renderIcon()}
                        <span className="text-xs">{option.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* X 軸屬性 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  X 軸屬性
                </label>
                <Select value={xAxisProperty} onValueChange={setXAxisProperty}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="選擇 X 軸屬性" />
                  </SelectTrigger>
                  <SelectContent>
                    {getCompatibleProperties().filter(prop => prop.name && prop.name.trim()).map((prop) => (
                      <SelectItem key={prop.id} value={prop.name}>
                        {prop.name} ({prop.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Y 軸屬性 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Y 軸屬性
                </label>
                <Select value={yAxisProperty} onValueChange={setYAxisProperty}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="選擇 Y 軸屬性（可選）" />
                  </SelectTrigger>
                  <SelectContent>
                    {getCompatibleProperties(true).filter(prop => prop.name && prop.name.trim()).map((prop) => (
                      <SelectItem key={prop.id} value={prop.name}>
                        {prop.name} ({prop.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!yAxisProperty && getCompatibleProperties(true).length === 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    沒有可用的數字類型屬性，將使用計數模式
                  </p>
                )}
              </div>

              {/* 聚合函數 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  聚合函數
                </label>
                <Select 
                  value={(!yAxisProperty || getCompatibleProperties(true).length === 0) ? 'COUNT' : aggregateFunction} 
                  onValueChange={setAggregateFunction}
                  disabled={!yAxisProperty || getCompatibleProperties(true).length === 0}
                >
                  <SelectTrigger className={`bg-white border-gray-300 text-gray-900 ${(!yAxisProperty || getCompatibleProperties(true).length === 0) ? 'opacity-50' : ''}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(!yAxisProperty || getCompatibleProperties(true).length === 0) ? (
                      <SelectItem value="COUNT">COUNT (計數)</SelectItem>
                    ) : (
                      aggregateFunctionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {(!yAxisProperty || getCompatibleProperties(true).length === 0) && (
                  <p className="text-xs text-gray-500 mt-1">
                    沒有 Y 軸屬性時僅支援計數聚合函數
                  </p>
                )}
              </div>

              {/* 標籤屬性 (可選) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  標籤屬性 (可選)
                </label>
                <Select value={labelProperty} onValueChange={setLabelProperty}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="選擇標籤屬性" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">無</SelectItem>
                    {getCompatibleProperties().filter(prop => prop.name && prop.name.trim()).map((prop) => (
                      <SelectItem key={prop.id} value={prop.name}>
                        {prop.name} ({prop.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 快照模式設定 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  快照模式
                </label>
                <Select value={snapshotMode} onValueChange={setSnapshotMode}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="static">靜態快照 - 儲存當前資料</SelectItem>
                    <SelectItem value="dynamic">動態快照 - 即時查詢資料</SelectItem>
                    <SelectItem value="cached">快取快照 - 定時更新資料</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  {snapshotMode === 'static' && '資料將保存為靜態檔案，不會自動更新'}
                  {snapshotMode === 'dynamic' && '每次查看都會從 Notion 取得最新資料'}
                  {snapshotMode === 'cached' && '資料會定時從 Notion 更新，提供效能與即時性的平衡'}
                </p>
              </div>

              {/* 快取過期時間 (僅在快取模式下顯示) */}
              {snapshotMode === 'cached' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    快取過期時間 (分鐘)
                  </label>
                  <Input
                    type="number"
                    value={cacheExpireMinutes}
                    onChange={(e) => setCacheExpireMinutes(parseInt(e.target.value) || 60)}
                    min="1"
                    max="1440"
                    className="bg-white border-gray-300 text-gray-900"
                    placeholder="60"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    資料快取的有效時間，超過後會重新從 Notion 取得
                  </p>
                </div>
              )}

              {/* 生成圖表按鈕 */}
              <Button
                onClick={handleGenerateChart}
                disabled={isLoading || !selectedDatabase || !xAxisProperty}
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  '生成圖表'
                )}
              </Button>
            </div>
          </div>
        )}

        {/* 錯誤訊息 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* 提示 */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded">
          <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            使用提示
          </h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Y 軸支援數字類型屬性（number, formula, rollup）</li>
            <li>• 沒有可用 Y 軸屬性時自動使用計數模式</li>
            <li>• 計數模式會統計每個 X 軸值的出現次數</li>
            <li>• 相同 X 軸值會根據聚合函數合併</li>
            <li>• 標籤屬性可增強圖表可讀性</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
