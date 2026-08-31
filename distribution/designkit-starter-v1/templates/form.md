# 基础表单页模板

## 定位

用于新建或编辑一组结构稳定的基础信息，重点演示字段、校验、提交和重置。

这是 FULL-PAGE FORM family 的 Basic Form baseline，不是可自由重排的字段画布。`APPROVED DEFAULT TEMPLATE = STANDARD ANSWER`：先绑定 `patterns/basic-form.html`，再替换业务字段和文案。

## 适用场景

- 字段数量适中；
- 字段关系简单；
- 用户需要一次性完成并提交；
- 本地 Mock 提交足以验证方案。

## 不适用场景

- 分步表单；
- 动态字段列表；
- 文件上传；
- 自动保存；
- 服务端异步校验；
- 复杂权限和审批流程。

## 推荐结构

```text
Page Header：depth 2 icon-only Back + 20px 标题 + optional approved Context Help
→ Form Surface（填满可用 Main）
   → Form content（横向内边距至少 32px）
      → 表单字段分组
→ 字段校验错误
→ 重置 / 保存
→ 本地保存 Loading / 成功反馈
```

- **Hard Rule**：Shell Main 左右保留 24px；Form Surface 使用 Main 的全部可用宽度，保留无外边框的 6px 圆角 surface，不在页面层新增任意窄的居中 max-width wrapper。
- **Hard Rule**：Basic Form depth 2 使用 icon-only Back + 20px 标题 + optional approved Context Help；禁止文字 Back、Breadcrumb 或 persistent subtitle。depth > 2 只有 IA 明确需要时才读取 approved Breadcrumb reference。
- **Hard Rule**：Page Header 使用 title + optional title-adjacent Context Help；不要自行发明 Tooltip、Popover 或第二个说明区块。
- **Hard Rule**：Grouped Form 和 Step Form 共享上述 outer rules，分别使用 native section / fixed Runtime Steps 组合；不复制 Docs 的 `FormSection` / `StepFormLayout` 内部实现。

## 推荐组件

优先使用 `component-catalog.md` 中的：

```text
Form
Form.Item
Input
Input.TextArea
Select
DatePicker
Radio.Group
Checkbox.Group
Switch
Button
Message
```

## 页面行为

- 使用 `Form.useForm()` 管理表单实例。
- 用 `field` 标识字段，不用 `name` 代替。
- 用 `rules` 表达必填、长度、类型和格式校验。
- 校验失败时保留用户输入，并让错误靠近字段。
- 提交时显示 Loading，防止重复提交。
- 重置恢复明确的 baseline 值。
- 保存成功使用本地反馈，不调用真实接口，不模拟服务端错误。
- `Switch` 放入 `Form.Item` 时设置 `triggerPropName="checked"`。
- Basic Form 默认不添加 Normal、Loading、Empty、Error 页面状态 Select；表单提交 Loading 属于表单交互状态，不为了统一外观增加无业务意义的页面状态控件。

## 响应式要求

- 1280/768/390 均需检查；桌面端使用两列布局，窄屏下降为单列。
- 长文本、备注和错误提示允许跨整行。
- 操作按钮允许换行，保存按钮保持主要视觉层级。
- 页面 document 不得出现异常横向溢出。

## 生成前检查

- [ ] 已定义字段、初始值和校验规则。
- [ ] 已定义校验失败、保存成功和 Loading 文案。
- [ ] 未引入真实接口或权限逻辑。
- [ ] 所有 Form API 来自已查证 reference。
- [ ] 已绑定 `patterns/basic-form.html`，使用 icon-only Back + 20px 标题 + optional Context Help，未添加文字 Back、Breadcrumb、persistent subtitle 或任意 page-level narrow wrapper。
- [ ] Form Surface 填满 Main，外边框为 none、圆角为 6px，Form content 横向内边距至少 32px。
- [ ] 已确认窄屏布局策略。
