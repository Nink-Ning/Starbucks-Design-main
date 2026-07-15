---
name: starbucks-vue-badge
description: "Starbucks UI Vue 徽标数 Badge 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-badge>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 徽标数 Badge

## 简介

基本用法。只需指定 `count`或者 `content slot`，即可显示徽标。

## 基本用法

```vue
<template>
  <a-space :size="40">
    <a-badge :count="9">
      <a-avatar shape="square" />
    </a-badge>
    <a-badge :count="9" dot :dotStyle="{ width: '10px', height: '10px' }">
      <a-avatar shape="square" />
    </a-badge>
    <a-badge :dotStyle="{ height: '16px', width: '16px', fontSize: '14px' }">
      <template #content>
        <IconClockCircle
          :style="{ verticalAlign: 'middle', color: 'var(--color-text-2)' }"
        />
      </template>
      <a-avatar shape="square" />
    </a-badge>
  </a-space>
</template>

<script>
import { IconClockCircle } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconClockCircle },
};
</script>
```

## API

### `<badge>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|text|自定义提示内容|`string`|`-`|
|dot|显示为小红点|`boolean`|`false`|
|dot-style|徽标的样式|`object`|`-`|
|max-count|徽标最大显示数值，如果count超过这个数值会显示为maxCount|`number`|`99`|
|offset|设置徽标位置的偏移|`number[]`|`[]`|
|color|内置的一些颜色|`ColorType \| string`|`-`|
|status|徽标的状态类型|`'normal' \| 'processing' \| 'success' \| 'warning' \| 'danger'`|`-`|
|count|徽标显示的数字|`number`|`-`|

## 常用模式

- **独立使用**：`default slot` 为空时，将会独立展示徽标。
- **小红点**：设置 `dot`，即可只显示小红点而不显示数字。`count > 0` 时才显示。
- **文本内容**：设置 `text`，可设置自定义提示内容。
- **最大值**：设置 `max-count`，可以限制最大显示的徽标数值，超过将会加 `+` 后缀。`max-count` 默认为 `99`。
- **状态点**：设置 `status`，可以得到不同的状态点。`normal - 正常` `processing - 进行中` `success - 成功` `warning - 提醒` `danger - 危险`。
- **颜色**：我们提供多种预设色彩的徽标样式。如果预设值不能满足你的需求，`color` 字段也可以设置自定义色值。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
