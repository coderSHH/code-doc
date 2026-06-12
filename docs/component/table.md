# STable

| 参数                   | 说明                                                                           | 类型                                | 默认值            |
| :--------------------- | :----------------------------------------------------------------------------- | :---------------------------------- | :---------------- |
| animateRows            | 是否开启动画                                                                   | boolean                             | true              |
| autoHeaderHeight       | 是否自动表头高度，开启后会全量加载表头部分， 有一定的性能损耗                  | boolean                             | false             |
| bordered               | 是否展示外边框和列边框                                                         | boolean                             | false             |
| columns                | 表格列的配置描述，具体项见下表                                                 | array                               | -                 |
| childrenColumnName     | 指定树形结构的列名                                                             | string                              | children          |
| dataSource             | 数据数组                                                                       | object                              | []                |
| defaultExpandAllRows   | 初始时，是否展开所有行                                                         | boolean                             | false             |
| defaultExpandedRowKeys | 默认展开的行                                                                   | string []                           | -                 |
| deepWatchDataSource    | 是否深度监听 dataSource 变化， 有一定的性能损耗                                | boolean                             | false             |
| deepWatchColumns       | 是否深度监听 columns 变化， 有一定的性能损耗                                   | boolean                             | false             |
| expandedRowKeys        | 展开的行，控制属性                                                             | string[]                            | -                 |
| expandFixed            | 控制展开图标是否固定，可选 true / left /right                                  | boolean/string                      | false             |
| expandRowByClick       | 通过点击行来展开子行                                                           | boolean                             | false             |
| expandIconColumnIndex  | 自定义展开按钮的列顺序，-1 时不展示                                            | number                              | -                 |
| footer                 | 表格尾部                                                                       |
| getPopupContainer      | 设置表格内各类浮层的渲染节点，如筛选菜单                                       |
| loading                | 页面是否加载中                                                                 | boolean/object                      | false             |
| pagination             | 分页器，参考配置项，设为 false 时不展示和进行分页                              | object                              | -                 |
| rowClassName           | 表格行的类名 Function(record, index):string -                                  | -                                   |
| rowKey                 | 表格行 key 的取值，可以是字符串或一个函数                                      | string/Function(record):string      | 'key'             |
| rowSelection           | 列表项是否可选择，配置项                                                       | object                              | null              |
| scroll                 | 表格是否可滚动，也可以指定滚动区域的宽、高，配置项                             | object                              | -                 |
| showSorterTooltip      | 表头是否显示下一次排序的 tooltip 提示。                                        | boolean/Tooltip props               | true              |
| showHeader             | 是否显示表头                                                                   | boolean                             | true              |
| size                   | 表格大小                                                                       | default/middle/small                | default           |
| sortDirections         | 支持的排序方式，取值为 ascend descend                                          | Array                               | [ascend, descend] |
| indentSize             | 展示树形数据时，每层缩进的宽度，以 px 为单位                                   | number                              | 15                |
| rowExpandable          | 设置是否允许行展开                                                             | (record) => boolean                 | -                 |
| customRow              | 设置行属性                                                                     | Function(record, index)             | -                 |
| headerCell             | 个性化头部单元格                                                               | v-slot:headerCell="{title, column}" | -                 |
| summary                | 总结栏                                                                         | v-slot:summary                      | -                 |
| summaryFixed           | 固定总结栏 boolean                                                             | 'top'（2.4.6）/'bottom'             | -                 |
| emptyText              | 自定义空数据时的显示内容                                                       | v-slot:emptyText                    | -                 |
| columnDrag             | 列表头是否允许拖拽, 详见                                                       | boolean                             | -                 |
| rowHoverDelay          | 表格行 hover 延时，用于性能优化                                                | number                              | 50                |
| xVirtual               | 横向是否虚拟滚动                                                               | boolean                             |
| ignoreCellKey          | 忽略单元格唯一 key，进一步提升自定义组件复用，bodyCell 插槽新增 key 参数       | boolean                             | false             |
| showHeaderScrollbar    | 显示表头滚动条                                                                 | boolean                             | false             |
| rangeSelection         | 单元格选择, 开启后单元格内文本无法划词选中                                     | boolean /single(只能选择一个区间)   | single            |
| copyDelimiter          | 复制时单元格拼接分隔符                                                         | string                              | \t                |
| tooltipDelay           | 单元格 tooltip 延时，用于自定义延迟时间                                        | number                              | 200               |
| bodyCell               | 个性化单元格                                                                   |
| customCell             | 设置单元格属性, column 如配置了 customCell, 优先使用 column.customCell         |
| customFilterDropdown   | 自定义筛选菜单，需要配合 column.customFilterDropdown 使用                      |
| customFilterIcon       | 自定义筛选图标                                                                 |
| rowDragGhost           | 自定义拖拽行时的提示内容                                                       |
| expandedRowRender      | 额外的展开行                                                                   |
| expandIcon             | 自定义展开图标                                                                 |
| locale                 | 默认文案设置，目前包括排序、过滤、空数据文案                                   |
| sticky                 | 设置粘性头部和滚动条 boolean                                                   |
| title                  | 表格标题 Function(currentPageData)                                             |
| menuIcon               | 自定义筛选菜单图标                                                             |
| menuPopup              | 自定义筛选菜单弹出内容                                                         |
| cellEditor             | 自定义单元格编辑器，结合 column.editable 使用                                  |
| columnDragGhost        | 自定义拖拽列时的提示内容                                                       |
| preserveRow            | 行是否常驻页面，不受虚拟滚动影响，一般用于合并行，注意：常驻页面会使性能下降   |
| rowHeight              | 配置行高，组件内部默认会根据 size 自动调整高度，如果需要自定义高度可使用该属性 | number                              |
