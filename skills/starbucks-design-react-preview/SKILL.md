---
name: starbucks-design-react-preview
description: "星巴克 React 页面可视化搭建 — 零环境、零编译，生成一个 HTML 文件双击即可预览。面向产品经理、设计师等无前端开发环境的用户。当用户要求「搭一个页面」「做一个表单」「画一个后台」「预览一下」「我没有开发环境」时使用。覆盖 Button、Table、Form、Modal、Select、Input、DatePicker、Layout、Menu、Card、Tabs、Alert、Drawer、Pagination、Steps 等全部组件（如 Button、Table、Form.Item、Select.Option 等），星巴克品牌绿主题自动注入，无需手动配置。"
---

# 星巴克 React 页面可视化搭建（CDN 零环境）

零安装、零编译。生成一个 `.html` 文件，浏览器打开即可看到星巴克主题页面。

## 核心理念

- 所有资源从 CDN 加载，不需要 Node.js / npm / Vite
- **星巴克主题包**（`@sbux/starbucks-design-react` UMD）自动注入品牌绿主题，无需手写 CSS 变量
- JSX 由 Babel standalone 在浏览器内实时转换
- 组件从 `StarbucksReact` 全局对象解构使用
- 图标从 `window.arcoicon` 全局对象解构使用
- 产出一个文件，发给任何人双击就能看

## ⚠️ 组件 API 查证（必读）

**本 Skill 只描述 CDN 加载方式和代码格式，不包含每个组件的完整 API 文档。**

生成页面代码前，**必须先加载开发版 Skill 的对应组件 reference 文件**获取准确的属性、事件、回调签名：

```
skills/starbucks-design-react/references/components/
├── general/button.md          ← Button 的完整 API
├── data-display/table.md      ← Table 的完整 API
├── data-entry/form.md         ← Form、Form.Item 的完整 API
├── data-entry/input.md        ← Input、Input.Search、Input.TextArea 的完整 API
├── data-entry/select.md       ← Select、Select.Option 的完整 API
├── feedback/modal.md          ← Modal、Modal.useModal 的完整 API
├── feedback/message.md        ← Message 的完整 API
├── navigation/menu.md         ← Menu、Menu.Item、Menu.SubMenu 的完整 API
├── layout/layout.md           ← Layout、Layout.Header、Layout.Sider 的完整 API
└── ...（每个组件都有对应的 reference 文件）
```

**工作流程：**
1. 确认页面需要哪些组件
2. **Read 对应组件的 reference 文件**，获取准确的属性名、回调签名、子组件用法、枚举值
3. 按本 Skill 的 CDN 模板格式生成 HTML（`<script type="text/babel">`、`const { Button } = StarbucksReact`、不使用 import）

**组件 API 与开发版完全一致** — 同一个 Button 的属性、事件名称不因 CDN 而改变。

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
  <!-- 1. React 根节点 -->
  <div id="root"></div>

  <!-- 2. CDN 脚本（顺序不能变） -->
  <!-- ① React -->
  <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
  <!-- ② Arco Design 基础组件库（StarbucksReact 的依赖） -->
  <script src="https://cdn.jsdelivr.net/npm/@arco-design/web-react@2.66.15/dist/arco.min.js"></script>
  <!-- ③ Arco 图标库 -->
  <script src="https://cdn.jsdelivr.net/npm/@arco-design/web-react@2.66.15/dist/arco-icon.min.js"></script>
  <!-- ④ 星巴克主题包（自动注入品牌绿主题 + 重新导出组件） -->
  <script src="https://active.starbucks.com.cn/wxmini_vanilla/bizops/starbucks-design-react/1.0.15/index.umd.js"></script>
  <!-- ⑤ Babel standalone：浏览器中把 JSX 实时转成 JS -->
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7/babel.min.js"></script>

  <!-- 3. 页面组件（type="text/babel" 表示 JSX） -->
  <script type="text/babel">
    const { useState, useEffect, useRef, useMemo, useCallback } = React;

    // ⚠️ 从 StarbucksReact 解构组件（带主题），不是 arco
    const {
      Button, Table, Form, Modal, Message, Notification,
      Input, Select, DatePicker, Layout, Menu, Card, Tabs,
      Alert, Drawer, Pagination, Steps, Space, Breadcrumb,
      Dropdown, Tag, Badge, Avatar, Tooltip, Popover, Spin,
      Skeleton, Switch, Radio, Checkbox, Upload, Rate, Slider,
      Cascader, TreeSelect, InputNumber, InputTag, ColorPicker,
      Descriptions, Statistic, List, Tree, Collapse, Timeline,
      Carousel, Image, Empty, Result, Progress, Popconfirm,
      Affix, Anchor, BackTop, ResizeBox, Watermark,
    } = StarbucksReact;

    // 图标从 window.arcoicon 解构（不是 StarbucksReact）
    const {
      IconSearch, IconPlus, IconEdit, IconDelete, IconCheck,
      IconClose, IconDownload, IconUpload, IconSettings,
      IconUser, IconHome, IconEmail,
    } = window.arcoicon;

    function App() {
      return (
        <div>
          {/* 页面内容 */}
        </div>
      );
    }

    // 渲染
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>
```

## Babel Standalone

浏览器不认识 JSX，Babel standalone 在浏览器里实时把 JSX 转成 JS。首次打开会慢 1-2 秒（编译），刷新后就快了。

**限制：**
- 不要在 `<script type="text/babel">` 里写 `import` / `export`（Babel standalone 不支持 ESM）
- 所有库都从全局变量取

## CDN 加载链

```
① React + ReactDOM CDN     → window.React, window.ReactDOM
② Arco React CDN           → window.arco               （StarbucksReact 的底层依赖）
③ Arco Icons CDN           → window.arcoicon           （图标注册到此全局对象）
④ Starbucks React UMD CDN  → window.StarbucksReact     （注入星巴克主题 + 重新导出所有组件）
⑤ Babel standalone CDN     → window.Babel              （JSX 编译）
```

④ 加载时会自动以 `<style>` 标签注入完整的星巴克品牌绿主题 CSS，无需手动编写任何 CSS 变量。

## 关键约定

- **JSX 写在 `<script type="text/babel">` 里**
- **组件从 `StarbucksReact` 解构**：`const { Button, Table } = StarbucksReact;`
- **图标从 `window.arcoicon` 解构**：`const { IconSearch, IconPlus } = window.arcoicon;`（不是 StarbucksReact）
- **子组件用点语法**：`Form.Item`、`Select.Option`、`Menu.SubMenu`、`Input.Search`、`Input.TextArea`、`Grid.Row`、`Grid.Col`
- **Form.Item 用 `field` 属性**（不是 `name`）
- **Switch 在 Form 里必须加 `triggerPropName="checked"`**
- **组件首字母大写**：`<Button>`、`<Table>`、`<Form>`
- **事件用 `on` + 驼峰**：`onClick`、`onChange`、`onPageChange`
- **React Hooks 从 `React` 解构**：`useState`、`useEffect`、`useRef` 等

## 图标

图标是 arco-icon CDN 加载后注册在 `window.arcoicon` 全局对象上的，**不是** `StarbucksReact` 的属性，也不是 `window` 的直接属性。

从 `window.arcoicon` 解构：

```jsx
const { IconSearch, IconPlus, IconEdit, IconDelete, IconCheck, IconClose } = window.arcoicon;
```

```jsx
<Button icon={<IconSearch />}>搜索</Button>
<IconCheck style={{ color: 'green', fontSize: 20 }} />
```

> ⚠️ **常见错误**：不要从 `StarbucksReact` 或 `window` 解构图标，否则得到 `undefined`，导致 React 错误 #130（组件返回 undefined）。图标只存在于 `window.arcoicon`。

## 全局提示（Message）

```jsx
const { Message } = StarbucksReact;

Message.success('操作成功');
Message.error('操作失败');
Message.warning('警告信息');
Message.info('普通信息');
```

## 弹窗（Modal）

### 组件式弹窗

```jsx
function App() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>打开弹窗</Button>
      <Modal visible={visible} title="弹窗标题"
        onOk={() => setVisible(false)} onCancel={() => setVisible(false)}>
        <p>弹窗内容</p>
      </Modal>
    </>
  );
}
```

### 函数式确认 & useModal

```jsx
const { Modal } = StarbucksReact;

// 确认弹窗
Modal.confirm({
  title: '确认删除',
  content: '删除后不可恢复，是否继续？',
  onOk: () => { /* 执行删除 */ },
});

// Hook 方式
function App() {
  const [modal, contextHolder] = Modal.useModal();
  return <>{contextHolder}<Button onClick={() => modal.confirm({ title: '确认删除' })}>删除</Button></>;
}
```

## 通知（Notification）

```jsx
const { Notification } = StarbucksReact;
Notification.success({ title: '成功', content: '数据已保存' });
Notification.error({ title: '失败', content: '请检查' });
```

## 常用页面布局

### 侧边栏 + 顶部导航（管理后台经典布局）

```jsx
function App() {
  const { Header, Sider, Content } = Layout;
  const { Item: MenuItem } = Menu;

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ background: 'var(--color-primary)', padding: '0 24px',
        display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>星巴克管理系统</span>
      </Header>
      <Layout>
        <Sider collapsible style={{ background: '#fff' }}>
          <Menu defaultSelectedKeys={['1']} style={{ height: '100%' }}>
            <MenuItem key="1"><IconHome /> 首页</MenuItem>
            <MenuItem key="2"><IconUser /> 用户管理</MenuItem>
            <MenuItem key="3"><IconSettings /> 系统设置</MenuItem>
          </Menu>
        </Sider>
        <Content style={{ padding: 24 }}>
          {/* 页面内容 */}
        </Content>
      </Layout>
    </Layout>
  );
}
```

### 搜索 + 表格（数据管理页）

```jsx
function App() {
  const [keyword, setKeyword] = useState('');
  const [selectedKeys, setSelectedKeys] = useState([]);

  const columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '角色', dataIndex: 'role' },
    { title: '操作', width: 180, render: (_, record) => (
      <Space>
        <Button type="text" onClick={() => handleEdit(record)}>编辑</Button>
        <Popconfirm title="确认删除？" onOk={() => handleDelete(record)}>
          <Button type="text" status="danger">删除</Button>
        </Popconfirm>
      </Space>
    )},
  ];

  const data = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑' },
  ];

  const handleEdit = (r) => { /* 编辑 */ };
  const handleDelete = (r) => { /* 删除 */ };

  return (
    <Space direction="vertical" style={{ width: '100%', padding: 24 }}>
      <Card>
        <Space>
          <Input value={keyword} onChange={setKeyword} placeholder="请输入关键词" style={{ width: 240 }} />
          <Button type="primary" icon={<IconSearch />}>搜索</Button>
          <Button onClick={() => setKeyword('')}>重置</Button>
        </Space>
      </Card>
      <Card title="数据列表"
        extra={<Button type="primary" icon={<IconPlus />}>新增</Button>}>
        <Table columns={columns} data={data} rowKey="id"
          rowSelection={{ type: 'checkbox', selectedRowKeys: selectedKeys, onChange: setSelectedKeys }}
          pagination={{ total: 100 }} />
        {selectedKeys.length > 0 &&
          <Button status="danger" style={{ marginTop: 16 }}>批量删除 ({selectedKeys.length})</Button>}
      </Card>
    </Space>
  );
}
```

### 表单页

```jsx
function App() {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('提交:', values);
    Message.success('保存成功');
  };

  return (
    <Card title="用户信息" style={{ maxWidth: 640, margin: 24 }}>
      <Form form={form} autoLabelWidth onSubmit={handleSubmit}>
        <Form.Item field="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item field="email" label="邮箱" rules={[{ required: true, type: 'email' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item field="role" label="角色">
          <Select placeholder="请选择">
            <Select.Option value="admin">管理员</Select.Option>
            <Select.Option value="editor">编辑</Select.Option>
            <Select.Option value="viewer">访客</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item field="active" label="状态" triggerPropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}
```

### 弹窗表单

```jsx
function App() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validate();
      console.log('保存:', values);
      Message.success('保存成功');
      setVisible(false);
      form.resetFields();
    } catch (e) { /* 校验不通过 */ }
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>新增用户</Button>
      <Modal visible={visible} title="新增用户" onOk={handleOk}
        onCancel={() => setVisible(false)}>
        <Form form={form} autoLabelWidth>
          <Form.Item field="name" label="姓名" rules={[{ required: true }]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item field="email" label="邮箱">
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
```

## 表格进阶

### 排序 & 筛选

```jsx
const columns = [
  { title: '姓名', dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend'] },
  { title: '状态', dataIndex: 'status',
    filters: [{ text: '启用', value: 'active' }, { text: '禁用', value: 'inactive' }],
    onFilter: (value, record) => record.status === value },
];
```

## 状态管理

CDN 版本没有 Redux / Zustand，用 `useState` + `useContext`：

```jsx
const AppContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  return (
    <AppContext.Provider value={{ user, setUser }}>
      <PageA />
    </AppContext.Provider>
  );
}

function PageA() {
  const { user } = React.useContext(AppContext);
  return <div>当前用户：{user?.name}</div>;
}
```

## 常用组件速查

### 数据录入

| 组件 | 用法 |
|---|---|
| Input | `<Input value={v} onChange={setV} placeholder="请输入" />` |
| Input.Password | `<Input.Password value={v} onChange={setV} />` |
| Input.Search | `<Input.Search value={v} onChange={setV} onSearch={fn} />` |
| Input.TextArea | `<Input.TextArea value={v} onChange={setV} maxLength={200} />` |
| Select | `<Select value={v} onChange={setV}><Select.Option value="a">A</Select.Option></Select>` |
| DatePicker | `<DatePicker value={v} onChange={setV} />` |
| DatePicker.RangePicker | `<DatePicker.RangePicker value={range} onChange={setRange} />` |
| Checkbox | `<Checkbox checked={v} onChange={setV}>同意</Checkbox>` |
| Checkbox.Group | `<Checkbox.Group value={vals} onChange={setVals} options={opts} />` |
| Radio.Group | `<Radio.Group value={v} onChange={setV}><Radio value="a">A</Radio></Radio.Group>` |
| Switch | `<Switch checked={v} onChange={setV} />` |
| Slider | `<Slider value={v} onChange={setV} min={0} max={100} />` |
| Rate | `<Rate value={v} onChange={setV} />` |
| Upload | `<Upload action="/api/upload" />` |
| Cascader | `<Cascader value={v} onChange={setV} options={opts} />` |
| TreeSelect | `<TreeSelect value={v} onChange={setV} treeData={data} />` |
| InputNumber | `<InputNumber value={v} onChange={setV} min={0} max={100} />` |
| InputTag | `<InputTag value={tags} onChange={setTags} />` |
| ColorPicker | `<ColorPicker value={color} onChange={setColor} />` |

### 数据展示

| 组件 | 用法 |
|---|---|
| Table | `<Table columns={cols} data={rows} />` |
| Card | `<Card title="标题">内容</Card>` |
| Tabs | `<Tabs><Tabs.TabPane key="1" title="标签1">...</Tabs.TabPane></Tabs>` |
| Tree | `<Tree treeData={data} />` |
| List | `<List data={data} render={(item) => <List.Item>{item}</List.Item>} />` |
| Descriptions | `<Descriptions data={data} />` |
| Statistic | `<Statistic title="用户数" value={1234} />` |
| Tag | `<Tag color="green">已完成</Tag>` |
| Badge | `<Badge count={5}><Button>消息</Button></Badge>` |
| Avatar | `<Avatar>U</Avatar>` |
| Tooltip | `<Tooltip content="提示"><Button>悬停</Button></Tooltip>` |
| Popover | `<Popover title="标题" content="内容"><Button>点击</Button></Popover>` |
| Carousel | `<Carousel><Carousel.Item>Slide</Carousel.Item></Carousel>` |
| Collapse | `<Collapse><Collapse.Item name="1" header="标题">内容</Collapse.Item></Collapse>` |
| Timeline | `<Timeline><Timeline.Item label="今天">事件</Timeline.Item></Timeline>` |
| Image | `<Image src="url" />` |
| Empty | `<Empty />` |

### 反馈

| 组件 | 用法 |
|---|---|
| Alert | `<Alert type="success" content="操作成功" />` |
| Drawer | `<Drawer visible={v} onCancel={() => setV(false)} title="抽屉">内容</Drawer>` |
| Popconfirm | `<Popconfirm title="确认？" onOk={fn}><Button>删除</Button></Popconfirm>` |
| Progress | `<Progress percent={60} />` |
| Result | `<Result status="success" title="提交成功" />` |
| Skeleton | `<Skeleton loading={loading}><div>内容</div></Skeleton>` |
| Spin | `<Spin loading={loading}><div>内容</div></Spin>` |

### 导航 & 布局

| 组件 | 用法 |
|---|---|
| Layout | `<Layout>` + `<Layout.Header>` + `<Layout.Sider>` + `<Layout.Content>` |
| Menu | `<Menu><Menu.Item key="1">菜单</Menu.Item></Menu>` |
| Breadcrumb | `<Breadcrumb><Breadcrumb.Item>首页</Breadcrumb.Item></Breadcrumb>` |
| Pagination | `<Pagination total={100} onChange={fn} />` |
| Steps | `<Steps current={1}><Steps.Step title="步骤1" /></Steps>` |
| Dropdown | `<Dropdown droplist={<Menu><Menu.Item key="1">选项</Menu.Item></Menu>}><Button>操作</Button></Dropdown>` |
| Space | `<Space><Button>A</Button><Button>B</Button></Space>` |
| Grid | `<Grid.Row gutter={16}><Grid.Col span={12}>一半</Grid.Col></Grid.Row>` |

### 其他

| 组件 | 用法 |
|---|---|
| Affix | `<Affix offsetTop={80}><Button>固定顶部</Button></Affix>` |
| Anchor | `<Anchor items={items} />` |
| BackTop | `<BackTop />` |
| Watermark | `<Watermark content="星巴克">内容</Watermark>` |
| ResizeBox | `<ResizeBox>内容</ResizeBox>` |

## 与开发者版 Skill 的关系

本 skill 是 [starbucks-design-react](../starbucks-design-react/SKILL.md) 的零环境版本：

| | 开发者版 | 本 Skill（CDN） |
|---|---|---|
| **安装** | `npm install @sbux/starbucks-design-react` | 无需安装 |
| **编译** | Vite / webpack | 无需编译（Babel 浏览器内转 JSX） |
| **预览** | `npm run dev` | 双击 HTML 文件 |
| **组件 API** | 完全一致 | 完全一致（从 `StarbucksReact` 解构） |
| **主题** | `@sbux/starbucks-design-react` npm 包 | `@sbux/starbucks-design-react` UMD CDN |
| **代码格式** | `.tsx` 文件 | HTML 内 `<script type="text/babel">` |
| **TypeScript** | ✅ | ❌ |
| **import 语法** | ✅ | ❌（全局变量替代） |

## 使用方式

1. 告诉 Claude 你想搭什么样的页面
2. Claude 生成 `.html` 文件
3. 保存到桌面，**双击用浏览器打开**
4. 所见即所得

不需要安装任何软件（除了浏览器）。
