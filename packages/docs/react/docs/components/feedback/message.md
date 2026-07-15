---
sidebar_position: 1
---

# 全局提示 Message

由用户的操作触发的轻量级全局反馈。

## 基础用法

最简单的例子。

```jsx live
function Demo() {
  return (
    <Button
      onClick={() => {
        Message.info('This is an info message!')
      }}
      type="primary"
    >
      Open Message
    </Button>
  )
}
```

## 不同类型

全局提示有 5 种不同的类型，分别为：`info`, `success`, `warning`, `error`, `normal`。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Button onClick={() => Message.info('This is an info message!')} type="primary">
        Info
      </Button>
      <Button onClick={() => Message.success('This is a success message!')} type="primary" status="success">
        Success
      </Button>
      <Button onClick={() => Message.warning('This is a warning message!')} type="primary" status="warning">
        Warning
      </Button>
      <Button onClick={() => Message.error('This is an error message!')} type="primary" status="danger">
        Error
      </Button>
      <Button type="secondary" onClick={() => Message.normal('This is a message!')}>
        Normal
      </Button>
    </Space>
  )
}
```

## 自定义图标

设置 `icon` 来自定义图标。

```jsx live
function Demo() {
  const IconFont = Icon.addFromIconFontCn({
    src: '//at.alicdn.com/t/font_180975_26f1p759rvn.js'
  })
  return (
    <Space size="large">
      <Button
        onClick={() =>
          Message.info({
            icon: <IconFont type="icon-info" />,
            content: 'This is an info message!'
          })
        }
        type="primary"
      >
        Info (Light)
      </Button>
      <Button
        onClick={() =>
          Message.success({
            icon: <IconFont type="icon-success" />,
            content: 'This is a primary message!'
          })
        }
        type="primary"
        status="success"
      >
        Success (Light)
      </Button>
      <Button
        onClick={() =>
          Message.warning({
            icon: <IconFont type="icon-warning" />,
            content: 'This is a warning message!'
          })
        }
        type="primary"
        status="warning"
      >
        Warning (Light)
      </Button>
      <Button
        onClick={() =>
          Message.error({
            icon: <IconFont type="icon-error" />,
            content: 'This is an error message!'
          })
        }
        type="primary"
        status="danger"
      >
        Error (Light)
      </Button>
      <Button
        onClick={() =>
          Message.info({
            icon: <IconFaceSmileFill />,
            content: 'This is a message!'
          })
        }
        type="secondary"
      >
        Smile
      </Button>
    </Space>
  )
}
```

## 更新全局提醒内容

通过指定 `id`，可以更新已经存在的全局提示。

```jsx live
function Demo() {
  function updateMessage() {
    Message.loading({
      id: 'need_update',
      content: 'Will update after 2 seconds...'
    })
    setTimeout(() => {
      Message.success({
        id: 'need_update',
        content: 'Update success!'
      })
    }, 2000)
  }
  return (
    <Button onClick={updateMessage} type="primary">
      Update message
    </Button>
  )
}
```

## 全局提示的位置

全局提示有 2 种不同的弹出位置，分别为顶部和底部。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Button
        onClick={() =>
          Message.info({
            content: 'This is a message!',
            showIcon: true,
            position: 'top'
          })
        }
        type="primary"
      >
        Top
      </Button>
      <Button
        onClick={() =>
          Message.info({
            content: 'This is a message!',
            showIcon: true,
            position: 'bottom'
          })
        }
        type="primary"
      >
        Bottom
      </Button>
    </Space>
  )
}
```

## 更新延时

通过指定 `id`，可以更新已经存在的全局提示的`duration` 属性。

```jsx live
function Demo() {
  function updateMessage() {
    Message.loading({
      id: 'need_update',
      content: 'Will update after 2 seconds...',
      duration: 3000
    })
    setTimeout(() => {
      Message.success({
        id: 'need_update',
        content: 'Will update after 3 seconds!',
        duration: 3000
      })
    }, 2000)
  }
  return (
    <Button onClick={updateMessage} type="primary">
      Update message
    </Button>
  )
}
```

## 手动控制关闭

`Message.xxx()` 会返回一个函数，调用此函数能手动关闭通知。

```jsx live
function Demo() {
  function updateMessage() {
    const close = Message.info({
      content: 'Close after 2 seconds...',
      duration: 0
    })
    setTimeout(() => {
      close()
    }, 2000)
  }
  return (
    <Button onClick={updateMessage} type="primary">
      Close after 2 seconds
    </Button>
  )
}
```

## 显示关闭按钮

设置 `closable` 来显示关闭按钮。

```jsx live
function Demo() {
  return (
    <Button
      onClick={() => {
        Message.info({
          content: 'This is a message!',
          closable: true,
          duration: 10000
        })
      }}
      type="primary"
    >
      Open Message
    </Button>
  )
}
```

## Hooks-用法

可以通过 `useMessage`**(2.40.0)** 去创建可以读取 context 的对话框。

但是通过 `useMessage` 渲染的 `message` 挂载在 `contextHolder` 所在位置。无法通过 `getContainer()` 修改容器。

```jsx live
function Demo() {
  const [message, contextHolder] = Message.useMessage()
  const ConfigContext = createContext({})

  const config = {
    content: <ConfigContext.Consumer>{(name) => `Current user: ${name}`}</ConfigContext.Consumer>
  }

  return (
    <ConfigContext.Provider value="PJY">
      <div className="demo-holder-wrapper">
        {/* message 挂载在此容器内 */}
        {contextHolder}
      </div>
      <Space size="large">
        <Button onClick={() => message.info?.(config)} type="primary">
          Info
        </Button>
        <Button onClick={() => message.success?.(config)} type="primary" status="success">
          Success
        </Button>
        <Button onClick={() => message.warning?.(config)} type="primary" status="warning">
          Warning
        </Button>
        <Button onClick={() => message.error?.(config)} type="primary" status="danger">
          Error
        </Button>
        <Button onClick={() => message.normal?.(config)} type="secondary">
          Normal
        </Button>
      </Space>
    </ConfigContext.Provider>
  )
}
```

## 自定义动画效果

可以通过 `transitionClassNames` 和 `transitionTimeout` 实现自定义过渡效果

动画实现基于 react-transition-group

```jsx live
function Demo() {
  return (
    <Button
      onClick={() => {
        Message.info({
          content: 'This is an info message!',
          transitionClassNames: 'my-animation',
          transitionTimeout: {
            enter: 1000,
            exit: 500
          }
        })
      }}
      type="primary"
    >
      Open Message
    </Button>
  )
}
```

## API

### Message

| 参数名 | 描述 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| closable | 是否显示关闭按钮 | boolean | `true` | - |
| showIcon | 是否显示图标 | boolean | `true` | - |
| duration | 自动关闭的时间，单位为 `ms` | number | `3000` | - |
| id | 当前消息的唯一标识，可以用来更新消息 | string | `-` | - |
| transitionClassNames | 消息弹出动画的类名，见 react-transition-group 的 `classNames` | string | `-` | - |
| position | 消息的位置，分为 `top` 上方和 `bottom` 下方 | 'top' \| 'bottom' | `-` | - |
| closeIcon | 自定义右上角关闭按钮 | ReactNode | `-` | 2.50.0 |
| icon | 自定义图标 | ReactNode | `-` | - |
| className | 节点类名 | string \| string[] | `-` | - |
| content | 消息内容 | ReactNode \| string **(必填)** | `-` | - |
| style | 节点样式 | CSSProperties | `-` | - |
| transitionTimeout | 动画持续时间，见 react-transition-group 的 `timeout` | &#123;enter?: number;exit?: number;} | `&#123;enter: 100, exit: 300}` | 2.43.0 |
| onClose | 关闭时的回调 | () => void | `-` | - |

### 使用方法

- `Message.info(content: String)` / `Message.info(config: Object)`
- `Message.success(content: String)` / `Message.success(config: Object)`
- `Message.warning(content: String)` / `Message.warning(config: Object)`
- `Message.error(content: String)` / `Message.error(config: Object)`
- `Message.normal(content: String)` / `Message.normal(config: Object)`
- `Message.loading(content: String)` / `Message.loading(config: Object)`
- `Message.clear()`

### 全局设置

`Message.config(options)`

| 参数名       |        描述        |        类型         |                默认值 |
| ------------ | :----------------: | :-----------------: | --------------------: |
| maxCount     |    最大通知数量    |      `number`       |                   `-` |
| getContainer |   放置通知的容器   | `() => HTMLElement` | `() => document.body` |
| duration     | 通知自动关闭的时间 |      `number`       |                `3000` |
| prefixCls    |      类名前缀      |      `string`       |                `arco` |
