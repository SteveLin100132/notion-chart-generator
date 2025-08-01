'use client'

import React from 'react'
import { Modal } from '@/components/ui/modal'
import { QueryBuilder, FilterGroup } from '@/components/query-builder'
import { DatabaseProperty } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Filter, Save, RotateCcw } from 'lucide-react'

interface QueryBuilderModalProps {
  isOpen: boolean
  onClose: () => void
  properties: DatabaseProperty[]
  filterGroups: FilterGroup[]
  onFilterGroupsChange: (groups: FilterGroup[]) => void
}

export const QueryBuilderModal: React.FC<QueryBuilderModalProps> = ({
  isOpen,
  onClose,
  properties,
  filterGroups,
  onFilterGroupsChange
}) => {
  const [localFilterGroups, setLocalFilterGroups] = React.useState<FilterGroup[]>(filterGroups)

  // 當 modal 打開時，同步當前的篩選條件
  React.useEffect(() => {
    if (isOpen) {
      setLocalFilterGroups(filterGroups)
    }
  }, [isOpen, filterGroups])

  const handleSave = () => {
    onFilterGroupsChange(localFilterGroups)
    onClose()
  }

  const handleCancel = () => {
    setLocalFilterGroups(filterGroups) // 恢復原始狀態
    onClose()
  }

  const handleReset = () => {
    setLocalFilterGroups([])
  }

  const hasChanges = JSON.stringify(localFilterGroups) !== JSON.stringify(filterGroups)
  const hasFilters = localFilterGroups.length > 0

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="進階篩選設定"
      size="xl"
    >
      <div className="space-y-6">
        {/* 說明區塊 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Filter className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">
                篩選條件說明
              </h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• 建立多個篩選組，每組內可包含多個條件</li>
                <li>• 組之間使用 AND 邏輯連接，組內條件可選擇 AND 或 OR</li>
                <li>• 根據屬性類型自動提供適合的運算符</li>
                <li>• 設定完成後點擊「套用篩選」來儲存條件</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Query Builder */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <QueryBuilder
            properties={properties}
            value={localFilterGroups}
            onChange={setLocalFilterGroups}
          />
        </div>

        {/* 篩選狀態提示 */}
        {hasFilters && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-green-800">
              <Filter className="h-4 w-4" />
              <span>
                目前共有 {localFilterGroups.length} 個篩選組，
                包含 {localFilterGroups.reduce((total, group) => total + group.conditions.length, 0)} 個條件
              </span>
            </div>
          </div>
        )}

        {/* 操作按鈕 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex gap-2">
            {hasFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                清除所有篩選
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              取消
            </Button>
            <Button
              onClick={handleSave}
              className="bg-black hover:bg-gray-800 text-white"
              disabled={!hasChanges && hasFilters === (filterGroups.length > 0)}
            >
              <Save className="h-4 w-4 mr-1" />
              套用篩選 {hasFilters ? `(${localFilterGroups.length})` : ''}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
