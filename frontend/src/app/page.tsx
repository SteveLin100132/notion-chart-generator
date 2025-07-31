'use client'

import React, { useEffect } from 'react'
import { SettingsPanel } from '@/components/settings-panel'
import { ChartRenderer, ChartRendererRef } from '@/components/chart-renderer'
import DataTable from '@/components/data-table-simple'
import { ViewSwitch } from '@/components/view-switch-clean'
import { ShareModal } from '@/components/share-modal'
import { ExportButton } from '@/components/export-button'
import { useNotionStore } from '@/lib/store'
import { snapshotApi } from '@/lib/api'
import { NotionChartLogo } from '@/components/ui/notion-chart-logo'
import { BarChart } from 'lucide-react'

export default function Home() {
  const { chartData, chartType, rawDatabaseData, setChartData, setChartType, setAggregateFunction, setCurrentSnapshotId } = useNotionStore()
  const [isEmbedMode, setIsEmbedMode] = React.useState(false)
  const [currentView, setCurrentView] = React.useState<'chart' | 'data'>('chart')
  const chartRef = React.useRef<ChartRendererRef>(null)

  const loadSnapshot = React.useCallback(async (snapshotId: string) => {
    try {
      const snapshot = await snapshotApi.getSnapshot(snapshotId)
      setChartData(snapshot.data)
      setChartType(snapshot.chartType as any)
      setAggregateFunction(snapshot.aggregateFunction as any)
    } catch (error) {
      console.error('載入快照失敗:', error)
    }
  }, [setChartData, setChartType, setAggregateFunction])

  const loadQuerySnapshot = React.useCallback(async (queryId: string) => {
    try {
      console.log('載入動態快照:', queryId)
      const snapshot = await snapshotApi.executeQuerySnapshot(queryId)
      setChartData(snapshot.data)
      setChartType(snapshot.chartType as any)
      setAggregateFunction(snapshot.aggregateFunction as any)
      setCurrentSnapshotId(queryId)
      console.log('動態快照載入成功:', snapshot)
    } catch (error) {
      console.error('載入動態快照失敗:', error)
    }
  }, [setChartData, setChartType, setAggregateFunction, setCurrentSnapshotId])

  // 檢查是否有分享連結參數
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const snapshotId = urlParams.get('snapshot')
    const queryId = urlParams.get('query')
    const embedMode = urlParams.get('embed') === 'true'
    
    setIsEmbedMode(embedMode)

    if (snapshotId) {
      loadSnapshot(snapshotId)
    } else if (queryId) {
      loadQuerySnapshot(queryId)
    }

    // 如果是嵌入模式，隱藏一些 UI 元素
    if (embedMode) {
      document.body.classList.add('embed-mode')
    }
  }, [loadSnapshot, loadQuerySnapshot])

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* 側邊欄 - 只在非嵌入模式顯示 */}
      {!isEmbedMode && <SettingsPanel />}

      {/* 主要內容區域 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 頂部欄位 */}
        {!isEmbedMode && (
          <header className="border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart className="h-6 w-6" />
                Notion Chart
              </h1>
              <span className="text-sm text-gray-600">
                數據驅動的視覺化工具，連接您的 Notion 資料庫
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {chartData.length > 0 && (
                <ViewSwitch 
                  currentView={currentView}
                  onViewChange={setCurrentView}
                />
              )}
              {chartData.length > 0 && (
                <>
                  <ExportButton 
                    chartRef={chartRef} 
                    chartTitle="Notion-資料圖表" 
                  />
                  <ShareModal chartTitle="Notion 資料圖表" />
                </>
              )}
            </div>
          </header>
        )}

        {/* 圖表/資料顯示區域 */}
        <main className="flex-1 p-6 overflow-hidden">
          {chartData.length > 0 ? (
            currentView === 'chart' ? (
              <div className="h-full bg-white rounded-lg border border-gray-200 p-4">
                <ChartRenderer
                  ref={chartRef}
                  data={chartData}
                  chartType={chartType}
                  title="Notion 資料圖表"
                  className="h-full"
                />
              </div>
            ) : (
              <DataTable
                data={rawDatabaseData}
                className="h-full"
              />
            )
          ) : (
            <div className="h-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <NotionChartLogo className="" size={64} />
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-900">歡迎使用 Notion Chart</h2>
                <p className="text-gray-600 mb-6 max-w-md">
                  連接您的 Notion 資料庫，將資料轉換為美觀的互動式圖表。
                  支援多種圖表類型和資料聚合功能。
                </p>
                {!isEmbedMode && (
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>1. 輸入您的 Notion Integration Token</p>
                    <p>2. 選擇要視覺化的資料庫</p>
                    <p>3. 配置圖表設定並生成圖表</p>
                    <p>4. 分享您的圖表給其他人</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        {/* 底部信息 - 只在非嵌入模式顯示 */}
        {!isEmbedMode && chartData.length > 0 && (
          <footer className="border-t border-gray-200 p-3 bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                共 {chartData.length} 個數據點 | 圖表類型: {getChartTypeLabel(chartType)}
              </div>
              <div>
                Powered by ECharts & Notion API
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}

function getChartTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    bar: '長條圖',
    line: '線圖',
    pie: '圓餅圖',
    radar: '雷達圖',
  }
  return labels[type] || type
}
