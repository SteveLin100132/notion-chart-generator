'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { DayPicker } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { zhTW } from 'date-fns/locale'

interface DatePickerProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "選擇日期",
  className
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value || '')
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const inputRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 解析日期字符串為 Date 對象
  const parseDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined
    const date = new Date(dateString + 'T00:00:00')
    return isNaN(date.getTime()) ? undefined : date
  }

  // 將 Date 對象格式化為 YYYY-MM-DD 字符串
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const selectedDate = parseDate(inputValue)

  // 計算下拉選單位置
  const calculatePosition = () => {
    if (!inputRef.current) return

    const rect = inputRef.current.getBoundingClientRect()
    const scrollY = window.pageYOffset || document.documentElement.scrollTop
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft

    setDropdownPosition({
      top: rect.bottom + scrollY + 4,
      left: rect.left + scrollX,
      width: rect.width
    })
  }

  // 處理開關下拉選單
  const toggleDropdown = () => {
    if (!isOpen) {
      calculatePosition()
    }
    setIsOpen(!isOpen)
  }

  // 監聽視窗大小變化和滾動，重新計算位置
  useEffect(() => {
    if (!isOpen) return

    const handleResize = () => calculatePosition()
    const handleScroll = () => calculatePosition()

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, true)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [isOpen])

  // 處理點擊外部區域關閉下拉選單
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      
      // 檢查點擊是否在輸入框或下拉選單內
      if (
        inputRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return
      }
      
      setIsOpen(false)
    }

    // 延遲添加事件監聽器，避免立即觸發
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 0)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleDaySelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = formatDate(date)
      setInputValue(formattedDate)
      onChange?.(formattedDate)
    } else {
      setInputValue('')
      onChange?.('')
    }
    setIsOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange?.(newValue)
  }

  const handleClear = () => {
    setInputValue('')
    onChange?.('')
  }

  const handleToday = () => {
    const today = formatDate(new Date())
    setInputValue(today)
    onChange?.(today)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={inputRef}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className={cn("pr-8", className)}
          onClick={toggleDropdown}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
          onClick={toggleDropdown}
        >
          <Calendar className="h-4 w-4 text-gray-500" />
        </Button>
      </div>

      {/* 使用 Portal 渲染到 body，避免被 modal 裁切 */}
      {isOpen && typeof window !== 'undefined' && createPortal(
        <>          
          {/* 日期選擇器 */}
          <div 
            ref={dropdownRef}
            className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              minWidth: Math.max(dropdownPosition.width, 320)
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleToday}
                className="text-xs h-8 px-3"
              >
                今天
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                className="text-xs h-8 px-3 text-red-600 border-red-200 hover:bg-red-50"
              >
                清除
              </Button>
            </div>
            
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDaySelect}
              showOutsideDays={true}
              locale={zhTW}
              captionLayout="dropdown"
              fromYear={1900}
              toYear={2100}
            />
          </div>
        </>,
        document.body
      )}
    </div>
  )
}
