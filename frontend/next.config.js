/** @type {import('next').NextConfig} */
const nextConfig = {
  // 在生產環境中，API 請求由 Ingress 直接路由到後端
  // 只在開發環境中使用 rewrite
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/api/:path*',
        },
      ]
    }
    return []
  },
}

module.exports = nextConfig
