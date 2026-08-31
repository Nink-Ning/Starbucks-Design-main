# 分组表单页模板变体

Grouped Form 是 FULL-PAGE FORM family 的 enabled variant。它共享 [Basic Form Template](form.md) 的 outer rules，只把字段组织为 approved sections；它不新增 `starter.*` capability，也不依赖未导出的 `FormSection`。

## Binding status

- Manifest reference：`patterns/grouped-form.html`
- `starterEnabled`：`true`
- 状态：`APPROVED EXECUTABLE REFERENCE`
- Binding：native `section` + fixed Runtime `FormGrid` / `FormActions`。

## Hard rules

- 保留 Shell Main 左右 24px、Form Surface 全部可用宽度且无外边框/6px 圆角、Form content 横向至少 32px 和桌面两列/窄屏单列。
- Page Header 使用 depth-2 icon-only Back + 20px title + optional approved Context Help；不加文字 Back、Breadcrumb 或 persistent subtitle。
- Section heading/description 留在对应 section 内，不迁移成永久 page subtitle 或重复 task header。
- 不复制 `FormSection` 内部实现；section 只负责当前页面的语义分组和标题层级。
- clean-room generation 必须从 `patterns/grouped-form.html` 绑定后再做业务字段替换。
