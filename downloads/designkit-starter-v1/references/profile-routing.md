# DesignKit Starter Profile Router

本文件是 Profile Router 的 Starter-only Projection。它只判断请求是否符合 Non-Developer Starter 交付合同，并将已确认的请求路由到 [Capability Registry](capability-registry.md)。它不定义组件 API、模板结构或 Runtime 实现。

## 1. Starter profile definition

Starter Profile 面向产品经理、设计评审参与者和没有前端工程环境的使用者。

交付合同：

- 输出 Single HTML Demo；
- 使用 DesignKit Starter V1 Fixed Runtime；
- 使用本地 Mock 数据和少量页面级 JavaScript；
- 只使用 Registry 已登记的 `starter.*` Capability；
- 不要求 Node.js、npm、构建工具或工程项目；
- 不因 Runtime export 或其他知识资产存在而扩大 Starter 能力。

当前页面白名单：

- `starter.template.basic-list`；
- `starter.template.card-list`；
- `starter.template.basic-form`；
- `starter.template.basic-detail`。

批准的页面外层 Pattern：

- `starter.pattern.default-application-shell`，仅限固定 Top + Side + approved Page Template。

## 2. Entry rules

以下意图进入 Starter：

| User intent | Routing result |
| --- | --- |
| “无需前端环境的 HTML Demo” | 确认 Starter，再查询 Registry |
| “产品经理生成页面” | 确认 Starter，再选择 Template |
| “浏览器预览的单文件 Demo” | 确认 Starter，并使用 Fixed Runtime |
| “用于方案评审或沟通的页面原型” | 在能力白名单内生成 Starter 页面 |

以下请求不属于 Starter：

- 工程项目或完整组件接入；
- 完整组件 API、内部实现或高级扩展；
- 自定义/多页面导航工程、真实路由、权限菜单或未登记模板；
- 真实接口、权限、上传、导出或生产部署。

命中范围外请求时，停止生成该部分并说明 Starter-safe 简化方案，不把工程知识混入 Single HTML Demo。

## 3. Required routing sequence

```text
User Intent
    ↓
Confirm Non-Developer HTML output
    ↓
Capability Registry Lookup
    ↓
Template Selection
    ↓
Shell Mode Decision
    ↓
Implementation Binding
    ↓
Interaction Pattern
    ↓
Template / Component Knowledge
    ↓
Golden Mapping
    ↓
Validation Contract and Evidence
```

页面请求先由 Registry 确认 Capability Boundary，再读取 [Template Selection](decisions/template-selection.md) 选择边界内模板，并在模板后解析 Shell Mode。组件或交互请求可以直接查询 Registry，但仍必须读取承载它的模板边界。

## 4. Registry status handling

| Registry result | Router behavior |
| --- | --- |
| `READY` | 按登记 Boundary 继续，不额外推断能力。 |
| `PARTIAL` | 只使用 Template 已批准的子集，并将缺失验证标记为 `UNVERIFIED`。 |
| `CONFLICTED` | 使用更窄边界并报告冲突，不合并不一致知识。 |
| Capability ID not registered | 停止该能力生成并进入 Unsupported Handling。 |

## 5. Unsupported handling

| Request | Starter handling |
| --- | --- |
| Dashboard 或多模块分析页 | 报告不支持；可缩减为 Basic List、Card List 或 Basic Detail 单页任务 |
| 常规企业后台 Application Shell | 使用 `starter.pattern.default-application-shell`；Template 后解析 `default` / `content-only` / `none` |
| Custom Navigation Shell、Navigation API、多页面/权限/真实路由 | 报告不支持；不得把固定 Default Shell 扩大为完整 Navigation engineering |
| Advanced FilterBar | 仅在 1～3 个无 Label、无校验、无复杂联动条件时建议 Quick Filter；否则报告超出范围 |
| Result Page | 不用 Basic Detail 伪装操作结果；报告当前没有对应 Starter Template |
| 复杂表单或详情变体 | 缩减为 Basic Form / Basic Detail 已批准边界，或报告无法满足 |
| 工程项目或完整组件集成 | 报告 Starter 只交付 Single HTML Demo，不生成工程交付 |

通用处理顺序：

1. 明确指出未登记能力不属于当前 Starter；
2. 不从 Runtime 或其他资料推断支持；
3. 提供最接近的 Starter-safe 简化方案；
4. 等待用户确认，不静默改变主要任务。

## 6. Maintenance rule

新能力通常只有完成以下链路并出现在 Source Registry 后，才能进入 Starter Projection：

```text
Implementation
      +
Knowledge
      +
Template
      +
Golden Example
      +
Validation
      ↓
starter.* Capability ID and approved Status
```

Profile Router 只确认 Starter 交付和 Capability ID，不维护组件用法、模板源码或验证证据。

`starter.pattern.default-application-shell` 是经批准的 contract-first restricted composition exception：它使用 `application-shell.md`、Docs implementation references、test-only fixture strategy 和 package-only clean-room evidence，不创建完整 Starter Golden。
