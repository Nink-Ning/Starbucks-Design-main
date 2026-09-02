# 修改 Demo 提示词

```text
请基于当前 output/<file-name>.html 修改 Demo。

本次修改目标：[填写要修改的文案、字段、布局或交互]
不能改变的内容：[填写需要保持不变的页面结构或行为]

请遵守 DesignKit Starter V1：
- 先根据当前文件和对应模板确认页面类型，并在修改中保持该模板类型；
- 读取 `references/application-shell.md`，保持当前 `default` / `content-only` / `none`；refinement 不得重新设计 Shell 或自行改变 Shell Mode；
- 读取 manifest 的 `referenceImplementations`，保持当前 Shell reference DOM/structure、approved Runtime slots、Template reference、Main Slot 和完整 template subtree；只修改允许的 business slots/data，不重写 Page Header、Toolbar、Table、Row Actions 或 Pagination；
- 读取 `references/default-template-baselines.md`；当前 reference 是标准答案。除非用户明确提出 Override，保持 page anatomy、layout/spacing、media shape、footer/action hierarchy、selection/batch relationship、Breadcrumb/Back 和 Drawer header/body/footer；Override 必须记录受影响 reference 与影响范围；
- 如果当前页面使用 `default`，保持 Top 的 System Switch 与 Side 的 collapse 共享状态：展开为 260px，收起为 56px 且顶部只保留 Logo；不得把已有 Shell 改成另一套导航；
- 不得把 Basic List 与 Card List 自动互相转换；如果修改目标确实要求换模板，先说明结构和行为影响并等待确认；
- 保持单文件 HTML 输出；
- 保持固定 CDN 版本和加载顺序；
- 继续加载 Starter 本地 `../runtime/starbucks-react.css` 和 `../runtime/starbucks-react.umd.js`；
- 继续使用本地 Mock 数据；
- 不添加 import、export、TypeScript、npm、Vite 或真实接口；
- 不复制组件源码；
- 不添加宽泛 .arco-* 覆盖或 !important；
- Default Shell 保持批准的 Top/Side Menu、action order、`window.arcoicon`、whole-page Theme DOM binding 和 `designkit-starter-theme` persistence；不新增 Theme Provider；Dark 只改变同一份 approved reference DOM 的 semantic-token presentation，不得引入第二套 Light/Dark DOM、固定浅色 template CSS 或私有 Theme/Palette API；Shell style 继续绑定 `assets/default-application-shell.css`；
- 保持 Reference 中的 Icon Binding：固定 Pattern Icon 不重新选择；Side 业务菜单 Icon 必须是可在 `window.arcoicon` 上访问的真实语义 Icon；逐一执行 `typeof window.arcoicon[iconName] !== 'undefined'`，不得留下 undefined 或空白 Icon slot；
- Shell 继续只拥有 outer layout，不吸收 Breadcrumb、Toolbar、Template spacing 或 Basic List `4px / 16px / 16px`；
- 390px 不引入 Drawer、Hamburger、Bottom Navigation、Overlay Navigation 或其他新 mobile navigation；
- 检查 Normal、Loading、Empty、Error 和窄屏结果；
- 不把本地 Mock 反馈写成真实服务端成功；
- 不添加对应模板范围外的 FilterBar、导出、列设置、批量、Upload、Card、Timeline 或 Tabs；Card List 仅保留其模板内的页面选择和轻量批量操作；
- 基础列表保持使用真实 `StarbucksReact.TableToolbar`，Search 位于 Start、Refresh 位于 End，不恢复页面私有工具栏；
- Basic List 保持 `Page Title + optional Context Help + Header Actions`，不得把 contextual explanation 回退为 persistent page subtitle；Quick Filter 继续属于 TableToolbar Filter Region；
- 卡片列表保持 Selection Control 是唯一选择入口，Card Actions 与 Batch Actions 独立，Toolbar 与 Grid 独立响应，标题省略且暗色模式和可访问状态完整；
- 卡片列表默认保持 circular media、approved footer/action hierarchy 和一个 canonical visible selection summary；若使用 TableToolbar，继续隐藏其 generic selection-summary region，不新增第二个通用 selected-count；
- Full-page Form 保持 Shell Main 24px/24px、Form Surface 全宽、Form content 横向至少 32px；Basic/Grouped/Step 不自动新增 Back、Breadcrumb、persistent subtitle 或第二个 header；
- Full-page Detail 在 depth 2 使用 icon-only Back + 20px title + optional Context Help，保持无文字 Back/Breadcrumb；depth >= 3 只使用 approved Breadcrumb-only context，不生成独立 Page Title、Back 或 title-level Context Help；Drawer Form 保持 title + close、直接 Form body、24px/24px body spacing 和 approved footer，不恢复 path、duplicate title、subtitle 或 standalone Back；
- 如果当前页面属于 manifest 中 `starterEnabled: false` 的 Grouped Form、Step Form 或 Drawer Form variant，不得继续伪造实现，必须报告 `BLOCKED`；为 `true` 时必须先绑定对应 executable reference；
- 已有页面状态演示时，状态 Select 保持在 Header 右侧操作区最左侧，不恢复独立顶部状态卡片；
- 表格查看、编辑等页面内行操作保持品牌色文字 Button 和 `sbux-table-row-actions`，不通过 Link 或页面 CSS 改色；
- 修改后按 references/quality-checklist.md 自检。

请覆盖写回 output/<file-name>.html，并说明：
1. 修改了什么；
2. 保持了什么；
3. 哪些内容尚未浏览器验证。

预览请使用本地 HTTP 服务，不要依赖“直接双击”来判断相对 Runtime 是否可用。
```
