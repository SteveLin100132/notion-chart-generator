'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNotionStore } from '@/lib/store'
import { snapshotApi } from '@/lib/api'
import { Share2, Copy, Check, Loader2, Link, Clipboard, Lightbulb } from 'lucide-react'

interface ShareModalProps {
  chartTitle?: string
}

export const ShareModal: React.FC<ShareModalProps> = ({ chartTitle = '圖表' }) => {
  const { 
    chartData, 
    chartType, 
    aggregateFunction, 
    shareUrl, 
    setShareUrl,
    currentSnapshotId,
    token,
    selectedDatabase,
    xAxisProperty,
    yAxisProperty,
    snapshotMode,
    rawDatabaseData // 添加原始資料
  } = useNotionStore()
  const [isSharing, setIsSharing] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [copiedEmbed, setCopiedEmbed] = useState(false)
  const [normalShareUrl, setNormalShareUrl] = useState('')
  const [embedShareUrl, setEmbedShareUrl] = useState('')

  const handleShare = async () => {
    if (!chartData.length) {
      return
    }

    setIsSharing(true)

    try {
      let snapshotId: string

      // 如果當前已經有動態快照，直接使用
      if (currentSnapshotId && currentSnapshotId.startsWith('query_')) {
        snapshotId = currentSnapshotId
        console.log('使用現有動態快照:', snapshotId)
      }
      // 創建新的動態快照
      else if (token && selectedDatabase && xAxisProperty && yAxisProperty) {
        console.log('創建新的動態快照...')
        const response = await snapshotApi.saveQuerySnapshot({
          databaseId: selectedDatabase,
          notionToken: token,
          xProperty: xAxisProperty,
          yProperty: yAxisProperty,
          chartType,
          aggregateFunction,
          title: chartTitle,
          snapshotMode: 'dynamic',
          isDemo: false,
        })
        snapshotId = response.id
        console.log('動態快照創建成功:', snapshotId)
      }
      else {
        throw new Error('缺少必要的 Notion 連接資訊')
      }

      const baseUrl = window.location.origin
      
      // 生成分享 URL（動態快照使用 query 參數）
      const shareUrl = `${baseUrl}?query=${snapshotId}&embed=true`
      
      console.log(`生成分享 URL (動態模式):`, shareUrl)
      
      setNormalShareUrl(shareUrl)
      setEmbedShareUrl(shareUrl)  // 兩者使用相同的 URL
      setShareUrl(shareUrl)  // 保持向後相容
    } catch (error) {
      console.error('分享失敗:', error)
    } finally {
      setIsSharing(false)
    }
  }

  const copyToClipboard = async (text: string, type: 'url' | 'embed') => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'url') {
        setCopiedUrl(true)
        setTimeout(() => setCopiedUrl(false), 2000)
      } else {
        setCopiedEmbed(true)
        setTimeout(() => setCopiedEmbed(false), 2000)
      }
    } catch (err) {
      console.error('複製失敗:', err)
    }
  }

  const embedCode = embedShareUrl
    ? `<iframe src="${embedShareUrl}" width="800" height="600" frameborder="0" allowfullscreen></iframe>`
    : ''

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={handleShare}
          disabled={!chartData.length || isSharing}
          className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          {isSharing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
          分享
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>分享圖表</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {normalShareUrl ? (
            <>
              {/* 分享連結 */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Link className="h-4 w-4" />
                  分享連結 (動態快照)
                </label>
                <div className="flex space-x-2">
                  <Input
                    value={normalShareUrl}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(normalShareUrl, 'url')}
                    className="shrink-0 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    {copiedUrl ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  此連結可在新分頁或視窗中開啟，以嵌入模式顯示圖表
                </p>
              </div>

              {/* 嵌入代碼 */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Clipboard className="h-4 w-4" />
                  HTML 嵌入代碼
                </label>
                <div className="flex space-x-2">
                  <Input
                    value={embedCode}
                    readOnly
                    className="flex-1 font-mono text-xs"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(embedCode, 'embed')}
                    className="shrink-0 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    {copiedEmbed ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  將此代碼貼到網頁中以嵌入圖表
                </p>
              </div>

              {/* 提示訊息 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  動態快照會顯示 Notion 資料庫的最新內容，適合經常更新的資料。
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">點擊分享按鈕生成分享連結</p>
              <Button 
                onClick={handleShare} 
                disabled={isSharing || !chartData.length}
                className="bg-black hover:bg-gray-800 text-white"
              >
                {isSharing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  '生成分享連結'
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
