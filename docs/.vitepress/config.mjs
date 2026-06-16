export default {
  title: "知识库",
  description: "知识体系 - 知识点、面试题、项目实战、源码分析",

  themeConfig: {
    siteTitle: "知识库",

    nav: [
      { text: "首页", link: "/" },
      { text: "前端", link: "/frontend/" },
      { text: "后端", link: "/backend/" },
      { text: "AI", link: "/ai/" },
    ],

    sidebar: {
      "/frontend/basics/": [
        {
          text: "基础知识",
          items: [
            { text: "概述", link: "/frontend/basics/" },
            { text: "HTML", link: "/frontend/basics/html" },
            { text: "CSS", link: "/frontend/basics/css" },
            { text: "JavaScript", link: "/frontend/basics/javascript" },
            { text: "TypeScript", link: "/frontend/basics/typescript" },
          ],
        },
      ],
      "/frontend/framework/": [
        {
          text: "框架生态",
          items: [
            { text: "概述", link: "/frontend/framework/" },
            { text: "React", link: "/frontend/framework/react" },
            { text: "Vue", link: "/frontend/framework/vue" },
            { text: "工程化", link: "/frontend/framework/engineering" },
          ],
        },
      ],
      "/frontend/interview/": [
        {
          text: "面试题",
          items: [
            { text: "概述", link: "/frontend/interview/" },
            { text: "JavaScript", link: "/frontend/interview/js" },
            { text: "CSS", link: "/frontend/interview/css" },
            { text: "React", link: "/frontend/interview/react" },
            { text: "Vue", link: "/frontend/interview/vue" },
            { text: "工程化", link: "/frontend/interview/engineering" },
            { text: "手写题", link: "/frontend/interview/handwrite" },
          ],
        },
      ],
      "/frontend/project/": [
        {
          text: "项目实战",
          items: [
            { text: "概述", link: "/frontend/project/" },
            { text: "Project A", link: "/frontend/project/project-a" },
            { text: "Project B", link: "/frontend/project/project-b" },
          ],
        },
      ],
      "/frontend/source-code/": [
        {
          text: "源码分析",
          items: [
            { text: "概述", link: "/frontend/source-code/" },
            { text: "Vue 源码", link: "/frontend/source-code/vue" },
            { text: "React 源码", link: "/frontend/source-code/react" },
            { text: "Axios 源码", link: "/frontend/source-code/axios" },
            { text: "工具库源码", link: "/frontend/source-code/tools" },
          ],
        },
      ],
      "/frontend/snippets/": [
        {
          text: "代码片段",
          items: [
            { text: "概述", link: "/frontend/snippets/" },
            { text: "工具函数", link: "/frontend/snippets/utils" },
            { text: "自定义 Hooks", link: "/frontend/snippets/hooks" },
            { text: "组件片段", link: "/frontend/snippets/components" },
            { text: "配置模板", link: "/frontend/snippets/config" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com" },
    ],

    footer: {
      message: "持续学习，持续输出",
      copyright: "Copyright © 2026",
    },
  },
};
