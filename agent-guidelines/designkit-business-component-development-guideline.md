# DesignKit 业务组件开发与封装规范

> 用途：作为 Codex、Claude Code、Cursor 等工程代理在 DesignKit 仓库中进行业务组件设计、开发、封装和验证时的统一执行规范。  
> 适用范围：React / Vue 业务组件、Docs、业务配方、AI Skill、Evaluator 与测试。  
> 优先级：仓库中的 `AGENTS.md`、现有工程约束和已发布公共 API 高于本文；如发生冲突，先报告，不得自行覆盖。

---

# 1. 项目背景

DesignKit 是一套企业级设计生成系统。

当前工程链路：

```text
Figma
→ Design Decision
→ React / Vue Component
→ Docusaurus Docs
→ GitHub Package
→ Codex Agent
→ Generated Demo
→ Browser / Evaluator
```

基础组件已经承担通用 UI 能力。业务组件建设的目标不是继续制造更多基础控件，而是把企业 B 端中稳定、重复、高频的业务任务沉淀为：

- 可复用的组合组件
- 可读取的业务规则
- 可执行的组件 API / Schema
- 可直接运行的业务配方
- 可供 AI 调用的 Skill
- 可验证的质量标准

---

# 2. 业务组件的定义

业务组件是：

> 由多个基础组件和业务规则组合而成，用于完成一个稳定、可复用的 B 端业务任务的工程资产。

业务组件必须同时具备：

1. 明确的使用场景
2. 稳定的结构组成
3. 清晰的适用边界
4. 完整的状态与交互规则
5. 可复用的 API 或 Schema
6. React / Vue 可对齐的行为契约
7. 可运行的 Docs Demo
8. AI 选择与生成规则
9. Evaluator 检查项
10. 测试与版本记录

只有“外观组合”而没有稳定业务任务语义的内容，不应被定义为业务组件。

---

# 3. 与其他资产的边界

## 3.1 基础组件

基础组件只提供通用 UI 和交互原语，不承担完整业务任务。

示例：

```text
Button
Input
Select
Table
Drawer
Modal
Tabs
Tree
Checkbox
Tag
```

业务组件必须优先复用基础组件，不得自行重复实现已有原语。

## 3.2 业务组件

业务组件完成稳定、可复用的业务任务。

```text
FilterBar
AdvancedFilter
TableToolbar
BatchActions
FormDrawer
RiskConfirm
ImportWizard
ApprovalActions
```

## 3.3 页面模板

页面模板负责整页结构和区域关系，不应封装进单个业务组件。

```text
标准列表页
左树右表页
详情页
创建编辑页
配置中心页
审批工作台
数据看板
```

## 3.4 业务模块

业务模块带有具体领域语义，由多个业务组件、页面模板和领域规则共同组成。

```text
标签管理
门店管理
商品管理
组织管理
权限管理
```

例如：

```text
标签管理模块
├── FilterBar
├── TableToolbar
├── RowActions
├── BatchActions
├── FormDrawer
├── RiskConfirm
└── ActivityTimeline
```

不要把“标签管理”整体封装成通用业务组件。

---

# 4. 业务组件分类

Docs 左侧菜单只支持两级。

一级菜单按照 B 端用户的真实任务分类，二级菜单放具体业务组件。组件变体、状态、Recipes、API、AI Contract 和 Evaluator 全部放在组件详情页内部。

## 4.1 查询与查看

```text
筛选栏 FilterBar
高级筛选 AdvancedFilter
快速搜索 SearchBar
生效条件 ActiveFilters
保存筛选 SavedFilters
对象摘要 ObjectSummary
对象页头 ObjectHeader
信息详情 DescriptionSection
操作记录 ActivityTimeline
```

## 4.2 新增与编辑

```text
创建编辑抽屉 FormDrawer
创建编辑弹窗 FormModal
分步表单 StepForm
可编辑表格 EditableTable
行内编辑 InlineEdit
字段分组 FieldGroup
表单操作栏 FormActions
草稿保存 DraftSaver
数据变更确认 ChangeConfirm
```

## 4.3 列表与批量操作

```text
表格工具栏 TableToolbar
行操作 RowActions
批量操作 BatchActions
已选数据摘要 SelectionSummary
批量编辑 BulkEdit
列配置 ColumnSettings
列表状态栏 ListStatusBar
跨页选择 CrossPageSelection
```

## 4.4 删除与风险操作

```text
风险确认 RiskConfirm
删除确认 DeleteConfirm
影响范围预览 ImpactPreview
停用与启用 StatusToggle
解绑确认 UnbindConfirm
二次验证 SecondaryVerification
数据冲突 ConflictResolver
错误恢复 ErrorRecovery
```

## 4.5 流程与任务处理

```text
流程状态 ProcessStatus
流程步骤 StepTracker
审批操作 ApprovalActions
审批记录 ApprovalTimeline
任务操作 TaskActions
任务指派 TaskAssignee
任务进度 TaskProgress
转交处理 TransferTask
时效状态 SLAStatus
```

## 4.6 导入与导出

```text
数据导入 ImportWizard
导入模板 TemplateDownload
导入校验 ImportValidation
导入结果 ImportResult
错误数据下载 ErrorDataDownload
数据导出 ExportPanel
导出任务 ExportTask
导出记录 ExportHistory
文件上传 UploadQueue
```

## 4.7 权限与成员

```text
成员管理 MemberManager
成员选择 MemberPicker
角色选择 RoleSelector
权限范围 PermissionScope
数据范围 DataScope
权限矩阵 PermissionMatrix
资源授权 ResourceAuthorization
权限申请 AccessRequest
权限预览 PermissionPreview
```

左侧菜单只展示已经建设或近期确定建设的组件，不得提前放置大量空页面。

---

# 5. 业务组件封装总原则

## 5.1 真实场景优先

业务组件必须来源于真实项目和重复场景。

封装前需要至少回答：

- 该模式在多少个项目或页面中重复出现？
- 稳定重复的是结构、行为还是业务规则？
- 哪些部分是通用能力？
- 哪些部分仍然属于具体业务领域？
- 是否存在两个以上可复用场景？
- 封装后是否能减少重复设计或重复开发？

不得仅凭一张设计稿或单个页面直接抽象为业务组件。

## 5.2 先定义边界，再设计 API

每个业务组件必须先明确：

```text
适用场景
不适用场景
输入
输出
内部状态
外部状态
异常状态
扩展点
禁止扩展的范围
```

不得先堆 Props，再通过大量参数解释组件能做什么。

## 5.3 组合优先，不重复实现基础能力

必须优先复用现有基础组件，例如：

```text
Input
Select
Dropdown
Tag
Checkbox
Button
IconButton
Drawer
Modal
Table
Tree
Form
```

禁止：

- 业务组件内部重新实现基础 Select、Input、Dropdown 等控件
- 复制基础组件样式后形成私有版本
- 绕过基础组件 API 直接操作内部 DOM
- 为业务组件单独建立与全局冲突的 Token
- 在业务组件内部大范围覆盖基础组件类名

如基础组件能力不足，应先报告缺口，再决定：

1. 扩展基础组件
2. 新增通用基础能力
3. 在业务组件中提供有限适配层

不得静默复制或魔改。

## 5.4 使用 Design Token，不写死视觉值

视觉来源优先级：

```text
Figma Variables
→ Design Tokens
→ 基础组件 Token
→ 业务组件语义 Token
→ 局部实现
```

禁止：

- 直接从截图估算颜色、间距、字号和圆角
- 无理由写死颜色、阴影、间距和尺寸
- 大范围覆盖 `.arco-*`、`.ant-*` 或其他基础库类名
- 无条件使用 `!important`
- React、Vue、Docs Preview 分别维护三套不一致样式

业务组件允许新增语义 Token，但必须：

- 有明确业务语义
- 无法由现有 Token 表达
- 在 React / Vue / Docs 中同源
- 有默认值和主题映射
- 有文档说明

## 5.5 行为契约优先于视觉一致

业务组件最重要的是业务行为稳定，不只是截图相似。

必须明确：

- 什么时候进入编辑状态
- 什么时候数据正式生效
- 查询、提交、取消、重置分别意味着什么
- 用户填写值和已生效值是否分离
- 组件由外部控制还是内部管理
- 刷新、回退、关闭、重新打开后如何恢复
- 异步请求失败后如何处理
- 权限不足时如何降级
- 危险操作如何确认
- 中断后如何恢复

## 5.6 不制造万能组件

业务组件应解决一个稳定任务，不应通过不断增加 Props 覆盖所有场景。

出现以下信号时，应拆分组件或抽取子能力：

- Props 数量持续增长且存在大量互斥组合
- 一个组件同时承担查询、编辑、审批、导入等不同任务
- 多个功能只能通过大量布尔值开启
- API 很难解释默认行为
- React 和 Vue 无法保持相同行为
- Docs 需要大量例外才能说明用法
- AI 无法根据场景稳定选择正确配置

应优先拆成：

```text
主组件
+ 子组件
+ Schema
+ Hook / Composable
+ Recipes
```

而不是继续扩展单个巨型组件。

---

# 6. API 设计约束

## 6.1 Schema 优先

字段较多、结构稳定的业务组件，优先采用 Schema 描述，而不是大量 Slot 或重复 JSX。

```ts
type BusinessField = {
  name: string;
  label: string;
  type: string;
  priority?: number;
  width?: number | string;
  options?: unknown[];
  permission?: string | string[];
  visible?: boolean;
  disabled?: boolean;
  required?: boolean;
  help?: string;
  transform?: (value: unknown) => unknown;
  formatDisplay?: (value: unknown) => string;
};
```

Schema 不能变成任意配置协议。每个字段必须有稳定含义和明确边界。

## 6.2 受控与非受控行为

每个存在状态的业务组件必须明确：

- 受控属性
- 非受控默认属性
- 状态变化事件
- 提交事件
- 重置事件
- 外部状态回写方式

禁止同时维护两个无法同步的状态源。

建议命名保持一致：

```text
value / defaultValue / onChange
open / defaultOpen / onOpenChange
expanded / defaultExpanded / onExpandedChange
activeValues / onActiveValuesChange
```

## 6.3 事件表达业务语义

推荐：

```text
onSubmit
onReset
onConfirm
onCancel
onRetry
onImport
onExport
onApprove
onReject
onActiveValuesChange
```

谨慎使用：

```text
onAction
onDo
onHandle
onUpdate
```

事件参数必须包含完成后续业务逻辑所需的最小信息，不得暴露内部实现细节。

## 6.4 默认行为必须明确

每个业务组件必须说明：

- 默认展示什么
- 默认触发方式
- 默认是否自动请求
- 默认值与重置值的关系
- 默认错误处理方式
- 默认操作按钮位置
- 默认权限降级方式

不得依赖调用者猜测。

## 6.5 扩展点有限开放

允许的扩展点应明确列出，例如：

```text
header
footer
extraActions
renderField
renderSummary
empty
error
loading
```

不要为了灵活性将组件内部每个区域都暴露为 Slot。

扩展点过多会破坏：

- 设计一致性
- React / Vue 对齐
- AI 稳定生成
- Evaluator 可验证性

---

# 7. 状态与交互完整性

业务组件至少需要评估以下状态：

```text
Default
Editing
Loading
Success
Empty
Error
Disabled
ReadOnly
Permission Denied
Partial Permission
Dangerous Action
Conflict
Retry
```

并根据组件实际任务选择适用状态。

每个状态必须明确：

- 用户看见什么
- 用户可以做什么
- 用户不能做什么
- 数据是否仍然保留
- 如何恢复
- 是否需要通知外部
- 是否影响页面其他区域

禁止只实现默认和成功状态。

---

# 8. React / Vue 对齐要求

React 与 Vue 版本必须保持一致的：

- 组件名称
- 属性语义
- 默认行为
- 事件语义
- 状态模型
- Schema
- Token
- 视觉结果
- Docs 示例结构
- Evaluator 标准

可以因框架语法不同而调整：

- React callback / Vue emit
- React children / Vue slot
- Hook / Composable
- 类型声明方式

不得出现：

- React 支持某核心功能，Vue 没有
- 同名属性在两个框架含义不同
- 默认值不一致
- 事件触发时机不一致
- 两套组件各自演进

优先建立共享契约，再分别实现框架适配。

---

# 9. 推荐工程结构

必须先适配现有 Monorepo，不得未经确认重新设计仓库结构。

建议逻辑结构：

```text
business-component/
├── shared
│   ├── types
│   ├── schema
│   ├── state
│   ├── utils
│   └── tokens
├── react
│   ├── Component.tsx
│   ├── hooks
│   └── index.ts
├── vue
│   ├── Component.vue
│   ├── composables
│   └── index.ts
├── styles
├── tests
├── demos
├── README
├── SKILL.md
└── evaluator.md
```

原则：

- 类型和业务状态尽可能共享
- React / Vue 只承担框架绑定
- 样式和 Token 同源
- Docs Demo 调用真实组件
- Skill 与 Evaluator 跟随组件版本维护
- 不复制三份业务逻辑

---

# 10. Docs 标准结构

业务组件 Docs 外层继续使用当前 Docusaurus：

```text
顶部：全局配置 / 基础组件 / 业务组件 / 页面模板 / Skills
左侧：两级业务组件菜单
中间：组件文档
右侧：页面目录
技术栈：React / Vue 切换
```

组件详情页统一包含：

```text
01 组件定义
02 最小可运行示例
03 代码演示
04 何时使用 / 何时不用
05 结构组成 Anatomy
06 场景变体 Variants
07 布局规则
08 行为规则
09 状态覆盖
10 业务配方 Recipes
11 API / Schema / Events
12 AI Contract
13 Evaluator Checklist
14 Change Log
```

默认首屏优先展示：

```text
组件定义
最小可运行示例
何时使用
```

其余信息通过 Tab、Accordion、Drawer、锚点目录逐步展开。

Docs 不应成为静态规范截图集合。

每个主要场景 Demo 需要包含：

```text
案例标题
一句适用说明
可操作 Demo
Show code
```

---

# 11. AI Contract 标准

每个业务组件必须提供 `SKILL.md` 或等价 AI Contract，至少包含：

## 11.1 Trigger

明确 AI 在什么场景应优先使用该组件。

## 11.2 Do not use

明确哪些场景不能使用，以及应替换为什么能力。

## 11.3 Selection priority

```text
1. 已有页面模板
2. 已有业务模块
3. 已有业务组件
4. 已有基础组件组合
5. 官方原生组件
6. 最后才新增实现
```

## 11.4 Generation Rules

明确：

- 必须加载哪些 Schema 或领域规则
- 默认使用什么变体
- 状态如何补齐
- 允许哪些扩展点
- 禁止生成什么结构
- 如何处理权限和错误
- 如何处理危险动作

## 11.5 Known Pitfalls

记录 AI 最容易生成错误的地方。

## 11.6 References

只按任务加载需要的文档，不得要求 AI 一次读取全部组件资料。

---

# 12. Evaluator 标准

Evaluator 必须检查实际交付结果，而不是生成器的意图。

证据至少覆盖：

```text
页面结构
视觉截图
关键操作
规则符合度
```

组件级结果分为：

## PASS

满足设计、行为、工程和可访问性要求。

## WARN

结果可继续使用，但存在建议优化项。

## BLOCK

存在影响业务正确性、数据安全、权限、状态感知或可恢复性的错误，必须修正。

每个组件的 `evaluator.md` 需要包含：

```text
检查项
证据来源
Pass 条件
Warn 条件
Block 条件
问题应回流的位置
```

问题应精确回流到：

```text
Spec
Domain
Design Decision
Component API
Template
Skill
```

不得只给出“重新生成”建议。

---

# 13. 测试要求

## 13.1 单元测试

覆盖：

- Schema 转换
- 默认值
- 状态变化
- 权限判断
- 重置
- 数据格式化
- 异常处理

## 13.2 交互测试

覆盖：

- 打开 / 关闭
- 提交 / 取消
- 查询 / 重置
- 展开 / 收起
- 选择 / 取消选择
- 加载 / 错误 / 重试
- 危险操作确认
- 权限不足

## 13.3 React / Vue 契约测试

验证：

- 默认值一致
- 事件时机一致
- 状态变化一致
- Schema 结果一致
- 关键视觉结果一致

## 13.4 浏览器检查

至少检查：

- 横向溢出
- 文字裁切
- 键盘访问
- Focus 状态
- 弹层遮挡
- Resize
- 窄容器降级
- Loading / Empty / Error
- 关键点击 smoke test

## 13.5 视觉检查

对主要变体和关键状态生成截图。

禁止只检查默认状态。

---

# 14. 可访问性要求

业务组件必须：

- 支持键盘操作
- 有明确 Focus 状态
- 使用语义化元素
- 图标按钮提供可访问名称
- 不只依赖颜色表达状态
- 弹窗和抽屉正确管理焦点
- 错误信息可被辅助技术感知
- 支持 `prefers-reduced-motion`
- 保证基础文字和交互对比度

---

# 15. 发布与变更约束

Codex 不得在未明确授权时：

- 删除已有公共 API
- 修改已发布属性含义
- 更改默认行为
- 批量重构基础组件
- 自动发布 npm 包
- 自动创建正式版本
- 覆盖现有文档内容
- 引入大型新依赖

每次改动需要输出：

```text
修改文件
新增能力
行为变化
API 变化
视觉变化
测试结果
兼容性风险
未解决问题
建议版本号
```

破坏性改动必须单独报告。

---

# 16. 业务组件封装工作流

## Phase 0：只读检查

Codex 首先：

1. 阅读仓库根目录及相关目录的 `AGENTS.md`
2. 识别 Monorepo 结构
3. 查找现有基础组件
4. 查找 React / Vue 实现方式
5. 查找 Token 和样式入口
6. 查找 Docs Demo 规范
7. 查找测试、构建和发布命令
8. 查找相似业务实现
9. 列出可复用资产和缺口
10. 不修改任何代码

输出：

```text
仓库结构摘要
相关文件
可复用基础组件
现有约束
可能冲突
缺失信息
建议实现路径
```

## Phase 1：定义业务契约

编码前先产出：

```text
组件任务
适用场景
不适用场景
输入
输出
状态模型
Schema
API
事件
扩展点
危险边界
React / Vue 对齐方案
Docs 场景
Evaluator 检查项
```

如业务边界不清晰，不得自行猜测。

## Phase 2：实现最小闭环

优先完成：

```text
真实组件
React
Vue
Token
基础状态
最小 Demo
单元测试
AI Contract
Evaluator
```

不要一次实现所有高级能力。

## Phase 3：增加场景变体

每个变体必须来源于真实场景，并明确：

```text
与默认变体的差异
为什么不能通过基础配置解决
是否需要新增 API
是否影响 React / Vue 对齐
是否影响 Evaluator
```

## Phase 4：Docs 与 Recipes

Docs 调用真实组件，不得维护单独静态仿真版本。

至少提供：

```text
最小示例
一个典型业务示例
一个异常或边界示例
API
AI Contract
Evaluator
```

## Phase 5：验证和交付

执行仓库已有：

```text
lint
typecheck
unit test
build
docs build
browser smoke
```

输出完整自测结果，不得只说“已完成”。

---

# 17. 第一批建议组件

## P0

```text
FilterBar
AdvancedFilter
ActiveFilters
TableToolbar
BatchActions
RowActions
FormDrawer
RiskConfirm
```

## P1

```text
ObjectHeader
ObjectSummary
ActivityTimeline
StepForm
ImportWizard
ImportResult
ApprovalActions
ApprovalTimeline
```

第一条完整闭环建议从 `FilterBar` 开始，再建设 `AdvancedFilter` 和 `ActiveFilters`。

---

# 18. FilterBar 专项约束

## 18.1 使用条件

优先使用 FilterBar：

- 页面主体是列表或表格
- 高频条件通常不超过 6 个
- 条件相对稳定
- 用户需要直接看到筛选范围
- 条件之间主要是简单并列关系

## 18.2 不适用

以下场景改用 AdvancedFilter 或 QueryBuilder：

- 条件数量很多
- 存在动态添加条件
- 存在 AND / OR 或条件分组
- 需要保存和复用筛选方案
- 条件需要跨模块共享

## 18.3 推荐 API

```ts
type FilterBarProps = {
  fields: FilterField[];
  columns?: 2 | 3 | 4;
  collapsible?: boolean;
  defaultVisibleCount?: number;
  submitMode?: 'manual' | 'change';
  value?: Record<string, unknown>;
  defaultValue?: Record<string, unknown>;
  activeValues?: Record<string, unknown>;
  showReset?: boolean;
  onValuesChange?: (values: Record<string, unknown>) => void;
  onSubmit?: (values: Record<string, unknown>) => void;
  onReset?: (values: Record<string, unknown>) => void;
  onExpandedChange?: (expanded: boolean) => void;
  onActiveValuesChange?: (values: Record<string, unknown>) => void;
};
```

```ts
type FilterField = {
  name: string;
  label: string;
  type: string;
  options?: unknown[];
  width?: number | string;
  priority?: number;
  permission?: string | string[];
  required?: boolean;
  disabled?: boolean;
  formatActiveValue?: (value: unknown) => string;
};
```

## 18.4 必须满足

- 高频条件默认展示
- 低频条件进入展开区域
- 展开和收起不丢失填写值
- 查询、重置和展开操作位置稳定
- 区分填写值与已生效值
- 隐藏区域有生效条件时显示数量或摘要
- 重置行为与默认值定义一致
- 支持 Loading、Empty、Error
- 支持权限导致的字段隐藏或禁用

## 18.5 BLOCK

- 隐藏条件生效但没有提示
- 收起后清空隐藏字段
- 查询按钮在展开前后大幅跳动
- 重置没有恢复约定默认值
- React 与 Vue 查询触发时机不同
- 字段 Schema 缺失时自行猜测业务字段

---

# 19. AdvancedFilter 专项约束

AdvancedFilter 不能只是“更大的 FilterBar”。

它承担：

```text
工具栏入口
高级条件面板
条件应用
生效条件回显
条件管理
可选的保存方案
```

建议分级：

## Level 1：Expandable Filter

- 更多字段
- 展开 / 收起
- 不支持复杂逻辑
- 可由 FilterBar 的 collapsible 能力承担

## Level 2：AdvancedFilter

- 动态条件
- 已选条件回显
- 条件数量提示
- 可选保存方案
- 独立组件

## Level 3：QueryBuilder

- AND / OR
- 条件组
- 嵌套逻辑
- 专业查询场景
- 独立组件

不得通过向 FilterBar 持续增加 Props 覆盖 Level 2 和 Level 3。

FilterBar、AdvancedFilter 和 ActiveFilters 应共享：

```text
字段 Schema
值格式
生效状态
条件格式化
权限逻辑
URL 同步能力
```

---

# 20. Definition of Done

## 设计

- [ ] 来源于真实重复场景
- [ ] 定义适用和不适用边界
- [ ] 使用现有 Token
- [ ] 结构、变体、状态明确
- [ ] 与 Figma 设计资产对应

## 工程

- [ ] 优先复用基础组件
- [ ] 无重复实现基础控件
- [ ] 无大范围样式覆盖
- [ ] 无无条件 `!important`
- [ ] API 边界清晰
- [ ] React / Vue 行为一致
- [ ] 类型完整
- [ ] 无明显 Prop 爆炸

## 状态

- [ ] 默认
- [ ] 加载
- [ ] 成功
- [ ] 空
- [ ] 错误
- [ ] 禁用 / 只读
- [ ] 权限
- [ ] 关键边界状态

## Docs

- [ ] 最小示例
- [ ] 典型业务示例
- [ ] 异常或边界示例
- [ ] 何时使用 / 何时不用
- [ ] Anatomy
- [ ] Variants
- [ ] API
- [ ] Recipes
- [ ] AI Contract
- [ ] Evaluator
- [ ] Change Log

## 测试

- [ ] 单元测试
- [ ] 交互测试
- [ ] React / Vue 契约测试
- [ ] 浏览器 smoke
- [ ] 主要状态截图
- [ ] 键盘与可访问性检查
- [ ] 构建通过

---

# 21. 可直接投喂 Codex 的主指令

```text
你现在正在 DesignKit 企业级 Design System Monorepo 中建设业务组件。

请严格遵循以下原则：

1. 先阅读仓库根目录和相关目录下的 AGENTS.md。
2. 先进行只读检查，不要立即修改代码。
3. 识别现有 React、Vue、Token、Docs、测试和发布结构。
4. 优先复用已有基础组件，不得重复实现 Input、Select、Button、Drawer、Modal、Table 等基础能力。
5. Figma Variables、Design Tokens 和现有基础组件样式是视觉来源，不得仅凭截图写死视觉值。
6. 禁止大范围覆盖基础库类名，禁止无条件使用 !important。
7. 业务组件必须完成一个稳定业务任务，不得制造万能组件。
8. 先定义适用场景、不适用场景、输入、输出、状态、API、事件和扩展边界，再开始编码。
9. React 与 Vue 必须保持相同的属性语义、默认行为、事件时机、状态模型、Schema、Token 和关键视觉结果。
10. Docs 必须调用真实组件，不得单独制作与组件脱离的静态 Demo。
11. 每个组件必须补充 AI Contract 和 Evaluator 检查项。
12. 不得未经授权删除公共 API、修改默认行为、引入大型依赖或发布正式版本。

本次目标组件：
{{COMPONENT_NAME}}

所属分类：
{{CATEGORY}}

已知业务场景：
{{BUSINESS_SCENARIOS}}

相关 Figma / 规范：
{{FIGMA_OR_SPEC}}

请按以下阶段工作。

阶段 A：只读分析

输出：
1. 仓库结构摘要
2. 相关 AGENTS.md 约束
3. 可复用基础组件
4. 现有相似实现
5. React / Vue 现有模式
6. Token 和样式来源
7. Docs Demo 结构
8. 测试、构建和发布命令
9. 当前信息缺口
10. 建议实现方案
11. 预计修改文件

阶段 A 不修改代码。

阶段 B：组件契约

输出：
1. 组件任务定义
2. 适用场景
3. 不适用场景
4. 组件边界
5. Anatomy
6. 状态模型
7. Schema
8. React API
9. Vue API
10. 事件
11. 默认行为
12. 扩展点
13. Token
14. Docs 场景
15. AI Contract
16. Evaluator Pass / Warn / Block
17. 测试计划

不得在契约不清楚时自行猜测业务规则。

阶段 C：最小闭环实现

只实现最小可用版本，包含：
- 共享类型与状态逻辑
- React 实现
- Vue 实现
- 同源样式和 Token
- 最小 Docs Demo
- 单元测试
- 关键交互测试
- AI Contract
- Evaluator

不要一次实现全部高级变体。

阶段 D：验证

执行仓库已有：
- lint
- typecheck
- test
- build
- docs build
- browser smoke

并检查：
- 横向溢出
- 文字裁切
- Focus
- 键盘操作
- Loading
- Empty
- Error
- Permission
- 主要交互
- React / Vue 行为一致性

最终交付报告：
1. 修改文件
2. 新增能力
3. API
4. 状态和行为
5. Docs 示例
6. AI Contract
7. Evaluator
8. 测试结果
9. React / Vue 一致性结果
10. 兼容性风险
11. 未解决问题
12. 下一步建议
13. 建议版本号

如发现基础组件能力缺口，请先报告，不得在业务组件内部复制实现。
```

---

# 22. FilterBar 可直接使用的 Codex 任务输入

```text
本次目标组件：
FilterBar

所属分类：
业务组件 / 查询与查看

业务任务：
在列表或表格上方展示一组高频、稳定、直接可见的筛选条件，并管理填写值、已生效值、查询、重置、展开与收起之间的状态关系。

适用场景：
- 页面主体为列表或表格
- 高频条件通常不超过 6 个
- 条件相对稳定
- 用户需要持续看到筛选条件
- 条件之间主要是简单并列

不适用场景：
- 动态添加条件
- AND / OR 组合
- 条件组和嵌套逻辑
- 保存和共享筛选方案
- 大量低频条件

必须复用：
Input、Select、DatePicker、Cascader、TreeSelect、UserPicker、Button、Form 等现有基础组件。

必须支持：
- fields Schema
- 2 / 3 / 4 列布局
- 手动查询与自动查询
- 展开与收起
- 默认可见字段数量
- 查询
- 重置
- 填写值和已生效值分离
- 隐藏条件生效提示
- 权限隐藏和禁用
- Loading、Empty、Error
- React / Vue 行为一致

必须提供 Docs：
- 基础用法
- 可展开筛选
- 隐藏条件生效
- 内容容器内筛选
- 页面顶部筛选
- 自动查询
- 查询结果联动
- 权限字段
- API
- AI Contract
- Evaluator

BLOCK：
- 隐藏条件生效但无提示
- 收起后丢失填写值
- 查询按钮展开前后明显跳动
- 重置行为不明确
- React / Vue 触发时机不一致
- 为缺失的业务字段自行编造 Schema
```
