# 卡片列表页模板

本模板中的规则使用以下分类：

- **Hard Rule**：生成结果必须满足；违反时应停止或报告阻塞。
- **Guideline**：默认建议；有明确业务理由时可以调整并说明。
- **Example Specific**：只属于冻结 Golden 的示例值或业务内容，不得升级为通用规则。

## Definition

- **Hard Rule**：Card List 是组合 `TableToolbar`、选择控件、响应式 Card Grid 和对象级操作的页面模板，不是公共 `CardListPage`、`CheckCard` 或 Card 组件。
- **Hard Rule**：页面拥有筛选结果、选择集合和页面级操作；单张 Card 只表达一个对象、其状态和对象级操作。
- **Hard Rule**：`APPROVED DEFAULT TEMPLATE = STANDARD ANSWER`。生成前绑定 manifest 的 `card-list` reference；业务数据可以变化，Card anatomy、media shape、selection feedback 和 footer/action hierarchy 不得自行重写。
- **Guideline**：Card 应优先承载可帮助用户识别对象的媒体、标题、少量关键元数据和操作入口。

## When to use

- **Hard Rule**：只有当图片、封面或其他明显视觉特征对对象识别具有实际价值时，才选择 Card List。
- **Guideline**：适合用户需要浏览、识别、选择并管理商品、内容、门店或视觉资产等对象的场景。
- **Guideline**：适合每个对象只需展示少量关键元数据，且对象级操作比跨记录字段比较更重要的场景。

## When not to use

- **Hard Rule**：高密度字段扫描、多列对齐、精确数值比较或排序优先的任务使用 Basic List / Table，不使用 Card List。
- **Hard Rule**：跨页选择、真实服务端批量任务、权限工作流和复杂联动筛选超出 Starter V1 Card List 范围。
- **Guideline**：对象没有可识别媒体且主要内容是文本字段时，优先使用 Basic List。
- **Guideline**：当视觉识别和多字段比较同等重要时，先向用户说明两种模板的取舍并请求确认。

## Page structure

- **Hard Rule**：Card List 是 Level-1 页面；Page Header 使用 20px 标题和可选 Context Help，不显示 Back Icon、文字 Back 或 Breadcrumb。
- **Hard Rule**：完整页默认由 `patterns/default-application-shell.html` 包裹 Card List reference，Shell Main 左右保留 24px；不把 Card List 当作脱离页面上下文的 fragment。
- **Hard Rule**：页面结构由 Toolbar、Card Grid 和 Card 组成；页面自身不得复制基础组件或业务组件内部实现。
- **Hard Rule**：Toolbar 承载当前结果的选择控制、唯一选择摘要、页面内批量操作、轻量筛选、搜索和已支持的工具操作；不得同时显示 page-owned summary 与通用 `已选择 X 项`。
- **Hard Rule**：Card 承载媒体、标题、语义状态、关键元数据、Selection Control 和对象级操作。
- **Hard Rule**：默认媒体为圆形；square、rounded-square、rect hero 或新的媒体 banner 只能来自明确 override。
- **Guideline**：页面 Header 只承载页面级主操作；作用于已有对象集合的操作留在 Toolbar。

推荐结构：

```text
页面内容区
→ Toolbar Row
   → 当前结果的全选 / 半选控件
   → TableToolbar
      → Card-specific 批量操作（generic selection-summary region 隐藏）
      → Search / Select / Refresh
→ Card Grid
   → Card
      → Selection Control
      → Circular Media
      → Title + Status
      → Metadata
      → Card Actions
→ Empty / Error 状态
```

## Selection model

- **Hard Rule**：选择集合由页面管理；只有 Checkbox 等 Selection Control 可以改变选择，Card Body 不隐式选择。
- **Hard Rule**：全选和取消全选只影响当前筛选结果；选择摘要与批量操作必须读取同一选择集合。
- **Hard Rule**：页面只能有一个 canonical visible selection summary。若使用 `TableToolbar`，必须在 Card List scope 隐藏其 generic selection-summary region，除非它被明确证明是唯一摘要；不得盲目再渲染一个通用 selected-count 文案。
- **Hard Rule**：选中状态在 Hover 后仍然保持，且不能只依赖背景色表达。
- **Hard Rule**：筛选结果变化时，不得让不可见对象被“全选当前结果”意外新增或移除；页面必须明确当前结果与完整选择集合的关系。
- **Guideline**：首次进入默认使用空选择，除非需求明确要求恢复既有选择或展示特定任务上下文。
- **Example Specific**：Golden 中预置的选中项和选择数量仅用于演示状态，不是生成页面的默认值。
- **Hard Rule**：Card List 的 batch action relationship 必须保持 Card-specific；不得把 generic TableToolbar selected-count 作为额外的第二个用户反馈。

## Card Actions

- **Hard Rule**：Card Actions 只作用于当前 Card，与 Batch Actions 独立配置和执行。
- **Hard Rule**：单张 Card 最多展示 3 个操作入口，More 本身计为一个入口；超过限制时保留优先级最高的 2 个，其余按原顺序进入 More Menu。
- **Hard Rule**：危险对象操作必须在执行前确认，完成或失败后提供可感知反馈。
- **Hard Rule**：More 触发器必须具有包含对象名称的可访问名称，菜单项保持键盘可操作。
- **Hard Rule**：批量上架、移动和删除必须使用 Starter Runtime 暴露的 `IconPlus`、`IconSwap` 和 `IconDelete`；批量删除入口默认使用已批准的 neutral/default/secondary treatment，并保留确认流程。不得用手绘 SVG 或自定义图标/按钮样式替代 Runtime 绑定。
- **Guideline**：按业务频率和任务优先级排列操作，不让低频操作挤占核心入口。
- **Example Specific**：排到首位、编辑、复制、上架和删除是 Golden 的业务操作示例，不是所有 Card List 必须具备的固定操作。

## Batch Actions

- **Hard Rule**：Batch Actions 作用于当前选择集合，不得复用 Card Actions 的单对象处理语义。
- **Hard Rule**：依赖选择的 `TableToolbar` 操作必须设置 `requiresSelection: true` 并传入准确的 `selectedCount`；选择为空时不可执行。
- **Hard Rule**：危险批量操作必须确认，并说明影响范围；页面处理确认、Mock 数据更新、错误恢复和结果反馈。
- **Hard Rule**：Starter V1 只演示页面内本地 Mock 批量操作，不声称完成跨页、服务端、权限或持久化能力。
- **Guideline**：优先外露最高频批量操作，其余交由 `TableToolbar` 的响应式折叠能力处理。
- **Example Specific**：批量上架、移动和删除仅是 Golden 的操作组合，不是模板固定配置。

## Responsive rules

- **Hard Rule**：Grid 列数由可用内容宽度和 Card 最小可读宽度共同决定，不按设备名称固定桌面、平板或手机列数。
- **Hard Rule**：Toolbar 和 Grid 使用独立响应式策略；Toolbar 在筛选或搜索失去可用宽度前自然换行。
- **Hard Rule**：页面自身不得出现无意义横向滚动，Card 不得被压缩到标题、元数据或操作不可用。
- **Hard Rule**：标题优先单行展示并在超出可用宽度时省略，不通过截断真实数据或缩小字号保护布局。
- **Guideline**：结果数量减少时保持当前可容纳的列轨道和 Card 可读宽度，不把最后一行少量 Card 拉伸填满整行。
- **Guideline**：Card Grid 和 Card 内容保持顶对齐，Preview 或页面剩余高度不参与 Card 高度分配。
- **Example Specific**：Golden 使用的 Card 最小宽度、Grid gap、容器 padding 和具体圆角是该示例的校准值，不是全局 DesignKit Token；其中 `360px` 不得作为所有 Card List 的统一最小宽度。
- **Hard Rule**：当前批准的 Golden 几何基线使用 12px Card 外圆角、内容区顶部 10px 圆角和内容区下方 12px 圆角；该几何关系必须保留，但不得升级为全局圆角 Token。

## Theme rules

- **Hard Rule**：页面跟随 Starter/宿主的亮色或暗色主题，不在 Card List 内创建独立主题状态。
- **Hard Rule**：状态 Tag 使用语义颜色；暗色模式下文字、背景和边框必须保持可读对比度。
- **Hard Rule**：选中、Hover、Focus 和 Disabled 状态必须可区分，不能通过整体降低透明度表达 Selected。
- **Guideline**：优先复用现有语义 Token 和组件状态，不在页面中硬编码无来源的新色板。

## Accessibility rules

- **Hard Rule**：Toolbar、Selection Control、Card 操作区、More 触发器和图标按钮必须具有可访问名称。
- **Hard Rule**：Checkbox、Card Actions、Batch Actions 和 More Menu 必须支持键盘操作，并保留可见 Focus。
- **Hard Rule**：选中状态必须同时具有非颜色指示；成功、复制、删除和批量操作提供可感知反馈。
- **Hard Rule**：纯装饰图标不重复朗读；只有图标的操作必须由按钮提供名称。
- **Guideline**：Card 的可访问名称应包含足以识别对象的信息，但避免重复朗读全部元数据。

## Golden Example reference

- **Hard Rule**：生成前读取 `patterns/card-list.html` 作为 structural reference，再读取 `examples/multi-select-card-list.html` 作为结构、能力边界和视觉组合的只读交叉检查，不复制实现代码。
- **Hard Rule**：不得修改或写回 Golden Example。
- **Hard Rule**：Golden 的圆形媒体、唯一可见选择反馈、Card footer/action hierarchy 和 Card Grid relationship 属于 approved default；业务名称、图片、默认选择和操作文案属于 Example Specific。
- **Example Specific**：Golden 中的 Starbucks 商品名称、图片、价格、编码、状态、操作文案和 Mock 反馈只用于业务演示。
- **Example Specific**：Golden 的默认选择集合、具体 Card 数量、具体筛选项和像素校准值不构成模板通用默认值。

## Generation checklist

- [ ] **Hard Rule**：已确认核心任务依赖视觉对象识别，而不是高密度结构化比较。
- [ ] **Hard Rule**：页面使用真实 `StarbucksReact.TableToolbar` 和已查证的基础组件，没有复制组件内部结构或状态。
- [ ] **Hard Rule**：Selection Control 是唯一选择入口，全选范围、选择摘要和批量操作集合一致。
- [ ] **Hard Rule**：页面只有一个 canonical visible selection summary；Card List scope 没有额外 generic `已选择 X 项`。
- [ ] **Hard Rule**：默认 media 是 circular，且保留 approved Card content hierarchy、footer 和 action hierarchy。
- [ ] **Hard Rule**：Card Actions 与 Batch Actions 独立，危险操作有确认和反馈。
- [ ] **Hard Rule**：Card 操作入口数量、More 顺序和可访问名称符合规则。
- [ ] **Hard Rule**：Toolbar 可换行，Grid 按可用宽度变化，标题省略且页面无异常横向滚动。
- [ ] **Hard Rule**：亮色和暗色下语义状态、Selected、Hover、Focus、Disabled 均可读且可区分。
- [ ] **Hard Rule**：键盘、Focus、可访问名称和非颜色状态指示完整。
- [ ] **Guideline**：页面仅使用完成任务所需的关键元数据和高频操作。
- [ ] **Example Specific**：没有把 Golden 的商品数据、默认选择或 `360px` 校准值复制为通用规则。
