# Demo 自检提示词

```text
请审查 output/<file-name>.html 是否符合 DesignKit Starter V1。

请读取：
- references/design-rules.md
- references/component-catalog.md
- references/template-contract.md
- references/cdn-runtime.md
- references/quality-checklist.md
- references/application-shell.md
- references/implementation-binding-contract.md
- 对应的页面模板

请按以下顺序检查：
1. 页面模板选择是否正确：视觉对象浏览、选择和管理使用 Card List，结构化比较使用 Basic List，模糊“列表”仍默认 Basic List；
2. 是否是完整单文件 HTML；
3. CDN 版本和加载顺序是否固定；
4. 是否存在 import、export、TypeScript、npm、Vite 或工程入口；
5. 组件 API 是否来自已查证目录；
6. 是否使用本地 Mock 数据；
7. 是否参考了对应 `examples/*.html` 的结构和能力边界；
8. 页面层级、主操作、状态和响应式是否完整；
9. 是否存在宽泛 .arco-* 或 !important；
10. 页面自身和表格容器的溢出是否合理；
11. 是否混入真实数据、接口、权限、上传或导出逻辑；
12. 是否自动加入当前模板未支持的 FilterBar、批量操作、列设置、Card、Timeline、Tabs 或复杂 Pro 能力。
13. 页面状态 Select 是否位于 Header 右侧操作区最左侧，且没有独立顶部状态卡片；没有状态演示的模板是否避免了无意义占位。
14. 表格查看、编辑是否使用品牌色文字 Button 和 `sbux-table-row-actions`，且页面 CSS 没有覆盖 `.arco-btn-text`。
15. 基础列表是否使用真实 `StarbucksReact.TableToolbar`，Search 配置为 `placement: 'start'`、右侧只启用 Refresh，并且没有页面私有工具栏结构。
16. Card List 是否保持 Toolbar、Card Grid、Card 的页面结构，且 Card Body 不隐式改变选择。
17. Card List 的当前筛选结果、选择摘要和 Batch Actions 是否使用一致的选择集合，依赖选择的操作是否正确禁用。
18. Card Actions 是否最多展示 3 个入口、More 是否计为一个入口并保持优先级，危险操作是否确认并反馈。
19. Card List 是否按可用宽度决定 Grid 列数，Toolbar 是否独立换行，标题是否省略且页面无横向溢出。
20. Card List 的暗色语义色和 Selected、Hover、Focus、Disabled 是否可读且不只依赖颜色或透明度。
21. Checkbox、Card Actions、Batch Actions、More Menu 和图标按钮是否支持键盘、可见 Focus 和可访问名称。
22. Shell Mode 是否只为 `default` / `content-only` / `none`，且常规后台页默认 `default`。
23. Default Shell 是否使用批准的 Brand Top Menu 和 Collapsible Embedded Side Menu，Top action order 是否为 Store/System Switch → Notification → Theme Toggle → Divider → Avatar/User。
24. Theme Toggle 是否用 `window.arcoicon.IconMoon` / `IconSun` 表达 target mode，Notification 是否用 `IconNotification`，且没有 Theme Provider。
25. Theme 是否通过 html/body attributes 作用于 Top、Side、Main 和所有组件，localStorage 是否使用 `designkit-starter-theme` 的批准优先级。
26. Shell 是否保持 Template anatomy、Breadcrumb independence 和 Basic List `4px / 16px / 16px` ownership。
27. 1280/768/390 是否符合 Side 260/56/56、required global actions 和 document overflow contract；390 是否没有发明 Drawer、Hamburger、Bottom Navigation 或新 mobile pattern。
28. 是否泄漏 Custom Navigation Shell、Navigation API、dynamic permission menu、backend-driven navigation、real router、permission routing、system switch backend logic 或 React/Vue project navigation integration。

请输出：
- 通过项；
- 必须修复项；
- 建议优化项；
- 未实际浏览器验证的项目，并标记 UNVERIFIED。

不要在审查过程中自动扩大 V1 范围或修改仓库其他文件。
如果需要浏览器预览，请使用本地 HTTP 服务；不要把 `output/*.html` 的 file:// 打开结果当作完整验证。
```
