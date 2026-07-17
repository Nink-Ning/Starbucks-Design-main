---
sidebar_position: 3
---

import { TokenPreviewProvider, TokenGroupPreview } from '@site/src/components/TokenPreview';

# 设计令牌

组件库的全局 Token，可以在此查看组件库内置的设计变量以及默认值。

<TokenPreviewProvider>

## 主色

<TokenGroupPreview group="主色" />

## 成功色

<TokenGroupPreview group="成功色" />

## 警告色

<TokenGroupPreview group="警告色" />

## 危险色

<TokenGroupPreview group="危险色" />

## 链接色

<TokenGroupPreview group="链接色" />

## 语义主色

<TokenGroupPreview group="语义主色" />

## 文本色

<TokenGroupPreview group="文本色" />

## 背景色

<TokenGroupPreview group="背景色" />

## 字体

<TokenGroupPreview group="字体" />

## 圆角

<TokenGroupPreview group="圆角" />

## 间距

<TokenGroupPreview group="间距" />

</TokenPreviewProvider>

## 更新 Token

Starbucks UI 的设计令牌来自 Figma Variables 导出文件。React 和 Vue 共用同一份生成结果，亮色模式定义在 `body`，暗色模式定义在 `[data-arco-theme="dark"]`。

将 Figma Variables 导出为 `basic.zip`、`color.zip`、`font.zip`、`radius.zip` 和 `size.zip`，然后执行：

```bash
pnpm generate:tokens -- /path/to/Figma-Variables
```

该命令会同时更新 React 和 Vue 包中的 `theme.css`。请勿分别手工修改这两个生成文件。

组件样式应优先引用语义 Token；只有在没有合适语义时，才直接使用基础色板或尺寸 Token。
