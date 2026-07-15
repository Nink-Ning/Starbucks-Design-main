---
sidebar_position: 1
---

# 间距 Space

设置组件之间的间距。

## 基本用法

间距组件的基本用法。

```jsx live
function Demo() {
  return (
    <Space>
      <Typography.Text>Space:</Typography.Text>
      <Tag color="arcoblue">Tag</Tag>
      <Button type="primary">Item1</Button>
      <Button type="primary">Item2</Button>
      <Switch defaultChecked />
    </Space>
  );
};
```

## 垂直间距

可以设置垂直方向排列的间距。

```jsx live
function Demo() {
  return (
    <Space direction="vertical">
      <Button type="primary">Item1</Button>
      <Button type="primary">Item2</Button>
      <Button type="primary">Item3</Button>
    </Space>
  );
};
```

## 尺寸

内置 4 个尺寸，`mini - 4px` `small - 8px (默认)` `medium - 16px` `large - 24px`，也支持传数字来自定义尺寸。

```jsx live

function App() {
  const [size, setSize] = useState('small');
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Radio.Group
          options={['mini', 'small', 'medium', 'large']}
          value={size}
          onChange={(value) => setSize(value)}
          type="button"
        />
      </div>
      <Space size={size}>
        <Button type="primary">Item1</Button>
        <Button type="primary">Item2</Button>
        <Button type="primary">Item3</Button>
      </Space>
    </div>
  );
}
```

## 对齐

内置 4 种对齐方式，分别为 `start` `center` `end` `baseline`，在水平模式下默认为 `center`。

```jsx live

function App() {
  const [align, setAlign] = useState('center');
  return (
    <div>
      <div style={{ marginBottom: 20, }} >
        <Radio.Group
          options={['start', 'center', 'end', 'baseline']}
          value={align}
          onChange={(value) => setAlign(value)}
          type="button"
        />
      </div>
      <Space
        align={align}
        style={{ backgroundColor: 'var(--color-fill-2)', padding: 10, }}
      >
        <Typography.Text>Space:</Typography.Text>
        <Button type="primary">Item2</Button>
        <Card title="Card">Card content</Card>
      </Space>
    </div>
  );
}
```

## 环绕间距

环绕类型的间距，四周都有间距，一般用于换行的场景。

```jsx live
function Demo() {
  return (
    <Space wrap size={[12, 18]}>
      <Button type="primary">Item1</Button>
      <Button type="primary">Item2</Button>
      <Button type="primary">Item3</Button>
      <Button type="primary">Item4</Button>
      <Button type="primary">Item5</Button>
      <Button type="primary">Item6</Button>
      <Button type="primary">Item7</Button>
      <Button type="primary">Item8</Button>
      <Button type="primary">Item9</Button>
      <Button type="primary">Item10</Button>
      <Button type="primary">Item11</Button>
      <Button type="primary">Item12</Button>
      <Button type="primary">Item13</Button>
      <Button type="primary">Item14</Button>
      <Button type="primary">Item15</Button>
      <Button type="primary">Item16</Button>
      <Button type="primary">Item17</Button>
      <Button type="primary">Item18</Button>
      <Button type="primary">Item19</Button>
      <Button type="primary">Item20</Button>
    </Space>
  );
};
```

## 分隔符

为相邻子元素设置分隔符。

```jsx live
function Demo() {
  return (
    <Space split={<Divider type="vertical" />}>
      <Link>Link 1</Link>
      <Link>Link 2</Link>
      <Link>Link 3</Link>
    </Space>
  );
};
```

## API

### Space

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|wrap|环绕类型的间距，用于折行的场景。|boolean |`-`|-|
|align|对齐方式|'start' \| 'end' \| 'center' \| 'baseline' |`-`|-|
|direction|间距方向|'vertical' \| 'horizontal' |`horizontal`|-|
|split|设置分隔符|ReactNode |`-`|2.22.0|
|className|节点类名|string \| string[] |`-`|-|
|size|尺寸。( `2.15.0` 开始支持数组形式 )|SpaceSize \| SpaceSize[] |`small`|-|
|style|节点样式|CSSProperties |`-`|-|

### SpaceSize

```js
export type SpaceSize = "mini" | "small" | "medium" | "large" | number;
```

