// component-list.ts
// Figma component page nodeId → Arco component name
// Source: Figma Design System V2.0 page structure
// Generated: 2026-07-03

export interface ComponentEntry {
  /** Figma page node ID */
  nodeId: string;
  /** Arco Design component name (PascalCase) */
  name: string;
  /** Figma page display name (for logs) */
  figmaName: string;
}

export const COMPONENT_LIST: ComponentEntry[] = [
  // ── 通用 (General) ──
  { nodeId: '426:82935', name: 'Button', figmaName: '✅ ❖ Button 按钮' },
  { nodeId: '540:118078', name: 'ButtonGroup', figmaName: '✅ ❖ Button Group 按钮组' },
  { nodeId: '426:93169', name: 'Link', figmaName: '✅ ❖ Link 链接' },

  // ── 导航 (Navigation) ──
  { nodeId: '426:72761', name: 'Tabs', figmaName: '✅ ❖ Tabs 选项卡' },
  { nodeId: '426:92329', name: 'Steps', figmaName: '✅ ❖ Steps 步骤条' },
  { nodeId: '426:92328', name: 'Breadcrumb', figmaName: '✅ ❖ Breadcrumb 面包屑' },
  { nodeId: '426:92326', name: 'Pagination', figmaName: '✅ ❖ Pagination 分页' },
  { nodeId: '1092:30451', name: 'Anchor', figmaName: '✅ ❖ Anchor 锚点' },
  { nodeId: '1016:20839', name: 'Dropdown', figmaName: '✅ ❖ 下拉菜单' },

  // ── 数据输入 (Data Input) ──
  { nodeId: '426:92318', name: 'Radio', figmaName: '✅ ❖ Radio 单选框' },
  { nodeId: '426:92312', name: 'Checkbox', figmaName: '✅ ❖ Checkbox 多选框' },
  { nodeId: '426:92313', name: 'Switch', figmaName: '✅ ❖ Switch 开关' },
  { nodeId: '426:92322', name: 'Input', figmaName: '✅ ❖ Input 输入框' },
  { nodeId: '426:92319', name: 'InputNumber', figmaName: '✅ ❖ InputNumber 数字输入框' },
  { nodeId: '426:92315', name: 'Select', figmaName: '✅ ❖ Select 选择器' },
  { nodeId: '426:92323', name: 'Cascader', figmaName: '✅ ❖ Cascader 级联选择器' },
  { nodeId: '426:92320', name: 'DatePicker', figmaName: '✅ ❖ DatePicker 日期选择器' },
  { nodeId: '707:39514', name: 'TimePicker', figmaName: '✅ ❖ TimePicker 时间选择器' },
  { nodeId: '426:92317', name: 'InputSearch', figmaName: '✅ ❖ Search 搜索' },
  { nodeId: '426:92324', name: 'Upload', figmaName: '✅ ❖ Upload 上传' },

  // ── 数据展示 (Data Display) ──
  { nodeId: '426:92344', name: 'Badge', figmaName: '✅ ❖ Badge 徽标' },
  { nodeId: '426:92342', name: 'List', figmaName: '✅ ❖ List 列表' },
  { nodeId: '426:92343', name: 'Collapse', figmaName: '✅ ❖ Collapse 折叠面板' },
  { nodeId: '426:92336', name: 'Tree', figmaName: '✅ ❖ Tree 树结构' },
  { nodeId: '426:92337', name: 'Timeline', figmaName: '✅ ❖ Timeline 时间轴' },
  { nodeId: '426:92335', name: 'Tooltip', figmaName: '✅ ❖ Tooltip 文字提示' },
  { nodeId: '930:76925', name: 'Tag', figmaName: '✅ ❖ Tag 标签' },
  { nodeId: '426:92341', name: 'Empty', figmaName: '✅ ❖ Empty 空状态' },
  { nodeId: '426:92339', name: 'Progress', figmaName: '✅ ❖ Progress 进度条' },
  { nodeId: '426:92340', name: 'Spin', figmaName: '✅ ❖ Loading 加载中' },
  { nodeId: '426:92325', name: 'Table', figmaName: '✅ ❖ Table 表格' },
  { nodeId: '1757:26075', name: 'Descriptions', figmaName: '✅ ❖ Descriptions 描述' },

  // ── 数据反馈 (Feedback) ──
  { nodeId: '426:92332', name: 'Message', figmaName: '✅ ❖ Message 全局提示' },
  { nodeId: '426:92333', name: 'Notification', figmaName: '✅ ❖ Notification 消息通知' },
  { nodeId: '426:92327', name: 'Alert', figmaName: '✅ ❖ Alert 警告' },
  { nodeId: '426:92334', name: 'Popconfirm', figmaName: '✅ ❖ Popconfirm 气泡确认框' },
  { nodeId: '426:92330', name: 'Modal', figmaName: '✅ ❖ Dialog 对话框' },
  { nodeId: '426:92331', name: 'Drawer', figmaName: '✅ ❖ Drawer 抽屉' },

  // ── 业务模块 (Business) ──
  { nodeId: '1414:53103', name: 'FilterBar', figmaName: '✅ ❖ 筛选栏' },
  { nodeId: '1010:10763', name: 'ToolBar', figmaName: '✅ ❖ 工具栏' },
  { nodeId: '1010:10765', name: 'AdvancedFilter', figmaName: '✅ ❖ 高级筛选' },
  { nodeId: '1398:44635', name: 'TagGroup', figmaName: '✅ ❖ 标签与分组管理' },
  { nodeId: '1581:14426', name: 'SelectCard', figmaName: '✅ ❖ 多选卡片' },
];
