# 新建 Demo 提示词

将以下内容复制给 AI，并替换方括号中的信息。

```text
请使用 DesignKit Starter V1 生成一个 Starbucks Design React 视觉基准的零工程环境 Demo。

页面名称：[填写页面名称]
使用角色：[填写角色]
核心任务：[填写用户要完成的任务]
页面类型：[基础列表页 / 卡片列表页 / 基础表单页 / 基础详情页]
Shell 模式：[default / content-only / none；未填写时为 default]
字段或数据：[填写字段和示例数据]
主要操作：[填写主操作和次要操作]
需要的状态：[Normal、Loading、Empty、Error，按需选择]
参考页面或设计稿：[没有则填写“无”]

请先判断需求是否属于 Starter V1 支持范围，然后读取：
- 图片或其他视觉特征承担对象识别、浏览、选择和管理任务时，选择卡片列表页；
- 多字段扫描、对齐和高密度比较为核心时，选择基础列表页；
- 用户只提出“列表”且没有明确视觉对象需求时，默认选择基础列表页；
- references/design-rules.md
- references/component-catalog.md
- references/template-contract.md
- references/application-shell.md
- references/template-usage-contract.md
- references/implementation-binding-contract.md
- manifest.json 中 `referenceImplementations` 指向的 Shell 和 Template reference
- references/cdn-runtime.md
- 对应的 templates/list.md、templates/card-list.md、templates/form.md 或 templates/detail.md
- 对应的 examples/list.html、examples/multi-select-card-list.html、examples/form.html 或 examples/detail.html（仅作结构和组合参考）

请遵守：
- 最终生成一个完整单文件 HTML；
- 常规后台页默认使用 `default` Application Shell；只有用户明确已有系统框架时使用 `content-only`，明确 standalone 时使用 `none`；不得创建第四种模式；
- 用户只说“帮我做一个商品管理列表页”且没有导航说明时，必须选择 Basic List + `default`，并生成 Brand Top Menu、Real System Switch、Collapsible Side Menu、Basic List、Notification、Theme Toggle 和 User access；
- `default` 只使用批准的 Brand Top Menu + Collapsible Embedded Side Menu + Page Template；不得发明自定义导航；
- 组合前必须绑定 `patterns/default-application-shell.html` 和已选模板 reference；Shell 只提供 Main Slot，Template 以完整 approved subtree 进入该 slot，不能根据业务文案重新生成模板 chrome；
- Generic UI / navigation Icon 必须来自 `window.arcoicon`；不要从 `StarbucksReact` 解构 Icon，不使用 Emoji、手绘 SVG、CSS Icon 或第三方 Icon library；固定 Pattern Icon 保持 `IconNotification`、`IconMoon`、`IconSun`、`IconPlus`、`IconMore`、`IconDelete` 映射；Side 业务菜单只能选择真实且语义合理的 Arco Icon，禁止虚构名称；渲染前对每个使用的 Icon 执行 `typeof window.arcoicon[iconName] !== 'undefined'`，缺失即替换并失败，不留空白 slot；
- Basic List 的 Page Header 保持 `Page Title + optional Context Help + Header Actions`；存在 `CONTEXT_HELP` 时使用标题相邻、可键盘访问的 Help control，禁止生成 persistent page subtitle；
- Top action order 为 Store/System Switch → Notification → Theme Toggle → Divider → Avatar/User；Light 显示 `window.arcoicon.IconMoon` 和“切换到深色模式”，Dark 显示 `IconSun` 和“切换到浅色模式”；
- Theme 使用 `html[data-theme]`、body `arco-theme` / `data-arco-theme` 和 `designkit-starter-theme`，作用于整个页面；不新增 Theme Provider；
- 1280/768/390 遵守 Shell responsive contract；390 保留 required global actions，不生成 Drawer、Hamburger、Bottom Navigation 或 mobile-specific new pattern；
- 使用固定版本 React UMD/CDN、Babel 和少量 JavaScript；
- 使用本地 Mock 数据；
- Page Template 只在对应 Golden Example 已覆盖的能力范围内组合；Application Shell 只按 `references/application-shell.md` 的 no-Golden restricted composition strategy；
- 不生成 React/Vue 工程；
- 不使用 import、export、TypeScript、npm、Vite 或真实接口；
- 不复制组件源码；
- 不使用宽泛 .arco-* 覆盖或 !important；
- 页面自身不能出现无意义横向滚动；
- Shell 不改变 Template anatomy、Breadcrumb policy、Toolbar 或 Basic List `4px / 16px / 16px`；
- 宽表格只能在表格容器内滚动；
- 不自动添加当前模板范围外的 FilterBar、批量操作、导出、列设置、Upload、Card、Timeline、Tabs 或其他能力；Card List 只使用其模板已定义的页面内选择和轻量批量操作；
- 基础列表必须使用真实 `StarbucksReact.TableToolbar`：关键词 Search 配置为 `placement: 'start'`，右侧只启用 `tableTools.refresh`；不得用页面私有 Input 和 Button 重新拼装工具栏；
- Basic List 必须复用 approved template reference 的 `Page Header → TableToolbar(Filter Region + Action Region) → Table → Pagination` 结构；Quick Filter 只能属于 TableToolbar Filter Region，row actions 必须复用 `sbux-table-row-actions` pattern；
- 卡片列表必须保持 Selection Control 的选择所有权、Card Actions 与 Batch Actions 分离、宽度驱动的 Grid、标题省略、主题语义色和可访问性契约；
- 页面需要状态演示时，将状态 Select 放在 Header 右侧操作区最左侧并标记为 Demo-only，不生成独立顶部状态卡片；
- 表格查看、编辑等页面内行操作使用品牌色文字 Button 和 `sbux-table-row-actions`，不得为了颜色改用 Link 或在页面 CSS 中覆盖 `.arco-btn-text`；
- 不修改 `runtime/`、`templates/`、`examples/` 或 Starter 规则文件。

请将文件写入 output/<descriptive-name>.html，并在最后按 references/quality-checklist.md 自检。
没有实际在浏览器中打开和检查的内容必须标记为 UNVERIFIED。
```
