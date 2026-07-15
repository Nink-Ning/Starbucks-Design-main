---
sidebar_position: 2
---

# 主题定制

Starbucks UI 使用 CSS 变量（Arco Design 原生方案）实现主题。组件库已内置星巴克品牌主题，你无需任何配置。

## 覆盖变量

如需微调，在你的项目中覆盖 CSS 变量即可：

```css title="src/theme.css"
:root {
  --color-primary-6: 0, 117, 74;    /* 主色 */
  --color-success-6: 0, 180, 42;    /* 成功色 */
  --color-warning-6: 255, 125, 0;   /* 警告色 */
  --border-radius-medium: 4px;      /* 默认圆角 */
}
```

> **注意**：Arco 颜色值使用 RGB 格式（逗号分隔），不能使用 hex。

## 暗色模式

在 `body` 上添加 `arco-theme="dark"` 属性即可切换暗色模式。

```html
<body arco-theme="dark">
  <div id="root"></div>
</body>
```
