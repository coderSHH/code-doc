---
title: MVCC 实现原理
date: 2026-08-24
category: backend
tags: [backend, mysql-事务, interview]
description: MVCC 实现原理 学习笔记大纲与面试题整理。
---

# MVCC 实现原理

## 核心问题
- MVCC 如何解决读写冲突？
- Read View 的构成？
- undo log 在 MVCC 中的作用？

## 关键概念
- 事务 ID / 回滚指针
- 行记录隐藏字段
- 可重复读与幻读

## 待补充
- [ ] 补充核心原理与源码细节
- [ ] 补充典型面试题答案
- [ ] 补充实际项目踩坑案例

## 相关链接
- [MySQL 事务 分类首页](./)
