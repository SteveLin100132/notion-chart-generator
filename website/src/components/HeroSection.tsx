import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Download, Share2, Filter } from "lucide-react";
import { Button } from "./ui/Button";

const HeroSection: React.FC = () => {
  const scrollToFeatures = () => {
    const element = document.getElementById("features");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[75vh] overflow-hidden pt-16">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="h-full w-full bg-grid-pattern bg-grid-size animate-pulse-slow"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-gray-50/80"></div>

      {/* White Gradient Overlay for Fade Out Effect at bottom - more gentle */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white via-white/60 to-transparent z-30 pointer-events-none"></div>

      <div className="relative container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col h-[calc(75vh-8rem)]">
          {/* Top Content - Text Introduction */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 z-10 max-w-4xl mx-auto flex-shrink-0 pt-8"
          >
            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-relaxed"
              >
                將你的{" "}
                <span className="relative inline-block px-3 py-2 mx-1">
                  <span className="absolute inset-0 bg-gray-500 transform -rotate-1 rounded-md"></span>
                  <span className="relative inline-block text-white font-bold transform -rotate-1">
                    Notion 資料
                  </span>
                </span>
                <br />
                轉換成
                <span className="relative inline-block px-3 py-2 mx-1">
                  <span className="absolute inset-0 bg-black transform rotate-2 rounded-md"></span>
                  <span className="relative inline-block text-white font-bold transform rotate-2">
                    精美圖表
                  </span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg lg:text-xl text-secondary leading-loose max-w-3xl mx-auto"
              >
                一個現代化的 Web 應用程式，能夠連接 Notion
                資料庫並將資料轉為美觀的互動式圖表。支援多種圖表類型、資料聚合計算、即時分享和跨平台嵌入功能。無論是數據分析、報告製作還是團隊協作，都能輕鬆勝任。
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={scrollToFeatures}
                className="group shadow-lg hover:shadow-xl transition-all duration-300"
              >
                開始探索
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  window.open(
                    "https://github.com/SteveLin100132/notion-chart-generator",
                    "_blank"
                  )
                }
                className="backdrop-blur-sm bg-white/10 border-white/20 text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 transition-all duration-300"
              >
                查看原始碼
              </Button>
            </motion.div>

            {/* Features Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <div className="flex items-center space-x-2 text-secondary">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span className="font-medium">多種圖表類型</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary">
                <Download className="w-5 h-5 text-primary" />
                <span className="font-medium">圖表匯出</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary">
                <Share2 className="w-5 h-5 text-primary" />
                <span className="font-medium">分享嵌入</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Content - App Preview extending to section bottom */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10 w-full max-w-6xl mx-auto mt-4 flex-1 flex items-end"
          >
            {/* App preview image that extends to bottom */}
            <div className="w-full">
              <img
                src="./images/app-preview.png"
                alt="Notion Chart Generator 系統預覽"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Enhanced Floating Elements - moved closer */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-2xl p-4 shadow-md backdrop-blur-sm border border-gray-600/20"
            >
              <BarChart3 className="w-6 h-6" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-2 -left-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-4 shadow-md backdrop-blur-sm border border-gray-600/20"
            >
              <Share2 className="w-6 h-6" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, -8, 0],
                x: [0, 8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-1/4 -right-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl p-3 shadow-md backdrop-blur-sm border border-gray-600/20"
            >
              <Filter className="w-5 h-5" />
            </motion.div>

            {/* Feature Badges - moved closer */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
              className="absolute top-2 left-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md z-20"
            >
              ✨ 即時預覽
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="absolute bottom-1/4 left-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md z-20"
            >
              🎯 精準分析
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
