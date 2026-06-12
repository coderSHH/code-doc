<!--
 * @Author: shanhaihong
 * @LastEditors: shanhaihong
 * @LastEditTime: 2024-05-16 14:57:17
 * @Description:
 * @FilePath: /speed-admin/README.md
-->

# speed-admin

### 介绍 📖

speed-admin 基于 Vue3.4、TypeScript、Vite5、Pinia、Element-Plus

### 代码仓库 ⭐

### 项目文档 📚

### 项目功能 🔨

-   使用 Vue3.4 + TypeScript 开发，单文件组件**＜ script setup ＞**
-   采用 Vite5 作为项目开发、打包工具（配置 gzip/brotli 打包、tsx 语法、跨域代理…）
-   使用 Pinia 替代 Vuex，轻量、简单、易用，集成 Pinia 持久化插件
-   使用 TypeScript 对 Axios 整个二次封装（请求拦截、取消、常用请求封装…）
-   基于 Element 二次封装 [ProTable](https://juejin.cn/post/7166068828202336263) 组件，表格页面全部为配置项 Columns
-   支持 Element 组件大小切换、多主题布局、暗黑模式、i18n 国际化
-   使用 VueRouter 配置动态路由权限拦截、路由懒加载，支持页面按钮权限控制
-   使用 KeepAlive 对页面进行缓存，支持多级嵌套路由缓存
-   常用自定义指令开发（权限、复制、水印、拖拽、节流、防抖、长按…）
-   使用 Prettier 统一格式化代码，集成 ESLint、Stylelint 代码校验规范
-   使用 husky、lint-staged、commitlint、czg、cz-git 规范提交信息

### 文件资源目录 📚

```text
speed-admin
├─ .husky                  # husky 配置文件
├─ .vscode                 # VSCode 推荐配置
├─ public                  # 打包资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                  # API 接口管理
│  ├─ assets               # 静态资源文件
│  ├─ components           # 全局组件（包含Vite 配置项）
│  ├─ config               # 全局配置项
│  ├─ directives           # 全局指令文件
│  ├─ hooks                # 常用 Hooks 封装
│  ├─ layout               # 框架布局模块
│  ├─ router               # 路由管理
│  ├─ store                # pinia store
│  ├─ types                # 全局 ts 声明
│  ├─ utils                # 常用工具库
│  ├─ views                # 项目所有页面
│  ├─ App.vue              # 项目主组件
│  ├─ main.ts              # 项目入口文件
│  └─ vite-env.d.ts        # 指定 ts 识别 vue
├─ .editorconfig           # 统一不同编辑器的编码风格
├─ .env                    # vite 常用配置
├─ .env.development        # 开发环境配置
├─ .env.production         # 生产环境配置
├─ .env.test               # 测试环境配置
├─ .eslintignore           # 忽略 Eslint 校验
├─ .eslintrc.cjs           # Eslint 校验配置文件
├─ .gitignore              # 忽略 git 提交
├─ .prettierignore         # 忽略 Prettier 格式化
├─ .prettierrc.cjs         # Prettier 格式化配置
├─ .stylelintignore        # 忽略 stylelint 格式化
├─ .stylelintrc.cjs        # stylelint 样式格式化配置
├─ commitlint.config.cjs   # git 提交规范配置
├─ index.html              # 入口 html
├─ lint-staged.config.cjs  # lint-staged 配置文件????
├─ package-lock.json       # 依赖包包版本锁
├─ package.json            # 依赖包管理
├─ postcss.config.cjs      # postcss 配置?????
├─ README.md               # README 介绍
├─ tsconfig.json           # typescript 全局配置
└─ vite.config.ts          # vite 全局配置文件
```

pont-config.json

originUrl
值类型：字符串
描述： 接口平台提供数据源的 open api url（需要免登），目前只支持 Swagger。
outDir
值类型：字符串
描述： 生成代码的存放路径，使用相对路径即可。如：“./src/api”
templatePath
值类型：字符串
prettierConfig
值类型：object
描述：生成的代码会用 prettier 来美化。此处配置 prettier 的配置项即可，具体可以参考 prettier 文档。
usingMultipleOrigins
值类型：boolean
描述：pont 支持一个项目中配置多个 Swagger 来源。此处配置是否启用多数据源
origins
值类型：array
描述：配置每个数据来源
ransformPath
值类型：string
描述：可选项。指定数据源预处理路径（使用相对路径指定）。一旦指定，Pont 将生成一份默认的数据预处理器。Pont 将 Swagger.json 数据转换为内部标准数据源之后会尝试调用由 transformPath 指定的转换程序,这样用户就有机会对数据进行一些处理。
fetchMethodPath
值类型：string
描述： 可选项, 相对项目根目录路径。用于 Swagger 数据源需要登录才能请求成功的场景，可指定获取 Swagger 源数据的方法。默认为 node-fetch 的 fetch 方法，可通过自定义 fetch 方法获取带鉴权的接口的文档

mocks
值类型：object
子字段：
字段名：“enable” 类型：boolean 默认值： true 含义：是否生效
字段名：“basePath” 类型：string 默认值：“” 含义：接口的 basePath
字段名： “port” 类型：string 默认值：8080 含义：mocks 服务的端口号
字段名 “wrapper” 类型：string 默认值：“{“code”: 0, “data”: {response}, “message”: “”}” 含义：接口返回结构，pont 可以计算返回数据类型(比如此处会替换到 {response})，此处可以指定接口返回结构。

templateType
值类型：字符串
可选值：‘fetch’ | ‘hooks’
描述：可选项。用于生成 pont 内置模板。配置该项时，一旦检测到本地模板文件不存在将自动使用配置的模板类型生成模板文件。
配置说明
{
"origins": [
{
"name": "base", //系统基础 api
"originUrl": "http://tfgb.hightop.xin:55001/farmland/v2/api-docs?group=2.Magina%E6%A0%87%E5%87%86%E4%B8%9A%E5%8A%A1%E6%9C%8D%E5%8A%A1" //api 地址
}
],
"templatePath": "./pontTemplate", // 模板文件路径
"outDir": "./src/api", // 输出目录
"mocks": {
"enable": false // 是否启用 mock 数据
},
"spiltApiLock": true, // 是否拆分 API 锁定
"usingMultipleOrigins": true, // 是否使用多个数据源
"prettierConfig": {
"singleQuote": true, // 使用单引号
"semi": true, // 在语句末尾添加分号
"tabWidth": 2, // 缩进宽度为 2 个空格
"useTabs": false, // 不使用制表符进行缩进
"bracketSpacing": true, // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格
"arrowParens": "avoid", // 当箭头函数只有一个参数时，省略括号
"printWidth": 120, // 每行代码长度不超过 120 个字符
"vueIndentScriptAndStyle": true, // 对 Vue 文件中的 script 和 style 标签进行缩进
"htmlWhitespaceSensitivity": "ignore" // 忽略 HTML 文件的空白敏感度
}
}
