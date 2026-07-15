---
sidebar_position: 1
---

# 分割线 Divider

划分内容区域，对模块做分隔。

## 基本用法

对不同章节的文本段落进行分割，默认为水平分割线，可在中间加入文字。

```jsx live
function Demo() {
  return (
    <>
      <div className="divider-demo">
        <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
        <Divider />
        <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
        <Divider
          style={{
            borderBottomStyle: 'dashed'
          }}
        />
        <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
        <Divider
          style={{
            borderBottomWidth: 2,
            borderBottomStyle: 'dotted'
          }}
        />
        <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
      </div>
      <div className="divider-demo" style={{ marginTop: 48 }}>
        <div className="divider-demo-flex-content">
          <span className="avatar">
            <IconFileImage />
          </span>
          <div className="content">
            <Typography.Title heading={6}>Image</Typography.Title>May 4, 2010
          </div>
        </div>
        <Divider className="half-divider" />
        <div className="divider-demo-flex-content">
          <span className="avatar">
            <IconUser />
          </span>
          <div className="content">
            <Typography.Title heading={6}>Avatar</Typography.Title>May 4, 2010
          </div>
        </div>
        <Divider className="half-divider" />
        <div className="divider-demo-flex-content">
          <span className="avatar">
            <IconPen />
          </span>
          <div className="content">
            <Typography.Title heading={6}>Icon</Typography.Title>May 4, 2010
          </div>
        </div>
      </div>
    </>
  )
}
```

## 带有文字的分割线

通过 `orientation` 指定分割线文字的位置。

```jsx live
function Demo() {
  const orientations = ['left', 'center', 'right']

  return (
    <div className="divider-demo">
      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
      <Divider orientation={orientations[0]}>Text</Divider>
      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
      <Divider orientation={orientations[1]}>Text</Divider>
      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
      <Divider orientation={orientations[2]}>Text</Divider>
    </div>
  )
}
```

## 竖直分割线

指定 `type` 为 `vertical` 即可使用竖直分割线。竖直分割线不能带文字。

```jsx live
function Demo() {
  return (
    <div className="divider-demo">
      <Typography.Text>Item 1</Typography.Text>
      <Divider type="vertical" />
      <Typography.Text>Item 2</Typography.Text>
      <Divider type="vertical" />
      <Typography.Text>Item 3</Typography.Text>
    </div>
  )
}
```

## API

### Divider

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| orientation | 分割线文字的位置 | 'left' \| 'right' \| 'center' | `center` |
| type | 分割线的类型，是水平还是竖直，分别对应 `horizontal` 和 `vertical` | 'horizontal' \| 'vertical' | `horizontal` |
| className | 节点类名 | string \| string[] | `-` |
| style | 节点样式 | CSSProperties | `-` |
