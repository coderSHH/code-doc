export default {
  title: "Speed Admin 文档中心",
  description: "基于 Speed Admin 的配置说明与 API 文档",

  themeConfig: {
    // 网站标题
    siteTitle: "speed-admin",
    // 社交账户链接
    socialLinks: [
      // {
      //     icon: {
      //         svg: '<svg t="1671270414569" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2135" width="64" height="64"><path d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m189.952 752l11.2-108.224c-31.904 9.536-100.928 16.128-147.712 16.128-134.464 0-205.728-47.296-195.328-146.304 11.584-110.688 113.152-145.696 232.64-145.696 54.784 0 122.432 8.8 151.296 18.336L768 272.704C724.544 262.24 678.272 256 599.584 256c-203.2 0-388.704 94.88-406.4 263.488C178.336 660.96 303.584 768 535.616 768c80.672 0 138.464-6.432 166.336-16z" fill="#CE000D" p-id="2136"></path></svg>',
      //     },
      //     link: 'https://blog.csdn.net/GISShiXiSheng',
      // },
    ],
    nav: [
      { text: "首页", link: "/" },
      { text: "API 文档", link: "/api/" },
    ],
    sidebar: {
      "/api/": [
        {
          text: "配置项",
          items: [{ text: "全局配置", link: "/api/global-config" }],
        },
      ],
      "/configure/": [
        {
          text: "配置",
          items: [
            { text: "基础", link: "/configure/description" },
            { text: "git（提交校验）", link: "/configure/git" },
            { text: "动态生成Api（Pont）", link: "/configure/pont" },
          ],
        },
      ],
      "/component/": [
        {
          text: "组件",
          items: [
            { text: "表格（table）", link: "/component/table" },
            { text: "快速表格（STable）", link: "/component/STable" },
          ],
        },
      ],
      "/standard/": [
        {
          text: "规范",
          items: [{ text: "代码规范", link: "/standard/standard" }],
        },
      ],
      "/modular/": [
        {
          text: "模块",
          items: [
            { text: "HTTP请求（Axios）", link: "/modular/axios" },
            { text: "Store（Vuex）", link: "/modular/store" },
            { text: "路由（Router）", link: "/modular/router" },

            // { text: '权限控制', link: '/modular/permission' },
            // { text: '组件库', link: '/modular/component' },
            // { text: 'UI组件库', link: '/modular/ui' },
            // { text: '国际化', link: '/modular/i18n' },
            // { text: '主题', link: '/modular/theme' },
            // { text: '多页签', link: '/modular/multi-tab' },
            // { text: '多窗口', link: '/modular/multi-window' },
            // { text: '错误日志', link: '/modular/error-log' },
            // { text: '数据字典', link: '/modular/dict' },
            // { text: '动态菜单', link: '/modular/dynamic-menu' },
            // { text: '动态路由', link: '/modular/dynamic-router' },
            // { text: '动态表单', link: '/modular/dynamic-form' },
            // { text: '动态表格', link: '/modular/dynamic-table' },
            // { text: '动态权限', link: '/modular/dynamic-permission' },
            // { text: '动态加载', link: '/modular/dynamic-load' },
          ],
        },
      ],
    },
  },
};
