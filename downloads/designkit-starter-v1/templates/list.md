# 基础列表页模板

## 定位

用于展示一组结构相对稳定的数据，并支持轻量搜索、分页和基础行操作。

## 适用场景

- 用户主要浏览和查找记录。
- 数据字段稳定，表格是页面主任务。
- 只需要本地 Mock 数据即可完成方案验证。

## 不适用场景

- 复杂多条件筛选；
- 高级 FilterBar；
- 跨页选择；
- 复杂批量操作；
- 真实服务端排序、分页或导出；
- 需要大量图表或多模块分析。

## 推荐结构

```text
页面 Header
→ 左侧：标题 + Tooltip 说明
→ 右侧：Demo 状态 Select（Demo-only）+ 主操作
→ 表格容器
   → TableToolbar
      → Start：关键词搜索
      → End：图标 Refresh
   → 9 列数据表格
   → Pagination
→ Empty / Error 状态
```

基础列表 Golden Example 的字段组合为：门店编号、门店名称、所在城市、门店类型、营业状态、开业日期、店长、更新时间、操作。

## 推荐组件

优先使用 `component-catalog.md` 中的：

```text
TableToolbar
Button
Table
Pagination
Tag
Empty
Result
Tooltip
Message
```

## 页面行为

- 使用本地 Mock 数据。
- 表格工具栏直接使用真实 `TableToolbar`，不得用页面私有 Input、Button 和 Tooltip 组合复制其能力。
- 搜索配置为 `quickFilters` 中 `placement: 'start'` 的 search；按 Enter 提交，`allowClear` 清空时立即提交空关键词。
- 搜索只改变本地展示结果，不调用接口；基础列表不提供业务筛选或业务重置。
- Refresh 使用 `tableTools.refresh` 和 `onRefresh`，不由页面单独绘制图标按钮。
- 不传 `selectedCount`、`operationActions` 或 `moreActions`，不启用导出和列设置。
- 分页只改变本地切片结果。
- Refresh、 新建、查看和编辑均使用明确的本地 Mock 反馈，不声称真实服务端操作成功。
- 查看、编辑使用 `Button type="text"`，容器同时包含页面布局类和 `sbux-table-row-actions`；品牌色和交互状态来自 Starter Runtime。
- 不得把行操作改成 Link 来获取绿色，也不得在页面 CSS 中覆盖 `.arco-btn-text`。
- 页面至少提供 Normal、Loading、Empty、Error 状态。
- 页面状态 Select 放在 Header 右侧操作区最左侧，使用 `aria-label="页面状态"` 和 `data-demo-only="true"`；不生成独立顶部状态卡片。
- Basic List 的 Continuous Data Region 使用模板专属的 `4px 16px 16px`（上、横向、下）内边距；这不是 Universal List Spacing Token。Toolbar、Table 和 Pagination 仍处于同一个连续 surface 内。
- `TableToolbar` 与表格容器之间不再增加页面级 `gap` 或 `margin`；不得把控件底部到表格顶部的距离扩成 `20px`。
- Loading 时保留表格结构，避免重复刷新。
- Empty 区分“没有数据”和“没有匹配结果”。
- Error 状态提供本地恢复按钮；Error 状态不额外显示 Pagination。

## 响应式要求

- 页面头部允许换行；工具栏响应式排列由真实 `TableToolbar` 负责。
- 搜索框在窄屏下由 `TableToolbar` 占满可用宽度或降为单列。
- 表格包在明确的局部滚动容器中。
- 页面自身不得产生无意义横向滚动。
- 复杂列不通过无限缩小字号解决。

## 生成前检查

- [ ] 已明确数据字段和状态文案。
- [ ] 未引入高级 FilterBar、跨页选择或复杂批量操作。
- [ ] 已使用真实 `StarbucksReact.TableToolbar`，没有页面私有工具栏结构。
- [ ] 关键词 Search 使用 `placement: 'start'`，Refresh 使用 `tableTools.refresh`。
- [ ] 工具栏右侧只保留图标 Refresh，不添加导出或列设置占位入口。
- [ ] 所有表格属性来自已查证 API。
- [ ] 已准备本地 Mock 数据。
- [ ] 已明确主操作和行操作。
- [ ] 行操作是品牌色文字 Button，视觉来自 `sbux-table-row-actions`，没有页面级组件覆盖。
- [ ] 状态 Select 位于 Header 操作区最左侧并先于“新建门店”。
- [ ] Data Region 的 top inset 为 4px、inline inset 为 16px；Toolbar、Table、Pagination 之间没有额外页面级 gap。
