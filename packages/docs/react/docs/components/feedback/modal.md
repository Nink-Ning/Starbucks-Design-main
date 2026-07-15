---
sidebar_position: 1
---

# 对话框 Modal

在当前页面打开一个浮层，承载相关操作。

## 基础用法

文本信息对话框。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <div>
      <Button onClick={() => setVisible(true)} type="primary">
        Open Modal
      </Button>
      <Modal
        title="Modal Title"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <p>
          You can customize modal body text by the current situation. This modal will be closed immediately once you
          press the OK button.
        </p>
      </Modal>
    </div>
  )
}
```

## 异步关闭

在对话框中使用表单时，如提交表单，点击确定后异步关闭对话框。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm()

  function onOk() {
    form.validate().then((res) => {
      setConfirmLoading(true)
      setTimeout(() => {
        Message.success('Success !')
        setVisible(false)
        setConfirmLoading(false)
      }, 1500)
    })
  }

  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    }
  }
  return (
    <div>
      <Button onClick={() => setVisible(true)} type="primary">
        Open Modal with async logic
      </Button>
      <Modal
        title="Add User"
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{
            style: { flexBasis: 90 }
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(100% - 90px)' }
          }}
        >
          <Form.Item label="Name" field="name" rules={[{ required: true }]}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="Gender" required field="sex" rules={[{ required: true }]}>
            <Select options={['男', '女']} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
```

## 自定义页脚

传入 `okButtonProps` 和 `cancelButtonProps` 可分别自定义确定按钮和取消按钮的 props。如果 `okButtonProps` 、 `cancelButtonProps` 仍然不能满足需要的话，可以直接传入`footer`来自定义页脚内容。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [visible1, setVisible1] = React.useState(false)
  const [loading1, setLoading1] = React.useState(false)
  const [visible2, setVisible2] = React.useState(false)
  return (
    <Space size="large">
      <Button onClick={() => setVisible(true)} type="primary">
        Open Modal with customized button props
      </Button>
      <Modal
        title="Modal Title"
        visible={visible}
        okButtonProps={{
          disabled: true
        }}
        cancelButtonProps={{
          disabled: true
        }}
        onCancel={() => {
          setVisible(false)
        }}
        onOk={() => {
          setVisible(false)
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>

      <Button
        onClick={() => {
          setVisible1(true)
        }}
        type="primary"
      >
        Open Modal with customized footer
      </Button>
      <Modal
        title="Modal Title"
        visible={visible1}
        footer={
          <>
            <Button
              onClick={() => {
                setVisible1(false)
              }}
            >
              Return
            </Button>
            <Button
              loading={loading1}
              onClick={() => {
                setLoading1(true)
                setTimeout(() => {
                  setLoading1(false)
                  setVisible1(false)
                }, 1500)
              }}
              type="primary"
            >
              Submit
            </Button>
          </>
        }
        onCancel={() => {
          setVisible1(false)
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>

      <Button
        onClick={() => {
          setVisible2(true)
        }}
        type="primary"
      >
        Open Modal without footer
      </Button>
      <Modal
        title="Modal Title"
        visible={visible2}
        footer={null}
        onCancel={() => {
          setVisible2(false)
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>
    </Space>
  )
}
```

## 自定义标题

`title` 支持传入文字或者 react 节点，支持各种场景的标题栏展示。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [visible1, setVisible1] = React.useState(false)
  return (
    <Space>
      <Button onClick={() => setVisible(true)} type="primary">
        Left align title
      </Button>
      <Modal
        title={<div style={{ textAlign: 'left' }}>Modal Title</div>}
        visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
        onOk={() => {
          setVisible(false)
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>

      <Button onClick={() => setVisible1(true)} type="primary">
        Center align title
      </Button>
      <Modal
        title="Modal Title"
        visible={visible1}
        onCancel={() => {
          setVisible1(false)
        }}
        onOk={() => {
          setVisible1(false)
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>
    </Space>
  )
}
```

## 确认对话框

使用`Modal.confirm()`，可以快速弹出对话框。

```jsx live
function Demo() {
  function confirm() {
    Modal.confirm({
      title: 'Confirm deletion',
      content:
        'Are you sure you want to delete the 3 selected items? Once you press the delete button, the items will be deleted immediately. You can’t undo this action.',
      okButtonProps: {
        status: 'danger'
      },
      onOk: () => {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
        }).catch((e) => {
          Message.error({
            content: 'Error occurs!'
          })
          throw e
        })
      }
    })
  }
  return (
    <Button type="primary" onClick={confirm}>
      Confirm
    </Button>
  )
}
```

## 消息提示

有 `info`, `success`, `warning`, `error` 四种类型的消息提示，仅提供一个确认按钮用于关闭消息提示对话框。

```jsx live
function Demo() {
  function info() {
    Modal.info({
      title: 'Info Notification',
      content:
        'This is an info description which directly indicates a neutral informative change or action. (e.g., "We are providing new services for all developers.") '
    })
  }

  function success() {
    Modal.success({
      title: 'This is a success notification'
    })
  }

  function warning() {
    Modal.warning({
      title: 'Warning Notification',
      content:
        'This is a warning description which directly indicates a warning that might need attention. (e.g., "Invalid request, please contact admininstration.")'
    })
  }

  function error() {
    Modal.error({
      title: 'Error Notification',
      content:
        'This is an error description which directly indicates a dangerous or potentially negative action. (e.g., "It’s a invalid request.")'
    })
  }
  return (
    <Space size="large">
      <Button type="primary" onClick={info}>
        Info
      </Button>
      <Button type="primary" status="success" onClick={success}>
        Success
      </Button>
      <Button type="primary" status="warning" onClick={warning}>
        Warning
      </Button>
      <Button type="primary" status="danger" onClick={error}>
        Error
      </Button>
    </Space>
  )
}
```

## 定制按钮文字

设置 `okText` 与 `cancelText` 以自定义按钮文字。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false)

  function confirm() {
    Modal.confirm({
      title: 'Confirm deletion',
      content:
        'Are you sure you want to delete the 3 selected items? Once you press the delete button, the items will be deleted immediately. You can’t undo this action.',
      okText: 'OK',
      cancelText: 'Cancel'
    })
  }

  function openInfo() {
    Modal.info({
      title: 'Info Notification',
      okText: 'got it',
      content:
        'This is an info description which directly indicates a neutral informative change or action. (e.g., "We are providing new services for all developers.") '
    })
  }

  return (
    <Space>
      <Button onClick={() => setVisible(true)} type="primary">
        Modal
      </Button>
      <Modal
        title="Modal Title"
        visible={visible}
        okText="ok"
        cancelText="Cancel"
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <p>
          You can customize modal body text by the current situation. This modal will be closed immediately once you
          press the OK button.
        </p>
      </Modal>

      <Button type="primary" onClick={confirm}>
        Confirm
      </Button>

      <Button type="primary" onClick={openInfo}>
        info
      </Button>
    </Space>
  )
}
```

## 手动更新和移除

手动更新和关闭通过 Modal的方法创建的对话框。

```jsx live
function Demo() {
  const sleep = async (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }
  return (
    <div>
      <Button
        type="primary"
        onClick={async () => {
          const modalIns = Modal.confirm({
            title: 'Submiting...',
            icon: <IconInfoCircleFill />,
            content: (
              <span>
                This modal will be successful after 1.5s. <Spin size={14} />
              </span>
            ),
            footer: null
          })
          await sleep(1500)
          modalIns.update({
            icon: <IconCheckCircleFill />,
            title: 'Success',
            content: 'This modal will be closed after 1.5s.'
          })
          await sleep(1500)
          modalIns.close()
        }}
      >
        Open Modal
      </Button>
    </div>
  )
}
```

## 自定义位置

使用 `alignCenter` 结合 `style` 来设置对话框位置。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [visible1, setVisible1] = React.useState(false)
  return (
    <div>
      <Button onClick={() => setVisible(true)} type="primary">
        Display a modal dialog at 20px to top
      </Button>
      <br />
      <br />
      <Button onClick={() => setVisible1(true)} type="primary">
        Vertically centered modal dialog
      </Button>
      <Modal
        alignCenter={false}
        style={{ top: 20 }}
        title="Modal Title"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <p>Display a modal dialog at 20px to top</p>
      </Modal>
      <Modal
        title="Modal Title"
        alignCenter
        visible={visible1}
        onOk={() => setVisible1(false)}
        onCancel={() => setVisible1(false)}
        autoFocus={false}
        focusLock={true}
      >
        <p>Vertically centered modal dialog</p>
      </Modal>
    </div>
  )
}
```

## 数据请求加载

对话框中显示 loading 效果。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false) // table

  function getDataFromServer() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'EduTools',
            version: '12.18.1',
            author: 'Dickens'
          },
          {
            id: '2',
            name: 'BashSupport',
            version: '12.19.2',
            author: 'Aristotle'
          },
          {
            id: '3',
            name: 'GitToolBox',
            version: '12.20.3',
            author: 'Hemingway'
          }
        ])
      }, 1500)
    })
  }

  const [data, setData] = React.useState([])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: 'Version',
      dataIndex: 'version',
      sorter: (a, b) => {
        const aVersion = a.version.split('.')
        const bVersion = b.version.split('.')

        for (let i = 0; i < aVersion.length; i++) {
          if (aVersion[i] === bVersion[i]) continue
          return aVersion[i] - bVersion[i]
        }

        return 1
      }
    },
    {
      title: 'Author',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length
    }
  ]

  function loadData() {
    setLoading(true)
    getDataFromServer().then((res) => {
      setData(res)
      setLoading(false)
    })
  }

  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true)
          loadData()
        }}
        type="primary"
      >
        Open Modal
      </Button>
      <Modal
        title="Manage Plugins"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        afterClose={() => setData([])}
      >
        <Spin tip="loading Data..." loading={loading}>
          <div style={{ height: 266, visibility: !loading ? 'visible' : 'hidden' }}>
            <p>
              You can select multiple plugins for the current project so that our app will verify that the plugins are
              installed and enabled.
            </p>
            <p
              style={{
                marginTop: 20,
                marginBottom: 8,
                fontWeight: 600
              }}
            >
              List of plugins
            </p>
            <Table
              columns={columns}
              data={data}
              pagination={false}
              border={{
                headerCell: true,
                wrapper: true
              }}
              rowKey="id"
              rowSelection={{
                type: 'checkbox',
                checkAll: true
              }}
            ></Table>
          </div>
        </Spin>
      </Modal>
    </div>
  )
}
```

## 带有通知对话框

对话框中显示 Alert.

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false) // table

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: 'Version',
      dataIndex: 'version',
      sorter: (a, b) => {
        const aVersion = a.version.split('.')
        const bVersion = b.version.split('.')

        for (let i = 0; i < aVersion.length; i++) {
          if (aVersion[i] === bVersion[i]) continue
          return aVersion[i] - bVersion[i]
        }

        return 1
      }
    },
    {
      title: 'Author',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length
    }
  ]
  const data = [
    {
      id: '1',
      name: 'EduTools',
      version: '12.18.1',
      author: 'Dickens'
    }
  ]
  return (
    <div>
      <Button onClick={() => setVisible(true)} type="primary">
        Open Modal
      </Button>
      <Modal
        title="Manage Plugins"
        visible={visible}
        className="modal-demo-without-content-spacing"
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Alert closable type="info" content="This message displays only once." />
        <div style={{ padding: 20 }}>
          <p>
            You can select multiple plugins for the current project so that our app will verify that the plugins are
            installed and enabled.
          </p>
          <p style={{ marginTop: 20, marginBottom: 8, fontWeight: 600 }}>List of plugins</p>
          <Table
            columns={columns}
            data={data}
            pagination={false}
            border={{ headerCell: true, wrapper: true }}
            rowKey="id"
            rowSelection={{ type: 'checkbox', checkAll: true }}
          ></Table>
        </div>
      </Modal>
    </div>
  )
}
```

## 带有步骤条对话框

带有横向步骤条的对话框。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false) // table

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: 'Version',
      dataIndex: 'version',
      sorter: (a, b) => {
        const aVersion = a.version.split('.')
        const bVersion = b.version.split('.')

        for (let i = 0; i < aVersion.length; i++) {
          if (aVersion[i] === bVersion[i]) continue
          return aVersion[i] - bVersion[i]
        }

        return 1
      }
    },
    {
      title: 'Author',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length
    }
  ]
  const data = [
    {
      id: '1',
      name: 'EduTools',
      version: '12.18.1',
      author: 'Dickens'
    },
    {
      id: '2',
      name: 'BashSupport',
      version: '12.19.2',
      author: 'Aristotle'
    },
    {
      id: '3',
      name: 'GitToolBox',
      version: '12.20.3',
      author: 'Hemingway'
    }
  ]
  return (
    <div>
      <Button onClick={() => setVisible(true)} type="primary">
        Open Modal
      </Button>
      <Modal
        title="Manage Plugins"
        visible={visible}
        className="modal-demo-without-content-spacing"
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <div style={{ padding: '16px 0' }}>
          <Steps size="small" lineless current={2} style={{ maxWidth: 375, margin: '0 auto' }}>
            <Steps.Step title="Succeeded" />
            <Steps.Step title="Processing" />
            <Steps.Step title="Pending" />
          </Steps>
        </div>
        <Divider style={{ margin: 0 }} />
        <div style={{ padding: '24px 20px' }}>
          <p>
            You can select multiple plugins for the current project so that our app will verify that the plugins are
            installed and enabled.
          </p>
          <p style={{ marginTop: 20, marginBottom: 8, fontWeight: 600 }}>List of plugins</p>
          <Table
            columns={columns}
            data={data}
            pagination={false}
            border={{
              headerCell: true,
              wrapper: true
            }}
            rowKey="id"
            rowSelection={{
              type: 'checkbox',
              checkAll: true
            }}
          ></Table>
        </div>
      </Modal>
    </div>
  )
}
```

## 自定义渲染对话框

可以通过 `modalRender` 来自定义渲染对话框，实现拖拽功能。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [disabled, setDisabled] = React.useState(true)
  return (
    <div>
      <Button onClick={() => setVisible(true)} type="primary">
        Open Draggable Modal
      </Button>
      <Modal
        style={{ cursor: 'move' }}
        title="Modal Title"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        onMouseOver={() => {
          disabled && setDisabled(false)
        }}
        onMouseOut={() => {
          !disabled && setDisabled(true)
        }}
        modalRender={(modal) => <Draggable disabled={disabled}>{modal}</Draggable>}
      >
        <p>
          You can customize modal body text by the current situation. This modal will be closed immediately once you
          press the OK button.
        </p>
      </Modal>
    </div>
  )
}
```

## Hooks 用法

可以通过 `useModal` 去创建可以读取 `context` 的对话框。

```jsx live
function Demo() {
  const ConfigContext = createContext({})
  const [modal, contextHolder] = Modal.useModal()

  const config = {
    title: 'Profile',
    content: <ConfigContext.Consumer>{(name) => `Current user: ${name}`}</ConfigContext.Consumer>
  }
  return (
    <ConfigContext.Provider value="PJY">
      {contextHolder}
      <Space>
        <Button onClick={() => modal.confirm(config)} type="secondary">
          Confirm
        </Button>
        <Button onClick={() => modal.info(config)} type="secondary">
          Info
        </Button>
        <Button onClick={() => modal.success(config)} type="secondary">
          Success
        </Button>
        <Button onClick={() => modal.warning(config)} type="secondary">
          Warning
        </Button>
        <Button onClick={() => modal.error(config)} type="secondary">
          Error
        </Button>
        <Button onClick={() => Modal.confirm(config)} type="outline" status="danger">
          Can't get context
        </Button>
      </Space>
    </ConfigContext.Provider>
  )
}
```

## API

### Modal

| 参数名 | 描述 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| alignCenter | 弹出框垂直水平居中 | boolean | `true` | - |
| autoFocus | 是否默认聚焦第一个可聚焦元素，只在 `focusLock` 开启时生效。 | boolean | `true` | - |
| closable | 是否显示右上角的关闭按钮 | boolean | `-` | - |
| confirmLoading | 确认按钮加载中 | boolean | `-` | - |
| escToExit | 按 `ESC` 键关闭 | boolean | `true` | - |
| focusLock | 是否将焦点锁定在弹出框内 | boolean | `true` | - |
| mask | 是否显示遮罩 | boolean | `true` | - |
| maskClosable | 点击蒙层是否可以关闭 | boolean | `true` | - |
| mountOnEnter | 是否在初次打开对话框时才渲染 dom | boolean | `true` | - |
| simple | 简洁模式的样式，没有分割线，底部按钮居中显示。默认通过方法调用的提示类型的弹窗会展示`simple`样式。设置为true时，默认不显示右上角关闭图标 | boolean | `-` | - |
| unmountOnExit | 是否在隐藏之后销毁DOM结构 | boolean | `-` | - |
| visible | 弹出框是否可见 | boolean | `-` | - |
| cancelText | 取消按钮文案 | ReactNode | `-` | - |
| closeIcon | 自定义右上角的关闭按钮节点 | ReactNode | `-` | 2.21.0 |
| okText | 确认按钮文案 | ReactNode | `-` | - |
| title | 弹出框的标题 | string \| ReactNode | `-` | - |
| cancelButtonProps | 取消按钮的 props | ButtonProps | `-` | - |
| className | 节点类名 | string \| string[] | `-` | - |
| maskStyle | 蒙层的样式 | CSSProperties | `-` | 2.6.0 |
| okButtonProps | 确认按钮的 props | ButtonProps | `-` | - |
| onOk | 点击确认按钮的回调 | (e?: MouseEvent) =&gt; Promise&lt;any&gt; \| void | `-` | - |
| style | 节点样式 | CSSProperties | `-` | - |
| wrapClassName | 弹出框外层 dom 类名 | string \| string[] | `-` | - |
| wrapStyle | 弹出框外层样式 | CSSProperties | `-` | 2.16.0 |
| afterClose | 弹框关闭之后的回调 | () => void | `-` | - |
| afterOpen | 弹框打开之后的回调 | () => void | `-` | - |
| footer | 自定义页脚，传入 null 则不显示 | ReactNode \| ((cancelButtonNode: ReactNode, okButtonNode: ReactNode) => ReactNode) | `-` | 2.12.0 |
| getChildrenPopupContainer | 对话框里的弹出框 `Select` `Tooltip` 等挂载的容器，默认挂载在对话框内。 | (node: HTMLElement) => Element | `-` | - |
| getPopupContainer | 指定弹出框挂载的父节点 | () => Element | `() => document.body` | - |
| modalRender | 自定义渲染对话框 | (modalNode: ReactNode) => ReactNode | `-` | 2.2.0 |
| onCancel | 关闭弹出框的回调 | () => void | `-` | - |

### Modal.method(config)

包括以下几种：

- `Modal.confirm(config)`
- `Modal.info(config)`
- `Modal.success(config)`
- `Modal.warning(config)`
- `Modal.error(config)`

以上函数都会返回一个对象，可用来更新或者关闭对话框。如：

```js
const info = Modal.info({ title: 'Info' })
info.update({ title: 'Updated Title' })
info.close()
```

`config` 的具体参数如下所示（继承所有 Modal 的参数）：

| 参数名  |     描述     |        类型         | 默认值 |
| ------- | :----------: | :-----------------: | -----: |
| content | 对话框的内容 |     `ReactNode`     |    `-` |
| icon    |  自定义图标  | `ReactNode \| null` |    `-` |

### Modal.config 方法

全局设置 `Modal.confirm|success|info|error|warning` 的属性，类似 `Message.config` 方法，`&lt;Modal />` 的使用方式会从 `ConfigProvider` 获取上下文配置。

```js
Modal.config({
  // 自定义前缀
  prefixCls: 'arco',
  // 是否静态方法以简洁样式展示信息
  simple: true
})
```

### Modal.destroyAll 方法

调用 `Modal.destroyAll`，会关闭所有弹出的确认框（包括 `Modal.confirm` `Modal.info` `Modal.success` `Modal.error` `Modal.warning`），一般用于路由改动时，关闭所有弹出。

```js
Modal.destroyAll()
```

### Modal.useModal 方法

通过方法去使用对话框，像是 `Modal.confirm` `Modal.warning`，因为是通过 `ReactDOM.render` 直接渲染，所以不在上下文中，因此拿不到 `context`。如果希望获取上下文 `context`，那么可以通过 `useModal` 去通过 hook 的方法调用，将 `contextHolder` 放到上下文中。

```js
const [modal, contextHolder] = Modal.useModal()

;<Context.Provider>
  {contextHolder}
  <Button onClick={() => modal.warning({ title: 'Title', content: 'content' })}>Open</Button>
</Context.Provider>
```
