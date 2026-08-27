---
title: HTML
date: 2026-08-20
category: frontend
tags: [html, frontend]
description: Doctype的作⽤
---

# HTML

### Doctype的作⽤

* `&lt;!DOCTYPE&gt;` 声明位于⽂档中的最前⾯，处于 `&lt;html&gt;` 标签之前。告知浏览器的解析器， ⽤什么⽂档类型 规范来解析这个⽂档


---
### 请解释HTML5中语义化标签（如&lt;article&gt;、&lt;section&gt;）的作用，并举例说明如何在实际项目中使用它们。

* 语义化标签的作用：

   * 提升可读性：明确内容的结构和用途（如`&lt;header&gt;`定义页眉，`&lt;nav&gt;`定义导航）。

   * SEO优化：搜索引擎通过标签理解内容结构，提高排名。

   * 可访问性：屏幕阅读器依赖标签辅助视障用户理解页面。

* 实际使用示例：

   * 在博客页面中，用`&lt;article&gt;`包裹每篇博客内容，用`&lt;section&gt;`划分文章的不同部分（如摘要、正文）。

   * 使用`&lt;aside&gt;`放置侧边栏广告或相关推荐。


---
### 假设需要在旧浏览器（如IE9）中支持HTML5语义化标签，如何实现兼容性处理？

* JavaScript定义HTML5标签

   * 声明新标签：通过JavaScript声明新标签，使旧浏览器将其识别为块级元素。

```plain
document.createElement('article'); // 定义新标签  
```
   * 样式补充：为新标签配合CSS设置（如`article { display: block; }`），避免布局错乱。

* 使用HTML5shiv：引入polyfill库（如html5shiv），自动处理旧浏览器的兼容性问题。


---
### 浏览器是如何解析html文档的？

**获取 HTML → 解析 HTML（构建 DOM） → 下载/解析 CSS（构建 CSSOM） → 构建渲染树 → 布局 → 绘制 → 合成**

* **1. 获取 HTML 文件**

   * 请求与响应：浏览器通过 HTTP 协议向服务器请求 HTML 文件，服务器返回响应（可能从缓存中获取）。

   * 字节流处理：浏览器将接收到的字节流通过字符解码（如 UTF-8）转换为字符。

* **2. 解析 HTML 构建 DOM 树**

   * 词法分析：

      * 将 HTML 字符串分割为令牌（Token），如标签（`&lt;div&gt;`）、属性（`class="container"`）、文本内容等。

   * 语法分析：

      * 根据 HTML 语法规则将令牌组合成DOM 树：

         * 创建根节点（如 `&lt;html&gt;`）。

         * 递归解析子元素，建立父子节点关系。

         * 处理元素的属性和文本内容。

* **3. 处理外部资源**

   * CSS 文件：

      * 解析 `&lt;link&gt;` 标签时，浏览器会暂停 HTML 解析，优先下载并解析 CSS 文件，生成CSSOM 树。

      * 原因：CSS 可能影响布局，需提前确定样式。

   * JavaScript 文件：

      * 同步脚本（无 `defer`/`async`）：

         * 遇到 `&lt;script&gt;` 标签时，浏览器会暂停 HTML 解析，下载并执行脚本，执行完成后继续解析。

         * 阻塞渲染：因脚本可能修改 DOM 或样式。

      * 异步/延迟脚本：

         * `async`：脚本异步下载，下载完成后立即执行，不阻塞 HTML 解析，但执行顺序可能乱序。

         * `defer`：脚本异步下载，但延迟到 HTML 解析完成后按顺序执行，在 `DOMContentLoaded` 前触发。

* **4. 构建渲染树（Render Tree）**

   * 合并 DOM 和 CSSOM：

      * 将 DOM 树与 CSSOM 树结合，过滤不可见节点（如 `display: none`），生成渲染树。

   * 计算样式：

      * 确定每个节点的最终样式（继承、层叠等）。

* **5. 布局（Layout）**

   * 确定位置和尺寸：

      * 根据渲染树计算每个节点在页面中的具体位置（`x`, `y`）和尺寸（宽高），生成布局信息。

* **6. 绘制（Paint）**

   * 分层绘制：

      * 将渲染树划分为多个图层（如固定定位、视频等需要独立图层的元素）。

      * 将每个节点绘制到绘制记录（Paint Records） 中。

   * 合成（Composite）：

      * 将所有图层合并到一起，最终显示在屏幕上。

* **关键特性与优化点**

   1. 阻塞渲染的因素：

      1. 同步 JavaScript：会阻塞 HTML 解析和渲染。

      2. CSS：必须等待 CSSOM 完成才能构建渲染树，因此应尽量减少 CSS 文件体积。

   2. 性能优化建议：

      1. 将脚本放在 `&lt;body&gt;` 底部或使用 `defer`/`async`。

      2. 避免内联阻塞脚本。

      3. 使用 CDN 加速资源加载。

      4. 压缩 CSS/JS 文件。

   3. 注意：CSS 和同步 JS 会阻塞 DOM 解析，而异步资源（如图片）不会阻塞渲染流程。


---
### html中有哪些常见的实体字符？

`&amp;`（&）、`&lt;`（&lt;）、`&gt;`（&gt;）、`&quot;`（"）、`&copy;`（©）


---
### 对html嵌套规则的理解

* 必须正确嵌套：`&lt;div&gt;&lt;span&gt;&lt;/div&gt;&lt;/span&gt;` ❌ → `&lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;` ✅。

* 根元素唯一：`&lt;html&gt;`是唯一根标签。

* 块级元素不可嵌套在内联元素中：如`&lt;div&gt;`不能放在`&lt;a&gt;`内。


---
### html中的视频如何添加字幕？

使用`&lt;track&gt;`标签：

```plain
<video>  
  <source src="video.mp4">  
  <track src="subtitles.vtt" kind="subtitles" srclang="en" label="English">  
</video>  
```
关键属性：`kind="subtitles"`、`srclang`定义语言、`label`显示名称。

---
### html标签中的crossorigin属性的作用？

* 作用：控制跨域请求的CORS策略。

* 取值：

   * `anonymous`：无凭证请求。

   * `use-credentials`：带凭证（需服务端支持）。

* 适用场景：加载跨域字体、图片等资源。


---
### link标签中有哪些属性？rel属性中prload和prefeatch两个值的作用是？

* 常用属性：`rel`（定义关系）、`href`（资源路径）、`media`（适用媒介）、`type`（MIME类型）。

* `preload`：提前加载关键资源（如样式表、脚本），提升首屏性能。

* `prefetch`：预加载未来可能用到的资源（如下一页内容）。


---
### html中前缀为data-开头的元素属性是什么？

* 作用：自定义数据属性，存储元素相关数据。

* 示例：`&lt;div data-user-id="123"&gt;`。

* 获取方式：通过`dataset`属性，如`element.dataset.userId`。


---
### script标签中有哪些属性？作用分别是什么？

* src：引入外部JS文件。

* async：异步加载脚本，下载完立即执行（可能影响渲染）。

* defer：延迟加载，DOM加载完按顺序执行。

* type：指定脚本类型，默认`text/javascript`。

* crossorigin：控制跨域请求（与`&lt;img&gt;`类似）。


---
### img标签的srcset属性的作用

* 作用：根据设备DPR或屏幕宽度选择合适图片（响应式图片）。

示例：

```plain
<img srcset="img1.jpg 1x, img2.jpg 2x"  src="img1.jpg">  
```
* 2x图片用于Retina屏，减少高清设备的资源浪费。


---
### HTML5有哪些drag相关api?

* 事件：`dragstart`（开始拖拽）、`dragover`（拖拽中）、`drop`（放置）。

* 对象：`DataTransfer`（存储拖拽数据）。

* 示例：拖拽文件上传时，通过`e.dataTransfer.setData('text', id)`传递数据。


---
### 简述html页面的渲染过程

1. 解析HTML → DOM树。

2. 解析CSS → CSSOM树。

3. 合并DOM+CSSOM → 渲染树。

4. 布局（计算位置尺寸）。

5. 绘制（绘制像素）。

6. 合成（图层合并）。

* 浏览器加载页面时，阻塞JS会中断DOM构建。


---
### web components是多少？

* 4个核心API：

   * Custom Elements（自定义标签）

   * Shadow DOM（封装样式/结构）

   * HTML Templates（模板片段）

   * HTML Imports（已废弃，需Polyfill）。

* 示例：`class MyComponent extends HTMLElement`定义自定义组件。


---
### canvas和svg在可视化领域各自的优缺点？

* Canvas：

   * 优点：适合复杂动画（如游戏）。

   * 缺点：基于像素，缩放失真，无DOM交互。

* SVG：

   * 优点：矢量图形，缩放清晰，支持交互。

   * 缺点：复杂场景性能差。

* 示例：游戏特效用Canvas，矢量图标用SVG。


---
### 如何避免重绘或重排？

* 技巧：

   * 使用`transform`代替`left/top`（仅触发重绘）。

   * 离屏Canvas操作（修改后一次性绘制）。

   * 批量操作DOM（如`documentFragment`）。

* 示例：动画用`requestAnimationFrame`或CSS动画。


---
### meta标签中有哪些属性？作用分别是什么？

* `viewport`：控制移动端视口（如`width=device-width`）。

* `charset`：定义编码（如`UTF-8`）。

* `description`：SEO描述。

* `keywords`：SEO关键词（已失效，但部分搜索引擎仍参考）。

* `author`：作者信息。

* `http-equiv`：模拟HTTP头（如`no-cache`）。


---
### 导致页面加载白屏时间长的原因有哪些？

1. 网络延迟：CDN故障/服务器响应慢（如海外服务器延迟高）。

2. 资源加载慢：大文件未压缩、图片未优化（如WebP格式）。

3. JS/CSS阻塞：关键脚本未异步加载、CSS文件过大。

4. 代码错误：JS语法错误中断渲染（如Vue/React入口文件报错）。

5. 第三方插件：广告/统计代码加载过慢。例：Vue应用因未压缩JS文件导致首屏白屏超10秒。


---
###  前端跨页面通信有哪些方法？

* URL参数：通过`?key=value`传递数据。

* localStorage/sessionStorage：存储键值对（同源限制）。

* postMessage：跨域iframe通信（如子窗体与父窗体交互）。

* IndexedDB：持久化存储（复杂数据）。

* Cookie：随请求携带（需注意安全性）。


---
### 前端该如何选择图片的格式？

* JPEG：照片/复杂图像（压缩率高）。

* PNG：透明背景/图标（支持alpha通道）。

* WebP：体积小，兼容现代浏览器（替代JPEG/PNG）。

* AVIF：高压缩比，但兼容性较差。

* SVG：矢量图标/响应式图形（无损缩放）。示例：图标用SVG，大图用WebP+JPEG回退。


---
### 简单描述从输入网址到页面显示过程

1. DNS解析：将域名转IP（如`ping baidu.com`测延迟）。

2. TCP握手：建立连接。

3. HTTP请求：浏览器发送`GET /`请求。

4. 服务器响应：返回HTML/CSS/JS等资源。

5. 渲染：DOM+CSSOM生成渲染树，布局→绘制→合成。（详见下题）示例：输入`google.com`后，DNS解析耗时200ms，页面加载总耗时1.5秒。


---
### 什么是渐进增强和优雅降级？

* 渐进增强：从基础功能开始，逐步添加高级特性（如先保证移动端可用，再优化PC端）。

* 优雅降级：先做完整功能，再向下兼容低版本浏览器（如IE11支持不足时回退）。示例：移动端优先设计（渐进增强），PC端先实现复杂功能再适配手机（优雅降级）。


---
### 一台设备的dpr是否是可变的？

* 是：DPR（设备像素比）可能因缩放、旋转或系统设置变化（如MacBook Pro按压触控板缩放）。

* 示例：iPhone X默认DPR为3，缩放后可能变为2。


---
### HTML5的离线存储的使用及工作原理？浏览器如何对离线储存进行管理和加载？

* 使用方法：

   * Service Worker + Cache API（现代方案）：

      * 注册SW：`navigator.serviceWorker.register('/sw.js')`。

      * 缓存资源：在`install`事件中用`caches.open().addAll()`。

      * 拦截请求：在`fetch`事件中返回缓存或网络资源。

   * Application Cache（已废弃）：

      * 编写manifest文件（如`app.manifest`），列出缓存资源。

      * HTML中关联：`&lt;html manifest="app.manifest"&gt;`。

* 工作原理：

   * SW：拦截请求，缓存策略（`cacheFirst`/`networkFirst`）决定资源来源。

   * AppCache：根据manifest文件缓存资源，离线时优先本地加载。

* 浏览器管理：

   * SW：缓存存储在`Cache Storage`，可动态更新。

   * AppCache：缓存文件依赖manifest版本，更新失败则回退旧缓存。

   * 加载流程：在线时先检查manifest/SW配置，离线时直接读取缓存。


---
### 浏览器乱码的原因

* 常见原因：

   * 编码不一致：HTML未指定`&lt;meta charset="UTF-8"&gt;`或服务器返回错误编码（如GBK）。

   * 特殊字符未转义：如未使用`&amp;`导致HTML解析错误。

   * 数据库存储问题：数据存储时编码未统一。

* 示例：中文乱码因未设置`&lt;meta charset="UTF-8"&gt;`，或数据库存入GBK编码数据。


---
### SEO的原理？如何实现SEO优化？

* 原理：搜索引擎（如Google）通过爬虫抓取页面内容，分析关键词、结构、链接等生成索引，按算法排序结果。

* 优化方法：

   * 语义化标签：`&lt;h1&gt;`标题、`&lt;meta description&gt;`描述。

   * 关键词优化：合理分布关键词，避免堆砌。

   * 图片alt属性：描述图片内容。

   * 结构化数据：JSON-LD标注内容类型（如文章、产品）。

   * 页面速度：压缩资源、延迟加载图片。


---
### SPA应用如何进行SEO?

* 方案：

   * 服务端渲染（SSR）：如Next.js在服务器生成HTML。

   * 静态生成（SSG）：提前生成静态HTML（如Gatsby）。

   * 预渲染：用工具生成HTML快照（Prerender.io）。

   * 动态渲染：检测爬虫请求，返回SSR内容。

* 示例：Vue应用通过`vue-meta`插件动态设置SEO元标签。


---
### 说说对SSG的理解

* SSG（Static Site Generation）：构建时生成静态HTML，无需动态渲染（如Next.js的`getStaticProps`）。

* 优点：

   * 首屏加载快、SEO友好。

   * 无需服务器动态处理请求。

* 适用场景：博客、文档、静态产品页。


---
### HTML和CSS中图片的加载和渲染规则是什么？

* HTML（img标签）：

   * 阻塞渲染：图片下载完成前占位符存在，但内容不可见。

   * 优先级低：CSS/JS优先加载，图片可能延迟。

* CSS（背景图）：

   * 非阻塞：不影响DOM解析，但可能延迟渲染（需`img`标签更早加载）。

* 优化：

   * 使用`loading="lazy"`延迟加载非首屏图。

   * 压缩图片格式（WebP）。


---
### 页面统计数据中，常用的PV、UV指标分别是什么？

* PV（Page View）：页面访问量，刷新或跳转均计数。

* UV（Unique Visitor）：独立访客数，同一用户多次访问仅计1次。

* 示例：一个页面被访问100次（PV=100），但只有50个独立用户（UV=50）。


---
### WebSocket如何兼容低版本浏览器？

* 方案：

   * Polyfill：使用`socket.io`自动回退到长轮询。

   * 服务端适配：支持多种协议（如FlashSocket）。

* 示例：`socket.io`客户端检测WebSocket支持，否则用`XMLHttpRequest`模拟。


---
### HTML、XML、XHTML的区别

|特性|HTML|XML|XHTML|
|:----|:----|:----|:----|
|语法|宽松（允许闭合标签）|严格（需闭合标签）|严格（需闭合标签）|
|用途|Web页面渲染|数据交换|结合HTML和XML语法|
|兼容性|浏览器自动修复错误|需严格遵循规范|需按XML规范解析|


---
### 标签上的title和alt属性的区别

* title：鼠标悬停时显示的提示文本。

* alt：图片描述（SEO和无障碍访问），当图片无法加载时显示。

* 示例：`&lt;img src="logo.png" alt="公司LOGO" title="点击跳转官网"&gt;`。


---
### Canvas在标签上设置宽高和在style中设置宽高的区别

* 标签属性（`&lt;canvas width="200" height="200"&gt;`）：

   * 定义渲染尺寸，像素比例固定。

* CSS样式（`style="width:200px; height:200px;"`）：

   * 改变布局尺寸，但像素比例可能变形（如缩放）。

* 示例：`width="200"` + `style="width:400px"` → 画布拉伸，模糊。


---
### 严格模式与混杂模式的区别及意义

* 严格模式的排版和 JS 运作模式是 以该浏览器⽀持的最⾼标准运⾏

* 在混杂模式中，⻚⾯以宽松的向后兼容的⽅式显示。模拟⽼式浏览器的⾏为以防⽌站点⽆法⼯作。 DOCTYPE 不存在或格式不正确会导致⽂档以混杂模式呈现


---
### import 和 link 的区别

⻚⾯被加载的时， link 会同时被加载，⽽ @imort ⻚⾯被加载的时， link 会同时被加

载，⽽ @import 引⽤的 CSS 会等到⻚⾯被加载完再加载 import 只在 IE5 以上才能识

别，⽽ link 是 XHTML 标签，⽆兼容问题 link ⽅式的样式的权重 ⾼于 @import 的权

重


---
### HTML5 的离线储存的使用和原理

**相似存储**

localStorage 长期存储数据，浏览器关闭后数据不丢失； sessionStorage 数据在浏览器关闭后自动删除。


**离线的存储**

两种方式

* HTML5 的离线存储`.appcache文件`【废弃】

* `service-worker` 的标准


**HTML5 的离线存储**`.appcache文件`**【废弃】**

在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。


原理：HTML5 的离线存储是基于一个新建的。appcache 文件的缓存机制（不是存储技术），通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。


之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。


**如何使用**

* 1、页面头部像下面一样加入一个 manifest 的属性

* 2、在 cache.manifest 文件的编写离线存储的资源

* 3、在离线状态时，操作 window.applicationCache 进行需求实现。
