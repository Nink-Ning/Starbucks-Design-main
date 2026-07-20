---
sidebar_position: 4
---

# 更新日志

用于记录 Starbucks UI Docs 与组件库的设计、功能和文档更新。

## 2026-07-17 {#2026-07-17}

<div class="sbux-changelog">
  <section class="sbux-changelog-item">
    <div class="sbux-changelog-meta">
      <div class="sbux-changelog-dot" />
      <div class="sbux-changelog-date">2026-07-17</div>
      <div class="sbux-changelog-author">更新人：宁凯Nink</div>
    </div>

    <div class="sbux-changelog-content">
      <div class="sbux-changelog-card">
        <div class="sbux-changelog-card-header">
          <h2>Starbucks Design System V2.0 样式收敛</h2>
          <p>
            本周主要围绕组件库样式替换与逐组件精修展开。整体策略是优先使用组件库设计变量，已有组件样式优先复用，新组件优化前先判断是否可以继承 Input、Select、Tag、Checkbox 等基础组件规范。
          </p>
        </div>

        <div class="sbux-changelog-group">
          <div class="sbux-changelog-group-content">
            <h3>
              <span class="sbux-changelog-tag sbux-changelog-tag-style">Style</span>
              设计变量与样式策略
            </h3>
            <ul>
              <li>确认组件样式优先基于全局设计变量实现。</li>
              <li>修正 Figma Variables 中暗色 brand 色值异常问题。</li>
              <li>建立组件优化原则：优先引用全局变量、优先复用已有基础组件样式、亮暗色模式同步适配。</li>
              <li>逐项校准 hover、focus、disabled、selected 等交互状态。</li>
            </ul>
          </div>
        </div>

        <div class="sbux-changelog-group">
          <div class="sbux-changelog-group-content">
            <h3>
              <span class="sbux-changelog-tag sbux-changelog-tag-style">Style</span>
              基础输入类组件
            </h3>
            <ul>
              <li>优化 Button、ButtonGroup、Input、InputNumber、InputTag、Select、Cascader、TimePicker、DatePicker、ColorPicker 等组件样式。</li>
              <li>统一圆角、描边、聚焦态、hover 态、禁用态等基础状态。</li>
              <li>优化输入框前后置标签的圆角衔接与分割线。</li>
              <li>统一 Select、Cascader、TimePicker、DatePicker 等下拉面板的描边、阴影、间距和暗色模式表现。</li>
              <li>优化多选标签展示，以及 ColorPicker 面板中的输入控件、RGB 模式布局、色块描边和面板内边距。</li>
            </ul>
          </div>
        </div>

        <div class="sbux-changelog-group">
          <div class="sbux-changelog-group-content">
            <h3>
              <span class="sbux-changelog-tag sbux-changelog-tag-style">Style</span>
              选择与状态类组件
            </h3>
            <ul>
              <li>优化 Checkbox、Radio、Switch、Tag、Tabs 等组件。</li>
              <li>校准 Checkbox 已选禁用态、Radio Button 类型、ButtonGroup 状态、Tag 关闭 icon hover、Tabs 可关闭标签与滚动溢出表现。</li>
              <li>Switch 移除方形类型，补充三种尺寸并完善暗色模式。</li>
            </ul>
          </div>
        </div>

        <div class="sbux-changelog-group">
          <div class="sbux-changelog-group-content">
            <h3>
              <span class="sbux-changelog-tag sbux-changelog-tag-style">Style</span>
              反馈类组件
            </h3>
            <ul>
              <li>优化 Tooltip、Popconfirm、Popover、Alert、Notification、Message、Modal、Drawer、Progress、Skeleton 等组件。</li>
              <li>统一气泡类组件的箭头、面板衔接、描边与主题色变量。</li>
              <li>Alert 描边色调整为 warning、error、success 对应设计变量。</li>
              <li>Modal、Drawer 参考旧 demo 样式重构，并完善暗色模式与挂载节点 demo 背景。</li>
            </ul>
          </div>
        </div>

        <div class="sbux-changelog-group">
          <div class="sbux-changelog-group-content">
            <h3>
              <span class="sbux-changelog-tag sbux-changelog-tag-feature">Feature</span>
              导航类组件
            </h3>
            <ul>
              <li>优化 Dropdown、Breadcrumb、Pagination、Steps、PageHeader、Tabs 等导航类组件。</li>
              <li>Dropdown 面板统一下拉样式，Breadcrumb 下拉菜单复用 Dropdown 规范。</li>
              <li>优化 Steps 暗色模式分割线，PageHeader 文案由 ArcoDesign 调整为 Starbucks。</li>
              <li>同步数据展示中的 Tabs 内容到导航 Tabs。</li>
            </ul>
          </div>
        </div>

        <div class="sbux-changelog-group">
          <div class="sbux-changelog-group-content">
            <h3>
              <span class="sbux-changelog-tag sbux-changelog-tag-style">Style</span>
              数据展示与通用组件
            </h3>
            <ul>
              <li>优化 Avatar、Link、Badge、Card 等组件及部分 demo 文案。</li>
              <li>Avatar 示例中替换默认文案及 logo，统一品牌展示。</li>
            </ul>
          </div>
        </div>

        <div class="sbux-changelog-group">
          <div class="sbux-changelog-group-content">
            <h3>
              <span class="sbux-changelog-tag sbux-changelog-tag-docs">Docs</span>
              Docs 站点体验
            </h3>
            <ul>
              <li>优化顶部导航、侧边栏导航与右侧锚点的展示样式。</li>
              <li>优化组件预览模块，支持默认展示预览，点击后展开实时编辑器。</li>
              <li>统一预览卡片、表格、代码块、分页导航等模块的边框与背景色变量。</li>
              <li>调整 API 表格默认宽度，使其与预览卡片宽度保持一致。</li>
              <li>优化小尺寸屏幕下内容区、锚点区与预览区的响应式表现。</li>
            </ul>
          </div>
        </div>

        <div class="sbux-changelog-group">
          <div class="sbux-changelog-group-content">
            <h3>
              <span class="sbux-changelog-tag sbux-changelog-tag-bugfix">BugFix</span>
              文档与 Demo 修复
            </h3>
            <ul>
              <li>修复 docs demo 解析、ReactLiveScope 组件导入、icon package path 等问题。</li>
              <li>修复预览容器溢出、Show code 遮挡、Pagination 首次点击 ResizeObserver 报错等问题。</li>
              <li>修复 Tabs 拖拽 demo 缺少 DndProvider 的问题。</li>
            </ul>
          </div>
        </div>

        <div class="sbux-changelog-group">
          <div class="sbux-changelog-group-content">
            <h3>
              <span class="sbux-changelog-tag sbux-changelog-tag-chore">Chore</span>
              协作规范沉淀
            </h3>
            <ul>
              <li>新组件优化前，先判断是否可以复用已有组件样式。</li>
              <li>下拉面板优先对齐 Select / Cascader 的面板规范。</li>
              <li>输入类控件优先复用 Input / Select / Tag / Checkbox 相关样式。</li>
              <li>暗色模式作为每个组件状态的一部分同步检查。</li>
              <li>docs demo 展示问题优先修文档；组件通用问题再进入组件库 override。</li>
              <li>每次组件包样式修改后默认执行构建，并按需重启 docs 预览服务。</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
