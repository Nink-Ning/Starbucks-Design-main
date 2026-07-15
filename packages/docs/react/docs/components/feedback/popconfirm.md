---
sidebar_position: 1
---

# 气泡确认框 Popconfirm

点击元素，弹出气泡式的确认框。

## 基础用法

最基础的用法。

```jsx live
function Demo() {
  return (
    <div>
      <Popconfirm
        focusLock
        title="Confirm"
        content="Are you sure you want to delete?"
        onOk={() => {
          Message.info({
            content: 'ok'
          })
        }}
        onCancel={() => {
          Message.error({
            content: 'cancel'
          })
        }}
      >
        <Button>Delete</Button>
      </Popconfirm>
    </div>
  )
}
```

## 国际化

自定义按钮文字。

```jsx live
function Demo() {
  return (
    <div>
      <Popconfirm
        focusLock
        title="Do you want to discard the draft?"
        okText="Discard"
        cancelText="Cancel"
        onOk={() => {
          Message.info({
            content: 'ok'
          })
        }}
        onCancel={() => {
          Message.error({
            content: 'cancel'
          })
        }}
      >
        <Button>Discard</Button>
      </Popconfirm>
    </div>
  )
}
```

## 位置

气泡确认框支持 12 个不同的方位。分别为：`上左`、 `上`、 `上右`、`下左`、 `下`、 `下右`、 `左上`、 `左`、 `左下`、 `右上`、 `右`、 `右下`。

```jsx live
function Demo() {
  const props = {
    title: 'Are you sure you want to delete? ',
    onOk: () => {
      Message.info({
        content: 'ok'
      })
    },
    onCancel: () => {
      Message.error({
        content: 'cancel'
      })
    }
  }
  return (
    <div
      style={{
        position: 'relative',
        width: 400,
        height: 300
      }}
    >
      <Popconfirm focusLock position="tl" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 20,
            left: 70
          }}
        >
          TL
        </Button>
      </Popconfirm>
      <Popconfirm position="top" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 20,
            left: 180
          }}
        >
          Top
        </Button>
      </Popconfirm>
      <Popconfirm position="tr" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 20,
            left: 290
          }}
        >
          TR
        </Button>
      </Popconfirm>
      <Popconfirm position="lt" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 60,
            left: 10
          }}
        >
          LT
        </Button>
      </Popconfirm>
      <Popconfirm position="left" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 120,
            left: 10
          }}
        >
          Left
        </Button>
      </Popconfirm>
      <Popconfirm position="lb" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 180,
            left: 10
          }}
        >
          LB
        </Button>
      </Popconfirm>
      <Popconfirm position="rt" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 60,
            left: 350
          }}
        >
          RT
        </Button>
      </Popconfirm>
      <Popconfirm position="right" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 120,
            left: 350
          }}
        >
          Right
        </Button>
      </Popconfirm>
      <Popconfirm position="rb" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 180,
            left: 350
          }}
        >
          RB
        </Button>
      </Popconfirm>
      <Popconfirm position="bl" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 226,
            left: 70
          }}
        >
          BL
        </Button>
      </Popconfirm>
      <Popconfirm position="bottom" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 226,
            left: 180
          }}
        >
          Bottom
        </Button>
      </Popconfirm>
      <Popconfirm position="br" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 226,
            left: 290
          }}
        >
          BR
        </Button>
      </Popconfirm>
    </div>
  )
}
```

## 异步关闭

用于异步执行某些操作，等操作完成再关闭弹出框。

**用法**：返回一个 `Promise` 用于异步关闭。

```jsx live
function Demo() {
  function delayClose() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
        Message.info({
          content: 'ok'
        })
      }, 2000)
    })
  }

  return (
    <Popconfirm
      title="Are you sure you want to delete?"
      onOk={delayClose}
      onCancel={() => {
        Message.error({
          content: 'cancel'
        })
      }}
      focusLock
    >
      <Button style={{ marginRight: 20 }}>Async close</Button>
    </Popconfirm>
  )
}
```

## 自定义icon

自定义图标。

```jsx live
function Demo() {
  return (
    <Space size={24}>
      <Popconfirm
        focusLock
        title="Are you sure you want to delete?"
        icon={<IconFaceSmileFill style={{ color: 'var(--color-primary)' }} />}
        onOk={() => {
          Message.info({
            content: 'ok'
          })
        }}
        onCancel={() => {
          Message.error({
            content: 'cancel'
          })
        }}
      >
        <Button>Delete</Button>
      </Popconfirm>
      <Popconfirm
        icon={null}
        title="Are you sure you want to delete?"
        onOk={() => {
          Message.info({
            content: 'ok'
          })
        }}
        onCancel={() => {
          Message.error({
            content: 'cancel'
          })
        }}
      >
        <Button>Delete</Button>
      </Popconfirm>
    </Space>
  )
}
```

## API

### Popconfirm

| 参数名 | 描述 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoFocus | 是否自动聚焦弹出框内的可聚焦元素 | boolean | `-` | - |
| defaultPopupVisible | 默认弹出框是打开还是关闭 | boolean | `-` | - |
| disabled | 是否禁用 | boolean | `-` | 2.11.0 |
| focusLock | 是否将焦点锁定在弹出框内 | boolean | `-` | - |
| popupVisible | 弹出框是打开还是关闭。(受控) | boolean | `-` | - |
| unmountOnExit | 是否在隐藏的时候销毁 DOM 节点 | boolean | `true` | - |
| okType | 确认按钮的类型 | ButtonProps['type'] | `primary` | - |
| position | 弹出框的方位，有 12 个方位可供选择 | \| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb' | `top` | - |
| trigger | 触发方式 | TriggerProps['trigger'] | `click` | - |
| cancelText | 取消按钮文字 | ReactNode | `-` | - |
| icon | 标题前的图标 | ReactNode | `&lt;IconExclamationCircleFill />` | - |
| okText | 确认按钮文字 | ReactNode | `-` | - |
| cancelButtonProps | 取消按钮的参数，可接受 `Button` 组件的所有参数 | ButtonProps | `-` | - |
| className | 节点类名 | string \| string[] | `-` | - |
| okButtonProps | 确定按钮的参数，可接受 `Button` 组件的所有参数 | ButtonProps | `-` | - |
| onOk | 点击确认按钮的回调函数。回调函数 `event` 参数在 `2.29.0` 支持 | (e: React.MouseEvent) =&gt; Promise&lt;any&gt; \| void | `-` | - |
| style | 节点样式 | CSSProperties | `-` | - |
| triggerProps | 可以接受所有 Trigger 的参数 | Partial&lt;TriggerProps&gt; | `-` | - |
| content | 内容.函数类型在 `2.48.0` 支持 | ReactNode \| (() => ReactNode) | `-` | 2.44.0 |
| getPopupContainer | 弹出挂载的节点 | (node: HTMLElement) => Element | `-` | - |
| onCancel | 点击取消按钮的回调函数。 回调函数 `event` 参数在 `2.29.0` 支持 | (e: React.MouseEvent) => void | `-` | - |
| onVisibleChange | 弹出打开和关闭触发的回调 | (visible: boolean) => void | `-` | - |
| title | 标题。 函数类型在 `2.48.0` 支持 | ReactNode \| (() => ReactNode) | `-` | - |
