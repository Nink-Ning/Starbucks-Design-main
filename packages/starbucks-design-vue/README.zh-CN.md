<p align="center">
  <a href="https://pages.scm.starbucks.com/china/bopfui-starbucks-ui/">
    <img width="200" src="https://pages.scm.starbucks.com/china/bopfui-starbucks-ui/amazing-logo.svg">
  </a>
</p>

<h1 align="center">Starbucks UI</h1>
<p align="center">一个 Vue 3 组件库</p>
<p align="center">使用 TypeScript，都是单文件组件 (SFC)，支持 tree shaking</p>
<p align="center">有点意思</p>
<p align="center"><a href="README.md">English</a> | 中文</p>

## 文档

[Starbucks UI](https://pages.scm.starbucks.com/china/bopfui-starbucks-ui/)

## 特性

- 组件库采用 `Vue@3.5.13`+ `TypeScript@5.7.2` + `Vite@6.0.7` + `Less@4.2.1` 实现
- 目前共包含 `63` 个基础 `UI` 组件以及 `16` 个工具函数，并且持续探索更新中...
- 顺便一提，它们全都可以 `treeshaking`
- `Starbucks UI` 全量使用 `TypeScript` 编写，和你的 `TypeScript` 项目无缝衔接
- 全部组件均采用单文件组件 `SFC` 风格，可独立使用
- 开箱即用，不墨迹

## 安装

```sh
pnpm add @sbux/starbucks-ui
# or
npm install @sbux/starbucks-ui
# or
yarn add @sbux/starbucks-ui
# or
bun add @sbux/starbucks-ui
```

## 使用组件

**全局完整注册（不推荐）**

*失去 `tree-shaking` 的能力，打包后有冗余代码*

```ts
import { createApp } from 'vue'
import App from './App.vue'
import StarbucksUI from '@sbux/starbucks-ui'
import '@sbux/starbucks-ui/css'

const app = createApp(App)
app.use(StarbucksUI)
app.mount('#app')
```

**全局部分注册**

*这种情况下，只有导入的组件才会被打包*

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { Button, Tag } from '@sbux/starbucks-ui'
import '@sbux/starbucks-ui/es/button/Button.css'
import '@sbux/starbucks-ui/es/tag/Tag.css'

const app = createApp(App)
app.use(Button).use(Tag)
app.mount('#app')
```

**局部注册组件**

*这种情况下，也只有导入的组件才会被打包*

```vue
<script setup lang="ts">
import { Button, Tag } from '@sbux/starbucks-ui'
import '@sbux/starbucks-ui/es/button/Button.css'
import '@sbux/starbucks-ui/es/tag/Tag.css'
</script>
<template>
  <Button>button</Button>
  <Tag>tag</Tag>
</template>
```

**自动引入样式（推荐）**

使用 [`vite-plugin-style-import`](https://github.com/vbenjs/vite-plugin-style-import) 插件来按需自动引入组件样式，插件会自动解析模板中的使用到的组件，并导入其样式

```sh
pnpm add vite-plugin-style-import -D
# or
npm install vite-plugin-style-import -D
# or
yarn add vite-plugin-style-import -D
# or
bun add vite-plugin-style-import -D
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
// 自动引入组件样式
import { StarbucksUIStyleResolve } from '@sbux/starbucks-ui'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // imports component library styles on demand
    createStyleImportPlugin({
      resolves:[
        StarbucksUIStyleResolve()
      ]
    })
  ]
})
```

然后，你可以在代码中引入使用 `@sbux/starbucks-ui` 的所有组件，无论是全局部分注册的方式，还是局部注册的方式，都无需再额外引入组件样式

- 全局部分注册

  ```ts
  import { createApp } from 'vue'
  import App from './App.vue'
  import { Button, Tag } from '@sbux/starbucks-ui'

  const app = createApp(App)
  app.use(Button).use(Tag)
  app.mount('#app')
  ```

- 局部注册

  ```vue
  <script setup lang="ts">
  import { Button, Tag } from '@sbux/starbucks-ui'
  </script>
  <template>
    <Button>button</Button>
    <Tag>tag</Tag>
  </template>
  ```

**自动按需引入（强烈推荐）**

使用 [`unplugin-vue-components`](https://github.com/unplugin/unplugin-vue-components) 插件来按需自动加载组件，插件会自动解析模板中的使用到的组件，并导入组件和样式

```sh
pnpm add unplugin-vue-components -D
# or
npm install unplugin-vue-components -D
# or
yarn add unplugin-vue-components -D
# or
bun add unplugin-vue-components -D
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
// @sbux/starbucks-ui 按需引入
import { StarbucksUIResolver } from '@sbux/starbucks-ui'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // auto import components from StarbucksUI
        StarbucksUIResolver()
      ]
    })
  ]
})
```

然后，你可以在代码中直接使用 `@sbux/starbucks-ui` 的所有组件

```vue
<template>
  <Button>button</Button>
  <Tag>tag</Tag>
</template>
```

## 使用类型

*所有类型均可直接从 `@sbux/starbucks-ui` 中引入使用，无需任何额外安装*

```vue
<script setup lang="ts">
import type { ButtonProps } from '@sbux/starbucks-ui'
const shape = ref<ButtonProps['shape']>('default')
</script>
<template>
  <Button :shape="shape">button</Button>
</template>
```

## 使用工具函数

```vue
<script setup lang="ts">
import {
  dateFormat,
  formatNumber,
  rafTimeout,
  cancelRaf,
  throttle,
  debounce,
  add,
  downloadFile,
  toggleDark,
  useEventListener,
  useMutationObserver,
  useScroll,
  useFps,
  useMediaQuery,
  useResizeObserver,
  useSlotsExist
} from '@sbux/starbucks-ui'
</script>
```

## 项目

- 获取项目代码

```sh
git clone git@scm.starbucks.com:china/bopfui-starbucks-ui.git
```

- 安装依赖

```sh
cd bopfui-starbucks-ui

pnpm i
```

- 启动

```sh
pnpm dev
```

## 组件

名称 | 说明 | 名称 | 说明
:-- | :-- | :-- | :--
Alert | 警告提示 | Avatar | 头像

## 工具函数

名称 | 说明 | 类型
:-- | :-- | :--
dateFormat | 格式化日期时间字符串函数 | (value: number &#124; string &#124; Date = Date.now(), format: string = 'YYYY-MM-DD HH:mm:ss') => string
formatNumber | 数字格式化函数 | (value: number &#124; string, precision: number = 2, separator: string = ',', decimal: string = '.', prefix?: string, suffix?: string) => string
rafTimeout | 使用 `requestAnimationFrame` 实现的 `setTimeout` 或 `setInterval` 调用函数 | (fn: Function, delay: number = 0, interval: boolean = false) => object
cancelRaf | 用于取消 `rafTimeout` 函数 | (raf: { id: number }) => void
throttle | 节流函数 | (fn: Function, delay: number = 300) => any
debounce | 防抖函数 | (fn: Function, delay: number = 300) => any
add | 消除 `js` 加减精度问题的加法函数 | (num1: number, num2: number) => number
downloadFile | 下载文件并自定义文件名，未传 `name` 时，从文件地址中自动提取文件名称 | (url: string, fileName?: string) => void
toggleDark | 一键切换暗黑模式函数 | () => void
useEventListener | 使用 `Vue` 的生命周期钩子添加和移除事件监听器 | (target: HTMLElement &#124; Window &#124; Document, event: string, callback: Function) => void
useMutationObserver | 使用 `MutationObserver` 观察 `DOM` 元素的变化 | (target: Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[], callback: MutationCallback, options = {}) => object
useScroll | 实时监测目标元素滚动位置及状态 | (target: Ref &#124; HTMLElement &#124; Window &#124; Document = window, throttleDelay: number = 0, onScroll?: (e: Event) => void, onStop?: (e: Event) => void) => object
useFps | 实时监测浏览器刷新率FPS | () => object
useMediaQuery | 使用媒体查询来判断当前环境是否符合指定的媒体查询条件 | (mediaQuery: string) => object
useResizeObserver | 使用 `ResizeObserver` 观察 `DOM` 元素尺寸变化 | (target: Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[], callback: ResizeObserverCallback, options = {}) => object
useSlotsExist | 监听给定名称或名称数组的插槽是否存在，支持监听单个插槽或一组插槽的存在 | (slotsName: string &#124; string[] = 'default') => Reactive &#124; Ref\<boolean>
