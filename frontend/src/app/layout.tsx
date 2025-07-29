import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notion Chart Generator',
  description: '數據驅動的視覺化工具，連接您的 Notion 資料庫並生成美觀的互動式圖表',
  keywords: ['Notion', 'Chart', 'Visualization', 'Data', 'Dashboard'],
  authors: [{ name: 'Notion Chart Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
