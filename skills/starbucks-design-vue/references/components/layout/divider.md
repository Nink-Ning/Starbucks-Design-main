---
name: starbucks-vue-divider
description: "Starbucks UI Vue 分割线 Divider 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-divider>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 分割线 Divider

## 简介

对不同章节的文本段落进行分割，默认为水平分割线，可在中间加入文字。

## 基本用法

```vue
<template>
  <div class="divider-demo">
    <p>A design is a plan or specification for the construction of an object.</p>
    <a-divider />
    <p>A design is a plan or specification for the construction of an object.</p>
    <a-divider dashed />
    <p>A design is a plan or specification for the construction of an object.</p>
    <a-divider :size="2" style="border-bottom-style: dotted" />
    <p>A design is a plan or specification for the construction of an object.</p>
  </div>
  <div class="divider-demo" style="marginTop: 48px">
    <div class="flex-box">
      <span class="avatar"><IconImage /></span>
      <div class="content">
        <a-typography-title :heading="6">Image</a-typography-title>
        May 4, 2010
      </div>
    </div>
    <a-divider class="half-divider" />
    <div class="flex-box">
      <span class="avatar"><IconUser /></span>
      <div class="content">
        <a-typography-title :heading="6">Avatar</a-typography-title>
        May 4, 2010
      </div>
    </div>
    <a-divider class="half-divider" />
    <div class="flex-box">
      <span class="avatar"><IconPen /></span>
      <div class="content">
        <a-typography-title :heading="6">Icon</a-typography-title>
        May 4, 2010
      </div>
    </div>
  </div>
</template>

<script>
import {
  IconImage,
  IconUser,
  IconPen,
} from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconImage,
    IconUser,
    IconPen,
  },
};
</script>

<style scoped>
.divider-demo {
  box-sizing: border-box;
  width: 560px;
  padding: 24px;
  border: 30px solid rgb(var(--gray-2));
}
.half-divider {
  left: 55px;
  width: calc(100% - 55px);
  min-width: auto;
  margin: 16px 0;
}
.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-box .avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  color: var(--color-text-2);
  font-size: 16px;
  background-color: var(--color-fill-3);
  border-radius: 50%;
}
.flex-box .content {
  flex: 1;
  color: var(--color-text-2);
  font-size: 12px;
  line-height: 20px;
}
</style>
```

## API

### `<divider>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|direction|分割线的方向，是水平还是竖直|`'horizontal' \| 'vertical'`|`'horizontal'`||
|orientation|分割线文字的位置|`'left' \| 'center' \| 'right'`|`'center'`||
|type|分割线样式类型|`'solid' \| 'dashed' \| 'dotted' \| 'double'`|`-`|2.35.0|
|size|分割线宽度/高度|`number`|`-`|2.35.0|
|margin|分割线上下 margin (垂直方向时为左右 margin)|`number \| string`|`-`|2.35.0|

## 常用模式

- **带有文字的分割线**：通过 `orientation` 为分割线添加描述文字。
- **竖直分割线**：指定 `direction` 为 `vertical` 即可使用竖直分割线。竖直分割线不能带文字。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 布局组件只处理结构和间距，不在其中承载业务状态。
- 响应式页面优先组合 `a-grid`、`a-row`、`a-col` 和 `a-space`。
