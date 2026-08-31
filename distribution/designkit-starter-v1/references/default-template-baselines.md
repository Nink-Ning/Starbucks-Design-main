# P1 Starter Default Template Baselines

本文档是 R2 冻结后的 source-preparation contract，不修改 R2 release asset。它把 approved Docs implementation 固化为 Starter 的标准答案，并规定生成结果可以适配什么、不得自行重构什么。

## Authority chain

```text
Docs approved implementation
        ↓
Starter authoritative reference
        ↓
Generated single-file HTML
```

- Docs implementation 是结构、组件组合、状态所有权和响应式关系的来源。
- `patterns/*.html` 是不含业务数据的 Starter package-local structural reference；`Golden` 仍是只读视觉交叉检查对象，不是可写模板。
- 生成 HTML 不得反向成为新的结构来源。
- Starter 无法读取 Docs 时，只能依据 manifest 与本文件登记的 reference；找不到 reference 时必须报告 `BLOCKED`，不能从能力名称推测结构。

## Standard answer and explicit override

`APPROVED DEFAULT TEMPLATE = STANDARD ANSWER`。

默认生成必须先完整绑定所选 reference，再做业务替换。默认允许适配：

- 业务字段、标签、值、状态、Mock 数据和筛选选项；
- 任务必需且已在该模板边界内的文案与对象内容；
- 不改变 reference anatomy 的业务操作名称。

以下内容不是自由适配项，只有用户明确提出并确认影响后才能变化：

- 页面层级、Shell Main Slot、Page Header、Breadcrumb、Back、Context Help 或 persistent subtitle；
- Form/Card/Detail/Drawer 的内容层级、区块顺序、surface、容器宽度、内边距、间距和响应式关系；
- Card media shape、Card footer/action hierarchy、Toolbar / batch-action / selection-summary relationship；
- Drawer header/body/footer anatomy，以及任何重复标题、路径、说明或返回入口；
- 将 supported capability 自动启用为 default capability。

如果用户只要求业务内容或字段变化，保持全部上述结构不变。明确 override 必须在生成说明中记录：`Override`、受影响 reference、原因、行为/视觉影响和未验证项。

## Formal contexts

| Context | Approved default anatomy | Default prohibitions |
| --- | --- | --- |
| FULL-PAGE FORM | Shell Main left/right 24px；二级 Page Header 为 icon-only Back + 20px Page Title + optional Context Help；Form Surface 填满可用 Main、无外边框且保留 6px 圆角；Form content horizontal padding 至少 32px | depth 2 不加 Breadcrumb、文字 Back 或 persistent subtitle；depth > 2 才按 IA 使用 approved Breadcrumb |
| FULL-PAGE DETAIL | Shell Main left/right 24px；二级 Page Header 为 icon-only Back + 20px Page Title + optional Context Help；Basic Detail Surface 无外边框、6px 圆角、32px 内边距 | depth 2 不加 Breadcrumb、文字 Back 或 persistent subtitle；不因页面类型自动加路径、卡片化或窄页级 wrapper |
| DRAWER FORM | Drawer Header title + close；Body 直接进入 Form；canonical body spacing 24px/24px；保留 approved footer/actions | 不加 breadcrumb/path、duplicate title、persistent subtitle、duplicate task header 或 standalone Back；不把删除的说明移到新的永久 block |

## IA rule

- Breadcrumb 由信息架构深度和明确父级上下文决定，不由 `form` / `detail` 页面类型自动决定。
- level 1 只显示 20px Page Title + optional Context Help；depth 2 的 full-page Create/Edit/Detail/Grouped/Step 统一显示 icon-only Back + 20px Page Title + optional Context Help。
- depth 2 的 Back 使用现有填充方形 `Button[type=secondary][shape=square]` 与 `IconLeft`，可访问标签为“返回上一级”；禁止文字 Back 和 Breadcrumb。
- depth > 2 按 IA 使用 approved Breadcrumb；除非明确批准，不自动组合 Back + Breadcrumb。
- Page Header 默认没有 persistent subtitle；Context Help 使用 approved title-adjacent Help pattern。

## Template baselines

### Card List

- neutral request `帮我做一个商品卡片列表页，支持多选和批量操作` 默认绑定 `patterns/card-list.html`。
- Card List 是 Level-1 页面：20px Page Title + optional Context Help，无 Back、无 Breadcrumb；完整页由 Default Application Shell 包裹后进入 Main Slot。
- media 默认是圆形；不得自动变成 square、rounded-square 或 rect hero。
- 保留 approved Card anatomy、title/status hierarchy、secondary metadata、footer/action hierarchy 和 grid relationship；不得加入任意营销信息或新的 banner/chrome。
- 选择集合由页面拥有；只能有一个 canonical visible selection summary。Card List 的 page-owned summary 与 Card-specific batch actions 使用同一选择集合；不要再渲染通用 `已选择 X 项`。
- 若使用 Runtime `TableToolbar`，必须在 Card List scope 隐藏其 generic selection-summary region，或证明它就是唯一 canonical summary；不得盲目同时显示两个摘要。
- Card List 必须复用 Docs approved Card List DOM/structure；冻结 toolbar、container、card、selection、media、footer/action regions，只替换业务数据和已批准的选项。

### Full-page Form family

Basic Form、Grouped Form、Step Form 共享 FULL-PAGE FORM outer rules。Create/Edit 只替换字段值、动作和本地状态，不重新组织页面 anatomy。

- Basic Form：一个无外边框/6px 圆角的 approved Form Surface、Form Grid 和 actions。
- Grouped Form：在同一 outer rules 内使用 approved section hierarchy；section heading/description 仍属于对应 section，不成为 persistent page subtitle。
- Step Form：在同一 outer rules 内使用 approved step/section/action hierarchy；Steps 后的 divider 按 Docs 权威几何跨越整个 Form Surface；不得因支持步骤而发明第二套页面 header。
- 1280/768/390：桌面两列、窄屏单列；页面 document 不产生异常横向溢出。Step Form 结构为 Steps → approved divider → step content。

### Basic Detail

Basic Detail 是聚焦的 read-only object page。默认保留共享二级 Page Header、approved Detail Surface、single approved information hierarchy 和 action placement。Surface 无外边框、圆角 6px、四周内边距 32px；详情默认两个等宽外列，共享由当前 group 最长 label 实测得到的 label track，label/value 间距 24px。不要添加 Form、Table、Tabs、Timeline 或分析模块。

### Drawer Form

Drawer Form 是独立于 full-page Form 的上下文。Drawer header 只承载 title + close，body 直接承载 Form，footer/actions 沿用 Drawer approved behavior。Drawer body 与 Form inner padding 不得叠加出未经批准的 double inset。

## Binding status

| Reference | Docs authority | Starter binding | Reason |
| --- | --- | --- | --- |
| Card List | approved Product Card List implementation + frozen Golden cross-check | `APPROVED` | Runtime TableToolbar/base controls and page-local card composition are already in scope |
| Basic Form | approved Basic Form React/Vue implementation | `APPROVED` | Selected FormPageLayout/FormGrid/FormActions bindings exist |
| Basic Detail | approved Basic Detail React/Vue implementation | `APPROVED` | Selected DetailPageLayout/Section/Descriptions bindings exist |
| Grouped Form | approved Grouped Form React/Vue implementation | `APPROVED` | Native `section` + fixed Runtime `FormGrid` / `FormActions`; no `FormSection` export required |
| Step Form | approved Step Form React/Vue implementation | `APPROVED` | Fixed Runtime `Steps` + native step content + `FormGrid` / `FormActions`; no `StepFormLayout` export required |
| Drawer Form | approved Drawer direct-Form demo + Drawer style contract | `APPROVED` | Fixed Runtime `Drawer` + `Form` and base controls; no new business binding required |

`SUPPORTED CAPABILITY != CAPABILITY ENABLED BY DEFAULT`。只有 manifest 中 `starterEnabled: true` 且 binding status 为 `APPROVED` 的 reference 才能作为默认 clean-room generation target；当前 Grouped、Step 和 Drawer Form 均满足该条件。
