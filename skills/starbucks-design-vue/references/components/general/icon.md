---
name: starbucks-vue-icon
description: "Starbucks UI Vue Icon 图标参考。用于 `@arco-design/web-vue/es/icon`、`StarbucksVueIcon`、`<icon-xx>`、图标按需导入、图标属性、旋转图标和 iconfont.cn 集成。"
user-invocable: false
---

# Icon 图标

## 简介

Icon 图标参考。用于 `@arco-design/web-vue/es/icon`、`StarbucksVueIcon`、`<icon-xx>`、图标按需导入、图标属性、旋转图标和 iconfont.cn 集成。

## 基本用法

```ts
import { createApp } from 'vue';
import StarbucksVue from '@sbux/starbucks-design-vue';
import StarbucksVueIcon from '@arco-design/web-vue/es/icon';
import '@sbux/starbucks-design-vue/dist/starbucks.css';
import App from './App.vue';

const app = createApp(App);
app.use(StarbucksVue);
app.use(StarbucksVueIcon);
app.mount('#app');
```

## API

当前组件没有单独整理的 API 表。使用时优先参考组件属性、事件和插槽约定。

## 常用模式

- **基础使用**：直接使用全局 `a-` 前缀组件，按需绑定属性、事件和插槽。
- **受控状态**：涉及值或显隐时优先使用 `v-model` 或命名 `v-model:*`。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 基础组件保持语义清晰，主操作、次操作和危险操作要用不同 `type` 或 `status` 区分。
- 图标、按钮、链接等交互元素要同时考虑禁用、加载和可访问文本。
