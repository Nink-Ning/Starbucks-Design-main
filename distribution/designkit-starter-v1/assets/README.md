# 页面级资产说明

`base-page.css` 只提供 Starter V1 示例需要的页面级布局能力：容器、区块、工具栏、表单网格、响应式和表格局部溢出。

`starbucks-system-logo.svg` 是 Default Application Shell 固定使用的 Starbucks DesignKit 品牌 Logo。它属于品牌资产例外，不是 Generic UI Icon；生成输出应继续引用该 package-local asset，不得用文字、Emoji 或占位形状替代。

## 可以使用

- 页面级语义类名；
- 页面容器和区块间距；
- 页面背景和表面；
- 页面级 CSS Grid、Flex 和媒体查询；
- 表格容器的 `overflow-x: auto`。

## 不可以使用

- 宽泛 `.arco-*` 覆盖；
- 复制 Button、Input、Table、Form 等组件内部样式；
- `!important`；
- 通过页面 CSS 修改 Popup、Portal 或组件状态；
- 让生成 HTML 依赖 Starter 目录中的相对 CSS 文件。

生成最终单文件 HTML 时，AI 应将需要的页面级样式内联到 `<style>` 中，保证 HTML 可移动。
