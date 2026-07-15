---
name: starbucks-vue-cascader
description: "Starbucks UI Vue 级联选择 Cascader 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-cascader>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 级联选择 Cascader

## 简介

级联选择器的基本用法。

## 基本用法

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-cascader :options="options" :style="{width:'320px'}" placeholder="Please select ..." />
    <a-cascader :options="options" default-value="datunli" expand-trigger="hover" :style="{width:'320px'}" placeholder="Please select ..." />
  </a-space>
</template>

<script>
export default {
  setup() {
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'chaoyang',
            label: 'ChaoYang',
            children: [
              {
                value: 'datunli',
                label: 'Datunli',
              },
            ],
          },
          {
            value: 'haidian',
            label: 'Haidian',
          },
          {
            value: 'dongcheng',
            label: 'Dongcheng',
          },
          {
            value: 'xicheng',
            label: 'Xicheng',
            children: [
              {
                value: 'jinrongjie',
                label: 'Jinrongjie',
              },
              {
                value: 'tianqiao',
                label: 'Tianqiao',
              },
            ],
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'huangpu',
            label: 'Huangpu',
          },
        ],
      },
    ];
    return {
      options
    }
  },
}
</script>
```

## API

### `<cascader>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|path-mode|绑定值是否为路径|`boolean`|`false`||
|multiple|是否为多选状态（多选模式默认开启搜索）|`boolean`|`false`||
|model-value **(v-model)**|绑定值|`string\| number\| Record<string, any>\| (    \| string    \| number    \| Record<string, any>    \| (string \| number \| Record<string, any>)[]  )[]\| undefined`|`-`||
|default-value|默认值（非受控状态）|`string\| number\| Record<string, any>\| (    \| string    \| number    \| Record<string, any>    \| (string \| number \| Record<string, any>)[]  )[]\| undefined`|`'' \| undefined \| []`||
|options|级联选择器的选项|`CascaderOption[]`|`[]`||
|disabled|是否禁用|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|size|选择框的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|allow-search|是否允许搜索|`boolean`|`false (single) \| true (multiple)`||
|allow-clear|是否允许清除|`boolean`|`false`||
|input-value **(v-model)**|输入框的值|`string`|`-`||
|default-input-value|输入框的默认值（非受控状态）|`string`|`''`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<cascader>` 事件

|事件名|描述|参数|
|---|---|---|
|change|选中值改变时触发|value: `string \| number \| (string \| number \| (string \| number)[])[] \| undefined`|
|input-value-change|输入值改变时触发|value: `string`|
|clear|点击清除按钮时触发|-|
|search|用户搜索时触发|value: `string`|
|popup-visible-change|下拉框的显示状态改变时触发|visible: `boolean`|
|focus|获得焦点时触发|ev: `FocusEvent`|
|blur|失去焦点时触发|ev: `FocusEvent`|

### `<cascader>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|label|选择框的显示内容|data: `CascaderOption`|2.18.0|
|prefix|前缀元素|-|2.23.0|
|arrow-icon|选择框的箭头图标|-|2.16.0|
|loading-icon|选择框的加载中图标|-|2.16.0|
|search-icon|选择框的搜索图标|-|2.16.0|
|empty|选项为空时的显示内容|-|2.23.0|
|option|选项内容|data: `CascaderOption`|2.18.0|

### `<cascader-panel>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|path-mode|绑定值是否为路径|`boolean`|`false`||
|multiple|是否为多选状态（多选模式默认开启搜索）|`boolean`|`false`||
|model-value **(v-model)**|绑定值|`string\| number\| Record<string, any>\| (    \| string    \| number    \| Record<string, any>    \| (string \| number \| Record<string, any>)[]  )[]\| undefined`|`-`||
|default-value|默认值（非受控状态）|`string\| number\| Record<string, any>\| (    \| string    \| number    \| Record<string, any>    \| (string \| number \| Record<string, any>)[]  )[]\| undefined`|`'' \| undefined \| []`||
|options|级联选择器的选项|`CascaderOption[]`|`[]`||
|expand-trigger|展开下一级的触发方式|`string`|`'click'`||
|check-strictly|是否开启严格选择模式|`boolean`|`false`||
|load-more|数据懒加载函数，传入时开启懒加载功能|`(  option: CascaderOption,  done: (children?: CascaderOption[]) => void) => void`|`-`|2.13.0|
|field-names|自定义 `CascaderOption` 中的字段|`CascaderFieldNames`|`-`|2.22.0|
|value-key|用于确定选项键值的属性名|`string`|`'value'`|2.29.0|
|expand-child|是否展开子菜单|`boolean`|`false`|2.29.0|

### `<cascader-panel>` 事件

|事件名|描述|参数|
|---|---|---|
|change|选中值改变时触发|value: `string \| number \| (string \| number \| (string \| number)[])[] \| undefined`|

### `<cascader-panel>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|empty|选项为空时的显示内容|-|2.23.0|

### CascaderOption

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|value|选项值，2.29.0 版本支持对象|`string \| number \| Record<string, any>`|`-`||
|label|选项文本|`string`|`-`||
|render|自定义渲染|`RenderFunction`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|tagProps|展示的标签属性|`TagProps`|`-`|2.8.0|
|children|下一级选项|`CascaderOption[]`|`-`||
|isLeaf|是否是叶子节点|`boolean`|`false`||

## 常用模式

- **基本使用**：级联选择器的基本用法。
- **允许清除**：允许清除。
- **禁用选项**：指定 `option` 的 `disabled` 为 `true`，可以禁用该选项。
- **自定义输入框的展示值**：利用 `formatLabel` 对显示的内容进行自定义处理。
- **多选模式**：通过设置 `multiple` 开启多选模式。
- **严格选择模式**：设置属性 `check-strictly`，开启严格选择模式，点击任何结点都可以选择。多选时将会解除父子节点的关联。
- **加载中**：选择框和下拉菜单显示加载中状态。
- **子选项懒加载**：通过 `load-more` 属性可以开启数据懒加载功能。开启数据懒加载功能后，需要在叶子节点标注 `isLeaf: true`，没有标注且没有 `children` 属性的节点会认为需要懒加载处理。`load-more` 属性有提供 `done` 函数进行回调，可以在回调中传入懒加载的子数据。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
