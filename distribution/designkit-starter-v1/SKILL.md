---
name: designkit-starter-v1
description: "为产品经理生成 Starbucks Design 零工程环境 Demo。用户提出列表页、表单页或详情页需求，或要求生成可直接在浏览器打开的 HTML Demo 时使用。输出单文件 HTML，允许固定版本的 React UMD/CDN、Babel 和少量 JavaScript；不生成 React/Vue 工程，不使用 Node.js、npm、import、export 或 TypeScript。"
---

# DesignKit Starter V1

## 任务目标

生成符合 Starbucks Design React 视觉基准的单文件 HTML Demo，用于产品方案验证、评审和沟通。

将 HTML 作为最终交付物。允许在 HTML 内使用固定版本的 React UMD/CDN、Babel 和少量内联 JavaScript；不要把任务扩展为 React / Vue 工程开发。

## 支持范围

只支持以下页面类型：

- 基础列表页
- 基础表单页
- 基础详情页

不支持 Vue Preview、Dashboard、登录页、结果页、高级 FilterBar、跨页选择、复杂批量操作、真实接口、权限系统、上传、导出或工程项目。

## 执行流程

1. 识别页面类型，只从列表、表单、详情中选择一个。
2. 读取 `references/design-rules.md` 和 `references/template-contract.md`。
3. 读取 `references/component-catalog.md`，只使用其中已查证的组件 API。
4. 读取 `references/cdn-runtime.md`，严格使用固定 CDN 地址和加载顺序。
5. 读取对应的 `templates/list.md`、`templates/form.md` 或 `templates/detail.md`。
6. 读取对应的 `examples/list.html`、`examples/form.html` 或 `examples/detail.html`，将其作为结构和组合参考，不复制组件源码。
7. 使用本地 Mock 数据完成正常态和要求的主要状态。
8. 生成完整的 `<!DOCTYPE html>` 文件，并写入 `output/`。
9. 按 `references/quality-checklist.md` 自检。
10. 报告已完成、未完成和未验证的内容。

## HTML 硬性约束

- 使用 `lang="zh-CN"`、viewport 和页面标题。
- 按 `references/cdn-runtime.md` 的顺序加载 React、ReactDOM、Arco、Arco Icon、Starbucks React UMD 和 Babel。
- 从 `StarbucksReact` 获取组件，从 `window.arcoicon` 获取图标。
- JSX 放在 `<script type="text/babel">` 中。
- 使用 React Hooks 时从全局 `React` 获取。
- 不使用 `import`、`export`、TypeScript、npm、Vite、Webpack 或构建入口。
- 不引用本地 React / Vue 组件源码。
- 不调用真实后端，不写入真实业务数据，不加入密钥或内部接口地址。
- 页面 CSS 必须是页面级布局样式，不复制组件内部样式。
- 不使用宽泛 `.arco-*` 覆盖，不使用 `!important`。

## API 和状态约束

- 任何组件属性、事件、回调或子组件用法都必须来自 `references/component-catalog.md` 或其标注的内部 React reference。
- 不确定 API 时停止猜测，先说明需要查证。
- 列表页至少考虑 Normal、Loading、Empty、Error。
- 表单页至少考虑校验失败、提交 Loading、提交成功和重置。
- 详情页至少考虑 Normal、Loading、Empty 或 Error。
- Loading 时避免重复提交。
- 宽表格只允许在表格容器内横向滚动，页面自身不得产生无意义横向滚动。

## 文件输出

默认输出：

```text
output/<descriptive-name>.html
```

保持 HTML 为单文件输出，但保留 Starter Runtime 的相对路径约束。预览时使用本地 HTTP 服务；Starter 不提供自动启动脚本，也不要求用户安装 Node.js、npm 或构建工具。

如果尚未使用浏览器打开并检查控制台，不得声称已验证。请明确标记为 `UNVERIFIED`。

## 参考文件路由

- 页面结构和视觉：`references/design-rules.md`
- 组件 API：`references/component-catalog.md`
- HTML 契约：`references/template-contract.md`
- CDN 和浏览器：`references/cdn-runtime.md`
- 验收：`references/quality-checklist.md`
- 列表：`templates/list.md`
- 表单：`templates/form.md`
- 详情：`templates/detail.md`

本 Skill 不复制完整组件库、完整组件 API、Vue 规则或内部工程发布流程。
