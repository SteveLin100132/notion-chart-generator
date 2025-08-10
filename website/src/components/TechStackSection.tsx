import React from 'react';
import { motion } from 'framer-motion';

const TechStackSection: React.FC = () => {
  const techStacks = [
    {
      category: '前端技術',
      technologies: [
        { name: 'React.js', description: '現代化的用戶界面框架', logo: '⚛️' },
        { name: 'TypeScript', description: '類型安全的 JavaScript', logo: '🔷' },
        { name: 'Tailwind CSS', description: '快速的 CSS 框架', logo: '🎨' },
        { name: 'Chart.js', description: '強大的圖表庫', logo: '📊' }
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: '後端技術',
      technologies: [
        { name: 'Node.js', description: '高效能的 JavaScript 運行環境', logo: '🟢' },
        { name: 'NestJS', description: '企業級 Node.js 框架', logo: '🐱' },
        { name: 'Notion API', description: '官方 Notion 整合介面', logo: '📝' },
        { name: 'RESTful API', description: '標準化的 API 設計', logo: '🔗' }
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      category: '部署與工具',
      technologies: [
        { name: 'Docker', description: '容器化部署解決方案', logo: '🐳' },
        { name: 'GitHub Actions', description: '自動化 CI/CD 流程', logo: '⚙️' },
        { name: 'Kubernetes', description: '容器編排與管理', logo: '☸️' },
        { name: 'Nginx', description: '高性能的網頁伺服器', logo: '🌐' }
      ],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="tech-stack" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            現代化技術棧
          </h2>
          <p className="text-xl text-secondary leading-relaxed">
            採用業界最佳實踐和現代化技術，確保系統的穩定性、擴展性和維護性。
            從前端到後端，從部署到監控，全方位的技術解決方案。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {techStacks.map((stack, stackIndex) => (
            <motion.div
              key={stackIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: stackIndex * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${stack.color} rounded-t-2xl p-6 text-center`}>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {stack.category}
                </h3>
              </div>

              {/* Technologies List */}
              <div className="bg-white rounded-b-2xl shadow-lg p-6 space-y-4">
                {stack.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: (stackIndex * 0.2) + (techIndex * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform">
                      {tech.logo}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary group-hover:text-primary/80 transition-colors">
                        {tech.name}
                      </h4>
                      <p className="text-sm text-secondary">
                        {tech.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-primary text-center mb-8">
              系統架構圖
            </h3>
            
            {/* Simple Architecture Flow */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <span className="text-white text-2xl">📝</span>
                </div>
                <h4 className="font-semibold text-primary">Notion Database</h4>
                <p className="text-sm text-secondary">資料來源</p>
              </div>

              <div className="hidden md:block text-primary text-2xl">→</div>
              <div className="md:hidden text-primary text-2xl">↓</div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <span className="text-white text-2xl">⚙️</span>
                </div>
                <h4 className="font-semibold text-primary">Backend API</h4>
                <p className="text-sm text-secondary">資料處理</p>
              </div>

              <div className="hidden md:block text-primary text-2xl">→</div>
              <div className="md:hidden text-primary text-2xl">↓</div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h4 className="font-semibold text-primary">Chart Generation</h4>
                <p className="text-sm text-secondary">圖表生成</p>
              </div>

              <div className="hidden md:block text-primary text-2xl">→</div>
              <div className="md:hidden text-primary text-2xl">↓</div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <span className="text-white text-2xl">🌐</span>
                </div>
                <h4 className="font-semibold text-primary">Web Interface</h4>
                <p className="text-sm text-secondary">用戶界面</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
