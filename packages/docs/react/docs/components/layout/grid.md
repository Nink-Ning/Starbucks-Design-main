---
sidebar_position: 1
---

# 栅格 Grid

栅格可以有效的保证页面的一致性、逻辑性、加强团队协作和统一。

## 基本用法

展示了最基本的 24 等分应用。

```jsx live
function Demo() {
  return (
    <div style={{ width: '100%' }} className="grid-demo-background">
      <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Grid.Col span={24}>
          <div>24 - 100%</div>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Grid.Col span={12}>
          <div>12 - 50%</div>
        </Grid.Col>
        <Grid.Col span={12}>
          <div>12 - 50%</div>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Grid.Col span={8}>
          <div>8 - 33.33%</div>
        </Grid.Col>
        <Grid.Col span={8}>
          <div>8 - 33.33%</div>
        </Grid.Col>
        <Grid.Col span={8}>
          <div>8 - 33.33%</div>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Grid.Col span={6}>
          <div>6 - 25%</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>6 - 25%</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>6 - 25%</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>6 - 25%</div>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="grid-demo">
        <Grid.Col span={4}>
          <div>4 - 16.66%</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>4 - 16.66%</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>4 - 16.66%</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>4 - 16.66%</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>4 - 16.66%</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>4 - 16.66%</div>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};
```

## 栅格偏移

指定 `offset` 可以对栅格进行平移操作。

```jsx live
function Demo() {
  return (
    <div style={{ width: '100%' }}>
      <Grid.Row
        className="grid-demo"
        style={{ marginBottom: 16, backgroundColor: 'var(--color-fill-2)' }}
      >
        <Grid.Col span={8}>col - 8</Grid.Col>
        <Grid.Col span={8} offset={8}>
          col - 8 | offset - 8
        </Grid.Col>
      </Grid.Row>
      <Grid.Row
        className="grid-demo"
        style={{ marginBottom: 16, backgroundColor: 'var(--color-fill-2)' }}
      >
        <Grid.Col span={6} offset={8}>
          col - 6 | offset - 8
        </Grid.Col>
        <Grid.Col span={6} offset={4}>
          col - 6 | offset - 4
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="grid-demo" style={{ backgroundColor: 'var(--color-fill-2)' }}>
        <Grid.Col span={12} offset={8}>
          col - 12 | offset - 8
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};
```

## 栅格排序

指定 `push` 或者 `pull` 可以对栅格进行排序。

```jsx live
function Demo() {
  return (
    <div style={{ width: '100%' }}>
      <Grid.Row
        className="grid-demo"
        style={{ marginBottom: 16, backgroundColor: 'var(--color-fill-2)' }}
      >
        <Grid.Col span={8} push={16}>
          col - 8 | push - 16
        </Grid.Col>
        <Grid.Col span={16} pull={8}>
          col - 16 | pull - 8
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};
```

## 区块间隔

通过在 `Row` 上指定 `gutter` 可以增加栅格的区域间隔。

```jsx live
function Demo() {
  return (
    <div style={{ width: '100%' }}>
      <Divider orientation="left">Horizontal</Divider>
      <Grid.Row className="grid-gutter-demo" gutter={24}>
        <Grid.Col span={12}>
          <div>col - 12</div>
        </Grid.Col>
        <Grid.Col span={12}>
          <div>col - 12</div>
        </Grid.Col>
      </Grid.Row>
      <Divider orientation="left">Responsive</Divider>
      <Grid.Row className="grid-gutter-demo" gutter={{ md: 8, lg: 24, xl: 32 }}>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
      </Grid.Row>
      <Divider orientation="left">Horizontal and Vertical</Divider>
      <Grid.Row className="grid-gutter-demo" gutter={[24, 12]}>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};
```

## 水平布局

通过 `justify` 来进行水平布局。

```jsx live
function Demo() {
  const rowStyle = {
    marginBottom: 40,
    background: 'var(--color-fill-2)',
  };
  const titleStyle = {
    fontSize: 12,
    color: '#141f33',
  };

  return (
    <div style={{ width: '100%' }}>
      <p style={titleStyle}>
        <Typography.Text>容器左排列</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" justify="start" style={rowStyle}>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
      </Grid.Row>
      <p style={titleStyle}>
        <Typography.Text>容器居中排列</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" justify="center" style={rowStyle}>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
      </Grid.Row>
      <p style={titleStyle}>
        <Typography.Text>容器右排列</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" justify="end" style={rowStyle}>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
      </Grid.Row>
      <p style={titleStyle}>
        <Typography.Text>容器分散排列</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" justify="space-around" style={rowStyle}>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
      </Grid.Row>
      <p style={titleStyle}>
        <Typography.Text>容器等距排列</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" justify="space-between" style={rowStyle}>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};
```

## 垂直布局

通过 `align` 来进行垂直布局。

```jsx live
function Demo() {
  const rowStyle = {
    marginBottom: 40,
    backgroundColor: 'var(--color-fill-2)',
  };
  const titleStyle = {
    fontSize: 12,
    color: '#141f33',
  };

  return (
    <div style={{ width: '100%' }}>
      <p style={titleStyle}>
        <Typography.Text>垂直顶部对齐</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" align="start" style={rowStyle}>
        <Grid.Col span={6} style={{ height: 90, lineHeight: '90px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 48, lineHeight: '48px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 120, lineHeight: '120px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 60, lineHeight: '60px' }}>
          <div>col - 6</div>
        </Grid.Col>
      </Grid.Row>
      <p style={titleStyle}>
        <Typography.Text>垂直居中对齐</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" align="center" style={rowStyle}>
        <Grid.Col span={6} style={{ height: 90, lineHeight: '90px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 48, lineHeight: '48px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 120, lineHeight: '120px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 60, lineHeight: '60px' }}>
          <div>col - 6</div>
        </Grid.Col>
      </Grid.Row>
      <p style={titleStyle}>
        <Typography.Text>垂直底部对齐</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" align="end" style={rowStyle}>
        <Grid.Col span={6} style={{ height: 90, lineHeight: '90px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 48, lineHeight: '48px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 120, lineHeight: '120px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 60, lineHeight: '60px' }}>
          <div>col - 6</div>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};
```

## 排序

通过 `order` 来进行元素排序。

```jsx live
function Demo() {
  return (
    <div style={{ width: '100%' }}>
      <Grid.Row className="grid-demo">
        <Grid.Col span={6} order={4}>
          <div>1 col-order-4</div>
        </Grid.Col>
        <Grid.Col span={6} order={3}>
          <div>2 col-order-3</div>
        </Grid.Col>
        <Grid.Col span={6} order={2}>
          <div>3 col-order-2</div>
        </Grid.Col>
        <Grid.Col span={6} order={1}>
          <div>4 col-order-1</div>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};
```

## 响应式布局

预置六种响应尺寸, 分别为 `xs`, `sm`, `md`, `lg`, `xl`, `xxl`。

```jsx live
function Demo() {
  return (
    <Grid.Row className="grid-demo">
      <Grid.Col xs={2} sm={4} md={6} lg={8} xl={10} xxl={8}>
        Col
      </Grid.Col>
      <Grid.Col xs={20} sm={16} md={12} lg={8} xl={4} xxl={8}>
        Col
      </Grid.Col>
      <Grid.Col xs={2} sm={4} md={6} lg={8} xl={10} xxl={8}>
        Col
      </Grid.Col>
    </Grid.Row>
  );
};
```

## 其他属性的响应式

`span`, `offset`, `order`, `pull`, `push` 属性可以内嵌到 `xs`, `sm`, `md`, `lg`, `xl`, `xxl` 对象中使用。
比如 `xs=&#123;8}` 相当于 `xs=&#123;&#123; span: 8 }}`。

```jsx live
function Demo() {
  return (
    <div style={{ width: '100%' }}>
      <Grid.Row className="grid-demo">
        <Grid.Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
        </Grid.Col>
        <Grid.Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
        </Grid.Col>
        <Grid.Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};
```

## Flex 用法

通过设置 `Col` 组件的 `flex` 属性，可以任意配置 flex 布局。

```jsx live
function Demo() {
  return (
    <div style={{ width: '100%' }}>
      <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Grid.Col flex="100px">
          <div>100px</div>
        </Grid.Col>
        <Grid.Col flex="auto">
          <div>auto</div>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Grid.Col flex="100px">
          <div>100px</div>
        </Grid.Col>
        <Grid.Col flex="auto">
          <div>auto</div>
        </Grid.Col>
        <Grid.Col flex="100px">
          <div>100px</div>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Grid.Col flex={3}>
          <div>3 / 12</div>
        </Grid.Col>
        <Grid.Col flex={4}>
          <div>4 / 12</div>
        </Grid.Col>
        <Grid.Col flex={5}>
          <div>5 / 12</div>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};
```

## Grid 布局

基于 CSS 的 Grid 布局实现的布局组件，支持折叠，并且可以设置后缀节点，后缀节点会显示在一行的结尾。

```jsx live

function Demo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ width: '100%' }}>
        <div style={{ marginBottom: '20px' }}>
            <Typography.Text>折叠：</Typography.Text>
            <Switch checked={collapsed} onChange={setCollapsed}  />
        </div>
        <Grid collapsed={collapsed} cols={3} colGap={12} rowGap={16} className="grid-demo-grid">
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item" offset={1}>item | offset - 1</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item" span={3}>item | span - 3</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item" suffix>{
              ({ overflow }) => `suffix | overflow: ${!!overflow}`
            }</Grid.GridItem>
        </Grid>
    </div>
  );
};
```

## 响应式的 Grid 布局

Grid 组件的响应式配置格式为 `&#123; xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6, xxxl: 7 }`。

```jsx live

function Demo() {
  return (
    <div style={{ width: '100%' }}>
        <Grid cols={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }} colGap={12} rowGap={16} className="grid-responsive-demo">
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item" span={{ xl: 4, xxl: 6 }} suffix>
                suffix
            </Grid.GridItem>
        </Grid>
    </div>
  );
};
```

## API

### Row

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|div|开启这个选项 `&lt;Row>` 和 `&lt;Col>` 都会被当作 div 而不会附带任何 Grid 相关的类和样式|boolean |`-`|-|
|align|竖直对齐方式 ( `align-items` )|'start' \| 'center' \| 'end' \| 'stretch' |`start`|-|
|justify|水平对齐方式 (`justify-content`)|'start' \| 'center' \| 'end' \| 'space-around' \| 'space-between' |`start`|-|
|className|节点类名|string \| string[] |`-`|-|
|gutter|栅格间隔，单位是`px` 栅格间隔。可传入响应式对象写法 &#123; xs: 4, sm: 6, md: 12}，传入数组 [ 水平间距， 垂直间距 ] 来设置两个方向。|GridRowGutter \| Array&lt;GridRowGutter&gt; |`0`|vertical gutter in 2.5.0|
|style|节点样式|CSSProperties |`-`|-|

### Col

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|offset|栅格左侧的间隔格数，间隔内不可以有栅格|number |`-`|-|
|order|对元素进行排序|number |`-`|-|
|pull|对元素进行排序|number |`-`|2.20.0|
|push|对元素进行排序|number |`-`|2.20.0|
|span|栅格占位格数|number |`24`|-|
|className|节点类名|string \| string[] |`-`|-|
|flex|设置 flex 布局属性|FlexType |`-`|2.26.0|
|lg|>= 992px 响应式栅格|number \| &#123; [key: string]: any } |`-`|-|
|md|>= 768px 响应式栅格|number \| &#123; [key: string]: any } |`-`|-|
|sm|>= 576px 响应式栅格|number \| &#123; [key: string]: any } |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|xl|>= 1200px 响应式栅格|number \| &#123; [key: string]: any } |`-`|-|
|xs|&lt; 576px 响应式栅格|number \| &#123; [key: string]: any } |`-`|-|
|xxl|>= 1600px 响应式栅格|number \| &#123; [key: string]: any } |`-`|-|
|xxxl|>= 2000px 响应式栅格|number \| &#123; [key: string]: any } |`-`|2.40.0|

### Grid

|参数名|描述|类型|默认值|
|---|---|---|---|
|collapsed|是否折叠|boolean |`false`|
|collapsedRows|折叠时显示的行数|number |`1`|
|className|节点类名|string \| string[] |`-`|
|colGap|列与列之间的间距|number \| ResponsiveValue |`0`|
|cols|每一行展示的列数|number \| ResponsiveValue |`24`|
|rowGap|行与行之间的间距|number \| ResponsiveValue |`0`|
|style|节点样式|CSSProperties |`-`|

### GridItem

|参数名|描述|类型|默认值|
|---|---|---|---|
|suffix|是否是后缀元素|boolean |`false`|
|className|节点类名|string \| string[] |`-`|
|offset|左侧的间隔格数|number \| ResponsiveValue |`0`|
|span|跨越的格数|number \| ResponsiveValue |`1`|
|style|节点样式|CSSProperties |`-`|

### ResponsiveValue

|参数名|描述|类型|默认值|
|---|---|---|---|
|lg|>= 992px 响应式配置|number |`-`|
|md|>= 768px 响应式配置|number |`-`|
|sm|>= 576px 响应式配置|number |`-`|
|xl|>= 1200px 响应式配置|number |`-`|
|xs|&lt; 576px 响应式配置|number |`-`|
|xxl|>= 1600px 响应式配置|number |`-`|
|xxxl|>= 2000px 响应式栅格|number |`-`|

### GridRowGutter

```js
export type GridRowGutter =
  | number
  | Partial<Record<GridResponsiveBreakpoint, number>>;
```

### FlexType

```js
export type FlexType = string | number | "auto" | "none";
```

