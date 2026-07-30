# Starbucks Design 任务路由规范

## 1. 文档目的

本文用于指导 Codex、Claude Code、Cursor 等工程代理，在 Starbucks Design / DesignKit 仓库中接到任务后，正确完成以下判断：

- 当前任务属于哪一种类型；
- 应读取哪些规则、代码和组件文档；
- 应选择 React、Vue、双端还是 Preview；
- 应修改基础组件、业务组件、页面模板、Docs 还是 Skill；
- 是否需要 Figma、Design Token、AI Contract、Evaluator、Tests；
- 是否允许新增公共 API、依赖、包导出或发布动作；
- 最终应执行哪些验证；
- 应如何报告完成状态和未验证风险。

本文是任务执行路由表，不重复维护完整组件 API，也不替代：

- 根目录及局部目录的 `AGENTS.md`；
- `agent-guidelines/` 中的专项规范；
- `skills/starbucks-design/SKILL.md`；
- `skills/starbucks-design/references/architecture.md`；
- React / Vue 组件 Skill；
- 已发布组件包类型定义；
- 最新评审通过的 Figma 设计资产；
- 实际测试、构建和浏览器验证结果。

---

## 2. 路由总原则

所有任务都必须先经过以下流程：

```text
理解用户目标
↓
识别任务对象
↓
识别任务类型
↓
确认框架与交付形式
↓
读取最高优先级规则
↓
读取目标实现与可复用资产
↓
识别架构边界和风险
↓
制定文件白名单与验证计划
↓
实施
↓
验证与状态报告
```

禁止以下工作方式：

```text
看到截图
→ 直接写 CSS

看到“做一个页面”
→ 直接从零生成完整页面

看到组件名
→ 只读取单个组件文件，不检查 React / Vue、Docs、Tests

看到样式不生效
→ 直接增加选择器层级或 !important

看到相似页面
→ 直接封装成公共万能组件

看到已有 Demo
→ 未验证就复制进 scripts/
```

---

## 3. 第一步：识别任务对象

先判断用户主要在操作哪一类对象。

### 3.1 设计资产

包括：

- Figma 组件；
- Figma Variables；
- 设计稿变体；
- Design Token；
- 视觉规范；
- 设计决策；
- 组件状态定义。

### 3.2 基础组件

包括：

```text
Button
Input
Select
Checkbox
Radio
Switch
Tag
DatePicker
TimePicker
Cascader
TreeSelect
Table
Pagination
Tabs
Modal
Drawer
Dropdown
Tooltip
Popover
Trigger
Form
Descriptions
```

### 3.3 业务组件

包括：

```text
FilterBar
TableToolbar
BatchActions
SelectionSummary
ColumnSettings
FormDrawer
RiskConfirm
ActivityTimeline
ImportWizard
ExportPanel
```

### 3.4 页面模板

包括：

```text
基础列表
筛选列表
卡片列表
标签管理
左树右表
树表格
基础表单
分组表单
分步表单
基础详情
数据详情
Dashboard
登录页
结果页
异常页
```

### 3.5 业务模块

包括：

```text
标签管理
门店管理
活动管理
权限管理
商品管理
组织管理
即时零售配置
```

### 3.6 文档与知识资产

包括：

- Docs 页面；
- Demo；
- 组件说明；
- AI Contract；
- Evaluator；
- Skill；
- references；
- scripts；
- Changelog。

### 3.7 工程与发布资产

包括：

- Tests；
- Build；
- Lint；
- Typecheck；
- Package Export；
- Version；
- Release；
- Git Branch；
- Commit；
- Pull Request。

---

## 4. 第二步：识别任务类型

任务对象确定后，再判断用户要求执行什么动作。

## 4.1 新建

典型表达：

- 新增一个组件；
- 新建一个页面模板；
- 增加一个 Skill；
- 建立一个业务能力；
- 创建一个 Demo。

必须先判断：

- 是否已有相同或近似能力；
- 应归属哪一层；
- 是否需要公共 API；
- 是否需要 React / Vue 双端；
- 是否存在两个以上复用场景；
- 是否应先做页面级组合，而不是公共封装。

## 4.2 优化

典型表达：

- 调整样式；
- 对齐 Figma；
- 优化交互；
- 统一 React / Vue；
- 收敛间距和视觉；
- 优化响应式。

必须先确认：

- 现有行为是否需要保持；
- 优化属于基础组件还是布局层；
- 是否涉及 Token；
- 是否影响 Popup / Portal；
- 是否会破坏公共 API；
- 是否需要同步另一框架和 Docs。

## 4.3 修复

典型表达：

- 样式不生效；
- 页面报错；
- 组件行为异常；
- 构建失败；
- React / Vue 表现不一致；
- Docs 无法渲染；
- 浮层错位。

必须先定位根因，禁止直接绕过问题。

## 4.4 生成

典型表达：

- 生成 React 页面；
- 生成 Vue 页面；
- 做一个 HTML Demo；
- 根据需求搭建页面；
- 根据设计稿生成代码。

必须确认：

- 交付形式；
- 框架；
- 是否需要单文件 Preview；
- 是否存在黄金模板；
- 页面所需组件；
- 设计决策；
- 是否需要真实工程代码。

## 4.5 审查

典型表达：

- 检查 Codex 代码；
- 评估代码质量；
- 看是否符合设计系统；
- 检查是否可发布；
- 检查 React / Vue 一致性；
- 检查是否正确复用。

必须使用证据分级，不得只给主观评价。

## 4.6 重构

典型表达：

- 拆分组件；
- 合并重复逻辑；
- 优化目录；
- 调整架构；
- 抽取公共能力。

重构必须先确认：

- 用户是否明确要求；
- 是否会扩大修改范围；
- 是否影响公共 API；
- 是否存在无关本地改动；
- 是否需要版本升级；
- 是否有更小的修复方案。

## 4.7 发布

典型表达：

- 提交代码；
- 推送 GitHub；
- 创建 PR；
- 升级版本；
- 发布 npm 包；
- 部署 Docs。

只有用户明确要求时才能进入发布路由。

---

## 5. 第三步：选择框架与交付形式

## 5.1 React 工程代码

选择条件：

- 用户明确指定 React；
- 目标文件位于 React 包；
- 当前任务只处理 React；
- 需要 React 类型、Hooks、JSX 或 TSX；
- 需要使用 `@sbux/starbucks-design-react`。

必须读取：

```text
skills/starbucks-design-react/SKILL.md
```

并按需读取实际组件 reference。

## 5.2 Vue 工程代码

选择条件：

- 用户明确指定 Vue；
- 目标文件位于 Vue 包；
- 当前任务只处理 Vue；
- 需要 Vue SFC、Composition API、Props、Events 或 Slots；
- 需要使用 `@sbux/starbucks-design-vue`。

必须读取：

```text
skills/starbucks-design-vue/SKILL.md
```

并按需读取实际组件 reference。

## 5.3 React + Vue 双端

以下任务默认考虑双端：

- 公共基础组件；
- 公共业务组件；
- 共享 Design Token；
- 公共样式；
- 双框架页面模板；
- 组件库发布能力；
- React / Vue 一致性修复；
- Docs 双框架 Demo。

除非用户明确限定单端。

## 5.4 React Preview

选择条件：

- 用户需要单 HTML；
- 不希望安装 Node.js；
- 需要双击打开；
- 需要快速给产品经理或设计师查看；
- 用户明确要求 React CDN 预览。

读取：

```text
skills/starbucks-design-react-preview/SKILL.md
```

并同时读取对应 React 组件 reference。

## 5.5 Vue Preview

选择条件与 React Preview 相同，但用户指定 Vue 或当前上下文属于 Vue。

读取：

```text
skills/starbucks-design-vue-preview/SKILL.md
```

并同时读取对应 Vue 组件 reference。

## 5.6 用户未指定框架

按以下顺序判断：

1. 当前目标目录；
2. 当前文件类型；
3. 用户前文已经确定的框架；
4. 仓库内最接近实现；
5. 是否要求双端一致；
6. 是否要求零环境 HTML；
7. 项目既有约定。

只有当选择框架会显著改变交付结果且无法从上下文判断时，才提出澄清问题。

---

## 6. 规则读取顺序

所有任务先读取：

```text
1. 根目录 AGENTS.md
2. 距离目标文件最近的局部 AGENTS.md
3. skills/starbucks-design/SKILL.md
```

然后按任务类型继续读取。

---

## 7. 路由 A：基础组件样式调优

## 7.1 触发条件

当任务涉及：

- Arco Design 基础组件二次封装；
- Figma 视觉对齐；
- 组件尺寸、边框、圆角、颜色、字体、间距；
- Hover、Focus、Disabled、Error；
- React / Vue 基础组件视觉一致；
- Popup、Portal、Trigger；
- CSS 权重、作用域、加载顺序；
- `!important`；
- Design Token；
- 输入类、下拉类、选择类组件统一。

## 7.2 必读文件

```text
AGENTS.md
agent-guidelines/designkit-base-component-style-optimization-guideline.md
skills/starbucks-design/references/architecture.md
skills/starbucks-design/references/task-routing.md
```

涉及布局或选型时，再读：

```text
skills/starbucks-design/references/design-decisions.md
```

## 7.3 必查资产

- React 组件实现；
- Vue 组件实现；
- React 样式；
- Vue 样式；
- 共享 Token；
- Arco 原生 DOM 和类名；
- Docs Demo；
- Tests；
- 组件被业务组件和模板引用的位置；
- Popup / Portal 挂载方式；
- Figma Variables 和主要变体。

## 7.4 实施原则

```text
Figma Variables
→ Design Token
→ 已优化基础组件能力
→ 当前组件公共样式
→ 当前组件局部样式
→ Arco 原生样式
```

不得：

- 在复合组件中复制 Input、Select、Tag 等完整样式；
- 使用无作用域 `.arco-*` 覆盖；
- 未定位原因就加 `!important`；
- 只修 React 不检查 Vue；
- 只修默认态不检查交互状态；
- 只看截图不检查实际 DOM。

## 7.5 验证

至少根据任务检查：

- Default；
- Hover；
- Focus；
- Active；
- Disabled；
- Error；
- Size；
- Prefix / Suffix；
- Clear；
- Popup；
- Portal；
- React / Vue；
- Docs；
- Build；
- 样式回归测试。

---

## 8. 路由 B：新业务组件开发

## 8.1 触发条件

当任务要求：

- 新增稳定业务能力；
- 新增 FilterBar、TableToolbar 等；
- 定义 Schema、状态模型、事件；
- React / Vue 双端封装；
- 建设 Docs、AI Contract、Evaluator、Tests。

## 8.2 必读文件

```text
AGENTS.md
agent-guidelines/designkit-business-component-development-guideline.md
skills/starbucks-design/references/architecture.md
skills/starbucks-design/references/task-routing.md
skills/starbucks-design/references/design-decisions.md
```

FilterBar 任务再读：

```text
agent-guidelines/designkit-filterbar-codex-master-prompt.md
```

如果业务组件包含视觉调优或 Arco 覆盖，再读：

```text
agent-guidelines/designkit-base-component-style-optimization-guideline.md
```

## 8.3 开发前必须定义

```text
业务任务
适用场景
不适用场景
输入
输出
内部状态
外部状态
异常状态
受控与非受控模式
事件
扩展点
禁止扩展范围
基础组件依赖
React / Vue 契约
发布与兼容性影响
```

## 8.4 封装门槛

至少满足：

- 两个以上可复用场景；
- 重复的是稳定任务或行为；
- 可定义公共 API；
- 不绑定具体业务模块；
- 不需要大量互斥 Props；
- 能由现有基础组件组合；
- 封装后能减少重复设计与开发。

不满足时，优先做页面模板或局部组合。

## 8.5 交付资产

通常包括：

- React 实现；
- Vue 实现；
- Types / Schema；
- 样式；
- Docs；
- 真实 Demo；
- API；
- AI Contract；
- Evaluator；
- Tests；
- Changelog；
- 必要时版本策略。

## 8.6 验证

重点检查：

- 状态模型；
- 查询、重置、提交、取消；
- 受控与非受控；
- Loading、Empty、Error；
- Disabled、Permission；
- React / Vue 事件顺序；
- Docs 使用真实组件；
- API 向后兼容；
- Build 和 Tests。

---

## 9. 路由 C：已有业务组件视觉优化

## 9.1 触发条件

- 已有业务组件行为正确；
- 只需视觉、布局或响应式优化；
- 需要对齐 Figma；
- 需要修复内部基础组件样式；
- 需要 React / Vue 视觉一致。

## 9.2 必读文件

```text
agent-guidelines/designkit-business-component-development-guideline.md
agent-guidelines/designkit-base-component-style-optimization-guideline.md
skills/starbucks-design/references/architecture.md
skills/starbucks-design/references/task-routing.md
```

## 9.3 优先级

```text
现有公共 API
→ 现有业务行为
→ 状态与事件契约
→ Figma Variables
→ Design Token
→ 已优化基础组件能力
→ 业务组件布局样式
→ Arco 默认样式
```

## 9.4 根因归属判断

如果问题发生在业务组件内部，先判断：

```text
基础组件本身有问题
→ 修基础组件

基础组件正常，但组合布局有问题
→ 修业务组件布局

Docs 容器造成问题
→ 修 Docs

Popup / Portal 作用域问题
→ 修浮层挂载或专用作用域

React / Vue DOM 差异
→ 分别适配，但保持同源 Token
```

不得把基础组件问题用业务组件私有覆盖掩盖。

---

## 10. 路由 D：页面模板开发

## 10.1 触发条件

- 做一个完整列表页；
- 做标签管理页；
- 做表单页；
- 做详情页；
- 做 Dashboard；
- 做登录页；
- 做结果或异常页；
- 将多个基础组件和业务组件组合成页面。

## 10.2 必读文件

```text
AGENTS.md
skills/starbucks-design/references/architecture.md
skills/starbucks-design/references/task-routing.md
skills/starbucks-design/references/design-decisions.md
```

只在以下情况读取专项 guideline：

```text
修改基础组件
→ 基础组件调优 guideline

新增或修改业务组件
→ 业务组件 guideline
```

## 10.3 开发前必须确认

- 页面模板路由；
- 当前占位位置；
- React Demo 挂载方式；
- Vue Demo 挂载方式；
- 是否有全屏预览；
- 是否支持源码查看和复制；
- 最近似模板；
- 可复用基础组件；
- 可复用业务组件；
- 页面是否可以不修改组件包；
- 页面级状态；
- 响应式和溢出策略。

## 10.4 页面模板默认规则

- 是组合示例，不是公共万能组件；
- 默认不进入包导出；
- 使用本地 Mock；
- 页面级请求模拟留在模板；
- 不复制业务组件内部逻辑；
- React / Vue 可见行为等价；
- Docs 必须渲染真实组件；
- 宽表格只在表格区域内部滚动；
- 页面自身不出现异常横向滚动。

## 10.5 页面模板常见结构

### 基础列表

```text
PageHeader
+ Optional Description
+ TableToolbar
+ Table
+ Pagination
```

### 筛选列表

```text
PageHeader
+ FilterBar
+ TableToolbar
+ SelectionSummary
+ Table
+ Pagination
```

### 标签管理

```text
PageHeader
+ Left Tag Group / Category
+ Right FilterBar
+ TableToolbar
+ Table
+ Pagination
+ FormDrawer / Modal
```

### 基础表单

```text
PageHeader
+ Form Container
+ Form Sections
+ Form Actions
```

### 详情页

```text
PageHeader
+ Status / Summary
+ Descriptions or Cards
+ Tabs or Sections
+ Activity Timeline
```

### Dashboard

```text
PageHeader
+ Global Filters
+ KPI Cards
+ Trend Charts
+ Dimension Analysis
+ Detail Table
```

## 10.6 验证

至少检查：

- React Preview；
- Vue Preview；
- 正常态；
- Loading；
- Empty；
- Error；
- Query；
- Reset；
- Pagination；
- Selection；
- Batch Actions；
- Modal / Drawer；
- Column Settings；
- 窄屏；
- 页面溢出；
- 表格内部滚动；
- Popup / Portal；
- 控制台错误。

---

## 11. 路由 E：设计决策

## 11.1 触发条件

- 选择页面结构；
- 选择 Modal、Drawer、侧栏或新页面；
- 确定主次操作位置；
- 确定筛选和工具栏布局；
- 确定表格批量操作；
- 确定详情页分组；
- 确定 Dashboard 信息层级；
- 确定响应式策略。

## 11.2 必读文件

```text
skills/starbucks-design/references/design-decisions.md
```

同时检查仓库内最接近的已有模式。

## 11.3 输出格式

设计决策输出至少包括：

```text
任务目标
用户主要动作
内容体量
与当前主体的关联性
操作频率
风险等级
推荐方案
不推荐方案
选择理由
适用边界
异常与响应式考虑
```

不得只输出“建议用 Drawer”而不说明依据。

---

## 12. 路由 F：React / Vue 工程代码生成

## 12.1 触发条件

- 用户明确要求代码；
- 需要组件 API；
- 需要 TSX 或 Vue SFC；
- 需要真实工程集成。

## 12.2 路由步骤

```text
识别页面或组件所需能力
↓
读取 React 或 Vue Skill
↓
只读取实际使用组件的 reference
↓
确认 import、Props、Events、Slots、Types
↓
读取设计决策和最近似模板
↓
生成工程代码
↓
运行类型检查、测试和构建
```

## 12.3 禁止事项

- 根据 Ant Design 习惯猜 Starbucks API；
- React 中使用 Vue API；
- Vue 中套用 React Hooks；
- Form.Item 使用错误字段名；
- 图标从错误入口导入；
- 忽略受控与非受控约定；
- 使用不存在的组件或 Props；
- 为了演示绕过真实组件。

---

## 13. 路由 G：零环境 HTML Preview

## 13.1 触发条件

- 无 Node.js；
- 单文件 HTML；
- 双击预览；
- 快速发给其他角色；
- CDN 运行。

## 13.2 路由步骤

```text
确定 React Preview 或 Vue Preview
↓
读取对应 Preview Skill
↓
读取开发版组件 Skill 的实际组件 reference
↓
读取 design-decisions.md
↓
生成完整 HTML
↓
检查 CDN 顺序、全局对象和组件 API
↓
浏览器打开验证
```

## 13.3 Preview 限制

Preview 适合：

- 快速演示；
- 需求沟通；
- 无环境预览；
- 单文件交付。

Preview 不自动等于：

- 工程级代码；
- 可发布组件；
- 正式页面模板；
- React / Vue 包实现；
- 已通过完整测试的黄金模板。

---

## 14. 路由 H：质量审查

## 14.1 触发条件

- 审查 Codex 代码；
- 检查设计系统一致性；
- 检查发布准备度；
- 检查代码质量；
- 检查 React / Vue 对齐；
- 检查样式覆盖；
- 检查架构越界。

## 14.2 审查维度

### 架构

- 资产层级是否正确；
- 是否重复封装；
- 是否错误创建万能组件；
- 依赖方向是否正确；
- 页面模板是否进入包导出。

### API

- 公共 API 是否变化；
- React / Vue API 是否等价；
- Props、Events、Slots 是否真实存在；
- 是否破坏兼容性。

### 视觉

- 是否使用 Token；
- 是否无理由硬编码；
- 是否符合 Figma；
- 状态是否完整；
- React / Vue 是否一致。

### 样式安全

- 是否存在宽泛 `.arco-*`；
- 是否滥用 `!important`；
- 是否正确处理 Popup / Portal；
- 是否存在样式加载顺序风险；
- 是否污染 Docs 或其他组件。

### 交互

- Query、Reset、Submit、Cancel；
- Loading、Empty、Error；
- Permission；
- Pagination；
- Selection；
- Batch Actions；
- 异步失败；
- 中断与恢复。

### Docs 与测试

- 是否使用真实组件；
- 是否存在占位结构；
- 是否有必要测试；
- 是否运行构建；
- 是否有浏览器证据；
- 是否把未验证项描述为完成。

## 14.3 证据等级

```text
CONFIRMED
有代码、测试、构建或浏览器证据

CONDITIONAL
实现存在，但缺少部分必要验证

PARTIAL
仅完成部分功能或部分框架

UNVERIFIED
缺少足够证据

BLOCKED
受到环境、依赖、权限或外部条件阻塞
```

## 14.4 审查输出

```text
结论
证据
主要问题
风险等级
影响范围
推荐修复
必要验证
完成状态
```

---

## 15. 路由 I：Skill 与 references 建设

## 15.1 触发条件

- 新增 Skill；
- 更新总控规则；
- 新增 reference；
- 新增黄金模板；
- 更新 AI Contract；
- 更新 Evaluator。

## 15.2 目录职责

```text
SKILL.md
→ 触发条件、总控路由、总体规则

references/
→ 专项规则和设计知识

scripts/
→ 经过验证的黄金模板

组件 Skill
→ API 和框架用法

Preview Skill
→ 零环境运行方式
```

## 15.3 禁止重复

不得在多个文件中分别维护同一套完整内容。

推荐方式：

```text
SKILL.md
引用 reference

reference
引用组件 Skill

Preview Skill
引用开发版组件 Skill

scripts
引用 reference 和真实组件
```

## 15.4 scripts 进入门槛

只有同时满足以下条件，才能放入 `scripts/`：

- 使用真实 Starbucks Design 组件；
- 结构已评审；
- 交互完整；
- React / Vue 达到目标一致性；
- 类型检查通过；
- 测试通过；
- 构建通过；
- Docs 正常；
- 浏览器验证完成；
- 没有临时占位和明显硬编码。

---

## 16. 路由 J：Git、PR 与发布

## 16.1 触发条件

只有用户明确要求：

- 创建分支；
- Commit；
- Push；
- PR；
- 修改版本；
- 发布；
- 部署；
- Release。

## 16.2 发布前检查

- 工作区状态；
- 无关改动；
- 文件白名单；
- 测试；
- 构建；
- Docs；
- 版本策略；
- Changelog；
- 公共 API；
- 包导出；
- 锁文件；
- 发布权限；
- 回滚方案。

## 16.3 默认停止点

如果用户只要求实现：

```text
完成代码
→ 完成验证
→ 报告结果
→ 停止
```

不得自动：

- Commit；
- Push；
- 创建 PR；
- 升级版本；
- 发布；
- 部署。

---

## 17. 多任务混合路由

一个请求可能同时包含多个任务。

例如：

```text
“根据 Figma 优化 FilterBar，并更新 React / Vue Docs”
```

应拆分为：

```text
1. 已有业务组件视觉优化
2. 基础组件复用与样式调优
3. React / Vue 一致性
4. Docs 更新
5. Tests 和 Build
```

执行顺序：

```text
先确定公共行为
→ 再处理 Token 和基础能力
→ 再处理 React
→ 再处理 Vue
→ 再处理 Docs
→ 最后测试和构建
```

另一个例子：

```text
“做一个标签管理页面，同时缺少 TableToolbar”
```

应拆分为：

```text
1. 页面模板
2. 评估 TableToolbar 是否已有
3. 如确实存在跨页面复用证据，再走业务组件路由
4. 页面模板复用 TableToolbar
```

不得为了完成页面而直接在模板中复制一个私有 TableToolbar。

---

## 18. 路由决策树

```text
用户要修改的是现有基础组件吗？
├── 是 → 路由 A
└── 否
    ↓
用户要创建或修改稳定业务能力吗？
├── 是 → 路由 B 或 C
└── 否
    ↓
用户要创建完整页面吗？
├── 是 → 路由 D
└── 否
    ↓
用户在询问布局、容器、操作或筛选选型吗？
├── 是 → 路由 E
└── 否
    ↓
用户要工程代码吗？
├── React → 路由 F
├── Vue → 路由 F
└── 否
    ↓
用户要单 HTML、零环境预览吗？
├── 是 → 路由 G
└── 否
    ↓
用户要检查代码或质量吗？
├── 是 → 路由 H
└── 否
    ↓
用户要建设 Skill、reference 或模板吗？
├── 是 → 路由 I
└── 否
    ↓
用户明确要求 Git 或发布操作吗？
├── 是 → 路由 J
└── 否 → 重新确认任务目标
```

---

## 19. 文件读取最小集

## 19.1 基础组件优化

```text
AGENTS.md
基础组件 guideline
architecture.md
task-routing.md
目标 React / Vue 实现
目标样式
目标 Docs
目标 Tests
相关 Token
```

## 19.2 新业务组件

```text
AGENTS.md
业务组件 guideline
architecture.md
task-routing.md
design-decisions.md
相似业务组件
所需基础组件 reference
React / Vue 实现结构
Docs / AI Contract / Evaluator / Tests
```

## 19.3 页面模板

```text
AGENTS.md
architecture.md
task-routing.md
design-decisions.md
最近似页面模板
页面路由与 Demo 挂载
所需业务组件
所需基础组件 reference
页面模板测试
```

## 19.4 Preview

```text
总控 Skill
对应 Preview Skill
对应开发版组件 Skill
实际组件 reference
design-decisions.md
```

## 19.5 质量审查

```text
AGENTS.md
相关 guideline
architecture.md
task-routing.md
目标代码
Diff
Tests
Build 结果
Docs 结果
浏览器证据
```

---

## 20. 修改文件白名单

实施前必须列出预计修改文件。

示例：

```text
允许修改：
- packages/starbucks-design-react/src/...
- packages/starbucks-design-vue/src/...
- packages/docs/...
- 对应 tests
- 对应 changelog

不修改：
- 无关组件
- 其他页面模板
- 锁文件
- 版本号
- 包导出
```

实施中发现必须扩大范围时，应先说明：

- 为什么需要；
- 新增文件；
- 影响；
- 风险；
- 是否需要用户确认。

不得静默扩大修改范围。

---

## 21. 完成状态路由

### COMPLETE

适用条件：

- 目标功能完成；
- 必要双端完成；
- Docs 完成；
- 必要测试通过；
- 构建通过；
- 必要浏览器检查完成；
- 无未解决高风险问题。

### CONDITIONAL

适用条件：

- 代码已完成；
- 但缺少浏览器、完整测试或外部环境验证；
- 风险可明确描述。

### PARTIAL

适用条件：

- 只完成 React 或 Vue；
- 只完成部分状态；
- 只完成结构；
- 只完成 Docs 或 Preview。

### BLOCKED

适用条件：

- 缺少 Figma；
- 缺少依赖；
- 权限不足；
- 构建环境不可用；
- 外部服务阻塞；
- 规则冲突待确认。

### NOT STARTED

适用条件：

- 尚未执行；
- 只有方案；
- 只有目录；
- 只有占位文件。

---

## 22. 最终交付报告模板

完成任务后，按以下结构报告：

```text
任务分类：
使用的路由：
适用规则：
修改内容：
保持不变的行为：
修改文件：
复用的基础组件：
复用的业务组件：
使用的 Token：
React / Vue 对齐情况：
运行的测试：
构建结果：
Docs 结果：
浏览器验证：
未验证项：
遗留风险：
完成状态：
发布影响：
```

不得省略未验证项和完成状态。

---

## 23. 路由示例

### 示例 1：Select 聚焦边框不生效

```text
对象：基础组件
动作：修复
框架：React + Vue
路由：A
重点检查：
- 实际 DOM
- 选择器权重
- 加载顺序
- Error / Focus 优先级
- Popup 是否受影响
```

### 示例 2：新增 TableToolbar

```text
对象：业务组件
动作：新建
框架：React + Vue
路由：B
重点检查：
- 是否有两个以上复用场景
- 与 FilterBar、Table、Pagination 边界
- 批量操作、列设置、导出
- 状态模型与 API
- Docs、Evaluator、Tests
```

### 示例 3：完成标签管理页

```text
对象：页面模板 / 业务模块
动作：新建
框架：React + Vue
路由：D
复用：
- FilterBar
- TableToolbar
- Table
- Pagination
- Drawer / Modal
默认不创建 TagManagement 公共组件
```

### 示例 4：用户没有开发环境，要看页面

```text
对象：页面
动作：生成
交付：单 HTML
路由：G
读取：
- Preview Skill
- 开发版组件 Skill
- 所需组件 reference
- design-decisions.md
```

### 示例 5：检查 Codex 生成代码是否可靠

```text
对象：代码和质量
动作：审查
路由：H
输出：
- 架构问题
- API 风险
- Token 和样式风险
- React / Vue 差异
- Tests / Build 证据
- 状态等级
```

---

## 24. 完成标准

任务路由只有满足以下条件时才算正确：

1. 正确识别任务对象；
2. 正确识别动作类型；
3. 正确选择 React、Vue、双端或 Preview；
4. 读取了最高优先级规则；
5. 只读取必要文件；
6. 没有跳过架构边界判断；
7. 没有重复实现已有能力；
8. 没有无授权扩大修改范围；
9. 设定了验证计划；
10. 使用证据报告完成状态；
11. 没有自动进入 Git 或发布流程；
12. 未验证项被明确说明。
