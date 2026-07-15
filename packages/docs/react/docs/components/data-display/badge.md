---
sidebar_position: 1
---

# 徽标数 Badge

一般出现在图标或文字的右上角。提供及时、重要的信息提示。

## 基础用法

基础的用法。只需指定 `count`，即可显示徽标。

```jsx live
function Demo() {
  return (
    <Space size={40}>
      <Badge count={9}>
        <Avatar shape="square" />
      </Badge>
      <Badge count={9} dot dotStyle={{ width: 10, height: 10 }}>
        <Avatar shape="square" />
      </Badge>
      <Badge
        count={<IconClockCircle style={{ verticalAlign: 'middle', color: 'var(--color-text-2)' }} />}
        dotStyle={{
          height: 16,
          width: 16,
          fontSize: 14
        }}
      >
        <Avatar shape="square" />
      </Badge>
    </Space>
  )
}
```

## 独立使用

`children` 为空时，将会独立展示徽标。

```jsx live
function Demo() {
  return (
    <Space size={40}>
      <Badge count={2} />
      <Badge count={2} dotStyle={{ background: '#E5E6EB', color: '#86909C' }} />
      <Badge count={16} />
      <Badge maxCount={99} count={1000} />
    </Space>
  )
}
```

## 小红点

设置 `dot`，即可只显示小红点而不显示数字。`count > 0` 时才显示。

```jsx live
function Demo() {
  return (
    <Space size={40}>
      <Badge count={9} dot offset={[6, -2]}>
        <a href="#">Link</a>
      </Badge>
      <Badge count={9} dot offset={[2, -2]}>
        <IconNotification
          style={{
            color: '#888',
            fontSize: 18,
            verticalAlign: -3
          }}
        />
      </Badge>
    </Space>
  )
}
```

## 文本内容

设置 `text`，可设置自定义提示内容。

```jsx live
function Demo() {
  return (
    <Space size={40}>
      <Badge text="NEW">
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
      <Badge text="HOT">
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
    </Space>
  )
}
```

## 最大值

设置 `maxCount`，可以限制最大显示的徽标数值，超过将会加 `+` 后缀。`maxCount` 默认为 `99`。

```jsx live
function Demo() {
  return (
    <Space size={40}>
      <Badge count={100} maxCount={10}>
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
      <Badge count={100}>
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
      <Badge count={1000} maxCount={999}>
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
    </Space>
  )
}
```

## 状态点

设置 `status`，可以得到不同的状态点。`default - 默认` `processing - 进行中` `success - 成功` `warning - 提醒` `error - 错误`。

```jsx live
function Demo() {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <Badge status="default" />
        <Badge status="processing" />
        <Badge status="success" />
        <Badge status="warning" />
        <Badge status="error" />
      </Space>
      <Space size="large">
        <Badge status="default" text="Default" />
        <Badge status="processing" text="Processing" />
        <Badge status="success" text="Success" />
        <Badge status="warning" text="Warning" />
        <Badge status="error" text="Error" />
      </Space>
    </Space>
  )
}
```

## 颜色

我们提供多种预设色彩的徽标样式。如果预设值不能满足你的需求，`color` 字段也可以设置自定义色值。

```jsx live
function Demo() {
  const COLORS = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'arcoblue',
    'purple',
    'pinkpurple',
    'magenta',
    'gray'
  ]
  const COLORS_CUSTOM = [
    '#F53F3F',
    '#7816FF',
    '#00B42A',
    '#165DFF',
    '#FF7D00',
    '#EB0AA4',
    '#7BC616',
    '#86909C',
    '#B71DE8',
    '#0FC6C2',
    '#FFB400',
    '#168CFF',
    '#FF5722'
  ]

  return (
    <div>
      <div>
        {COLORS.map((color) => {
          return (
            <Badge key={color} color={color} text={color} style={{ marginRight: 24 }}>
              {' '}
            </Badge>
          )
        })}
      </div>
      <br />
      <div>
        {COLORS_CUSTOM.map((color) => {
          return (
            <Badge key={color} color={color} text={color} style={{ marginRight: 24 }}>
              {' '}
            </Badge>
          )
        })}
      </div>
    </div>
  )
}
```

## 动画效果

`count` 改变时候存在动画效果。

```jsx live

function Demo() {
  const [count, setCount] = useState(12);
  const [dot, setDot] = useState(true);

  return (
    <Space direction="vertical" size="large">
      <Space size="large">
        <Badge dot={dot} count={dot ? count : 0}>
          <Avatar shape="square"> </Avatar>
        </Badge>
        <Switch checked={dot} onChange={setDot}></Switch>
      </Space>
      <Space size="large">
        <Badge count={count}>
          <Avatar shape="square"> </Avatar>
        </Badge>
        <Button.Group>
          <Button icon={<IconPlus />} onClick={() => setCount((c) => c + 1)}></Button>
          <Button icon={<IconMinus />} onClick={() => setCount((c) => Math.max(c - 1, 0))}></Button>
        </Button.Group>
      </Space>
    </Space>
  )
}
```

## API

### Badge

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dot | 显示为小红点 | boolean | `-` |
| maxCount | 徽标最大显示数值，如果 count 超过这个数值会显示为 `$&#123;maxCount}+` | number | `99` |
| text | 自定义提示内容 | string | `-` |
| color | 内置的一些颜色 | \| 'red'\| 'orangered'\| 'orange'\| 'gold'\| 'lime'\| 'green'\| 'cyan'\| 'arcoblue'\| 'purple'\| 'pinkpurple'\| 'magenta'\| 'gray'\| string | `-` |
| status | 徽标的状态类型 | 'default' \| 'processing' \| 'success' \| 'warning' \| 'error' | `-` |
| count | 徽标显示的数字 | number \| ReactNode | `0` |
| className | 节点类名 | string \| string[] | `-` |
| dotClassName | 徽标的类名 | string \| string[] | `-` |
| dotStyle | 徽标的样式 | CSSProperties | `-` |
| offset | 设置徽标位置的偏移 | [number, number] | `-` |
| style | 节点样式 | CSSProperties | `-` |

## 常见问题

1. 如何在 `dot=true` 时设置不显示小红点？可以设置`count=0`。`count > 0` 的时候才会展示徽标。
