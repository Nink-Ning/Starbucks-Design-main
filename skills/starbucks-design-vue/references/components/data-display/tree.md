---
name: starbucks-vue-tree
description: "Starbucks UI Vue 树 Tree 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-tree>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 树 Tree

## 简介

为每个节点赋予全局唯一的 `key`（必填项），`title` 为该节点显示的内容。

## 基本用法

```vue
<template>
  <a-tree
    :data="treeData"
    :default-expanded-keys="['0-0-0']"
    :default-selected-keys="['0-0-0', '0-0-1']"
  />
</template>
<script>
  export default {
    data() {
      return {
        treeData,
      };
    },
  };

  const treeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Branch 0-0-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'Leaf',
              key: '0-0-0-0',
            },
            {
              title: 'Leaf',
              key: '0-0-0-1',
            }
          ]
        },
        {
          title: 'Branch 0-0-1',
          key: '0-0-1',
          children: [
            {
              title: 'Leaf',
              key: '0-0-1-0',
            },
          ]
        },
      ],
    },
  ];
</script>
```

## API

### `<tree>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|size|尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|block-node|节点是否占据一行|`boolean`|`false`||
|default-expand-all|是否默认展开父节点|`boolean`|`true`||
|multiple|是否支持多选|`boolean`|`false`||
|checkable|是否在节点前添加复选框，从 `2.27.0` 开始支持函数格式|`boolean\| ((    node: TreeNodeData,    info: {      level: number;      isLeaf: boolean;    }  ) => boolean)`|`false`||
|selectable|是否支持选择，从 `2.27.0` 开始支持函数格式|`boolean\| ((    node: TreeNodeData,    info: {      level: number;      isLeaf: boolean;    }  ) => boolean)`|`true`||
|check-strictly|是否取消父子节点关联|`boolean`|`false`||
|checked-strategy|定制回填方式 <br/> all: 返回所有选中的节点  <br/> parent: 父子节点都选中时只返回父节点 <br/> child: 只返回子节点|`'all' \| 'parent' \| 'child'`|`'all'`||
|default-selected-keys|默认选中的树节点|`Array<string \| number>`|`-`||
|selected-keys **(v-model)**|选中的树节点|`Array<string \| number>`|`-`||
|default-checked-keys|默认选中复选框的树节点|`Array<string \| number>`|`-`||
|checked-keys **(v-model)**|选中复选框的树节点|`Array<string \| number>`|`-`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<tree>` 事件

|事件名|描述|参数|
|---|---|---|
|select|点击树节点时触发|selectedKeys: `Array<string \| number>`<br>data: `{ selected?: boolean; selectedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }`|
|check|点击树节点复选框时触发。`halfCheckedKeys` 和 `halfCheckedNodes` 从 `2.19.0` 开始支持。|checkedKeys: `Array<string \| number>`<br>data: `{ checked?: boolean; checkedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; halfCheckedKeys: (string \| number)[]; halfCheckedNodes: TreeNodeData[]; }`|
|expand|展开/关闭|expandKeys: `Array<string \| number>`<br>data: `{ expanded?: boolean; expandNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }`|
|drag-start|节点开始拖拽|ev: `DragEvent`<br>node: `TreeNodeData`|
|drag-end|节点结束拖拽|ev: `DragEvent`<br>node: `TreeNodeData`|
|drag-over|节点被拖拽至可释放目标|ev: `DragEvent`<br>node: `TreeNodeData`|
|drag-leave|节点离开可释放目标|ev: `DragEvent`<br>node: `TreeNodeData`|
|drop|节点在可释放目标上释放|data: `{ e: DragEvent; dragNode: TreeNodeData; dropNode: TreeNodeData; dropPosition: number; }`|

### `<tree>` 方法

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|scrollIntoView|虚拟列表滚动某个元素|options: `{ index?: number; key?: number \| string; align: 'auto' \| 'top' \| 'bottom'}`|-||
|getSelectedNodes|获取选中的节点|-|TreeNodeData[]|2.19.0|
|getCheckedNodes|获取选中复选框的节点。支持传入 `checkedStrategy`，没有传则取组件的配置。|options: ` checkedStrategy?: 'all' \| 'parent' \| 'child'; includeHalfChecked?: boolean; `|TreeNodeData[]|2.19.0|
|getHalfCheckedNodes|获取复选框半选的节点|-|TreeNodeData[]|2.19.0|
|getExpandedNodes|获取展开的节点|-|TreeNodeData[]|2.19.0|
|checkAll|设置全部节点的复选框状态|checked: ` boolean `|-|2.20.0|
|checkNode|设置指定节点的复选框状态|key: ` TreeNodeKey \| TreeNodeKey[] `<br>checked: ` boolean `<br>onlyCheckLeaf: ` boolean `|-|2.20.0，onlyCheckLeaf from 2.21.0|
|selectAll|设置全部节点的选中状态|selected: ` boolean `|-|2.20.0|
|selectNode|设置指定节点的选中状态|key: ` TreeNodeKey \| TreeNodeKey[] `<br>selected: ` boolean `|-|2.20.0|
|expandAll|设置全部节点的展开状态|expanded: ` boolean `|-|2.20.0|
|expandNode|设置指定节点的展开状态|key: ` TreeNodeKey \| TreeNodeKey[] `<br>expanded: ` boolean `|-|2.20.0|

### `<tree>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|title|标题|title: `string`||
|extra|渲染额外的节点内容|-||
|drag-icon|定制 drag 图标|node: `TreeNodeData`||
|loading-icon|定制 loading 图标|-||
|switcher-icon|定制 switcher 图标|-||
|icon|定制节点图标|node: `TreeNodeData`|2.18.0|

### TreeNodeData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|key|唯一标示|`string \| number`|`-`|
|title|该节点显示的标题|`string`|`-`|
|selectable|是否允许选中|`boolean`|`false`|
|disabled|是否禁用节点|`boolean`|`false`|
|disableCheckbox|是否禁用复选框|`boolean`|`false`|
|checkable|是否显示多选框|`boolean`|`false`|
|draggable|是否可以拖拽|`boolean`|`false`|
|isLeaf|是否是叶子节点。动态加载时有效|`boolean`|`false`|
|icon|节点的图标|`() => VNode`|`-`|
|switcherIcon|定制 switcher 图标，优先级大于 tree|`() => VNode`|`-`|
|loadingIcon|定制 loading 图标，优先级大于 tree|`() => VNode`|`-`|
|dragIcon|定制 drag 图标，优先级大于 tree|`() => VNode`|`-`|

> 仅列出常用项，低频属性按需查阅官方 API。

### TreeFieldNames

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|key|指定 key 在 TreeNodeData 中的字段名|`string`|`key`|
|title|指定 title 在 TreeNodeData 中的字段名|`string`|`title`|
|disabled|指定 disabled 在 TreeNodeData 中的字段名|`string`|`disabled`|
|children|指定 children 在 TreeNodeData 中的字段名|`string`|`children`|
|isLeaf|指定 isLeaf 在 TreeNodeData 中的字段名|`string`|`isLeaf`|
|disableCheckbox|指定 disableCheckbox 在 TreeNodeData 中的字段名|`string`|`disableCheckbox`|
|checkable|指定 checkable 在 TreeNodeData 中的字段名|`string`|`checkable`|
|icon|指定 icon 在 TreeNodeData 中的字段名|`string`|`checkable`|

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

- **节点占一行**：节点占据一整行。
- **多选**：`Tree` 设置 `multiple` 属性为`true`，可以启用多选。
- **带复选框的树**：为 `Tree` 添加 `checkable` 属性即可使树具有复选框功能，可以用 `defaultCheckedKeys` 指定复选框默认选中的节点。
- **双向绑定**：`selectedKeys` 、 `checkedKeys` 、 `expandedKeys` 属性均可受控，不仅支持 `v-model` ，还可以在对应的 `select` / `check` / `expand` 事件中自行控制如何更新属性值。
- **动态加载**：动态加载节点。
- **拖拽**：可拖拽的树节点。
- **设置回填方式**：为 `Tree` 添加 `checkedStrategy` 可以设置选中时的回填方式
- **显示连接线**：为 `Tree` 添加 `showLine` 属性即可使树具有连接线

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
