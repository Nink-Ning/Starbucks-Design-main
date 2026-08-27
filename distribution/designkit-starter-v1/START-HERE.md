# START HERE — Starter V1-r2 Preview Candidate

## 目标

用 AI 在约 10 分钟内生成一个可浏览器直接打开的 Starbucks Design HTML Demo。

## 第一步：准备

不需要安装 Node.js、npm、Vite 或其他前端工程环境。准备一个可以读取本地文件或上传文本文件的 AI 工具，以及 Chrome 或 Edge 浏览器。

## 第二步：把 Starter 交给 AI

优先让 AI 读取以下文件：

```text
SKILL.md
references/design-rules.md
references/component-catalog.md
references/template-contract.md
references/cdn-runtime.md
references/template-usage-contract.md
references/implementation-binding-contract.md
templates/<对应页面类型>.md
```

如果 AI 只能读取单个文件，先提供 `SKILL.md`，再按 AI 要求补充对应 reference 和模板。

## 第三步：输入需求

复制 `prompts/new-demo.md`，补充以下信息：

- 页面名称
- 使用角色
- 核心任务
- 页面类型：基础列表、卡片列表、表单或详情
- 需要展示的字段
- 主要操作
- 需要的状态
- 是否有参考页面或设计稿

第一次建议从基础列表页开始。

## 第四步：要求 AI 输出

要求 AI：

```text
请将完整单文件 HTML 写入 output/demo.html。
不要输出 React/Vue 工程项目，不要使用 import、export、TypeScript、npm 或构建工具。
生成后按照 references/quality-checklist.md 自检，并说明尚未完成的浏览器验证。
```

## 第五步：本地 HTTP 预览

Starter 当前不提供自动启动服务。请在 Starter 根目录运行一个本地静态 HTTP 服务，例如：

```bash
python3 -m http.server 8000
```

然后在 Chrome / Edge 打开：

```text
http://127.0.0.1:8000/output/demo.html
```

也可以预览已提供的 Golden Example：

```text
http://127.0.0.1:8000/examples/list.html
http://127.0.0.1:8000/examples/multi-select-card-list.html
http://127.0.0.1:8000/examples/form.html
http://127.0.0.1:8000/examples/detail.html
```

如果页面没有加载：

1. 检查网络是否可以访问 `cdn.jsdelivr.net` 和 Starbucks UMD CDN。
2. 打开浏览器开发者工具查看控制台。
3. 将错误信息和当前 HTML 一起交给 AI。
4. 使用 `prompts/refine-demo.md` 继续修改。

如果当前环境没有 Python，请让 AI 使用环境中已有的本地静态 HTTP 服务；不要因此改回旧 CDN、复制 Runtime CSS，或把 HTML 改成工程项目。

## 试用边界

Starter V1-r2 适合产品方案验证、评审和沟通，不适合作为生产代码、真实接口实现或正式组件库源码。R2 的 Visual Fidelity 仍需要真实截图和人工审查，不能由静态检查自动推导；新生成的 `output/*.html` 仍需由使用者自行验证。
