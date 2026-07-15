---
name: starbucks-vue-table
description: "Starbucks UI Vue 表格 Table 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-table>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 表格 Table

## 简介

表格的基本用法，需要传递 `columns` 和 `data`。

## 基本用法

```vue
<template>
  <a-table :columns="columns" :data="data" />
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
    ];
    const data = reactive([{
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com'
    }, {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com'
    }, {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com'
    }, {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com'
    }, {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com'
    }]);

    return {
      columns,
      data
    }
  },
}
</script>
```

## API

### `<table>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|columns|表格的列描述信息|`TableColumnData[]`|`[]`||
|data|表格的数据|`TableData[]`|`[]`||
|bordered|是否显示边框|`boolean \| TableBorder`|`true`||
|hoverable|是否显示选中效果|`boolean`|`true`||
|stripe|是否开启斑马纹效果|`boolean`|`false`||
|size|表格的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'large'`||
|table-layout-fixed|表格的 table-layout 属性设置为 fixed，设置为 fixed 后，表格的宽度不会被内容撑开超出 100%。|`boolean`|`false`||
|loading|是否为加载中状态|`boolean\|object`|`false`||
|row-selection|表格的行选择器配置|`TableRowSelection`|`-`||
|expandable|表格的展开行配置|`TableExpandable`|`-`||
|scroll|表格的滚动属性配置。`2.13.0` 版本增加字符型值的支持。`2.20.0` 版本增加 `minWidth`,`maxHeight` 的支持。|`{  x?: number \| string;  y?: number \| string;  minWidth?: number \| string;  maxHeight?: number \| string;}`|`-`||
|pagination|分页的属性配置|`boolean \| PaginationProps`|`true`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<table>` 事件

|事件名|描述|参数|版本|
|---|---|---|:---|
|expand|点击展开行时触发|rowKey: `string \| number`<br>record: `TableData`||
|expanded-change|已展开的数据行发生改变时触发|rowKeys: `(string \| number)[]`||
|select|点击行选择器时触发|rowKeys: `string \| number[]`<br>rowKey: `string \| number`<br>record: `TableData`||
|select-all|点击全选选择器时触发|checked: `boolean`||
|selection-change|已选择的数据行发生改变时触发|rowKeys: `(string \| number)[]`||
|sorter-change|排序规则发生改变时触发|dataIndex: `string`<br>direction: `string`||
|filter-change|过滤选项发生改变时触发|dataIndex: `string`<br>filteredValues: `string[]`||
|page-change|表格分页发生改变时触发|page: `number`||
|page-size-change|表格每页数据数量发生改变时触发|pageSize: `number`||
|change|表格数据发生变化时触发|data: `TableData[]`<br>extra: `TableChangeExtra`<br>currentData: `TableData[]`|2.40.0 增加 currentData|
|cell-mouse-enter|单元格 hover 进入时触发|record: `TableData`<br>column: `TableColumnData`<br>ev: `Event`||
|cell-mouse-leave|单元格 hover 退出时触发|record: `TableData`<br>column: `TableColumnData`<br>ev: `Event`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<table>` 方法

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|selectAll|设置全选状态|checked: ` boolean `|-|2.22.0|
|select|设置行选择器状态|rowKey: ` string \| number \| (string \| number)[] `<br>checked: ` boolean `|-|2.31.0|
|expandAll|设置全部展开状态|checked: ` boolean `|-|2.31.0|
|expand|设置展开状态|rowKey: ` string \| number \| (string \| number)[] `<br>checked: ` boolean `|-|2.31.0|
|resetFilters|重置列的筛选器|dataIndex: ` string \| string[] `|-|2.31.0|
|clearFilters|清空列的筛选器|dataIndex: ` string \| string[] `|-|2.31.0|
|resetSorters|重置列的排序|-|-|2.31.0|
|clearSorters|清空列的排序|-|-|2.31.0|

### `<table>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|th|自定义 th 元素|column: `TableColumnData`|2.26.0|
|thead|自定义 thead 元素|-|2.26.0|
|empty|空白展示|-||
|summary-cell|总结行|column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number`|2.23.0|
|pagination-right|分页器右侧内容|-|2.18.0|
|pagination-left|分页器左侧内容|-|2.18.0|
|td|自定义 td 元素|column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number`|2.16.0|
|tr|自定义 tr 元素|record: `TableData`<br>rowIndex: `number`|2.16.0|
|tbody|自定义 tbody 元素|-|2.16.0|
|drag-handle-icon|拖拽锚点图标|-|2.16.0|
|footer|表格底部|-||
|expand-row|展开行内容|record: `TableData`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<table-column>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|data-index|列信息的标识，对应TableData中的数据|`string`|`-`||
|title|列标题|`string`|`-`||
|width|列宽度|`number`|`-`||
|min-width|最小列宽|`number`|`-`||
|align|对齐方向|`TableColumnData['align']`|`-`||
|fixed|固定位置|`TableColumnData['fixed']`|`-`||
|ellipsis|是否显示为省略|`boolean`|`false`||
|sortable|排序相关选项|`TableSortable`|`-`||
|filterable|过滤相关选项|`TableFilterable`|`-`||
|cell-class|自定义单元格类名|`ClassName`|`-`|2.36.0|
|header-cell-class|自定义表头单元格类名|`ClassName`|`-`|2.36.0|
|body-cell-class|自定义内容单元格类名|`ClassName \| ((record: TableData) => ClassName)`|`-`|2.36.0|

> 仅列出常用项，低频属性按需查阅官方 API。

### `<table-column>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|filter-icon|筛选按钮图标|-|2.23.0|
|filter-content|自定义筛选弹出框内容|filterValue: `string[]`<br>setFilterValue: `(filterValue: string[]) => void`<br>handleFilterConfirm: `(event: Event) => void`<br>handleFilterReset: `(event: Event) => void`|2.23.0|
|title|标题|-||
|cell|单元格|record: `TableData`<br>column: `TableColumnData`<br>rowIndex: `number`||

### 类型定义

```ts
type Filters = Record<string, string[]>;

type Sorter = { filed: string; direction: 'ascend' | 'descend' } | Record<string, never>;
```

### TableData

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|key|数据行的key|`string`|`-`||
|expand|扩展行内容|`string \| RenderFunction`|`-`||
|children|子数据|`TableData[]`|`-`||
|disabled|是否禁用行选择器|`boolean`|`false`||
|isLeaf|是否是叶子节点|`boolean`|`false`|2.13.0|

### TableSortable

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|sortDirections|支持的排序方向|`('ascend' \| 'descend')[]`|`-`|
|sorter|排序函数。设置为 `true` 可关闭内部排序。2.19.0 版本修改传出数据。|`((        a: TableData,        b: TableData,        extra: { dataIndex: string; direction: 'ascend' \| 'descend' }      ) => number)    \| boolean`|`-`|
|sortOrder|排序方向|`'ascend' \| 'descend' \| ''`|`-`|
|defaultSortOrder|默认排序方向（非受控模式）|`'ascend' \| 'descend' \| ''`|`-`|

### TableFilterData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|text|筛选数据选项的内容|`string \| RenderFunction`|`-`|
|value|筛选数据选项的值|`string`|`-`|

### TableFilterable

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|filters|筛选数据|`TableFilterData[]`|`-`||
|filter|筛选函数|`(filteredValue: string[], record: TableData) => boolean`|`-`||
|multiple|是否支持多选|`boolean`|`false`||
|filteredValue|筛选项|`string[]`|`-`||
|defaultFilteredValue|默认筛选项|`string[]`|`-`||
|renderContent|筛选框的内容|`(data: {    filterValue: string[];    setFilterValue: (filterValue: string[]) => void;    handleFilterConfirm: (event: Event) => void;    handleFilterReset: (event: Event) => void;  }) => VNodeChild`|`-`||
|icon|筛选按钮的图标|`RenderFunction`|`-`||
|triggerProps|筛选框的弹出框配置|`TriggerProps`|`-`||
|alignLeft|筛选图标是否左对齐|`boolean`|`false`|2.13.0|

### TableColumnData

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|dataIndex|列信息的标识，对应 `TableData` 中的数据|`string`|`-`||
|title|列标题|`string \| RenderFunction`|`-`||
|width|列宽度|`number`|`-`||
|minWidth|最小列宽|`number`|`-`||
|align|对齐方向|`'left' \| 'center' \| 'right'`|`-`||
|fixed|固定位置|`'left' \| 'right'`|`-`||
|ellipsis|是否显示省略号|`boolean`|`false`||
|tooltip|是否在显示省略号时显示文本提示。可填入 tooltip 组件属性|`boolean \| Record<string, any>`|`-`|2.26.0|
|sortable|排序相关选项|`TableSortable`|`-`||
|filterable|过滤相关选项|`TableFilterable`|`-`||
|children|表头子数据，用于表头分组|`TableColumnData[]`|`-`||
|cellClass|自定义单元格类名|`ClassName`|`-`|2.36.0|

> 仅列出常用项，低频属性按需查阅官方 API。

### TableBorder

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|wrapper|是否展示外边框|`boolean`|`false`|
|cell|是否展示单元格边框（表头+主体）|`boolean`|`false`|
|headerCell|是否展示表头单元格边框|`boolean`|`false`|
|bodyCell|是否展示主体单元格边框|`boolean`|`false`|

### TableRowSelection

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|type|行选择器的类型|`'checkbox' \| 'radio'`|`-`||
|selectedRowKeys|已选择的行（受控模式）|`BaseType[]`|`-`||
|defaultSelectedRowKeys|默认已选择的行（非受控模式）|`BaseType[]`|`-`||
|showCheckedAll|是否显示全选选择器|`boolean`|`false`||
|title|列标题|`string`|`-`||
|width|列宽度|`number`|`-`||
|fixed|是否固定|`boolean`|`false`||
|checkStrictly|是否开启严格选择模式|`boolean`|`true`|2.29.0|
|onlyCurrent|是否仅展示当前页的 keys（切换分页时清空 keys）|`boolean`|`false`|2.32.0|

### TableExpandable

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|expandedRowKeys|显示的展开行（受控模式）|`BaseType[]`|`-`|
|defaultExpandedRowKeys|默认显示的展开行（非受控模式）|`BaseType[]`|`-`|
|defaultExpandAllRows|是否默认展开所有的行|`boolean`|`false`|
|expandedRowRender|自定义展开行内容|`(record: TableData) => VNodeChild`|`-`|
|icon|展开图标|`(expanded: boolean, record: TableData) => VNodeChild`|`-`|
|title|列标题|`string`|`-`|
|width|列宽度|`number`|`-`|
|fixed|是否固定|`boolean`|`false`|

### TableDraggable

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|拖拽类型|`'row' \| 'handle'`|`-`|
|title|列标题|`string`|`-`|
|width|列宽度|`number`|`-`|
|fixed|是否固定|`boolean`|`false`|

### TableChangeExtra

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|触发类型|`'pagination' \| 'sorter' \| 'filter' \| 'drag'`|`-`|
|page|页码|`number`|`-`|
|pageSize|每页数据数|`number`|`-`|
|sorter|排序信息|`Sorter`|`-`|
|filters|筛选信息|`Filters`|`-`|
|dragTarget|拖拽信息|`TableData`|`-`|

### VirtualListProps

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|height|可视区域高度|`number \| string`|`-`||
|threshold|开启虚拟滚动的元素数量阈值，当数据数量小于阈值时不会开启虚拟滚动。|`number`|`-`||
|isStaticItemHeight|（已废除）元素高度是否是固定的。2.34.1 版本废除，请使用 `fixedSize`|`boolean`|`false`||
|fixedSize|元素高度是否是固定的。|`boolean`|`false`|2.34.1|
|estimatedSize|元素高度不固定时的预估高度。|`number`|`-`|2.34.1|
|buffer|视口边界外提前挂载的元素数量。|`number`|`10`|2.34.1|

## 常用模式

- **行选择器**：通过设置 `row-selection` 开启行选择器。
- **行选择器（单选框）**：通过设置 `rowSelection.type='radio'` 开启单选模式。
- **展开行**：通过设置 `expandable` 开启展开行功能。可以在 `data` 中添加 `expand` 属性，设置展开行显示内容。
- **文本省略和提示**：开启 `ellipsis` 属性可以显示省略号，如果同时开启 `tooltip` 会在显示省略号时使用文本提示。注意：开启 `tooltip` 后会修改 `table-cell` 中的 DOM 结构。
- **树形数据展示**：树形数据展示的例子，`data` 里有 `children` 字段时会展示为树形表格。
- **子树懒加载**：通过 `load-more` 属性可以开启子树懒加载功能。开启子树懒加载功能后，需要在无子树节点标注 `isLeaf: true`，没有标注且没有 `children` 属性的节点会认为需要子树懒加载处理。`load-more` 属性有提供 `done` 函数进行回调，可以在回调中传入懒加载的子树。
- **表格属性**：这里罗列了一些表格的属性，你可以方便的打开或关闭一些属性，查看它的效果。
- **排序和筛选**：通过设置 `columns` 中的 `sortable` 和 `filterable` 属性，可以配置排序和筛选功能。通过 `filter-icon-align-left` 属性可以让筛选按钮左对齐。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
