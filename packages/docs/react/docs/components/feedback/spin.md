---
sidebar_position: 1
---

# 加载中 Spin

用于页面和区块的加载中状态 - 页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## 基础用法

一个简单的 loading 状态。

```jsx live
function Demo() {
  return <Spin />
}
```

## 点类型的指示符

通过 `dot`属性，可以展示点类型的指示符。

```jsx live
function Demo() {
  return <Spin dot />
}
```

## 容器中

可以给任意元素添加加载状态。容器默认是 `inline-block` 布局，当你需要撑满父级容器时，可以设置 `style=&#123;&#123; display: 'block' }}`。

```jsx live

function Demo() {
  const [loading, setLoading] = useState(true)
  return (
    <>
      <Button style={{ display: 'block', marginBottom: 24 }} onClick={() => setLoading(!loading)}>
        {`Loading: ${loading}`}
      </Button>
      <Space>
        <Spin loading={loading}>
          <Card style={{ width: '100%' }} title="Arco Card" extra={<Link> More </Link>}>
            ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around the world.
            Toutiao started out as a news recommendation engine and gradually evolved into a platform delivering content
            in various formats.
          </Card>
        </Spin>
        <Spin loading={loading}>
          <Card style={{ width: '100%' }} title="Arco Card" extra={<Link> More </Link>}>
            ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around the world.
            Toutiao started out as a news recommendation engine and gradually evolved into a platform delivering content
            in various formats.
          </Card>
        </Spin>
      </Space>
      <Spin loading={loading} style={{ display: 'block', marginTop: 8 }}>
        <Card title="Arco Card" extra={<Link> More </Link>}>
          ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around the world. Toutiao
          started out as a news recommendation engine and gradually evolved into a platform delivering content in
          various formats.
        </Card>
      </Spin>
    </>
  )
}
```

## 自定义描述文案

通过 `tip` 字段自定义加载时的文案。

```jsx live
function Demo() {
  return (
    <Spin tip="This may take a while..." loading>
      <Card style={{ width: 360 }} title="Delay 500ms" extra={<Link> More </Link>}>
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around the world. Toutiao
        started out as a news recommendation engine and gradually evolved into a platform delivering content in various
        formats.
      </Card>
    </Spin>
  )
}
```

## 延迟

通过 `delay` 延迟显示 loading，对状态切换进行防抖处理，有效避免状态快速切换时的屏幕闪烁。

```jsx live

function Demo() {
  const [loading, setLoading] = useState(true)
  return (
    <>
      <Button style={{ display: 'block', marginBottom: 24 }} onClick={() => setLoading(!loading)}>
        {`Loading: ${loading}`}
      </Button>
      <Spin delay={500} loading={loading}>
        <Card
          style={{ width: 360 }}
          title="Delay 500ms"
          extra={
            <a href="#" style={{ color: 'var(--color-link)', textDecoration: 'none' }}>
              More
            </a>
          }
        >
          ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around the world. Toutiao
          started out as a news recommendation engine and gradually evolved into a platform delivering content in
          various formats.
        </Card>
      </Spin>
    </>
  )
}
```

## 自定义指示符

通过指定 `icon` 可以指定自定义图标作为加载组件。

```jsx live
function Demo() {
  return (
    <Spin loading={true} size={30} icon={<IconLoading />}>
      <Card style={{ width: 360 }} title="Arco Card" extra={<Link> More </Link>}>
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around the world. Toutiao
        started out as a news recommendation engine and gradually evolved into a platform delivering content in various
        formats.
      </Card>
    </Spin>
  )
}
```

## 不同尺寸

设置 `size` 可以得到不同尺寸的加载图标。

```jsx live
function Demo() {
  return (
    <Space size={40}>
      <Spin size={20} />
      <Spin size={30} />
      <Spin size={40} />
    </Space>
  )
}
```

## API

### Spin

| 参数名    | 描述                                                          | 类型                | 默认值 | 版本   |
| --------- | ------------------------------------------------------------- | ------------------- | ------ | ------ |
| block     | 是否为块级元素                                                | boolean             | `-`    | 2.29.0 |
| dot       | 是否使用点类型的动画                                          | boolean             | `-`    | -      |
| loading   | 是否为加载状态（仅在 `Spin` 有子节点时生效）                  | boolean             | `-`    | -      |
| delay     | 延迟显示加载的时间 (ms)                                       | number              | `-`    | -      |
| size      | 加载动画的尺寸                                                | number              | `-`    | -      |
| element   | 自定义元素，非图标，不附带旋转效果。可用于设置为 gif 图片等。 | ReactNode           | `-`    | -      |
| icon      | 自定义图标，会自动旋转。                                      | ReactNode           | `-`    | -      |
| tip       | 加载的文案                                                    | string \| ReactNode | `-`    | -      |
| className | 节点类名                                                      | string \| string[]  | `-`    | -      |
| style     | 节点样式                                                      | CSSProperties       | `-`    | -      |
