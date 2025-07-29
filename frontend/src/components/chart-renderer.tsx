'use client'

import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { ChartData, ChartType } from '@/lib/store'

interface ChartRendererProps {
  data: ChartData[]
  chartType: ChartType
  title?: string
  className?: string
}

export interface ChartRendererRef {
  getChartInstance: () => echarts.ECharts | null
  getChartElement: () => HTMLDivElement | null
}

export const ChartRenderer = React.forwardRef<ChartRendererRef, ChartRendererProps>(({
  data,
  chartType,
  title = '圖表',
  className = '',
}, ref) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  // 暴露圖表實例和元素給父組件
  React.useImperativeHandle(ref, () => ({
    getChartInstance: () => chartInstance.current,
    getChartElement: () => chartRef.current
  }))

  useEffect(() => {
    if (!chartRef.current || !data.length) return

    // 初始化圖表
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current, 'light')
    }

    const chart = chartInstance.current

    // 準備資料
    const option = getChartOption(data, chartType, title)

    // 設定圖表
    chart.setOption(option, true)

    // 處理響應式
    const handleResize = () => {
      chart.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [data, chartType, title])

  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose()
        chartInstance.current = null
      }
    }
  }, [])

  return (
    <div
      ref={chartRef}
      className={`w-full h-full min-h-[400px] ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
})

ChartRenderer.displayName = 'ChartRenderer'

function getChartOption(data: ChartData[], chartType: ChartType, title: string) {
  // 圓餅圖專用的黑灰白漸變色調
  const pieColorPalette = [
    '#000000', // 純黑
    '#1a1a1a', // 極深灰
    '#2c2c2c', // 深灰
    '#404040', // 中深灰
    '#595959', // 中灰
    '#737373', // 中淺灰
    '#8c8c8c', // 淺灰
    '#a6a6a6', // 更淺灰
    '#bfbfbf', // 很淺灰
    '#d9d9d9', // 極淺灰
  ];

  // 其他圖表使用純黑色
  const singleColorPalette = ['#000000'];

  const baseOption = {
    color: singleColorPalette,
    title: {
      text: title,
      left: 'center',
      textStyle: {
        color: '#2c2c2c',
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'item' as const,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#d0d0d0',
      borderWidth: 1,
      textStyle: {
        color: '#2c2c2c',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    backgroundColor: 'transparent',
  }

  switch (chartType) {
    case 'bar':
      return {
        ...baseOption,
        xAxis: {
          type: 'category' as const,
          data: data.map(item => item.x),
          axisLabel: {
            color: '#595959',
            rotate: data.length > 10 ? 45 : 0,
          },
          axisLine: {
            lineStyle: {
              color: '#d0d0d0',
            },
          },
        },
        yAxis: {
          type: 'value' as const,
          axisLabel: {
            color: '#595959',
          },
          axisLine: {
            lineStyle: {
              color: '#d0d0d0',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#e8e8e8',
            },
          },
        },
        series: [
          {
            type: 'bar' as const,
            data: data.map(item => ({
              value: item.y,
              name: item.label,
            })),
            itemStyle: {
              color: '#000000',
            },
            emphasis: {
              itemStyle: {
                color: '#2c2c2c',
              },
            },
          },
        ],
      }

    case 'line':
      return {
        ...baseOption,
        xAxis: {
          type: 'category' as const,
          data: data.map(item => item.x),
          axisLabel: {
            color: '#595959',
          },
          axisLine: {
            lineStyle: {
              color: '#d0d0d0',
            },
          },
        },
        yAxis: {
          type: 'value' as const,
          axisLabel: {
            color: '#595959',
          },
          axisLine: {
            lineStyle: {
              color: '#d0d0d0',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#e8e8e8',
            },
          },
        },
        series: [
          {
            type: 'line' as const,
            data: data.map(item => item.y),
            smooth: true,
            lineStyle: {
              color: '#000000',
              width: 3,
            },
            itemStyle: {
              color: '#000000',
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: 'rgba(0, 0, 0, 0.4)' },
                  { offset: 1, color: 'rgba(0, 0, 0, 0.1)' }
                ]
              ),
            },
          },
        ],
      }

    case 'pie':
      return {
        ...baseOption,
        color: pieColorPalette, // 使用專門的圓餅圖配色
        tooltip: {
          trigger: 'item' as const,
          formatter: '{b}: {c} ({d}%)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: '#d0d0d0',
          borderWidth: 1,
          textStyle: {
            color: '#2c2c2c',
          },
        },
        series: [
          {
            type: 'pie' as const,
            radius: ['40%', '70%'],
            center: ['50%', '60%'],
            data: data.map((item, index) => ({
              value: item.y,
              name: item.label,
            })),
            label: {
              color: '#2c2c2c',
            },
            labelLine: {
              lineStyle: {
                color: '#2c2c2c',
              },
            },
          },
        ],
      }

    case 'scatter':
      return {
        ...baseOption,
        xAxis: {
          type: 'value' as const,
          axisLabel: {
            color: '#595959',
          },
          axisLine: {
            lineStyle: {
              color: '#d0d0d0',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#e8e8e8',
            },
          },
        },
        yAxis: {
          type: 'value' as const,
          axisLabel: {
            color: '#595959',
          },
          axisLine: {
            lineStyle: {
              color: '#d0d0d0',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#e8e8e8',
            },
          },
        },
        series: [
          {
            type: 'scatter' as const,
            data: data.map(item => [item.x, item.y]),
            symbolSize: 20,
            itemStyle: {
              color: '#000000',
              opacity: 0.8,
            },
            emphasis: {
              itemStyle: {
                color: '#2c2c2c',
                opacity: 1,
              },
            },
          },
        ],
      }

    default:
      return baseOption
  }
}
