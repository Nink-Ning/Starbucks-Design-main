# 单文件 HTML 模板契约

## 文件结构

每个生成结果必须是完整单文件 HTML；在 Starter 内预览时保留 `output/`、`examples/` 与 `runtime/` 的相对目录关系：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题</title>
  <style>
    /* 页面级布局 CSS */
  </style>
</head>
<body>
  <div id="root"></div>
  <!-- 固定顺序的 CDN -->
  <script type="text/babel">
    /* 页面级 React 逻辑和本地 Mock */
  </script>
</body>
</html>
```

## 运行约束

- 使用 `ReactDOM.createRoot(document.getElementById('root')).render(<App />)`。
- 使用 `StarbucksReact` 中的组件和 `window.arcoicon` 中的图标。
- JSX 必须位于 `script[type="text/babel"]`。
- 允许少量 `useState`、`useMemo`、`useEffect` 和事件处理逻辑。
- 不使用路由、状态管理库、接口请求库或构建工具。
- 不使用本地图片、字体或其他相对路径依赖；唯一允许的相对路径依赖是 Starter Runtime 的 `../runtime/starbucks-react.css` 和 `../runtime/starbucks-react.umd.js`。
- 不承诺将 HTML 单独复制到 Starter 外部后仍然可运行。

## 输出约束

- 默认写入 `output/<descriptive-name>.html`。
- HTML 内必须包含本地 Mock 数据。
- 不得包含 `import`、`export`、TypeScript、JSX 工程入口或 npm 命令。
- 不得引用 React / Vue 源码、内部 Docs 路径或仓库绝对路径。
- 不得生成 `package.json`、锁文件或构建配置。

## 页面级 CSS

允许维护：

- 页面背景和容器；
- 页面头部、区块和工具栏布局；
- 页面级网格和间距；
- 表格容器的横向滚动；
- 页面响应式断点；
- 页面专用的语义类名。

禁止维护：

- 宽泛的 `.arco-*` 覆盖；
- 组件内部状态的重写；
- `!important`；
- 用 CSS 复制 Button、Input、Table 或 Form 的内部样式。

## 验证状态

只有实际使用浏览器打开 HTML、操作主要交互并检查控制台后，才可以标记为已验证。否则必须标记：

```text
UNVERIFIED
```
