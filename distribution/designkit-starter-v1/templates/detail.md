# 基础详情页模板

## 定位

用于查看和确认一个对象的键值信息，保持信息聚焦，不把页面扩展成复杂数据分析页。它是页面组合参考，不是公共 `BasicDetailTemplate` 组件。

## 适用场景

- 详情字段结构稳定；
- 用户主要任务是查看和确认；
- 内容分组较少；
- 页面不依赖真实后端即可演示。

## 不适用场景

- 多个独立数据模块需要同时分析；
- 指标、趋势和明细表格是主要任务；
- 需要父级上下文和多层对象切换；
- 需要复杂 Tabs、时间线或实时刷新。

## React Basic Detail 结构基准

```text
Demo 状态控制（不属于正式页面）
└── Page Header：标题 + Tooltip 说明 / 右侧操作

DetailPageLayout maxWidth=1120
└── DetailSection
    └── DetailDescriptions
```

- Basic Detail 使用 `DetailPageLayout maxWidth={1120}`，不是无限制流式详情页。
- 只使用一个 `DetailSection`。
- 当前示例不显示额外的“基本信息”标题、Section 描述或 Card Header。
- 页面标题使用 16px 标题和标题后的说明 Tooltip；右侧只放“更多 / 编辑”核心操作。
- Header 与详情容器保持 10px 间距；Starter 单文件不依赖 Docs 面包屑。

## Starter Runtime Pro 能力

Starter Runtime 只选择性提供 Basic Detail 实际需要的：

- `DetailPageLayout`
- `DetailSection`
- `DetailDescriptions`

不要使用 `export * from './pro'`，也不要引入其他 Detail 模板的实现。

## 字段模型

Basic Detail 使用 React shared model 中的 12 个字段：

```text
ID
BPM工单号
领券链路要求
券中文名称
券英文名称
非预付费券编号/SKU
QID
发行商户
券类型
预热券
门店查看名称
门店查看描述
```

不要自动加入：

- `couponUsageRules`
- `couponActivityTimeline`
- `couponStoreScope`

这些数据属于其他 Detail Template。

## 空值和长字段

- 使用 `emptyValue="—"`。
- 空字符串、`null`、`undefined` 和旧数据中的 `--` 统一显示为 `—`。
- 长编号、英文名称和时间范围必须允许自然换行，不得截断到无法理解。
- 使用 `column`、`span` 或其他未列出的属性前，必须先查证真实 API。

## Actions

Starter Basic Detail 只保留：

- `复制`：Dropdown/Menu 中的本地反馈操作；
- `编辑`：唯一视觉主操作，使用本地 Message 反馈。

删除并禁止新增：

- `导出`；
- 删除、停用、权限等虚构操作；
- 只能弹出 Mock Message 的导出入口。

## 页面状态

Golden Example 需要考虑：

- Normal；
- Loading（使用已查证的 `Skeleton`）；
- Empty（使用已查证的 `Empty`）；
- Error（使用已查证的 `Result`，提供恢复操作）。

本规则只定义状态覆盖要求，不预先规定未经查证的 Loading、Empty 或 Error 组件组合。具体 API 在 `detail.html` 实施阶段按当前 Runtime 和 component catalog 查证后决定。

## 明确不属于 Basic Detail

- Card；
- Table；
- Timeline；
- Tabs；
- FilterBar；
- Form；
- Pagination；
- 上传；
- 权限；
- 真实 API；
- 复杂业务模块。

## 响应式要求

- 1120 宽度详情内容在桌面端使用两列；
- 窄屏自动收敛为单列；
- 页面自身不得产生横向滚动；
- 内容较长时只允许详情内容自然换行，不得破坏页面布局。

## 生成前检查

- [ ] 已明确对象名称和核心信息；
- [ ] 已使用 React Basic Detail 的 12 个字段；
- [ ] 已定义 `emptyValue="—"`；
- [ ] 已区分复制次要操作和编辑主操作；
- [ ] 更多菜单只包含复制，不包含导出；
- [ ] 未引入导出、真实接口、权限或复杂详情模块；
- [ ] 所有 Detail Pro 和基础组件 API 来自已查证 reference；
- [ ] 未将完整 React/Vue 源码复制进 Starter。
