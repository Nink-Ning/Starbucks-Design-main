# Demo 自检提示词

```text
请审查 output/<file-name>.html 是否符合 DesignKit Starter V1。

请读取：
- references/design-rules.md
- references/component-catalog.md
- references/template-contract.md
- references/cdn-runtime.md
- references/quality-checklist.md
- 对应的页面模板

请按以下顺序检查：
1. 是否是完整单文件 HTML；
2. CDN 版本和加载顺序是否固定；
3. 是否存在 import、export、TypeScript、npm、Vite 或工程入口；
4. 组件 API 是否来自已查证目录；
5. 是否使用本地 Mock 数据；
6. 是否参考了对应 `examples/*.html` 的结构和能力边界；
7. 页面层级、主操作、状态和响应式是否完整；
8. 是否存在宽泛 .arco-* 或 !important；
9. 页面自身和表格容器的溢出是否合理；
10. 是否混入真实数据、接口、权限、上传或导出逻辑；
11. 是否自动加入当前模板未支持的 FilterBar、批量操作、列设置、Card、Timeline、Tabs 或复杂 Pro 能力。

请输出：
- 通过项；
- 必须修复项；
- 建议优化项；
- 未实际浏览器验证的项目，并标记 UNVERIFIED。

不要在审查过程中自动扩大 V1 范围或修改仓库其他文件。
如果需要浏览器预览，请使用本地 HTTP 服务；不要把 `output/*.html` 的 file:// 打开结果当作完整验证。
```
