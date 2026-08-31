# Drawer Form 模板变体

Drawer Form 是独立于 FULL-PAGE FORM 的 DRAWER FORM context。它使用 Drawer header/body/footer anatomy，不把 full-page Form 的 Page Header 搬进 Drawer。

## Binding status

- Manifest reference：`patterns/drawer-form.html`
- `starterEnabled`：`true`
- 状态：`APPROVED EXECUTABLE REFERENCE`
- Binding：fixed Runtime `Drawer` + `Form` + base controls；不新增 business component。

## Hard rules

- Drawer Header 只包含 title + close；Body 直接进入 Form，使用 canonical 24px/24px body spacing；footer/actions 沿用 approved Drawer behavior。
- 不添加 Breadcrumb/path、duplicate title、persistent explanatory subtitle、duplicate task/context header 或 standalone Back。
- 不把被删除的 explanatory text 移动到新的永久 block；字段 helper text 仍留在对应字段。
- 不同时叠加 Drawer 24px body inset 和未经批准的 Form 32px page inset。
- 这不是 full-page Form 的缩小版；clean-room generation 必须从 `patterns/drawer-form.html` 绑定后再做业务字段替换。
