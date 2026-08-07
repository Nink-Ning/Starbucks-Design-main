# React Preview 组件目录

本目录只收录 Starter V1 计划使用的 React 基础组件。属性、事件和子组件写法已根据以下内部 reference 查证：

```text
skills/starbucks-design-react/references/components/
```

本文件不是完整 API 文档。使用未列出的属性前，必须回到对应内部 reference 查证，不得猜测。

## 列表页

| 组件 | V1 已查证用法 |
| --- | --- |
| `Button` | `type`、`status`、`size`、`disabled`、`loading`、`htmlType`、`onClick`、`icon` |
| `Input` | `value`、`defaultValue`、`placeholder`、`allowClear`、`disabled`、`status`、`prefix`、`maxLength`、`onChange`、`onPressEnter` |
| `Input.Search` | `placeholder`、`loading`、`onSearch` |
| `Select` | `value`、`options`、`aria-label`、`onChange` |
| `Table` | `columns`、`data`、`rowKey`、`loading`、`noDataElement`、`pagination`、`scroll` |
| `Table` 列 | `title`、`dataIndex`、`key`、`width`、`fixed`、`ellipsis`、`render` |
| `Pagination` | `total`、`current`、`defaultCurrent`、`pageSize`、`showTotal`、`showJumper`、`onChange` |
| `Tag` | `color`、`size`、`closable`、`onClose` |
| `Empty` | `icon`、`description`、`imgSrc` |
| `Result` | `status`、`title`、`subTitle`、`icon`、`extra` |
| `Tooltip` | `content`、`mini`；包裹图标或操作按钮 |
| `Message` | `success`、`info`、`warning`、`error`、`loading` |

V1 列表页不默认使用 `rowSelection`、跨页选择、复杂批量操作、服务端分页或高级列筛选。

## 表单页

| 组件 | V1 已查证用法 |
| --- | --- |
| `Form` | `form`、`layout`、`initialValues`、`autoComplete`、`requiredSymbol`、`scrollToFirstError`、`disabled`、`onValuesChange`、`onSubmit`、`onSubmitFailed` |
| `Form.Item` | `field`、`label`、`rules`、`required`、`disabled`、`triggerPropName`、`extra` |
| `Form.useForm` | `validate`、`resetFields`、`getFieldsValue`、`setFieldsValue` |
| `Input.TextArea` | `value`、`placeholder`、`maxLength`、`showWordLimit`、`autoSize`、`style`、`wrapperStyle` |
| `Select` | `value`、`defaultValue`、`options`、`placeholder`、`allowClear`、`showSearch`、`loading`、`disabled`、`onChange` |
| `DatePicker` | `value`、`defaultValue`、`placeholder`、`allowClear`、`disabled`、`status`、`format`、`style`、`onChange` |
| `Radio.Group` | `value`、`defaultValue`、`type`、`direction`、`options`、`onChange` |
| `Checkbox` | `checked`、`defaultChecked`、`disabled`、`indeterminate`、`value`、`onChange` |
| `Checkbox.Group` | `value`、`defaultValue`、`options`、`direction`、`onChange` |
| `Switch` | `checked`、`defaultChecked`、`type`、`loading`、`disabled`、`checkedText`、`uncheckedText`、`onChange` |
| `Message` | `success`、`info`、`warning`、`error`、`loading` |

在 `Form.Item` 中使用 `Switch` 时必须设置 `triggerPropName="checked"`。表单提交优先使用 `htmlType="submit"` 或已查证的 `Form` 提交方式，不自行复制表单状态管理。

## 表单 Pro Layout

Basic Form Golden Example 实际使用 Starter Runtime 中精选的 Pro Form Layout：

| Pro 组件 | 已确认 API | Basic Form 用法 |
| --- | --- | --- |
| `FormPageLayout` | `children` | 包裹表单页面内容 |
| `FormGrid` | `children` | 组织表单网格 |
| `FormGridItem` | `span`、`className`、`children` | 基础字段占位和全宽备注/操作行 |
| `FormControlArea` | `children` | 包裹 Radio、Checkbox、Switch 控件区域 |
| `FormActions` | `children` | 包裹重置和保存按钮 |

上述 API 已根据当前 React Pro Form Layout reference 和 Starter Runtime 实际构建入口查证。

## 详情页

| 组件 | V1 已查证用法 |
| --- | --- |
| `Descriptions` | `data`、`title`、`column`、`layout`、`size`、`border`、`labelStyle`、`valueStyle` |
| `Dropdown` | `droplist`、`position`、`trigger`、`disabled`、`onVisibleChange` |
| `Menu` | `defaultSelectedKeys`、`onClickMenuItem`；`Menu.Item` 使用 `key`、`disabled` |
| `Button` | 复用列表页已查证用法 |
| `Message` | 复用表单页已查证用法 |
| `Select` | `value`、`options`、`aria-label`、`style`、`onChange`；仅用于 Demo 状态控制 |
| `Empty` | `description`；Empty 状态 |
| `Result` | `status`、`title`、`subTitle`、`extra`；Error 状态 |
| `Skeleton` | `loading`、`animation`、`text`；Loading 状态 |
| `Tooltip` | `content`、`mini`；标题后的页面说明 |

Basic Detail 使用 Starter Runtime 中精选的 React Pro Detail Layout。HTML 中从 `StarbucksReact` 获取，不从完整 Pro 包或 `arco` 对象获取：

```js
const {
  DetailPageLayout,
  DetailSection,
  DetailDescriptions,
} = StarbucksReact;
```

| Pro 组件 | 已确认 API | Basic Detail 用法 |
| --- | --- | --- |
| `DetailPageLayout` | `maxWidth`、`gap`、`className`、`style`、`children` | `maxWidth={1120}` 包裹单一详情内容 |
| `DetailSection` | `title`、`description`、`actions`、`divider`、`id`、`className`、`style`、`children` | 只传 `children`，不显示额外区块标题 |
| `DetailDescriptions` | `data`、`column`、`emptyValue`、`className`、`style`；其余已查证的 Descriptions 属性透传 | `data={couponBasicInfo}`、`emptyValue="—"` |

Detail Layout 的实际样式来源是 `packages/starbucks-design-react/src/pro/detail-layout/style.less`。`DetailDescriptions` 在未提供 `column` 时按自身容器宽度自动使用 1/2/3 列：不大于 720px 为 1 列，不大于 1200px 为 2 列，否则为 3 列。`emptyValue` 会将空字符串、`null`、`undefined` 和 `--` 替换为传入占位值。

Basic Detail Golden Example 的状态控制使用 `Select`，它属于 Demo 控制区，不属于正式详情业务结构。Loading、Empty 和 Error 分别使用 `Skeleton`、`Empty` 和 `Result` 的已查证用法。

本 Starter 仅选择性导出 Basic Form 和 Basic Detail 实际用到的 Pro 能力，不导出完整 `pro` 包。Basic Detail 不默认使用 `Card`、`Tag`、`Table`、`Timeline`、`Tabs` 或 `Pagination`。

## API 使用纪律

- 组件从 `StarbucksReact` 解构。
- 图标从 `window.arcoicon` 解构。
- React Hooks 从全局 `React` 解构。
- 当前三个 Golden Example 实际使用的图标包括 `IconInfoCircle`、`IconPlus`、`IconRefresh` 和 `IconSearch`；仍必须从 `window.arcoicon` 解构。
- 不从 `arco` 对象直接取组件，以免绕过 Starbucks 主题包。
- 不因为某个 API 看起来符合直觉就自行添加；先查 reference。
