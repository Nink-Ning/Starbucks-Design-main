---
sidebar_position: 1
---

# 日历 Calendar

日历组件。

## 基本用法

日历的基本用法。

```jsx live
function Demo() {
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <Calendar defaultValue="2020-04-01" />
    </div>
  )
}
```

## 下拉选择的头部

除了默认的头部切换外，也支持下拉选择的头部，更快速的定位。

```jsx live
function Demo() {
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <Calendar defaultValue="2020-04-01" headerType="select" />
    </div>
  )
}
```

```jsx live
function Demo() {
  const badgeStyle = {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <Calendar
        defaultValue="2020-03-04"
        dateInnerContent={(currentDate) => {
          switch (currentDate.format('YYYY-MM-DD')) {
            case '2020-03-07':
              return (
                <div
                  style={{
                    padding: '0 10px'
                  }}
                >
                  <Badge style={badgeStyle} status="processing" text="Cooking" />
                  <br />
                  <Badge style={badgeStyle} status="success" text="Reading" />
                  <br />
                  <Badge style={badgeStyle} status="warning" text="Sleeping" />
                </div>
              )

            case '2020-03-17':
              return (
                <div style={{ padding: '0 10px' }}>
                  <Badge style={badgeStyle} status="default" text="Coding" />
                  <br />
                  <Badge style={badgeStyle} status="processing" text="Runing" />
                  <br />
                  <Badge style={badgeStyle} status="success" text="Eating" />
                  <br />
                  <Badge style={badgeStyle} status="warning" text="Play games" />
                  <br />
                  <Badge style={badgeStyle} status="error" text="Sleeping" />
                </div>
              )

            default:
              return
          }
        }}
      />
    </div>
  )
}
```

## 卡片日历

设置 `panel=true`，可以使用卡片日历。

```jsx live
function Demo() {
  return (
    <Space align="start">
      <Calendar
        panel
        defaultValue="2020-04-01"
        panelTodayBtn
        style={{ marginRight: 50 }}
        onChange={(a) => console.log(a)}
      />
      <Calendar panel defaultValue="2020-03" mode="year" />
    </Space>
  )
}
```

## API

### Calendar

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowSelect | 是否允许选中和切换日期，`panel` 模式下默认可选中切换 | boolean | `-` |
| isWeek | 周选择 | boolean | `-` |
| panel | 是否放在容器中进行展示。 | boolean | `-` |
| panelTodayBtn | 是否显示跳转到今天的按钮 | boolean | `-` |
| defaultMode | 选择日期的月日历和选择月份的年日历。 | 'day' \| 'week' \| 'month' \| 'year' | `month` |
| headerType | 有两种头部可供选择，默认的按钮类型和下拉框类型，只在全屏日历模式下生效。 | 'button' \| 'select' | `button` |
| mode | 选择日期的月日历和选择月份的年日历，受控模式。 | 'day' \| 'week' \| 'month' \| 'year' | `-` |
| panelOperations | 卡片模式下配置操作按钮 | Array&lt;'left' \| 'double-left' \| 'right' \| 'double-right'> | `-` |
| className | 节点类名 | string \| string[] | `-` |
| dayStartOfWeek | 每周的第一天开始于周几，0 - 周日，1 - 周一。 | 0 \| 1 | `0` |
| locale | 国际化配置 | Record&lt;string, any&gt; | `-` |
| panelWidth | 卡片模式的宽度 | number \| string | `265` |
| style | 节点样式 | CSSProperties | `-` |
| dateInnerContent | 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。 | (currentDate: Dayjs) => ReactNode | `-` |
| dateRender | 定制日期显示，会完全覆盖日期单元格。 | (currentDate: Dayjs) => ReactNode | `-` |
| disabledDate | 不可选取的时间 | (current: Dayjs) => boolean | `-` |
| headerRender | 自定义头部渲染。 | (props: &#123;value?: Dayjs;pageShowDate?: Dayjs;mode?: string;onChange;onChangePageDate;onChangeMode;}) => ReactNode | `-` |
| monthRender | 定制月份显示，会完全覆盖月份单元格。 | (currentDate: Dayjs) => ReactNode | `-` |
| onChange | 日期变化触发的回调。 | (date: Dayjs) => void | `-` |
| onPanelChange | 面板日期发生改变触发的回调。 | (date: Dayjs) => void | `-` |
