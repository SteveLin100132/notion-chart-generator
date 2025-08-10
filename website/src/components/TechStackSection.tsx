import React from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiApacheecharts,
  SiNodedotjs,
  SiNestjs,
  SiNotion,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
} from "@icons-pack/react-simple-icons";

const TechStackSection: React.FC = () => {
  const technologies = [
    {
      name: "React.js",
      icon: SiReact,
      category: "Frontend",
      color: "#61DAFB",
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      category: "Language",
      color: "#3178C6",
    },
    {
      name: "Tailwind CSS",
      icon: SiTailwindcss,
      category: "Styling",
      color: "#06B6D4",
    },
    {
      name: "Apache ECharts",
      icon: SiApacheecharts,
      category: "Visualization",
      color: "#FF6384",
    },
    {
      name: "Node.js",
      icon: SiNodedotjs,
      category: "Backend",
      color: "#339933",
    },
    {
      name: "NestJS",
      icon: SiNestjs,
      category: "Framework",
      color: "#E0234E",
    },
    {
      name: "Notion API",
      icon: SiNotion,
      category: "Integration",
      color: "#000000",
    },
    {
      name: "Docker",
      icon: SiDocker,
      category: "DevOps",
      color: "#2496ED",
    },
    {
      name: "Kubernetes",
      icon: SiKubernetes,
      category: "Orchestration",
      color: "#326CE5",
    },
    {
      name: "GitHub Actions",
      icon: SiGithubactions,
      category: "CI/CD",
      color: "#2088FF",
    },
  ];

  // 為了創造無縫循環，複製技術陣列
  const duplicatedTechs = [...technologies, ...technologies];

  // 計算移動距離：每個卡片寬度(280px) + 間距(24px) = 304px
  const cardWidth = 304; // 280px + 24px gap
  const totalWidth = cardWidth * technologies.length;

  return (
    <section
      id="tech-stack"
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Section Divider - 流星線條 */}
      <div className="relative mb-20 flex flex-col items-center">
        {/* 主分界線 */}
        <div className="w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-40"></div>
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            現代化
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 bg-black transform -rotate-2 rounded-md"></span>
              <span className="relative inline-block text-white font-bold transform -rotate-2">
                技術棧
              </span>
            </span>
          </h2>
          <p className="text-xl text-secondary leading-loose">
            採用業界最佳實踐和現代化技術，確保系統的穩定性、擴展性和維護性。
            從前端到後端，從部署到監控，全方位的技術解決方案。
          </p>
        </motion.div>

        {/* 跑馬燈容器 */}
        <div className="relative">
          {/* 左側漸層遮罩 */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>

          {/* 右側漸層遮罩 */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* 跑馬燈軌道 */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              style={{ width: `${cardWidth * duplicatedTechs.length}px` }}
              animate={{
                x: [0, -totalWidth],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60, // 60秒完成一個循環
                  ease: "linear",
                },
              }}
            >
              {duplicatedTechs.map((tech, index) => (
                <motion.div
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 group"
                  style={{ width: "280px" }}
                >
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-full">
                    <div className="flex items-center space-x-4">
                      {/* 技術圖示 */}
                      <div className="flex-shrink-0">
                        <tech.icon
                          size={32}
                          color="#000000"
                          className="drop-shadow-sm"
                        />
                      </div>

                      {/* 技術資訊 */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-primary transition-colors truncate">
                          {tech.name}
                        </h3>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium mt-1">
                          {tech.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 全端解決方案 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {/* 上半部 - 文字描述區域 */}
            <div className="p-4 lg:p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-6">
                完整的全端解決方案
              </h3>
              <p className="text-gray-600 text-lg leading-loose mb-4 max-w-3xl mx-auto">
                從前端 React 生態系統到後端 Node.js 微服務架構，
                再到容器化部署和 CI/CD 自動化流程，提供企業級的開發體驗。
              </p>

              {/* 技術亮點 */}
              {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 text-xl">⚡</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      高效能
                    </div>
                    <div className="text-gray-500 text-sm">
                      優化的渲染與快取
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-green-600 text-xl">🔒</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      安全性
                    </div>
                    <div className="text-gray-500 text-sm">類型安全驗證</div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <span className="text-purple-600 text-xl">🚀</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      可擴展
                    </div>
                    <div className="text-gray-500 text-sm">微服務架構</div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <span className="text-orange-600 text-xl">📱</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      響應式
                    </div>
                    <div className="text-gray-500 text-sm">跨平台支援</div>
                  </div>
                </div>
              </div> */}
            </div>

            {/* 下半部 - 系統架構示意圖區域 */}
            <div className="p-2 lg:p-4 relative ">
              <div className="bg-gray-50 p-8 lg:p-12 relative border border-gray-200 rounded-md">
                {/* 點狀背景 */}
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #9ca3af 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                ></div>

                {/* 系統架構圖 */}
                <div className="relative z-10">
                  <h4 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                    系統架構圖
                  </h4>

                  {/* 橫向架構流程 */}
                  <div className="flex items-center justify-center space-x-6 flex-wrap gap-y-6">
                    {/* 前端層 */}
                    <div className="flex flex-col items-center">
                      <div
                        className="bg-white/10 border-4 border-gray-300 rounded-lg p-4 px-8 shadow-sm relative"
                        style={{
                          boxShadow: "inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
                          border: "1px solid #d1d5db",
                          outline: "1px solid #e5e7eb",
                          outlineOffset: "6px",
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <SiReact size={24} color="#000000" />
                          <SiTypescript size={24} color="#000000" />
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-700 mt-2">
                        前端介面
                      </div>
                      <div className="text-xs text-gray-500">
                        React + TypeScript
                      </div>
                    </div>

                    {/* 連接箭頭 1 */}
                    <motion.div
                      className="text-black"
                      animate={{
                        x: [0, 5, 0],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                        {/* 添加箭頭尾巴的動畫線條 */}
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M3 12h6"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          opacity={0.7}
                        />
                      </svg>
                    </motion.div>

                    {/* API 層 */}
                    <div className="flex flex-col items-center">
                      <div
                        className="bg-white/10 border-4 border-gray-300 rounded-lg p-4 px-8 shadow-sm relative"
                        style={{
                          boxShadow: "inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
                          border: "1px solid #d1d5db",
                          outline: "1px solid #e5e7eb",
                          outlineOffset: "6px",
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <SiNestjs size={24} color="#000000" />
                          <SiNodedotjs size={24} color="#000000" />
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-700 mt-2">
                        後端服務
                      </div>
                      <div className="text-xs text-gray-500">
                        NestJS + Node.js
                      </div>
                    </div>

                    {/* 連接箭頭 2 */}
                    <motion.div
                      className="text-black"
                      animate={{
                        x: [0, 5, 0],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.1,
                      }}
                    >
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                        {/* 添加箭頭尾巴的動畫線條 */}
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M3 12h6"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.1,
                          }}
                          opacity={0.7}
                        />
                      </svg>
                    </motion.div>

                    {/* 外部服務層 */}
                    <div className="flex flex-col items-center">
                      <div
                        className="bg-white/10 border-4 border-gray-300 rounded-lg p-4 px-8 shadow-sm relative"
                        style={{
                          boxShadow: "inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
                          border: "1px solid #d1d5db",
                          outline: "1px solid #e5e7eb",
                          outlineOffset: "6px",
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <SiNotion size={24} color="#000000" />
                          <SiApacheecharts size={24} color="#000000" />
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-700 mt-2">
                        外部服務
                      </div>
                      <div className="text-xs text-gray-500">
                        Notion + Charts
                      </div>
                    </div>

                    {/* 連接箭頭 3 */}
                    <motion.div
                      className="text-black"
                      animate={{
                        x: [0, 5, 0],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                    >
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                        {/* 添加箭頭尾巴的動畫線條 */}
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M3 12h6"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.2,
                          }}
                          opacity={0.7}
                        />
                      </svg>
                    </motion.div>

                    {/* 部署層 */}
                    <div className="flex flex-col items-center">
                      <div
                        className="bg-white/10 border-4 border-gray-300 rounded-lg p-4 px-8 shadow-sm relative"
                        style={{
                          boxShadow: "inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
                          border: "1px solid #d1d5db",
                          outline: "1px solid #e5e7eb",
                          outlineOffset: "6px",
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <SiDocker size={24} color="#000000" />
                          <SiKubernetes size={24} color="#000000" />
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-700 mt-2">
                        容器部署
                      </div>
                      <div className="text-xs text-gray-500">Docker + K8s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
