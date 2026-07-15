---
sidebar_position: 1
---

# 抽屉 Drawer

触发命令后，从屏幕一侧滑出的抽屉式的面板。

## 基础用法

基础抽屉，点击触发按钮抽屉从右侧滑出，点击遮罩区关闭。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true)
        }}
        type="primary"
      >
        Open Drawer
      </Button>
      <Drawer
        width={332}
        title={<span>Basic Information </span>}
        visible={visible}
        onOk={() => {
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <div>Here is an example text.</div>

        <div>Here is an example text.</div>
      </Drawer>
    </div>
  )
}
```

## 自定义位置

自定义位置，点击触发按钮抽屉从相应的位置滑出。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState()
  const [placement, setPlacement] = React.useState('right')
  return (
    <div>
      <Radio.Group name="placement" defaultValue={placement} onChange={setPlacement}>
        <Radio value="top">Top</Radio>
        <Radio value="bottom">Bottom</Radio>
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
      </Radio.Group>
      <br />
      <Button
        onClick={() => {
          setVisible(true)
        }}
        type="primary"
        style={{ marginTop: 20 }}
      >
        Open Drawer
      </Button>
      <Drawer
        width={332}
        height={332}
        title={<span>Basic Information </span>}
        visible={visible}
        placement={placement}
        onOk={() => {
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <div>Here is an example text. </div>
        <div>Here is an example text.</div>
      </Drawer>
    </div>
  )
}
```

## 自定义节点

可以通过 `title` 属性和 `footer` 属性定制节点内容。当设置为 `null` 时，将不会渲染对应的dom节点。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [hasHeader, setHeader] = React.useState(true)
  const [hasFooter, setFooter] = React.useState(true)
  const [hasClose, setClose] = React.useState(true)
  return (
    <div>
      <Checkbox
        onChange={(value) => {
          setHeader(!value)
        }}
        style={{ marginRight: 20 }}
      >
        Hide title
      </Checkbox>
      <Checkbox
        onChange={(value) => {
          setFooter(!value)
        }}
        style={{ marginRight: 20 }}
      >
        Hide footer
      </Checkbox>
      <Checkbox
        onChange={(value) => {
          setClose(!value)
        }}
      >
        Hide close icon
      </Checkbox>
      <br />
      <Button
        onClick={() => {
          setVisible(true)
        }}
        type="primary"
        style={{ marginTop: 20 }}
      >
        Open Drawer
      </Button>
      <Drawer
        width={320}
        title={hasHeader ? 'Basic Information' : null}
        footer={hasFooter ? <span>footer</span> : null}
        closable={hasClose}
        visible={visible}
        onOk={() => {
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <div>Here is an example text.</div>

        <div>Here is an example text.</div>
      </Drawer>
    </div>
  )
}
```

## 抽屉表单

在抽屉里使用表单。

```jsx live
function Demo() {
  const formItemLayout = {
    wrapperCol: {
      span: 24
    }
  }
  const [visible, setVisible] = React.useState(false)
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true)
        }}
        type="primary"
      >
        Open Drawer
      </Button>
      <Drawer
        width={314}
        title={<span>Basic Information </span>}
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={() => {
          form.validate().then((res) => {
            setConfirmLoading(true)
            setTimeout(() => {
              setVisible(false)
              setConfirmLoading(false)
            }, 1500)
          })
        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <Form {...formItemLayout} form={form} layout="vertical">
          <Form.Item label="Name" field="name" rules={[{ required: true }]}>
            <Input placeholder="Plear enter" />
          </Form.Item>
          <Form.Item label="URL" required field="url" rules={[{ required: true }]}>
            <Input placeholder="Plear enter" prefix="http://" suffix=".com" />
          </Form.Item>
          <Form.Item label="Hometown" field="hometown" rules={[{ required: true }]}>
            <Select placeholder="Plear select" options={['Beijing', 'Shanghai']} />
          </Form.Item>
          <Form.Item label="Date of Birth" field="birthday" rules={[{ required: true }]}>
            <DatePicker placeholder="Plear select" />
          </Form.Item>
          <Form.Item label="Self Introduction" required field="introduction" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Plear enter" />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}
```

## 多层抽屉

在抽屉内打开新的抽屉。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [visible2, setVisible2] = React.useState(false)
  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true)
        }}
        type="primary"
      >
        Open Drawer
      </Button>
      <Drawer
        width={500}
        title={<span>First Drawer </span>}
        visible={visible}
        onOk={() => {
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <Button
          onClick={() => {
            setVisible2(true)
          }}
          type="primary"
          style={{ marginTop: 20 }}
        >
          Open Drawer
        </Button>
      </Drawer>
      <Drawer
        width={332}
        title={<span>Second Drawer </span>}
        visible={visible2}
        onOk={() => {
          setVisible2(false)
        }}
        onCancel={() => {
          setVisible2(false)
        }}
      >
        <div>Here is an example text.</div>

        <div>Here is an example text.</div>
      </Drawer>
    </div>
  )
}
```

## 信息预览抽屉

需要快速预览对象概要时使用，点击遮罩区关闭。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true)
        }}
        type="primary"
      >
        Open Drawer
      </Button>
      <Drawer
        width={350}
        title={<span>User Information </span>}
        visible={visible}
        onOk={() => {
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
        }}
        footer={null}
      >
        <Descriptions
          colon=""
          title="Personal Information"
          column={1}
          labelStyle={{ width: 100 }}
          data={[
            {
              label: 'Name',
              value: 'Orwell'
            },
            {
              label: 'Date of birth',
              value: '1995.01.01'
            },
            {
              label: 'City',
              value: 'Beijing'
            },
            {
              label: 'To work',
              value: '2017.07'
            }
          ]}
        />
        <Divider />
        <Descriptions
          colon=""
          title="Contact Information"
          column={1}
          labelStyle={{ width: 100 }}
          data={[
            {
              label: 'Telephone',
              value: '+86 136-6333-2888'
            },
            {
              label: 'Email',
              value: '123456789@163.com'
            },
            {
              label: 'Website',
              value: <Link to="/">https://123456789/design.com/</Link>
            }
          ]}
        />
      </Drawer>
    </div>
  )
}
```

## 挂载节点

可以通过 `getPopupContainer` 指定抽屉挂载的父级节点。

```jsx live
function Demo() {
  const [visible, setVisible] = React.useState(false)
  const refWrapper = React.useRef(null)
  const wrapperStyle = {
    width: '100%',
    height: 300,
    backgroundColor: 'var(--bg-color-component)',
    position: 'relative',
    overflow: 'hidden',
    lineHeight: '300px',
    textAlign: 'center'
  }
  return (
    <div ref={refWrapper} style={wrapperStyle}>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open
      </Button>
      <Drawer
        title="Basic"
        visible={visible}
        getPopupContainer={() => refWrapper && refWrapper.current}
        footer={null}
        onOk={() => {
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <div style={{ textAlign: 'left' }}>Here is an example text.</div>
      </Drawer>
    </div>
  )
}
```

## API

### Drawer

| 参数名 | 描述 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoFocus | 是否默认聚焦第一个可聚焦元素，只在 `focusLock` 开启时生效。 | boolean | `true` | 2.13.0 |
| closable | 是否显示右上角关闭按钮 | boolean | `true` | - |
| confirmLoading | 确认按钮是否为加载中状态 | boolean | `-` | - |
| escToExit | 按 `ESC` 键关闭 | boolean | `true` | 2.10.0 |
| focusLock | 是否将焦点锁定在弹出框内。 | boolean | `true` | 2.13.0 |
| mask | 是否显示遮罩 | boolean | `true` | - |
| maskClosable | 点击蒙层是否可以关闭 | boolean | `true` | - |
| mountOnEnter | 是否在初次打开对话框时才渲染 dom。 | boolean | `true` | - |
| unmountOnExit | 是否在隐藏的时候销毁 DOM 结构 | boolean | `-` | - |
| visible | 是否显示弹出框 | boolean | `-` | - |
| zIndex | 设置抽屉的 zIndex | number | `-` | 2.42.0 |
| placement | 抽屉的方向 `top` `right` `bottom` `left` | 'top' \| 'right' \| 'bottom' \| 'left' | `right` | - |
| cancelText | 取消按钮文案 | ReactNode | `-` | - |
| closeIcon | 自定义右上角关闭按钮 | ReactNode | `-` | 2.49.0 |
| footer | 自定义按钮确认和取消按钮，为 null 的话没有按钮组 | ReactNode | `-` | - |
| okText | 确认按钮文案 | ReactNode | `-` | - |
| title | 弹出框的标题（设置为 null 时，不显示标题栏） | ReactNode | `-` | - |
| bodyStyle | 内容区域的样式 | CSSProperties | `-` | 2.9.0 |
| cancelButtonProps | 取消按钮的 props | ButtonProps | `-` | 2.26.0 |
| className | 节点类名 | string \| string[] | `-` | - |
| headerStyle | 头部的样式 | CSSProperties | `-` | 2.9.0 |
| height | 抽屉的高度，`placement`为 `top` `bottom` 时生效 | string \| number | `250` | - |
| maskStyle | 设置遮罩层的样式 | CSSProperties | `-` | - |
| okButtonProps | 确认按钮的 props | ButtonProps | `-` | 2.26.0 |
| style | 节点样式 | CSSProperties | `-` | - |
| width | 抽屉的宽度，`placement`为 `left` `right` 时生效 | string \| number | `250` | - |
| wrapClassName | 设置外层容器的类名 | string \| string[] | `-` | - |
| afterClose | 抽屉关闭之后的回调 | () => void | `-` | - |
| afterOpen | 抽屉打开之后的回调 | () => void | `-` | - |
| getChildrenPopupContainer | 抽屉里的弹出框 `Select` `Tooltip` 等挂载的容器，默认挂载在对话框内。 | (node: HTMLElement) => Element | `-` | - |
| getPopupContainer | 指定弹出框挂载的父节点 | () => Element | `() => document.body` | - |
| onCancel | 关闭弹出框的回调 | (e: MouseEvent \| Event) => void | `-` | - |
| onOk | 点击确认按钮的回调 | (e: Event) => void | `-` | - |
