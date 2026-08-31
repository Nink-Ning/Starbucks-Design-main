# 单文件 HTML 模板契约

## 文件结构

每个生成结果必须是完整单文件 HTML；在 Starter 内预览时保留 `output/`、`examples/` 与 `runtime/` 的相对目录关系：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题</title>
  <style>
    /* 页面级布局 CSS */
  </style>
</head>
<body>
  <div id="root"></div>
  <!-- 固定顺序的 CDN -->
  <script type="text/babel">
    /* 页面级 React 逻辑和本地 Mock */
  </script>
</body>
</html>
```

## 运行约束

- 使用 `ReactDOM.createRoot(document.getElementById('root')).render(<App />)`。
- 使用 `StarbucksReact` 中的组件和 `window.arcoicon` 中的图标。
- JSX 必须位于 `script[type="text/babel"]`。
- 允许少量 `useState`、`useMemo`、`useEffect` 和事件处理逻辑。
- 不使用路由、状态管理库、接口请求库或构建工具。
- 不使用本地图片、字体或其他相对路径依赖；唯一允许的相对路径依赖是 Starter Runtime 的 `../runtime/starbucks-react.css` 和 `../runtime/starbucks-react.umd.js`。
- 不承诺将 HTML 单独复制到 Starter 外部后仍然可运行。

## 输出约束

- 默认写入 `output/<descriptive-name>.html`。
- HTML 内必须包含本地 Mock 数据。
- 不得包含 `import`、`export`、TypeScript、JSX 工程入口或 npm 命令。
- 不得引用 React / Vue 源码、内部 Docs 路径或仓库绝对路径。
- 不得生成 `package.json`、锁文件或构建配置。

## 页面级 CSS

允许维护：

- 页面背景和容器；
- 页面头部、区块和工具栏布局；
- 页面级网格和间距；
- 表格容器的横向滚动；
- 页面响应式断点；
- 页面专用的语义类名。

禁止维护：

- 宽泛的 `.arco-*` 覆盖；
- 组件内部状态的重写；
- `!important`；
- 用 CSS 复制 Button、Input、Table 或 Form 的内部样式。

## 组件复用优先级

页面生成必须按以下顺序选择能力：

1. Starter Runtime 已提供的业务组件；
2. Starter Runtime 已提供的基础组件；
3. 页面级布局组合；
4. 仅在前三者不能满足且没有扩大 V1 边界时，才允许增加页面私有结构。

当真实业务组件已经覆盖所需任务时，不得为了减少 Props 或沿用旧页面代码而重新实现其内部布局、状态或响应式逻辑。

使用已注册业务组件时，必须读取 manifest 对应的 Business Component Knowledge。TableToolbar 的能力选择、状态所有权、生成规则和 Evaluator 读取 `business-components/table-toolbar.md`，再由当前页面模板限定实际可用的 Props 和场景。业务组件知识只指导组件选择和组合，不改变页面模板路由，也不扩大 Starter V1 支持范围。

Basic List 的搜索、工具按钮和响应式排列由 `StarbucksReact.TableToolbar` 负责。页面只能提供 `quickFilters`、`quickFilterValues`、`tableTools.refresh` 和相应回调，不生成 `.dk-page__table-toolbar`、`.dk-page__toolbar-left` 或 `.dk-page__toolbar-right`。

Card List 同样直接复用 `StarbucksReact.TableToolbar` 和已查证的基础组件。页面负责筛选结果、Selection Set、Card Grid、单个对象内容、唯一可见 selection summary 和页面级事件；`TableToolbar` 负责已批准的筛选、Card-specific batch-action layout 及其组件状态。若 page-owned summary 已存在，必须在 Card List scope 隐藏 generic selection-summary region，不得生成第二个通用 selected-count。不得在页面中复制 Toolbar 的按钮、禁用、折叠菜单或响应式实现。Card 的 frozen DOM/structure、media、selection treatment 和 footer/actions 必须来自 Docs approved Card List structure，而非手写替代解剖。

Card List 可以使用页面专用语义类维护 Card 容器、媒体、内容、元数据、选择入口、操作区和响应式网格，但这些结构仍属于页面模板，不得声明或导出为公共 `CardListPage`、`CheckCard` 或 Card API。Card Body 不隐式改变选择；选择只能由具有明确可访问名称的 Selection Control 触发。

`examples/multi-select-card-list.html` 是 Card List 的只读 Golden Example。生成结果只能参考其能力边界，不复制其中的商品数据、默认选择、页面私有素材或实现代码，也不得写回 Golden。

所有模板默认遵守 [P1 Starter Default Template Baselines](default-template-baselines.md)。默认模板是标准答案；业务字段、标签、值、状态、选项和 Mock 内容可以适配，页面 anatomy、layout、spacing、media shape、page context、selection/batch relationship 和 Drawer anatomy 需要明确 Override。

## Header 与行操作结构契约

- 存在页面状态演示时，状态 `Select` 必须位于页面 Header 的右侧操作容器内，并排在所有业务操作之前。
- 状态 `Select` 使用 `aria-label="页面状态"` 和 `data-demo-only="true"` 标记；没有状态演示的模板不得为了占位新增控件。
- 不生成独立的顶部 Demo 状态卡片、标题或说明段落。
- 表格行操作使用 `Button type="text"`；普通页面内操作放入 `sbux-table-row-actions` 作用域。
- 页面只维护行操作容器的 `display`、对齐、间距和换行，不维护 Button 的颜色、字号、背景、边框或交互状态。

## 验证状态

只有实际使用浏览器打开 HTML、操作主要交互并检查控制台后，才可以标记为已验证。否则必须标记：

```text
UNVERIFIED
```
