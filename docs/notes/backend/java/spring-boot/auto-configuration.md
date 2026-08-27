---
title: Spring Boot 自动配置原理
date: 2026-08-24
category: backend
tags: [backend, spring-boot, interview]
description: Spring Boot 自动配置原理 学习笔记大纲与面试题整理。
---

# Spring Boot 自动配置原理

## 核心问题
- `@SpringBootApplication` 里 `@EnableAutoConfiguration` 做了什么？
- `spring.factories` 与 AutoConfiguration.imports 的区别？
- 条件注解如何控制配置类生效？

## 关键概念
- `SpringApplication` 启动流程
- `AutoConfigurationImportSelector` 读取配置
- `@ConditionalOnClass` / `@ConditionalOnMissingBean` / `@ConditionalOnProperty`

## 待补充
- [ ] 补充核心原理与源码细节
- [ ] 补充典型面试题答案
- [ ] 补充实际项目踩坑案例

## 相关链接
- [Spring Boot 分类首页](./)
