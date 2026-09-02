# Starbucks Design 架构与资产边界

## 1. 文档目的

本文用于定义 Starbucks Design / DesignKit 仓库中的架构边界、资产分层、职责归属和依赖方向。

它回答：

- 一个需求应归属于基础组件、业务组件、页面模板还是业务模块；
- 哪些能力可以进入 React / Vue 组件包；
- 哪些内容只应存在于 Docs、模板或业务示例中；
- Design Token、基础组件、业务组件、页面模板、Docs、Preview 和 Skill 如何协作；
- React 与 Vue 应保持什么程度的一致；
- 哪些架构越界、重复封装和依赖方向是禁止的。

本文不替代：

- 根目录或局部目录中的 `AGENTS.md`；
- 已发布公共 API、类型定义和兼容性约束；
- 用户当前任务要求；
- 已评审通过的 Figma 设计稿、Figma Variables 和 Design Token；
- `agent-guidelines/` 中的专项工程规则；
- React / Vue 组件 Skill 中的 API 文档；
- 实际代码、测试、构建和浏览器验证结果。

规则优先级以根目录和局部 `AGENTS.md` 为最高依据，其次遵循已发布公共 API、当前任务要求、Figma 设计资产和适用的 `agent-guidelines/`。本 reference 仅用于补充架构判断，不得覆盖更高优先级规则。

## 2. 资产分层

Starbucks Design 资产划分为六层。

```text
第 1 层：设计资产
Figma、Variables、设计稿、组件属性、设计决策、视觉规范

第 2 层：基础能力
Design Token、基础组件、公共样式、通用交互

第 3 层：业务能力
业务组件、稳定业务模式、状态模型、业务级 API Contract

第 4 层：页面能力
页面模板、页面结构、页面级交互、业务组合示例

第 5 层：知识与生成能力
Skills、references、scripts、AI Contract、Recipes

第 6 层：质量验证
Evaluator、Tests、Build、Docs、Browser Verification
```

依赖方向应从低层到高层：

```text
Design Token
↓
基础组件
↓
业务组件
↓
页面模板
↓
业务模块
```

低层能力可以被高层组合，高层能力不得反向污染低层能力。

## 3. 基础组件

基础组件提供通用 UI、交互原语和框架级能力。它们通常不包含特定业务语义，可以跨系统、跨模块和跨页面使用。

典型基础组件包括：

```text
Button
Input
InputNumber
InputTag
MultiSelect
Select
Cascader
TreeSelect
Checkbox
Radio
Switch
Tag
DatePicker
RangePicker
TimePicker
Upload
Table
Pagination
Tabs
Modal
Drawer
Tooltip
Popover
Dropdown
Trigger
Form
Descriptions
Card
Empty
Result
```

基础组件可以负责：

- 通用视觉规范；
- Design Token 映射；
- 基础交互；
- 可访问性；
- 默认状态和交互状态；
- 受控与非受控模式；
- Popup、Portal 和 Overlay；
- 框架适配；
- 公共 Props、Events、Slots 和 Types；
- React 与 Vue 的基础行为一致；
- 通用主题能力；
- 公共样式和兼容性。

基础组件不应负责：

- 特定业务流程；
- 业务权限判断；
- 特定领域数据结构；
- 业务页面布局；
- 查询条件组合；
- 批量操作规则；
- 业务提交、审批、导入或导出语义；
- 某个系统专属文案；
- 页面级请求逻辑；
- 业务模块状态。

错误示例：

```text
在 Table 内部直接实现“批量停用门店”
在 Modal 内部实现“审批通过”
在 Select 内部绑定某个业务接口
在 Button 中内置特定权限编码
```

这些内容应归属于业务组件、页面模板或业务模块。

## 4. 业务组件

业务组件是由多个基础组件和稳定业务规则组成，用于完成一个可复用业务任务的工程资产。

一个合格的业务组件通常具有：

1. 明确的业务任务；
2. 两个或以上可复用场景；
3. 稳定结构；
4. 清晰的适用范围和不适用范围；
5. 状态模型；
6. 输入和输出；
7. 公共 API、Schema 或扩展边界；
8. React / Vue 行为契约；
9. Docs Demo；
10. Tests；
11. 需要时提供 AI Contract 和 Evaluator；
12. 明确的版本和发布影响。

典型业务组件包括：

```text
FilterBar
AdvancedFilter
TableToolbar
BatchActions
SelectionSummary
ColumnSettings
FormDrawer
FormModal
RiskConfirm
ActivityTimeline
ImportWizard
ExportPanel
```

判断一个模式是否应封装为业务组件，应先回答：

- 该模式是否在多个页面重复出现；
- 重复的是外观、结构、行为还是业务规则；
- 是否有稳定输入和输出；
- 是否可以定义清晰状态模型；
- 是否可在不同业务数据下保持相同行为；
- 是否能减少重复设计与开发；
- 是否可以由基础组件组合完成；
- 是否有足够证据证明需要公共封装。

只有外观相似，不代表应该封装为业务组件。

例如：

```text
两个页面都用了“左侧树 + 右侧表格”
```

这通常只是页面结构，不一定是业务组件。

而：

```text
多个页面都需要统一的筛选字段管理、展开收起、查询、重置、校验和受控模式
```

则适合沉淀为 `FilterBar`。

业务组件可以依赖：

- 基础组件；
- 公共 Hooks / Composables；
- 公共 Types；
- Design Token；
- 公共工具函数；
- 经过批准的业务子能力。

业务组件不得依赖：

- 某个具体页面模板；
- Docs 专用组件；
- Preview 专用运行时；
- 另一框架的生产包；
- 特定页面 Mock 数据；
- 某个业务模块的私有接口。

## 5. 页面模板

页面模板是可运行的页面级组合示例，用于展示基础组件和业务组件如何组合成完整页面。

典型页面模板包括：

```text
基础列表页
筛选列表页
卡片列表页
标签管理页
左树右表页
树表格页
基础表单页
分组表单页
分步表单页
基础详情页
卡片详情页
数据详情页
Dashboard
登录页
结果页
异常页
```

页面模板负责：

- 页面区域关系；
- 页面级信息层级；
- 页面头部；
- 页面级操作；
- 页面级 Mock 数据；
- 页面级请求模拟；
- 页面分页；
- 页面选中状态；
- 页面级 Modal / Drawer；
- Loading、Empty、Error 演示；
- 响应式布局；
- 页面级滚动和溢出；
- React / Vue 用户可见行为一致；
- 可复制和改造的示例代码。

页面模板不应：

- 复制基础组件内部逻辑；
- 复制业务组件状态模型；
- 重新实现 FilterBar；
- 重新实现 TableToolbar；
- 添加新的公共组件 API；
- 默认进入 React / Vue 包导出；
- 成为大型配置驱动万能页面组件；
- 绑定真实业务后端；
- 包含无法复用的临时样式覆盖。

页面模板与业务组件区别：

```text
业务组件
解决一个稳定业务任务
可以跨多个页面复用
具有公共 API 和状态契约
通常进入组件包或公共业务包

页面模板
解决整页组合和布局问题
主要用于 Docs、示例和复制改造
默认不进入组件包导出
页面级逻辑可以保留在模板内部
```

页面模板默认不得加入：

```text
packages/starbucks-design-react/src/index.ts
packages/starbucks-design-vue/src/index.ts
```

除非用户明确批准建设公共页面框架，并有充分复用证据。

### 5.1 Restricted composition pattern — Default Application Shell

`starter.pattern.default-application-shell` 是 Non-Developer Starter 的受限页面外层组合：

```text
Brand Top Menu
    + Collapsible Embedded Side Menu
    + approved Page Template
```

它属于 Knowledge/Starter composition pattern，不是：

- 新基础组件；
- 新业务组件；
- public Navigation API；
- reusable all-in-one page component；
- React/Vue project navigation integration。

Shell 只拥有 Top、Side、Main outer layout、global theme binding 和 Shell responsive relationship。Page Template 继续拥有 Page Header、Breadcrumb、Toolbar/Filter、内容区、Pagination、page state、Mock data、page interactions 和模板内部 spacing。具体 Shell Modes、Theme 和 responsive contract 只读取 [Default Application Shell Contract](application-shell.md)。

该 pattern 复用现有 Menu 和 approved Docs implementation references，不创建 Starter-specific Sidebar，不进入 React/Vue package exports，也不授权 Custom Navigation、权限菜单、真实路由或 backend-driven navigation。

## 6. 业务模块

业务模块具有明确领域语义，通常由多个页面模板、业务组件和领域规则组成。

典型业务模块包括：

```text
标签管理
门店管理
商品管理
组织管理
权限管理
活动管理
审批管理
即时零售配置
```

业务模块可以保留：

- 领域字段；
- 领域接口；
- 特定权限；
- 特定业务状态；
- 特定流程；
- 领域文案；
- 页面路由；
- 页面级组合。

业务模块中的稳定通用能力，可以向下沉淀为业务组件。

不得把完整业务模块直接包装成通用组件。

## 7. Design Token 与样式资产

视觉资产应遵循以下来源顺序：

```text
Figma Variables
→ Starbucks Design Global Tokens
→ Component Tokens
→ Business Semantic Tokens
→ Page-level Local Styles
→ Arco Design Defaults
```

Global Tokens 表达跨组件语义，例如品牌色、文本色、背景色、边框色、间距、字号、行高、圆角、阴影、层级和动画。

Component Tokens 用于某个组件独有但具有稳定语义的规格，例如 Table 表头高度、Modal 默认宽度、Tabs 指示条高度、DatePicker 单元格尺寸。

Business Semantic Tokens 只有在以下条件下可以新增：

- 具有明确业务语义；
- 无法由 Global Token 或 Component Token 表达；
- React、Vue 和 Docs 需要同源使用；
- 有默认值；
- 有主题映射；
- 有文档说明；
- 有测试或验证依据。

页面级局部样式只能解决当前页面组合问题，不应修复基础组件或业务组件的通用能力缺口。

## 8. React 与 Vue 架构

React 和 Vue 不要求源码完全一致，但应保持：

- 功能范围一致；
- 默认值一致；
- 状态模型一致；
- 用户可见行为一致；
- 交互顺序一致；
- 视觉规格一致；
- 响应式结果一致；
- 错误和空状态一致；
- 文档覆盖范围一致。

允许的框架差异包括：

```text
React Hooks 与 Vue Composition API
Props 与 v-model 的框架表达差异
Children 与 Slots 的差异
JSX 与 Template 的差异
DOM 类名和组件内部结构差异
框架原生事件机制差异
```

这些差异不得造成用户体验差异。

生产代码禁止：

```text
React 包依赖 Vue 包
Vue 包依赖 React 包
React 页面直接导入 Vue 组件
Vue 页面直接导入 React 组件
通过 Docs 组件桥接生产依赖
```

共享内容应放在：

```text
公共类型
公共 Token
公共 Schema
公共 Mock 数据
纯函数工具
框架无关规则
```

## 9. Docs、Preview 与 Skill

Docs 是长期维护的设计系统事实来源之一，应展示真实组件、真实 Demo、源码、状态、React / Vue 对照和验证证据。

Docs 不应：

- 使用静态 HTML 模拟真实组件；
- 使用截图替代可运行 Demo；
- 长期保留占位页面；
- 展示与组件包不一致的私有实现；
- 隐藏 React / Vue 行为差异；
- 把未验证实现标为完成。

Preview Skill 只负责零环境运行方式：

```text
starbucks-design-react-preview
→ React CDN + UMD + Babel + 单 HTML

starbucks-design-vue-preview
→ Vue CDN + UMD + 单 HTML
```

Preview 生成结果不能自动视为工程级组件实现、正式页面模板或黄金模板。

Skill 职责：

| Skill | 职责 |
| --- | --- |
| `skills/starbucks-design/` | 总控入口、任务识别、架构路由、质量门禁 |
| `skills/starbucks-design-react/` | React 组件 API、导入方式、类型和代码示例 |
| `skills/starbucks-design-vue/` | Vue 组件 API、Props、Events、Slots 和代码示例 |
| `skills/starbucks-design-react-preview/` | React 单 HTML Preview 运行方式 |
| `skills/starbucks-design-vue-preview/` | Vue 单 HTML Preview 运行方式 |

`references/` 用于存放架构规则、任务路由和设计决策，不应复制完整组件 API。

`scripts/` 只用于存放经过验证的黄金模板，不是临时代码目录。详细读取和模板使用规则见 `task-routing.md`。

## 10. 依赖方向

允许的依赖方向：

```text
Design Token
↓
基础组件
↓
业务组件
↓
页面模板
↓
业务模块
```

横向知识依赖：

```text
Skills / references / AI Contract
→ 可以读取和约束上述资产
→ 不应成为生产运行时依赖
```

禁止的依赖方向：

```text
基础组件依赖业务组件
基础组件依赖页面模板
业务组件依赖具体业务模块
React 包依赖 Vue 包
Vue 包依赖 React 包
生产包依赖 Docs
生产包依赖 Preview Skill
```

## 11. 架构决策表

| 需求 | 正确归属 |
| --- | --- |
| Input 的 Focus 样式不一致 | 基础组件 |
| Select Popup 阴影和圆角 | 基础组件 / 公共浮层能力 |
| 多页面重复的筛选、查询、重置 | 业务组件 `FilterBar` |
| 表格上方统一批量操作和列设置 | 业务组件 `TableToolbar` |
| 左侧标签组、右侧筛选和表格 | 页面模板或业务模块 |
| 标签领域字段和接口 | 业务模块 |
| 基础列表页面组合示例 | 页面模板 |
| Starter 常规后台页的固定 Top + Side + Template 外层 | Restricted composition pattern `starter.pattern.default-application-shell` |
| 自定义导航、真实路由、权限菜单或 Navigation API | Docs Full / Developer Navigation engineering，不属于 Starter Shell |
| React 单文件 HTML 预览 | React Preview Skill |
| Vue 单文件 HTML 预览 | Vue Preview Skill |
| 组件 Props 与类型说明 | React / Vue 组件 Skill |
| Modal、Drawer、新页面如何选择 | Design Decision reference |
| 判断生成结果是否合格 | Evaluator |
| 可直接复制的成熟页面代码 | scripts 黄金模板 |

## 12. 常见架构错误

### 12.1 把页面模板封装成万能组件

问题：

- Props 数量过多；
- 不同页面通过配置拼装；
- 页面逻辑进入组件包；
- 维护成本持续增加。

正确做法：

- 页面模板保留为可复制示例；
- 抽取真正稳定的业务组件；
- 页面级差异留在页面模板。

### 12.2 在业务组件中复制基础组件

问题：

- 样式分叉；
- 状态不一致；
- React / Vue 难以对齐；
- 后续基础组件升级无法同步。

正确做法：

- 优先复用基础组件；
- 能力不足时先报告基础能力缺口；
- 必要时扩展基础组件或提供有限适配层。

### 12.3 把具体业务模块当成通用业务组件

问题：

- 带有过多领域字段；
- 无法跨模块复用；
- API 被具体业务绑死；
- 组件名称和语义模糊。

正确做法：

- 保留业务模块；
- 识别其中稳定重复任务；
- 只向下沉淀真正通用的业务组件。

### 12.4 React 和 Vue 分别维护两套设计规则

问题：

- Token 不一致；
- 状态不一致；
- Docs 不一致；
- 修复无法同步。

正确做法：

- 规则、Token 和契约同源；
- 实现可以框架化；
- 视觉和用户行为必须等价。

### 12.5 把 Skill 当成组件 API 文档副本

问题：

- 重复维护；
- 内容容易过期；
- 路由和 API 混在一起；
- AI 一次读取过多内容。

正确做法：

- 总控 Skill 负责入口和索引；
- 组件 Skill 负责 API；
- references 负责专项规则；
- scripts 负责黄金模板。

## 13. 架构变更评审触发

出现以下情况时，应先进行架构评审：

- 新增公共基础组件；
- 新增业务组件；
- 修改已发布公共 API；
- 把页面模板加入组件包；
- 新增跨包依赖；
- 新增公共 Design Token；
- 新增业务语义 Token；
- 修改 React / Vue 一致性契约；
- 新增大型配置驱动框架；
- 新增依赖；
- 调整 Docs 或 Skill 目录职责；
- 将临时 Demo 升级为黄金模板。

架构评审至少说明：

1. 当前问题；
2. 现有能力为什么不能满足；
3. 新资产所属层级；
4. 依赖方向；
5. 公共 API；
6. React / Vue 影响；
7. Docs 影响；
8. Tests 和 Evaluator；
9. 发布和兼容性风险；
10. 是否存在更小的替代方案。

## 14. 架构符合标准

架构设计或实现满足以下条件时，才能判定为符合 Starbucks Design 架构：

1. 资产层级判断正确；
2. 依赖方向正确；
3. 未重复实现已有基础能力；
4. 未把页面模板误封装为公共万能组件；
5. 业务组件具有稳定任务语义；
6. 业务模块未被错误抽象；
7. React / Vue 契约清晰；
8. Design Token 来源明确；
9. Docs 使用真实实现；
10. Skill 职责没有重复；
11. scripts 只包含经过验证的模板；
12. AI Contract、Evaluator 和 Tests 与资产层级匹配；
13. 未引入未经批准的公共 API、依赖或发布行为。
