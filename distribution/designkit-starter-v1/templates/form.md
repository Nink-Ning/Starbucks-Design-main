# 基础表单页模板

## 定位

用于新建或编辑一组结构稳定的基础信息，重点演示字段、校验、提交和重置。

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
Demo 状态控制（不属于正式页面）
→ 页面 Header：标题 + Tooltip 说明
→ 表单字段分组
→ 字段校验错误
→ 重置 / 保存
→ 本地保存 Loading / 成功反馈
```

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

## 响应式要求

- 桌面端可使用两列布局。
- 窄屏下降为单列。
- 长文本、备注和错误提示允许跨整行。
- 操作按钮允许换行，保存按钮保持主要视觉层级。

## 生成前检查

- [ ] 已定义字段、初始值和校验规则。
- [ ] 已定义校验失败、保存成功和 Loading 文案。
- [ ] 未引入真实接口或权限逻辑。
- [ ] 所有 Form API 来自已查证 reference。
- [ ] 已确认窄屏布局策略。
