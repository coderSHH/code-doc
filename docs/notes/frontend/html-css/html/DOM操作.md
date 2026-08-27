---
title: DOM操作
date: 2026-08-20
category: frontend
tags: [html, frontend]
description: DOM和BOM
---

# DOM操作

### DOM和BOM

* DOM（文档对象模型）：操作页面元素（如`document.getElementById`）。

* BOM（浏览器对象模型）：操作浏览器窗口（如`window.location`、`alert`）。示例：DOM修改DOM树，BOM控制弹窗或跳转页面。


---
### 说说对DOM树的理解

* 结构：浏览器解析HTML生成的节点树，包含元素、文本等节点。

* 操作：通过`getElementById`、`querySelector`等方法操作节点。

* 示例：动态生成列表：`document.createElement('li')` → `appendChild`。


---
### CSSOM树和DOM树是同时解析的吗？

* 否：

   * DOM树：先解析HTML生成。

   * CSSOM树：解析所有CSS后生成。

   * 渲染树：DOM + CSSOM合并后生成。

* 影响：CSS阻塞渲染，需将CSS放在`&lt;head&gt;`，JS异步加载。


---
### JS和CSS是否阻塞DOM树的构建和渲染？

* JS：阻塞DOM构建（`&lt;script&gt;`默认同步加载）。

* CSS：不阻塞DOM构建，但阻塞渲染（需等待CSSOM完成）。

* 示例：`&lt;script async&gt;`异步加载JS，`&lt;link rel="stylesheet"&gt;`阻塞渲染。


---
### 什么是HTML文档的预解析？

* 定义：浏览器在解析HTML时，提前加载关键资源（如CSS、JS、字体等），避免阻塞渲染。

* 实现方式：

   * `&lt;link rel="preload"&gt;`：按优先级加载资源（如关键CSS/JS），预加载关键资源提升首屏速度。

   * `&lt;link rel="preconnect"&gt;`：结合DNS预解析，提前建立连接（DNS+TCP+TLS）。

   * `&lt;link rel="prefetch"&gt;`：预加载未来可能用到的资源（如下一页内容）。

* 作用：

   * 减少关键资源的加载延迟，提升首屏渲染速度。

   * 例如：预加载CSS避免阻塞渲染，预加载JS避免阻塞DOM解析。


---
### DNS预解析是什么？怎么实现？

* 定义：浏览器在用户访问前，提前将域名解析为IP地址，减少后续请求的DNS查询延迟。

* 实现方式：

```plain
HTML标签：
<link rel="dns-prefetch" href="//cdn.example.com">  
HTTP头控制：
<meta http-equiv="x-dns-prefetch-control" content="on">  
```
或通过JavaScript：
```plain
const a = document.createElement('a');  
a.href = 'https://target.com';  
```
* 作用：

   * 缩短跨域资源的首次DNS解析时间（如第三方CDN、广告等）。

   * 适用于频繁访问的域名（如字体、图片CDN）。

* 示例：淘宝通过`&lt;link rel="dns-prefetch" href="//img0.tbcdn.cn"&gt;`预解析图片域名，减少加载延迟。


---
### 在DOM中，如何判断a元素是否为b元素的子元素？

**推荐优先使用 contains()：简洁高效，直接判断后代关系。**

**若需直接子元素：通过 a.parentElement === b 快速验证。**

* **方法1：使用**`Node.contains()`

   * 原理：判断一个节点是否是另一个节点的后代

   * 说明：

      * 注意：`contains()` 不区分直接子元素和间接后代，若需严格判断是否是直接子元素，需进一步检查 `a.parentElement === b`。

```plain
if (b.contains(a)) {
  console.log('a 是 b 的后代（包括直接子元素）');
}
```
* **方法2：递归检查父节点**

   * 原理：从 `a` 开始逐级向上遍历父节点，直到找到 `b` 或到达根节点。

   * 说明：

      * 若需严格判断是否是 直接子元素，可直接检查 `a.parentElement === b`。

* 关键区别

|方法|用途|适用场景|
|:----|:----|:----|
|contains()|判断 a 是否是 b 的后代（直接或间接）|需快速判断后代关系时|
|parentElement 递归|判断 a 是否是 b 的直接子元素|需严格判断直接父子关系时|


---
