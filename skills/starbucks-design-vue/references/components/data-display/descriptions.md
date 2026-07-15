---
name: starbucks-vue-descriptions
description: "Starbucks UI Vue 描述列表 Descriptions 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-descriptions>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 描述列表 Descriptions

## 简介

简单地成组展示多个只读字段，一般用于详情页的信息。

## 基本用法

```vue
<template>
  <a-space direction="vertical" size="large" fill>
    <a-descriptions :data="data" title="User Info" layout="inline-horizontal" />
    <a-descriptions title="User Info" :column="{xs:1, md:3, lg:4}">
      <a-descriptions-item v-for="item of data" :label="item.label" :span="item.span ?? 1">
        <a-tag>{{ item.value }}</a-tag>
      </a-descriptions-item>
    </a-descriptions>
  </a-space>
</template>

<script>
export default {
  setup() {
    const data = [{
      label: 'Name',
      value: 'Socrates',
      span: 3,
    }, {
      label: 'Mobile',
      value: '123-1234-1234',
    }, {
      label: 'Residence',
      value: 'Beijing'
    }, {
      label: 'Hometown',
      value: 'Beijing',
    }, {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing'
    }];

    return {
      data
    }
  },
}
</script>
```

## API

### `<descriptions>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|data|描述列表的数据|`DescData[]`|`[]`||
|column|每行放置的数据个数。2.20.0 版本支持响应式配置，配置可参考 Grid|`number \| ResponsiveValue`|`3`||
|title|描述列表的标题|`string`|`-`||
|layout|描述列表的排列方式|`'horizontal' \| 'vertical' \| 'inline-horizontal' \| 'inline-vertical'`|`'horizontal'`||
|align|文字的对齐位置|`TextAlign \| { label?: TextAlign; value?: TextAlign }`|`'left'`||
|size|描述列表的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`-`||
|bordered|是否显示边框|`boolean`|`false`||
|label-style|数据标签的样式|`CSSProperties`|`-`||
|value-style|数据内容的样式|`CSSProperties`|`-`||
|table-layout|描述中表格样式的 `layout-fixed`，当设置成 `fixed` 时，宽度会均分。|`'auto' \| 'fixed'`|`'auto'`|2.38.0|

### `<descriptions>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|value|数据内容|value: `string`<br>index: `number`<br>data: `DescData`|
|label|数据标签|label: `string`<br>index: `number`<br>data: `DescData`|
|title|标题|-|

### `<descriptions-item>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|span|所占列数|`number`|`1`|2.18.0|
|label|标签|`string`|`-`|2.18.0|

### `<descriptions-item>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|label|标签|-|2.18.0|

### DescData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|标签|`string \| RenderFunction`|`-`|
|value|数据|`string \| RenderFunction`|`-`|
|span|所占列数|`number`|`1`|

## 常用模式

- **单列样式**：单列的描述列表样式。
- **标签文本对齐**：标签文本可以设置左对齐右对齐，也可以设置垂直的排列方式。
- **带边框样式**：带边框和背景颜色的列表。
- **布局模式**：有水平排列、垂直排列、行内水平排列、行内垂直排列四种布局模式。
- **布局示例**：`span` 所占列数大于 `column` 可放置的数据个数时，`span` 会被设置为 `column` 的值，当行剩余列数不够放置下一列时将自动换行，每行末尾列会自动填充剩余量。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
