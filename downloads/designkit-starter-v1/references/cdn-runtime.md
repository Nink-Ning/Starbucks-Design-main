# React UMD/CDN 与 Starter 本地 Runtime 运行方式

## 固定版本

Starter V1 使用以下固定版本。不要使用未锁定的 `@18`、`@7` 或 `latest`：

| 顺序 | 资源 | 固定地址 |
| --- | --- | --- |
| 1 | React | `https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js` |
| 2 | ReactDOM | `https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js` |
| 3 | Arco React | `https://cdn.jsdelivr.net/npm/@arco-design/web-react@2.66.15/dist/arco.min.js` |
| 4 | Arco Icon | `https://cdn.jsdelivr.net/npm/@arco-design/web-react@2.66.15/dist/arco-icon.min.js` |
| 5 | Starbucks React CSS | `../runtime/starbucks-react.css` |
| 6 | Starbucks React UMD | `../runtime/starbucks-react.umd.js` |
| 7 | Babel Standalone | `https://cdn.jsdelivr.net/npm/@babel/standalone@7.29.8/babel.min.js` |

React、ReactDOM、Arco React、Arco Icon 和 Babel 继续使用固定 CDN。Starbucks React JS/CSS 来自当前 React 工作区同一次 Starter Runtime 构建，并通过相对路径加载。Runtime 只保证在 Starter 目录结构内工作，不承诺 HTML 脱离 Starter 目录单独传播。

## 加载顺序

```text
React + ReactDOM
→ Arco React
→ Arco Icon
→ Starter 本地 Starbucks React CSS
→ Starter 本地 Starbucks React UMD
→ Babel Standalone
→ 页面 JSX
```

不要调整顺序。Starbucks React UMD 依赖 React 和 Arco，页面 JSX 依赖 Babel。

## 全局对象

```jsx
const { useState, useEffect, useMemo } = React;
const { Button, Table, Form } = StarbucksReact;
const { IconSearch, IconPlus } = window.arcoicon;
```

不要从 `arco` 获取最终组件；图标只从 `window.arcoicon` 解构，不从 `StarbucksReact` 获取图标。

## 浏览器和网络

- 内部试用基线为当前 Chrome 或 Edge。
- 首次打开需要网络访问 `cdn.jsdelivr.net`；Starbucks React JS/CSS 使用 Starter 目录中的本地 Runtime。
- 建议使用浏览器开发者工具检查加载失败和控制台错误。
- 不假设 `file://` 环境可以访问公司代理、内网 CDN 或需要登录的资源。
- 如果公司网络无法访问 CDN，应报告为运行环境阻塞，不要改成未验证的版本。

## 常见错误

| 现象 | 优先检查 |
| --- | --- |
| `StarbucksReact is not defined` | 本地 UMD 是否存在、是否早于页面 JSX |
| `React is not defined` | React CDN 是否加载、ReactDOM 是否晚于 React |
| 图标组件为 `undefined` | 是否从 `window.arcoicon` 解构 |
| JSX 语法错误 | 是否使用 `script[type="text/babel"]`，是否写入 `import` 或 `export` |
| 组件样式异常 | 本地 CSS 是否加载、是否与 Runtime Manifest 中的 UMD 同次构建 |
| 页面空白 | 查看控制台首个错误，不要先添加宽泛 CSS 覆盖 |
