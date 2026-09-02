# P1.1 Clean-room Scenario Contract

这些场景是 post-R2 source-preparation 的验证合同，不是新的 Golden，也不代表已经生成或完成浏览器验收。每次 clean-room generation 都必须只使用 Starter package-local references，并将实际输出作为 disposable evidence。

## Common rules

- `APPROVED DEFAULT TEMPLATE = STANDARD ANSWER`。
- 业务字段、标签、值、状态、选项和 Mock 数据可以替换；页面 anatomy、layout、spacing、page context 和 component ownership 不能无提示重写。
- 未实际生成、打开和检查的结果标记 `UNVERIFIED`；variant `starterEnabled: false` 在生成前标记 `BLOCKED`。

## Scenario matrix

| ID | Neutral prompt / IA | Expected reference | Required assertions | Contract status |
| --- | --- | --- | --- | --- |
| A | `帮我做一个商品卡片列表页，支持多选和批量操作`；Level 1 | `patterns/default-application-shell.html` + `patterns/card-list.html` + approved Docs Card List DOM | full Default Shell；20px title/help；no Back/Breadcrumb；circular media；approved Card anatomy；one canonical selection feedback；Card-specific batch actions；approved footer | `READY FOR CLEAN-ROOM` |
| B | `帮我做一个新建门店页面`；门店列表 → 新建门店，depth 2 | `patterns/basic-form.html` | Shell Main 24/24；Form Surface full available width、border none、radius 6px；Form inner ≥32/32；icon-only Back + 20px title + optional approved help；no text Back/Breadcrumb/persistent subtitle | `READY FOR CLEAN-ROOM` |
| C | `帮我做一个门店详情页`；门店列表 → 门店详情，depth 2 | `patterns/basic-detail.html` | border none/radius 6px/padding 32px；icon-only Back + 20px title + optional approved help；equal outer columns + shared longest-label track + 24px gap；no text Back/Breadcrumb/persistent subtitle | `READY FOR CLEAN-ROOM` |
| D | `在门店列表页通过抽屉新建门店` | `patterns/drawer-form.html` + `patterns/drawer.html` | Drawer title + close；body starts directly with Form；24/24 body spacing；no path, duplicate title, subtitle or Back；footer unchanged | `READY FOR CLEAN-ROOM` |
| E | `帮我做一个分组的新建门店表单` | `patterns/grouped-form.html` | same Basic Form depth-2 icon-only Back/title/help and no text Back/Breadcrumb rules；border none/radius 6px；approved Grouped section structure；inner ≥32/32 | `READY FOR CLEAN-ROOM` |
| F | `帮我做一个分步骤的新建门店表单` | `patterns/step-form.html` | same outer/header/IA rules；icon-only Back + 20px title + optional approved help；border none/radius 6px；Docs Steps spacing + full-surface divider；inner ≥32/32 | `READY FOR CLEAN-ROOM` |

## P1.4.1 candidate extension

The candidate review uses the approved reference DOM/structure and Runtime slots from `patterns/default-application-shell.html`; a prose-derived Shell lookalike is not acceptable. The page-context contract is depth-driven: Level 1 is 20px title/help only, Level 2 is icon-only Back + 20px title/help, and depth >= 3 is approved Breadcrumb-only with no independent Page Title, Back or title-level Context Help. Content-only remains intentionally content-only without Top/Side.

| ID | Candidate context | Expected composition | Targeted assertions |
| --- | --- | --- | --- |
| A | Level 1 Card List | approved Default Shell DOM + Card List reference | full Shell; 20px title/help; no Back/Breadcrumb; locked Card body |
| B | Level 2 Basic Form | approved Default Shell DOM + Basic Form reference | icon-only Back + 20px title/help; no Breadcrumb; locked 6px borderless Form Surface |
| C | Level 2 Basic Detail | approved Default Shell DOM + Basic Detail reference | smoke only; preserve locked 6px/32px Detail rules |
| D | Level 2 Drawer Form | approved host Shell + Drawer Form reference | Drawer remains locked; host outer border absent; Drawer borders unchanged |
| E | Level 2 Grouped Form | approved Default Shell DOM + Grouped Form reference | icon-only Back/title/help; locked grouped sections and surface |
| F | Level 2 Step Form | approved Default Shell DOM + Step Form reference | icon-only Back/title/help; Steps divider and actions preserved |
| G | depth >= 3 Basic Detail | approved Default Shell DOM + Breadcrumb + direct Detail content | Breadcrumb-only; terminal current identity; no Page Title/Back/help |
| H | Level 1 Card List override | approved Default Shell DOM + Card List reference | same as A; only media shape is square |
| I | Level 2 content-only Basic Form | Basic Form reference without Top/Side | icon-only Back/title/help; no Breadcrumb; no generated Top/Side |

## Evidence gate

This contract test proves reference discovery and hard-rule presence only. It does not prove an AI generated the scenarios, visual fidelity, interaction behavior or browser console cleanliness. Those remain `UNVERIFIED` until disposable outputs are generated and inspected at 1280/768/390.
