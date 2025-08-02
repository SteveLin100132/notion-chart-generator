'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNotionStore } from '@/lib/store'
import { notionApi, dataProcessor, snapshotApi } from '@/lib/api'
import { BarChart3, TrendingUp, PieChart, Loader2, Target, Link, BarChart, Lightbulb, Filter, CheckCircle } from 'lucide-react'
import { NotionLogo } from '@/components/ui/notion-logo'
import { QueryBuilderModal } from '@/components/query-builder-modal'

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
    filterGroups,
    setFilterGroups,
    addFilterGroup,
    removeFilterGroup,
    updateFilterGroup,
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
    currentSnapshotId,
    setCurrentSnapshotId,
  } = useNotionStore()

  const [isLoadingDatabases, setIsLoadingDatabases] = useState(false)
  const [isQueryBuilderOpen, setIsQueryBuilderOpen] = useState(false)

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
    console.log('設定:', { 
      selectedDatabase, 
      xAxisProperty, 
      yAxisProperty, 
      labelProperty, 
      aggregateFunction, 
      snapshotMode,
      filterGroups: filterGroups.length > 0 ? filterGroups : '無篩選條件'
    })
    
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
      // 只使用動態模式
      await generateDynamicChart(actualYAxisProperty, actualAggregateFunction)
    } catch (err: any) {
      console.error('生成圖表錯誤:', err)
      console.error('錯誤詳情:', err.response?.data)
      setError(err.response?.data?.message || err.message || '生成圖表失敗')
    } finally {
      setIsLoading(false)
    }
  }

  const generateDynamicChart = async (actualYAxisProperty: string, actualAggregateFunction: string) => {
    console.log('正在建立動態快照...')
    
    try {
      // 轉換篩選條件為Notion API格式
      const notionFilters = filterGroups.length > 0 ? 
        await import('@/components/query-builder').then(module => 
          module.convertToNotionFilter(filterGroups, databaseProperties)
        ) : undefined

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
        isDemo: false,
        filters: notionFilters,
      })

      console.log('動態快照建立成功:', snapshotResponse)
      
      // 執行動態查詢以取得資料
      const chartData = await snapshotApi.executeQuerySnapshot(snapshotResponse.id)
      console.log('動態查詢執行成功:', chartData)
      
      // 更新狀態
      setChartData(chartData.data)
      setCurrentSnapshotId(snapshotResponse.id)
      
      // 設置原始資料庫資料供資料表格使用
      if (chartData.rawData && Array.isArray(chartData.rawData)) {
        console.log('設置原始資料庫資料:', chartData.rawData.length, '筆')
        setRawDatabaseData(chartData.rawData)
      } else {
        console.warn('動態快照沒有包含原始資料')
        setRawDatabaseData([])
      }
      
      // 更新 URL 以反映當前的動態快照狀態
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.set('query', snapshotResponse.id)
      window.history.pushState({}, '', newUrl.toString())
      
      console.log('圖表生成成功（動態模式）！')
      
    } catch (error) {
      console.error('動態快照建立失敗:', error)
      throw error  // 直接拋出錯誤，不再回退到靜態模式
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
                      <SelectItem key={prop.id} value={prop.name} type={prop.type}>
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
                      <SelectItem key={prop.id} value={prop.name} type={prop.type}>
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
                      <SelectItem key={prop.id} value={prop.name} type={prop.type}>
                        {prop.name} ({prop.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 進階篩選 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="flex text-sm font-medium text-gray-700 items-center gap-2">
                    <Filter className="h-4 w-4" />
                    進階篩選
                  </label>
                  {filterGroups.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFilterGroups([])}
                      className="text-red-600 border-red-200 hover:bg-red-50 h-7 text-xs"
                    >
                      清除
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {/* 篩選狀態顯示 */}
                  {filterGroups.length > 0 ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        篩選結果
                      </h4>
                      <p className="text-xs text-green-700">
                        已設定 {filterGroups.length} 個篩選組，
                        包含 {filterGroups.reduce((total, group) => total + group.conditions.length, 0)} 個條件
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-600">
                        尚未設定篩選條件，將查詢所有資料
                      </p>
                    </div>
                  )}

                  {/* 設定篩選按鈕 */}
                  <Button
                    variant="outline"
                    onClick={() => setIsQueryBuilderOpen(true)}
                    className="w-full"
                    disabled={databaseProperties.length === 0}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {filterGroups.length > 0 ? '編輯篩選條件' : '設定篩選條件'}
                  </Button>
                </div>
              </div>

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

      {/* Query Builder Modal */}
      <QueryBuilderModal
        isOpen={isQueryBuilderOpen}
        onClose={() => setIsQueryBuilderOpen(false)}
        properties={databaseProperties}
        filterGroups={filterGroups}
        onFilterGroupsChange={setFilterGroups}
      />
    </div>
  )
}
