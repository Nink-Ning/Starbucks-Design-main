# 步骤表单页模板变体

Step Form 是 FULL-PAGE FORM family 的 enabled variant。它共享 [Basic Form Template](form.md) 的 outer rules，只增加 approved step indicator、当前 step content 和 actions；它不新增 `starter.*` capability，也不依赖未导出的 `StepFormLayout`。

## Binding status

- Manifest reference：`patterns/step-form.html`
- `starterEnabled`：`true`
- 状态：`APPROVED EXECUTABLE REFERENCE`
- Binding：fixed Runtime `Steps` + native step content + `FormGrid` / `FormActions`。

## Hard rules

- 保留 Shell Main 左右 24px、Form Surface 全部可用宽度且无外边框/6px 圆角、Form content 横向至少 32px 和 1280/768/390 responsive contract。
- Page Header 使用 depth-2 icon-only Back + 20px title + optional approved Context Help；不因为 steps 自动加入文字 Back、Breadcrumb、persistent subtitle 或第二个页面 header。
- Steps 之后保留 Docs Step Form 同款 approved divider；divider 跨越完整 Form Surface 宽度，再进入 step content；不复制 StepFormLayout 内部实现。
- Step indicator、当前 step fields 和 actions 遵循 approved reference 的层级；不复制 `StepFormLayout` 内部实现。
- 不复制 `StepFormLayout` 内部实现；步骤内容和 actions 由当前页面组合拥有。
- clean-room generation 必须从 `patterns/step-form.html` 绑定后再做业务字段替换。
