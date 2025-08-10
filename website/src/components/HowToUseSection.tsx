import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle, Play, Download, Settings, Share2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';

const HowToUseSection: React.FC = () => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string, commandType: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(commandType);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const steps = [
    {
      number: 1,
      title: '安裝與設定',
      description: '使用 Docker 快速部署，或者從源碼編譯安裝',
      icon: Download,
      content: {
        docker: 'docker run -p 3000:3000 stevelin100132/notion-chart-generator',
        git: 'git clone https://github.com/SteveLin100132/notion-chart-generator.git'
      }
    },
    {
      number: 2,
      title: '配置 Notion 整合',
      description: '設定 Notion API 金鑰，並選擇要連接的資料庫',
      icon: Settings,
      content: {
        env: 'NOTION_API_KEY=your_notion_api_key\nNOTION_DATABASE_ID=your_database_id'
      }
    },
    {
      number: 3,
      title: '選擇圖表類型',
      description: '根據你的資料特性，選擇最適合的圖表類型',
      icon: Play,
      features: ['長條圖', '圓餅圖', '折線圖', '散佈圖', '熱力圖']
    },
    {
      number: 4,
      title: '分享與嵌入',
      description: '生成分享連結或 iframe 代碼，輕鬆整合到其他平台',
      icon: Share2,
      content: {
        iframe: '<iframe src="https://your-domain.com/chart/123" width="600" height="400"></iframe>'
      }
    }
  ];

  const deploymentMethods = [
    {
      title: 'Docker 部署',
      description: '最簡單的部署方式，適合快速體驗',
      commands: [
        'docker pull stevelin100132/notion-chart-generator',
        'docker run -d -p 3000:3000 --name notion-chart stevelin100132/notion-chart-generator'
      ],
      icon: '🐳'
    },
    {
      title: '原始碼部署',
      description: '適合開發者進行自定義修改',
      commands: [
        'git clone https://github.com/SteveLin100132/notion-chart-generator.git',
        'cd notion-chart-generator',
        'npm install',
        'npm run build',
        'npm start'
      ],
      icon: '⚡'
    },
    {
      title: 'Kubernetes 部署',
      description: '適合生產環境的大規模部署',
      commands: [
        'kubectl apply -f k8s/',
        'kubectl get pods',
        'kubectl port-forward svc/notion-chart-generator 3000:3000'
      ],
      icon: '☸️'
    }
  ];

  return (
    <section id="how-to-use" className="section-padding bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            如何使用
          </h2>
          <p className="text-xl text-secondary leading-relaxed">
            簡單四個步驟，讓你快速上手 Notion Chart Generator。
            從安裝到使用，我們提供詳細的指導和多種部署選項。
          </p>
        </motion.div>

        {/* Usage Steps */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.number}
                    </div>
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-primary">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-secondary">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {step.content && (
                    <div className="space-y-3">
                      {Object.entries(step.content).map(([key, value]) => (
                        <div key={key} className="relative">
                          <pre className="bg-gray-100 rounded-lg p-3 text-sm overflow-x-auto">
                            <code>{value}</code>
                          </pre>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(value, `${step.number}-${key}`)}
                          >
                            {copiedCommand === `${step.number}-${key}` ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  {step.features && (
                    <div className="flex flex-wrap gap-2">
                      {step.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Deployment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-primary text-center mb-8">
            部署方式
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {deploymentMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-3">{method.icon}</div>
                    <CardTitle className="text-lg font-bold text-primary">
                      {method.title}
                    </CardTitle>
                    <CardDescription className="text-secondary">
                      {method.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {method.commands.map((command, cmdIndex) => (
                        <div key={cmdIndex} className="relative group">
                          <pre className="bg-gray-100 rounded-md p-2 text-xs overflow-x-auto">
                            <code>{command}</code>
                          </pre>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => copyToClipboard(command, `deploy-${index}-${cmdIndex}`)}
                          >
                            {copiedCommand === `deploy-${index}-${cmdIndex}` ? (
                              <CheckCircle className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
          className="text-center bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-primary mb-4">
            準備開始了嗎？
          </h3>
          <p className="text-secondary text-lg mb-6 max-w-2xl mx-auto">
            立即體驗 Notion Chart Generator，將你的 Notion 資料轉換成精美的圖表。
            開源免費，支援多種部署方式。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.open('https://github.com/SteveLin100132/notion-chart-generator', '_blank')}
            >
              查看 GitHub 專案
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => copyToClipboard('docker run -p 3000:3000 stevelin100132/notion-chart-generator', 'cta-docker')}
            >
              {copiedCommand === 'cta-docker' ? '已複製！' : '複製 Docker 指令'}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToUseSection;
