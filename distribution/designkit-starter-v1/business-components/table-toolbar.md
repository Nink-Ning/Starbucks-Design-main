# TableToolbar 业务组件知识

## 能力定位

TableToolbar 是 Starter V1 已注册的列表与批量操作业务组件。它位于 Table、Card Grid 或其他列表结果区上方，稳定组合批量操作、1～3 个轻量 QuickFilters 和表格工具，并负责操作优先级、组件状态、语义事件与响应式折叠。

本文件是 Starter V1 的 AI Knowledge，不是新的组件实现、Runtime API 或页面模板。生成页面前仍需读取对应 `templates/*.md`；模板对 TableToolbar 的能力子集和页面行为约束优先于本文件的通用能力说明。

## Trigger

以下任一条件成立时，优先复用真实 `StarbucksReact.TableToolbar`：

- Table、Card Grid 或列表结果区上方需要稳定承载批量操作。
- 页面只需要 1～3 个无 Label、无校验、无复杂联动的轻量筛选；Select、ButtonGroup 或 DateRange 变化后实时生效，Search 按 Enter 生效。
- 页面需要使用 Starter 已允许的表格工具，并希望保持统一位置、可访问名称和语义事件。
- 页面需要由组件统一处理选择摘要、依赖选择的禁用状态和 4 / 2 / 1 响应式操作折叠。

## Do not use

- 多字段查询、字段 Label、校验、查询/重置、展开收起或 Draft/Active 分离应使用 FilterBar；Starter V1 当前不支持高级 FilterBar 时，不得用 TableToolbar 伪造。
- 行内对象操作留在 Row Actions 或 Card Actions；Pagination 保持在结果区底部。
- 新增、导入等创建数据的入口放在 Page Header 或对应流程，不放入批量操作区。
- TableToolbar 不负责数据请求、分页、跨页选择、权限系统、危险操作确认、错误恢复、真实导出文件或列设置面板。
- 不得用页面私有 Input、Button、Tooltip、Dropdown 或 CSS 复制 TableToolbar 的结构、状态和响应式能力。

## Selection priority

1. 先选择 Starter 已支持的页面模板。
2. 模板需要 TableToolbar 能力时，读取本文件和 `references/component-catalog.md` 中对应模板的已查证 API 子集。
3. 直接使用 Runtime 的 `StarbucksReact.TableToolbar`。
4. 页面只维护列表数据、选择集合和收到语义事件后的业务逻辑。
5. 不新增页面私有 Toolbar，也不修改 Runtime 或组件 API。

## Anatomy

```text
TableToolbar
├── Start
│   ├── SelectionSummary（selectedCount > 0 时出现）
│   ├── OperationActions
│   ├── MoreActions
│   └── Start QuickFilters（可选核心筛选）
└── Controls
    ├── End QuickFilters（默认位置）
    └── TableTools（只启用模板和 Starter V1 明确允许的工具）
```

## State and ownership

| 内容 | TableToolbar 负责 | 页面或模板负责 |
| --- | --- | --- |
| 筛选 | QuickFilter 展示、受控/非受控输入、提交时机和事件元数据 | 本地 Mock 数据过滤、Loading、Empty、Error 和恢复 |
| 选择 | `selectedCount` 摘要、`requiresSelection` 禁用 | 选择集合、全选范围、跨结果变化后的选择协调 |
| 操作 | 操作顺序、Loading/Disabled 展示、More 合并和响应式折叠 | 确认、数据变更、失败恢复和可感知反馈 |
| 工具 | 工具入口、Tooltip、可访问名称和语义事件 | 刷新逻辑；Starter 未开放的真实导出和列设置能力不得生成 |
| 布局 | Toolbar 内部排列、container query 和 4 / 2 / 1 折叠 | Toolbar 与页面 Header、结果区、Pagination 的组合关系 |

TableToolbar 没有统一 Loading、Empty 或 Error 页面状态。具体操作可单独 Loading；列表结果的 Loading、Empty、Error 由页面使用真实组件表达。

## QuickFilters rules

- `quickFilters` 推荐 1～3 个，支持已查证的 `search`、`select`、`buttonGroup` 和 `dateRange` 类型。
- `placement` 默认为 `end`；只有确实需要前置的核心筛选使用 `start`。
- Select、ButtonGroup 和完整 DateRange 变化后立即提交。
- Search 输入过程不提交；Enter 提交去除首尾空格的关键词，清空立即提交空值。
- `quickFilterValues` 是受控的已提交值；否则使用 `defaultQuickFilterValues` 初始化非受控状态。
- QuickFilters 不增加 Label、校验、查询/重置、展开收起、保存方案或条件联动。
- 超过 3 个条件或需要复杂联动时停止扩展 TableToolbar，改用合适的筛选能力或报告超出 Starter V1 范围。

## Selection and action rules

- `selectedCount > 0` 时显示选择摘要；为 `0` 时不保留空占位。
- 依赖选择对象的操作必须设置 `requiresSelection: true`；`selectedCount` 必须与页面选择集合一致。
- `operationActions` 数组顺序就是业务优先级；第 1 项是最高频核心操作。
- 宽、中、紧凑容器分别最多外露 4、2、1 项，其余操作与 `moreActions` 按原顺序进入折叠菜单。
- 重复 action `key` 只保留优先级更高的第一项。
- 折叠菜单内全部操作不可用时，More 或“批量操作”入口同步禁用。
- 危险操作可以使用 `status: 'danger'` 表达风险，但确认、执行和恢复仍由页面负责。
- `onOperation` 只表达操作意图；不得在 TableToolbar 配置中写入真实请求或伪造成功结果。

## Starter template profiles

### Basic List

- 使用 Search QuickFilter，配置 `placement: 'start'`；只启用 `tableTools.refresh`。
- 不传 `selectedCount`、`operationActions` 或 `moreActions`。
- 不启用 Export、ColumnSettings、批量操作或高级筛选。
- 页面保留 Table、Pagination、Normal、Loading、Empty 和 Error 状态所有权。

### Card List

- 可以使用轻量 Search、Select、选择摘要、批量操作、MoreActions 和 Refresh。
- 选择集合、当前结果全选/半选、Card Actions、危险操作确认和反馈由页面负责。
- 当 Card List 页面已经提供 page-owned canonical selection summary 时，模板必须隐藏 TableToolbar 的 generic selection-summary region；TableToolbar 的 `selectedCount` 仍可作为 operation state，但不得再产生第二个可见 `已选择 X 项`。
- 依赖选择的批量操作必须设置 `requiresSelection: true`。
- 不从 Card List Golden Example 推断跨页选择、真实导出、权限工作流或服务端批量能力。

## Accessibility and responsive rules

- 为根节点提供与当前列表任务对应的 `ariaLabel`。
- 图标工具必须有 `ariaLabel` 和 Tooltip；操作按钮使用清晰可执行的文案。
- 禁用操作在适用时提供 `disabledReason`，但它不能替代权限判断。
- 选择状态不能只依赖颜色；页面级 Selection Control 必须支持键盘操作和可见 Focus。
- 不在页面 CSS 中覆盖 `.sbux-table-toolbar` 或宽泛 `.arco-*` 选择器，不使用 `!important`。
- Toolbar 使用自身容器宽度响应式折叠；页面不得复制断点逻辑或产生无意义横向滚动。

## Generation rules

1. 先读取对应页面模板，再按模板允许的 TableToolbar profile 选择 Props。
2. 仅使用 `references/component-catalog.md` 已查证的 API；未列出的 Props 或事件必须停止猜测。
3. 从 `StarbucksReact` 解构真实 `TableToolbar`，不复制组件源码、DOM、类名或样式。
4. 页面将筛选值、选择集合、Loading 和业务结果作为单一状态源传入组件。
5. 页面接收语义事件后处理本地 Mock 数据、确认、反馈和恢复。
6. 不因 Runtime 暴露某项 API 就扩大 Starter V1 或当前模板边界。
7. 不修改 Runtime、组件实现、公共 API、Tokens、Golden Example 或发布资产。

## Known pitfalls

- 把 Search 正在输入的 Draft 当作已提交 `quickFilterValues`。
- 无选择时仍允许执行依赖选择的操作，或 `selectedCount` 与真实选择集合不一致。
- 把新增、导入等创建动作放入批量操作区。
- 认为 `onRefresh`、`onExport` 或 `onColumnSettings` 会自动完成页面业务。
- 为了匹配页面宽度复制 Toolbar 的 CSS、DOM 或折叠逻辑。
- 用多个 QuickFilters 拼出 FilterBar，或从 Runtime API 推断 Starter 未开放能力。

## Evaluator checklist

### PASS

- 场景符合 Trigger，并使用真实 `StarbucksReact.TableToolbar`。
- 当前模板只使用其允许的 API 子集，QuickFilters 数量和提交时机正确。
- `selectedCount`、`requiresSelection`、操作优先级和折叠菜单状态与页面数据一致。
- 页面正确承担筛选结果、选择集合、确认、Loading、Empty、Error、反馈和恢复。
- 可访问名称、键盘 Focus、容器响应式和页面横向溢出检查通过。

### WARN

- 4 个以上简单筛选仍放在 Toolbar，但尚未出现校验或复杂联动。
- 操作顺序没有体现使用频率，或禁用原因不清晰。
- 页面重复包裹基础控件，但尚未改变 TableToolbar 行为。

### BLOCK

- 用页面私有结构复制 TableToolbar，或修改组件内部 DOM、类名和样式。
- 无选择仍执行依赖选择的操作，或选择摘要与真实选择集合不一致。
- Search 每次输入都提交，或用 QuickFilters 复制完整 FilterBar。
- TableToolbar 内执行真实请求、危险操作确认、跨页选择、导出文件生成或列设置持久化。
- 生成当前模板或 Starter V1 明确不支持的能力。
