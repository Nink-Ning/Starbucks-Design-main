---
name: starbucks-vue-config-provider-overview
description: "Starbucks UI Vue ConfigProvider 和全局配置指南。用于 `<a-config-provider>`、语言、组件前缀、尺寸、弹出容器、层级、滚动更新和应用级配置。"
user-invocable: false
---

# ConfigProvider 与全局配置

插件级全局设置使用 `app.use(StarbucksVue, options)`；渲染树范围内的配置使用 `<a-config-provider>`。

## 插件配置

```ts
import { createApp } from 'vue';
import StarbucksVue from '@sbux/starbucks-design-vue';
import '@sbux/starbucks-design-vue/dist/starbucks.css';

const app = createApp(App);
app.use(StarbucksVue, {
  componentPrefix: 'a',
});
```

默认组件前缀是 `a`，对应 `<a-button>`、`<a-table>` 等标签。

## 语言配置

```vue
<template>
  <a-config-provider :locale="enUS">
    <a-pagination :total="50" show-total show-jumper show-page-size />
  </a-config-provider>
</template>

<script setup lang="ts">
import enUS from '@sbux/starbucks-design-vue/es/locale/lang/en-us';
</script>
```

## 使用建议

- 如果配置影响整个应用，把 `<a-config-provider>` 放在应用根部附近。
- 如果只有某个页面或模块需要特殊语言或配置，只包裹对应子树。
- 弹出层容器优先查看具体组件的 popup container 相关属性，不要先写全局绕过逻辑。
- 全局组件前缀保持一致，避免在同一项目中混用 `<a-*>` 和自定义前缀。
