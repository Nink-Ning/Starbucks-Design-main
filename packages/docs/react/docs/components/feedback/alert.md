---
sidebar_position: 1
---

# 警告提示 Alert

向用户显示警告的信息时，通过警告提示，展现需要关注的信息。

## 基本用法

警告提示，展现需要关注的信息，适用于简短的警告提示。

```jsx live
function Demo() {
  return <Alert content="Here is an example text" />
}
```

## 不同类型

警告提示的类型有 `info`, `success`, `warning`, `error` 四种。

```jsx live
function Demo() {
  return (
    <div>
      <Grid.Row gutter={40}>
        <Grid.Col span={12}>
          <Alert style={{ marginBottom: 20 }} type="info" content="Here is an info text" />
          <Alert type="warning" content="Here is a warning text" />
        </Grid.Col>
        <Grid.Col span={12}>
          <Alert style={{ marginBottom: 20 }} type="success" content="Here is a success text" />
          <Alert type="error" content="Here is an error text" />
        </Grid.Col>
      </Grid.Row>
    </div>
  )
}
```

## 可关闭

指定 `closable = true`，可开启关闭按钮。

```jsx live
function Demo() {
  return (
    <div>
      <Grid.Row gutter={40}>
        <Grid.Col span={12}>
          <Alert closable style={{ marginBottom: 20 }} type="info" content="Here is an info text" />
          <Alert
            closable
            style={{ marginBottom: 20 }}
            type="warning"
            title="Warning"
            content="Here is a warning text"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Alert closable style={{ marginBottom: 20 }} type="success" content="Here is a success text" />
          <Alert closable style={{ marginBottom: 20 }} type="error" title="Error" content="Here is an error text" />
        </Grid.Col>
      </Grid.Row>
    </div>
  )
}
```

## 自定义关闭元素

指定 `closeElement`，自定义关闭元素。`closeElement` 可以接收 `onClick`，并且自带 `close` 参数，调用 `close()` 可以关闭。

```jsx live
function Demo() {
  return (
    <Grid.Row gutter={40}>
      <Grid.Col span={12}>
        <Alert
          closable
          style={{ marginBottom: 20 }}
          type="success"
          content="Here is a success text"
          closeElement={<IconCheck />}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Alert
          closable
          style={{ marginBottom: 20 }}
          type="success"
          content="Here is a success text"
          closeElement="Close"
        />
      </Grid.Col>
    </Grid.Row>
  )
}
```

## 含有标题

通过设置 `title` 可以给添加标题，将 `content` 变为辅助性介绍文字。

```jsx live
function Demo() {
  return (
    <div>
      <Grid.Row gutter={40}>
        <Grid.Col span={12}>
          <Alert style={{ marginBottom: 20 }} type="info" title="Info" content="Here is an info text" />
          <Alert type="warning" title="Warning" content="Here is a warning text" />
        </Grid.Col>
        <Grid.Col span={12}>
          <Alert style={{ marginBottom: 20 }} type="success" title="Success" content="Here is a success text" />
          <Alert type="error" title="Error" content="Here is an error text" />
        </Grid.Col>
      </Grid.Row>
    </div>
  )
}
```

## 不含图标

通过指定 `showIcon=false` 来不显示图标。

```jsx live
function Demo() {
  return (
    <Grid.Row gutter={40}>
      <Grid.Col span={12}>
        <Alert style={{ marginBottom: 20 }} showIcon={false} type="info" content="Here is an info text" />
        <Alert
          style={{ marginBottom: 20 }}
          showIcon={false}
          type="warning"
          title="Warning"
          content="Here is a warning text"
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Alert style={{ marginBottom: 20 }} showIcon={false} type="success" content="Here is a success text" />
        <Alert
          style={{ marginBottom: 20, color: 'var(--color-danger)' }}
          showIcon={false}
          type="error"
          title="Error"
          content="Here is an error text"
        />
      </Grid.Col>
    </Grid.Row>
  )
}
```

## 顶部公告

设置 `banner = true`，可以当作顶部公告使用。

```jsx live
function Demo() {
  return (
    <div>
      <Alert banner type="info" showIcon content="General text" style={{ marginTop: 4, marginBottom: 20 }} />
      <Alert banner type="info" showIcon closable content="General text" style={{ marginBottom: 20 }} />
      <Alert
        banner
        type="info"
        showIcon
        title="General text"
        content="Here is an example text"
        style={{ marginBottom: 20 }}
      />
      <Alert banner type="success" showIcon title="Success text" style={{ marginBottom: 20 }} />
    </div>
  )
}
```

## 操作项

通过 `action` 可以自定义右上角操作项。

```jsx live
function Demo() {
  return (
    <div>
      <Alert
        content="Here is an example text"
        action={
          <Button size="mini" type="primary">
            Detail
          </Button>
        }
        closable
      />
      <Alert
        title="Example"
        content="Here is an example text"
        action={
          <Button size="mini" type="primary">
            Detail
          </Button>
        }
        closable
        style={{ marginTop: 10 }}
      />
      <Alert
        title="Example"
        content="Here is an example text"
        action={
          <Space direction="vertical">
            <Button size="mini" type="primary">
              Detail
            </Button>
            <Button size="mini" type="primary" status="danger">
              Close
            </Button>
          </Space>
        }
        style={{ marginTop: 10 }}
      />
    </div>
  )
}
```

## API

### Alert

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| banner | 是否用作顶部公告 | boolean | `-` |
| closable | 是否可关闭 | boolean | `-` |
| showIcon | 是否显示图标 | boolean | `true` |
| type | 警告的类型 | 'info' \| 'success' \| 'warning' \| 'error' | `info` |
| action | 自定义操作项 | ReactNode | `-` |
| closeElement | 自定义关闭按钮 | ReactNode | `-` |
| content | 内容 | ReactNode | `-` |
| icon | 可以指定自定义图标，`showIcon` 为 `true` 时生效。 | ReactNode | `-` |
| title | 标题 | ReactNode | `-` |
| className | 节点类名 | string \| string[] | `-` |
| style | 节点样式 | CSSProperties | `-` |
| afterClose | 关闭动画结束后执行的回调 | () => void | `-` |
| onClose | 关闭的回调 | (e) => void | `-` |
