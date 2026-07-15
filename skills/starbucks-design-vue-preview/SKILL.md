---
name: starbucks-design-vue-preview
description: "星巴克 Vue 页面可视化搭建 — 零环境、零编译，生成一个 HTML 文件双击即可预览。面向产品经理、设计师等无前端开发环境的用户。当用户要求「搭一个页面」「做一个表单」「画一个后台」「预览一下」「我没有开发环境」时使用。覆盖 Button、Table、Form、Modal、Select、Input、DatePicker、Layout、Menu、Card、Tabs、Alert、Drawer、Pagination、Steps 等全部组件，使用 a- 前缀（a-button、a-table 等），星巴克品牌绿主题自动注入，无需手动配置。"
---

# 星巴克 Vue 页面可视化搭建（CDN 零环境）

零安装、零编译。生成一个 `.html` 文件，浏览器打开即可看到星巴克主题页面。

## 核心理念

- 所有资源从 CDN 加载，不需要 Node.js / npm / Vite
- **星巴克主题包**（`@sbux/starbucks-design-vue` UMD）自动注入品牌绿主题，无需手写 CSS 变量
- Vue 3 模板在 HTML 中直接写，浏览器运行时编译
- 组件标签用 `a-` 前缀（和开发者版 skill 一致）
- 产出一个文件，发给任何人双击就能看

## ⚠️ 组件 API 查证（必读）

**本 Skill 只描述 CDN 加载方式和代码格式，不包含每个组件的完整 API 文档。**

生成页面代码前，**必须先加载开发版 Skill 的对应组件 reference 文件**获取准确的属性、事件、插槽：

```
skills/starbucks-design-vue/references/components/
├── general/button.md          ← <a-button> 的完整 API
├── data-display/table.md      ← <a-table> 的完整 API
├── data-entry/form.md         ← <a-form>、<a-form-item> 的完整 API
├── data-entry/input.md        ← <a-input> 的完整 API
├── data-entry/select.md       ← <a-select>、<a-option> 的完整 API
├── feedback/modal.md          ← <a-modal> 的完整 API
├── feedback/message.md        ← Message 的完整 API
├── navigation/menu.md         ← <a-menu> 的完整 API
├── layout/layout.md           ← <a-layout> 的完整 API
└── ...（每个组件都有对应的 reference 文件）
```

**工作流程：**
1. 确认页面需要哪些组件
2. **Read 对应组件的 reference 文件**，获取准确的属性名、事件名、插槽名、枚举值
3. 按本 Skill 的 CDN 模板格式生成 HTML（模板在 `#app` 内、`app.use(StarbucksVue)`、不使用 import）

**组件 API 与开发版完全一致** — 同一个 `a-button` 的属性、事件、插槽名称不因 CDN 而改变。

## 什么是 CDN？

内容分发网络。所有代码已经编译好放在服务器上，用 `<script src="...">` 引用即可。

## 产出模板

每次生成页面时，必须输出一个完整的 HTML 文件：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题</title>
  <style>
    body { font-family: "Noto Sans SC", "Poppins", Roboto, sans-serif; margin: 0; }
  </style>
</head>
<body>
  <!-- 1. Vue 模板 -->
  <div id="app">
    <!-- 在这里写 Vue 模板 -->
  </div>

  <!-- 2. CDN 脚本（顺序不能变） -->
  <!-- ① Vue 3 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
  <!-- ② Arco Design 基础组件库（StarbucksVue 的依赖） -->
  <script src="https://cdn.jsdelivr.net/npm/@arco-design/web-vue@2.58.0/dist/arco-vue.min.js"></script>
  <!-- ③ Arco 图标库 -->
  <script src="https://cdn.jsdelivr.net/npm/@arco-design/web-vue@2.58.0/dist/arco-vue-icon.min.js"></script>
  <!-- ④ 星巴克主题包（自动注入品牌绿主题 + 重新导出组件） -->
  <script src="https://active.starbucks.com.cn/wxmini_vanilla/bizops/starbucks-design-vue/1.0.13/index.umd.js"></script>

  <!-- 3. 页面逻辑 -->
  <script>
    const { createApp, ref, reactive, computed, watch, onMounted, nextTick } = Vue;

    const app = createApp({
      setup() {
        // 响应式数据和方法写在这里
        return {};
      },
    });

    // ⚠️ 使用 StarbucksVue（带主题），不是 ArcoVue
    app.use(StarbucksVue);
    // 图标库
    app.use(ArcoVueIcon);

    app.mount('#app');
  </script>
</body>
</html>
```

## 关键约定

- **模板写在 `#app` 内**：和写 `.vue` 文件的 `<template>` 一样
- **组件标签用 `a-` 前缀**：`<a-button>`、`<a-table>`、`<a-form>`、`<a-input>`、`<a-modal>` 等
- **属性用 kebab-case**：`html-type`、`show-jumper`、`row-selection`
- **事件用 `@` 语法**：`@click`、`@change`、`@page-change`、`@submit-success`、`@ok`、`@cancel`
- **双向绑定用 `v-model`**：`v-model="keyword"`、`v-model:visible="modalVisible"`
- **插槽用 `#` 语法**：`#title`、`#footer`、`#extra`、`#columns`
- **表单用 `:model` + `field`**：`<a-form :model="formData">`，子项 `<a-form-item field="name">`
- **数据定义在 `setup()` 里**：`ref()` 声明基本类型，`reactive()` 声明对象
- **Vue API 从全局 `Vue` 解构**：`const { ref, reactive, computed } = Vue;`
- **组件库注册用 `StarbucksVue`**：`app.use(StarbucksVue)`（不是 ArcoVue）

## CDN 加载链

```
① Vue.js CDN        → window.Vue
② Arco Vue CDN      → window.ArcoVue         （StarbucksVue 的底层依赖）
③ Arco Icons CDN    → window.ArcoVueIcon      （图标库）
④ Starbucks UMD CDN → window.StarbucksVue     （注入星巴克主题 + 重新导出所有组件）
```

④ 加载时会自动以 `<style>` 标签注入完整的星巴克品牌绿主题 CSS，无需手动编写任何 CSS 变量。

## 图标

通过 `app.use(ArcoVueIcon)` 注册后，使用 `<icon-xxx>` 标签：

```html
<icon-search />
<icon-plus />
<icon-edit />
<icon-delete />
<icon-check />
<icon-close />
<icon-download />
<icon-upload />
<icon-settings />
<icon-user />
<icon-home />
<icon-email />
```

- 图标名用小写 + 连字符：`IconSearch` → `<icon-search>`
- 支持 `:size` 属性：`<icon-search :size="20" />`
- 支持 `:stroke-width` 属性

## 全局提示（Message）

从 `StarbucksVue` 获取（不是 ArcoVue）：

```js
const { Message } = StarbucksVue;

Message.success('操作成功');
Message.error('操作失败');
Message.warning('警告信息');
Message.info('普通信息');

// 带配置
Message.success({ content: '保存成功', duration: 3000 });
```

## 弹窗（Modal）

### 组件式弹窗

```html
<a-modal v-model:visible="visible" title="弹窗标题" @ok="handleOk" @cancel="handleCancel">
  <p>弹窗内容</p>
</a-modal>

<script>
setup() {
  const visible = ref(false);
  const handleOk = () => { visible.value = false; };
  const handleCancel = () => { visible.value = false; };
  return { visible, handleOk, handleCancel };
}
</script>
```

### 函数式确认

```js
const { Modal } = StarbucksVue;
Modal.confirm({
  title: '确认删除',
  content: '删除后不可恢复，是否继续？',
  onOk: () => { /* 执行删除 */ },
});
```

## 通知（Notification）

```js
const { Notification } = StarbucksVue;
Notification.success({ title: '成功', content: '数据已保存' });
Notification.error({ title: '失败', content: '请检查网络连接' });
```

## 常用页面布局

### 侧边栏 + 顶部导航（管理后台经典布局）

```html
<div id="app">
  <a-layout style="height: 100vh;">
    <a-layout-header style="background: var(--color-primary); padding: 0 24px; display: flex; align-items: center;">
      <span style="color: #fff; font-size: 18px; font-weight: 600;">星巴克管理系统</span>
    </a-layout-header>
    <a-layout>
      <a-layout-sider :collapsible="true" style="background: #fff;">
        <a-menu :default-selected-keys="['1']" style="height: 100%;">
          <a-menu-item key="1"><icon-home /> 首页</a-menu-item>
          <a-menu-item key="2"><icon-user /> 用户管理</a-menu-item>
          <a-menu-item key="3"><icon-settings /> 系统设置</a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content style="padding: 24px;">
        <!-- 页面内容 -->
      </a-layout-content>
    </a-layout>
  </a-layout>
</div>
```

### 搜索 + 表格（数据管理页）

```html
<div id="app">
  <a-space direction="vertical" :style="{ width: '100%', padding: '24px' }">
    <a-card>
      <a-space>
        <a-input v-model="keyword" placeholder="请输入关键词" style="width: 240px;" />
        <a-button type="primary" @click="handleSearch"><icon-search /> 搜索</a-button>
        <a-button @click="handleReset">重置</a-button>
      </a-space>
    </a-card>

    <a-card title="数据列表">
      <template #extra>
        <a-button type="primary" @click="handleAdd"><icon-plus /> 新增</a-button>
      </template>
      <a-table :columns="columns" :data="tableData" :pagination="pagination" @page-change="handlePageChange">
        <template #action="{ record }">
          <a-space>
            <a-button type="text" @click="handleEdit(record)">编辑</a-button>
            <a-popconfirm content="确认删除？" @ok="handleDelete(record)">
              <a-button type="text" status="danger">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </a-space>
</div>
```

对应 JS：

```js
const { createApp, ref, reactive } = Vue;
const app = createApp({
  setup() {
    const keyword = ref('');
    const tableData = ref([
      { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
      { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑' },
      { id: 3, name: '王五', email: 'wangwu@example.com', role: '访客' },
    ]);
    const columns = [
      { title: '姓名', dataIndex: 'name' },
      { title: '邮箱', dataIndex: 'email' },
      { title: '角色', dataIndex: 'role' },
      { title: '操作', slotName: 'action', width: 180 },
    ];
    const pagination = reactive({ current: 1, pageSize: 10, total: 100 });

    const handleSearch = () => { /* 搜索 */ };
    const handleReset = () => { keyword.value = ''; };
    const handleAdd = () => { /* 新增 */ };
    const handleEdit = (r) => { /* 编辑 */ };
    const handleDelete = (r) => { /* 删除 */ };
    const handlePageChange = (p) => { pagination.current = p; };

    return { keyword, tableData, columns, pagination,
             handleSearch, handleReset, handleAdd, handleEdit, handleDelete, handlePageChange };
  },
});
app.use(StarbucksVue);
app.use(ArcoVueIcon);
app.mount('#app');
```

### 表单页

```html
<div id="app">
  <a-card title="用户信息" style="max-width: 640px; margin: 24px;">
    <a-form :model="form" auto-label-width @submit-success="handleSubmit">
      <a-form-item field="name" label="姓名" :rules="[{ required: true, message: '请输入姓名' }]">
        <a-input v-model="form.name" placeholder="请输入" />
      </a-form-item>
      <a-form-item field="email" label="邮箱" :rules="[{ required: true, type: 'email', message: '请输入有效邮箱' }]">
        <a-input v-model="form.email" placeholder="请输入" />
      </a-form-item>
      <a-form-item field="role" label="角色">
        <a-select v-model="form.role" placeholder="请选择">
          <a-option value="admin">管理员</a-option>
          <a-option value="editor">编辑</a-option>
          <a-option value="viewer">访客</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="active" label="状态">
        <a-switch v-model="form.active" />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit">保存</a-button>
          <a-button @click="handleCancel">取消</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-card>
</div>
```

### 弹窗表单

```html
<a-modal v-model:visible="modalVisible" title="新增用户" @ok="handleOk" @cancel="handleCancel" :width="560">
  <a-form :model="form" auto-label-width>
    <a-form-item field="name" label="姓名" :rules="[{ required: true, message: '请输入' }]">
      <a-input v-model="form.name" />
    </a-form-item>
    <a-form-item field="email" label="邮箱">
      <a-input v-model="form.email" />
    </a-form-item>
  </a-form>
</a-modal>
```

```js
setup() {
  const modalVisible = ref(false);
  const form = reactive({ name: '', email: '' });
  const handleOk = () => { console.log('保存:', form); modalVisible.value = false; };
  const handleCancel = () => { modalVisible.value = false; };
  return { modalVisible, form, handleOk, handleCancel };
}
```

## 表格进阶

### 排序 & 筛选

```js
const columns = [
  { title: '姓名', dataIndex: 'name', sortable: { sortDirections: ['ascend', 'descend'] } },
  { title: '状态', dataIndex: 'status', filterable: {
    filters: [{ text: '启用', value: 'active' }, { text: '禁用', value: 'inactive' }]
  }},
];
```

### 行选择

```html
<a-table :columns="columns" :data="tableData" v-model:selected-keys="selectedKeys"
  :row-selection="{ type: 'checkbox', showCheckedAll: true }" />
<a-button type="primary" :disabled="selectedKeys.length === 0" @click="batchDelete">
  批量删除 ({{ selectedKeys.length }})
</a-button>
```

## 常用组件速查

### 数据录入

| 组件 | 用法 |
|---|---|
| Input | `<a-input v-model="val" placeholder="请输入" />` |
| Input.Password | `<a-input-password v-model="val" />` |
| Input.Search | `<a-input-search v-model="val" @search="onSearch" />` |
| Textarea | `<a-textarea v-model="val" :max-length="200" />` |
| Select | `<a-select v-model="val"><a-option value="a">A</a-option></a-select>` |
| DatePicker | `<a-date-picker v-model="date" />` |
| RangePicker | `<a-range-picker v-model="range" />` |
| Checkbox | `<a-checkbox v-model="checked">同意</a-checkbox>` |
| Checkbox.Group | `<a-checkbox-group v-model="vals" :options="options" />` |
| Radio.Group | `<a-radio-group v-model="val"><a-radio value="a">A</a-radio></a-radio-group>` |
| Switch | `<a-switch v-model="val" />` |
| Slider | `<a-slider v-model="val" :min="0" :max="100" />` |
| Rate | `<a-rate v-model="val" />` |
| Upload | `<a-upload action="/api/upload" />` |
| Cascader | `<a-cascader v-model="val" :options="options" />` |
| TreeSelect | `<a-tree-select v-model="val" :data="treeData" />` |
| InputNumber | `<a-input-number v-model="val" :min="0" :max="100" />` |
| InputTag | `<a-input-tag v-model="tags" />` |
| ColorPicker | `<a-color-picker v-model="color" />` |
| VerificationCode | `<a-verification-code v-model="code" />` |

### 数据展示

| 组件 | 用法 |
|---|---|
| Table | `<a-table :columns="cols" :data="rows" />` |
| Card | `<a-card title="标题">内容</a-card>` |
| Tabs | `<a-tabs><a-tab-pane key="1" title="标签1">...</a-tab-pane></a-tabs>` |
| Tree | `<a-tree :data="treeData" />` |
| List | `<a-list :data="list"><template #item="{ item }">{{ item }}</template></a-list>` |
| Descriptions | `<a-descriptions :data="descData" />` |
| Statistic | `<a-statistic title="用户数" :value="1234" />` |
| Tag | `<a-tag color="green">已完成</a-tag>` |
| Badge | `<a-badge :count="5"><a-button>消息</a-button></a-badge>` |
| Avatar | `<a-avatar>U</a-avatar>` |
| Tooltip | `<a-tooltip content="提示"><a-button>悬停</a-button></a-tooltip>` |
| Popover | `<a-popover title="标题" content="内容"><a-button>点击</a-button></a-popover>` |
| Carousel | `<a-carousel><a-carousel-item v-for="i in 3">Slide</a-carousel-item></a-carousel>` |
| Collapse | `<a-collapse><a-collapse-item key="1" header="标题">内容</a-collapse-item></a-collapse>` |
| Timeline | `<a-timeline><a-timeline-item label="今天">事件</a-timeline-item></a-timeline>` |
| Calendar | `<a-calendar />` |
| Image | `<a-image src="url" />` |
| Empty | `<a-empty />` |

### 反馈

| 组件 | 用法 |
|---|---|
| Alert | `<a-alert type="success" content="操作成功" />` |
| Drawer | `<a-drawer v-model:visible="v" title="抽屉">内容</a-drawer>` |
| Popconfirm | `<a-popconfirm content="确认？" @ok="doDelete"><a-button>删除</a-button></a-popconfirm>` |
| Progress | `<a-progress :percent="60" />` |
| Result | `<a-result status="success" title="提交成功" />` |
| Skeleton | `<a-skeleton :loading="loading"><div>内容</div></a-skeleton>` |
| Spin | `<a-spin :loading="loading"><div>内容</div></a-spin>` |

### 导航 & 布局

| 组件 | 用法 |
|---|---|
| Layout | `<a-layout>` + `<a-layout-header>` + `<a-layout-sider>` + `<a-layout-content>` |
| Menu | `<a-menu><a-menu-item key="1">菜单</a-menu-item></a-menu>` |
| Breadcrumb | `<a-breadcrumb><a-breadcrumb-item>首页</a-breadcrumb-item></a-breadcrumb>` |
| Pagination | `<a-pagination :total="100" @change="onPage" />` |
| Steps | `<a-steps :current="1"><a-step title="步骤1" /></a-steps>` |
| Dropdown | `<a-dropdown><a-button>操作</a-button><template #content><a-doption>选项</a-doption></template></a-dropdown>` |
| Space | `<a-space><a-button>A</a-button><a-button>B</a-button></a-space>` |
| Grid | `<a-row :gutter="16"><a-col :span="12">一半</a-col></a-row>` |
| Divider | `<a-divider />` |

### 其他

| 组件 | 用法 |
|---|---|
| Affix | `<a-affix :offset-top="80"><a-button>固定顶部</a-button></a-affix>` |
| Anchor | `<a-anchor :items="anchors" />` |
| BackTop | `<a-back-top />` |
| Watermark | `<a-watermark content="星巴克">内容</a-watermark>` |
| Scrollbar | `<a-scrollbar style="height: 200px;">内容</a-scrollbar>` |

## 与开发者版 Skill 的关系

本 skill 是 [starbucks-design-vue](../starbucks-design-vue/SKILL.md) 的零环境版本：

| | 开发者版 | 本 Skill（CDN） |
|---|---|---|
| **安装** | `npm install @sbux/starbucks-design-vue` | 无需安装 |
| **编译** | Vite / webpack | 无需编译 |
| **预览** | `npm run dev` | 双击 HTML 文件 |
| **组件 API** | 完全一致（`a-` 前缀） | 完全一致 |
| **主题** | `@sbux/starbucks-design-vue` npm 包 | `@sbux/starbucks-design-vue` UMD CDN |
| **代码格式** | `.vue` 单文件组件 | HTML 内 `<script>` |
| **TypeScript** | ✅ | ❌ |
| **SCSS / scoped style** | ✅ | ❌ |

如需查看某个组件的完整 API（属性、事件、插槽），参考 [starbucks-design-vue](../starbucks-design-vue/SKILL.md) 中的对应组件文档。

## 使用方式

1. 告诉 Claude 你想搭什么样的页面
2. Claude 生成 `.html` 文件
3. 保存到桌面，**双击用浏览器打开**
4. 所见即所得

不需要安装任何软件（除了浏览器）。
