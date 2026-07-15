---
sidebar_position: 1
---

# 安装

## React

```bash
npm i @sbux/starbucks-design-react
```

```tsx title="App.tsx"


export default function App() {
  return (
    <ConfigProvider>
      <Button type="primary">你好，星巴克</Button>
    </ConfigProvider>
  );
}
```

引入即用，主题自动生效。无需额外引入 CSS 或注册组件。

## Vue

```bash
npm i @sbux/starbucks-design-vue
```

```vue title="App.vue"
<script setup>
import { Button } from '@sbux/starbucks-design-vue';
</script>

<template>
  <Button type="primary">你好，星巴克</Button>
</template>
```

## 要求

- React >= 18.0.0
- Vue >= 3.3.0
- Node >= 18.0.0
