# DesignKit Starter V1-r2 Preview Candidate

DesignKit Starter V1 是一个面向产品经理的零工程环境 Demo 生成包。用户无需安装 Node.js 或前端工程环境，AI 最终生成可直接在浏览器打开的单文件 HTML Demo。HTML 内部允许使用固定版本的 React UMD/CDN、Babel 和少量 JavaScript。

本目录是 V1 的 r2 fidelity/composition Preview Candidate（internal-trial），不是正式对外发布包，也不是 React / Vue 组件库的替代品。Frozen V1-r1 与本候选包并存。

## V1 支持范围

- 基础列表页
- 卡片列表页
- 基础表单页
- 基础详情页
- React 视觉基准
- 单文件 HTML 输出
- 本地 Mock 数据
- Normal、Loading、Empty、Error 等主要状态
- 窄屏布局和表格局部横向滚动
- 四个已验证的 Golden Example：`examples/list.html`、`examples/multi-select-card-list.html`、`examples/form.html`、`examples/detail.html`
- Starter 本地 Runtime；React、ReactDOM、Arco 和 Babel 使用固定 CDN

## V1 暂不支持

- Vue Preview
- Dashboard、登录页、结果页
- 高级 FilterBar
- 跨页选择、复杂服务端批量操作和权限工作流
- 真实接口、权限系统、上传和导出
- React / Vue 工程项目
- 真实数据持久化、生产部署和离线运行

## 快速使用

1. 阅读 `START-HERE.md`。
2. 将本目录交给 AI，或至少提供 `SKILL.md`、`references/`、`templates/` 和 `prompts/`。
3. 使用 `prompts/new-demo.md` 提供产品需求。
4. 让 AI 将完整 HTML 写入 `output/`。
5. 使用本地 HTTP 服务预览生成的 HTML，再用 Chrome 或 Edge 检查。

## 目录说明

- `SKILL.md`：AI 生成流程和硬性约束。
- `references/`：设计规则、组件 API、HTML 输出契约、CDN 运行方式和验收清单。
- `references/template-usage-contract.md` 与 `references/implementation-binding-contract.md`：Template fidelity 与 Runtime provenance 的生成基线。
- `references/validation/r2-validation-matrix.md`：R2 候选验证矩阵；各维度必须独立判定。
- `templates/`：基础列表、卡片列表、表单、详情四类页面的组合规则。
- `prompts/`：新建、修改和自检提示词。
- `assets/`：仅包含页面级布局样式，不包含组件内部样式。
- `examples/`：四个已验证的 Golden Example，分别对应基础列表、卡片列表、基础表单和基础详情。
- `runtime/`：由当前 React 工作区同次构建生成的 Starter 本地 JS/CSS Runtime。
- `output/`：用户生成的 Demo 文件。

## 重要说明

- 生成的 HTML 需要联网加载固定版本的 CDN 资源。
- Starbucks React JS/CSS 通过相对路径加载，预览时必须保留 Starter 目录结构。
- Starter 不提供自动启动服务；请参照 `START-HERE.md` 使用本地 HTTP 服务预览。
- HTML 不是生产工程代码，不能直接替代正式 React / Vue 实现。
- 不要在 Demo 中输入真实客户数据、密码、令牌或内部接口地址。
- 当前版本是内部试用版，示例已完成本地浏览器验证，但仍不构成生产质量或发布承诺，详见 `USAGE-NOTICE.md`。
