# Starter V1 质量检查清单

## 生成前

- [ ] 页面属于基础列表、卡片列表、基础表单或基础详情之一。
- [ ] 已读取对应模板和 `component-catalog.md`。
- [ ] 使用 TableToolbar 时已读取 `business-components/table-toolbar.md`，并按当前模板限制实际能力子集。
- [ ] 所有组件属性和事件均来自已查证 API。
- [ ] 已确认使用本地 Mock 数据。
- [ ] 已确认不需要真实接口、权限、上传、导出或工程项目。
- [ ] 已在 Template Decision 后选择 Shell Mode；常规后台页默认 `default`，只有用户明确要求时使用 `content-only` 或 `none`。

## 路由检查

- [ ] 以图片或明显视觉特征识别、浏览、选择和管理对象的需求路由到 Card List。
- [ ] 以结构化字段扫描、对齐和比较为核心的需求路由到 Basic List。
- [ ] 用户只提出“列表”且没有明确视觉对象需求时，仍默认使用 Basic List。
- [ ] 批量操作本身没有被当作选择 Card List 的充分条件。

## HTML 静态检查

- [ ] 包含 `<!DOCTYPE html>`。
- [ ] 包含 `lang="zh-CN"`、charset、viewport 和 title。
- [ ] CDN 版本均为固定版本。
- [ ] CDN 顺序正确。
- [ ] 不包含 `import`、`export`、TypeScript、npm 或构建入口。
- [ ] 组件来自 `StarbucksReact`，图标来自 `window.arcoicon`。
- [ ] Default Shell 使用 `window.arcoicon.IconNotification`、`IconMoon`、`IconSun`，没有从 `StarbucksReact` 解构 icon。
- [ ] 没有新增 Theme API、Theme Provider 或只作用于 Shell 的 theme state。
- [ ] Basic List 从 `StarbucksReact` 获取 `TableToolbar`，没有页面私有 `.dk-page__table-toolbar`、`.dk-page__toolbar-left` 或 `.dk-page__toolbar-right`。
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
- [ ] Basic List、Basic Form 和 Basic Detail 三个 Golden Example 的页面背景、最大宽度、标题 Tooltip、标题区操作和页面字体继承保持同一 Starter Shell 方向。
- [ ] Basic List、Basic Form 和 Basic Detail 的页面 Header 与正式内容区间距为 10px，标题与右侧核心操作在桌面端垂直对齐。
- [ ] Basic List、Basic Form 或 Basic Detail 存在页面状态演示时，状态 Select 位于 Header 右侧操作区最左侧，带有 `aria-label="页面状态"` 和 `data-demo-only="true"`，页面没有独立顶部状态卡片。
- [ ] Mock 操作明确写成本地 Demo，不声称真实服务端成功。

### Default Application Shell

- [ ] `default` 固定为 Brand Top Menu + Collapsible Embedded Side Menu + approved Page Template；`content-only` 和 `none` 只响应用户明确要求。
- [ ] Top 使用 `StarbucksReact.Menu`，右侧顺序为 Store/System Switch → Notification → Theme Toggle → Divider → Avatar/User。
- [ ] Light 显示 `IconMoon` 和“切换到深色模式”；Dark 显示 `IconSun` 和“切换到浅色模式”；`aria-label` 与 `title` 一致表达 target mode。
- [ ] Side 使用 `StarbucksReact.Menu`、`collapse`、`hasCollapseButton`、`Menu.ItemGroup`、`Menu.SubMenu`；expanded/collapsed 为 260px/56px，没有 Starter-specific sidebar。
- [ ] Light 设置 `html[data-theme="light"]` 并移除 body 的 `arco-theme` / `data-arco-theme`；Dark 设置 `html[data-theme="dark"]` 和两个 body dark attributes。
- [ ] `designkit-starter-theme` 只存 `light` / `dark`；优先级为 explicit local choice → `prefers-color-scheme` → light fallback。
- [ ] Theme 同时作用于 Top、Side、Main 和所有组件。
- [ ] Shell 没有吸收 Page Header、Breadcrumb、Toolbar/Filter、内容、Pagination、page state、Mock data、page interaction 或 Basic List `4px / 16px / 16px`。
- [ ] Side Navigation 存在没有被当作 Breadcrumb 必需条件。
- [ ] 390px 保留 Brand/system identity、Notification、Theme Toggle、User access；没有 Drawer、Hamburger、Bottom Navigation、Overlay Navigation 或新 mobile pattern。
- [ ] 没有 Custom Navigation Shell、Navigation API、dynamic permission menu、backend-driven navigation、real router、permission routing、system switch backend logic 或 React/Vue navigation integration。

### Basic List

- [ ] Basic List 的查看、编辑使用 `Button type="text"` 和 `sbux-table-row-actions`，页面 CSS 未覆盖 `.arco-btn-text` 的颜色、字号、背景、边框或状态。
- [ ] Basic List 的关键词 Search 由 `TableToolbar.quickFilters` 提供且使用 `placement: 'start'`，Refresh 由 `tableTools.refresh` 提供。
- [ ] Basic List Continuous Data Region 的 top / inline inset 为 4px / 16px；Toolbar、Table、Pagination 属于同一 surface，页面没有额外 Toolbar/Table gap。
- [ ] Basic List 未向 `TableToolbar` 传入 `selectedCount`、`operationActions`、`moreActions`、`export` 或 `columnSettings`。
- [ ] Basic List 未出现 FilterBar、批量操作、导出或列设置。

### TableToolbar Business Component

- [ ] 使用真实 `StarbucksReact.TableToolbar`，没有用页面私有 Input、Button、Tooltip、Dropdown、DOM 或 CSS 复制其能力。
- [ ] QuickFilters 保持 1～3 个轻量条件；Search 按 Enter 或清空提交，Select、ButtonGroup 和完整 DateRange 变化后实时提交。
- [ ] 需要选择的操作设置 `requiresSelection: true`，`selectedCount` 与页面真实选择集合一致，无选择时不能执行。
- [ ] `operationActions` 按业务频率排序，响应式外露遵循 4 / 2 / 1 规则，其余操作进入组件折叠菜单。
- [ ] 页面负责数据、选择集合、确认、反馈和错误恢复；TableToolbar 只负责布局、组件状态和语义事件。
- [ ] 新增、导入等创建动作没有进入批量操作区；Pagination、Row Actions 和 Card Actions 保持在各自区域。
- [ ] 没有用 QuickFilters 复制 FilterBar，也没有生成跨页选择、真实导出、列设置持久化、权限系统或服务端批量能力。
- [ ] Toolbar 和图标工具有可访问名称、Tooltip、键盘 Focus，并由组件自身处理容器响应式，无页面级横向溢出。

### Card List

- [ ] 页面结构包含 Toolbar、Card Grid 和 Card；Card 仍是页面级组合，没有生成公共 `CardListPage`、`CheckCard` 或 Card API。
- [ ] 生成的 Card List 默认不选择任何 Card，直到用户通过 Selection Control 改变选择；冻结 Golden 的预置选择仅是 Example Specific。
- [ ] 只有 Checkbox 等 Selection Control 改变选择，Card Body 不隐式选择。
- [ ] 全选和取消全选只影响当前筛选结果；选择摘要和 Batch Actions 使用同一选择集合。
- [ ] Card Actions 只作用于当前 Card，与 Batch Actions 独立配置和执行。
- [ ] Card 最多展示 3 个操作入口，More 本身计为一个入口；超过限制时保留优先级最高的 2 个，其余按原顺序进入 More Menu。
- [ ] 依赖选择的 Batch Actions 设置 `requiresSelection: true`，选择为空时保持禁用且不能执行。
- [ ] 危险的 Card Action 和 Batch Action 在执行前确认，并在完成或失败后提供可感知反馈。
- [ ] 批量上架、移动、删除使用 Runtime 的 `IconPlus`、`IconSwap`、`IconDelete`；删除入口默认使用 neutral/default/secondary treatment，并保留确认，不使用手绘 SVG 或自定义按钮替代。
- [ ] Card 外圆角为当前 Golden 的 12px，内容区顶部/下方圆角为 10px/12px；该关系仅是模板几何基线，不升级为全局 Token。
- [ ] Grid 根据可用内容宽度和 Card 最小可读宽度决定列数，不按设备名称固定列数。
- [ ] 标题保持单行并在超出可用宽度时省略，不挤压元数据或操作区。
- [ ] Toolbar 与 Grid 使用独立响应式策略；Toolbar 可自然换行，页面没有无意义横向滚动。
- [ ] 亮色和暗色模式中的 Tag 使用可读语义颜色；Selected、Hover、Focus 和 Disabled 状态保持可区分。
- [ ] Selected 状态不只依赖颜色或整体透明度表达。
- [ ] Checkbox、Card Actions、Batch Actions 和 More Menu 支持键盘操作并具有可见 Focus。
- [ ] Toolbar、Selection Control、More 触发器和图标按钮具有可访问名称；纯装饰图标不重复朗读。

### Form 与 Detail

- [ ] Form 未出现 Upload、动态字段、Modal、Drawer 或 Step Form。
- [ ] Detail 只使用 shared model 的 12 个字段、单 DetailSection 和 `emptyValue="—"`，未出现 Export、Card、Timeline、Table、Tabs 或 Pagination。

## 浏览器检查

- [ ] 使用当前 Chrome 或 Edge 打开。
- [ ] CDN 加载成功。
- [ ] 页面无相关控制台错误；Babel Standalone 的开发提示如出现应单独记录，不得与页面错误混淆。
- [ ] 本地 Runtime JS/CSS 文件存在，Manifest 中 JS/CSS hash 与实际文件一致。
- [ ] `typeof StarbucksReact.TableToolbar === 'function'`，Runtime CSS 包含 `.sbux-table-toolbar`，并通过实际 Runtime/DOM 浏览器证据确认绑定；Runtime Manifest 不是额外的 `selectedBusinessExports` schema 要求。
- [ ] 不存在旧 Starbucks CDN，四个 Golden Example 使用同一 Runtime 文件和版本。
- [ ] 主要按钮、输入、表单提交或详情操作可用。
- [ ] Basic List 行操作 Normal 为品牌色，Hover、Active、Focus 来自 `starbucks-react.css`，不是页面内联或 Docs 样式。
- [ ] Basic List 实际渲染 `.sbux-table-toolbar`；无批量操作时 Search 位于 Start，Refresh 保持在 End。
- [ ] Card List 实际渲染 `.sbux-table-toolbar`、Card Grid 和 Card；选择、全选、筛选、批量操作、危险操作确认及反馈可用。
- [ ] Card List 在亮色和暗色模式下的语义状态、选中态、Hover、Focus、Checkbox、Icon 和 Dropdown/Menu 均可读可用。
- [ ] Card List 在宽屏和窄屏下由可用内容宽度决定 Grid 列数，Toolbar 可独立换行，标题省略且页面无横向溢出。
- [ ] 关键状态可以切换或演示。
- [ ] 预览结果与 React 视觉基准一致。
- [ ] 页面自身 `body` 无异常横向溢出；宽表格只在组件容器内滚动。
- [ ] Default Shell test-only fixture 和最终 ZIP package-only smoke 在 1280/768/390 和 Light/Dark 下验证 Top/Side/Main 可用且 document-level overflow 为 `NONE`；未执行时标记 `UNVERIFIED`。
- [ ] Default Shell 的 Top/Side/actions 支持键盘、可见 Focus 和可访问名称，Focus order 为 Top → Side → Main。
- [ ] 失败状态提供恢复方向；Loading 不重复提交；Empty 文案与业务查询结果区分。
- [ ] 已运行 `git diff --check`。

未实际完成浏览器检查时，必须在交付说明中写明：`UNVERIFIED`。

## Golden Example 当前状态

```text
examples/list.html：BROWSER_CONFIRMED
examples/multi-select-card-list.html：BROWSER_CONFIRMED
examples/form.html：BROWSER_CONFIRMED
examples/detail.html：BROWSER_CONFIRMED
浏览器 Smoke Check：BROWSER_CONFIRMED（使用本地 HTTP 服务）
```
