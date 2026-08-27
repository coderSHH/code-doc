---
title: Vue3 组合式 API 实践要点
date: 2026-08-20
category: frontend
tags: [vue3, composition-api, setup, reactivity]
description: 组合式 API 的 setup、响应式 ref/reactive、生命周期与逻辑抽离的实战归纳。
---

# Vue3 组合式 API 实践要点

组合式 API（Composition API）把"按选项组织"改成"按逻辑关注点组织"，大型组件维护性明显更好。

## 1. `setup` 与 `<script setup>`

`<script setup>` 是编译时语法糖，顶层绑定自动暴露给模板，无需 `return`。

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)

onMounted(() => console.log('mounted'))
</script>
```

## 2. `ref` vs `reactive`

- `ref`：任意类型，模板自动解包，JS 中需 `.value`。
- `reactive`：仅对象/数组，直接访问属性，但**解构会丢失响应性**。

需要解构时用 `toRefs()`：

```ts
const state = reactive({ x: 0, y: 0 })
const { x, y } = toRefs(state) // 仍保持响应式
```

## 3. 逻辑抽离（Composables）

把可复用状态逻辑抽成 `useXxx()` 函数，这是组合式 API 最大的价值。

```ts
// useCounter.ts
import { ref } from 'vue'
export function useCounter(init = 0) {
  const count = ref(init)
  const inc = () => count.value++
  return { count, inc }
}
```

## 4. 响应式陷阱

- 数组索引赋值 `arr[i] = x` 在 Vue3 已被 Proxy 修复，可直接用。
- 给 reactive 对象新增原本不存在的属性——Vue3 同样支持（Proxy 特性）。
- `ref` 包裹对象时内部仍是 `reactive`，`count.value.x` 也是响应式的。

> 结论：Vue3 响应式基于 Proxy，绝大多数"Vue2 响应式坑"已不存在，但解构丢失响应性这点要牢记。
