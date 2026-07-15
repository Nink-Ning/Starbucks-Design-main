---
name: starbucks-vue-tree-select
description: "Starbucks UI Vue 树选择 TreeSelect 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-tree-select>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 树选择 TreeSelect

## 简介

最简单的用法。

## 基本用法

```vue
<template>
  <a-tree-select
    :data="treeData"
    placeholder="Please select ..."
    style="width: 300px"
  ></a-tree-select>
</template>
<script>
  import { h } from 'vue';
  import { IconCalendar } from '@arco-design/web-vue/es/icon';

  export default {
    setup() {
      return {
        treeData,
      };
    },
  };

  const treeData = [
    {
      key: 'node1',
      icon: () => h(IconCalendar),
      title: 'Trunk',
      disabled: true,
      children: [
        {
          key: 'node2',
          title: 'Leaf',
        },
      ],
    },
    {
      key: 'node3',
      title: 'Trunk2',
      icon: () => h(IconCalendar),
      children: [
        {
          key: 'node4',
          title: 'Leaf',
        },
        {
          key: 'node5',
          title: 'Leaf',
        },
      ],
    },
  ];
</script>
```

## API

### `<tree-select>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|disabled|是否禁用|`boolean`|`false`||
|loading|是否为加载中状态|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|size|选择框的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|border|是否显示边框|`boolean`|`true`||
|allow-search|是否允许搜索|`boolean \| { retainInputValue?: boolean }`|`false (single) \| true (multiple)`||
|allow-clear|是否允许清除|`boolean`|`false`||
|placeholder|提示文案|`string`|`-`||
|max-tag-count|最多显示的标签数量，仅在多选模式有效|`number`|`-`||
|multiple|是否支持多选|`boolean`|`false`||
|default-value|默认值|`string \| number \| Array<string \| number> \| LabelValue \| LabelValue[]`|`-`||
|model-value **(v-model)**|绑定值|`string \| number \| Array<string \| number> \| LabelValue \| LabelValue[]`|`-`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<tree-select>` 事件

|事件名|描述|参数|版本|
|---|---|---|:---|
|change|值改变时触发|value: `string \| number \| LabelValue \| Array<string \| number> \| LabelValue[] \| undefined`||
|popup-visible-change|下拉框显示状态改变时触发|visible: `boolean`||
|search|搜索值变化时触发|searchKey: `string`||
|clear|点击清除时触发|-||
|input-value-change|输入框的值发生改变时触发|inputValue: `string`|2.55.0|

### `<tree-select>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|trigger|自定义触发元素|-||
|prefix|前缀|-||
|label|自定义选择框显示|data: `mixed`||
|header|自定义下拉框页头|-||
|loader|定制加载中显示的内容|-||
|empty|定制空数据展示|-||
|footer|自定义下拉框页脚|-||
|tree-slot-extra|定制 tree 组件的渲染额外节点内容|-||
|tree-slot-title|定制 tree 组件的节点标题|title: `string`||
|tree-slot-icon|定制 tree 组件的节点图标|node: `TreeNodeData`|2.18.0|
|tree-slot-switcher-icon|定制 tree 组件的 switcher 图标|-||

## 常用模式

- **设置 value 格式**：`labelInValue` 为 `true` 时，`value` 格式为： `{ label: string, value: string }`。
- **双向绑定**：选中值支持双向绑定。
- **动态加载**：可以通过 `loadMore` 进行动态加载。此时可设置 `isLeaf` 来标示叶子节点。
- **搜索**：设置 `:allow-search="true"` 启用搜索功能。动态加载时候只能在已加载数据中进行搜索。默认的关键字搜索是从`value`字段匹配。也可以传入 `filterTreeNode`自定义过滤方式。
- **远程搜索**：监听 `search` 事件，在事件处理函数中获取数据并更新 `treeData`。自定义搜索逻辑时，建议关闭内部过滤逻辑（`:disable-filter="true"`），以免影响自定义结果。
- **不同尺寸**：设置 `size` 可以使用四种尺寸（small, default, large, huge）的选择器。高度分别对应 24px、28px、32px、36px。
- **下拉框的页头和页脚**：自定义树选择下拉框的页头和页脚
- **自定义触发元素**：自定义触发元素。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
