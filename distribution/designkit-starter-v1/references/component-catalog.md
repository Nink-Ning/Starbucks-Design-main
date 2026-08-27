# DesignKit Starter Component Capability Catalog

本目录只登记 Non-Developer Starter 可以在 Single HTML Demo 中使用的组件能力。它不提供工程接入、开发者接口或完整组件文档；具体页面结构读取对应 Template，业务组件规则读取对应 Business Component Knowledge。

## 1. Global boundary

### Allowed capability

- 只使用 Starter Fixed Runtime 已批准且被当前 Template 明确需要的组件能力。
- 组件负责自身的视觉、语义、交互状态和响应式能力。
- 页面负责本地 Mock 数据、页面状态、对象范围、确认、反馈和错误恢复。

### Unsupported capability

- 未登记组件、完整工程组件集、开发者扩展点或内部实现。
- 真实接口、权限、上传、导出、跨页状态、服务端任务或生产部署。
- 通过页面私有 DOM、样式或脚本复制已有组件能力。

### Usage boundary

- 先通过 [Capability Registry](capability-registry.md) 确认 `starter.*` Capability，再读取对应 Template。
- 只采用 Template 和 Golden 已展示的批准能力组合，不从 Runtime 文件存在推断额外能力。
- 未在本目录登记的能力视为 Starter 范围外，按 [Profile Router](profile-routing.md) 处理。

## 2. TableToolbar business capability

详细规则读取 [TableToolbar Business Component Knowledge](../business-components/table-toolbar.md)。

### Allowed capability

- Selection Summary。
- Template 明确允许的轻量 Batch Actions。
- 1～3 个基础 Quick Filters。
- Refresh 等 Template 明确允许的工具。
- Action State Display、可访问名称和组件自身的响应式排列。

### Unsupported capability

- 完整组件配置、工程级扩展或高级插槽。
- Density Management、完整 FilterBar、真实导出、列设置持久化。
- 跨页选择、权限工作流或服务端批量任务。

### Usage boundary

- Basic List 只使用 Search Quick Filter 与 Refresh，不启用选择或批量操作。
- Card List 可以使用轻量筛选、Selection Summary、Batch Actions、More 和 Refresh。
- 页面拥有筛选结果、Selection Set、确认、反馈和错误恢复；TableToolbar 不拥有业务数据。

## 3. Basic List capability set

### Allowed capability

- TableToolbar：Search Quick Filter、Refresh。
- Table：结构化数据展示与局部横向滚动。
- Pagination：当前本地结果分页。
- Button：页面核心操作和 Row Actions。
- Tag：语义状态。
- Empty、Result：空状态和错误状态。
- Tooltip、Message：可访问说明和本地反馈。

### Unsupported capability

- Selection、Batch Actions、Export、Column Settings 或 Advanced Filter。
- 跨页选择、服务端分页或真实数据请求。
- 用页面私有 Toolbar 代替 TableToolbar。

### Usage boundary

- 使用 [Basic List Template](../templates/list.md) 的固定 Search + Refresh 结构。
- 行操作只作用于当前对象，不依赖 Selection Set。
- 页面拥有 Normal、Loading、Empty、Error、查询结果和分页状态。

## 4. Card List capability set

### Allowed capability

- Checkbox：当前结果的单项选择、全选和半选。
- TableToolbar：轻量 Search/Select、Selection Summary、Batch Actions、More 和 Refresh。
- Dropdown、Menu：Card 的低频单对象操作。
- Popconfirm：轻量危险操作确认。
- Tag、Empty、Message：状态、空结果和本地反馈。
- Template-local Card Pattern：视觉对象展示，不作为公共 Card 组件能力。

### Unsupported capability

- 跨页 Selection Set、真实导出、权限或服务端批处理。
- 从 Golden 推断固定业务操作、默认选中项或公共 Card 组件。
- Card Body 隐式改变选择。

### Usage boundary

- 使用 [Card List Template](../templates/card-list.md) 管理页面级 Selection Set。
- Card Actions 只作用于当前对象；Batch Actions 只作用于 Selection Set。
- Golden 中的商品、图片、默认选择和操作名称均为 Example Specific。

## 5. Basic Form capability set

### Allowed capability

- Form 与基础字段容器。
- Input、Text Area、Select、Date Picker、Radio、Checkbox、Switch。
- Button、Message：重置、提交 Loading 和本地反馈。
- Form Page Layout、Form Grid、Form Control Area、Form Actions：基础表单页面组合。

### Unsupported capability

- Step Form、动态字段、上传、自动保存、审批或复杂联动。
- 真实提交服务、权限判断或生产数据写入。
- 将页面模板包装成新的配置驱动公共组件。

### Usage boundary

- 使用 [Basic Form Template](../templates/form.md) 的基础创建或编辑流程。
- 页面负责初始值、校验结果、提交状态、重置基线和本地反馈。
- 只生成当前任务所需字段，不从其他表单变体推断能力。

## 6. Basic Detail capability set

### Allowed capability

- Detail Page Layout、Detail Section、Detail Descriptions：单区块只读信息展示。
- Dropdown、Menu、Button：页面级单对象操作。
- Skeleton、Empty、Result：Loading、Empty、Error。
- Tooltip、Message：说明和本地反馈。
- Select：仅作为 Golden 中的 Demo 状态控制，不属于正式详情结构。

### Unsupported capability

- 多模块复杂详情、Tabs、Timeline、Table、Pagination 或真实导出。
- 通过只读 Form 模拟 Detail。
- 从其他详情变体推断更多区块或公共页面组件。

### Usage boundary

- 使用 [Basic Detail Template](../templates/detail.md) 的单对象只读结构。
- 页面负责字段模型、空值表达、长文本和本地操作反馈。
- Loading、Empty、Error 不改变 Basic Detail 的 Capability Boundary。

## 7. Maintenance rule

新增组件能力必须先完成 Capability Registry、Template、Golden Mapping、Validation 和 Evidence 链路。本目录只同步批准后的 Allowed Capability、Unsupported Capability 和 Usage Boundary，不记录工程路径或开发者接口。
