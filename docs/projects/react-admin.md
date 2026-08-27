---
title: React Admin 中后台脚手架
date: 2026-08-20
tags: [react, vite, antd, admin]
repo: https://github.com/example/react-admin
summary: 基于 React + Vite + Ant Design 的中后台脚手架，内置权限路由、动态菜单与请求封装。
---

# React Admin 中后台脚手架

一个面向中后台系统的前端脚手架，解决"每个新项目都要从零搭一遍"的重复劳动。

## 技术栈

- React 18 + TypeScript
- Vite（构建极快、HMR 顺滑）
- Ant Design 5（组件全家桶）
- React Router 6（权限路由）
- Zustand（轻量状态管理）

## 核心能力

1. **权限路由**：基于角色的动态路由表，登录后按需注入可访问路由。
2. **动态菜单**：菜单由路由表自动生成，无需手写两套配置。
3. **请求封装**：统一 `request` 实例，自动携带 token、处理 401 跳转登录、错误提示。
4. **主题定制**：基于 `antd` ConfigProvider 与主色 token，支持浅色/深色切换。

## 目录结构

```
src/
├── router/        # 动态路由 + 权限守卫
├── layouts/       # 基础布局（侧边栏/顶栏）
├── store/         # zustand 状态
├── utils/request  # 请求封装
└── pages/         # 业务页面
```

## 接入新项目

```bash
pnpm create kb-react-admin my-project
cd my-project && pnpm install && pnpm dev
```

> 经验：中后台最耗时的永远是权限与菜单，把这层抽象好，新项目能省下 60% 启动时间。
