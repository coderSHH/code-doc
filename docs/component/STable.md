# STable

思路：把一个表格页面所有重复的功能 （表格多选、查询、重置、刷新、分页、数据操作二次确认、文件下载、文件上传） 都封装成 Hooks 函数钩子或组件，然后在 STable 组件中使用这些函数钩子或组件。在页面中使用的时，只需传给 STable 当前表格数据的请求 API、表格配置项 columns 就行了，数据传输都使用 作用域插槽 或 tsx 语法从 STable 传递给父组件就能在页面上获取到了。

## STable 属性

| 属性名          | 类型            | 是否必传 | 默认值                            | 描述                                                                     |
| :-------------- | :-------------- | -------- | --------------------------------- | ------------------------------------------------------------------------ |
| columns         | ColumnProps     | 是       | []                                | 组件会根据此字段渲染搜索表单与表格列（支持动态更新）                     |
| data            | Array           |          | []                                | 静态 tableData 数据（支持分页），若存在则不会使用 requestApi 返回的 data |
| requestApi ？   | Function        |          | []                                | 获取表格数据的请求 API                                                   |
| requestAuto ？  |
| requestError ？ |
| dataCallback ？ |
| pagination      | Boolean         |          | true                              | 是否显示分页组件                                                         |
| initParam ？    | Object          |          | {}                                | 表格请求的初始化参数，该值变化会重新请求表格数据                         |
| toolButton      | Boolean / Array |          | true                              | 是否显示表格功能按钮，支持（["refresh" / "setting" /"search"]）          |
| rowKey ？       | String          |          | 'id'                              | 当表格数据多选时，所指定的 id                                            |
| searchCol ？    | Number /Object  |          | xs: 1, sm: 2, md: 2, lg: 3, xl: 4 | 表格搜索项每列占比配置                                                   |

## Column 配置（ColumnProps）

使用 v-bind="column" 通过属性透传将每一项 column 属性全部透传到 el-table-column 上，所以支持 el-table-column 的所有 Props 属性。在此基础上，还扩展了以下 Props (均为非必传项)：

| 属性名 | 类型 | 默认值 | 描述 |
| :----- | :--- | ------ | ---- |
| name   | -    | -      | -    |

## 检索栏 配置 （SearchProps）

| 属性名 | 类型 | 是否必传 | 默认值 | 描述 |
| :----- | :--- | -------- | ------ | ---- |
| name   | -    | -        | -      | -    |

## STable 事件

| 事件名 | 描述 | 回调参数 |
| :----- | :--- | -------- |
| name   | -    | -        |

## STable 方法

| 方法名 | 描述 |
| :----- | :--- |
| name   | -    |

## STable 插槽

| 插槽名 | 描述 |
| :----- | :--- |
| name   | -    |
