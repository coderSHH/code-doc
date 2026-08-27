---
title: CSS预处理 （less与sass scss）
date: 2026-08-20
category: frontend
tags: [css, frontend]
description: 概念
---

# CSS预处理 （less与sass scss）

# 概念

为css增加了一些编程的特性，将css作为目标生成文件，然后开发者就只要使用这种语言进行编码工作。（通俗点说“css预处理器用一种专门的编程语言，进行web页面样式设计，然后在编译成正常的css文件，以供项目使用“）

## 为什么使用预处理器

css 本身有些缺点：

* 语法不够强大，不能够嵌套书写，导致项目中样式逻辑一点也不清楚。

* 没有变量和逻辑上的复用机制，当有需要复用代码的时候，只能重复书写样式，导致难以维护。

* css预处理器为css增加一些编程的特性，无需考虑浏览器的兼容性问题。如在css中使用变量、简单的逻辑程序、函数。可以让css更加简洁、适应性更强、可读性更佳、更易于代码的维护

## less

动态样式语言，一样也比css多处很多功能（如变量，继承，运算， 函数）， Less 既可以在客户端上运行，也可在服务端运行 ( [Node](https://so.csdn.net/so/search?q=Node&spm=1001.2101.3001.7020).js)。

## sass

是动态样式语言，比css多出很多功能（如变量、[嵌套](https://so.csdn.net/so/search?q=%E5%B5%8C%E5%A5%97&spm=1001.2101.3001.7020)、运算,混入(Mixin)、继承、颜色处理，函数等），更方便阅读和维护。

## scss

和sass其实是同一种东西，两者之间不同之处有以下2点。

* 文件扩展名不同，sass是以sass为后缀为扩展名，scss以.scss后缀为扩展名。

* 语法书写方式不同，sass是以严格的缩进语法规则来书写，不带大括号（{}）和分号（；），而scss的语法书写我们的css语法书写方式非常类似。

* 简言之可以理解scss是sass的一个升级版本，完全兼容sass之前的功能，又有了些新增能力。

# 区别

* 1、编译环境

   * sass的安装需要Ruby环境，是在服务端处理的

   * less是需要引入less.js来处理less代码输出css到浏览器，也可以在开发环节使用less，然后编译成css文件，直接放到项目中。

* 变量

   * less是@

   * scss是$

   * css变量是两根连词线- -

   * 变量作用域不一样：less和scss中的变量会随着作用域的变化而不一样 

* 输出

   * less没有输出设置

   * scss提供四种输出选项：nested(默认), compact, compressed 和 expanded

```plain
nested：嵌套缩进的css代码
expanded：展开的多行css代码
compact：简洁格式的css代码
compressed：压缩后的css代码
```
* 条件语句

   * less不支持条件语句

   * scss语句支持if{}else{}、for{}循环语句 

```plain
/** if else */
@if lightness($color) > 30% {
	/**	do....*/
} @else {
	/**	do....*/
}
/**	循环*/
@for $i from 1 to 10 {
  	.border-#{$i} {
    	border: #{$i}px solid red;
  	}
}
```
* 引入外部css

   * less引用外部文件和css中的@import没什么差异。 

   * scss引用的外部文件命名必须以_开头。文件名如果以下划线_开头的话，sass会认为该文件是一个引用文件，不会将其编译为css文件. 

## 总结

sass/scss或是less，都可以看作为一种基于css之上的高级语言，其目的是使得css开发更灵活和更强大，sass的功能比less更加强大，更好用,基本可以说是一种真正的编程语言了，less则相对清晰明了,易于上手,对编译环境要求比较宽松。

## LESS详细

* 扩展文件名的格式： xxx.less

* 变量：@

```plain
@变量名:值
@width：100px;
.box{
    width:@width;
}
```
* 混合 

```plain
定义classa 然后可以将classa引入到classb中
.classa(a){
    width:@width;
}
.classb{
    .classa(a);
}
```
* 嵌套规则 

```plain
父级{
    子集
}
```
* 函数和运算

```plain
可以将值计算
@the-border: 1px;
@base-color: #111;
@red:        #842210;
#header {
  color: @base-color * 3;
  border-left: @the-border;
  border-right: @the-border * 2;
}
#footer { 
  color: @base-color + #003300;
  border-color: desaturate(@red, 10%);
}
```
## SASS详细

* 扩展文件名的格式：xxx.scss 或 xxx.sass

* 编译风格

```plain
nested:嵌套缩进的css代码，默认
expanded:没有缩紧的,扩展的css代码
campact:简介格式的css代码
compressed:压缩后的css代码(生产环境)

使用的时候　sass --style compressed xxx.sass xxx.css
```
* 监听目录

```plain
sass --watch xxx.scss:xxx.css //监听文件
sass --watch scsspath:csspath //监听文件夹
```
* 变量：$

```plain
$变量名:值
$width：100px;
.box{
    width:$width;
}
如果变量包含字符串则写在 #{}之中
$c:color;
.box{
    border-#{$c}:red;
}
```
* 嵌套规则 

```plain
父级{
    子集
}
```
* 继承

```plain
//使用方法 定义classa 
.classb{
    @extend .classa
}
```
* Mixin重用代码块

```plain
//使用方法先用@mixin命令定义一个代码块
@mixin left(参数1，参数2){
    float:left;
    margin-left:10px;
}
//使用@include调用刚刚定义的代码块
.box{
    @inclidu left(参数1，参数2);
}
```
* 颜色函数 lighten(颜色，百分比)

* 插入文件

```plain
@import命令插入外部文件 .scss和css都可
```
* 条件语句

```plain
//@if 可以用来判断 @else 则是配套
.box{
    @if 1+1>1 {width:100px;}@else {
        width:200px;
    }
}
```
* 循环语句

```plain
//@for @while @each
@for $i from 1 to 10{
    border-#{$i}{
        border:#{$i}px solid red;
    }
}
//@while
$i:6;
@while $i>0{
    .item-#{$i}{
        width:2em*$i;
    }
    $i:$i-2;
}
//@each
    @each $member in a, b, c, d {
　　　　.#{$member} {
　　　　　　background-image: url("/image/#{$member}.jpg");
　　　　}
　　}
```
* 自定义函数

```plain
@function name($n){
    @return $n*2;
}
.box{
    width:name(value);
}
```


# **Sass、Less 是什么？为什么要使用？**

* **Sass/Less** 是 CSS 预处理器，支持变量、嵌套、混合等。

* **优势**：提高代码复用性、简化复杂样式管理。


---
# **CSS 预处理器/后处理器是什么？为什么要使用？**

* **预处理器**（如 Sass）：在 CSS 前编译，增强功能。

* **后处理器**（如 PostCSS）：在 CSS 后处理，优化兼容性。

* **目的**：提高开发效率、兼容性处理。


---
# **说说对 CSS 预编语言的理解，以及他们的区别**

* **Sass/Less/Stylus**：预处理器，支持变量、函数、嵌套。

* **区别**：Sass 支持 SCSS 和 Sassy 语法，Less 更接近原生 CSS。


---
# **Less 文件中怎么使用函数？**

**知识概述**

* Less 提供了内置函数（如 `lighten()`、`darken()`）和自定义函数（通过 `@function` 定义）。

* 函数用于动态计算颜色、尺寸等值。

**答案详解**

```less
// 内置函数示例
.button {
  background: lighten(#00f, 20%); // 浅蓝色
}

// 自定义函数示例
@function double($value) {
  @return $value * 2;
}
.width {
  width: double(100px); // 200px
}
```
**实战场景**
* 动态生成主题色的深浅变体。

* 计算响应式布局中的尺寸。


---
