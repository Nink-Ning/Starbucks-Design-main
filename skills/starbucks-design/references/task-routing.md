# Starbucks Design 任务路由规范

## 1. 文档目的

本文是 Starbucks Design / DesignKit 的详细任务执行中心，用于指导工程代理在接到任务后判断：

- 当前任务对象；
- 当前动作类型；
- React、Vue、双端或 Preview 交付形式；
- 应读取的最小文件集；
- 应修改的资产层级；
- 是否涉及公共 API、依赖、包导出、Git 或发布动作；
- 应按什么范围验证；
- 如何报告完成状态和未验证风险。

本文不替代：

- 根目录及局部目录的 `AGENTS.md`；
- 已发布公共 API、类型定义和兼容性约束；
- 用户当前任务要求；
- 已评审通过的 Figma 设计资产；
- `agent-guidelines/` 中的专项规范；
- React / Vue 组件 Skill；
- 实际测试、构建和浏览器验证结果。

## 2. 读取总原则

Skill 被触发后，`skills/starbucks-design/SKILL.md` 已经作为入口读取。后续不要重复全量读取完整 Skill、全部 references 或全部 `agent-guidelines/`。

正确流程：

```text
理解用户目标
↓
识别任务对象
↓
识别动作类型
↓
确认框架与交付形式
↓
命中具体路由
↓
读取该路由的最小文件集
↓
读取目标代码和实际使用的组件 API
↓
制定文件白名单与验证范围
↓
实施或审查
↓
按证据报告完成状态
```

按需读取规则：

- `architecture.md` 只在涉及资产归属、组件封装、依赖方向、公共 API、包导出或 Skill 职责时读取；
- `design-decisions.md` 只在涉及布局、容器、操作、筛选、表单、详情、Dashboard 或响应式选型时读取；
- `agent-guidelines/` 只读取当前路由适用的专项文件；
- React / Vue 组件 reference 只读取实际使用的组件；
- 简单组件 API 查询不得读取全部 reference；
- 验证项目按当前任务影响范围选择，未执行的验证必须明确标记，不得描述为已通过。

禁止：

```text
看到截图 → 直接写 CSS
看到页面需求 → 从零生成，不查现有能力
看到组件名 → 只读单个文件，不查双端、Docs 或测试影响
样式不生效 → 直接加选择器层级或 !important
相似页面 → 直接封装公共万能组件
已有 Demo → 未验证就复制进 scripts/
```

## 3. 任务对象识别

先判断用户主要操作哪类对象。

### 3.1 设计资产

- Figma 组件；
- Figma Variables；
- 设计稿变体；
- Design Token；
- 视觉规范；
- 设计决策；
- 组件状态定义。

### 3.2 基础组件

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

```text
FilterBar
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

### 3.4 页面模板

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

## 4. 动作类型识别

### 4.1 新建

典型表达：新增组件、新建页面模板、增加 Skill、建立业务能力、创建 Demo。

先判断：

- 是否已有相同或近似能力；
- 应归属哪一层；
- 是否需要公共 API；
- 是否需要 React / Vue 双端；
- 是否有两个以上复用场景；
- 是否应先做页面级组合，而不是公共封装。

### 4.2 优化

典型表达：调整样式、对齐 Figma、优化交互、统一 React / Vue、优化响应式。

先确认：

- 现有行为是否保持；
- 优化属于基础组件还是组合布局；
- 是否涉及 Token；
- 是否影响 Popup / Portal；
- 是否会破坏公共 API；
- 是否需要同步另一框架和 Docs。

### 4.3 修复

典型表达：样式不生效、页面报错、组件行为异常、构建失败、React / Vue 表现不一致、Docs 无法渲染。

先定位根因，不得直接绕过问题。

### 4.4 生成

典型表达：生成 React 页面、生成 Vue 页面、做 HTML Demo、根据需求搭建页面、根据设计稿生成代码。

先确认：

- 交付形式；
- 框架；
- 是否需要单文件 Preview；
- 是否存在黄金模板；
- 页面所需组件；
- 设计决策；
- 是否需要真实工程代码。

### 4.5 审查

典型表达：检查 Codex 代码、评估代码质量、看是否符合设计系统、检查是否可发布、检查 React / Vue 一致性。

审查必须使用证据分级，不得只给主观评价。

### 4.6 重构

典型表达：拆分组件、合并重复逻辑、优化目录、调整架构、抽取公共能力。

重构必须先确认影响范围、公共 API、无关本地改动和更小替代方案。

### 4.7 Git、PR 与发布

典型表达：提交代码、推送 GitHub、创建 PR、升级版本、发布 npm 包、部署 Docs。

只有用户明确要求时才能进入发布路由。

## 5. 框架与交付形式

### 5.1 React 工程代码

选择条件：

- 用户明确指定 React；
- 目标文件位于 React 包；
- 当前任务只处理 React；
- 需要 React 类型、Hooks、JSX 或 TSX；
- 需要使用 `@sbux/starbucks-design-react`。

读取：

```text
skills/starbucks-design-react/SKILL.md
实际使用组件的 React reference
```

### 5.2 Vue 工程代码

选择条件：

- 用户明确指定 Vue；
- 目标文件位于 Vue 包；
- 当前任务只处理 Vue；
- 需要 Vue SFC、Composition API、Props、Events 或 Slots；
- 需要使用 `@sbux/starbucks-design-vue`。

读取：

```text
skills/starbucks-design-vue/SKILL.md
实际使用组件的 Vue reference
```

### 5.3 React + Vue 双端

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

### 5.4 Preview

选择条件：

- 用户需要单 HTML；
- 用户没有或不想使用 Node.js；
- 需要双击打开；
- 需要快速给产品经理或设计师查看；
- 用户明确要求 CDN 预览。

读取：

```text
React Preview → skills/starbucks-design-react-preview/SKILL.md + 实际 React 组件 reference
Vue Preview   → skills/starbucks-design-vue-preview/SKILL.md + 实际 Vue 组件 reference
```

Preview 不自动等于工程级代码、正式页面模板或可发布组件。

### 5.5 用户未指定框架

按以下顺序判断：

1. 当前目标目录；
2. 当前文件类型；
3. 用户前文已经确定的框架；
4. 仓库内最接近实现；
5. 是否要求双端一致；
6. 是否要求零环境 HTML；
7. 项目既有约定。

只有当选择框架会显著改变交付结果且无法从上下文判断时，才提出澄清问题。

## 6. 路由 A：基础组件样式调优

### 6.1 触发条件

- 基于 Arco Design 的基础组件二次封装；
- Figma 视觉对齐；
- 组件尺寸、边框、圆角、颜色、字体、间距；
- Hover、Focus、Disabled、Error；
- React / Vue 基础组件视觉一致；
- Popup、Portal、Trigger；
- CSS 权重、作用域、加载顺序；
- `!important`；
- Design Token。

### 6.2 最小读取集

```text
AGENTS.md
agent-guidelines/designkit-base-component-style-optimization-guideline.md
目标 React / Vue 实现
目标样式
目标 Docs 或 Preview
目标 Tests
相关 Token
实际使用组件 reference
```

涉及资产归属、跨组件能力或公共 API 时，再读 `architecture.md`。

涉及布局或交互选型时，再读 `design-decisions.md`。

### 6.3 实施原则

- 优先使用 Figma Variables 和 Design Token；
- 优先修复基础组件公共能力；
- 不在业务组件或页面模板中复制基础组件完整样式；
- 不使用无作用域 `.arco-*` 覆盖；
- 不在未定位根因前使用 `!important`；
- React、Vue、Docs Preview 用户可见结果保持一致。

### 6.4 验证范围

根据受影响组件验证适用状态，例如 Default、Hover、Focus、Active、Disabled、Error、Size、Prefix / Suffix、Popup、Portal、React / Vue、Docs、Build 和样式回归测试。

未执行项必须标记为未验证。

## 7. 路由 B：新业务组件开发

### 7.1 触发条件

- 新增稳定业务能力；
- 新增 FilterBar、TableToolbar 等业务组件；
- 定义 Schema、状态模型、事件；
- React / Vue 双端封装；
- 建设 Docs、AI Contract、Evaluator、Tests。

### 7.2 最小读取集

```text
AGENTS.md
agent-guidelines/designkit-business-component-development-guideline.md
architecture.md
目标或相似业务组件
可复用基础组件
实际使用组件 reference
React / Vue 实现结构
Docs / AI Contract / Evaluator / Tests
```

FilterBar 任务再读：

```text
agent-guidelines/designkit-filterbar-codex-master-prompt.md
```

涉及基础组件视觉调优或 Arco 覆盖时，再读基础组件 guideline。

涉及布局、容器、筛选、表格或响应式选型时，再读 `design-decisions.md`。

### 7.3 开发前必须定义

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

### 7.4 封装门槛

至少满足：

- 两个以上可复用场景；
- 重复的是稳定任务或行为；
- 可定义公共 API；
- 不绑定具体业务模块；
- 不需要大量互斥 Props；
- 能由现有基础组件组合；
- 封装后能减少重复设计与开发。

不满足时，优先做页面模板或局部组合。

### 7.5 验证范围

按组件影响范围验证状态模型、事件顺序、受控/非受控、Loading、Empty、Error、Disabled、Permission、React / Vue 契约、Docs 真实组件、API 兼容、Tests 和 Build。

## 8. 路由 C：已有业务组件视觉优化

### 8.1 触发条件

- 已有业务组件行为正确；
- 只需视觉、布局或响应式优化；
- 需要对齐 Figma；
- 需要修复内部基础组件样式；
- 需要 React / Vue 视觉一致。

### 8.2 最小读取集

```text
AGENTS.md
agent-guidelines/designkit-business-component-development-guideline.md
目标业务组件 React / Vue 实现
目标样式
目标 Docs 和 Tests
相关 Token
实际使用基础组件 reference
```

涉及基础组件能力或 Arco 覆盖时，再读：

```text
agent-guidelines/designkit-base-component-style-optimization-guideline.md
```

涉及资产归属或公共 API 风险时，再读 `architecture.md`。

### 8.3 优先级

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

不得为了匹配截图改变 submit、reset、cancel、query、permission、error recovery、受控或非受控行为。

### 8.4 根因归属

```text
基础组件本身有问题 → 修基础组件
基础组件正常但组合布局有问题 → 修业务组件布局
Docs 容器造成问题 → 修 Docs
Popup / Portal 作用域问题 → 修浮层挂载或专用作用域
React / Vue DOM 差异 → 分别适配，但保持同源 Token
```

## 9. 路由 D：页面模板开发

### 9.1 触发条件

- 做一个完整列表页；
- 做标签管理页；
- 做表单页；
- 做详情页；
- 做 Dashboard；
- 做登录页；
- 做结果或异常页；
- 将多个基础组件和业务组件组合成页面。

### 9.2 最小读取集

```text
AGENTS.md
task-routing.md 当前路由
最近似页面模板
页面路由与 Demo 挂载
所需业务组件
实际使用基础组件 reference
页面级样式
页面模板测试
```

涉及资产归属、页面模板是否应抽成公共组件、依赖方向或包导出时，再读 `architecture.md`。

涉及布局、容器、操作、筛选、表单、详情、Dashboard 或响应式时，再读 `design-decisions.md`。

只在以下情况读取专项 guideline：

```text
修改基础组件 → 基础组件 guideline
新增或修改业务组件 → 业务组件 guideline
```

### 9.3 开发前确认

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

### 9.4 默认规则

- 页面模板是组合示例，不是公共万能组件；
- 默认不进入包导出；
- 使用本地 Mock；
- 页面级请求模拟留在模板；
- 不复制业务组件内部逻辑；
- React / Vue 可见行为等价；
- Docs 必须渲染真实组件；
- 宽表格只在表格区域内部滚动；
- 页面自身不出现异常横向滚动。

### 9.5 验证范围

根据模板能力验证正常态、Loading、Empty、Error、Query、Reset、Pagination、Selection、Batch Actions、Modal / Drawer、Column Settings、窄屏、页面溢出、表格内部滚动、Popup / Portal 和控制台错误。

只实现部分状态或部分框架时，完成状态应标记 `PARTIAL` 或 `CONDITIONAL`。

## 10. 路由 E：设计决策

### 10.1 触发条件

- 选择页面结构；
- 选择 Modal、Drawer、侧栏或新页面；
- 确定主次操作位置；
- 确定筛选和工具栏布局；
- 确定表格批量操作；
- 确定详情页分组；
- 确定 Dashboard 信息层级；
- 确定响应式策略。

### 10.2 最小读取集

```text
skills/starbucks-design/references/design-decisions.md
仓库内最接近的已有模式
```

涉及资产归属或封装边界时，再读 `architecture.md`。

### 10.3 输出要求

至少说明：

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

## 11. 路由 F：React / Vue 工程代码生成

### 11.1 触发条件

- 用户明确要求代码；
- 需要组件 API；
- 需要 TSX 或 Vue SFC；
- 需要真实工程集成。

### 11.2 最小读取集

```text
对应 React 或 Vue Skill
实际使用组件 reference
目标工程目录和最近似实现
必要的设计决策 reference
必要的架构 reference
```

### 11.3 禁止事项

- 根据 Ant Design 习惯猜 Starbucks API；
- React 中使用 Vue API；
- Vue 中套用 React Hooks；
- Form.Item 使用错误字段名；
- 图标从错误入口导入；
- 忽略受控与非受控约定；
- 使用不存在的组件或 Props；
- 为了演示绕过真实组件。

## 12. 路由 G：零环境 HTML Preview

### 12.1 触发条件

- 无 Node.js；
- 单文件 HTML；
- 双击预览；
- 快速发给其他角色；
- CDN 运行。

### 12.2 最小读取集

```text
对应 Preview Skill
对应开发版组件 Skill
实际使用组件 reference
必要的 design-decisions.md
```

### 12.3 限制

Preview 适合快速演示、需求沟通、无环境预览和单文件交付。

Preview 不自动等于：

- 工程级代码；
- 可发布组件；
- 正式页面模板；
- 已通过完整测试的黄金模板。

生成 Preview 后，应尽量用浏览器打开验证 CDN 顺序、全局对象、组件 API 和控制台错误。未验证时明确标记。

## 13. 路由 H：质量审查

### 13.1 触发条件

- 审查 Codex 代码；
- 检查设计系统一致性；
- 检查发布准备度；
- 检查代码质量；
- 检查 React / Vue 对齐；
- 检查样式覆盖；
- 检查架构越界。

### 13.2 最小读取集

```text
AGENTS.md
目标代码或 diff
相关 guideline
必要的 architecture.md
必要的 task-routing.md 路由
Tests / Build / Docs / Browser 证据
```

### 13.3 审查维度

- 架构：资产层级、依赖方向、页面模板是否误导出、是否重复封装；
- API：公共 API 是否变化，Props / Events / Slots 是否真实存在；
- 视觉：Token、Figma、状态、React / Vue 一致性；
- 样式安全：`.arco-*` 作用域、`!important`、Popup / Portal、加载顺序；
- 交互：Query、Reset、Submit、Cancel、Loading、Error、Permission、Pagination、Selection；
- Docs 与测试：是否使用真实组件，是否有必要测试和构建证据。

### 13.4 证据等级

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

## 14. 路由 I：Skill、reference 与模板建设

### 14.1 触发条件

- 新增 Skill；
- 更新总控规则；
- 新增 reference；
- 新增黄金模板；
- 更新 AI Contract；
- 更新 Evaluator。

### 14.2 最小读取集

```text
AGENTS.md
目标 Skill 或 reference
相关现有 Skill / reference
必要的 architecture.md
必要的 task-routing.md
实际代码、Docs、Tests 或模板证据
```

### 14.3 目录职责

```text
SKILL.md
→ 触发条件、总控路由、总体索引

references/
→ 专项规则和设计知识

scripts/
→ 经过验证的黄金模板

组件 Skill
→ API 和框架用法

Preview Skill
→ 零环境运行方式
```

不得在多个文件中维护同一套完整内容。

### 14.4 scripts 策略

`skills/starbucks-design/scripts/` 只允许存放经过验证的黄金模板。

目录为空时：

```text
读取对应 reference
→ 查找仓库内最接近实现
→ 读取所需组件 API
→ 按现有架构生成
→ 验证后再决定是否建议沉淀为模板
```

不得把未验证实验代码、占位页面、静态截图或绕过真实组件的模拟实现放入 `scripts/`。

## 15. 路由 J：Git、PR 与发布

### 15.1 触发条件

只有用户明确要求以下动作时进入本路由：

- 创建或切换分支；
- `git add` 或 stage；
- Commit；
- Push；
- 创建 PR；
- 修改版本；
- 发布；
- 部署；
- Release。

### 15.2 发布前检查

按根 `AGENTS.md` 和用户要求确认：

- exact packages and scope；
- 工作区状态和无关改动；
- 文件白名单；
- 测试、构建、Docs 和浏览器验证结果；
- 公共 API 和包导出影响；
- 版本策略；
- Changelog；
- 锁文件；
- 发布权限。

### 15.3 默认停止点

如果用户只要求实现或验证：

```text
完成代码
→ 完成适用验证
→ 报告结果
→ 停止
```

不得自动 commit、push、创建 PR、升级版本、发布或部署。

## 16. 多任务混合路由

一个请求可能同时包含多个任务。

示例：

```text
“根据 Figma 优化 FilterBar，并更新 React / Vue Docs”
```

拆分为：

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

拆分为：

```text
1. 页面模板
2. 评估 TableToolbar 是否已有
3. 如确实存在跨页面复用证据，再走业务组件路由
4. 页面模板复用 TableToolbar
```

不得为了完成页面而直接在模板中复制一个私有 TableToolbar。

## 17. 路由决策树

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

## 18. 文件修改白名单

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

## 19. 验证范围

根据当前任务影响范围选择适用验证，不要求所有任务运行所有状态和全部构建。

常见验证项：

- lint；
- typecheck；
- unit tests；
- interaction tests；
- style regression tests；
- template tests；
- React build；
- Vue build；
- Docs build；
- browser smoke check；
- `git diff --check`。

常见状态和场景：

- Default；
- Hover；
- Focus；
- Active；
- Disabled；
- Loading；
- Empty；
- Error；
- Permission；
- Expand / Collapse；
- Query / Reset；
- Submit / Cancel；
- Pagination；
- Row Selection；
- Batch Actions；
- Popup / Portal；
- Narrow Container；
- Overflow；
- React / Vue 一致性；
- Figma 主要变体。

页面模板常见场景：

- React Preview；
- Vue Preview；
- Normal / Loading / Empty / Error；
- Query / Reset；
- Pagination；
- Selection；
- Batch Actions；
- Column Settings；
- Modal / Drawer；
- 窄屏；
- 页面溢出；
- 表格内部滚动；
- Popup / Portal；
- Browser console。

未执行的验证必须明确标记，不得描述为已通过。

## 20. 完成状态

### COMPLETE

适用条件：

- 目标功能完成；
- 必要双端完成；
- Docs 完成；
- 适用测试通过；
- 适用构建通过；
- 必要浏览器检查完成；
- 无未解决高风险问题。

### CONDITIONAL

适用条件：

- 代码或分析已完成；
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

## 21. 最终交付报告模板

完成任务后，按任务复杂度报告以下内容。简单任务可以压缩，但不得省略验证结果和未验证项。

```text
任务分类：
使用的路由：
适用规则：
修改内容：
保持不变的行为：
修改文件：
新增文件：
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
文件白名单：
白名单外工作区变化：
是否执行 Git / 发布动作：
建议提交拆分：
建议版本变化：
```

不得省略未验证项和完成状态。

## 22. 路由示例

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

## 23. 路由完成标准

任务路由只有满足以下条件时才算正确：

1. 正确识别任务对象；
2. 正确识别动作类型；
3. 正确选择 React、Vue、双端或 Preview；
4. 读取了必要且足够的规则；
5. 没有全量读取不相关文件；
6. 没有跳过架构边界判断；
7. 没有重复实现已有能力；
8. 没有无授权扩大修改范围；
9. 设定了按影响范围选择的验证计划；
10. 使用证据报告完成状态；
11. 没有自动进入 Git 或发布流程；
12. 未验证项被明确说明。
