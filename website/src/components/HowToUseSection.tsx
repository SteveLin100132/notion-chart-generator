import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import SvgBackgroundDecoration from "./ui/SvgBackgroundDecoration";

const HowToUseSection: React.FC = () => {
  // 對應每個 tab 的 wireframe 圖片
  const wireframeImages = React.useMemo(
    () => [
      "/images/basic-feature-demo.gif",
      "/images/advanced-filter-demo.gif",
      "/images/share-embed-demo.gif",
    ],
    []
  );

  // 預載 wireframe 圖片
  React.useEffect(() => {
    wireframeImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [wireframeImages]);

  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  // Tab 狀態與 badge 資料
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const featureBadges: string[][] = [
    ["多種圖表類型", "原始資料表格", "即時預覽"],
    ["支援原生 Notion 屬性", "多條件篩選", "自訂篩選群組"],
    ["一鍵分享", "iframe 嵌入", "快照存取"],
  ];

  const copyToClipboard = (text: string, commandType: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(commandType);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const deploymentMethods = [
    {
      title: "原始碼部署",
      description: "適合開發者進行自定義修改",
      commands: [
        "git clone https://github.com/SteveLin100132/notion-chart-generator.git",
        "cd notion-chart-generator",
        "npm install",
        "npm run build",
        "npm start",
      ],
      imageUrl: "./images/docker-deployment.png",
      sourceCodeUrl: "https://github.com/SteveLin100132/notion-chart-generator",
    },
    {
      title: "Docker 部署",
      description: "最簡單的部署方式，適合快速體驗",
      commands: [
        "docker pull stevelin100132/notion-chart-generator",
        "docker run -d -p 3000:3000 --name notion-chart stevelin100132/notion-chart-generator",
        " ",
        " ",
        " ",
      ],
      imageUrl: "./images/docker-deployment.png",
      sourceCodeUrl:
        "https://github.com/SteveLin100132/notion-chart-generator/blob/master/docker-compose.yml",
    },
    {
      title: "Kubernetes 部署",
      description: "適合生產環境的大規模部署",
      commands: [
        "kubectl apply -f k8s/",
        "kubectl get pods",
        "kubectl port-forward svc/notion-chart-generator 3000:3000",
        " ",
        " ",
      ],
      imageUrl: "./images/docker-deployment.png",
      sourceCodeUrl:
        "https://github.com/SteveLin100132/notion-chart-generator/tree/master/k8s",
    },
  ];

  return (
    <section
      id="how-to-use"
      className="section-padding bg-white px-4 sm:px-6 md:px-8"
    >
      {/* Section Divider - 流星線條 */}
      <div className="relative mb-20 flex flex-col items-center">
        {/* 主分界線 */}
        <div className="w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-40"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            如何
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 bg-black transform -rotate-2 rounded-md"></span>
              <span className="relative inline-block text-white font-bold transform -rotate-2">
                使用
              </span>
            </span>
          </h2>
          <p className="text-xl text-secondary leading-relaxed">
            簡單幾個步驟，讓你快速上手 Notion Chart Generator。
            從安裝到使用，我們提供詳細的說明和多種部署選項。
          </p>
        </motion.div>

        {/* Tab Demo Section */}
        <div className="mb-16">
          {/* Tab 按鈕 */}
          <div className="flex justify-center gap-4 mb-6">
            {["圖表生成", "進階篩選", "分享與嵌入"].map((tab, idx) => (
              <Button
                key={tab}
                size="lg"
                className={`px-6 py-2 rounded-full font-semibold border transition-colors duration-150 ${
                  selectedTab === idx
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-black hover:bg-gray-100"
                }`}
                style={{ minWidth: 0 }}
                onClick={() => setSelectedTab(idx)}
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* 功能特色 badge */}
          <div className="flex flex-row flex-wrap justify-center gap-6 my-12">
            {featureBadges[selectedTab].map((feature: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-2 text-gray-700 text-base font-medium whitespace-nowrap"
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 border border-gray-300">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 8.5L7 11.5L12 5.5"
                      stroke="#222"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Wireframe Demo 圖片區塊 */}
          <div className="flex justify-center">
            <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm p-4 w-full max-w-6xl">
              {/* wireframe header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block"></span>
              </div>
              <div className="bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={wireframeImages[selectedTab]}
                  alt="Demo GIF"
                  className="object-cover w-full h-full border border-gray-200 rounded-xl"
                  style={{ background: "#FFFFFF", display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-primary text-center mb-8">
            部署方式
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deploymentMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden w-full">
                  {/* Top: image left, title/desc right */}
                  <div className="flex items-center gap-4 p-6 pb-0">
                    {/* <div
                      className="w-16 h-16 rounded-lg border border-gray-200 bg-white flex-shrink-0"
                      style={{
                        backgroundImage: `url(${method.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                      aria-label={method.title}
                    /> */}
                    <div className="flex flex-col w-full justify-center items-center mt-2">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {method.title}
                      </h3>
                      <p className="text-lg text-gray-600 mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                  {/* Bottom: wireframe terminal on gray dotted bg, flush bottom */}
                  <div className="p-6 pt-4 pb-0 mt-2 flex-1 flex flex-col justify-top">
                    {/* Floating icon buttons at top-right of terminal wireframe */}
                    <div className="relative">
                      <div className="absolute top-3 right-3 flex gap-2 z-20">
                        <button
                          aria-label="View Code"
                          className="p-2 rounded-md bg-white/90 border border-gray-300 shadow hover:bg-gray-100/80 transition"
                          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                          onClick={() =>
                            window.open(method.sourceCodeUrl, "_blank")
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M8 16l4-4-4-4m8 8V8"
                            />
                          </svg>
                        </button>
                        <button
                          aria-label="複製全部指令"
                          className="p-2 rounded-md bg-white/90 border border-gray-300 shadow hover:bg-gray-100/80 transition flex items-center"
                          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                          onClick={() =>
                            copyToClipboard(
                              method.commands.join("\n"),
                              `deploy-demo-${index}`
                            )
                          }
                        >
                          {copiedCommand === `deploy-demo-${index}` ? (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M6 10.5L9 13.5L14 7.5"
                                stroke="#222"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <rect
                                x="6.5"
                                y="2.5"
                                width="12"
                                height="13"
                                rx="3"
                                fill="#e3e3e5"
                                stroke="#212529"
                                strokeWidth="0.75"
                              />
                              <rect
                                x="2.5"
                                y="6.5"
                                width="12"
                                height="13"
                                rx="3"
                                fill="#e3e3e5"
                                stroke="#212529"
                                strokeWidth="0.75"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="rounded-t-xl h-[240px] border border-gray-200 border-b-0 bg-gray-50 relative overflow-hidden flex flex-col justify-end">
                        {/* Dotted background */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle, #ece3ef 1px, transparent 1px)",
                            backgroundSize: "10px 10px",
                          }}
                        />
                        {/* Wireframe terminal flush bottom, no horizontal scroll */}
                        <div className="relative pl-4 z-10 flex flex-col justify-end h-full">
                          <div className="h-[210px] bg-black border-x-8 border-black rounded-tl-xl px-1 py-3 text-xs font-mono text-green-400 whitespace-pre overflow-hidden relative">
                            {/* Mac window buttons inside terminal */}
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
                              <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
                              <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
                            </div>
                            <div style={{ paddingTop: 18 }}>
                              {method.commands.join("\n")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden text-center bg-gradient-to-r from-gray-50 to-gray-500/5 rounded-xl p-8"
        >
          <SvgBackgroundDecoration />
          <h3 className="text-2xl font-bold text-primary mb-4">
            準備開始了嗎？
          </h3>
          <p className="text-secondary text-lg mb-6 max-w-2xl mx-auto">
            立即體驗 Notion Chart Generator，將你的 Notion
            資料轉換成精美的圖表。 開源免費，支援多種部署方式。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="rounded-full"
              size="lg"
              onClick={() =>
                window.open(
                  "https://github.com/SteveLin100132/notion-chart-generator",
                  "_blank"
                )
              }
            >
              查看 GitHub 專案
            </Button>
            <Button
              className="rounded-full"
              variant="outline"
              size="lg"
              onClick={() =>
                copyToClipboard(
                  "docker run -p 3000:3000 stevelin100132/notion-chart-generator",
                  "cta-docker"
                )
              }
            >
              {copiedCommand === "cta-docker" ? "已複製！" : "複製 Docker 指令"}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToUseSection;
