import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

const sidebarComponents = [
  {
    text: '通用',
    items: [
      { text: 'Button 按钮', link: '/components/general/button' },
      { text: 'Link 链接', link: '/components/general/link' },
      { text: 'Typography 排版', link: '/components/general/typography' },
      { text: 'ConfigProvider 全局配置', link: '/components/general/config-provider' },
    ],
  },
  {
    text: '布局',
    items: [
      { text: 'Divider 分割线', link: '/components/layout/divider' },
      { text: 'Grid 栅格', link: '/components/layout/grid' },
      { text: 'Layout 布局', link: '/components/layout/layout' },
      { text: 'Space 间距', link: '/components/layout/space' },
    ],
  },
  {
    text: '数据展示',
    items: [
      { text: 'Avatar 头像', link: '/components/data-display/avatar' },
      { text: 'Badge 徽标', link: '/components/data-display/badge' },
      { text: 'Calendar 日历', link: '/components/data-display/calendar' },
      { text: 'Card 卡片', link: '/components/data-display/card' },
      { text: 'Carousel 走马灯', link: '/components/data-display/carousel' },
      { text: 'Collapse 折叠面板', link: '/components/data-display/collapse' },
      { text: 'Comment 评论', link: '/components/data-display/comment' },
      { text: 'Descriptions 描述列表', link: '/components/data-display/descriptions' },
      { text: 'Empty 空状态', link: '/components/data-display/empty' },
      { text: 'Image 图片', link: '/components/data-display/image' },
      { text: 'List 列表', link: '/components/data-display/list' },
      { text: 'Popover 气泡卡片', link: '/components/data-display/popover' },
      { text: 'Statistic 统计', link: '/components/data-display/statistic' },
      { text: 'Table 表格', link: '/components/data-display/table' },
      { text: 'Tabs 标签页', link: '/components/data-display/tabs' },
      { text: 'Tag 标签', link: '/components/data-display/tag' },
      { text: 'Timeline 时间轴', link: '/components/data-display/timeline' },
      { text: 'Tooltip 文字提示', link: '/components/data-display/tooltip' },
      { text: 'Tree 树', link: '/components/data-display/tree' },
    ],
  },
  {
    text: '数据录入',
    items: [
      { text: 'AutoComplete 自动补全', link: '/components/data-entry/auto-complete' },
      { text: 'Cascader 级联选择', link: '/components/data-entry/cascader' },
      { text: 'Checkbox 复选框', link: '/components/data-entry/checkbox' },
      { text: 'ColorPicker 颜色选择器', link: '/components/data-entry/color-picker' },
      { text: 'DatePicker 日期选择器', link: '/components/data-entry/date-picker' },
      { text: 'Form 表单', link: '/components/data-entry/form' },
      { text: 'Input 输入框', link: '/components/data-entry/input' },
      { text: 'InputNumber 数字输入框', link: '/components/data-entry/input-number' },
      { text: 'InputTag 标签输入框', link: '/components/data-entry/input-tag' },
      { text: 'Mention 提及', link: '/components/data-entry/mention' },
      { text: 'Radio 单选框', link: '/components/data-entry/radio' },
      { text: 'Rate 评分', link: '/components/data-entry/rate' },
      { text: 'Select 选择器', link: '/components/data-entry/select' },
      { text: 'Slider 滑动输入条', link: '/components/data-entry/slider' },
      { text: 'Switch 开关', link: '/components/data-entry/switch' },
      { text: 'Textarea 文本域', link: '/components/data-entry/textarea' },
      { text: 'TimePicker 时间选择器', link: '/components/data-entry/time-picker' },
      { text: 'Transfer 数据穿梭框', link: '/components/data-entry/transfer' },
      { text: 'TreeSelect 树选择', link: '/components/data-entry/tree-select' },
      { text: 'Upload 上传', link: '/components/data-entry/upload' },
      { text: 'VerificationCode 验证码', link: '/components/data-entry/verification-code' },
    ],
  },
  {
    text: '反馈',
    items: [
      { text: 'Alert 警告', link: '/components/feedback/alert' },
      { text: 'Drawer 抽屉', link: '/components/feedback/drawer' },
      { text: 'Message 全局提示', link: '/components/feedback/message' },
      { text: 'Modal 对话框', link: '/components/feedback/modal' },
      { text: 'Notification 通知', link: '/components/feedback/notification' },
      { text: 'Popconfirm 气泡确认框', link: '/components/feedback/popconfirm' },
      { text: 'Progress 进度条', link: '/components/feedback/progress' },
      { text: 'Result 结果页', link: '/components/feedback/result' },
      { text: 'Skeleton 骨架屏', link: '/components/feedback/skeleton' },
      { text: 'Spin 加载中', link: '/components/feedback/spin' },
    ],
  },
  {
    text: '导航',
    items: [
      { text: 'Breadcrumb 面包屑', link: '/components/navigation/breadcrumb' },
      { text: 'Dropdown 下拉菜单', link: '/components/navigation/dropdown' },
      { text: 'Menu 菜单', link: '/components/navigation/menu' },
      { text: 'PageHeader 页头', link: '/components/navigation/page-header' },
      { text: 'Pagination 分页', link: '/components/navigation/pagination' },
      { text: 'Steps 步骤条', link: '/components/navigation/steps' },
    ],
  },
  {
    text: '其他',
    items: [
      { text: 'Affix 固钉', link: '/components/other/affix' },
      { text: 'Anchor 锚点', link: '/components/other/anchor' },
      { text: 'BackTop 回到顶部', link: '/components/other/back-top' },
      { text: 'OverflowList 溢出列表', link: '/components/other/overflow-list' },
      { text: 'ResizeBox 伸缩框', link: '/components/other/resize-box' },
      { text: 'Scrollbar 滚动条', link: '/components/other/scrollbar' },
      { text: 'Split 分割', link: '/components/other/split' },
      { text: 'Trigger 触发器', link: '/components/other/trigger' },
      { text: 'Watermark 水印', link: '/components/other/watermark' },
    ],
  },
]

export default defineConfig({
  title: 'Starbucks UI — Vue',
  description: 'Starbucks UI Vue 组件库文档',
  base: '/china/bopfui-starbucks-ui/vue/',
  ignoreDeadLinks: true,

  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },

  themeConfig: {
    nav: [
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '组件', link: '/components/general/button' },
      { text: '下载 Skills', link: '/china/bopfui-starbucks-ui/vue/skills/starbucks-design-vue.zip', target: '_top' },
        { text: '下载预览 Skills', link: '/china/bopfui-starbucks-ui/vue/skills/starbucks-design-vue-preview.zip', target: '_top' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '快速开始',
          items: [{ text: '安装', link: '/guide/getting-started' }],
        },
      ],
      '/components/': sidebarComponents,
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' },
    ],

    footer: {
      copyright: 'Copyright © 2026 Starbucks',
    },
  },
})
