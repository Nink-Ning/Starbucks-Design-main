---
sidebar_position: 1
---

# 按钮 Button

按钮是一种命令组件，可发起一个即时操作。

## 基本用法

按钮分为 主要按钮、次要按钮、虚线按钮、线形按钮和文本按钮五种。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="outline">Outline</Button>
      <Button type="text">Text</Button>
    </Space>
  )
}
```

## 图标按钮

Button 可以嵌入图标，在只设置图标而没有 children 时，按钮的高宽相等。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Button type="primary" icon={<IconPlus />} />
      <Button type="primary" icon={<IconDelete />}>
        Delete
      </Button>
    </Space>
  )
}
```

## 按钮形状

Button 有多种形状，`square` - 长方形 **(默认)**, `circle` - 圆形, `round` - 全圆角。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Button type="primary" icon={<IconPlus />} />
      <Button shape="circle" type="primary" icon={<IconPlus />} />
      <Button shape="round" type="primary">
        Primary
      </Button>
      <Button type="primary">Primary</Button>
    </Space>
  )
}
```

## 按钮尺寸

按钮使用小、中、大三档规格，高度分别为 `24px/32px/40px`。推荐及默认为中号。为保持 Arco API 兼容，`mini` 和 `small` 都对应 24px 小号按钮。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Button size="mini" type="primary">
        Mini
      </Button>
      <Button size="small" type="primary">
        Small
      </Button>
      <Button size="default" type="primary">
        Default
      </Button>
      <Button size="large" type="primary">
        Large
      </Button>
    </Space>
  )
}
```

## 按钮状态

按钮状态分为 警告，危险，成功 三种，可以与按钮类型同时生效，优先级高于按钮类型。

```jsx live
function Demo() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 100px)',
        gridRowGap: 24,
        gridColumnGap: 24
      }}
    >
      <Button type="primary" status="warning">
        Warning
      </Button>
      <Button status="warning">Warning</Button>
      <Button type="outline" status="warning">
        Warning
      </Button>
      <Button type="text" status="warning">
        Warning
      </Button>

      <Button type="primary" status="danger">
        Danger
      </Button>
      <Button status="danger">Danger</Button>
      <Button type="outline" status="danger">
        Danger
      </Button>
      <Button type="text" status="danger">
        Danger
      </Button>

      <Button type="primary" status="success">
        Success
      </Button>
      <Button status="success">Success</Button>
      <Button type="outline" status="success">
        Success
      </Button>
      <Button type="text" status="success">
        Success
      </Button>
    </div>
  )
}
```

## 禁用按钮

按钮的禁用状态。

```jsx live
function Demo() {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <Button disabled type="primary">
          Primary
        </Button>
        <Button disabled type="secondary">
          Secondary
        </Button>
        <Button disabled type="dashed">
          Dashed
        </Button>
        <Button disabled type="outline">
          Outline
        </Button>
        <Button disabled type="text">
          Text
        </Button>
      </Space>
      <Space size="large">
        <Button disabled type="primary" status="danger">
          Primary
        </Button>
        <Button disabled type="secondary" status="danger">
          Secondary
        </Button>
        <Button disabled type="dashed" status="danger">
          Dashed
        </Button>
        <Button disabled type="outline" status="danger">
          Outline
        </Button>
        <Button disabled type="text" status="danger">
          Text
        </Button>
      </Space>
      <Space size="large">
        <Button disabled type="primary" status="warning">
          Primary
        </Button>
        <Button disabled type="secondary" status="warning">
          Secondary
        </Button>
        <Button disabled type="dashed" status="warning">
          Dashed
        </Button>
        <Button disabled type="outline" status="warning">
          Outline
        </Button>
        <Button disabled type="text" status="warning">
          Text
        </Button>
      </Space>
      <Space size="large">
        <Button disabled type="primary" status="success">
          Primary
        </Button>
        <Button disabled type="secondary" status="success">
          Secondary
        </Button>
        <Button disabled type="dashed" status="success">
          Dashed
        </Button>
        <Button disabled type="outline" status="success">
          Outline
        </Button>
        <Button disabled type="text" status="success">
          Text
        </Button>
      </Space>
    </Space>
  )
}
```

## 加载中按钮

通过设置`loading`可以让一个按钮处于加载中状态。处于加载中状态的按钮不会触发点击事件。

```jsx live

function App() {
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)

  function onClickBtn1() {
    setLoading1(true)
    setTimeout(() => {
      setLoading1(false)
    }, 4000)
  }

  function onClickBtn2() {
    setLoading2(true)
    setTimeout(() => {
      setLoading2(false)
    }, 4000)
  }

  function onClickBtn3() {
    setLoading3(true)
    setTimeout(() => {
      setLoading3(false)
    }, 4000)
  }

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          rowGap: 24,
          columnGap: 24,
          marginLeft: 24
        }}
      >
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="secondary" loading>
          Loading
        </Button>
        <Button type="dashed" loading>
          Loading
        </Button>
        <Button type="primary" shape="circle" loading />
        <Button type="secondary" shape="circle" loading />
        <Button type="dashed" shape="circle" loading />
      </div>
      <Button type="primary" loading={loading1} onClick={onClickBtn1} style={{ margin: 24 }}>
        Click Me
      </Button>
      <Button type="primary" loading={loading2} onClick={onClickBtn2} style={{ margin: 24 }}>
        {!loading2 && <IconPlus />}Click Me
      </Button>
      <Divider style={{ width: 440, minWidth: 440 }}>loading fixed width</Divider>
      <Button type="primary" loadingFixedWidth loading={loading3} onClick={onClickBtn3} style={{ margin: 24 }}>
        Search
      </Button>
    </div>
  )
}
```

## 组合按钮

可用在同级多项操作，以按钮组合方式出现。

```jsx live

function Demo() {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <Button.Group>
          <Button>Publish</Button>
          <Button icon={<IconDown />} />
        </Button.Group>
        <Button.Group>
          <Button type="secondary">Publish</Button>
          <Button type="secondary" icon={<IconMore />} />
        </Button.Group>
      </Space>
      <Button.Group>
        <Button type="primary">Publish</Button>
        <Button type="primary" icon={<IconDown />} />
      </Button.Group>
      <Space size="large">
        <Button.Group>
          <Button type="primary" icon={<IconLeft />} shape="round" style={{ padding: '0 8px' }}>
            Prev
          </Button>
          <Button type="primary" shape="round" style={{ padding: '0 8px' }}>
            Next
            <IconRight />
          </Button>
        </Button.Group>
        <Button.Group>
          <Button type="primary" icon={<IconStar />} />
          <Button type="primary" icon={<IconMessage />} />
          <Button type="primary" icon={<IconSettings />} />
        </Button.Group>
        <Button.Group>
          <Button type="primary" icon={<IconStar />}>
            Favorite
          </Button>
          <Button type="primary" icon={<IconSettings />}>
            Setting
          </Button>
        </Button.Group>
      </Space>
    </Space>
  )
}
```

## 长按钮

按钮宽度随着容器宽度进行适配。

```jsx live
function Demo() {
  return (
    <Space
      style={{
        width: 360,
        border: '1px solid var(--color-border)',
        borderRadius: 4,
        padding: 20
      }}
      direction="vertical"
      size="large"
    >
      <Button type="primary" long>
        Primary
      </Button>
      <Button type="secondary" long>
        Secondary
      </Button>
      <Button type="dashed" long>
        Dashed
      </Button>
      <Button type="default" long>
        Default
      </Button>
      <Button type="text" long>
        Text
      </Button>
    </Space>
  )
}
```

## API

### Button

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | `-` |
| iconOnly | 只有图标，按钮宽高相等。如果指定 `icon` 且没有 children，`iconOnly` 默认为 true | boolean | `-` |
| loading | 按钮是否是加载状态 | boolean | `-` |
| loadingFixedWidth | 当 loading 的时候，不改变按钮的宽度。 | boolean | `-` |
| long | 按钮宽度随容器自适应。 | boolean | `-` |
| href | 添加跳转链接，设置此属性，button表现跟a标签一致 | string | `-` |
| target | a 链接的 target 属性，href 存在时生效 | string | `-` |
| htmlType | 按钮原生的 html type 类型 | 'button' \| 'submit' \| 'reset' | `button` |
| shape | 按钮形状，`circle` - 圆形， `round` - 全圆角， `square` - 长方形 | 'circle' \| 'round' \| 'square' | `square` |
| size | 按钮的尺寸 | 'mini' \| 'small' \| 'default' \| 'large' | `default` |
| status | 按钮状态 | 'warning' \| 'danger' \| 'success' \| 'default' | `default` |
| type | 按钮主要分为六种按钮类型：主要按钮、次级按钮、虚框按钮、文字按钮、线性按钮，`default` 为次级按钮。 | 'default' \| 'primary' \| 'secondary' \| 'dashed' \| 'text' \| 'outline' | `default` |
| icon | 设置按钮的图标 | ReactNode | `-` |
| anchorProps | a 链接的原生属性，href 存在时生效 | HTMLProps&lt;HTMLAnchorElement&gt; | `-` |
| className | 节点类名 | string \| string[] | `-` |
| style | 节点样式 | CSSProperties | `-` |
| onClick | 点击按钮的回调 | (e: Event) => void | `-` |
