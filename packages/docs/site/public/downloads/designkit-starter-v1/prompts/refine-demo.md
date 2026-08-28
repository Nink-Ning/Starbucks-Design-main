# 修改 Demo 提示词

```text
请基于当前 output/<file-name>.html 修改 Demo。

本次修改目标：[填写要修改的文案、字段、布局或交互]
不能改变的内容：[填写需要保持不变的页面结构或行为]

请遵守 DesignKit Starter V1：
- 先根据当前文件和对应模板确认页面类型，并在修改中保持该模板类型；
- 不得把 Basic List 与 Card List 自动互相转换；如果修改目标确实要求换模板，先说明结构和行为影响并等待确认；
- 保持单文件 HTML 输出；
- 保持固定 CDN 版本和加载顺序；
- 继续加载 Starter 本地 `../runtime/starbucks-react.css` 和 `../runtime/starbucks-react.umd.js`；
- 继续使用本地 Mock 数据；
- 不添加 import、export、TypeScript、npm、Vite 或真实接口；
- 不复制组件源码；
- 不添加宽泛 .arco-* 覆盖或 !important；
- 检查 Normal、Loading、Empty、Error 和窄屏结果；
- 不把本地 Mock 反馈写成真实服务端成功；
- 不添加对应模板范围外的 FilterBar、导出、列设置、批量、Upload、Card、Timeline 或 Tabs；Card List 仅保留其模板内的页面选择和轻量批量操作；
- 基础列表保持使用真实 `StarbucksReact.TableToolbar`，Search 位于 Start、Refresh 位于 End，不恢复页面私有工具栏；
- 卡片列表保持 Selection Control 是唯一选择入口，Card Actions 与 Batch Actions 独立，Toolbar 与 Grid 独立响应，标题省略且暗色模式和可访问状态完整；
- 已有页面状态演示时，状态 Select 保持在 Header 右侧操作区最左侧，不恢复独立顶部状态卡片；
- 表格查看、编辑等页面内行操作保持品牌色文字 Button 和 `sbux-table-row-actions`，不通过 Link 或页面 CSS 改色；
- 修改后按 references/quality-checklist.md 自检。

请覆盖写回 output/<file-name>.html，并说明：
1. 修改了什么；
2. 保持了什么；
3. 哪些内容尚未浏览器验证。

预览请使用本地 HTTP 服务，不要依赖“直接双击”来判断相对 Runtime 是否可用。
```
