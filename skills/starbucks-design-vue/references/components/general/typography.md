---
name: starbucks-vue-typography
description: "Starbucks UI Vue 排版 Typography 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-typography>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 排版 Typography

## 简介

排版组件用于展示标题、段落、文本内容，这里展示了排版的组合使用。

## 基本用法

```vue
<template>
  <a-typography :style="{ marginTop: '-40px' }">
    <a-typography-title>
      Design system
    </a-typography-title>
    <a-typography-paragraph>
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design.
    </a-typography-paragraph>
    <a-typography-paragraph>
      In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered <a-typography-text bold>to be a design activity.</a-typography-text>
    </a-typography-paragraph>
    <a-typography-title :heading="2">StarbucksDesign</a-typography-title>
    <a-typography-paragraph>
      The StarbucksDesign component library defines a set of default particle variables, and a custom theme is to <a-typography-text mark>customize</a-typography-text> and <a-typography-text underline>overwrite</a-typography-text> this variable list.
    </a-typography-paragraph>
    <a-typography-paragraph blockquote>
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a <a-typography-text code>prototype</a-typography-text>, <a-typography-text code>product</a-typography-text> or <a-typography-text code>process</a-typography-text>. The verb to design expresses the process of developing a design.
    </a-typography-paragraph>
    <a-typography-paragraph mark underline delete>A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process.</a-typography-paragraph>
    <a-typography-paragraph>
      <ul>
        <li>
          Architectural blueprints
          <ul>
            <li>Architectural blueprints</li>
          </ul>
        </li>
        <li>Engineering drawings</li>
        <li>Business processes</li>
      </ul>
    </a-typography-paragraph>
    <a-typography-paragraph>
      <ol>
        <li>Architectural blueprints</li>
        <li>Engineering drawings</li>
        <li>Business processes</li>
      </ol>
    </a-typography-paragraph>
  </a-typography>
</template>
```

## API

### `Common` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|type|文本类型|`'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning'`|`-`||
|bold|粗体|`boolean`|`false`||
|mark|添加标记样式|`boolean \| { color: string }`|`false`||
|underline|下划线样式|`boolean`|`false`||
|delete|删除线样式|`boolean`|`false`||
|code|代码块样式|`boolean`|`false`||
|disabled|禁用状态|`boolean`|`false`||
|editable|开启可编辑功能|`boolean`|`false`||
|editing **(v-model)**|是否在编辑状态|`boolean`|`-`||
|default-editing|默认的编辑状态|`boolean`|`false`||
|edit-text **(v-model)**|编辑的文字|`string`|`-`||
|copyable|开启复制功能|`boolean`|`false`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `Common` Events

|事件名|描述|参数|
|---|---|---|
|edit-start|开始编辑|-|
|change|编辑内容变化|text: `string`|
|edit-end|编辑结束|-|
|copy|复制|text: `string`|
|ellipsis|省略变化事件|isEllipsis: `boolean`|
|expand|展开收起事件|expanded: `boolean`|

### `Common` Slots

|插槽名|描述|参数|
|---|:---:|---|
|expand-node|自定义展开和折叠按钮|expanded: `boolean`|
|copy-icon|自定义复制按钮图标|copied: `boolean`|
|copy-tooltip|自定义复制按钮的 tooltip 内容|copied: `boolean`|

### `<typography-title>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|heading|标题级别，相当于 `h1` `h2` `h3` `h4` `h5` `h6`|`'1' \| '2' \| '3' \| '4' \| '5' \| '6'`|`1`|

### `<typography-paragraph>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|blockquote|长引用|`boolean`|`false`|
|spacing|段落的的行高，长文本(大于5行)的时候推荐使用默认行高，短文本(小于等于3行)推荐使用 `close` 紧密的行高。|`'default' \| 'close'`|`'default'`|

### EllipsisConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|rows|显示省略的行数|`number`|`1`||
|expandable|是否支持展开/折叠|`boolean`|`false`||
|ellipsisStr|省略号|`string`|`'...'`||
|suffix|后缀|`string`|`-`||
|showTooltip|配置省略时的弹出框|`boolean    \| { type: 'tooltip' \| 'popover'; props: Record<string, any> }`|`false`||
|css|是否使用 CSS 省略（此模式暂不支持展开、自定义省略号和后缀）|`boolean`|`false`|2.37.0|

## 常用模式

- **组合使用**：排版组件用于展示标题、段落、文本内容，这里展示了排版的组合使用。
- **标题**：展示不同级别的标题。
- **文本**：不同样式的文本以及超链接组件。
- **段落**：文本段落样式。
- **可交互**：提供复制、编辑文本等功能。
- **省略**：在空间不足时省略多行文本内容。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 基础组件保持语义清晰，主操作、次操作和危险操作要用不同 `type` 或 `status` 区分。
- 图标、按钮、链接等交互元素要同时考虑禁用、加载和可访问文本。
