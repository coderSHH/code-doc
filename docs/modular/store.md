# Vuex

Vuex 是一个专为 Vue.js 应用设计的状态管理库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 被视为 Vue.js 应用中的数据“单一真相源”，特别是对于大型单页应用（SPA）。Vuex 提供了一种集中管理应用状态的方式，使得状态的变化更加可预测和可追踪。

#### 核心概念

1. State（状态）
   State 是存储的基本数据。在 Vuex 中，你可以通过 this.$store.state.xxx 来访问状态。

2. Getters（获取器）
   Getters 可以视为 store 的计算属性。Getters 会接收 state 作为其第一个参数，并且可以返回一个计算后的状态。

3. Mutations（变更）
   Mutations 是唯一允许更新应用状态的方法。每个 mutation 都有一个字符串的事件类型 (type) 和一个回调函数 (handler)。这个回调函数就是我们实际进行状态更新的地方，并且它会接受 state 作为第一个参数。

4. Actions（动作）
   Actions 类似于 mutations，不同之处在于：Action 提交 (commit) mutation，而不是直接变更状态。Action 可以包含任意异步操作。

5. Modules（模块）
   当应用变得非常复杂时，store 对象就可能变得相当臃肿。为了解决这个问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter，甚至是嵌套子模块。

## 项目封装 Vuex
