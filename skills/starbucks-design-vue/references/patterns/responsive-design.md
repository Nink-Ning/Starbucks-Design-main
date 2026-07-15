---
name: starbucks-vue-responsive-design
description: "Starbucks UI Vue 响应式布局模式。用于响应式 Grid、页面布局、表单、仪表盘和移动端友好的组件组合。"
user-invocable: false
---

# 响应式布局

优先使用 Starbucks Vue 的 Grid 和 Layout 组件表达响应式页面结构。

## 响应式栅格

```vue
<template>
  <a-row :gutter="[16, 16]">
    <a-col :xs="24" :sm="12" :lg="8">
      <a-card title="指标 A">...</a-card>
    </a-col>
    <a-col :xs="24" :sm="12" :lg="8">
      <a-card title="指标 B">...</a-card>
    </a-col>
    <a-col :xs="24" :sm="24" :lg="8">
      <a-card title="指标 C">...</a-card>
    </a-col>
  </a-row>
</template>
```

## 使用要点

- Grid 能表达的布局优先使用 `xs`、`sm`、`md`、`lg`、`xl`、`xxl` 属性，不必额外编写媒体查询。
- 窄屏表单优先使用纵向布局，降低标签和输入框互相挤压的概率。
- 小屏表格需要保留可用性，可使用横向滚动、隐藏次要列，或改成卡片和列表展示。
- 仪表盘、表格和重复卡片应设置稳定尺寸，避免加载态和数据变化造成布局跳动。
