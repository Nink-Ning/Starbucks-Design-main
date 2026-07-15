---
sidebar_position: 1
---

# 结果 Result

用于反馈一系列操作任务的处理结果，当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

## Success

展示成功状态。

```jsx live
function Demo() {
  return (
    <div>
      <Result
        status="success"
        title="Success message"
        subTitle="This is a success description."
        extra={[
          <Button key="again" type="secondary" style={{ margin: '0 16px' }}>
            Again
          </Button>,
          <Button key="back" type="primary">
            Back
          </Button>
        ]}
      ></Result>
    </div>
  )
}
```

展示处理结果

```jsx live
function Demo() {
  return (
    <div>
      <Result title="Your operation has been performed." extra={<Button type="primary">Back</Button>}></Result>
    </div>
  )
}
```

警告状态。

```jsx live
function Demo() {
  return (
    <div>
      <Result
        status="warning"
        title="There is a problem with your operation."
        extra={<Button type="primary">Back</Button>}
      ></Result>
    </div>
  )
}
```

## Error

错误状态。

```jsx live
function Demo() {
  return (
    <div>
      <Result
        status="error"
        title="Error message"
        subTitle="Something went wrong. Please try again. "
        extra={[
          <Button key="again" style={{ margin: '0 16px' }}>
            Again
          </Button>,
          <Button key="back" type="primary">
            Back
          </Button>
        ]}
      ></Result>
    </div>
  )
}
```

没有当前页面的访问权限。

```jsx live
function Demo() {
  return (
    <div>
      <Result
        status="403"
        subTitle="Access to this resource on the server is denied."
        extra={<Button type="primary">Back</Button>}
      ></Result>
    </div>
  )
}
```

页面未找到

```jsx live
function Demo() {
  return (
    <div>
      <Result
        status="404"
        subTitle="Whoops, that page is gone. "
        extra={[
          <Button key="again" style={{ margin: '0 16px' }}>
            Again
          </Button>,
          <Button key="back" type="primary">
            Back
          </Button>
        ]}
      ></Result>
    </div>
  )
}
```

通常表示服务器错误

```jsx live
function Demo() {
  return (
    <div>
      <Result status="500" subTitle="This page isn’t working." extra={<Button type="primary">Back</Button>}></Result>
    </div>
  )
}
```

## 自定义icon

通过`Icon`属性自定义图标

```jsx live
function Demo() {
  return (
    <div>
      <Result
        status={null}
        icon={<IconFaceSmileFill style={{ color: 'rgb(var(--arcoblue-6))' }} />}
        title="Your operation has been performed."
        extra={<Button type="primary">Back</Button>}
      ></Result>
    </div>
  )
}
```

## 完整功能

体现全部功能。

```jsx live
function Demo() {
  return (
    <div>
      <Result
        status="error"
        icon={<IconFaceFrownFill />}
        title="No internet"
        subTitle="DNS_PROBE_FINISHED_NO_INTERNET"
        extra={<Button type="primary">Refresh</Button>}
      >
        <Typography className="result-content" style={{ background: 'var(--color-fill-2)', padding: 24 }}>
          <Typography.Paragraph>Try:</Typography.Paragraph>
          <ul>
            <li> Checking the network cables, modem, and router </li>
            <li> Reconnecting to Wi-Fi </li>
          </ul>
        </Typography>
      </Result>
    </div>
  )
}
```

## API

### Result

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 不同状态，传入 null 时，需要通过 `icon` 属性设置图标，并且默认没有背景色以及图标颜色 | 'success' \| 'error' \| 'info' \| 'warning' \| '404' \| '403' \| '500' \| null | `info` |
| extra | 额外内容 | ReactNode | `-` |
| icon | 自定义图标 | ReactNode | `-` |
| subTitle | 子标题文字 | ReactNode | `-` |
| title | 标题文字 | ReactNode | `-` |
| className | 节点类名 | string \| string[] | `-` |
| style | 节点样式 | CSSProperties | `-` |
