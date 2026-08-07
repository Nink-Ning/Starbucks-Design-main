# Starter V1 质量检查清单

## 生成前

- [ ] 页面属于基础列表、基础表单或基础详情之一。
- [ ] 已读取对应模板和 `component-catalog.md`。
- [ ] 所有组件属性和事件均来自已查证 API。
- [ ] 已确认使用本地 Mock 数据。
- [ ] 已确认不需要真实接口、权限、上传、导出或工程项目。

## HTML 静态检查

- [ ] 包含 `<!DOCTYPE html>`。
- [ ] 包含 `lang="zh-CN"`、charset、viewport 和 title。
- [ ] CDN 版本均为固定版本。
- [ ] CDN 顺序正确。
- [ ] 不包含 `import`、`export`、TypeScript、npm 或构建入口。
- [ ] 组件来自 `StarbucksReact`，图标来自 `window.arcoicon`。
- [ ] JSX 位于 `script[type="text/babel"]`。
- [ ] 输出只依赖 HTML、CSS、少量 JavaScript 和固定 CDN。
- [ ] 页面 CSS 没有宽泛 `.arco-*` 或 `!important`。
- [ ] 没有 React / Vue 源码、绝对路径、密钥或真实数据。

## 页面检查

- [ ] 页面主任务和主操作清晰。
- [ ] 页面标题、内容和辅助信息层级明确。
- [ ] Normal 状态可理解。
- [ ] Loading 状态不会重复提交或破坏页面结构。
- [ ] Empty 状态说明下一步。
- [ ] Error 状态提供恢复或重试方向。
- [ ] 窄屏下页面头部、表单和操作区仍可用。
- [ ] 宽表格只在表格区域内滚动。
- [ ] 三个 Golden Example 的页面背景、最大宽度、标题 Tooltip、标题区操作和页面字体继承保持同一 Starter Shell 方向。
- [ ] 页面 Header 与正式内容区间距为 10px，标题与右侧核心操作在桌面端垂直对齐。
- [ ] Mock 操作明确写成本地 Demo，不声称真实服务端成功。
- [ ] List 未出现 FilterBar、批量操作、导出或列设置。
- [ ] Form 未出现 Upload、动态字段、Modal、Drawer 或 Step Form。
- [ ] Detail 只使用 shared model 的 12 个字段、单 DetailSection 和 `emptyValue="—"`，未出现 Export、Card、Timeline、Table、Tabs 或 Pagination。

## 浏览器检查

- [ ] 使用当前 Chrome 或 Edge 打开。
- [ ] CDN 加载成功。
- [ ] 页面无相关控制台错误；Babel Standalone 的开发提示如出现应单独记录，不得与页面错误混淆。
- [ ] 本地 Runtime JS/CSS 文件存在，Manifest 中 JS/CSS hash 与实际文件一致。
- [ ] 不存在旧 Starbucks CDN，三页使用同一 Runtime 文件和版本。
- [ ] 主要按钮、输入、表单提交或详情操作可用。
- [ ] 关键状态可以切换或演示。
- [ ] 预览结果与 React 视觉基准一致。
- [ ] 页面自身 `body` 无异常横向溢出；宽表格只在组件容器内滚动。
- [ ] 失败状态提供恢复方向；Loading 不重复提交；Empty 文案与业务查询结果区分。
- [ ] 已运行 `git diff --check`。

未实际完成浏览器检查时，必须在交付说明中写明：`UNVERIFIED`。

## Golden Example 当前状态

```text
examples/list.html：BROWSER_CONFIRMED
examples/form.html：BROWSER_CONFIRMED
examples/detail.html：BROWSER_CONFIRMED
浏览器 Smoke Check：BROWSER_CONFIRMED（使用本地 HTTP 服务）
```
