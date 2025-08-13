import React from "react";
import { motion } from "framer-motion";
import {
  CameraIcon,
  HeartIcon,
  ArchiveBoxIcon,
  AdjustmentsHorizontalIcon,
  ShareIcon,
  ChartPieIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
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
  SiGithub,
  SiGithubactions,
  SiPrometheus,
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
                {/* 系統架構圖 - 分層式垂直排列 */}
                <div
                  className="relative z-10 font-sans"
                  style={{
                    fontFamily:
                      '"Microsoft JhengHei", "微軟正黑體", "PingFang TC", "Noto Sans TC", "Helvetica Neue", Arial, "Liberation Sans", sans-serif',
                  }}
                >
                  <h4 className="text-2xl font-bold text-gray-900 mb-12 text-center">
                    系統架構圖
                  </h4>
                  <div className="flex flex-col items-center gap-10">
                    {/* Frontend Layer */}
                    <div className="w-full max-w-4xl relative flex items-center justify-center">
                      <div className="relative w-full flex flex-col items-center">
                        {/* badge 垂直置於頂端正中間，圓弧矩形 */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-3 z-20 pointer-events-none">
                          <div
                            className="bg-black/90 text-white text-xs leading-loose px-5 py-1 rounded-md font-bold tracking-widest border border-white/20 text-nowrap"
                            style={{
                              letterSpacing: "0.1em",
                              fontFamily: "inherit",
                            }}
                          >
                            Frontend Layer
                          </div>
                        </div>
                        <div className="w-full max-w-4xl bg-gray-100/80 p-2 rounded-2xl border border-gray-200/60 backdrop-blur-sm">
                          <div
                            className="rounded-xl bg-white p-6 md:p-8 text-gray-700 flex flex-col md:flex-row gap-6 items-stretch shadow-sm"
                            style={{ fontFamily: "inherit" }}
                          >
                            {/* 技術選型 */}
                            <div className="flex-1 flex flex-col items-center justify-center mt-6 md:mt-0">
                              <div className="flex items-center gap-4 mb-2">
                                <SiReact size={30} color="#000" />
                                <SiTailwindcss size={30} color="#000" />
                              </div>
                              <div className="font-bold text-gray-700 mb-1">
                                技術選型
                              </div>
                              <div className="text-xs text-gray-500 text-center">
                                React / TailwindCSS
                              </div>
                            </div>
                            {/* 分隔線 */}
                            <div className="hidden md:block w-px bg-gray-200 mx-2"></div>
                            {/* 功能模組 */}
                            <div className="flex-[2] grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-4 mb-4 md:mb-0">
                              {/* Query Builder */}
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 mb-1">
                                  <AdjustmentsHorizontalIcon className="w-5 h-5 text-black" />
                                </div>
                                <div className="text-gray-800 whitespace-nowrap">
                                  Query Builder
                                </div>
                                <div className="text-xs text-gray-500 text-center whitespace-nowrap">
                                  動態組合查詢
                                </div>
                              </div>
                              {/* 分享與嵌入功能 */}
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 mb-1">
                                  <ShareIcon className="w-5 h-5 text-black" />
                                </div>
                                <div className="text-gray-800 whitespace-nowrap">
                                  Shared & Embed
                                </div>
                                <div className="text-xs text-gray-500 text-center whitespace-nowrap">
                                  一鍵分享/嵌入
                                </div>
                              </div>
                              {/* 圖表生成器 */}
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 mb-1">
                                  <ChartPieIcon className="w-5 h-5 text-black" />
                                </div>
                                <div className="text-gray-800 whitespace-nowrap">
                                  Chart Viewer
                                </div>
                                <div className="text-xs text-gray-500 text-center whitespace-nowrap">
                                  ECharts 驅動
                                </div>
                              </div>
                              {/* 表格檢視器 */}
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 mb-1">
                                  <TableCellsIcon className="w-5 h-5 text-black" />
                                </div>
                                <div className="text-gray-800 whitespace-nowrap">
                                  Table Viewer
                                </div>
                                <div className="text-xs text-gray-500 text-center whitespace-nowrap">
                                  資料表格展示
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Arrow with Gradient Flow */}
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-12 h-16"
                        viewBox="0 0 48 64"
                        fill="none"
                      >
                        <defs>
                          <linearGradient
                            id="arrowGradient1"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#9ca3af"
                              stopOpacity="0.6"
                            />
                            <stop
                              offset="50%"
                              stopColor="#6b7280"
                              stopOpacity="0.8"
                            />
                            <stop
                              offset="100%"
                              stopColor="#374151"
                              stopOpacity="1"
                            />
                          </linearGradient>

                          <linearGradient
                            id="arrowShadow"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#000000"
                              stopOpacity="0.1"
                            />
                            <stop
                              offset="100%"
                              stopColor="#000000"
                              stopOpacity="0.2"
                            />
                          </linearGradient>
                        </defs>

                        {/* Shadow */}
                        <path
                          d="M25 8 L25 48 M25 48 L19 42 M25 48 L31 42"
                          stroke="url(#arrowShadow)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity="0.3"
                        />

                        {/* Main Arrow */}
                        <path
                          d="M24 6 L24 46 M24 46 L18 40 M24 46 L30 40"
                          stroke="url(#arrowGradient1)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {/* Backend Layer */}
                    <div className="w-full max-w-4xl relative flex items-center justify-center">
                      <div className="relative w-full flex flex-col items-center">
                        {/* badge 垂直置於頂端正中間，圓弧矩形 */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-3 z-20 pointer-events-none">
                          <div
                            className="bg-black/90 text-white text-xs leading-loose px-5 py-1 rounded-md font-bold tracking-widest border border-white/20 text-nowrap"
                            style={{
                              letterSpacing: "0.1em",
                              fontFamily: "inherit",
                            }}
                          >
                            Backend Layer
                          </div>
                        </div>
                        <div className="w-full max-w-4xl bg-gray-100/80 p-2 rounded-2xl border border-gray-200/60 backdrop-blur-sm">
                          <div
                            className="rounded-xl bg-white p-6 md:p-8 text-gray-700 flex flex-col md:flex-row gap-6 items-stretch shadow-sm"
                            style={{ fontFamily: "inherit" }}
                          >
                            {/* 技術選型 */}
                            <div className="flex-1 flex flex-col items-center justify-center mt-6 md:mt-0">
                              <div className="flex items-center gap-4 mb-2">
                                <SiNestjs size={30} color="#000" />
                                <SiNodedotjs size={30} color="#000" />
                              </div>
                              <div className="font-bold text-gray-700 mb-1">
                                技術選型
                              </div>
                              <div className="text-xs text-gray-500 text-center">
                                Node.js / NestJS
                              </div>
                            </div>
                            <div className="hidden md:block w-px bg-gray-200 mx-2"></div>
                            {/* 功能模組 */}
                            <div className="flex-[2] grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-4 mb-4 md:mb-0">
                              {/* Notion API */}
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 mb-1">
                                  <SiNotion size={20} color="#000" />
                                </div>
                                <div className="text-gray-800 whitespace-nowrap">
                                  Notion API
                                </div>
                                <div className="text-xs text-gray-500 text-center whitespace-nowrap">
                                  資料庫與頁面檢索
                                </div>
                              </div>
                              {/* Snapshot API */}
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 mb-1">
                                  <CameraIcon className="w-5 h-5 text-black" />
                                </div>
                                <div className="text-gray-800 whitespace-nowrap">
                                  Snapshot API
                                </div>
                                <div className="text-xs text-gray-500 text-center whitespace-nowrap">
                                  快照管理
                                </div>
                              </div>
                              {/* Health API */}
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 mb-1">
                                  <HeartIcon className="w-5 h-5 text-black" />
                                </div>
                                <div className="text-gray-800 whitespace-nowrap">
                                  Health API
                                </div>
                                <div className="text-xs text-gray-500 text-center whitespace-nowrap">
                                  狀態檢查
                                </div>
                              </div>
                              {/* Metric */}
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 mb-1">
                                  <SiPrometheus size={20} color="#000" />
                                </div>
                                <div className="text-gray-800 whitespace-nowrap">
                                  Metric
                                </div>
                                <div className="text-xs text-gray-500 text-center whitespace-nowrap">
                                  指標監控
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Arrow with Gradient Flow */}
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-12 h-16"
                        viewBox="0 0 48 64"
                        fill="none"
                      >
                        <defs>
                          <linearGradient
                            id="arrowGradient2"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#9ca3af"
                              stopOpacity="0.6"
                            />
                            <stop
                              offset="50%"
                              stopColor="#6b7280"
                              stopOpacity="0.8"
                            />
                            <stop
                              offset="100%"
                              stopColor="#374151"
                              stopOpacity="1"
                            />
                          </linearGradient>

                          <linearGradient
                            id="arrowShadow2"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#000000"
                              stopOpacity="0.1"
                            />
                            <stop
                              offset="100%"
                              stopColor="#000000"
                              stopOpacity="0.2"
                            />
                          </linearGradient>
                        </defs>

                        {/* Shadow */}
                        <path
                          d="M25 8 L25 48 M25 48 L19 42 M25 48 L31 42"
                          stroke="url(#arrowShadow2)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity="0.3"
                        />

                        {/* Main Arrow */}
                        <path
                          d="M24 6 L24 46 M24 46 L18 40 M24 46 L30 40"
                          stroke="url(#arrowGradient2)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {/* Containerized */}
                    <div className="w-full max-w-4xl relative flex items-center justify-center">
                      <div className="relative w-full flex flex-col items-center">
                        {/* badge 垂直置於頂端正中間，圓弧矩形 */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-3 z-20 pointer-events-none">
                          <div
                            className="bg-black/90 text-white text-xs leading-loose px-5 py-1 rounded-md font-bold tracking-widest border border-white/20 text-nowrap"
                            style={{
                              letterSpacing: "0.1em",
                              fontFamily: "inherit",
                            }}
                          >
                            Containerized
                          </div>
                        </div>
                        <div className="w-full max-w-4xl bg-gray-100/80 p-2 rounded-2xl border border-gray-200/60 backdrop-blur-sm">
                          <div
                            className="rounded-xl bg-white p-6 md:p-8 text-gray-700 flex flex-col md:flex-row gap-6 items-stretch shadow-sm"
                            style={{ fontFamily: "inherit" }}
                          >
                            {/* 技術選型 */}
                            <div className="flex-1 flex flex-col items-center justify-center mt-6 md:mt-0">
                              <div className="flex items-center gap-4 mb-2">
                                <SiDocker size={30} color="#000" />
                                <SiKubernetes size={30} color="#000" />
                              </div>
                              <div className="font-bold text-gray-700 mb-1">
                                技術選型
                              </div>
                              <div className="text-xs text-gray-500 text-center">
                                Docker / k8s
                              </div>
                            </div>
                            <div className="hidden md:block w-px bg-gray-200 mx-2"></div>
                            {/* 功能模組 */}
                            <div className="flex-[2] grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-4 mb-4 md:mb-0">
                              {/* GitHub Actions */}
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 mb-1">
                                  <SiGithub size={20} color="#000" />
                                </div>
                                <div className="text-gray-800 whitespace-nowrap">
                                  GitHub Actions
                                </div>
                                <div className="text-xs text-gray-500 text-center whitespace-nowrap">
                                  CI/CD 自動化
                                </div>
                              </div>
                              {/* Notion API Service */}
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 mb-1">
                                  <SiDocker size={20} color="#000" />
                                </div>
                                <div className="text-gray-800 whitespace-nowrap">
                                  Docker
                                </div>
                                <div className="text-xs text-gray-500 text-center whitespace-nowrap">
                                  建立容器映像檔
                                </div>
                              </div>
                              {/* 快照儲存系統 */}
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 mb-1">
                                  <ArchiveBoxIcon className="w-5 h-5 text-black" />
                                </div>
                                <div className="text-gray-800 whitespace-nowrap">
                                  Container Registry
                                </div>
                                <div className="text-xs text-gray-500 text-center whitespace-nowrap">
                                  容器映像檔儲存
                                </div>
                              </div>
                              {/* Kubernetes */}
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 mb-1">
                                  <SiKubernetes size={20} color="#000" />
                                </div>
                                <div className="text-gray-800 whitespace-nowrap">
                                  Kubernetes
                                </div>
                                <div className="text-xs text-gray-500 text-center whitespace-nowrap">
                                  雲端部署管理
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
