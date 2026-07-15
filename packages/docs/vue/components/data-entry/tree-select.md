---
sidebar_position: 1
---

# 树选择 TreeSelect

可以对树形结构数据进行选择。

## 基本用法

最简单的用法。

<preview path="./demos/tree-select/basic.vue" title="基本用法"></preview>


## 复选框多选

可以通过设置 `treeCheckable` 属性开启复选框勾选。

<preview path="./demos/tree-select/checkbox-multi.vue" title="复选框多选"></preview>


## 定制回填方式

可以通过`treeCheckStrategy`属性定制回填方式。

<preview path="./demos/tree-select/custom-fill-mode.vue" title="定制回填方式"></preview>


## 双向绑定

选中值支持双向绑定。

<preview path="./demos/tree-select/v-model.vue" title="双向绑定"></preview>


## 下拉框的页头和页脚

自定义树选择下拉框的页头和页脚

<preview path="./demos/tree-select/dropdown-header-footer.vue" title="下拉框的页头和页脚"></preview>


## 回退选项

使用 `fallback-option` 自定义找不到选项的值的显示效果，默认找不到选项就展示值本身。用户可以将其设定为 `false` 来隐藏那些没有匹配到节点数据的值。

<preview path="./demos/tree-select/fallback.vue" title="回退选项"></preview>


## 自定义 TreeData 的字段名称

通过 `fieldNames` 字段可以自定义 TreeData 的字段名。

<preview path="./demos/tree-select/custom-tree-data-fields.vue" title="自定义 TreeData 的字段名称"></preview>


## 设置 value 格式

`labelInValue` 为 `true` 时，`value` 格式为： `{ label: string, value: string }`。

<preview path="./demos/tree-select/set-value-format.vue" title="设置 value 格式"></preview>


## 动态加载

可以通过 `loadMore` 进行动态加载。此时可设置 `isLeaf` 来标示叶子节点。

<preview path="./demos/tree-select/dynamic-load.vue" title="动态加载"></preview>


## 多选

多选

<preview path="./demos/tree-select/multiple.vue" title="多选"></preview>


## 控制下拉框的展开收起

通过 `popupVisible` (支持 `v-model`) 控制下拉框的展开和收起。

<preview path="./demos/tree-select/control-dropdown.vue" title="控制下拉框的展开收起"></preview>


## 远程搜索

监听 `search` 事件，在事件处理函数中获取数据并更新 `treeData`。 自定义搜索逻辑时，建议关闭内部过滤逻辑（`:disable-filter="true"`），以免影响自定义结果。

<preview path="./demos/tree-select/remote-search.vue" title="远程搜索"></preview>


## 搜索

设置 `:allow-search="true"` 启用搜索功能。动态加载时候只能在已加载数据中进行搜索。默认的关键字搜索是从`value`字段匹配。也可以传入 `filterTreeNode`自定义过滤方式。

<preview path="./demos/tree-select/search.vue" title="搜索"></preview>


## 不同尺寸

设置 `size` 可以使用四种尺寸（small, default, large, huge）的选择器。高度分别对应 24px、28px、32px、36px。

<preview path="./demos/tree-select/sizes.vue" title="不同尺寸"></preview>


## 自定义触发元素

自定义触发元素。

<preview path="./demos/tree-select/custom-trigger.vue" title="自定义触发元素"></preview>


## 虚拟列表

通过指定 `treeProps.virtualListProps` 来开启虚拟列表，在大量数据时获得高性能表现。

<preview path="./demos/tree-select/virtual-list.vue" title="虚拟列表"></preview>


## API


### `<tree-select>` Props

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
|field-names|指定节点数据中的字段名|`TreeFieldNames`|`-`||
|data|数据|`TreeNodeData[]`|`[]`||
|label-in-value|设置value格式。默认是string，设置为true时候，value格式为： { label: string, value: string }|`boolean`|`false`||
|tree-checkable|是否展示复选框|`boolean`|`false`||
|tree-check-strictly|父子节点是否关联|`boolean`|`false`||
|tree-checked-strategy|定制回显方式|`'all' \| 'parent' \| 'child'`|`'all'`||
|tree-props|可以接受所有 Tree 组件的Props|`Partial<TreeProps>`|`-`||
|trigger-props|可以接受所有 Trigger 组件的Props|`Partial<TriggerProps>`|`-`||
|popup-visible **(v-model)**|弹出框是否可见|`boolean`|`-`||
|default-popup-visible|默认弹出框是否可见|`boolean`|`false`||
|dropdown-style|下拉框样式|`CSSProperties`|`-`||
|dropdown-class-name|下拉框样式 class|`string \| string[]`|`-`||
|filter-tree-node|自定义节点过滤函数|`(searchKey: string, nodeData: TreeNodeData) => boolean`|`-`||
|load-more|动态加载数据|`(nodeData: TreeNodeData) => Promise<void>`|`-`||
|disable-filter|禁用内部过滤逻辑|`boolean`|`false`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`-`||
|fallback-option|为 value 中找不到匹配项的 key 定义节点数据|`boolean \| ((key: number \| string) => TreeNodeData \| boolean)`|`true`|2.22.0|
|selectable|设置可选择的节点，默认全部可选|`boolean\| 'leaf'\| ((    node: TreeNodeData,    info: { isLeaf: boolean; level: number }  ) => boolean)`|`true`|2.27.0|
|scrollbar|是否开启虚拟滚动条|`boolean \| ScrollbarProps`|`true`|2.39.0|
|show-header-on-empty|空状态时是否显示header|`boolean`|`false`||
|show-footer-on-empty|空状态时是否显示footer|`boolean`|`false`||
|input-value **(v-model)**|输入框的值|`string`|`-`|2.55.0|
|default-input-value|输入框的默认值（非受控模式）|`string`|`''`|2.55.0|
### `<tree-select>` Events

|事件名|描述|参数|版本|
|---|---|---|:---|
|change|值改变时触发|value: `string \| number \| LabelValue \| Array<string \| number> \| LabelValue[] \| undefined`||
|popup-visible-change|下拉框显示状态改变时触发|visible: `boolean`||
|search|搜索值变化时触发|searchKey: `string`||
|clear|点击清除时触发|-||
|input-value-change|输入框的值发生改变时触发|inputValue: `string`|2.55.0|
### `<tree-select>` Slots

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



