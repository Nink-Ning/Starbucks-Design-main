# DesignKit FilterBar 标杆业务组件｜Codex 完整执行指令

> 本文可直接整体投喂给 Codex。  
> 目标不是只完成一个筛选表单，而是建立 DesignKit 第一套可被后续同事复制的业务组件标准样板。  
> 执行范围包括：组件契约、共享模型、React、Vue、样式与 Token、Docs、Recipes、AI Skill、Evaluator、测试及交付报告。

---

# 0. 执行身份与最终目标

你现在正在 DesignKit 企业级 Design System Monorepo 中建设第一个标杆业务组件：

```text
FilterBar / 筛选栏
```

所属 Docs 分类：

```text
业务组件 / 查询与查看
```

FilterBar 的业务任务是：

> 在列表、表格或数据内容区域上方，展示一组高频、稳定、直接可见的筛选条件，并稳定管理“用户正在填写的值”“已经应用到结果的数据条件”“查询”“重置”“展开与收起”之间的关系。

这次任务的真正目标有两个：

1. 交付可在真实项目中使用的 FilterBar。
2. 建立一套后续业务组件可复制的标准工程样板。

后续同事应能够参考 FilterBar 的目录、契约、Docs、Skill、Evaluator 和测试方式，继续建设：

```text
AdvancedFilter
ActiveFilters
TableToolbar
BatchActions
FormDrawer
RiskConfirm
ImportWizard
ApprovalActions
```

不要只追求“页面看起来像设计稿”。必须完成以下闭环：

```text
真实业务场景
→ 组件边界
→ 共享契约
→ React / Vue 实现
→ Docs 场景
→ AI Skill
→ Evaluator
→ 自动测试
→ 浏览器验证
→ 交付报告
```

---

# 1. 权威来源与优先级

执行时按照以下优先级判断，不得颠倒：

```text
1. 仓库根目录及相关目录的 AGENTS.md
2. 仓库已有工程、发布、测试与文档约束
3. 已发布公共 API 和兼容性要求
4. Figma Variables / Design Tokens
5. FilterBar 设计规范与设计决策
6. 已有基础组件及其 API
7. 本任务书
8. 模型的一般经验
```

如果上层来源与下层来源冲突：

- 记录冲突
- 说明影响
- 优先遵循上层来源
- 不得自行覆盖已发布约束

截图只用于理解结构与场景，不是颜色、间距、尺寸和样式的精确数据来源。

视觉实现必须来自：

```text
Figma Variables
→ Design Tokens
→ 基础组件 Token
→ FilterBar 语义 Token
```

不得从截图估算并写死颜色、间距、圆角、字号或阴影。

---

# 2. 强制执行原则

## 2.1 先审计，后编码

开始时必须先进行只读检查。

不得在不了解仓库的情况下直接新建组件目录、修改构建配置或安装依赖。

## 2.2 优先复用基础组件

必须优先复用仓库中已有的：

```text
Form
FormItem
Input
Select
MultiSelect
DatePicker
DateRangePicker
Cascader
TreeSelect
UserPicker
Button
IconButton
Grid
Space
Tooltip
Tag
Spin / Loading
Alert
```

如名称不同，以仓库真实组件为准。

禁止：

- 在 FilterBar 内重新实现 Input、Select、Button 等基础控件
- 复制基础组件源码形成私有版本
- 绕过基础组件 API 操作其内部 DOM
- 大范围覆盖 `.ant-*`、`.arco-*` 或其他基础库内部类名
- 无条件使用 `!important`
- React、Vue 和 Docs 分别维护三套不一致样式

如基础组件不足，先在报告中列出能力缺口，再判断：

```text
A. 扩展基础组件
B. 新增通用基础能力
C. 在 FilterBar 中提供最小适配层
```

不得静默复制或魔改。

## 2.3 不制造万能组件

FilterBar 只解决“稳定的并列筛选条件”任务。

本期禁止把以下能力塞进 FilterBar：

```text
动态添加条件
删除条件行
AND / OR
条件组
嵌套逻辑
保存筛选方案
共享筛选方案
复杂查询语法
完整 Query Builder
高级筛选抽屉
跨页面筛选管理
数据表格 request 管理
分页管理
导出管理
```

这些能力分别属于：

```text
AdvancedFilter
QueryBuilder
SavedFilters
页面容器
Table / ProTable
业务 Recipe
```

不能通过不断增加布尔 Props，把 FilterBar 变成全部查询场景的万能容器。

## 2.4 行为正确优先于截图相似

FilterBar 的核心质量是：

- 值不会丢
- 查询时机正确
- 重置行为可预测
- 已生效条件可感知
- 权限不会泄漏
- 展开收起稳定
- React / Vue 一致
- AI 能稳定选择与使用

视觉像设计稿但状态错误，视为不合格。

---

# 3. FilterBar 的适用边界

## 3.1 应当使用 FilterBar

满足以下大部分条件时优先使用：

- 页面主体是列表、表格或数据内容区域
- 常用筛选条件通常为 2–6 个
- 完整条件通常不超过 12 个
- 条件字段相对稳定
- 条件之间主要是简单并列关系
- 用户需要直接看到常用筛选范围
- 低频字段可以通过展开显示
- 查询结果由外部列表或表格承载

## 3.2 不应使用 FilterBar

以下场景必须切换到其他能力：

| 场景 | 应使用 |
|---|---|
| 只有一个关键词查询 | SearchBar |
| 条件多、动态添加，但没有复杂嵌套 | AdvancedFilter |
| 需要保存、共享或复用查询条件 | SavedFilters + AdvancedFilter |
| 存在 AND / OR、条件组、嵌套逻辑 | QueryBuilder |
| 筛选作用于整个页面多个完全不同的数据域 | 页面级 Filter Context 或页面模板 |
| 需要回显大量已经生效的条件 | ActiveFilters |
| 需要管理表格请求、分页、排序和筛选 | Table / ProTable Recipe |

## 3.3 与 AdvancedFilter 的边界

FilterBar 可以支持：

```text
默认显示高频字段
展开显示低频字段
显示隐藏区域中生效条件的数量或摘要
```

FilterBar 不支持：

```text
用户动态添加字段
复杂条件关系
保存方案
条件分组
嵌套查询
```

“条件多一点”不等于 AdvancedFilter。

当用户只是需要展开更多静态字段时，仍然属于 FilterBar 的可展开变体。

---

# 4. V1 交付范围

V1 必须完成：

```text
1. Schema 驱动的字段渲染
2. 高频字段与低频字段
3. 2 / 3 / 4 / 1 列响应式布局
4. 手动查询模式
5. 条件变化自动查询模式
6. 展开与收起
7. 填写值 Draft Values
8. 已生效值 Active Values
9. 查询
10. 重置
11. 隐藏区域生效条件提示
12. 表单校验
13. Loading
14. Disabled
15. 字段可见与字段禁用权限
16. 受控与非受控使用方式
17. React / Vue
18. Docs
19. Skill
20. Evaluator
21. 自动测试
```

V1 不要求：

```text
SavedFilters
QueryBuilder
URL Sync 核心实现
服务端请求封装
完整表格组件
复杂联动引擎
跨页面状态中心
可视化 Schema 编辑器
```

URL 同步可以作为 Recipe 或外部 Hook / Composable 示例，不进入 FilterBar 核心。

---

# 5. 组件 Anatomy

FilterBar 由以下稳定区域组成：

```text
01 Filter Container
02 Field Area
03 Primary Fields
04 Secondary / Collapsible Fields
05 Action Area
06 Submit Action
07 Reset Action
08 Expand / Collapse Control
09 Hidden Active Summary
10 Validation Feedback
```

## 5.1 Filter Container

负责：

- 背景和容器关系
- 内部间距
- 响应式布局
- 表单语义
- 与外部内容区域的空间关系

FilterBar 不负责：

- 页面标题
- 表格标题
- 新增按钮
- 导入导出
- 列配置
- 分页
- 查询结果

这些由页面、TableToolbar 或 Recipe 负责。

## 5.2 Field Area

负责按 Schema 渲染筛选字段。

字段顺序遵循 Schema 顺序，不得为了布局自行改变业务字段顺序。

## 5.3 Primary Fields

高频条件，收起状态下保持可见。

## 5.4 Secondary Fields

低频条件，仅展开时展示。

收起时：

- 字段组件可以不渲染或隐藏
- 字段值必须保留
- 已生效值必须保留
- 不能进入 Tab 顺序
- 不能因为收起触发清空

## 5.5 Action Area

包含：

```text
查询
重置
展开 / 收起
```

V1 采用稳定策略：

> 操作区始终位于筛选容器的最后一行右侧，并占据独立的完整网格行。

这样确保：

- 展开前后水平方向不跳动
- 查询和重置位置稳定
- 不因字段类型和宽度发生随机换位
- 响应式降级可预测

如仓库现有设计规范明确采用其他稳定策略，以仓库规范为准，但需要在契约中说明。

## 5.6 Hidden Active Summary

当收起区域内存在已经生效的条件时，必须提供感知。

推荐表达：

```text
展开更多 · 2 个条件生效
```

或：

```text
隐藏条件：2
```

不能只改变按钮颜色。

---

# 6. 状态模型

FilterBar 必须明确区分两组值。

## 6.1 Draft Values

用户当前正在编辑的字段值。

Draft Values 可能尚未应用到结果。

## 6.2 Active Values

已经应用到当前结果的数据条件。

Active Values 用于：

- 查询结果语义
- 隐藏条件生效提示
- ActiveFilters 回显
- 重置
- 外部 URL 或状态同步
- Evaluator 判断

禁止只维护一个 `values`，导致用户修改字段后，页面无法判断结果是否已经使用新条件。

## 6.3 状态机

```text
Initial
  ↓ 用户修改字段
Editing / Dirty
  ↓ 手动查询或自动提交
Validating
  ├─ 校验失败 → Editing + Validation Error
  └─ 校验通过
        ↓
Submitting / Loading
  ├─ 外部请求失败 → Applied + External Error
  └─ 外部请求成功 → Applied
```

展开状态独立：

```text
Collapsed ⇄ Expanded
```

权限状态独立：

```text
Visible
Hidden by Permission
Disabled by Permission
```

## 6.4 核心状态规则

### 用户修改字段

- 更新 Draft Values
- 触发值变化事件
- 手动模式不更新 Active Values
- 自动模式在 debounce 后校验并提交

### 点击查询

- 校验当前 Draft Values
- 校验失败时不更新 Active Values
- 聚焦或滚动到第一个错误字段
- 校验成功后更新 Active Values
- 触发提交事件
- 外部通过 `loading` 控制加载状态

### 点击重置

默认行为固定为：

```text
恢复初始值
→ 同步更新 Draft Values
→ 同步更新 Active Values
→ 触发 reset
→ 触发一次 submit，source = reset
```

原因：B 端筛选中的“重置”通常意味着结果也恢复到默认范围。

如仓库既有规范不同，以仓库规范为准，但不得保持模糊。

### 展开与收起

- 不修改 Draft Values
- 不修改 Active Values
- 不触发 submit
- 不触发 reset
- 只触发展开状态事件

### Loading

Loading 时：

- 禁止重复提交
- 查询按钮显示加载反馈
- 重置按钮默认禁用，避免请求期间状态竞争
- 展开与收起可以保持可用
- 字段是否禁用遵循仓库现有表单规范
- `aria-busy=true`

### 外部请求失败

FilterBar 不管理结果错误内容。

由外部 Recipe / Table 展示 Error 与 Retry。

FilterBar 继续保留：

- Draft Values
- Active Values
- 当前展开状态

---

# 7. 共享数据契约

先根据仓库现有命名和类型风格调整。不得机械照搬以下类型。

## 7.1 基础类型

```ts
export type FilterValue = Record<string, unknown>;

export type FilterSubmitMode = 'manual' | 'change';

export type FilterResetMode = 'initial' | 'empty';

export type FilterFieldPriority = 'primary' | 'secondary';

export type FilterFieldType =
  | 'input'
  | 'select'
  | 'multiSelect'
  | 'date'
  | 'dateRange'
  | 'cascader'
  | 'treeSelect'
  | 'userPicker'
  | 'custom';

export interface FilterOption<Value = unknown> {
  label: string;
  value: Value;
  disabled?: boolean;
}

export interface FilterBarColumns {
  xl?: 4 | 3 | 2 | 1;
  lg?: 4 | 3 | 2 | 1;
  md?: 4 | 3 | 2 | 1;
  sm?: 2 | 1;
  xs?: 1;
}
```

## 7.2 Field Schema

```ts
export interface FilterFieldSchema<Value = unknown> {
  /** 唯一字段名，与表单值键一致 */
  name: string;

  /** 用户可见标签 */
  label: string;

  /** 已注册的筛选控件类型 */
  type: FilterFieldType;

  /** 高频字段默认 primary，低频字段 secondary */
  priority?: FilterFieldPriority;

  /** 占用列数。V1 仅允许 1 或 2 */
  span?: 1 | 2;

  /** 初始值；如与 FilterBar initialValues 冲突，以 initialValues 为准 */
  defaultValue?: Value;

  placeholder?: string;

  options?: FilterOption<Value>[];

  required?: boolean;

  /** 字段是否展示。false 时同时从可提交值中移除 */
  visible?: boolean;

  /** 展示但不可编辑 */
  disabled?: boolean;

  /** 权限标识，由外部权限适配器解析 */
  permission?: string | string[];

  /** 使用已有 Form 的校验规则类型 */
  rules?: unknown[];

  /** 传递给已注册基础控件的有限配置 */
  controlProps?: Record<string, unknown>;

  /** 提交前标准化值 */
  transform?: (value: Value, values: FilterValue) => unknown;

  /** 用于隐藏条件提示或 ActiveFilters 回显 */
  formatActiveValue?: (value: Value) => string;
}
```

约束：

- `controlProps` 只是有限逃生口，不得无约束透传任意基础组件内部属性。
- AI 生成时应优先使用已注册字段类型。
- `custom` 字段必须显式注册渲染器，不能由 AI 现场手写。
- Schema 必须可被 React / Vue 和 Docs 共同理解。
- 如函数字段无法跨框架共享，应拆成框架适配器或注册表，不复制核心语义。

## 7.3 提交元信息

```ts
export type FilterSubmitSource = 'submit' | 'change' | 'reset';

export interface FilterSubmitMeta {
  source: FilterSubmitSource;
  changedField?: string;
}

export interface FilterResetMeta {
  mode: FilterResetMode;
}
```

---

# 8. 推荐公共 API

先检查仓库现有 API 风格。以下是目标语义，不要求逐字使用。

## 8.1 React API

```ts
export interface FilterBarProps {
  fields: FilterFieldSchema[];

  /** 用户正在编辑的值 */
  value?: FilterValue;

  /** 非受控 Draft 初始值 */
  defaultValue?: FilterValue;

  /** 已应用到当前结果的值 */
  activeValues?: FilterValue;

  /** 非受控 Active 初始值 */
  defaultActiveValues?: FilterValue;

  /** 响应式列数 */
  columns?: 1 | 2 | 3 | 4 | FilterBarColumns;

  /** 未标记 priority 时，收起状态展示的前 N 个字段 */
  defaultVisibleCount?: number;

  collapsible?: boolean;

  expanded?: boolean;

  defaultExpanded?: boolean;

  submitMode?: FilterSubmitMode;

  /** submitMode=change 时使用 */
  debounceMs?: number;

  resetMode?: FilterResetMode;

  loading?: boolean;

  disabled?: boolean;

  showSubmit?: boolean;

  showReset?: boolean;

  submitText?: string;

  resetText?: string;

  onValuesChange?: (
    values: FilterValue,
    changedField?: string
  ) => void;

  onActiveValuesChange?: (
    values: FilterValue,
    meta: FilterSubmitMeta
  ) => void;

  onSubmit?: (
    values: FilterValue,
    meta: FilterSubmitMeta
  ) => void | Promise<void>;

  onReset?: (
    values: FilterValue,
    meta: FilterResetMeta
  ) => void;

  onExpandedChange?: (expanded: boolean) => void;

  onValidateFailed?: (errors: unknown[]) => void;
}
```

## 8.2 Vue API 映射

Vue 使用框架惯例，但语义必须与 React 一致。

| 共享语义 | React | Vue |
|---|---|---|
| Draft Values | `value` | `modelValue` |
| Draft 变化 | `onValuesChange` | `update:modelValue` + `values-change` |
| Active Values | `activeValues` | `activeValues` |
| Active 变化 | `onActiveValuesChange` | `update:activeValues` + `active-values-change` |
| Expanded | `expanded` | `expanded` |
| Expanded 变化 | `onExpandedChange` | `update:expanded` + `expanded-change` |
| Submit | `onSubmit` | `submit` |
| Reset | `onReset` | `reset` |
| 校验失败 | `onValidateFailed` | `validate-failed` |

不得出现：

- 两端默认值不同
- 两端 reset 语义不同
- 两端 submit 时机不同
- 一端更新 Active Values，另一端不更新
- 一端收起后清空隐藏值
- 同名参数结构不同

## 8.3 默认值

如仓库没有更高优先级规则，采用：

```ts
columns = {
  xl: 4,
  lg: 3,
  md: 2,
  sm: 1,
  xs: 1
}

defaultVisibleCount = 4
collapsible = fields.length > defaultVisibleCount
defaultExpanded = false
submitMode = 'manual'
debounceMs = 300
resetMode = 'initial'
loading = false
disabled = false
showSubmit = true
showReset = true
```

## 8.4 受控与非受控规则

Draft Values：

```text
value 存在 → 受控
value 不存在 → 使用内部状态，从 defaultValue 初始化
```

Active Values：

```text
activeValues 存在 → 受控
activeValues 不存在 → 使用内部状态，从 defaultActiveValues 或 defaultValue 初始化
```

禁止：

- 受控值和内部值同时作为真相源
- 外部 value 改变但内部表单不同步
- activeValues 受控时组件仍静默修改内部 Active 状态
- React / Vue 同步策略不一致

---

# 9. 字段渲染规则

## 9.1 字段注册表

建立统一字段类型到基础组件的映射。

示例：

```text
input → Input
select → Select
multiSelect → Select[multiple]
date → DatePicker
dateRange → DateRangePicker
cascader → Cascader
treeSelect → TreeSelect
userPicker → UserPicker
```

字段注册表必须：

- 复用已有基础组件
- 有统一值格式
- 有统一 disabled / visible / loading 处理
- 有统一 placeholder 策略
- 支持 React / Vue 对齐
- 可被 AI Skill 引用

## 9.2 字段值空判断

必须建立统一 `isFilterValueEmpty`。

建议语义：

```text
undefined → empty
null → empty
'' → empty
[] → empty
有效的 0 → not empty
false → not empty
有效日期 → not empty
有值对象 → not empty
```

不得使用简单 `Boolean(value)` 判断，否则 `0` 和 `false` 会被错误视为空。

## 9.3 字段可见性与权限

`visible=false` 或权限无权访问时：

- 不渲染字段
- 不进入 Tab 顺序
- 不出现在提交值
- 不出现在 Active Values
- 不出现在隐藏条件提示
- 不在 DOM 中泄漏字段标签和值

`disabled=true` 或只读权限时：

- 字段可以展示
- 不允许修改
- 既有值可以保留
- 具体是否提交遵循仓库表单规范并在契约中说明

## 9.4 Primary 与 Secondary

判定顺序：

1. 明确 `priority='primary'` 的字段在收起状态展示。
2. 明确 `priority='secondary'` 的字段在收起状态隐藏。
3. 未指定 priority 的字段，根据 Schema 顺序和 `defaultVisibleCount` 判定。
4. 不改变 Schema 原始字段顺序。

## 9.5 Span

V1 仅支持：

```text
span=1
span=2
```

日期范围、组织选择器等需要更宽空间时允许 `span=2`。

不要支持任意栅格跨度，避免布局 API 膨胀。

---

# 10. 布局与响应式规则

## 10.1 默认列数

```text
≥ XL：4 列
LG：3 列
MD：2 列
SM / XS：1 列
```

以仓库现有 Breakpoints 为准。

## 10.2 字段排列

- 保持 Schema 顺序
- 标签和控件垂直排列
- 同一行字段顶部与控件基线对齐
- 字段间距使用 Token
- `span=2` 时占据连续两列
- 不允许因为字段宽度造成横向溢出

## 10.3 操作区

- 独立占据最后一行
- 右对齐
- 移动端左对齐或全宽，遵循现有移动规范
- 查询为主要操作
- 重置为次要操作
- 展开控制使用文字按钮
- 操作顺序保持稳定

推荐顺序：

```text
展开 / 收起
重置
查询
```

如现有设计规范顺序不同，以规范为准，但 React / Vue 必须一致。

## 10.4 容器关系

FilterBar 支持被放置在：

```text
页面顶部
内容容器内部
表格 / 列表上方
```

FilterBar 核心组件不通过 `placement` Prop 决定外部容器样式。

容器关系通过页面布局或 Recipe 表达。

---

# 11. 查询、重置与自动提交

## 11.1 Manual 模式

默认模式。

用户修改字段时：

```text
只更新 Draft Values
不更新 Active Values
不触发 submit
```

点击查询时：

```text
校验
→ transform
→ 更新 Active Values
→ active-values-change
→ submit
```

按 Enter：

- 当焦点位于可提交文本输入中时，触发查询
- 不在多行输入或组合控件中误触发
- 由现有 Form 行为和字段适配器共同实现

## 11.2 Change 模式

用户修改字段后：

```text
更新 Draft Values
→ debounce
→ 校验
→ 更新 Active Values
→ submit(source='change')
```

要求：

- 默认 debounce 300ms
- 快速连续变化只提交一次
- loading 时不重复提交
- 日期范围未完整选择时不提交
- 输入法组合输入期间不提交
- React / Vue 时机一致

## 11.3 Reset

默认恢复：

```text
initialValues
```

如果 `resetMode='empty'`：

```text
恢复为空值
```

重置必须：

- 清理字段错误
- 更新 Draft Values
- 更新 Active Values
- 保留展开状态
- 触发 reset
- 触发 submit(source='reset')
- 不清除无权限字段，因为它们本就不应存在于状态中

---

# 12. 展开、收起与隐藏生效条件

## 12.1 收起不能造成数据丢失

BLOCK：

- 收起后 Draft Values 丢失
- 收起后 Active Values 丢失
- 再展开时字段回到默认值
- 收起直接触发查询
- 收起直接触发重置

## 12.2 隐藏生效条件计数

统计对象：

```text
当前收起状态下不可见的字段
∩
Active Values 中非空的字段
```

不统计：

- Draft 中填写但尚未提交的值
- 无权限字段
- `visible=false` 字段
- 空值
- 已经显示的 Primary 字段

## 12.3 提示方式

最低要求：

```text
展开更多 · N 个条件生效
```

可选增强：

- Tooltip 显示条件摘要
- 与 ActiveFilters 组合展示
- 点击提示直接展开

不能仅用颜色或图标表示。

---

# 13. 校验规则

FilterBar 使用现有 Form 校验体系。

提交时：

1. 校验所有可提交字段，包括收起区域字段。
2. 收起区域有错误时自动展开。
3. 定位第一个错误字段。
4. 不更新 Active Values。
5. 不触发 submit。
6. 触发 validate-failed。

高风险查询可以存在必填筛选，例如：

```text
必须选择组织
必须指定时间范围
```

但默认筛选字段不应为了形式完整全部设为 required。

---

# 14. Loading、Error、Empty 的边界

## 14.1 FilterBar Core

FilterBar Core 负责：

```text
submit loading
字段 disabled
校验错误
提交防重复
```

## 14.2 Recipe / Page

外部 Recipe 负责：

```text
Result Loading
Result Empty
Result Error
Retry
Table Data
Pagination
Request
```

Docs 必须展示 FilterBar 与结果区域联动，但不能把表格 request、分页和数据渲染塞进 FilterBar 核心。

推荐 Recipe：

```text
FilterBar
→ onSubmit
→ useListRequest
→ Table
→ Loading / Empty / Error
```

---

# 15. 样式与 Token

必须先寻找并复用现有 Token。

只有现有 Token 无法表达稳定业务语义时，才可以新增 FilterBar Token。

可能需要的语义 Token：

```text
filterBarPadding
filterBarFieldGap
filterBarRowGap
filterBarActionGap
filterBarBackground
filterBarBorderColor
filterBarBorderRadius
filterBarHiddenActiveColor
```

最终名称遵循仓库 Token 规范。

禁止：

- 复制颜色值
- 复制基础表单控件尺寸
- 为 Input / Select 设置私有高度
- 通过深层选择器修改基础组件
- React / Vue 独立定义视觉值

建议：

- 样式同源
- CSS Variables 或现有主题方案
- 业务组件只管理布局和业务状态样式
- 控件外观由基础组件负责

---

# 16. 推荐逻辑目录

必须先映射到仓库真实结构，不得未经审计直接创建下列目录。

逻辑上应包含：

```text
filter-bar/
├── shared/
│   ├── types
│   ├── schema
│   ├── normalize-fields
│   ├── normalize-values
│   ├── value-empty
│   ├── active-hidden-count
│   ├── state
│   └── tokens
├── react/
│   ├── FilterBar
│   ├── useFilterBar
│   ├── field-registry
│   └── index
├── vue/
│   ├── FilterBar
│   ├── useFilterBar
│   ├── field-registry
│   └── index
├── styles/
├── tests/
├── demos/
├── SKILL.md
├── evaluator.md
├── CHANGELOG.md
└── README.md
```

原则：

- 共享纯类型、纯函数和状态规则
- React Hook 与 Vue Composable 仅负责框架绑定
- 不复制核心状态逻辑
- 样式同源
- Docs 调用真实包导出
- Skill 和 Evaluator 与组件放在同一版本链路

如果仓库不支持 shared 跨框架代码，仍需建立可验证的行为契约测试，避免两套实现漂移。

---

# 17. Docs 标杆页面

沿用仓库当前 Docs 外层：

```text
顶部：全局配置 / 基础组件 / 业务组件 / 页面模板 / Skills
左侧：两级菜单
中间：正文
右侧：目录
React / Vue 切换
```

左侧位置：

```text
业务组件
└── 查询与查看
    └── 筛选栏 FilterBar
```

组件页面必须按以下顺序建设。

## 17.1 Header

包含：

```text
筛选栏 FilterBar
一句话定义
Business Component
Query & View
Stable / Beta（按真实状态）
React / Vue
Figma
Playground
复制 AI 规则
```

## 17.2 最小可运行示例

首屏直接展示：

```text
FilterBar
+ Mock Result Table
```

说明：

> 使用 Schema 展示一组稳定的高频筛选条件，点击查询后更新结果。

必须支持：

- 修改条件
- 查询
- 重置
- Show code

## 17.3 代码演示

至少提供以下真实 Demo：

### Demo 01：基础用法

- 4 个高频字段
- 手动查询
- 重置
- 外部结果表格

### Demo 02：可展开筛选

- 4 个 Primary
- 4 个 Secondary
- 展开与收起
- 展开前后值保留

### Demo 03：隐藏条件正在生效

- Secondary 字段中存在 Active Values
- 收起后显示数量提示
- 点击提示展开

### Demo 04：内容容器内筛选

- FilterBar 位于列表卡片内部
- 只影响当前列表

### Demo 05：页面顶部筛选

- FilterBar 影响多个内容模块
- 通过页面 Recipe 实现，不新增 placement Prop

### Demo 06：自动查询

- `submitMode='change'`
- debounce
- loading
- 防重复请求

### Demo 07：受控模式

- 外部控制 Draft Values
- 外部控制 Active Values
- 展示父组件更新

### Demo 08：字段权限

- 一个字段被隐藏
- 一个字段被禁用
- 提交值不泄漏隐藏字段

### Demo 09：校验失败

- 收起区域存在必填字段
- 提交时自动展开并定位错误

### Demo 10：结果状态 Recipe

- Loading
- Empty
- Error
- Retry
- 明确说明这些状态属于结果区域，不属于 FilterBar Core

每个 Demo 必须包含：

```text
标题
一句适用说明
真实组件
Show code
React / Vue 版本
```

不能使用与真实组件脱离的 HTML 仿真。

## 17.4 何时使用

展示 FilterBar / AdvancedFilter / QueryBuilder / SearchBar 选择表。

## 17.5 Anatomy

展示：

```text
字段区
Primary
Secondary
查询
重置
展开
隐藏条件提示
```

## 17.6 Layout

展示响应式列数和 span 规则。

## 17.7 Behavior

展示 Draft / Active、Submit、Reset 和 Expand 状态机。

## 17.8 API

包括：

```text
FilterBar Props
FilterFieldSchema
Events
React / Vue API 映射
默认值
受控与非受控
```

## 17.9 Recipes

至少：

```text
FilterBar + Table
FilterBar + TableToolbar
FilterBar + ActiveFilters
FilterBar + URL State
```

URL State 只作为 Recipe，不进入核心。

## 17.10 AI Contract

Docs 中展示 Skill 核心规则，并提供复制按钮。

## 17.11 Evaluator

展示 Pass / Warn / Block。

## 17.12 Change Log

记录：

- API
- 行为
- Token
- Docs
- Skill
- Evaluator

---

# 18. SKILL.md 完整要求

为 FilterBar 创建 AI Contract。

建议结构：

```md
---
name: FilterBar
category: business/query-and-view
status: stable-or-beta
---

# FilterBar

## Purpose

用于列表、表格或数据内容区域上方的一组高频、稳定、并列筛选条件。

## Trigger

满足以下条件时优先使用：
- 页面主体是列表或表格
- 常用条件为 2–6 个
- 条件稳定
- 用户需要直接看到筛选条件
- 条件关系为简单并列

## Do not use

- 单一关键词：使用 SearchBar
- 动态条件：使用 AdvancedFilter
- AND / OR 或条件组：使用 QueryBuilder
- 保存筛选：使用 SavedFilters
- 大量生效条件回显：组合 ActiveFilters

## Selection Priority

1. 已有页面模板
2. 已有业务模块
3. FilterBar 业务组件
4. 基础组件组合
5. 官方原生组件
6. 最后才新增实现

## Required Inputs

生成前必须获得：
- 字段 Schema
- 字段顺序
- 高频 / 低频定义
- 初始值
- 查询触发模式
- 权限信息
- 结果区域的查询函数

缺少字段 Schema 时不得自行编造字段。

## Generation Process

1. 确认场景适合 FilterBar。
2. 读取字段 Schema。
3. 标记 Primary / Secondary。
4. 使用已有字段注册类型。
5. 默认 manual submit。
6. 区分 Draft Values 与 Active Values。
7. 补齐 reset、loading、validation。
8. 检查隐藏生效条件。
9. 使用外部 Recipe 连接结果区域。
10. 运行 Evaluator。

## Generation Rules

- 优先使用真实 FilterBar，不重新拼 Input + Select。
- 不在 FilterBar 中管理 Table request 和 pagination。
- 高频字段默认可见。
- 低频字段进入展开区域。
- 收起不得清空字段值。
- 隐藏 Active Values 必须提示。
- 查询、重置和展开位置稳定。
- 权限隐藏字段不得进入提交值。
- Manual 模式修改字段不得立即提交。
- Change 模式必须 debounce。
- Reset 更新 Draft 和 Active，并重新提交。
- 必须覆盖 loading 和 validation。
- 结果区域 Recipe 必须覆盖 Empty / Error。

## Allowed Extensions

- 注册企业字段类型
- 结果区域 Recipe
- ActiveFilters
- URL State Recipe
- Figma / Docs 链接

## Forbidden

- AND / OR
- 动态条件行
- 保存筛选方案
- 私自实现基础控件
- 大范围覆盖基础组件样式
- 猜测业务字段
- 将 AdvancedFilter 能力塞入 FilterBar

## Known Pitfalls

- Draft 与 Active 使用同一个对象
- 收起时字段值丢失
- 隐藏条件生效但没有提示
- reset 只清表单不刷新结果
- loading 时重复提交
- 权限字段仍出现在提交值中
- `0` 或 `false` 被误判为空
- React / Vue submit 时机不同
- 为了布局改变字段业务顺序

## References

只按任务加载：
- FilterBar API
- FilterField Schema
- 当前页面模板
- 当前领域字段定义
- FilterBar Evaluator
```

Skill 不得复制全部 Docs。

Skill 应短、可执行、可按需加载。

---

# 19. Evaluator 完整要求

为 FilterBar 创建 `evaluator.md` 或仓库等价格式。

## 19.1 证据来源

```text
DOM / CSS
浏览器交互
组件事件记录
React / Vue 契约测试
截图
键盘操作
提交值快照
```

## 19.2 PASS

满足：

- 使用真实 FilterBar 导出
- 字段来自 Schema
- Primary / Secondary 正确
- 展开收起值不丢
- Draft / Active 正确分离
- Manual / Change 时机正确
- Reset 语义正确
- 隐藏 Active 条件有提示
- 权限字段不泄漏
- 操作区稳定
- 响应式无溢出
- 校验失败可定位
- Loading 防重复提交
- React / Vue 一致
- 键盘和 Focus 正常
- Docs Demo 调用真实组件

## 19.3 WARN

包括：

- 默认可见字段超过 6 个
- 低频字段被设置为 Primary
- 所有字段都使用相同 span，导致日期范围拥挤
- 未提供结果区 Loading / Empty / Error Recipe
- 自动查询 debounce 小于仓库推荐值
- 隐藏条件只显示数量，没有可理解摘要
- Docs 缺少权限或校验示例
- 自定义字段未注册到 Manifest

## 19.4 BLOCK

包括：

- 缺少 Schema 时自行编造字段
- 收起后 Draft 或 Active 值丢失
- 隐藏条件生效但用户无法感知
- Manual 模式字段变化立即提交
- Change 模式连续重复提交
- Reset 只重置表单但结果仍受旧条件影响
- 查询按钮展开前后发生不可预测换位
- 权限隐藏字段仍出现在 DOM、Draft、Active 或提交值
- 校验失败后仍更新 Active Values
- loading 时允许重复提交
- `0`、`false` 被判定为空
- React / Vue 默认行为或事件时机不一致
- FilterBar 内部实现 Table request、pagination 或 SavedFilters
- 复制基础 Input / Select / Button 实现
- 大范围覆盖基础组件内部样式
- Docs 使用静态假组件而不是真实组件

## 19.5 问题回流

| 问题 | 回流位置 |
|---|---|
| 使用场景错误 | Spec / Skill Trigger |
| 字段不正确 | Domain / Field Schema |
| Draft / Active 错误 | Component State Contract |
| 展开规则错误 | Design Decision |
| 视觉不一致 | Token / Component Style |
| AI 选择错误 | SKILL.md |
| Docs 示例错误 | Docs Recipe |
| React / Vue 不一致 | Shared Contract / Contract Test |

不得只输出“重新生成”。

---

# 20. 测试矩阵

## 20.1 共享纯函数测试

必须覆盖：

```text
normalizeFields
normalizeValues
isFilterValueEmpty
getPrimaryFields
getSecondaryFields
getHiddenActiveFields
transformSubmitValues
removeUnauthorizedValues
```

关键断言：

```text
0 不为空
false 不为空
[] 为空
'' 为空
null 为空
undefined 为空
无权限字段被清除
字段顺序保持
```

## 20.2 状态测试

覆盖：

- Draft 初始化
- Active 初始化
- 受控 Draft
- 非受控 Draft
- 受控 Active
- 非受控 Active
- manual change
- manual submit
- change debounce
- reset initial
- reset empty
- expanded controlled
- expanded uncontrolled
- loading 防重复
- validation failed
- permission hidden
- permission disabled
- hidden active count

## 20.3 交互测试

覆盖：

```text
修改字段
点击查询
点击重置
按 Enter
展开
收起
隐藏条件生效
校验失败自动展开
loading 再次点击
字段权限变化
父组件更新受控值
```

## 20.4 React / Vue 契约测试

使用同一组测试用例或共享 Fixture，验证：

```text
默认值
提交值
事件顺序
事件参数
reset
展开
隐藏计数
权限
校验
loading
```

建议记录标准事件序列，例如：

```text
Manual Submit:
values-change
active-values-change
submit

Reset:
values-change
active-values-change
reset
submit
```

实际顺序根据仓库规范确定，但两端必须相同。

## 20.5 浏览器 Smoke

至少验证：

```text
1440 宽
1280 宽
1024 宽
768 宽
390 宽或仓库最低宽度
```

检查：

- 横向溢出
- 文字裁切
- 操作区跳动
- Tab 顺序
- Focus
- 收起隐藏字段不可聚焦
- 展开按钮 aria-expanded
- loading aria-busy
- 校验错误可感知
- 主题切换
- React Demo
- Vue Demo

## 20.6 截图基线

至少生成：

```text
基础 4 字段
8 字段收起
8 字段展开
隐藏条件生效
Loading
校验失败
权限隐藏
4 / 3 / 2 / 1 列
```

---

# 21. 可访问性

必须：

- 使用真实 `form`
- 每个字段有可访问 label
- 查询按钮为 submit 语义
- 重置按钮具有明确语义
- 展开按钮使用 `aria-expanded`
- 如控制内容区域，使用 `aria-controls`
- 隐藏字段不进入 Tab 顺序
- 收起区域错误时自动展开
- Focus 到第一个错误字段
- loading 使用 `aria-busy`
- 隐藏条件生效提示不能只依赖颜色
- 图标按钮具有可访问名称
- 支持键盘操作
- 遵循 `prefers-reduced-motion`

---

# 22. 性能与依赖

要求：

- 不引入大型新依赖
- 不因为每次输入重建全部字段 Schema
- 对 normalize 结果进行合理缓存
- Change 模式 debounce 可取消
- 组件卸载时取消未执行任务
- 不在 Render 中创建不稳定注册表
- 样式可 tree-shake 或遵循仓库既有方式
- 仅导出需要的公共类型和组件
- 不将 Docs 模拟数据打包进生产组件

---

# 23. 发布与导出

先检查仓库现有规范。

至少应考虑公开导出：

```text
FilterBar
FilterBarProps
FilterFieldSchema
FilterValue
FilterSubmitMode
FilterSubmitMeta
```

如存在组件 Manifest / Registry，必须更新：

```text
名称
分类
框架
稳定性
导出路径
Docs
Skill
Evaluator
支持字段类型
```

不得自动发布 npm。

不得自动创建正式版本。

根据实际变化建议版本号，但由人工决定发布。

---

# 24. Codex 执行阶段

## Phase A：只读仓库审计

先执行，不修改任何代码。

检查：

1. 所有相关 `AGENTS.md`
2. Monorepo 结构
3. React 组件包
4. Vue 组件包
5. 共享类型包
6. Token 与主题系统
7. Form 和字段组件
8. 现有业务组件
9. Docs 架构与 Demo 机制
10. React / Vue Tab 机制
11. 测试工具
12. Browser / Screenshot 工具
13. 发布和 Manifest
14. 现有筛选实现
15. Figma / 设计规范链接

输出并保存：

```text
filterbar-audit.md
```

必须包含：

```text
仓库结构摘要
约束清单
可复用基础组件
基础组件能力缺口
现有相似实现
Token 来源
React / Vue 现有模式
Docs 模式
测试与构建命令
兼容性风险
建议目录
预计修改文件
无法从仓库解决的问题
```

只有以下情况可以停止询问：

- 业务语义无法判断
- 设计规范存在冲突
- 缺少必需的基础组件且无法合理降级
- 会造成已发布 API 破坏

不要询问可以通过仓库读取解决的问题。

## Phase B：组件契约

编码前创建：

```text
filterbar-contract.md
```

包含：

1. 业务任务
2. 适用场景
3. 不适用场景
4. 与 AdvancedFilter 边界
5. Anatomy
6. 状态机
7. Draft / Active 定义
8. Schema
9. React API
10. Vue API
11. 默认值
12. 事件顺序
13. Reset 语义
14. Expand 语义
15. 权限规则
16. 校验规则
17. Loading 边界
18. Token
19. Docs 目录
20. Skill
21. Evaluator
22. 测试计划
23. 非目标

如果本任务书与仓库规范冲突，在 Contract 中记录最终选择及原因。

## Phase C：最小闭环实现

先完成：

```text
共享类型
共享纯函数
React FilterBar
Vue FilterBar
同源样式
基础字段注册
基础 Demo
单元测试
契约测试
SKILL.md
evaluator.md
```

首轮只需要字段：

```text
input
select
date
dateRange
```

如仓库已有稳定的 Cascader、TreeSelect、UserPicker，再纳入首轮；否则在第二轮补充。

## Phase D：场景完善

补充：

```text
可展开筛选
隐藏条件生效
自动查询
权限字段
受控模式
校验失败
结果状态 Recipe
```

## Phase E：Docs 标杆页

按第 17 节完成真实 Docs。

不得复制之前的纯 HTML 框架作为最终 Demo。

HTML 框架只能作为信息架构参考，最终 Docs 必须调用真实 React / Vue 组件。

## Phase F：验证

运行仓库真实命令：

```text
lint
typecheck
unit test
contract test
build
docs build
browser smoke
visual screenshot
```

如果仓库没有某项能力：

- 不得伪造通过
- 在报告中写明缺失
- 提供最小补充建议

## Phase G：交付报告

创建：

```text
filterbar-implementation-report.md
```

包含：

1. 目标完成情况
2. 修改文件
3. 公共 API
4. Schema
5. 状态模型
6. React 实现
7. Vue 实现
8. Docs
9. Recipes
10. Skill
11. Evaluator
12. 测试结果
13. 浏览器结果
14. 截图位置
15. React / Vue 一致性
16. 基础组件缺口
17. 兼容性风险
18. 未解决问题
19. 下一步
20. 建议版本号

不得只回复“已完成”。

---

# 25. Definition of Done

## 25.1 业务契约

- [ ] 业务任务明确
- [ ] 适用和不适用场景明确
- [ ] FilterBar / AdvancedFilter 边界明确
- [ ] Draft / Active 明确
- [ ] Reset 语义明确
- [ ] Loading 边界明确
- [ ] 非目标明确

## 25.2 工程

- [ ] 优先复用基础组件
- [ ] 无重复基础控件实现
- [ ] Schema 驱动
- [ ] React 完成
- [ ] Vue 完成
- [ ] 行为一致
- [ ] 样式和 Token 同源
- [ ] 无无条件 `!important`
- [ ] 无大范围内部类名覆盖
- [ ] 无大型新依赖
- [ ] 公共导出完整
- [ ] Manifest 更新

## 25.3 核心行为

- [ ] Manual 正确
- [ ] Change + debounce 正确
- [ ] Draft / Active 分离
- [ ] Reset 更新结果条件
- [ ] 展开收起不丢值
- [ ] 隐藏 Active 有提示
- [ ] Loading 防重复
- [ ] 校验失败不提交
- [ ] 收起区域错误自动展开
- [ ] 权限字段不泄漏
- [ ] `0` 和 `false` 正确处理
- [ ] 操作区稳定
- [ ] 响应式无溢出

## 25.4 Docs

- [ ] Header
- [ ] 最小示例
- [ ] 10 个场景 Demo 或经审计确认后的等价集合
- [ ] Show code
- [ ] React / Vue
- [ ] 使用选择
- [ ] Anatomy
- [ ] Layout
- [ ] Behavior
- [ ] API
- [ ] Recipes
- [ ] AI Contract
- [ ] Evaluator
- [ ] Change Log
- [ ] Figma / Playground 入口

## 25.5 AI 与质量

- [ ] SKILL.md
- [ ] Trigger
- [ ] Do not use
- [ ] Generation Rules
- [ ] Known Pitfalls
- [ ] References
- [ ] evaluator.md
- [ ] Pass / Warn / Block
- [ ] 问题回流路径

## 25.6 测试

- [ ] 共享函数测试
- [ ] React 单元和交互测试
- [ ] Vue 单元和交互测试
- [ ] React / Vue 契约测试
- [ ] Browser Smoke
- [ ] 键盘
- [ ] Focus
- [ ] 响应式
- [ ] 主要状态截图
- [ ] lint
- [ ] typecheck
- [ ] build
- [ ] docs build

---

# 26. 最终执行指令

现在开始执行 FilterBar 标杆业务组件任务。

严格按照：

```text
Phase A
→ Phase B
→ Phase C
→ Phase D
→ Phase E
→ Phase F
→ Phase G
```

执行要求：

1. 先审计仓库，不立即编码。
2. 不重复实现基础组件。
3. 不从截图写死视觉值。
4. 不把 AdvancedFilter 和 QueryBuilder 能力塞进 FilterBar。
5. 不把 Table request、pagination 和结果区域塞进 FilterBar Core。
6. 必须区分 Draft Values 与 Active Values。
7. 必须同时完成 React 与 Vue。
8. Docs 必须调用真实组件。
9. 必须创建 SKILL.md 和 evaluator.md。
10. 必须完成契约测试和浏览器验证。
11. 无法验证的结果必须诚实说明。
12. 未经授权不得发布 npm、删除公共 API、修改基础组件默认行为或引入大型依赖。

开始时先输出 Phase A 的只读审计结果。

如果没有阻断性问题，继续执行后续阶段。

如存在无法通过仓库信息解决的阻断问题，只提出最少、精确的问题，并说明每个问题会影响哪项契约。
