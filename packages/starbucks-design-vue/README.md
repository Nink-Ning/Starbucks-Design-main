<p align="center">
  <a href="https://pages.scm.starbucks.com/china/bopfui-starbucks-ui/">
    <img width="200" src="https://pages.scm.starbucks.com/china/bopfui-starbucks-ui/amazing-logo.svg">
  </a>
</p>

<h1 align="center">Starbucks UI</h1>
<p align="center">A Vue 3 Component Library</p>
<p align="center">Uses TypeScript, All components are single-file components (SFC), Supports tree shaking.</p>
<p align="center">Kinda Interesting</p>
<p align="center">English | <a href="README.zh-CN.md">中文</a></p>

## Documentation

[Starbucks UI](https://pages.scm.starbucks.com/china/bopfui-starbucks-ui/)

## Features

- The component library is implemented with `Vue@3.5.13`+ `TypeScript@5.7.2` + `Vite@6.0.7` + `Less@4.2.1`.
- Currently, it includes `63` basic UI components and `16` utility functions, with continuous exploration and updates ongoing...
- What's more, they are all treeshakable.
- All the stuff in Starbucks UI is written in TypeScript. It can work with your typescript project seamlessly.
- All components are built in single file component `SFC` style and can be used independently.
- Ready to use out of the box, no fuss.

## Installation

```sh
pnpm add @sbux/starbucks-ui
# or
npm install @sbux/starbucks-ui
# or
yarn add @sbux/starbucks-ui
# or
bun add @sbux/starbucks-ui
```

## Use Components

**Global Registration All Components (Not Recommended)**

*No tree-shaking. Bundle will have redundant codes.*

```ts
import { createApp } from 'vue'
import App from './App.vue'
import StarbucksUI from '@sbux/starbucks-ui'
import '@sbux/starbucks-ui/css'

const app = createApp(App)
app.use(StarbucksUI)
app.mount('#app')
```

**Global Partial Registration**

*In this form, only components imported will be bundled.*

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

**Local Registration**

*In this form, only components imported will be bundled.*

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

**Auto Import Styles (Recommended)**

Use the [`vite-plugin-style-import`](https://github.com/vbenjs/vite-plugin-style-import) plugin to automatically import component styles on demand. The plugin will automatically parse the used components in the template and import their styles.

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
// Automatically import component styles
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

Then, you can use all components of `@sbux/starbucks-ui` in your code without needing to manually import component styles, whether you are using global partial registration or local registration.

- Global Partial Registration

  ```ts
  import { createApp } from 'vue'
  import App from './App.vue'
  import { Button, Tag } from '@sbux/starbucks-ui'

  const app = createApp(App)
  app.use(Button).use(Tag)
  app.mount('#app')
  ```

- Local Registration

  ```vue
  <script setup lang="ts">
  import { Button, Tag } from '@sbux/starbucks-ui'
  </script>
  <template>
    <Button>button</Button>
    <Tag>tag</Tag>
  </template>
  ```

**Automatic On-Demand Import (Strongly Recommended)**

Use the [`unplugin-vue-components`](https://github.com/unplugin/unplugin-vue-components) plugin to automatically import components on demand. The plugin will automatically parse the components used in the template and import the components and styles.

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
// @sbux/starbucks-ui on-demand import
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

Then, you can directly use all components from `@sbux/starbucks-ui` in your code.

```vue
<template>
  <Button>button</Button>
  <Tag>tag</Tag>
</template>
```

## Use Types

*All types can be directly imported and used from `@sbux/starbucks-ui` without any additional installation.*

```vue
<script setup lang="ts">
import type { ButtonProps } from '@sbux/starbucks-ui'
const shape = ref<ButtonProps['shape']>('default')
</script>
<template>
  <Button :shape="shape">button</Button>
</template>
```

## Use Functions

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

## Project

- Get the project code

```sh
git clone git@scm.starbucks.com:china/bopfui-starbucks-ui.git
```

- Install dependencies

```sh
cd bopfui-starbucks-ui

pnpm i
```

- Run project

```sh
pnpm dev
```

## Components

Name | Description | Name | Description
:-- | :-- | :-- | :--
Alert | 警告提示 | Avatar | 头像

## Functions

Name | Description | Type
:-- | :-- | :--
dateFormat | Format date-time string function | (value: number &#124; string &#124; Date = Date.now(), format: string = 'YYYY-MM-DD HH:mm:ss') => string
formatNumber | Number formatting function | (value: number &#124; string, precision: number = 2, separator: string = ',', decimal: string = '.', prefix?: string, suffix?: string) => string
rafTimeout | Function to implement `setTimeout` or `setInterval` using `requestAnimationFrame` | (fn: Function, delay: number = 0, interval: boolean = false) => object
cancelRaf | Function to cancel the `rafTimeout` function | (raf: { id: number }) => void
throttle | Throttle function | (fn: Function, delay: number = 300) => any
debounce | Debounce function | (fn: Function, delay: number = 300) => any
add | Addition function that eliminates precision issues in JavaScript arithmetic | (num1: number, num2: number) => number
downloadFile | Function to download a file with a custom filename; if no name is provided, it extracts the filename from the URL | (url: string, fileName?: string) => void
toggleDark | Function to toggle dark mode | () => void
useEventListener | Function to add and remove event listeners using Vue lifecycle hooks | (target: HTMLElement &#124; Window &#124; Document, event: string, callback: Function) => void
useMutationObserver | Function to observe changes in DOM elements using `MutationObserver` | (target: Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[], callback: MutationCallback, options = {}) => object
useScroll | Function to monitor the scroll position and state of a target element in real time | (target: Ref &#124; HTMLElement &#124; Window &#124; Document = window, throttleDelay: number = 0, onScroll?: (e: Event) => void, onStop?: (e: Event) => void) => object
useFps | Function to monitor the browser's refresh rate (FPS) in real time | () => object
useMediaQuery | Function to determine if the current environment matches a specified media query condition | (mediaQuery: string) => object
useResizeObserver | Function to observe changes in the dimensions of DOM elements using `ResizeObserver` | (target: Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[], callback: ResizeObserverCallback, options = {}) => object
useSlotsExist | Function to watch for the existence of slots with given names, supporting single slots or an array of slots | (slotsName: string &#124; string[] = 'default') => Reactive &#124; Ref\<boolean>
