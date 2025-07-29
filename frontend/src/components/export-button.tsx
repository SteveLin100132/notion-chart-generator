'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import * as echarts from 'echarts'
import { ChartRendererRef } from './chart-renderer'

interface ExportButtonProps {
  chartRef?: React.RefObject<ChartRendererRef>
  chartTitle?: string
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  chartRef,
  chartTitle = 'chart'
}) => {
  const exportToPNG = () => {
    if (!chartRef?.current) {
      console.error('圖表參考不存在')
      return
    }

    // 獲取 ECharts 實例
    const chartInstance = chartRef.current.getChartInstance()
    
    if (!chartInstance) {
      console.error('無法獲取圖表實例')
      return
    }

    try {
      // 使用 ECharts 的 getDataURL 方法獲取圖片
      const dataURL = chartInstance.getDataURL({
        type: 'png',
        pixelRatio: 2, // 高清晰度
        backgroundColor: '#ffffff'
      })

      // 創建下載連結
      const link = document.createElement('a')
      link.download = `${chartTitle}.png`
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('匯出圖片失敗:', error)
    }
  }

  const exportToSVG = () => {
    if (!chartRef?.current) {
      console.error('圖表參考不存在')
      return
    }

    // 獲取 ECharts 實例
    const chartInstance = chartRef.current.getChartInstance()
    
    if (!chartInstance) {
      console.error('無法獲取圖表實例')
      return
    }

    try {
      // 對於 SVG 匯出，我們需要創建一個臨時的 SVG 渲染器實例
      const chartElement = chartRef.current.getChartElement()
      if (!chartElement) {
        console.error('無法獲取圖表元素')
        return
      }

      // 創建一個臨時的 div 來渲染 SVG
      const tempDiv = document.createElement('div')
      tempDiv.style.width = chartElement.offsetWidth + 'px'
      tempDiv.style.height = chartElement.offsetHeight + 'px'
      tempDiv.style.position = 'absolute'
      tempDiv.style.top = '-9999px'
      document.body.appendChild(tempDiv)

      // 使用 SVG 渲染器創建臨時圖表實例
      const tempChart = echarts.init(tempDiv, 'light', {
        renderer: 'svg'
      })

      // 獲取當前圖表的配置
      const currentOption = chartInstance.getOption()
      
      // 在臨時圖表中渲染相同的配置
      tempChart.setOption(currentOption)

      // 獲取 SVG 字符串
      const svgString = tempChart.renderToSVGString()

      // 創建 Blob 和下載連結
      const blob = new Blob([svgString], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.download = `${chartTitle}.svg`
      link.href = url
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // 清理資源
      URL.revokeObjectURL(url)
      tempChart.dispose()
      document.body.removeChild(tempDiv)
      
    } catch (error) {
      console.error('匯出 SVG 失敗:', error)
    }
  }

  return (
    <div className="flex space-x-2">
      <Button
        onClick={exportToPNG}
        variant="outline"
        className="bg-white hover:bg-gray-50 text-black border-black"
      >
        <Download className="h-4 w-4 mr-2" />
        匯出 PNG
      </Button>
      <Button
        onClick={exportToSVG}
        variant="outline"
        className="bg-white hover:bg-gray-50 text-black border-black"
      >
        <Download className="h-4 w-4 mr-2" />
        匯出 SVG
      </Button>
    </div>
  )
}

export default ExportButton
