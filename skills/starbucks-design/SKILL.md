---
name: starbucks-design
description: >
  Starbucks Design 总控 Skill，用于在 Starbucks Design / DesignKit 项目中分析、设计、
  生成、优化和验证企业级中后台界面。适用于基于 Arco Design 二次封装的 React / Vue
  基础组件、业务组件、页面模板、Design Token、Figma 视觉收敛、React / Vue 一致性、
  Docs Demo、HTML 零环境预览和设计决策任务。用户提到 Starbucks Design、DesignKit、
  Arco Design、基础组件调优、业务组件、FilterBar、TableToolbar、页面模板、列表页、
  表单页、详情页、Dashboard、登录页、标签管理、批量操作、筛选、表格工具栏、
  Figma 对齐、Design Token、样式覆盖、CSS 权重、Popup、Portal、React / Vue 对齐、
  Docs Preview、AI Contract、Evaluator 或代码质量检查时使用本 Skill。
---

# Starbucks Design Skill

## 1. Skill 定位

本 Skill 是 Starbucks Design 的统一任务入口和设计决策中枢。

它负责：

1. 判断当前任务属于基础组件、业务组件、页面模板、组件调用、页面生成还是质量审查；
2. 判断应该使用 React、Vue、React Preview 或 Vue Preview；
3. 读取当前任务需要的设计规则、工程规则和组件 API；
4. 优先复用现有 Design Token、基础组件、业务组件和已验证模板；
5. 将设计规则转化为可执行的代码生成和修改流程；
6. 保证 React、Vue、Docs Preview 和设计规范之间的一致性；
7. 对输出结果进行工程、视觉、交互和兼容性验证。

本 Skill 不替代：

- 根目录或局部目录中的 `AGENTS.md`；
- `agent-guidelines/` 中的专项工程规范；
- React、Vue 组件 Skill 中的完整组件 API；
- 已发布组件包的真实类型定义和公共 API；
- 已评审通过的 Figma 设计稿和 Figma Variables；
- 实际代码、测试、构建和浏览器验证。

本 Skill 的核心作用是：

> 先判断应该怎么做、复用什么、读取哪些规则，再进入具体代码实现。

---

## 2. 设计系统资产关系

Starbucks Design 的 AI 资产分为五层：

```text
用户任务
↓
starbucks-design
任务识别、设计决策、资产路由、执行流程、质量门禁
↓
AGENTS.md / agent-guidelines
仓库规则、工程边界、基础组件与业务组件专项规范
↓
starbucks-design-react / starbucks-design-vue
组件 API、类型、事件、插槽和工程用法
↓
starbucks-design-react-preview / starbucks-design-vue-preview
零环境、单 HTML 页面预览方式
↓
真实组件代码、Docs Demo、Tests、Build、Browser Verification
最终实现与验证
```

现有 Skill 的职责如下：

| Skill | 职责 |
| --- | --- |
| `starbucks-design` | 总控入口、任务路由、设计决策和质量要求 |
| `starbucks-design-react` | React 组件 API、导入方式、类型与代码示例 |
| `starbucks-design-vue` | Vue 组件 API、Props、Events、Slots 与代码示例 |
| `starbucks-design-react-preview` | React CDN 单文件 HTML 页面生成 |
| `starbucks-design-vue-preview` | Vue CDN 单文件 HTML 页面生成 |

不得在本 Skill 中重复维护全部 React 或 Vue 组件 API。

组件属性、事件、类型、插槽和子组件用法，必须读取对应组件 Skill 的 reference 文件确认。

---

## 3. 规则优先级

执行任何任务时，按以下优先级处理：

```text
1. 根目录 AGENTS.md 和距离目标文件最近的局部 AGENTS.md
2. 已发布公共 API、类型定义、兼容性约束和仓库既有约定
3. 用户在当前任务中的明确要求
4. 最新评审通过的 Figma 设计稿、Figma Variables 和设计规范
5. agent-guidelines/ 中与当前任务相关的专项规范
6. 本 Skill 的 references/
7. 已验证的 scripts/ 模板
8. React / Vue 组件 Skill 中的组件 API 和用法
9. Arco Design 原生能力、原生 API 和默认样式
10. 当前任务中的局部实现
```

规则发生冲突时，不得静默选择低优先级方案。

必须先报告：

1. 冲突的规则；
2. 受影响的文件；
3. 对公共 API、视觉或业务行为的影响；
4. 推荐处理方式；
5. 是否需要用户或设计负责人确认。

---

## 4. 总体执行原则

所有任务必须遵循以下原则：

### 4.1 先分类，后执行

不得看到页面截图或一句需求后直接开始写代码。

先判断任务属于：

- 基础组件；
- 业务组件；
- 页面模板；
- 业务模块；
- 组件 API 调用；
- HTML Preview；
- 设计决策；
- 代码与视觉审查。

### 4.2 先复用，后新增

实现优先级：

```text
已有 Design Token
→ 已优化基础组件
→ 已封装业务组件
→ 已验证页面模板
→ Arco Design 原生能力
→ 新增局部实现
```

已有能力能够满足需求时，不得重新实现一套私有能力。

### 4.3 行为契约优先于截图一致

视觉优化不得破坏：

- 查询；
- 重置；
- 提交；
- 取消；
- 编辑；
- 删除；
- 权限；
- 分页；
- 批量操作；
- 受控与非受控模式；
- 异步请求；
- 错误恢复；
- Popup 和 Portal；
- 已发布公共 API。

### 4.4 真实组件优先

Docs、页面模板和预览必须尽量使用真实组件。

禁止使用静态 HTML、截图或永久占位结构模拟已经存在的真实组件。

### 4.5 双框架一致

涉及公共组件、业务组件或双端页面模板时，应保证 React 和 Vue：

- 功能范围等价；
- 默认行为等价；
- 用户可见状态等价；
- 交互顺序等价；
- 视觉结果等价；
- 响应式结果等价。

React 和 Vue 不要求内部代码结构完全相同，但不得出现用户体验差异。

---

## 5. 任务分类

开始任务前，必须先确定以下任务类型。

### 5.1 基础组件样式调优

适用于：

- Button、Input、Select、Checkbox、Radio、Tag；
- Table、Pagination、Tabs；
- DatePicker、TimePicker、Cascader、TreeSelect；
- Modal、Drawer、Dropdown、Tooltip、Popover；
- 其他基于 Arco Design 二次封装的基础组件；
- Figma 视觉对齐；
- Design Token 调整；
- CSS 权重、样式顺序和作用域问题；
- Popup、Trigger 或 Portal 样式问题；
- React 和 Vue 基础组件视觉不一致。

基础组件任务必须读取：

```text
AGENTS.md
agent-guidelines/designkit-base-component-style-optimization-guideline.md
references/architecture.md
references/task-routing.md
```

涉及设计选择时，再读取：

```text
references/design-decisions.md
```

### 5.2 新业务组件开发

适用于：

- 创建 FilterBar、TableToolbar、BatchActions 等业务组件；
- 为稳定业务任务建立可复用组件；
- 新增业务 Schema、状态模型、事件或扩展点；
- 同时建设 React、Vue、Docs、Tests；
- 建设 AI Contract 或 Evaluator。

业务组件任务必须读取：

```text
AGENTS.md
agent-guidelines/designkit-business-component-development-guideline.md
references/architecture.md
references/task-routing.md
references/design-decisions.md
```

如果主要目标是 `FilterBar`，还必须读取：

```text
agent-guidelines/designkit-filterbar-codex-master-prompt.md
```

### 5.3 已有业务组件视觉优化

适用于：

- 不改变业务行为和公共 API；
- 只调整布局、间距、颜色、圆角或响应式；
- 解决业务组件内部的基础组件视觉问题；
- 对齐 Figma 设计稿；
- 修复 React / Vue 视觉差异。

必须同时读取：

```text
agent-guidelines/designkit-business-component-development-guideline.md
agent-guidelines/designkit-base-component-style-optimization-guideline.md
```

实现优先级：

```text
公共 API 和既有业务行为
→ 状态与事件契约
→ Figma Variables 和 Design Token
→ 已优化基础组件
→ 业务组件布局样式
→ Arco Design 默认样式
```

不得为了匹配截图改变业务逻辑。

### 5.4 页面模板开发

适用于：

- 基础列表页；
- 筛选列表页；
- 标签管理页；
- 左树右表页；
- 基础表单页；
- 分组表单页；
- 分步表单页；
- 详情页；
- Dashboard；
- 登录页；
- 结果页和异常页。

页面模板属于页面级组合示例，不是公共业务组件。

页面模板默认：

- 放在 Docs 或模板示例目录；
- 不加入 React 或 Vue 包导出；
- 不新增通用页面组件；
- 不复制业务组件内部实现；
- 使用本地 Mock 数据；
- 保持 React 和 Vue 可见行为一致。

只有任务同时修改基础组件或业务组件时，才读取相应专项 guideline。

### 5.5 组件 API 与工程代码生成

用户明确要求使用 React 或 Vue 编写代码时：

React：

```text
读取 skills/starbucks-design-react/SKILL.md
按需读取对应 references/components/ 文件
```

Vue：

```text
读取 skills/starbucks-design-vue/SKILL.md
按需读取对应 references/components/ 文件
```

不得根据 Ant Design、Arco Design 或记忆猜测 Starbucks Design 的组件 API。

必须确认：

- 导入路径；
- Props；
- Events；
- Slots；
- 类型；
- 子组件；
- 受控与非受控模式；
- React 和 Vue 的 API 差异。

### 5.6 零环境 HTML Preview

用户出现以下意图时，可以选择 Preview Skill：

- 没有 Node.js 环境；
- 不需要安装依赖；
- 希望直接双击 HTML 查看；
- 需要给产品经理或设计师快速查看；
- 明确要求单文件 HTML；
- 明确要求 CDN 预览。

React Preview：

```text
skills/starbucks-design-react-preview/SKILL.md
```

Vue Preview：

```text
skills/starbucks-design-vue-preview/SKILL.md
```

Preview Skill 只负责运行方式。

生成页面前，仍必须读取对应 React 或 Vue 开发版 Skill 的组件 API。

### 5.7 设计决策任务

适用于：

- 页面应使用左右结构还是上下结构；
- Modal、Drawer、侧栏还是新页面；
- 主操作和次操作的位置；
- 批量操作的位置；
- 筛选区域的结构；
- TableToolbar 的布局；
- 列设置、导出、分页的位置；
- 详情页信息分组；
- Dashboard 指标层级；
- 响应式和窄屏策略。

此类任务必须读取：

```text
references/design-decisions.md
```

设计决策必须基于：

- 用户目标；
- 核心任务；
- 内容体量；
- 信息层级；
- 操作频率；
- 风险等级；
- 主体关联性；
- 页面上下文；
- 已有设计模式。

不得只凭个人偏好或单张截图决定。

### 5.8 代码和视觉质量审查

适用于：

- 检查 Codex 生成代码；
- 检查组件是否正确复用；
- 检查是否存在大量硬编码；
- 检查 React / Vue 一致性；
- 检查 Arco 样式覆盖风险；
- 检查 Docs 是否使用真实组件；
- 检查页面模板是否错误封装成公共组件；
- 检查测试和构建是否完整。

质量审查必须区分：

```text
Confirmed
有代码、测试、构建或浏览器证据支持

Conditional
实现存在，但缺少部分验证

Unverified
没有足够证据，不能判定完成

Blocked
受环境、依赖、权限或外部条件阻塞
```

不得把未运行的测试描述为已通过。

---

## 6. 框架与交付形式判断

### 6.1 用户明确指定框架

用户明确指定 React 或 Vue 时，按照指定框架执行。

### 6.2 公共组件或业务组件建设

涉及以下内容时，默认考虑 React 和 Vue 双端：

- 基础组件；
- 业务组件；
- 公共 Design Token；
- 公共样式；
- 公共 Docs 能力；
- 需要进入组件库发布流程的能力。

除非用户明确说明只处理其中一个框架。

### 6.3 页面模板

如果仓库已有 React 和 Vue 双端模板体系，页面模板默认需要双端可见行为一致。

如果只是一次性原型，且用户明确指定单框架，可以只生成指定框架。

### 6.4 用户未指定框架

按照以下顺序判断：

1. 当前文件、目录或任务上下文已经明确框架；
2. 用户明确要求无环境或单 HTML；
3. 用户明确要求组件库代码；
4. 仓库中已有最接近的实现；
5. 当前项目约定；
6. 如果选择会明显影响交付结果，再提出一个必要的澄清问题。

不得无依据默认使用 React 或 Vue。

---

## 7. 按需读取规则

本 Skill、`AGENTS.md`、`agent-guidelines/`、组件 references 和模板文件体量较大。

禁止在每次任务中一次性读取全部文件。

正确流程：

```text
任务分类
→ 读取最高优先级 AGENTS.md
→ 读取对应 guideline
→ 读取本 Skill 中对应 reference
→ 读取目标组件或模板实现
→ 读取实际需要的组件 API
→ 必要时读取已验证 scripts 模板
```

### 7.1 基础组件任务

优先读取：

```text
references/architecture.md
references/task-routing.md
agent-guidelines/designkit-base-component-style-optimization-guideline.md
```

然后读取目标组件的：

- React 实现；
- Vue 实现；
- 样式文件；
- Docs Demo；
- Tests；
- 相关 Token；
- 相关组件 reference。

### 7.2 业务组件任务

优先读取：

```text
references/architecture.md
references/task-routing.md
references/design-decisions.md
agent-guidelines/designkit-business-component-development-guideline.md
```

然后读取：

- 相似业务组件；
- 可复用基础组件；
- React 和 Vue 现有实现；
- Docs；
- AI Contract；
- Evaluator；
- Tests。

### 7.3 页面模板任务

优先读取：

```text
references/architecture.md
references/task-routing.md
references/design-decisions.md
```

然后读取：

- 现有模板路由；
- 最接近的页面模板；
- React 和 Vue Demo 挂载方式；
- 全屏预览；
- 源码查看或复制能力；
- 页面级样式；
- 页面模板测试。

### 7.4 组件代码生成

只读取页面实际使用到的组件 reference。

例如一个筛选表格页可能读取：

```text
FilterBar
Table
Button
Pagination
Dropdown
Checkbox
Drawer
Message
```

不得因为页面使用 Table，就读取全部组件文档。

---

## 8. 架构边界

### 8.1 基础组件

基础组件提供通用 UI 和交互原语。

示例：

```text
Button
Input
Select
Checkbox
Tag
DatePicker
Modal
Drawer
Table
Pagination
Tabs
Tooltip
Dropdown
Trigger
```

基础组件可以承担：

- 视觉样式；
- Design Token；
- 可访问性；
- 通用状态；
- Popup 和 Portal；
- 框架适配；
- 公共 API。

不得在业务组件或页面模板中复制基础组件能力。

### 8.2 业务组件

业务组件完成一个稳定、重复、可复用的业务任务。

示例：

```text
FilterBar
TableToolbar
BatchActions
SelectionSummary
FormDrawer
RiskConfirm
ColumnSettings
ActivityTimeline
```

业务组件应具备：

- 明确适用场景；
- 明确不适用场景；
- 稳定结构；
- 状态模型；
- 公共 API；
- React / Vue 行为契约；
- Docs Demo；
- Tests；
- AI Contract；
- Evaluator；
- 版本策略。

只有外观组合而没有稳定任务语义的内容，不应封装为业务组件。

### 8.3 页面模板

页面模板是整页结构和业务能力组合示例。

示例：

```text
基础列表页
筛选列表页
标签管理页
左树右表页
基础表单页
分组表单页
分步表单页
详情页
Dashboard
登录页
结果页
```

页面模板默认不是公共组件。

禁止默认创建：

```tsx
<BasicListPage
  title="..."
  fields={...}
  columns={...}
  request={...}
/>
```

除非用户明确批准建立通用页面框架，并且已经存在充分的跨页面复用证据。

### 8.4 业务模块

业务模块包含具体领域语义。

示例：

```text
标签管理
门店管理
商品管理
组织管理
权限管理
活动管理
```

业务模块可以由多个基础组件、业务组件和页面模板共同组成。

不得把完整业务模块整体封装为通用业务组件。

---

## 9. Design Token 和样式原则

视觉实现必须遵循以下来源优先级：

```text
Figma Variables 和已评审设计规范
→ Starbucks Design Tokens 和全局变量
→ 已完成调优的基础组件
→ 公共组件样式
→ 当前业务组件或页面模板样式
→ Arco Design 原生变量和默认样式
→ 临时局部覆盖
```

### 9.1 禁止无理由硬编码

已有变量能够表达时，不得直接写死：

- 品牌色；
- 文本色；
- 背景色；
- 边框色；
- 字号；
- 行高；
- 圆角；
- 阴影；
- 间距；
- 组件高度。

新增 Token 前必须确认：

1. 是否已有同义变量；
2. 是否可以复用语义变量；
3. React 和 Vue 是否都需要；
4. 是否具有明确设计语义；
5. 是否具有默认值和主题映射；
6. 是否需要同步文档和测试。

### 9.2 基础能力复用

输入类组件应优先复用 Input 的视觉能力。

下拉类组件应优先复用 Select 和 Dropdown 的浮层能力。

选择类组件应统一 Checkbox、Radio 和 Switch 的：

- 尺寸；
- 边框；
- 填充；
- 选中态；
- Hover；
- Focus；
- Disabled；
- Label 间距。

Table、FilterBar、TableToolbar 等复合能力，不得重复实现已有 Input、Select、Button、Checkbox、Pagination 和 Dropdown 样式。

### 9.3 Arco 样式覆盖

样式不生效时，先排查：

1. 样式文件是否加载；
2. 实际 DOM 和类名；
3. React 和 Vue DOM 差异；
4. CSS Modules 或 Scoped CSS；
5. 选择器权重；
6. 加载顺序；
7. 内联样式；
8. Popup 或 Portal 挂载位置；
9. 状态类覆盖；
10. 主题变量运行时覆盖；
11. Docs Preview 容器影响。

不得直接连续增加选择器层级。

不得在未定位原因前使用 `!important`。

禁止无作用域的大范围覆盖：

```css
.arco-input {}
.arco-select {}
.arco-modal {}
.arco-table {}
```

推荐通过以下方式限制作用域：

- 组件根节点；
- 项目统一前缀；
- `className`；
- `popupClassName`；
- 专用 Portal 类；
- 统一 overrides 文件；
- Design Token。

---

## 10. 设计决策原则

涉及布局、容器、操作和数据展示时，必须读取：

```text
references/design-decisions.md
```

核心决策维度包括：

### 10.1 布局决策

判断：

- 左右还是上下结构；
- 单列还是多列；
- 主内容与辅助内容的关系；
- 页面浏览顺序；
- 操作动线；
- 信息密度；
- 页面层级；
- 对齐和间距。

### 10.2 容器决策

判断 Modal、Drawer、侧栏或新页面时，需要综合：

- 与当前主体的关联性；
- 内容体量；
- 任务复杂度；
- 用户是否需要对照上下文；
- 是否属于轻量即时操作；
- 是否存在长流程；
- 是否需要保存草稿；
- 是否需要独立 URL；
- 是否需要返回和恢复。

### 10.3 操作决策

必须明确：

- 主操作；
- 次操作；
- 危险操作；
- 批量操作；
- 行操作；
- 操作反馈；
- 权限不足表现；
- 异步状态；
- 取消和回退。

### 10.4 数据与筛选决策

必须明确：

- 常用筛选；
- 高级筛选；
- FilterBar 展开收起；
- TableToolbar；
- 已选数量；
- 批量操作；
- 列设置；
- 导出；
- 分页；
- 空状态；
- 错误状态；
- 跨页选择；
- 横向滚动。

---

## 11. 页面模板原则

### 11.1 组合优先

页面模板应优先组合：

```text
PageHeader
FilterBar
TableToolbar
Table
Pagination
Descriptions
Form
Card
Tabs
Modal
Drawer
Message
Empty
Result
```

不得把基础组件或业务组件内部逻辑复制进页面模板。

### 11.2 页面级逻辑归属

以下内容通常可以保留在页面模板中：

- Mock 数据；
- 页面级查询模拟；
- 页面级分页；
- 行选择；
- 当前页面的展示状态；
- 页面级 Modal 或 Drawer 开关；
- 模板演示所需的 Loading、Empty 和 Error 状态。

以下内容不应复制到页面模板：

- FilterBar 字段归一化；
- 通用校验引擎；
- 公共 Popup 定位；
- 通用 TableToolbar 状态；
- 基础组件内部样式；
- 业务组件公共 API 适配；
- 已存在的受控和非受控逻辑。

### 11.3 Docs 要求

页面模板 Docs 应包含：

- 真实 React Preview；
- 真实 Vue Preview；
- 页面说明；
- 使用场景；
- 不适用场景；
- 页面结构；
- 组件清单；
- 设计规则；
- 交互说明；
- 响应式说明；
- 源码查看或复制能力；
- 必要测试。

不得使用永久 Skeleton 或静态截图替代真实页面。

---

## 12. scripts 模板策略

`skills/starbucks-design/scripts/` 只允许存放经过验证的黄金模板。

黄金模板至少需要满足：

1. 使用真实 Starbucks Design 组件；
2. 结构和交互已经评审；
3. React 和 Vue 可见行为等价；
4. 没有明显硬编码和重复能力；
5. 已通过类型检查；
6. 已通过必要测试；
7. 已通过生产构建；
8. Docs 能正常渲染；
9. 已完成浏览器检查；
10. 没有被标记为占位或临时实现。

### 12.1 模板优先级

命中已有黄金模板时：

```text
复制已验证模板
→ 保留页面结构、关键 class、Token 和交互分区
→ 替换业务字段、数据、文案和请求逻辑
→ 运行验证
```

不得在已有成熟模板时从空白重新生成相同页面。

### 12.2 无模板场景

没有黄金模板时：

```text
读取对应 reference
→ 查找仓库内最接近实现
→ 读取所需组件 API
→ 按现有架构生成
→ 验证后再决定是否沉淀为模板
```

### 12.3 禁止进入 scripts 的内容

以下内容不得作为黄金模板：

- 占位页面；
- 静态截图；
- 只有 React 没有 Vue 且目标要求双端；
- 未完成交互；
- 未通过构建；
- 未验证的实验代码；
- 依赖不存在的组件；
- 大量写死样式；
- 绕过真实业务组件的模拟实现。

---

## 13. 标准工作流程

## Phase A：只读分析

除非用户明确要求直接实现，否则修改前必须先进行只读分析。

分析内容至少包括：

1. 任务分类；
2. 当前适用的 `AGENTS.md`；
3. 当前适用的 guideline；
4. 当前适用的 Skill reference；
5. 当前 React 和 Vue 实现；
6. 可复用基础组件；
7. 可复用业务组件；
8. 可复用模板；
9. Design Token 和共享样式；
10. Figma Variables 和设计差异；
11. Arco 权重、Popup 和 Portal 风险；
12. Docs、Preview 和测试结构；
13. 预计修改文件；
14. 工作区状态和无关变更；
15. 公共 API 和兼容性风险；
16. 推荐实施方案。

页面模板还要确认：

- 路由和占位位置；
- React 和 Vue 如何挂载；
- 是否支持全屏预览；
- 是否支持源码查看或复制；
- 最接近的页面实现；
- 能否不修改组件包完成。

Phase A 不修改代码。

## Phase B：实施计划

编码前明确：

1. 保持不变的行为；
2. 复用的基础组件；
3. 复用的业务组件；
4. 复用或新增的 Token；
5. 当前任务负责的布局和交互；
6. 是否存在基础能力缺口；
7. 样式作用域和权重策略；
8. React 和 Vue 对齐策略；
9. Docs 更新；
10. Tests 更新；
11. 预计修改文件白名单；
12. 兼容性和发布风险。

页面模板必须明确：

- 它是组合示例，不是公共万能组件；
- 不复制业务组件内部实现；
- 默认不加入包导出；
- Docs 使用真实组件；
- React 和 Vue 用户可见行为等价。

## Phase C：实现

组件任务建议顺序：

```text
1. 共享 Token 或公共能力
2. 必要的基础组件修复
3. React 实现
4. Vue 实现
5. 同源或等价样式
6. Docs Preview
7. Tests
8. AI Contract
9. Evaluator
```

页面模板建议顺序：

```text
1. 确认 Docs 路由和预览结构
2. 准备共享或等价 Mock 数据
3. 实现 React 模板
4. 实现 Vue 模板
5. 添加页面级样式
6. 接入真实 Docs Preview
7. 添加设计规则和组件清单
8. 接入源码查看或复制能力
9. 添加模板测试
10. 浏览器检查
```

实现过程中禁止：

- 无关重构；
- 大范围格式化；
- 修改未授权公共 API；
- 新增未批准依赖；
- 新增不必要包入口；
- React 生产代码依赖 Vue 包；
- Vue 生产代码依赖 React 包；
- 复制组件内部逻辑；
- 无作用域 Arco 覆盖；
- 永久占位页面；
- 绕过真实组件的静态模拟。

## Phase D：验证

根据任务运行适用的：

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

必须按场景检查：

- Default；
- Hover；
- Focus；
- Active；
- Disabled；
- Loading；
- Empty；
- Error；
- Permission；
- Expand 和 Collapse；
- Query；
- Reset；
- Submit；
- Cancel；
- Pagination；
- Row Selection；
- Batch Actions；
- Popup；
- Portal；
- Narrow Container；
- Overflow；
- React / Vue 一致性；
- Figma 主要变体。

页面模板还应检查：

- React Preview 正常渲染；
- Vue Preview 正常渲染；
- Loading、Empty、Error 状态；
- 查询和重置；
- 分页；
- 行选择；
- 批量操作；
- 列设置；
- Modal 和 Drawer；
- 页面头部操作窄屏换行；
- 工具栏窄屏换行或折叠；
- FilterBar 响应式；
- 页面无异常横向滚动；
- 宽表格只在表格容器内部滚动；
- Popup 内容可见；
- 浏览器控制台无相关报错。

没有实际使用浏览器时，不得声称完成浏览器验证。

---

## 14. 输出与交付要求

### 14.1 分析任务输出

只读分析至少包含：

```text
任务分类
适用规则
当前实现
可复用能力
主要问题
风险
建议方案
预计修改文件
验证计划
```

### 14.2 实现任务输出

实现完成后至少说明：

```text
修改内容
保持不变的行为
修改文件
复用的组件和 Token
React / Vue 对齐情况
运行的验证
验证结果
未验证项
遗留风险
是否涉及发布
```

### 14.3 证据要求

使用以下状态：

```text
COMPLETE
实现和必要验证均已完成

CONDITIONAL
实现已完成，但仍缺少部分验证

PARTIAL
只完成部分功能或部分框架

BLOCKED
受到环境、依赖、权限或外部条件阻塞

NOT STARTED
尚未开始
```

只有实际运行成功的命令才能标记为通过。

不得将：

- “代码看起来没问题”；
- “理论上可以运行”；
- “应该已经修复”；

表述为已验证结果。

---

## 15. Git 与发布安全

默认工作流到实现和验证为止。

除非用户明确要求，不执行：

- 创建分支；
- Commit；
- Push；
- 创建 Pull Request；
- 修改版本号；
- 发布 npm 包；
- 部署 Docs；
- 创建 Release；
- 合并分支。

修改前应检查工作区，避免覆盖无关改动。

不得：

- 删除用户未授权文件；
- 重置用户工作区；
- 使用破坏性 Git 命令；
- 把无关修改混入当前任务；
- 自动升级依赖；
- 自动修改锁文件；
- 自动进入发布流程。

版本建议：

```text
Patch
兼容性问题修复

Minor
新增向后兼容的公共能力

Major
经批准的破坏性变更
```

Docs-only 和页面模板-only 变更通常不需要组件包版本升级。

---

## 16. 文件索引

### 16.1 本 Skill references

| 文件 | 作用 |
| --- | --- |
| `references/architecture.md` | 设计系统架构、资产分层、组件与页面边界 |
| `references/task-routing.md` | 任务识别、框架选择、文件读取和执行路由 |
| `references/design-decisions.md` | 布局、容器、操作、数据与筛选设计决策 |

### 16.2 专项工程规范

| 文件 | 适用任务 |
| --- | --- |
| `agent-guidelines/designkit-base-component-style-optimization-guideline.md` | 基础组件样式调优、Figma 对齐、Arco 覆盖 |
| `agent-guidelines/designkit-business-component-development-guideline.md` | 业务组件定义、开发、Docs、AI Contract 和 Evaluator |
| `agent-guidelines/designkit-filterbar-codex-master-prompt.md` | FilterBar 专项任务 |

### 16.3 组件 API Skill

| Skill | 用途 |
| --- | --- |
| `skills/starbucks-design-react/` | React 组件 API 和工程代码 |
| `skills/starbucks-design-vue/` | Vue 组件 API 和工程代码 |
| `skills/starbucks-design-react-preview/` | React 单 HTML Preview |
| `skills/starbucks-design-vue-preview/` | Vue 单 HTML Preview |

### 16.4 scripts

```text
skills/starbucks-design/scripts/
```

当前目录只用于存放完成评审和验证的黄金模板。

目录为空时，按 reference 和仓库现有实现生成，不得假设模板存在。

---

## 17. 快速路由示例

### 示例一：优化 Select 样式

```text
任务类型：基础组件样式调优
读取：
- AGENTS.md
- 基础组件调优 guideline
- architecture.md
- task-routing.md
- React Select 实现和 reference
- Vue Select 实现和 reference
- 相关 Token、Docs 和 Tests
```

### 示例二：开发 TableToolbar

```text
任务类型：新业务组件
读取：
- AGENTS.md
- 业务组件 guideline
- architecture.md
- task-routing.md
- design-decisions.md
- Button、Dropdown、Checkbox、Pagination 等组件 API
- 相似业务组件和页面模板
```

### 示例三：开发标签管理页面

```text
任务类型：页面模板或业务模块
优先复用：
- FilterBar
- TableToolbar
- Table
- Pagination
- Drawer 或 Modal

默认不创建 TagManagement 公共万能组件。
```

### 示例四：生成 React 单 HTML Demo

```text
任务类型：零环境 Preview
读取：
- starbucks-design-react-preview/SKILL.md
- 页面涉及的 React 组件 references
- design-decisions.md
```

### 示例五：检查 Codex 代码质量

```text
任务类型：质量审查
检查：
- 架构边界
- API 兼容性
- 基础组件复用
- React / Vue 一致性
- Token 使用
- Arco 覆盖
- Docs 真实性
- Tests 和 Build 证据
```

---

## 18. 完成标准

一个 Starbucks Design 任务只有同时满足适用条件时，才能标记完成：

1. 任务分类正确；
2. 使用了正确的规则和 Skill；
3. 未破坏架构边界；
4. 优先复用了现有能力；
5. 未无理由修改公共 API；
6. 使用正确 Design Token；
7. 样式覆盖具有明确作用域；
8. React 和 Vue 达到要求的一致性；
9. Docs 使用真实组件；
10. 主要状态和交互完整；
11. 必要测试和构建通过；
12. 未验证项明确说明；
13. 没有把临时实现当作标准模板；
14. 没有执行未经授权的发布操作。
