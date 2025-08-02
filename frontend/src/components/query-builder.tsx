'use client'

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MultiSelectDropdown } from "@/components/ui/multi-select-dropdown";
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
import { DatabaseProperty } from '@/lib/store'
import { Plus, X, Trash2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge";
import { getAllFilterErrors } from '@/lib/filter-validation'

// 重新導出驗證函數以保持向後兼容
export { getAllFilterErrors, hasFilterErrors, validateFilterCondition } from '@/lib/filter-validation'

// Notion 顏色對應表，與 Notion 的實際顏色保持一致
const NOTION_COLORS: { [key: string]: string } = {
  // 基本顏色 - 根據 Notion 官方顏色調色板
  default: '#f2f1ef',
  gray: '#9B9A97',
  brown: '#64473A',
  orange: '#D9730D',
  yellow: '#DFAB01',
  green: '#0F7B6C',
  blue: '#0B6E99',
  purple: '#6940A5',
  pink: '#AD1A72',
  red: '#E03E3E',
  
  // 中文顏色名稱映射
  '灰色': '#9B9A97',
  '棕色': '#64473A',
  '橙色': '#D9730D',
  '黃色': '#DFAB01',
  '綠色': '#0F7B6C',
  '藍色': '#0B6E99',
  '紫色': '#6940A5',
  '粉色': '#AD1A72',
  '紅色': '#E03E3E',
  
  // 特殊狀態顏色（通常用於 status 屬性）
  'Not started': '#9B9A97',
  'In progress': '#0B6E99',
  'Done': '#0F7B6C',
  'Canceled': '#AD1A72',
  '未開始': '#9B9A97',
  '進行中': '#0B6E99',
  '已完成': '#0F7B6C',
  '已取消': '#AD1A72',
}

// 取得 Notion 顏色的 CSS 值
const getNotionColor = (colorName: string): string => {
  if (!colorName) return NOTION_COLORS.default
  return NOTION_COLORS[colorName] || NOTION_COLORS.default
}

// 條件運算符定義
export interface OperatorConfig {
  value: string
  label: string
  hasValue: boolean
  allowedTypes: string[]
}

// 針對不同屬性類型的運算符配置
const OPERATORS: { [key: string]: OperatorConfig[] } = {
  // 數字類型運算符
  number: [
    { value: 'equals', label: '等於 (=)', hasValue: true, allowedTypes: ['number'] },
    { value: 'does_not_equal', label: '不等於 (≠)', hasValue: true, allowedTypes: ['number'] },
    { value: 'greater_than', label: '大於 (>)', hasValue: true, allowedTypes: ['number'] },
    { value: 'less_than', label: '小於 (<)', hasValue: true, allowedTypes: ['number'] },
    { value: 'greater_than_or_equal_to', label: '大於等於 (≥)', hasValue: true, allowedTypes: ['number'] },
    { value: 'less_than_or_equal_to', label: '小於等於 (≤)', hasValue: true, allowedTypes: ['number'] },
    { value: 'is_empty', label: '為空', hasValue: false, allowedTypes: ['number'] },
    { value: 'is_not_empty', label: '不為空', hasValue: false, allowedTypes: ['number'] },
  ],
  
  // 文字類型運算符
  text: [
    { value: 'equals', label: '等於', hasValue: true, allowedTypes: ['text'] },
    { value: 'does_not_equal', label: '不等於', hasValue: true, allowedTypes: ['text'] },
    { value: 'contains', label: '包含', hasValue: true, allowedTypes: ['text'] },
    { value: 'does_not_contain', label: '不包含', hasValue: true, allowedTypes: ['text'] },
    { value: 'starts_with', label: '開始於', hasValue: true, allowedTypes: ['text'] },
    { value: 'ends_with', label: '結束於', hasValue: true, allowedTypes: ['text'] },
    { value: 'is_empty', label: '為空', hasValue: false, allowedTypes: ['text'] },
    { value: 'is_not_empty', label: '不為空', hasValue: false, allowedTypes: ['text'] },
  ],

  // 選擇類型運算符
  select: [
    { value: 'equals', label: '等於', hasValue: true, allowedTypes: ['select'] },
    { value: 'does_not_equal', label: '不等於', hasValue: true, allowedTypes: ['select'] },
    { value: 'contains', label: '包含', hasValue: true, allowedTypes: ['select'] },
    { value: 'does_not_contain', label: '不包含', hasValue: true, allowedTypes: ['select'] },
    { value: 'is_empty', label: '為空', hasValue: false, allowedTypes: ['select'] },
    { value: 'is_not_empty', label: '不為空', hasValue: false, allowedTypes: ['select'] },
  ],
  
  // 多選類型運算符
  multi_select: [
    { value: 'contains', label: '包含', hasValue: true, allowedTypes: ['multi_select'] },
    { value: 'does_not_contain', label: '不包含', hasValue: true, allowedTypes: ['multi_select'] },
    { value: 'is_empty', label: '為空', hasValue: false, allowedTypes: ['multi_select'] },
    { value: 'is_not_empty', label: '不為空', hasValue: false, allowedTypes: ['multi_select'] },
  ],
  
  // 日期類型運算符
  date: [
    { value: 'equals', label: '等於', hasValue: true, allowedTypes: ['date'] },
    { value: 'before', label: '早於', hasValue: true, allowedTypes: ['date'] },
    { value: 'after', label: '晚於', hasValue: true, allowedTypes: ['date'] },
    { value: 'on_or_before', label: '不晚於', hasValue: true, allowedTypes: ['date'] },
    { value: 'on_or_after', label: '不早於', hasValue: true, allowedTypes: ['date'] },
    { value: 'between', label: '介於', hasValue: true, allowedTypes: ['date'] },
    { value: 'past_week', label: '過去一週', hasValue: false, allowedTypes: ['date'] },
    { value: 'past_month', label: '過去一個月', hasValue: false, allowedTypes: ['date'] },
    { value: 'past_year', label: '過去一年', hasValue: false, allowedTypes: ['date'] },
    { value: 'is_empty', label: '為空', hasValue: false, allowedTypes: ['date'] },
    { value: 'is_not_empty', label: '不為空', hasValue: false, allowedTypes: ['date'] },
  ],
  
  // 勾選方塊類型運算符
  checkbox: [
    { value: 'equals', label: '等於', hasValue: true, allowedTypes: ['checkbox'] },
    { value: 'does_not_equal', label: '不等於', hasValue: true, allowedTypes: ['checkbox'] },
  ],

  // 狀態類型運算符
  status: [
    { value: 'equals', label: '等於', hasValue: true, allowedTypes: ['status'] },
    { value: 'does_not_equal', label: '不等於', hasValue: true, allowedTypes: ['status'] },
    { value: 'is_empty', label: '為空', hasValue: false, allowedTypes: ['status'] },
    { value: 'is_not_empty', label: '不為空', hasValue: false, allowedTypes: ['status'] },
  ],
}

// 篩選條件介面
export interface FilterCondition {
  id: string
  property: string
  operator: string
  value?: string | number | boolean
  endValue?: string | number // 為 between 運算符添加結束值
  logicalOperator?: 'and' | 'or'
}

// 篩選組介面（支援嵌套子群組）
export interface FilterGroup {
  id: string
  conditions: FilterCondition[]
  subgroups?: FilterGroup[] // 新增子群組支援
  logicalOperator: 'and' | 'or'
}

// Query Builder 組件屬性
interface QueryBuilderProps {
  properties: DatabaseProperty[]
  value?: FilterGroup[]
  onChange?: (filters: FilterGroup[]) => void
  className?: string
}

export const QueryBuilder: React.FC<QueryBuilderProps> = ({
  properties,
  value = [],
  onChange,
  className = '',
}) => {
  // 創建新的篩選條件
  const createNewCondition = useCallback((): FilterCondition => {
    return {
      id: `condition_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      property: '',
      operator: '',
      value: '',
    }
  }, [])

  // 創建新的篩選組
  const createNewGroup = useCallback((): FilterGroup => {
    return {
      id: `group_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      conditions: [createNewCondition()],
      subgroups: [], // 初始化子群組為空陣列
      logicalOperator: 'and',
    }
  }, [createNewCondition])

  const [groups, setGroups] = useState<FilterGroup[]>(value.length > 0 ? value : [createNewGroup()])

  // 監聽外部 value 變化並同步內部狀態
  React.useEffect(() => {
    if (value.length === 0) {
      // 當外部清空篩選條件時，重置為一個空的篩選組
      setGroups([createNewGroup()])
    } else {
      // 當外部有篩選條件時，同步更新
      setGroups(value)
    }
  }, [value, createNewGroup])

  // 根據屬性類型獲取可用的運算符
  const getOperatorsForProperty = useCallback((propertyName: string): OperatorConfig[] => {
    const property = properties.find(p => p.name === propertyName);
    // 若找不到 property，但 propertyName 字串包含 multi_select，仍回傳 multi_select 運算子
    if (!property) {
      if (propertyName && propertyName.toLowerCase().includes('multi_select')) {
        return OPERATORS.multi_select;
      }
      return OPERATORS.text;
    }

    switch (property.type) {
      case 'number':
      case 'formula':
      case 'rollup':
        return OPERATORS.number;
      case 'title':
      case 'rich_text':
        return OPERATORS.text;
      case 'select':
        return OPERATORS.select;
      case 'multi_select':
        return OPERATORS.multi_select;
      case 'date':
        return OPERATORS.date;
      case 'checkbox':
        return OPERATORS.checkbox;
      case 'status':
        return OPERATORS.status;
      default:
        return OPERATORS.text;
    }
  }, [properties])

  // 更新組並通知父組件
  const updateGroups = useCallback((newGroups: FilterGroup[]) => {
    setGroups(newGroups)
    onChange?.(newGroups)
  }, [onChange])

  // 添加新的篩選組
  const addGroup = useCallback(() => {
    const newGroups = [...groups, createNewGroup()]
    updateGroups(newGroups)
  }, [groups, updateGroups, createNewGroup])

  // 刪除篩選組
  const removeGroup = useCallback((groupId: string) => {
    if (groups.length <= 1) return // 至少保留一個組
    const newGroups = groups.filter(g => g.id !== groupId)
    updateGroups(newGroups)
  }, [groups, updateGroups])


  // 添加條件到組
  const addConditionToGroup = useCallback((groupId: string) => {
    const newGroups = groups.map(group =>
      group.id === groupId
        ? { ...group, conditions: [...group.conditions, createNewCondition()] }
        : group
    )
    updateGroups(newGroups)
  }, [groups, updateGroups, createNewCondition])

  // 從組中刪除條件
  const removeConditionFromGroup = useCallback((groupId: string, conditionId: string) => {
    const newGroups = groups.map(group => {
      if (group.id === groupId) {
        const newConditions = group.conditions.filter(c => c.id !== conditionId)
        // 至少保留一個條件
        return {
          ...group,
          conditions: newConditions.length > 0 ? newConditions : [createNewCondition()]
        }
      }
      return group
    })
    updateGroups(newGroups)
  }, [groups, updateGroups, createNewCondition])

  // 更新條件
  const updateCondition = useCallback((
    groupId: string,
    conditionId: string,
    updates: Partial<FilterCondition>
  ) => {
    const updateGroupRecursively = (group: FilterGroup): FilterGroup => {
      if (group.id === groupId) {
        return {
          ...group,
          conditions: group.conditions.map(condition =>
            condition.id === conditionId
              ? { ...condition, ...updates }
              : condition
          )
        }
      }
      
      // 遞歸檢查子群組
      if (group.subgroups && group.subgroups.length > 0) {
        const updatedSubgroups = group.subgroups.map(updateGroupRecursively)
        if (updatedSubgroups.some((sg, index) => sg !== group.subgroups![index])) {
          return { ...group, subgroups: updatedSubgroups }
        }
      }
      
      return group
    }

    const newGroups = groups.map(updateGroupRecursively)
    updateGroups(newGroups)
  }, [groups, updateGroups])

  // 添加子群組到指定群組
  const addSubgroupToGroup = useCallback((parentGroupId: string) => {
    const addSubgroupRecursively = (group: FilterGroup): FilterGroup => {
      if (group.id === parentGroupId) {
        return {
          ...group,
          subgroups: [...(group.subgroups || []), createNewGroup()]
        }
      }
      
      // 遞歸檢查子群組
      if (group.subgroups && group.subgroups.length > 0) {
        const updatedSubgroups = group.subgroups.map(addSubgroupRecursively)
        if (updatedSubgroups.some((sg, index) => sg !== group.subgroups![index])) {
          return { ...group, subgroups: updatedSubgroups }
        }
      }
      
      return group
    }

    const newGroups = groups.map(addSubgroupRecursively)
    updateGroups(newGroups)
  }, [groups, updateGroups, createNewGroup])

  // 從群組中刪除子群組
  const removeSubgroupFromGroup = useCallback((parentGroupId: string, subgroupId: string) => {
    const removeSubgroupRecursively = (group: FilterGroup): FilterGroup => {
      if (group.id === parentGroupId) {
        return {
          ...group,
          subgroups: group.subgroups?.filter(sg => sg.id !== subgroupId) || []
        }
      }
      
      // 遞歸檢查子群組
      if (group.subgroups && group.subgroups.length > 0) {
        const updatedSubgroups = group.subgroups.map(removeSubgroupRecursively)
        if (updatedSubgroups.some((sg, index) => sg !== group.subgroups![index])) {
          return { ...group, subgroups: updatedSubgroups }
        }
      }
      
      return group
    }

    const newGroups = groups.map(removeSubgroupRecursively)
    updateGroups(newGroups)
  }, [groups, updateGroups])

  // 遞歸更新子群組的邏輯運算符
  const updateSubgroupLogicalOperator = useCallback((subgroupId: string, operator: 'and' | 'or') => {
    const updateSubgroupRecursively = (group: FilterGroup): FilterGroup => {
      if (group.id === subgroupId) {
        return { ...group, logicalOperator: operator }
      }
      
      // 遞歸檢查子群組
      if (group.subgroups && group.subgroups.length > 0) {
        const updatedSubgroups = group.subgroups.map(updateSubgroupRecursively)
        if (updatedSubgroups.some((sg, index) => sg !== group.subgroups![index])) {
          return { ...group, subgroups: updatedSubgroups }
        }
      }
      
      return group
    }

    const newGroups = groups.map(updateSubgroupRecursively)
    updateGroups(newGroups)
  }, [groups, updateGroups])

  // 遞歸添加條件到子群組
  const addConditionToSubgroup = useCallback((subgroupId: string) => {
    const addConditionRecursively = (group: FilterGroup): FilterGroup => {
      if (group.id === subgroupId) {
        return {
          ...group,
          conditions: [...group.conditions, createNewCondition()]
        }
      }
      
      // 遞歸檢查子群組
      if (group.subgroups && group.subgroups.length > 0) {
        const updatedSubgroups = group.subgroups.map(addConditionRecursively)
        if (updatedSubgroups.some((sg, index) => sg !== group.subgroups![index])) {
          return { ...group, subgroups: updatedSubgroups }
        }
      }
      
      return group
    }

    const newGroups = groups.map(addConditionRecursively)
    updateGroups(newGroups)
  }, [groups, updateGroups, createNewCondition])

  // 遞歸從子群組中刪除條件
  const removeConditionFromSubgroup = useCallback((subgroupId: string, conditionId: string) => {
    const removeConditionRecursively = (group: FilterGroup): FilterGroup => {
      if (group.id === subgroupId) {
        const newConditions = group.conditions.filter(c => c.id !== conditionId)
        return {
          ...group,
          conditions: newConditions.length > 0 ? newConditions : [createNewCondition()]
        }
      }
      
      // 遞歸檢查子群組
      if (group.subgroups && group.subgroups.length > 0) {
        const updatedSubgroups = group.subgroups.map(removeConditionRecursively)
        if (updatedSubgroups.some((sg, index) => sg !== group.subgroups![index])) {
          return { ...group, subgroups: updatedSubgroups }
        }
      }
      
      return group
    }

    const newGroups = groups.map(removeConditionRecursively)
    updateGroups(newGroups)
  }, [groups, updateGroups, createNewCondition])

  // 渲染值輸入框
  const renderValueInput = useCallback((condition: FilterCondition, groupId: string) => {
    const property = properties.find(p => p.name === condition.property);
    // select/multi_select: 僅在 contains/does_not_contain 時顯示多選下拉
    if (property && (property.type === 'multi_select' || property.type === 'select')) {
      const multiSelectOps = ['contains', 'does_not_contain'];
      let op = condition.operator;
      if (!op) {
        // 自動補 operator
        op = 'contains';
        setTimeout(() => updateCondition(groupId, condition.id, { operator: 'contains' }), 0);
      }
      // select/multi_select: 包含/不包含時顯示多選，其餘顯示單選
      if (multiSelectOps.includes(op)) {
        // 確保 value 為陣列且型別正確
        let selectedValues: string[] = [];
        if (Array.isArray(condition.value)) {
          selectedValues = condition.value.filter((v): v is string => typeof v === 'string');
        } else if (typeof condition.value === 'string') {
          selectedValues = [condition.value];
        } else if (condition.value == null) {
          selectedValues = [];
        }
        // options 型別安全
        const options = Array.isArray((property as any)?.options) ? (property as any).options : [];
        return (
          <div style={{ maxWidth: 320 }}>
            <MultiSelectDropdown
              options={options}
              selectedValues={selectedValues}
              onChange={vals => updateCondition(groupId, condition.id, { value: vals as any })}
              tagContainerClassName="flex flex-nowrap overflow-hidden whitespace-nowrap gap-1 max-w-full"
            />
          </div>
        );
      } else if (property.type === 'select') {
        // 其餘 select 顯示單選
        return (
          <Select
            value={condition.value as string || ''}
            onValueChange={(value) => updateCondition(groupId, condition.id, { value })}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="選擇選項">
                {condition.value && property?.options?.find(option => option.name === condition.value) && (
                  <Badge 
                    text={condition.value as string} 
                    color={property.options.find(option => option.name === condition.value)?.color}
                    size="sm"
                  />
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="max-w-xs">
              {property?.options?.map((option) => (
                <SelectItem key={option.id} value={option.name} className="max-w-full">
                  <div className="flex items-center space-x-2 min-w-0 max-w-full">
                    <Badge 
                      text={option.name} 
                      color={option.color}
                      size="sm"
                    />
                  </div>
                </SelectItem>
              )) || (
                <SelectItem value="" disabled>
                  無可用選項
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        );
      }
    }
    // 其餘型別
    const operator = getOperatorsForProperty(condition.property).find(op => op.value === condition.operator);
    if (!operator?.hasValue) return null;

    switch (property?.type) {
      case 'number':
      case 'formula':
      case 'rollup':
        return (
          <Input
            type="number"
            placeholder="輸入數值"
            value={condition.value as string || ''}
            onChange={(e) => updateCondition(groupId, condition.id, { value: parseFloat(e.target.value) || 0 })}
            className="w-32"
          />
        );
      case 'checkbox':
        return (
          <Select
            value={String(condition.value)}
            onValueChange={(value) => updateCondition(groupId, condition.id, { value: value === 'true' })}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="選擇值" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">是</SelectItem>
              <SelectItem value="false">否</SelectItem>
            </SelectContent>
          </Select>
        );
      case 'select':
      case 'status':
        return (
          <Select
            value={condition.value as string || ''}
            onValueChange={(value) => updateCondition(groupId, condition.id, { value })}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="選擇選項">
                {condition.value && property?.options?.find(option => option.name === condition.value) && (
                  <Badge 
                    text={condition.value as string} 
                    color={property.options.find(option => option.name === condition.value)?.color}
                    size="sm"
                  />
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="max-w-xs">
              {property?.options?.map((option) => (
                <SelectItem key={option.id} value={option.name} className="max-w-full">
                  <div className="flex items-center space-x-2 min-w-0 max-w-full">
                    <Badge 
                      text={option.name} 
                      color={option.color}
                      size="sm"
                    />
                  </div>
                </SelectItem>
              )) || (
                <SelectItem value="" disabled>
                  無可用選項
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        );
      case 'date':
        if (condition.operator === 'between') {
          // 檢查結束日期不可早於開始日期
          const start = condition.value ? new Date(condition.value as string) : null;
          const end = condition.endValue ? new Date(condition.endValue as string) : null;
          const invalid = start && end && end < start;
          return (
            <div className="flex items-center space-x-2">
              <DatePicker
                value={condition.value as string || ''}
                onChange={(value) => {
                  // 若新的開始日期大於目前結束日期，則自動清空結束日期
                  if (condition.endValue && value && new Date(value) > new Date(condition.endValue as string)) {
                    updateCondition(groupId, condition.id, { value, endValue: '' });
                  } else {
                    updateCondition(groupId, condition.id, { value });
                  }
                }}
                placeholder="開始日期"
                className="w-36"
              />
              <span className="text-sm text-gray-500">至</span>
              <DatePicker
                value={condition.endValue as string || ''}
                onChange={(value) => {
                  // 允許設置任何日期，讓驗證邏輯處理錯誤
                  updateCondition(groupId, condition.id, { endValue: value });
                }}
                placeholder="結束日期"
                className="w-36"
              />
              {invalid && (
                <span className="text-xs text-red-500 ml-2">結束日期不能早於開始日期</span>
              )}
            </div>
          );
        }
        return (
          <DatePicker
            value={condition.value as string || ''}
            onChange={(value) => updateCondition(groupId, condition.id, { value })}
            placeholder="選擇日期"
            className="w-40"
          />
        );
      default:
        return (
          <Input
            placeholder="輸入值"
            value={condition.value as string || ''}
            onChange={(e) => updateCondition(groupId, condition.id, { value: e.target.value })}
            className="w-48"
          />
        );
    }
  }, [properties, getOperatorsForProperty, updateCondition]);

  // 遞歸渲染群組（支援子群組）
  const renderGroup = useCallback((group: FilterGroup, groupIndex: number, isSubgroup: boolean = false, parentGroupId?: string) => {
    return (
      <div key={group.id} className={`border rounded-lg p-4 ${isSubgroup ? 'border-gray-300 bg-gray-25 ml-6' : 'border-gray-200 bg-gray-50'}`}>
        {/* 組標題和控制項 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Select
              value={group.logicalOperator}
              onValueChange={(value: 'and' | 'or') => 
                isSubgroup 
                  ? updateSubgroupLogicalOperator(group.id, value)
                  : updateGroups(groups.map(g => g.id === group.id ? { ...g, logicalOperator: value } : g))
              }
            >
              <SelectTrigger className="w-16 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="and">AND</SelectItem>
                <SelectItem value="or">OR</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-xs text-gray-500">
              {isSubgroup ? `子群組 ${groupIndex + 1}` : `群組 ${groupIndex + 1}`}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => 
                isSubgroup 
                  ? addConditionToSubgroup(group.id)
                  : addConditionToGroup(group.id)
              }
              className="h-7 text-xs"
            >
              <Plus className="h-3 w-3 mr-1" />
              條件
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addSubgroupToGroup(group.id)}
              className="h-7 text-xs"
            >
              <Plus className="h-3 w-3 mr-1" />
              子群組
            </Button>
            {((!isSubgroup && groups.length > 1) || (isSubgroup && parentGroupId)) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => 
                  isSubgroup && parentGroupId
                    ? removeSubgroupFromGroup(parentGroupId, group.id)
                    : removeGroup(group.id)
                }
                className="h-7 text-xs text-red-600 hover:text-red-700"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {/* 條件列表 */}
        <div className="space-y-2">
          {group.conditions.map((condition, conditionIndex) => (
            <div key={condition.id} className="flex items-center space-x-2 bg-white p-2 rounded border">
              {/* 邏輯運算符（第一個條件不顯示） */}
              {conditionIndex > 0 && (
                <div className="w-12 text-center">
                  <span className="text-xs font-medium text-gray-600">
                    {group.logicalOperator.toUpperCase()}
                  </span>
                </div>
              )}

              {/* 屬性選擇 */}
              <Select
                value={condition.property}
                onValueChange={(value) => updateCondition(group.id, condition.id, { 
                  property: value, 
                  operator: '', 
                  value: '' 
                })}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="選擇屬性" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((prop) => (
                    <SelectItem key={prop.name} value={prop.name} type={prop.type}>
                      {prop.name} ({prop.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* 運算符選擇 */}
              <Select
                value={
                  (() => {
                    const property = properties.find(p => p.name === condition.property);
                    if (property?.type === 'multi_select') {
                      return condition.operator || 'contains';
                    }
                    return condition.operator;
                  })()
                }
                onValueChange={(value) => updateCondition(group.id, condition.id, { 
                  operator: value, 
                  value: '' 
                })}
                disabled={!condition.property}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="選擇條件" />
                </SelectTrigger>
                <SelectContent>
                  {getOperatorsForProperty(condition.property).map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* 值輸入 */}
              {renderValueInput(condition, group.id)}

              {/* 刪除條件按鈕 */}
              {group.conditions.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => 
                    isSubgroup 
                      ? removeConditionFromSubgroup(group.id, condition.id)
                      : removeConditionFromGroup(group.id, condition.id)
                  }
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* 子群組 */}
        {group.subgroups && group.subgroups.length > 0 && (
          <div className="mt-4 space-y-3">
            <div className="text-xs text-gray-500 font-medium">子群組</div>
            {group.subgroups.map((subgroup, subgroupIndex) => (
              renderGroup(subgroup, subgroupIndex, true, group.id)
            ))}
          </div>
        )}
      </div>
    )
  }, [
    groups, 
    properties, 
    updateGroups,
    updateSubgroupLogicalOperator,
    addConditionToGroup,
    addConditionToSubgroup,
    addSubgroupToGroup,
    removeGroup,
    removeSubgroupFromGroup,
    removeConditionFromGroup,
    removeConditionFromSubgroup,
    updateCondition,
    getOperatorsForProperty,
    renderValueInput
  ])

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">進階篩選條件</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={addGroup}
          className="text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          新增群組
        </Button>
      </div>

      <div className="space-y-3">
        {groups.map((group, groupIndex) => renderGroup(group, groupIndex))}
      </div>
    </div>
  )
}

// 工具函數：將QueryBuilder的輸出轉換為Notion API的filter格式
export const convertToNotionFilter = (groups: FilterGroup[], properties: DatabaseProperty[] = []): any => {
  if (groups.length === 0) return undefined;

  // 屬性型別對應 Notion API
  const getPropertyTypeForFilter = (propertyName: string): string => {
    const property = properties.find(p => p.name === propertyName);
    if (!property) return 'rich_text';
    switch (property.type) {
      case 'title': return 'title';
      case 'rich_text': return 'rich_text';
      case 'number':
      case 'formula':
      case 'rollup': return 'number';
      case 'select': return 'select';
      case 'multi_select': return 'multi_select';
      case 'status': return 'status';
      case 'date': return 'date';
      case 'checkbox': return 'checkbox';
      default: return 'rich_text';
    }
  };

  // 單一條件轉換
  const convertCondition = (condition: FilterCondition): any => {
    const { property, operator, value } = condition;
    if (!property || !operator) return null;
    // select 欄位複選: 轉換為 or/and equals/does_not_equal 子條件
    const propertyType = getPropertyTypeForFilter(property);
    if (propertyType === 'select' && (operator === 'contains' || operator === 'does_not_contain') && Array.isArray(value)) {
      // contains: or [equals]
      // does_not_contain: and [does_not_equal]
      const subOperator = operator === 'contains' ? 'equals' : 'does_not_equal';
      const logic = operator === 'contains' ? 'or' : 'and';
      const subFilters = value.map((v) => ({
        property,
        [propertyType]: { [subOperator]: v }
      }));
      return { [logic]: subFilters };
    }
    // 其餘型別
    const filterValue: any = {};
    switch (operator) {
      case 'equals': filterValue.equals = value; break;
      case 'does_not_equal': filterValue.does_not_equal = value; break;
      case 'contains': filterValue.contains = value; break;
      case 'does_not_contain': filterValue.does_not_contain = value; break;
      case 'starts_with': filterValue.starts_with = value; break;
      case 'ends_with': filterValue.ends_with = value; break;
      case 'greater_than': filterValue.greater_than = value; break;
      case 'less_than': filterValue.less_than = value; break;
      case 'greater_than_or_equal_to': filterValue.greater_than_or_equal_to = value; break;
      case 'less_than_or_equal_to': filterValue.less_than_or_equal_to = value; break;
      case 'is_empty': filterValue.is_empty = true; break;
      case 'is_not_empty': filterValue.is_not_empty = true; break;
      case 'before': filterValue.before = value; break;
      case 'after': filterValue.after = value; break;
      case 'on_or_before': filterValue.on_or_before = value; break;
      case 'on_or_after': filterValue.on_or_after = value; break;
      case 'past_week': filterValue.past_week = {}; break;
      case 'past_month': filterValue.past_month = {}; break;
      case 'past_year': filterValue.past_year = {}; break;
      case 'between':
        if (condition.value && condition.endValue) {
          return {
            and: [
              {
                property,
                [getPropertyTypeForFilter(property)]: { on_or_after: condition.value }
              },
              {
                property,
                [getPropertyTypeForFilter(property)]: { on_or_before: condition.endValue }
              }
            ]
          };
        }
        return null;
    }
    return {
      property,
      [getPropertyTypeForFilter(property)]: filterValue
    };
  };

  // 遞迴展平同類型 compound（僅展平同名 and/or，不跨層）
  function flattenSameCompound(obj: any): any {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (Array.isArray(obj)) return obj.map(flattenSameCompound);
    if (obj.and || obj.or) {
      const key = obj.and ? 'and' : 'or';
      let arr = (obj[key] as any[]).map(flattenSameCompound);
      // 展平同名 compound
      arr = arr.flatMap(item => (item && item[key]) ? item[key] : [item]);
      return { [key]: arr };
    }
    return obj;
  }

  // 單一組轉換（遞迴處理子群組）
  const convertGroup = (group: FilterGroup): any => {
    const validConditions = group.conditions.map(convertCondition).filter(Boolean);
    const validSubgroups = group.subgroups ? group.subgroups.map(convertGroup).filter(Boolean) : [];
    const allItems = [...validConditions, ...validSubgroups];
    if (allItems.length === 0) return null;
    if (allItems.length === 1) return allItems[0];
    return { [group.logicalOperator]: allItems };
  };

  // 轉換所有組
  const validGroups = groups.map(convertGroup).filter(Boolean);
  if (validGroups.length === 0) return undefined;
  if (validGroups.length === 1) return flattenSameCompound(validGroups[0]);

  // 多組時，頂層只包一層 and，且展平同名 compound
  return flattenSameCompound({ and: validGroups });
}
