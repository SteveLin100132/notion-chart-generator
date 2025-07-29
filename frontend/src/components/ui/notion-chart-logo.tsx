import React from 'react'

interface NotionChartLogoProps {
  className?: string
  size?: number
}

export const NotionChartLogo: React.FC<NotionChartLogoProps> = ({ 
  className = "", 
  size = 64 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Notion 風格的頁面背景 */}
      <rect
        x="8"
        y="12"
        width="48"
        height="44"
        rx="4"
        fill="#f8f9fa"
        stroke="#e9ecef"
        strokeWidth="1.5"
      />
      
      {/* 頁面左上角的圓點（Notion 特色） */}
      <circle cx="14" cy="18" r="2" fill="#6c757d" />
      <circle cx="20" cy="18" r="2" fill="#6c757d" />
      <circle cx="26" cy="18" r="2" fill="#6c757d" />
      
      {/* 圖表元素 - 柱狀圖 */}
      <rect x="14" y="36" width="6" height="12" rx="1" fill="#2c2c2c" />
      <rect x="22" y="30" width="6" height="18" rx="1" fill="#404040" />
      <rect x="30" y="33" width="6" height="15" rx="1" fill="#595959" />
      <rect x="38" y="27" width="6" height="21" rx="1" fill="#737373" />
      <rect x="46" y="39" width="6" height="9" rx="1" fill="#8c8c8c" />
      
      {/* 趨勢線（連接柱狀圖頂部） */}
      <path
        d="M17 36 L25 30 L33 33 L41 27 L49 39"
        stroke="#000000"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 數據點 */}
      <circle cx="17" cy="36" r="2" fill="#000000" />
      <circle cx="25" cy="30" r="2" fill="#000000" />
      <circle cx="33" cy="33" r="2" fill="#000000" />
      <circle cx="41" cy="27" r="2" fill="#000000" />
      <circle cx="49" cy="39" r="2" fill="#000000" />
      
      {/* Notion 風格的頁面摺角 */}
      <path
        d="M48 12 L56 12 L56 20 L48 12"
        fill="#dee2e6"
        stroke="#e9ecef"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default NotionChartLogo
