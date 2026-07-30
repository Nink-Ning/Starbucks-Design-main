# DesignKit 基础组件样式调优规范

> 用途：作为 Codex、Claude Code、Cursor 等工程代理在 DesignKit 仓库中进行基础组件视觉调优、样式收敛和问题修复时的统一执行规范。  
> 适用范围：基于 Arco Design 二次封装的 React / Vue 基础组件、公共样式、Design Token、Docs Preview、测试与构建。  
> 优先级：仓库中的 `AGENTS.md`、现有工程约束、已发布公共 API 和最新评审通过的 Figma 设计资产高于本文；如发生冲突，先报告，不得自行覆盖。

---

# 1. 调优目标

DesignKit 基础组件基于 Arco Design 进行二次封装。组件样式调优的目标是：

1. 以最新评审通过的 Figma 设计稿和设计变量为最终视觉标准；
2. 收敛 Arco Design 原生样式与 DesignKit 设计稿之间的差异；
3. 保证 React、Vue 和 Docs Preview 中的组件表现一致；
4. 优先复用已有设计变量、全局样式和基础组件能力；
5. 避免通过临时覆盖、重复样式和大量 `!important` 形成新的维护负担；
6. 调优过程中不得破坏组件原有功能、交互逻辑、可访问性和业务兼容性。

---

# 2. 样式来源优先级

实现组件样式时，按以下优先级选择样式来源：

```text
Figma Variables / 已评审设计规范
→ DesignKit Design Tokens / 全局变量
→ 已完成调优的基础组件样式
→ 当前组件公共样式
→ 当前组件局部样式
→ Arco Design 原生变量和默认样式
→ 临时覆盖样式
```

禁止在已有变量或公共能力可以满足需求时，直接写死颜色、字号、圆角、阴影和间距。

推荐：

```css
color: var(--color-text-1);
border-radius: var(--border-radius-medium);
padding: var(--spacing-2) var(--spacing-3);
```

避免：

```css
color: #1d2129;
border-radius: 6px;
padding: 8px 12px;
```

只有在设计稿中存在明确的新规格，且现有变量无法表达时，才允许新增变量。

新增变量前必须检查：

- 是否已经存在含义相同的变量；
- 是否可以复用已有语义变量；
- React 和 Vue 是否都需要使用该变量；
- 变量命名是否表达设计语义，而不是单个组件名称；
- 是否具有默认值和主题映射；
- 是否需要同步更新文档和变更记录。

---

# 3. Figma 设计资产使用规则

使用 Figma MCP 获取设计信息时，应遵循以下规则：

1. 先读取组件节点、变量、组件属性和变体信息，再开始修改代码；
2. 不得只根据截图或视觉估算直接写样式；
3. 优先读取 Figma 中已经绑定的 Variables；
4. 区分组件容器、文本、图标、边框和交互状态，不得只读取最外层尺寸；
5. 检查组件的全部主要变体，而不是只实现默认状态；
6. Figma 数据存在冲突时，以设计变量和最新评审通过的组件稿为准；
7. Figma 中未明确的内容，优先参考同类已优化组件，不自行创造新的样式规则；
8. 无法从 Figma MCP 可靠读取的信息必须明确列为待确认项，不得猜测。

需要检查的视觉信息包括：

- 宽度和高度；
- 内边距和元素间距；
- 字体、字号、字重和行高；
- 文本颜色、背景色和边框色；
- 圆角、阴影和分割线；
- 图标尺寸、颜色和对齐方式；
- Hover、Active、Focus、Disabled、Error 等状态；
- 下拉浮层、弹窗或 Portal 内容；
- 不同尺寸、类型和组合方式；
- 响应式和窄容器下的表现。

---

# 4. 调优前只读检查

任何新组件开始调优前，必须先完成只读检查，不得直接修改代码。

## 4.1 检查组件实现

确认组件：

- 基于哪个 Arco Design 组件封装；
- 是否包含多个 Arco 子组件；
- 是否存在 React 和 Vue 两套实现；
- 是否存在独立的 Docs Preview；
- 是否通过 Portal 将浮层挂载到组件外部；
- 是否支持尺寸、状态、类型和主题变体；
- 是否存在已发布公共 API；
- 是否被业务组件或页面模板依赖。

## 4.2 检查已有能力

优先检查是否可以复用以下已有能力：

```text
Input
Select
Dropdown
Tag
Checkbox
Radio
Button
IconButton
Tooltip
Popover
Divider
Form
Typography
Design Tokens
公共 mixin
utility class
样式函数
```

禁止在复合组件中重新实现一套已经存在的基础样式。

## 4.3 检查影响范围

修改样式前，应搜索：

- 当前类名在项目中的全部使用位置；
- 当前变量的全部引用位置；
- React 和 Vue 中是否存在同名或等价样式；
- Docs、Demo、业务页面是否引用该组件；
- Arco 原生类名是否被其他组件共同使用；
- Popup、Portal 或 Overlay 是否由全局样式控制；
- 是否存在主题切换或运行时变量覆盖。

不得直接修改影响范围不明确的全局选择器。

---

# 5. 基础能力复用规则

## 5.1 输入类组件

以下组件应优先复用 Input 已优化能力：

- Input；
- InputNumber；
- InputTag；
- Textarea；
- AutoComplete；
- Search；
- Password；
- Cascader 的搜索输入区域；
- Select 的搜索输入区域。

需要保持一致的内容包括：

- 高度；
- 字体和字号；
- 边框；
- 圆角；
- 背景色；
- Placeholder；
- Prefix 和 Suffix；
- Clear 图标；
- Hover、Focus、Disabled、Error 状态；
- 尺寸规格。

不得在每个输入类组件中分别复制 Input 的完整样式。

## 5.2 下拉类组件

以下组件的下拉浮层应与已优化的 Select 和 Dropdown 保持一致：

- Select；
- Cascader；
- TreeSelect；
- AutoComplete；
- Dropdown；
- DatePicker；
- TimePicker；
- Mention；
- 带菜单的 Button；
- 其他使用 Trigger、Popup 或 Portal 的组件。

需要保持一致的内容包括：

- 浮层背景；
- 边框；
- 圆角；
- 阴影；
- 内边距；
- 选项高度；
- 文本样式；
- 图标尺寸；
- Hover 和 Selected 状态；
- Disabled 状态；
- 分组标题；
- 空状态；
- 滚动条；
- 浮层与触发器之间的间距。

## 5.3 选择类组件

Checkbox、Radio、Switch 等选择类组件应统一：

- 控件尺寸；
- 边框和填充；
- 选中颜色；
- Hover、Focus、Disabled 状态；
- 控件与 Label 的间距；
- Label 字体样式；
- Group 排列方式。

## 5.4 局部能力复用

以下局部能力一旦完成调优，应在其他组件中复用：

- Tag；
- Checkbox；
- Radio；
- IconButton；
- 图标容器；
- 分割线；
- 圆角；
- 间距；
- 填充色；
- 字体字号；
- 辅助文本；
- 状态颜色；
- Clear 按钮；
- 展开和收起图标；
- 选中标记。

Select、Cascader、InputTag、Tabs、TableToolbar 等复合组件不得重新定义一套相同能力。

## 5.5 新组件优化前的依赖检查

新组件优化前，必须先检查：

1. 是否直接复用了已有基础组件；
2. 是否可以通过已有组件 API 实现目标视觉；
3. 是否已有公共 Token、mixin 或 override 可复用；
4. 是否存在相同模式的已优化组件；
5. 是否需要先修复基础组件，而不是在复合组件中增加局部覆盖。

发现基础能力不足时，应先报告缺口，不得静默复制或魔改。

---

# 6. Arco Design 原生样式覆盖规则

当视觉样式未生效时，不得直接连续增加选择器层级或无条件添加 `!important`。必须先定位覆盖失败原因。

排查顺序：

1. 检查样式文件是否被正确加载；
2. 检查目标 DOM 的实际类名；
3. 检查样式作用域是否正确；
4. 检查 CSS Modules、Scoped CSS 或 Less 嵌套是否改变选择器；
5. 检查 Arco 原生选择器的权重；
6. 检查样式加载顺序；
7. 检查内联样式；
8. 检查 Portal 浮层是否位于当前作用域之外；
9. 检查 Hover、Focus、Selected 等状态类是否覆盖默认样式；
10. 检查主题变量是否在运行时覆盖组件样式；
11. 检查 React 和 Vue 的 DOM 结构或类名差异；
12. 检查 Docs Preview 容器是否产生额外影响。

## 6.1 推荐覆盖方式

优先采用以下方式：

- 使用组件根节点或统一前缀限制作用域；
- 使用与 Arco 原生选择器等价或略高的权重；
- 通过项目主题变量覆盖 Arco 变量；
- 将公共覆盖放入统一的 `overrides` 文件；
- 通过组件 API 传入 `className`、`popupClassName` 等；
- 对 Portal 浮层使用专用的全局作用域类。

推荐：

```less
.ds-select {
  &.arco-select {
    // 触发器样式
  }

  .arco-select-view {
    // 内容区域样式
  }
}

.ds-select-popup {
  .arco-select-option {
    // 浮层选项样式
  }
}
```

避免：

```less
.arco-select-option {
  // 可能影响项目中全部 Select
}
```

## 6.2 `!important` 使用限制

只有满足以下条件时才允许使用 `!important`：

- Arco 使用内联样式或高优先级状态样式，常规方式无法稳定覆盖；
- 已确认无法通过变量、加载顺序、作用域或组件 API 解决；
- 使用范围已限定在具体组件或状态内；
- React 和 Vue 中使用方式一致；
- 已补充注释说明原因；
- 在交付报告中明确记录。

示例：

```less
.ds-date-picker-popup {
  .arco-picker-cell-selected {
    background: var(--color-fill-brand) !important;
  }
}
```

禁止：

- 在全局选择器中大范围使用 `!important`；
- 为解决单个 Demo 问题修改全部组件；
- 通过无限增加类名层级提升权重；
- 同一个属性在多个文件中反复覆盖；
- 使用负 margin 或隐藏溢出掩盖结构问题。

---

# 7. 样式文件职责

React / Vue 的 `theme.css`、`components.less`、`overrides/*` 应尽量保持同源或语义等价。

## 7.1 `theme.css`

用于：

- Design Tokens；
- 全局设计变量；
- 主题相关变量；
- React 和 Vue 共用的基础值。

不用于：

- 单个组件的复杂 DOM 样式；
- 临时 Bug 修复；
- Demo 专用样式。

## 7.2 `components.less`

用于：

- 多个组件共用的结构样式；
- 通用组件模式；
- 公共 mixin；
- 基础组件共享能力。

不用于：

- 无作用域的 Arco 全局覆盖；
- 单个业务页面样式；
- Docs Preview 布局。

## 7.3 `overrides/*`

用于：

- 对 Arco Design 原生组件的定向覆盖；
- 无法通过变量完成的第三方组件样式覆盖；
- Portal、Popup 等特殊节点的全局样式。

覆盖文件应尽量按组件拆分：

```text
overrides/
├── input.less
├── select.less
├── dropdown.less
├── cascader.less
└── date-picker.less
```

## 7.4 组件局部样式

用于：

- 当前组件独有的结构；
- 当前组件内部布局；
- 不会被其他组件复用的视觉规则。

## 7.5 Docs 样式

用于：

- Preview 容器；
- 示例排列；
- Demo 工具栏；
- 类型切换按钮；
- 文档展示辅助样式。

Docs 样式不得影响实际组件包。

---

# 8. React / Vue 同源规则

React 和 Vue 的：

- `theme.css`；
- `components.less`；
- `overrides/*`；
- 组件局部样式；
- Docs Preview；

应尽量保持同源、同结构或语义等价。

每次修改时必须检查：

1. React 是否需要同步；
2. Vue 是否需要同步；
3. 两端使用的变量名是否一致；
4. 两端 DOM 结构差异是否会导致样式失效；
5. 两端状态类和浮层类是否一致；
6. 两端 Docs Preview 是否展示相同的组件变体；
7. 两端的默认值、尺寸和状态表现是否一致。

允许因框架实现不同而调整选择器，但最终视觉结果必须等价。

不得只完成 React 样式后，将 Vue 标记为完成。

---

# 9. 组件状态覆盖规则

每个组件不能只调优默认状态。必须根据组件能力检查以下状态：

```text
Default
Hover
Active
Focus
Focus Visible
Selected
Checked
Expanded
Loading
Disabled
Readonly
Error
Warning
Success
Empty
有值 / 无值
单选 / 多选
可清除 / 不可清除
有前缀 / 无前缀
有后缀 / 无后缀
浅色主题 / 深色主题
不同尺寸
不同组件类型
```

不存在的状态可以跳过，但不得遗漏组件实际支持的状态。

状态样式应保证：

- 不依赖鼠标时也能识别 Focus；
- Disabled 状态仍具有可读性；
- Error 状态不只依赖颜色传达；
- Hover、Focus、Selected 之间不存在视觉冲突；
- 图标和文字状态同步变化。

---

# 10. 尺寸和布局规则

组件尺寸应由统一变量或公共规则控制。

需要检查：

- 组件整体高度；
- 左右内边距；
- 图标与文字间距；
- 控件与 Label 间距；
- 多行内容行高；
- 浮层选项高度；
- 不同尺寸之间的差值；
- 边框是否影响最终尺寸；
- Loading 图标是否导致内容位移；
- Clear、Arrow 等图标是否挤压文本。

不得为了匹配某一个 Demo，通过固定宽度破坏组件的自适应能力。

除设计稿明确要求外，应避免：

- 无依据的固定宽度；
- 依赖绝对定位完成基础布局；
- 通过负 margin 修正整体位置；
- 通过隐藏溢出掩盖结构问题。

---

# 11. Docs Preview 规则

Docs Preview 用于验证组件完整能力，不仅用于展示默认状态。

要求：

1. 多类型切换按钮保持统一位置；
2. Preview 的操作区、组件区和说明区保持统一布局；
3. React 和 Vue 的示例顺序保持一致；
4. 默认展示最常用类型；
5. 不同尺寸、状态和变体应可快速切换；
6. Preview 容器不得改变组件真实尺寸；
7. Demo 样式不得污染组件样式；
8. Popup、Dropdown、Tooltip 等浮层必须可以正常展示；
9. 组件出现样式问题时，先确认是组件问题还是 Demo 容器问题；
10. 调优完成后，在 Docs 中补充对应状态或变体示例。

Docs 热更新异常时，可以默认执行以下操作：

1. 停止当前 dev server；
2. 清理异常进程或端口占用；
3. 重新启动 dev server；
4. 检查修改是否正常加载。

重启 Docs 不代表需要进入发布流程。

---

# 12. Codex 执行流程

## Phase 0：只读分析

Codex 首先：

1. 阅读仓库根目录及相关目录的 `AGENTS.md`；
2. 读取本规范；
3. 读取相关 Figma 组件和 Variables；
4. 定位 React、Vue 和 Docs 文件；
5. 检查 Arco 原生组件结构；
6. 查找可复用的已有样式；
7. 列出当前设计稿与实现的差异；
8. 判断修改影响范围；
9. 不修改任何代码。

输出：

```text
任务类型
仓库结构摘要
相关文件
可复用基础组件
可复用 Token / 样式
Figma 与实现差异
Arco 样式覆盖风险
React / Vue 差异
可能冲突
缺失信息
建议实现路径
预计修改文件
```

## Phase 1：修改方案

修改前说明：

- 准备复用哪些变量；
- 准备复用哪些基础组件能力；
- 需要修改哪些文件；
- 是否涉及全局覆盖；
- 是否涉及 Portal 浮层；
- React 和 Vue 如何保持一致；
- 是否存在兼容性风险；
- 是否需要新增 Token；
- 是否需要修改 Docs 和测试。

## Phase 2：实现

实现顺序：

```text
公共变量或公共能力
→ React
→ Vue
→ Docs Preview
→ 测试
```

要求：

- 避免无关重构；
- 避免修改组件公共 API；
- 避免引入新的重复样式；
- 不改变原有交互和事件语义；
- 不因视觉问题删除状态或功能。

## Phase 3：验证

至少验证：

- 默认状态；
- Hover；
- Focus；
- Disabled；
- Error；
- 主要尺寸；
- 主要类型；
- 浮层；
- React；
- Vue；
- Docs Preview；
- 原有功能和事件。

## Phase 4：交付总结

完成后输出：

- 修改文件；
- 复用的变量和能力；
- 解决的样式差异；
- 是否使用 `!important` 及原因；
- React / Vue 是否同步；
- 已执行的测试和构建；
- 兼容性风险；
- 仍存在的风险或待确认项；
- 建议版本号。

---

# 13. 调试与 Bug Fix 规则

Bug 修复时，应优先修复根因，而不是只修复当前截图中的现象。

需要区分：

- 设计稿差异；
- CSS 权重问题；
- DOM 结构差异；
- 组件逻辑问题；
- Demo 问题；
- 构建缓存问题；
- 热更新问题；
- React / Vue 实现差异；
- Arco 版本差异；
- 浏览器兼容问题。

禁止为了修复样式问题：

- 修改无关业务逻辑；
- 改变组件 API；
- 删除已有状态；
- 隐藏问题元素；
- 直接移除 Arco 的功能类名；
- 将组件样式写入业务页面；
- 只修复 Docs 而不修复组件源码。

---

# 14. 测试与验收规则

组件完成调优后，应根据项目能力执行：

```text
lint
typecheck
unit test
component test
build
docs build
React build
Vue build
browser smoke
visual regression
```

建议至少覆盖：

- 组件能正常渲染；
- 主要 Props 正常工作；
- 状态切换正常；
- ClassName 和样式作用域正常；
- Popup 正常挂载；
- Disabled、Error 等状态正常；
- React 和 Vue 的核心表现一致。

视觉验收应检查：

- 与 Figma 默认状态一致；
- 与 Figma 各主要变体一致；
- 与同类已优化组件一致；
- 不存在 Arco 原生样式残留；
- 不存在新增的局部不一致；
- 不影响其他组件和业务页面。

---

# 15. Definition of Done

一个组件只有满足以下条件，才能标记为“调优完成”：

## 设计与视觉

- [ ] 已对齐最新 Figma 设计稿；
- [ ] 已优先使用设计变量；
- [ ] 已复用已有基础组件能力；
- [ ] 已覆盖组件主要状态；
- [ ] 已处理 Popup 或 Portal 浮层；
- [ ] 已解决明显的 Arco 原生样式残留。

## 工程

- [ ] React 和 Vue 表现一致；
- [ ] Docs Preview 已更新；
- [ ] 未引入大范围无作用域覆盖；
- [ ] 未无依据增加 `!important`；
- [ ] 未破坏原有交互和公共 API；
- [ ] 无重复样式和重复 Token。

## 验证

- [ ] 已通过必要测试和构建；
- [ ] 已检查主要尺寸和状态；
- [ ] 已检查 Popup / Portal；
- [ ] 已检查 React / Vue；
- [ ] 已记录修改内容和遗留问题。

只完成默认状态，或只完成 React、Vue 中的一端，不得计入完成进度。

---

# 16. 发布流程规则

如果属于正式 Bug Fix 或组件调优交付，完成后按照 `AGENTS.md` 要求执行：

1. 补充或更新测试；
2. 执行类型检查和构建；
3. 更新版本；
4. 整理提交信息；
5. 提交代码；
6. 执行发布流程。

以下操作不自动进入发布流程：

- 本地调试；
- 启动或重启 dev server；
- 环境迁移；
- 项目路径迁移；
- 依赖排查；
- 临时验证；
- Demo 启动；
- 尚未完成的试验性修改。

除非任务明确要求，否则 Codex 不得因为启动、调试或迁移操作自动修改版本、提交代码或发布组件。

---

# 17. 禁止事项

Codex 在组件调优过程中不得：

- 只根据截图猜测样式值；
- 在已有变量可用时写死颜色和尺寸；
- 为每个组件复制一套相同样式；
- 只修改 React，不检查 Vue；
- 只修改组件，不检查 Docs；
- 大范围覆盖 `.arco-*` 全局类名；
- 无条件使用 `!important`；
- 通过无限增加选择器层级解决权重问题；
- 使用负 margin 掩盖结构问题；
- 使用固定宽度破坏响应式；
- 为匹配视觉稿删除交互状态；
- 修改与当前任务无关的组件；
- 在未验证影响范围前修改全局变量；
- 将 Docs 样式混入组件包；
- 在未完成测试时直接发布；
- 将调试、启动或迁移操作视为正式发布任务。

---

# 18. 可直接投喂 Codex 的主指令

```text
你现在正在 DesignKit Monorepo 中进行基础组件样式调优。

请严格遵循以下原则：

1. 先阅读仓库根目录和相关目录下的 AGENTS.md。
2. 阅读 designkit-base-component-style-optimization-guideline.md。
3. 先进行只读检查，不要立即修改代码。
4. 识别现有 React、Vue、Token、Docs、测试和发布结构。
5. 读取相关 Figma 节点、Variables、组件属性和变体。
6. 优先复用已有 Design Tokens 和已优化基础组件能力。
7. 不得仅凭截图写死颜色、间距、字号、圆角和阴影。
8. 禁止大范围覆盖 .arco-*，禁止无条件使用 !important。
9. React 与 Vue 必须保持关键视觉结果一致。
10. Docs Preview 必须调用真实组件，不得污染组件源码。
11. 不得因视觉调优改变公共 API、事件语义或交互能力。
12. 未明确授权时，不修改版本、不提交、不发布。

本次目标组件：
{{COMPONENT_NAME}}

相关 Figma：
{{FIGMA_OR_SPEC}}

相关 Docs：
{{DOCS_PATH_OR_ROUTE}}

请先执行 Phase 0，只读分析，并输出：

1. 组件结构和依赖；
2. 可复用基础能力；
3. Token 和样式来源；
4. Figma 与当前实现的差异；
5. Arco 原生样式残留；
6. 样式优先级问题；
7. Popup / Portal 情况；
8. React / Vue 差异；
9. 预计修改文件；
10. 建议实现方案；
11. 兼容性风险。

Phase 0 不修改代码。
```
