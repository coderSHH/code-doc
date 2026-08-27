import { defineConfig } from 'vitepress'

// 正文 data-pagefind-body 打标由 scripts/tag-pagefind.mjs 在 vitepress build
// 之后、pagefind 之前执行（见 package.json build 脚本）。

const notesSidebar = [
  {
    "text": "前端",
    "collapsed": true,
    "items": [
      {
        "text": "HTML / CSS",
        "collapsed": true,
        "items": [
          {
            "text": "HTML 语义化",
            "link": "/notes/frontend/html-css/html/"
          },
          {
            "text": "CSS 核心",
            "link": "/notes/frontend/html-css/css/"
          },
          {
            "text": "响应式布局",
            "link": "/notes/frontend/html-css/responsive-layout/"
          },
          {
            "text": "CSS 架构",
            "link": "/notes/frontend/html-css/css-architecture/"
          }
        ]
      },
      {
        "text": "JavaScript / TypeScript",
        "collapsed": true,
        "items": [
          {
            "text": "JavaScript 核心",
            "link": "/notes/frontend/js-ts/javascript-core/"
          },
          {
            "text": "TypeScript",
            "link": "/notes/frontend/js-ts/typescript/"
          },
          {
            "text": "ES 新特性",
            "link": "/notes/frontend/js-ts/es-next/"
          },
          {
            "text": "异步编程",
            "link": "/notes/frontend/js-ts/async-programming/"
          }
        ]
      },
      {
        "text": "框架生态",
        "collapsed": true,
        "items": [
          {
            "text": "Vue",
            "collapsed": true,
            "items": [
              {
                "text": "Vue",
                "link": "/notes/frontend/frameworks/vue/"
              },
              {
                "text": "Vue 3 Composition API",
                "link": "/notes/frontend/frameworks/vue/vue3/"
              },
              {
                "text": "Pinia",
                "link": "/notes/frontend/frameworks/vue/pinia/"
              },
              {
                "text": "Vue Router",
                "link": "/notes/frontend/frameworks/vue/vue-router/"
              },
              {
                "text": "Nuxt.js",
                "link": "/notes/frontend/frameworks/vue/nuxt/"
              }
            ]
          },
          {
            "text": "React",
            "collapsed": true,
            "items": [
              {
                "text": "React",
                "link": "/notes/frontend/frameworks/react/"
              },
              {
                "text": "React 核心",
                "link": "/notes/frontend/frameworks/react/react-core/"
              },
              {
                "text": "Redux / Zustand",
                "link": "/notes/frontend/frameworks/react/redux/"
              },
              {
                "text": "React Router",
                "link": "/notes/frontend/frameworks/react/react-router/"
              },
              {
                "text": "Next.js",
                "link": "/notes/frontend/frameworks/react/nextjs/"
              }
            ]
          },
          {
            "text": "Svelte",
            "link": "/notes/frontend/frameworks/svelte/"
          },
          {
            "text": "状态管理",
            "link": "/notes/frontend/frameworks/state-management/"
          }
        ]
      },
      {
        "text": "工程化",
        "collapsed": true,
        "items": [
          {
            "text": "构建工具（Vite / Webpack）",
            "link": "/notes/frontend/engineering/vite-webpack/"
          },
          {
            "text": "Monorepo",
            "link": "/notes/frontend/engineering/monorepo/"
          },
          {
            "text": "代码规范",
            "link": "/notes/frontend/engineering/code-quality/"
          },
          {
            "text": "测试",
            "link": "/notes/frontend/engineering/testing/"
          },
          {
            "text": "设计系统",
            "link": "/notes/frontend/engineering/design-system/"
          }
        ]
      },
      {
        "text": "性能优化",
        "collapsed": true,
        "items": [
          {
            "text": "加载性能",
            "link": "/notes/frontend/performance/loading-performance/"
          },
          {
            "text": "运行时性能",
            "link": "/notes/frontend/performance/runtime-performance/"
          },
          {
            "text": "渲染优化",
            "link": "/notes/frontend/performance/rendering-optimization/"
          },
          {
            "text": "CDN 与资源优化",
            "link": "/notes/frontend/performance/cdn-optimization/"
          }
        ]
      },
      {
        "text": "浏览器原理",
        "collapsed": true,
        "items": [
          {
            "text": "渲染流水线",
            "link": "/notes/frontend/browser/rendering-pipeline/"
          },
          {
            "text": "事件循环",
            "link": "/notes/frontend/browser/event-loop/"
          },
          {
            "text": "存储机制",
            "link": "/notes/frontend/browser/storage/"
          },
          {
            "text": "浏览器安全",
            "link": "/notes/frontend/browser/security/"
          },
          {
            "text": "浏览器网络",
            "link": "/notes/frontend/browser/network/"
          }
        ]
      }
    ]
  },
  {
    "text": "后端",
    "collapsed": true,
    "items": [
      {
        "text": "Java / Spring",
        "collapsed": true,
        "items": [
          {
            "text": "Spring Boot",
            "collapsed": true,
            "items": [
              {
                "text": "Spring Boot",
                "link": "/notes/backend/java/spring-boot/"
              },
              {
                "text": "Spring 核心",
                "link": "/notes/backend/java/spring-boot/spring-core/"
              },
              {
                "text": "数据访问",
                "link": "/notes/backend/java/spring-boot/spring-data/"
              },
              {
                "text": "安全与认证",
                "link": "/notes/backend/java/spring-boot/spring-security/"
              }
            ]
          },
          {
            "text": "Spring Cloud",
            "link": "/notes/backend/java/spring-cloud/"
          },
          {
            "text": "JVM 原理",
            "link": "/notes/backend/java/jvm/"
          },
          {
            "text": "并发编程",
            "link": "/notes/backend/java/concurrent-programming/"
          }
        ]
      },
      {
        "text": "Node.js",
        "collapsed": true,
        "items": [
          {
            "text": "Node.js 核心",
            "link": "/notes/backend/nodejs/node-core/"
          },
          {
            "text": "NestJS",
            "link": "/notes/backend/nodejs/nestjs/"
          },
          {
            "text": "Express / Koa",
            "link": "/notes/backend/nodejs/express-koa/"
          },
          {
            "text": "包管理",
            "link": "/notes/backend/nodejs/npm-pnpm/"
          }
        ]
      },
      {
        "text": "数据库",
        "collapsed": true,
        "items": [
          {
            "text": "MySQL",
            "collapsed": true,
            "items": [
              {
                "text": "MySQL",
                "link": "/notes/backend/database/mysql/"
              },
              {
                "text": "索引",
                "link": "/notes/backend/database/mysql/mysql-index/"
              },
              {
                "text": "事务",
                "link": "/notes/backend/database/mysql/mysql-transaction/"
              },
              {
                "text": "查询优化",
                "link": "/notes/backend/database/mysql/mysql-optimization/"
              }
            ]
          },
          {
            "text": "PostgreSQL",
            "link": "/notes/backend/database/postgresql/"
          },
          {
            "text": "MongoDB",
            "link": "/notes/backend/database/mongodb/"
          },
          {
            "text": "Redis",
            "link": "/notes/backend/database/redis/"
          },
          {
            "text": "SQL 优化",
            "link": "/notes/backend/database/sql-optimization/"
          }
        ]
      },
      {
        "text": "微服务 / 分布式",
        "collapsed": true,
        "items": [
          {
            "text": "服务设计",
            "link": "/notes/backend/microservices/service-design/"
          },
          {
            "text": "注册发现",
            "link": "/notes/backend/microservices/service-discovery/"
          },
          {
            "text": "分布式事务",
            "link": "/notes/backend/microservices/distributed-transaction/"
          },
          {
            "text": "API 网关",
            "link": "/notes/backend/microservices/gateway/"
          },
          {
            "text": "一致性协议",
            "link": "/notes/backend/microservices/consensus/"
          }
        ]
      },
      {
        "text": "消息队列",
        "collapsed": true,
        "items": [
          {
            "text": "Kafka",
            "link": "/notes/backend/mq/kafka/"
          },
          {
            "text": "RabbitMQ",
            "link": "/notes/backend/mq/rabbitmq/"
          },
          {
            "text": "RocketMQ",
            "link": "/notes/backend/mq/rocketmq/"
          },
          {
            "text": "消息模式",
            "link": "/notes/backend/mq/mq-patterns/"
          }
        ]
      },
      {
        "text": "缓存",
        "collapsed": true,
        "items": [
          {
            "text": "Redis 实战",
            "link": "/notes/backend/cache/redis-practice/"
          },
          {
            "text": "本地缓存",
            "link": "/notes/backend/cache/local-cache/"
          },
          {
            "text": "缓存策略",
            "link": "/notes/backend/cache/cache-strategy/"
          },
          {
            "text": "缓存一致性",
            "link": "/notes/backend/cache/cache-consistency/"
          }
        ]
      }
    ]
  },
  {
    "text": "运维",
    "collapsed": true,
    "items": [
      {
        "text": "Linux",
        "collapsed": true,
        "items": [
          {
            "text": "Linux 基础",
            "link": "/notes/devops/linux/linux-basics/"
          },
          {
            "text": "Shell 脚本",
            "link": "/notes/devops/linux/shell-scripting/"
          },
          {
            "text": "性能调优",
            "link": "/notes/devops/linux/performance-tuning/"
          },
          {
            "text": "Linux 安全",
            "link": "/notes/devops/linux/linux-security/"
          }
        ]
      },
      {
        "text": "容器 / Kubernetes",
        "collapsed": true,
        "items": [
          {
            "text": "Docker",
            "link": "/notes/devops/containers/docker/"
          },
          {
            "text": "Kubernetes",
            "link": "/notes/devops/containers/kubernetes/"
          },
          {
            "text": "容器网络",
            "link": "/notes/devops/containers/container-network/"
          },
          {
            "text": "容器安全",
            "link": "/notes/devops/containers/container-security/"
          }
        ]
      },
      {
        "text": "CI / CD",
        "collapsed": true,
        "items": [
          {
            "text": "GitHub Actions",
            "link": "/notes/devops/cicd/github-actions/"
          },
          {
            "text": "GitLab CI",
            "link": "/notes/devops/cicd/gitlab-ci/"
          },
          {
            "text": "Jenkins",
            "link": "/notes/devops/cicd/jenkins/"
          },
          {
            "text": "发布策略",
            "link": "/notes/devops/cicd/release-strategy/"
          }
        ]
      },
      {
        "text": "监控告警",
        "collapsed": true,
        "items": [
          {
            "text": "Prometheus",
            "link": "/notes/devops/monitoring/prometheus/"
          },
          {
            "text": "Grafana",
            "link": "/notes/devops/monitoring/grafana/"
          },
          {
            "text": "ELK Stack",
            "link": "/notes/devops/monitoring/elk/"
          },
          {
            "text": "APM 链路追踪",
            "link": "/notes/devops/monitoring/apm/"
          }
        ]
      },
      {
        "text": "云服务",
        "collapsed": true,
        "items": [
          {
            "text": "阿里云",
            "link": "/notes/devops/cloud/aliyun/"
          },
          {
            "text": "腾讯云",
            "link": "/notes/devops/cloud/tencent-cloud/"
          },
          {
            "text": "AWS 基础",
            "link": "/notes/devops/cloud/aws-basics/"
          },
          {
            "text": "Serverless",
            "link": "/notes/devops/cloud/serverless/"
          },
          {
            "text": "对象存储",
            "link": "/notes/devops/cloud/oss/"
          }
        ]
      },
      {
        "text": "网络",
        "collapsed": true,
        "items": [
          {
            "text": "TCP / IP",
            "link": "/notes/devops/network/tcp-ip/"
          },
          {
            "text": "HTTP / HTTPS",
            "link": "/notes/devops/network/http-https/"
          },
          {
            "text": "DNS / CDN",
            "link": "/notes/devops/network/dns-cdn/"
          },
          {
            "text": "网络安全",
            "link": "/notes/devops/network/network-security/"
          }
        ]
      }
    ]
  },
  {
    "text": "工具",
    "collapsed": true,
    "items": [
      {
        "text": "Git",
        "collapsed": true,
        "items": [
          {
            "text": "Git 基础",
            "link": "/notes/tools/git/git-basics/"
          },
          {
            "text": "Git Flow",
            "link": "/notes/tools/git/git-flow/"
          },
          {
            "text": "常用命令",
            "link": "/notes/tools/git/git-commands/"
          },
          {
            "text": "Code Review",
            "link": "/notes/tools/git/code-review/"
          }
        ]
      },
      {
        "text": "编辑器 / IDE",
        "collapsed": true,
        "items": [
          {
            "text": "VS Code",
            "link": "/notes/tools/editors/vscode/"
          },
          {
            "text": "IntelliJ IDEA",
            "link": "/notes/tools/editors/idea/"
          },
          {
            "text": "Vim / Neovim",
            "link": "/notes/tools/editors/vim-neovim/"
          }
        ]
      },
      {
        "text": "调试工具",
        "collapsed": true,
        "items": [
          {
            "text": "浏览器 DevTools",
            "link": "/notes/tools/debug/browser-devtools/"
          },
          {
            "text": "Node 调试",
            "link": "/notes/tools/debug/node-debug/"
          },
          {
            "text": "Charles / Fiddler",
            "link": "/notes/tools/debug/charles-fiddler/"
          }
        ]
      },
      {
        "text": "命令行 / Shell",
        "collapsed": true,
        "items": [
          {
            "text": "Zsh / Bash",
            "link": "/notes/tools/cli/zsh-bash/"
          },
          {
            "text": "终端工具",
            "link": "/notes/tools/cli/terminal-tools/"
          },
          {
            "text": "脚本自动化",
            "link": "/notes/tools/cli/scripting/"
          }
        ]
      },
      {
        "text": "效率工具",
        "collapsed": true,
        "items": [
          {
            "text": "笔记工具",
            "link": "/notes/tools/productivity/note-taking/"
          },
          {
            "text": "自动化工具",
            "link": "/notes/tools/productivity/automation/"
          },
          {
            "text": "AI 效率工具",
            "link": "/notes/tools/productivity/ai-tools/"
          }
        ]
      },
      {
        "text": "协作工具",
        "collapsed": true,
        "items": [
          {
            "text": "GitHub / GitLab",
            "link": "/notes/tools/collaboration/github-gitlab/"
          },
          {
            "text": "文档协作",
            "link": "/notes/tools/collaboration/docs-collaboration/"
          },
          {
            "text": "项目管理",
            "link": "/notes/tools/collaboration/project-management/"
          }
        ]
      }
    ]
  },
  {
    "text": "算法",
    "collapsed": true,
    "items": [
      {
        "text": "数据结构",
        "collapsed": true,
        "items": [
          {
            "text": "数组与链表",
            "link": "/notes/algorithm/data-structures/array-linked-list/"
          },
          {
            "text": "栈与队列",
            "link": "/notes/algorithm/data-structures/stack-queue/"
          },
          {
            "text": "树",
            "link": "/notes/algorithm/data-structures/tree/"
          },
          {
            "text": "图",
            "link": "/notes/algorithm/data-structures/graph/"
          },
          {
            "text": "哈希表与堆",
            "link": "/notes/algorithm/data-structures/hash-heap/"
          }
        ]
      },
      {
        "text": "排序算法",
        "collapsed": true,
        "items": [
          {
            "text": "比较排序",
            "link": "/notes/algorithm/sorting/comparison-sort/"
          },
          {
            "text": "线性排序",
            "link": "/notes/algorithm/sorting/linear-sort/"
          },
          {
            "text": "排序应用",
            "link": "/notes/algorithm/sorting/sort-application/"
          }
        ]
      },
      {
        "text": "动态规划",
        "collapsed": true,
        "items": [
          {
            "text": "背包问题",
            "link": "/notes/algorithm/dp/knapsack/"
          },
          {
            "text": "区间 DP",
            "link": "/notes/algorithm/dp/interval-dp/"
          },
          {
            "text": "树形 DP",
            "link": "/notes/algorithm/dp/tree-dp/"
          },
          {
            "text": "状态压缩",
            "link": "/notes/algorithm/dp/state-compression/"
          }
        ]
      },
      {
        "text": "图论",
        "collapsed": true,
        "items": [
          {
            "text": "图遍历",
            "link": "/notes/algorithm/graph/graph-traversal/"
          },
          {
            "text": "最短路径",
            "link": "/notes/algorithm/graph/shortest-path/"
          },
          {
            "text": "最小生成树",
            "link": "/notes/algorithm/graph/mst/"
          },
          {
            "text": "拓扑排序",
            "link": "/notes/algorithm/graph/topological-sort/"
          }
        ]
      },
      {
        "text": "字符串",
        "collapsed": true,
        "items": [
          {
            "text": "KMP",
            "link": "/notes/algorithm/string/kmp/"
          },
          {
            "text": "Trie 树",
            "link": "/notes/algorithm/string/trie/"
          },
          {
            "text": "字符串哈希",
            "link": "/notes/algorithm/string/string-hash/"
          },
          {
            "text": "正则表达式",
            "link": "/notes/algorithm/string/regex/"
          }
        ]
      },
      {
        "text": "面试高频",
        "collapsed": true,
        "items": [
          {
            "text": "经典题型",
            "link": "/notes/algorithm/interview/classic-problems/"
          },
          {
            "text": "解题套路",
            "link": "/notes/algorithm/interview/problem-patterns/"
          },
          {
            "text": "面试技巧",
            "link": "/notes/algorithm/interview/interview-tips/"
          }
        ]
      }
    ]
  },
  {
    "text": "AI",
    "collapsed": true,
    "items": [
      {
        "text": "大模型应用",
        "collapsed": true,
        "items": [
          {
            "text": "OpenAI API",
            "link": "/notes/ai/llm-apps/openai-api/"
          },
          {
            "text": "Prompt 框架",
            "link": "/notes/ai/llm-apps/prompt-frameworks/"
          },
          {
            "text": "LLM 产品设计",
            "link": "/notes/ai/llm-apps/llm-products/"
          }
        ]
      },
      {
        "text": "Prompt 工程",
        "collapsed": true,
        "items": [
          {
            "text": "Prompt 模式",
            "link": "/notes/ai/prompt-engineering/prompt-patterns/"
          },
          {
            "text": "Prompt 优化",
            "link": "/notes/ai/prompt-engineering/prompt-optimization/"
          },
          {
            "text": "角色提示",
            "link": "/notes/ai/prompt-engineering/role-prompting/"
          }
        ]
      },
      {
        "text": "RAG / Agent",
        "collapsed": true,
        "items": [
          {
            "text": "RAG 架构",
            "link": "/notes/ai/rag-agent/rag-architecture/"
          },
          {
            "text": "向量数据库",
            "link": "/notes/ai/rag-agent/vector-database/"
          },
          {
            "text": "Agent 框架",
            "link": "/notes/ai/rag-agent/agent-framework/"
          },
          {
            "text": "工具调用",
            "link": "/notes/ai/rag-agent/tool-use/"
          }
        ]
      },
      {
        "text": "AI 辅助编程",
        "collapsed": true,
        "items": [
          {
            "text": "Cursor",
            "link": "/notes/ai/ai-coding/cursor/"
          },
          {
            "text": "GitHub Copilot",
            "link": "/notes/ai/ai-coding/copilot/"
          },
          {
            "text": "AI Code Review",
            "link": "/notes/ai/ai-coding/code-review-ai/"
          }
        ]
      },
      {
        "text": "模型部署",
        "collapsed": true,
        "items": [
          {
            "text": "模型部署方案",
            "link": "/notes/ai/model-ops/model-deployment/"
          },
          {
            "text": "模型量化",
            "link": "/notes/ai/model-ops/quantization/"
          },
          {
            "text": "推理优化",
            "link": "/notes/ai/model-ops/inference-optimization/"
          },
          {
            "text": "本地模型",
            "link": "/notes/ai/model-ops/local-models/"
          }
        ]
      },
      {
        "text": "AI 工程化",
        "collapsed": true,
        "items": [
          {
            "text": "AI 项目架构",
            "link": "/notes/ai/ai-engineering/ai-project-architecture/"
          },
          {
            "text": "模型评测",
            "link": "/notes/ai/ai-engineering/evaluation/"
          },
          {
            "text": "成本优化",
            "link": "/notes/ai/ai-engineering/cost-optimization/"
          }
        ]
      }
    ]
  },
  {
    "text": "读书笔记",
    "collapsed": true,
    "items": [
      {
        "text": "技术书籍",
        "collapsed": true,
        "items": [
          {
            "text": "代码类",
            "link": "/notes/digest/tech-books/code-books/"
          },
          {
            "text": "架构类",
            "link": "/notes/digest/tech-books/architecture-books/"
          },
          {
            "text": "职业成长类",
            "link": "/notes/digest/tech-books/career-books/"
          }
        ]
      },
      {
        "text": "架构设计",
        "collapsed": true,
        "items": [
          {
            "text": "系统设计",
            "link": "/notes/digest/architecture/system-design/"
          },
          {
            "text": "领域驱动设计",
            "link": "/notes/digest/architecture/ddd/"
          },
          {
            "text": "架构模式",
            "link": "/notes/digest/architecture/patterns/"
          }
        ]
      },
      {
        "text": "软技能",
        "collapsed": true,
        "items": [
          {
            "text": "沟通",
            "link": "/notes/digest/soft-skills/communication/"
          },
          {
            "text": "写作",
            "link": "/notes/digest/soft-skills/writing/"
          },
          {
            "text": "学习法",
            "link": "/notes/digest/soft-skills/learning/"
          },
          {
            "text": "时间管理",
            "link": "/notes/digest/soft-skills/time-management/"
          }
        ]
      },
      {
        "text": "团队管理",
        "collapsed": true,
        "items": [
          {
            "text": "团队建设",
            "link": "/notes/digest/management/team-building/"
          },
          {
            "text": "绩效管理",
            "link": "/notes/digest/management/performance/"
          },
          {
            "text": "招聘与面试",
            "link": "/notes/digest/management/hiring/"
          }
        ]
      },
      {
        "text": "行业认知",
        "collapsed": true,
        "items": [
          {
            "text": "行业趋势",
            "link": "/notes/digest/industry/trends/"
          },
          {
            "text": "产品思维",
            "link": "/notes/digest/industry/product-thinking/"
          },
          {
            "text": "商业模式",
            "link": "/notes/digest/industry/business-models/"
          }
        ]
      }
    ]
  }
]

export default defineConfig({
  title: '执码者工作知识库',
  description: '个人/团队执码者工作知识库：笔记、代码片段、Git 项目、面试题。纯前端托管，检索优先。',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    logo: '/assets/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '检索', link: '/search' },
      { text: '笔记', link: '/notes/' },
      { text: '片段', link: '/snippets/' },
      { text: '项目', link: '/projects/' },
      { text: '面试题', link: '/questions/' },
      { text: '录入', link: '/entry' },
    ],

    sidebar: {
      '/notes/': [
        {
          text: '知识笔记',
          items: notesSidebar,
        },
      ],
      '/guide/': [
        {
          text: '使用指南',
          items: [{ text: '概述', link: '/guide/' }],
        },
      ],
    },

    socialLinks: [],
  },
})
