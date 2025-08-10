import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  MagnifyingGlassIcon, 
  ShareIcon, 
  ArrowDownTrayIcon, 
  TableCellsIcon, 
  CameraIcon 
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';

// Query Builder Wireframe Component
const QueryBuilderWireframe: React.FC = () => {
  return (
    <div className="relative w-full h-56 p-2">
      {/* Query Builder Container */}
      <div className="w-full h-full border border-gray-300 rounded-lg bg-white overflow-hidden">
        {/* Title Bar */}
        <div className="h-9 bg-gray-50 border-b border-gray-200 px-3 flex items-center">
          <div className="h-2.5 w-24 bg-gray-300 rounded"></div>
        </div>
        
        {/* Content Area */}
        <div className="p-4 space-y-4">
          {/* Filter Row 1 */}
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 text-xs text-amber-600 bg-amber-100 border border-amber-300 px-2 py-1 rounded text-center font-medium w-[36px]">
              AND
            </div>
            <div className="flex items-center gap-2 flex-1">
              <div className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600 w-[65px] text-center">
                Property
              </div>
              <div className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600 w-[55px] text-center">
                equals
              </div>
              <div className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600 flex-1 text-center">
                Value
              </div>
              <button className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                ×
              </button>
            </div>
          </div>
          
          {/* Filter Row 2 */}
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-[36px]"></div>
            <div className="flex items-center gap-2 flex-1">
              <div className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600 w-[65px] text-center">
                Status
              </div>
              <div className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600 w-[55px] text-center">
                is
              </div>
              <div className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600 flex-1 text-center">
                Open
              </div>
              <button className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                ×
              </button>
            </div>
          </div>
          
          {/* Sub-group Container */}
          <div className="ml-9 border border-dashed border-slate-400 rounded bg-slate-50 p-3 space-y-3 relative">
            {/* OR Group Label */}
            <div className="absolute -top-2.5 left-3 text-xs text-purple-600 bg-purple-100 border border-purple-300 px-2 py-1 rounded font-medium">
              OR Group
            </div>
            
            {/* Sub-group Filter 1 */}
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 text-xs text-purple-600 bg-purple-100 border border-purple-300 px-1.5 py-1 rounded text-center font-medium min-w-[28px]">
                OR
              </div>
              <div className="flex items-center gap-2 flex-1">
                <div className="px-2.5 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-600 min-w-[60px] text-center">
                  Category
                </div>
                <div className="px-2.5 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-600 min-w-[55px] text-center">
                  contains
                </div>
                <div className="px-2.5 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-600 flex-1 text-center">
                  Important
                </div>
                <button className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  ×
                </button>
              </div>
            </div>
            
            {/* Sub-group Filter 2 */}
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-7"></div>
              <div className="flex items-center gap-2 flex-1">
                <div className="px-2.5 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-600 min-w-[60px] text-center">
                  Priority
                </div>
                <div className="px-2.5 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-600 min-w-[55px] text-center">
                  is
                </div>
                <div className="px-2.5 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-600 flex-1 text-center">
                  High
                </div>
                <button className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  ×
                </button>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button className="px-4 py-1.5 bg-blue-50 border border-blue-300 text-blue-600 rounded text-xs font-medium hover:bg-blue-100 transition-colors">
              + Add Filter
            </button>
            <button className="px-4 py-1.5 bg-purple-50 border border-purple-300 text-purple-600 rounded text-xs font-medium hover:bg-purple-100 transition-colors">
              + Add Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Snapshot System Visualization Component
const SnapshotSystemVisualization: React.FC = () => {
  const snapshots = [
    { 
      type: 'Bar Chart', 
      uuid: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
      icon: (
        <svg width="12" height="12" viewBox="0 0 16 18" fill="currentColor">
          <rect x="2" y="8" width="2.5" height="6" rx="0.3" fillOpacity="0.6"/>
          <rect x="6.75" y="4" width="2.5" height="10" rx="0.3" fillOpacity="1"/>
          <rect x="11.5" y="7" width="2.5" height="7" rx="0.3" fillOpacity="0.7"/>
        </svg>
      )
    },
    { 
      type: 'Pie Chart', 
      uuid: 'b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7',
      icon: (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M8,2.5 A5.5,5.5 0 0,1 13.5,8 L8,8 Z" fill="currentColor"/>
          <path d="M13.5,8 A5.5,5.5 0 0,1 8,13.5 L8,8 Z" fill="currentColor" fillOpacity="0.7"/>
          <path d="M8,13.5 A5.5,5.5 0 0,1 2.5,8 L8,8 Z" fill="currentColor" fillOpacity="0.4"/>
          <path d="M2.5,8 A5.5,5.5 0 0,1 8,2.5 L8,8 Z" fill="currentColor" fillOpacity="0.7"/>
        </svg>
      )
    },
    { 
      type: 'Line Chart', 
      uuid: 'c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r8',
      icon: (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
          <polyline points="2,12 4.5,7 10,8.5 14.5,2.5"/>
          <circle cx="2" cy="12" r="1" fill="currentColor"/>
          <circle cx="4.5" cy="7" r="1" fill="currentColor"/>
          <circle cx="10" cy="8.5" r="1" fill="currentColor"/>
          <circle cx="14.5" cy="2.5" r="1" fill="currentColor"/>
        </svg>
      )
    },
    { 
      type: 'Heatmap', 
      uuid: 'd4e5f6g7-h8i9-0j1k-2l3m-n4o5p6q7r8s9',
      icon: (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="2.5" height="2.5" fill="currentColor" fillOpacity="0.3" rx="0.3"/>
          <rect x="5" y="2" width="2.5" height="2.5" fill="currentColor" fillOpacity="0.6" rx="0.3"/>
          <rect x="8" y="2" width="2.5" height="2.5" fill="currentColor" fillOpacity="0.9" rx="0.3"/>
          <rect x="11" y="2" width="2.5" height="2.5" fill="currentColor" rx="0.3"/>
          <rect x="2" y="5" width="2.5" height="2.5" fill="currentColor" fillOpacity="0.6" rx="0.3"/>
          <rect x="5" y="5" width="2.5" height="2.5" fill="currentColor" rx="0.3"/>
          <rect x="8" y="5" width="2.5" height="2.5" fill="currentColor" fillOpacity="0.4" rx="0.3"/>
          <rect x="11" y="5" width="2.5" height="2.5" fill="currentColor" fillOpacity="0.7" rx="0.3"/>
          <rect x="2" y="8" width="2.5" height="2.5" fill="currentColor" rx="0.3"/>
          <rect x="5" y="8" width="2.5" height="2.5" fill="currentColor" fillOpacity="0.5" rx="0.3"/>
          <rect x="8" y="8" width="2.5" height="2.5" fill="currentColor" fillOpacity="0.8" rx="0.3"/>
          <rect x="11" y="8" width="2.5" height="2.5" fill="currentColor" fillOpacity="0.3" rx="0.3"/>
        </svg>
      )
    },
    { 
      type: 'Area Chart', 
      uuid: 'e5f6g7h8-i9j0-1k2l-3m4n-o5p6q7r8s9t0',
      icon: (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2,14 L2,10.5 L4.5,7 L7,8.5 L9.5,5.5 L12,6.5 L14,4 L14,14 Z" fillOpacity="0.7"/>
          <path d="M2,10.5 L4.5,7 L7,8.5 L9.5,5.5 L12,6.5 L14,4" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      )
    },
    { 
      type: 'Radar Chart', 
      uuid: 'f6g7h8i9-j0k1-2l3m-4n5o-p6q7r8s9t0u1',
      icon: (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="0.8">
          <polygon points="8,2.5 12.5,5.5 11.5,11.5 4.5,11.5 3.5,5.5"/>
          <polygon points="8,4 10.8,6.2 9.8,9.8 6.2,9.8 5.2,6.2" fill="currentColor" fillOpacity="0.5"/>
          <line x1="8" y1="8" x2="8" y2="2.5" strokeWidth="0.7"/>
          <line x1="8" y1="8" x2="12.5" y2="5.5" strokeWidth="0.7"/>
          <line x1="8" y1="8" x2="11.5" y2="11.5" strokeWidth="0.7"/>
          <line x1="8" y1="8" x2="4.5" y2="11.5" strokeWidth="0.7"/>
          <line x1="8" y1="8" x2="3.5" y2="5.5" strokeWidth="0.7"/>
          <circle cx="8" cy="8" r="0.8" fill="currentColor"/>
        </svg>
      )
    }
  ];

  return (
    <div className="w-full h-40 p-2 flex justify-center">
      <div className="space-y-1.5 w-full max-w-xs mt-4">
        {snapshots.map((snapshot, index) => (
          <div key={index} className="flex items-center gap-2">
            {/* Chart Type Block with Icon */}
            <div className="flex-shrink-0 w-20 h-6 bg-gray-100 border border-gray-300 rounded text-xs text-gray-700 flex items-center justify-center font-medium px-2 gap-1">
              <span className="text-gray-600">
                {snapshot.icon}
              </span>
              <span className="truncate">{snapshot.type}</span>
            </div>
            
            {/* Dotted Line */}
            <div className="flex-1 h-px border-t border-dashed border-gray-400"></div>
            
            {/* UUID Block with Maximum Border Radius and Darker Color */}
            <div className="flex-shrink-0 text-xs text-gray-600 font-mono bg-gray-300 border border-gray-400 rounded-full px-3 py-1 max-w-[110px] truncate">
              {snapshot.uuid}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom Chart Types Visualization Component
const ChartTypesVisualization: React.FC = () => {
  // 圓環排列的位置計算
  const chartTypes = [
    {
      name: 'Bar Chart',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 18" fill="#374151">
          <rect x="2" y="8" width="2.5" height="6" rx="0.3" fillOpacity="0.8"/>
          <rect x="6.75" y="4" width="2.5" height="10" rx="0.3" fillOpacity="1"/>
          <rect x="11.5" y="7" width="2.5" height="7" rx="0.3" fillOpacity="0.9"/>
        </svg>
      )
    },
    {
      name: 'Line Chart',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#374151" strokeWidth="1.2">
          <polyline points="2,12 4.5,7 10,8.5 14.5,2.5"/>
          <circle cx="2" cy="12" r="1" fill="#374151"/>
          <circle cx="4.5" cy="7" r="1" fill="#374151"/>
          <circle cx="10" cy="8.5" r="1" fill="#374151"/>
          <circle cx="14.5" cy="2.5" r="1" fill="#374151"/>
        </svg>
      )
    },
    {
      name: 'Pie Chart',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          {/* 第一個區塊 - 深灰色 */}
          <path d="M8,2.5 A5.5,5.5 0 0,1 13.5,8 L8,8 Z" fill="#374151"/>
          {/* 第二個區塊 - 中等灰色 */}
          <path d="M13.5,8 A5.5,5.5 0 0,1 8,13.5 L8,8 Z" fill="#6B7280"/>
          {/* 第三個區塊 - 較淺灰色 */}
          <path d="M8,13.5 A5.5,5.5 0 0,1 2.5,8 L8,8 Z" fill="#9CA3AF"/>
          {/* 第四個區塊 - 中深灰色 */}
          <path d="M2.5,8 A5.5,5.5 0 0,1 8,2.5 L8,8 Z" fill="#4B5563"/>
        </svg>
      )
    },
    {
      name: 'Area Chart',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="#374151">
          <path d="M2,14 L2,10.5 L4.5,7 L7,8.5 L9.5,5.5 L12,6.5 L14,4 L14,14 Z" fillOpacity="0.7"/>
          <path d="M2,10.5 L4.5,7 L7,8.5 L9.5,5.5 L12,6.5 L14,4" fill="none" stroke="#374151" strokeWidth="1.2"/>
        </svg>
      )
    },
    {
      name: 'Heatmap',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          {/* 熱力圖網格 - 使用不同深度的灰色 */}
          <rect x="2" y="2" width="2.5" height="2.5" fill="#9CA3AF" rx="0.3"/>
          <rect x="5" y="2" width="2.5" height="2.5" fill="#6B7280" rx="0.3"/>
          <rect x="8" y="2" width="2.5" height="2.5" fill="#374151" rx="0.3"/>
          <rect x="11" y="2" width="2.5" height="2.5" fill="#4B5563" rx="0.3"/>
          
          <rect x="2" y="5" width="2.5" height="2.5" fill="#6B7280" rx="0.3"/>
          <rect x="5" y="5" width="2.5" height="2.5" fill="#374151" rx="0.3"/>
          <rect x="8" y="5" width="2.5" height="2.5" fill="#9CA3AF" rx="0.3"/>
          <rect x="11" y="5" width="2.5" height="2.5" fill="#4B5563" rx="0.3"/>
          
          <rect x="2" y="8" width="2.5" height="2.5" fill="#374151" rx="0.3"/>
          <rect x="5" y="8" width="2.5" height="2.5" fill="#9CA3AF" rx="0.3"/>
          <rect x="8" y="8" width="2.5" height="2.5" fill="#6B7280" rx="0.3"/>
          <rect x="11" y="8" width="2.5" height="2.5" fill="#9CA3AF" rx="0.3"/>
          
          <rect x="2" y="11" width="2.5" height="2.5" fill="#9CA3AF" rx="0.3"/>
          <rect x="5" y="11" width="2.5" height="2.5" fill="#6B7280" rx="0.3"/>
          <rect x="8" y="11" width="2.5" height="2.5" fill="#6B7280" rx="0.3"/>
          <rect x="11" y="11" width="2.5" height="2.5" fill="#374151" rx="0.3"/>
        </svg>
      )
    },
    {
      name: 'Radar Chart',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#374151" strokeWidth="0.8">
          {/* 外圍輪廓 */}
          <polygon points="8,2.5 12.5,5.5 11.5,11.5 4.5,11.5 3.5,5.5"/>
          {/* 內部數據區域 */}
          <polygon points="8,4 10.8,6.2 9.8,9.8 6.2,9.8 5.2,6.2" fill="#6B7280" fillOpacity="0.6"/>
          {/* 輻射線 */}
          <line x1="8" y1="8" x2="8" y2="2.5" strokeWidth="0.7"/>
          <line x1="8" y1="8" x2="12.5" y2="5.5" strokeWidth="0.7"/>
          <line x1="8" y1="8" x2="11.5" y2="11.5" strokeWidth="0.7"/>
          <line x1="8" y1="8" x2="4.5" y2="11.5" strokeWidth="0.7"/>
          <line x1="8" y1="8" x2="3.5" y2="5.5" strokeWidth="0.7"/>
          {/* 中心點 */}
          <circle cx="8" cy="8" r="0.8" fill="#374151"/>
        </svg>
      )
    }
  ];

  // 大幅放大圖示與圓環，完全避免裁切
  const radius = 80;
  const centerX = 120;
  const centerY = 100;

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[260px]">
      {/* Grid Background with White Radial Fade (只保留白色漸層) */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 240 200" 
        fill="none"
      >
        <defs>
          {/* Grid Pattern */}
          <pattern id="grid-fade" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#D1D5DB" strokeWidth="0.5"/>
          </pattern>
          {/* White Radial Gradient for Fade Effect - 更往內縮 */}
          <radialGradient id="radialFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0"/>
            <stop offset="40%" stopColor="white" stopOpacity="0.1"/>
            <stop offset="70%" stopColor="white" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="white" stopOpacity="0.95"/>
          </radialGradient>
        </defs>
        {/* Grid with Pattern */}
        <rect width="100%" height="100%" fill="url(#grid-fade)" />
        {/* White Radial Fade Overlay */}
        <rect width="100%" height="100%" fill="url(#radialFade)" />
      </svg>
      {/* Chart Type Icons in Circle Layout (大幅放大) */}
      <div className="relative z-10">
        <svg width="240" height="240" viewBox="0 0 240 220">
          {chartTypes.map((chart, index) => {
            const angle = (index * 60) * (Math.PI / 180); // 6個圖示，每60度一個
            const x = centerX + radius * Math.cos(angle - Math.PI / 2);
            const y = centerY + radius * Math.sin(angle - Math.PI / 2);
            return (
              <g key={chart.name}>
                {/* 淺灰色圓形背景 - 大幅放大 */}
                <circle
                  cx={x}
                  cy={y}
                  r="26"
                  fill="#F3F4F6"
                  stroke="#D1D5DB"
                  strokeWidth="2"
                />
                {/* 圖示 - 大幅放大 */}
                <foreignObject
                  x={x - 20}
                  y={y - 20}
                  width="40"
                  height="40"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    {React.cloneElement(chart.icon, {
                      width: "32",
                      height: "32"
                    })}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: ArrowDownTrayIcon,
      title: '圖表匯出',
      description: '支援多種格式匯出，包括 PNG、SVG 等格式，方便在簡報或文件中使用。',
      gradientId: 'gradient-1',
      gradientColors: { from: '#4b5563', to: '#000000' }
    },
    {
      icon: MagnifyingGlassIcon,
      title: '進階篩選查詢',
      description: '提供強大的篩選條件設定，讓你精確控制要顯示的資料範圍和內容。',
      gradientId: 'gradient-2',
      gradientColors: { from: '#4b5563', to: '#000000' }
    },
    {
      icon: ShareIcon,
      title: '分享與嵌入功能',
      description: '一鍵生成分享連結，支援 iframe 嵌入，讓圖表輕鬆整合到任何網站或平台。',
      gradientId: 'gradient-3',
      gradientColors: { from: '#000000', to: '#4b5563' }
    },
     {
      icon: ChartBarIcon,
      title: '多種圖表類型',
      description: '支援長條圖、圓餅圖、折線圖等多種視覺化圖表格式，滿足不同數據展示需求。',
      gradientId: 'gradient-4',
      gradientColors: { from: '#000000', to: '#4b5563' }
    },
    {
      icon: TableCellsIcon,
      title: '表格檢視',
      description: '除了圖表外，也提供原始資料的表格檢視模式，讓數據查看更加靈活。',
      gradientId: 'gradient-5',
      gradientColors: { from: '#000000', to: '#4b5563' }
    },
    {
      icon: CameraIcon,
      title: '快照系統',
      description: '自動保存資料快照，確保歷史數據的完整性，並支援時間點比較分析。',
      gradientId: 'gradient-6',
      gradientColors: { from: '#4b5563', to: '#000000' }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  };

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container">
        {/* SVG Gradients Definition */}
        <svg className="absolute inset-0 w-0 h-0" aria-hidden="true">
          <defs>
            {features.map((feature) => (
              <linearGradient
                key={feature.gradientId}
                id={feature.gradientId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor={feature.gradientColors.from} />
                <stop offset="100%" stopColor={feature.gradientColors.to} />
              </linearGradient>
            ))}
          </defs>
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            強大的
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 bg-black transform -rotate-2 rounded-md"></span>
              <span className="relative inline-block text-white font-bold transform -rotate-2">功能特色</span>
            </span>
          </h2>
          <p className="text-xl text-secondary leading-relaxed">
            從資料視覺化到分享嵌入，從匯出功能到快照系統，
            我們提供完整的解決方案讓你的 Notion 資料發揮最大價值。
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 md:h-[700px]"
        >
          {/* First card - position: col 1, row 1 */}
          <motion.div variants={itemVariants} className="md:col-start-1 md:row-start-1 md:row-span-1">
            <Card className="h-full group transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-black hover:border-2 shadow-none hover:shadow-lg bg-white">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-2 relative">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    {React.createElement(features[0].icon, {
                      className: "w-12 h-12 stroke-1",
                      style: { stroke: `url(#${features[0].gradientId})` }
                    })}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-primary mb-1">
                  {features[0].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-secondary leading-relaxed text-center">
                  {features[0].description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          {/* Second card - position: col 2, row 1-2 (taller) */}
          <motion.div variants={itemVariants} className="md:col-start-2 md:row-start-1 md:row-span-2">
            <Card className="h-full group transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-black hover:border-2 shadow-none hover:shadow-lg relative overflow-hidden flex flex-col">
              {/* 上方內容區域 */}
              <div className="relative z-10 flex-1">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-2 relative">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      {React.createElement(features[1].icon, {
                        className: "w-12 h-12 stroke-1",
                        style: { stroke: `url(#${features[1].gradientId})` }
                      })}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-primary mb-1">
                    {features[1].title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-2">
                  <CardDescription className="text-secondary leading-relaxed text-center">
                    {features[1].description}
                  </CardDescription>
                </CardContent>
              </div>
              
              {/* 下方 Query Builder Wireframe */}
              <div className="relative z-10 px-4 pb-4">
                <QueryBuilderWireframe />
              </div>
            </Card>
          </motion.div>

          {/* Third card - position: col 3, row 1 */}
          <motion.div variants={itemVariants} className="md:col-start-3 md:row-start-1 md:row-span-1">
            <Card className="h-full group transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-black hover:border-2 shadow-none hover:shadow-lg bg-white">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-2 relative">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    {React.createElement(features[2].icon, {
                      className: "w-12 h-12 stroke-1",
                      style: { stroke: `url(#${features[2].gradientId})` }
                    })}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-primary mb-1">
                  {features[2].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-secondary leading-relaxed text-center">
                  {features[2].description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          {/* Fourth card - position: col 1, row 2-3 (taller) - Custom Chart Types */}
          <motion.div variants={itemVariants} className="md:col-start-1 md:row-start-2 md:row-span-2">
            <Card className="h-full group transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-black hover:border-2 shadow-none hover:shadow-lg relative overflow-hidden flex flex-col">
              {/* 上方圖示展示區域 - 滿版 */}
              <div className="relative flex-1 p-0">
                <ChartTypesVisualization />
              </div>
              {/* 下方標題和說明區域，增加底部留白 */}
              <div className="relative z-10">
                <CardHeader className="text-center pb-2 pt-4 px-4">
                  <CardTitle className="text-lg font-bold text-primary mb-1">
                    {features[3].title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-8 px-4">
                  <CardDescription className="text-secondary leading-relaxed text-center text-sm">
                    {features[3].description}
                  </CardDescription>
                </CardContent>
              </div>
            </Card>
          </motion.div>

          {/* Fifth card - position: col 2, row 3 */}
          <motion.div variants={itemVariants} className="md:col-start-2 md:row-start-3 md:row-span-1">
            <Card className="h-full group transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-black hover:border-2 shadow-none hover:shadow-lg bg-white">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-2 relative">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    {React.createElement(features[4].icon, {
                      className: "w-12 h-12 stroke-1",
                      style: { stroke: `url(#${features[4].gradientId})` }
                    })}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-primary mb-1">
                  {features[4].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-secondary leading-relaxed text-center">
                  {features[4].description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sixth card - position: col 3, row 2-3 (taller) */}
          <motion.div variants={itemVariants} className="md:col-start-3 md:row-start-2 md:row-span-2">
            <Card className="h-full group transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-black hover:border-2 shadow-none hover:shadow-lg relative overflow-hidden flex flex-col">
              {/* 上方內容區域 - 參考進階篩選查詢卡片的留白設定 */}
              <div className="relative z-10 flex-shrink-0">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-2 relative">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      {React.createElement(features[5].icon, {
                        className: "w-12 h-12 stroke-1",
                        style: { stroke: `url(#${features[5].gradientId})` }
                      })}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-primary mb-1">
                    {features[5].title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-2">
                  <CardDescription className="text-secondary leading-relaxed text-center">
                    {features[5].description}
                  </CardDescription>
                </CardContent>
              </div>
              
              {/* 下方快照系統視覺化 - 擴大空間 */}
              <div className="relative z-10 flex-1 px-4 pb-4">
                <SnapshotSystemVisualization />
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-black rounded-2xl p-8 w-full relative overflow-hidden min-h-[300px] flex flex-col md:flex-row items-center">
            {/* 左側文字內容 */}
            <div className="relative z-10 w-full md:w-1/2 md:pr-8 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-4">
                開源且完全免費
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                所有功能完全開源，你可以自由使用、修改和部署。
                我們相信開源社群的力量，歡迎貢獻想法和代碼！
              </p>
              
              {/* 查看原始碼按鈕 */}
              <a 
                href="https://github.com/SteveLin100132/notion-chart-generator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 group"
              >
                <svg 
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                查看原始碼
              </a>
            </div>
            
            {/* 右側球體插圖 */}
            <div className="relative w-full md:w-1/2 h-[250px] md:h-[300px] overflow-hidden">
              {/* SVG 球體 */}
              <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 800 600" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* 白色主題完整漸層定義 - 基於原始SVG */}
                <defs>
                  {/* 遮罩漸層 */}
                  <linearGradient id="whiteMaskGrad" x1="130.011" y1="159.677" x2="290.2" y2="369.686" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  {/* 主體徑向漸層 */}
                  <radialGradient id="whiteMainRadial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(63.4043 306.574) rotate(-132.571) scale(103.192 103.372)">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </radialGradient>
                  <radialGradient id="whiteStrokeRadial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(35.3475 279.408) rotate(-113.962) scale(61.4062 126.439)">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </radialGradient>
                  {/* 連線漸層組 - 白色主題 */}
                  <linearGradient id="whiteConn1" x1="161.952" y1="287.31" x2="200.942" y2="282.386" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="whiteConn2" x1="176.291" y1="291.992" x2="146.084" y2="317.019" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="whiteConn3" x1="142.094" y1="298.08" x2="49.0046" y2="374.208" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="whiteConn4" x1="163.45" y1="286.878" x2="151.98" y2="260.371" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="whiteConn5" x1="163.939" y1="317.43" x2="120.03" y2="406.478" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="whiteConn6" x1="211.598" y1="358.54" x2="210.244" y2="423.039" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="whiteConn7" x1="252.624" y1="386.02" x2="289.44" y2="398.696" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="whiteConn8" x1="163.45" y1="266.262" x2="163.45" y2="288.695" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <clipPath id="completeSphereClip">
                    <rect width="330" height="430" fill="white"/>
                  </clipPath>
                  <mask id="sphereMask" maskUnits="userSpaceOnUse" x="-72" y="194" width="501" height="307">
                    <rect x="-71.3203" y="194.31" width="500.22" height="306.136" fill="url(#whiteMaskGrad)"/>
                  </mask>
                </defs>
                
                {/* 完整球體結構 - 基於原始SVG的所有線段，調整位置到右側 */}
                <g transform="translate(-200, -700) scale(4, 3.5)" clipPath="url(#completeSphereClip)">
                  {/* 遮罩組 - 包含完整的球體線框 */}
                  <g mask="url(#sphereMask)">
                    {/* 完整複雜球體線框 - 所有原始路徑，線條細化 */}
                    <path 
                      opacity="0.7" 
                      d="M56.9363 615.864C55.0738 614.729 58.4661 605.079 66.7467 587.868C75.0273 570.656 87.9158 546.498 104.11 517.81C120.304 489.122 139.235 456.928 159.003 424.468C178.78 391.993 198.693 360.405 216.734 332.844C234.791 305.292 250.345 282.755 261.833 267.507C273.329 252.243 280.353 244.814 282.216 245.949M29.7378 596.282C22.0017 589.736 20.8579 575.662 26.4116 555.477C31.9809 535.301 44.0671 509.704 61.447 481.289C78.8269 452.875 100.91 422.633 125.455 393.617C150.009 364.585 176.155 337.795 201.271 315.927C226.402 294.067 249.614 277.891 268.59 269.051C287.566 260.21 301.634 259.003 309.379 265.533M3.20404 569.554C-7.94814 556.166 -11.2031 536.622 -6.26453 512.873C-1.32593 489.124 11.667 462.003 31.3826 434.237C51.0983 406.471 76.8517 379.038 106.057 354.697C135.262 330.356 166.889 309.975 197.741 295.589C228.609 281.211 257.618 273.321 281.884 272.729C306.142 272.153 324.785 278.878 335.922 292.258M-22.4581 531.044C-33.3277 510.212 -35.1363 485.108 -27.6923 458.27C-20.2483 431.432 -3.81488 403.81 19.9338 378.162C43.698 352.523 73.9446 329.773 107.648 312.187C141.352 294.601 177.334 282.84 211.952 278.025C246.586 273.218 278.641 275.573 304.901 284.824C331.16 294.076 350.709 309.938 361.578 330.77M-42.7743 473.456C-48.2735 446.019 -43.8643 417.09 -29.9902 389.587C-16.1161 362.084 6.72911 336.968 36.2619 316.782C65.7947 296.596 100.962 282.031 138.234 274.554C175.506 267.078 213.569 266.972 248.601 274.224C283.633 281.475 314.391 295.839 337.788 315.865C361.186 335.891 376.404 360.902 381.903 388.34M-43.4928 392.108C-38.0184 362.028 -22.7933 334.282 0.658225 311.651C24.0942 289.012 54.9289 272.285 90.0679 263.137C125.198 254.005 163.382 252.771 200.78 259.593C238.187 266.4 273.487 281.016 303.128 301.955C332.768 322.894 355.742 349.414 369.689 378.867C383.636 408.32 388.11 439.648 382.636 469.728M-5.64197 303.625C21.9477 265.658 66.8567 242.639 119.227 239.655C171.598 236.671 227.12 253.963 273.586 287.711C320.051 321.459 353.668 368.929 367.02 419.638C380.363 470.363 372.376 520.189 344.802 558.164M61.3434 243.313C99.8723 221.089 148.231 219.525 195.775 238.995C243.318 258.464 286.152 297.33 314.846 347.093C343.549 396.841 355.768 453.387 348.805 504.288C341.842 555.189 316.291 596.274 277.762 618.498M127.004 218.562C165.252 210.897 206.413 225.91 241.443 260.321C276.473 294.732 302.483 345.68 313.776 401.996C325.069 458.311 320.687 515.368 301.627 560.606C282.567 605.843 250.368 635.575 212.121 643.24M179.177 214.558C210.013 215.932 238.58 240.045 258.588 281.58C278.595 323.114 288.389 378.698 285.858 436.073C283.303 493.455 268.618 547.933 245.003 587.539C221.388 627.146 190.807 648.635 159.97 647.26M219.804 220.258C239.872 225.037 253.815 251.833 258.582 294.715C263.349 337.596 258.544 393.08 245.211 448.956C231.886 504.817 211.127 556.509 187.519 592.634C163.912 628.758 139.377 646.369 119.318 641.574M253.079 231.088C261.369 234.556 260.504 258.926 250.701 298.845C240.898 338.764 222.957 390.967 200.809 443.955C178.661 496.943 154.135 546.401 132.598 581.426C111.086 616.443 94.3421 634.185 86.0524 630.716M95.4135 634.397C74.2746 626.692 53.7477 615.293 36.0327 601.422M174.386 647.421C141.03 648.174 101.973 637.33 66.0165 617.363C30.0595 597.396 0.23186 569.968 -16.7855 541.263M225.997 640.002C183.579 651.452 124.337 640.019 70.1613 609.935C15.9857 579.851 -25.0361 535.607 -37.7393 493.548M268.893 623.345C246.532 634.886 216.188 638.649 181.886 634.134C147.584 629.619 110.902 617.053 76.7424 598.084C42.5825 579.115 12.5162 554.636 -9.44045 527.89C-31.4057 501.159 -44.2526 473.412 -46.2763 448.33M305.246 599.71C283.394 617.27 249.804 625.088 209.925 621.895C170.045 618.701 126.223 604.684 85.5878 582.119C44.9523 559.554 9.88844 529.765 -13.904 497.602C-37.6965 465.438 -48.8162 432.791 -45.4619 404.96M335.338 570.267C315.677 593.665 280.44 605.799 236.392 604.344C192.336 602.905 142.533 587.979 96.5374 562.437C50.5417 536.895 11.5441 502.511 -12.9669 465.874C-37.4779 429.237 -45.805 392.912 -36.3459 363.869M358.903 536.045C348.313 555.115 329.168 568.969 303.39 576.261C277.596 583.545 246.094 583.99 212.019 577.533C177.944 571.077 142.515 557.97 109.27 539.509C76.0237 521.047 46.1694 497.902 22.6759 472.39C-0.817497 446.879 -17.1082 419.894 -24.5451 394.157C-31.9974 368.412 -30.3341 344.83 -19.7527 325.775M358.903 536.045C331.021 586.254 284.322 623.338 229.096 639.128C173.871 654.919 114.65 648.119 64.425 620.229C14.2154 592.347 -22.8689 545.648 -38.6676 490.438C-54.4577 435.213 -47.6584 375.992 -19.7682 325.766C8.11345 275.557 54.8132 238.473 110.023 222.674C165.248 206.884 224.469 213.683 274.694 241.573C324.904 269.455 361.988 316.155 377.787 371.365C393.577 426.59 386.785 485.835 358.903 536.045ZM375.496 497.951C368.268 520.165 350.965 537.089 325.575 546.786C300.193 556.467 267.772 558.53 232.028 552.707C196.275 546.9 158.648 533.444 123.481 513.916C88.299 494.379 57.002 469.561 33.1726 442.282C9.34323 415.003 -6.06825 386.398 -11.2523 359.744C-16.4518 333.081 -11.2172 309.455 3.81192 291.552M384.572 456.858C381.569 481.722 367.165 501.493 343.257 513.593C319.34 525.71 287.016 529.57 250.541 524.699C214.065 519.828 175.127 506.435 138.829 486.278C102.531 466.122 70.578 440.149 47.1615 411.761C23.7449 383.374 9.93395 353.895 7.57602 327.188C5.2181 300.481 14.3858 277.804 33.8954 262.125M385.427 413.49C387.595 440.355 377.226 462.751 355.893 477.295C334.561 491.84 303.425 497.758 267.164 494.142C230.904 490.526 191.51 477.588 154.918 457.269C118.326 436.949 86.5033 410.339 64.2811 381.48C42.0435 352.611 30.6077 323.053 31.6767 297.256C32.7458 271.459 46.2907 250.827 70.2261 238.458M376.89 368.272C385.366 396.37 380.478 421.16 363.072 438.27C345.666 455.38 316.869 463.692 281.774 461.737C246.695 459.79 207.59 447.682 171.401 427.586C135.211 407.49 104.277 380.704 84.0652 351.948C63.8689 323.2 55.7017 294.362 61.0241 270.542C66.3465 246.722 84.8146 229.451 113.138 221.809M355.905 320.54C372.617 348.772 375.559 375.924 364.065 396.074C352.572 416.224 327.586 427.747 294.573 428.103C261.551 428.474 223.168 417.659 187.815 398.027C152.462 378.396 122.991 351.531 105.85 323.304C88.7084 295.077 85.2729 267.792 96.3016 247.384C107.33 226.976 131.934 215.119 164.733 214.381M303.093 260.404C326.754 278.935 343.997 300.773 351.666 321.895C359.319 343.009 356.871 361.98 344.747 375.273C332.622 388.566 311.668 395.274 285.746 394.175C259.823 393.077 230.707 384.226 203.797 369.283C176.872 354.331 153.982 334.303 139.346 312.879C124.711 291.455 119.328 270.123 124.202 252.803C129.077 235.484 143.871 223.37 165.855 218.713C187.823 214.048 215.491 217.15 243.728 227.438M332.262 340.449C325.001 353.525 308.97 361.041 287.722 361.342C266.459 361.636 241.718 354.687 218.929 342.032C196.125 329.369 177.148 312.04 166.172 293.845C155.181 275.641 153.093 258.084 160.362 244.993C167.623 231.918 183.654 224.402 204.902 224.1C226.165 223.807 250.906 230.755 273.695 243.41C296.483 256.065 315.476 273.402 326.452 291.597C337.428 309.793 339.522 327.374 332.262 340.449ZM309.98 315.895C305.033 324.802 294.128 329.915 279.666 330.114C265.205 330.313 248.348 325.593 232.84 316.982C217.333 308.37 204.406 296.571 196.939 284.175C189.464 271.794 188.038 259.834 192.984 250.926C197.931 242.018 208.837 236.906 223.298 236.707C237.759 236.508 254.617 241.228 270.125 249.839C285.632 258.451 298.558 270.25 306.025 282.646C313.501 295.027 314.927 306.987 309.98 315.895ZM284.245 294.165C279.031 303.553 261.546 303.796 245.187 294.711C228.827 285.626 219.79 270.656 225.003 261.268C230.217 251.88 247.702 251.637 264.061 260.721C280.421 269.806 289.458 284.777 284.245 294.165Z" 
                      stroke="white" 
                      strokeWidth="0.5" 
                    />
                  </g>

                  {/* 原始SVG的精確連線路徑 - 細線條白色 */}
                  <path d="M163.815 289.173C168.96 287.532 182.524 283.584 195.618 280.922" stroke="url(#whiteConn1)" strokeWidth="1" opacity="1">
                    <animate attributeName="stroke-dasharray" values="0,15;7,7;0,15" dur="3s" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" values="0;-10" dur="3s" repeatCount="indefinite"/>
                  </path>
                  <path opacity="0.7" d="M163.743 289.032C145.537 294.219 120.666 304.679 101.45 315.562C98.5928 309.936 92.5914 296.549 91.4453 288.014" stroke="url(#whiteConn2)" strokeWidth="1">
                    <animate attributeName="stroke-dasharray" values="0,18;9,9;0,18" dur="2.5s" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" values="0;-12" dur="2.5s" repeatCount="indefinite"/>
                  </path>
                  <path opacity="0.7" d="M131.988 300.584C109.209 309.463 67.2367 334.448 46.0713 353.25" stroke="url(#whiteConn3)" strokeWidth="1">
                    <animate attributeName="stroke-dasharray" values="0,16;8,8;0,16" dur="2.8s" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" values="0;-10" dur="2.8s" repeatCount="indefinite"/>
                  </path>
                  <path d="M163.45 288.852C160.552 283.745 155.015 270.79 156.05 259.82C157.085 248.849 161.432 243.106 162.726 241.501C143.941 238.551 103.163 236.947 70.9746 248.642" stroke="url(#whiteConn4)" strokeWidth="1" opacity="1">
                    <animate attributeName="stroke-dasharray" values="0,20;10,10;0,20" dur="3.2s" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" values="0;-14" dur="3.2s" repeatCount="indefinite"/>
                  </path>
                  <path d="M107 416.714C113.591 406.473 136.106 381.182 146.594 369.603C136.483 361.56 125 348.684 120.428 343.179C136.916 330.022 164.082 313.53 175.604 306.929C172.568 303.3 166.025 294.617 163.637 289.305" stroke="url(#whiteConn5)" strokeWidth="1" opacity="1">
                    <animate attributeName="stroke-dasharray" values="0,24;12,12;0,24" dur="3.5s" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" values="0;-16" dur="3.5s" repeatCount="indefinite"/>
                  </path>
                  <path d="M208.664 423.039C215.773 410.086 229.419 369.035 235.78 350.283C207.668 338.623 187.65 321.055 175.596 306.866" stroke="url(#whiteConn6)" strokeWidth="1" opacity="1">
                    <animate attributeName="stroke-dasharray" values="0,18;9,9;0,18" dur="2.3s" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" values="0;-11" dur="2.3s" repeatCount="indefinite"/>
                  </path>
                  <path d="M285.525 394.502C259.949 393.085 234.914 384.28 225.594 380.056C228.046 373.322 233.523 357.947 235.811 350.32" stroke="url(#whiteConn7)" strokeWidth="1" opacity="1">
                    <animate attributeName="stroke-dasharray" values="0,20;10,10;0,20" dur="2.7s" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" values="0;-13" dur="2.7s" repeatCount="indefinite"/>
                  </path>

                  {/* 原始SVG的節點 - 白色橢圓，尺寸小一點 */}
                  <ellipse cx="163.449" cy="288.951" rx="3" ry="3" fill="white" opacity="0.95"/>
                  <ellipse cx="285.522" cy="394.501" rx="3" ry="3" fill="white" opacity="0.9"/>
                  <ellipse cx="46.072" cy="353.25" rx="3" ry="3" fill="white" opacity="0.9"/>
                </g>
              </svg>
              
              {/* CSS 漸層遮罩 - 營造 fade out 效果 */}
              <div className="absolute inset-0 pointer-events-none">
                {/* 徑向漸層遮罩 */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,1) 100%)'
                  }}
                ></div>
                {/* 四邊線性漸層遮罩 */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `
                      linear-gradient(to right, rgba(0,0,0,0.9) 0%, transparent 20%, transparent 90%, rgba(0,0,0,1) 100%),
                      linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 20%, transparent 90%, rgba(0,0,0,1) 100%)
                    `
                  }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
