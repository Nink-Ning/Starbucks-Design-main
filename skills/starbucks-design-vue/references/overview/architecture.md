---
name: starbucks-vue-architecture
description: "Starbucks UI Vue 架构和编码约定。用于 Vue 3 SFC 结构、Composition API、全局/局部注册、导入、属性、事件、插槽和 v-model。"
user-invocable: false
---

# 架构约定

把需求转换为使用 Starbucks UI Vue 的 Vue 3 代码时使用本参考。

## 推荐 SFC 结构

```vue
<script setup lang="ts">
import { reactive } from 'vue';
import { Message } from '@sbux/starbucks-design-vue';

const form = reactive({
  name: '',
});

const handleSubmit = () => {
  Message.success(`提交：${form.name}`);
};
</script>

<template>
  <a-form :model="form" layout="vertical" @submit-success="handleSubmit">
    <a-form-item field="name" label="名称" required>
      <a-input v-model="form.name" placeholder="请输入名称" />
    </a-form-item>
    <a-button type="primary" html-type="submit">提交</a-button>
  </a-form>
</template>
```

## 组件注册

完整注册：

```ts
app.use(StarbucksVue);
```

局部导入：

```ts
import { Button, Space } from '@sbux/starbucks-design-vue';
```

示例和小型应用可以使用完整注册。生产项目应跟随仓库已有的导入策略。

## 属性、事件、插槽

- 模板属性使用 kebab-case：`show-jumper`、`row-selection`、`popup-container`。
- 动态属性使用 `:`：`:columns="columns"`、`:data="rows"`。
- 事件使用 `@`：`@change`、`@page-change`、`@ok`、`@cancel`。
- 插槽使用 `#`：`#title`、`#extra`、`#cell="{ record, column }"`。

## v-model

组件主值使用普通 `v-model`。

```vue
<a-input v-model="keyword" />
<a-select v-model="status" :options="options" />
```

组件文档声明命名绑定时，使用命名 `v-model`。

```vue
<a-modal v-model:visible="visible" title="编辑">
  ...
</a-modal>
```

## 避免 React 模式

不要使用：

- `Form.useForm()`
- JSX 子节点访问方式
- `Component.Sub` 子组件语法
- 直接复制 React 的 `value` / `onChange` 示例

应使用本 skill 中的 Vue 参考。
