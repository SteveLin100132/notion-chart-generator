import React from "react";
import { motion } from "framer-motion";
import { Github, Heart, Mail, ExternalLink } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="./logo.png"
                alt="Notion Chart Generator"
                className="w-10 h-10 object-contain bg-white rounded-lg p-1"
              />
              <span className="font-bold text-xl">Notion Chart Generator</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              一個開源的工具，讓你輕鬆將 Notion 資料庫轉換成精美的圖表。
              支援多種圖表類型、資料聚合、進階篩選，並可輕鬆分享與嵌入。
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/SteveLin100132/notion-chart-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href="mailto:contact@example.com"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="w-5 h-5" />
                <span>聯絡我們</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4">快速連結</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-gray-300 hover:text-white transition-colors font-sans"
                >
                  特色功能
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("tech-stack")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-gray-300 hover:text-white transition-colors font-sans"
                >
                  技術棧
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("how-to-use")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-gray-300 hover:text-white transition-colors font-sans"
                >
                  使用說明
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/SteveLin100132/notion-chart-generator/blob/master/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>文檔</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4">資源</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/SteveLin100132/notion-chart-generator/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>下載</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/SteveLin100132/notion-chart-generator/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>問題回報</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/SteveLin100132/notion-chart-generator/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>討論區</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://hub.docker.com/r/stevelin100132/notion-chart-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>Github Image Registry</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-600 mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300">
              <span>© {currentYear} Notion Chart Generator. Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>
                by &nbsp;
                <a
                  rel="noreferrer noopener"
                  target="_blank"
                  href="https://github.com/SteveLin100132"
                  className="text-slate-50 transition-all border-primary hover:border-b-2"
                >
                  steve・LIN
                </a>
                .
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="bg-white rounded-md p-3 transition-colors font-sans"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
