---
sidebar_position: 1
---

# 链接 Link

链接的基本样式。

## 基础用法

与按钮相比，链接不太突出，因此通常将其用作可选操作。

```jsx live
function Demo() {
  return (
    <Space size={40}>
      <Link href="#"> Link </Link>
      <Link href="#" disabled>
        Link
      </Link>
    </Space>
  )
}
```

## 其他状态

失败、警告、成功等其他状态下操作，可出现不同样式的链接。

```jsx live
function Demo() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 100px)',
        gridColumnGap: 24
      }}
    >
      <Link href="#" status="error">
        Error Link
      </Link>
      <Link href="#" status="error" disabled>
        Error Link
      </Link>
      <Link href="#" status="success">
        Success Link
      </Link>
      <Link href="#" status="success" disabled>
        Success Link
      </Link>
      <Link href="#" status="warning">
        Warning Link
      </Link>
      <Link href="#" status="warning" disabled>
        Warning Link
      </Link>
    </div>
  )
}
```

## 图标

通过 `Icon` 属性设置带图标的链接，设置为 `true`时候显示默认图标。

```jsx live
function Demo() {
  return (
    <Space size={0} direction="vertical">
      <Space size="large">
        <Link href="#" icon>
          Hyperlinks
        </Link>
        <Link href="#" icon disabled>
          Hyperlinks
        </Link>
      </Space>
      <Space size="large">
        <Link href="#" icon={<IconEdit />}>
          Hyperlinks
        </Link>
        <Link href="#" icon={<IconEdit />} disabled>
          Hyperlinks
        </Link>
      </Space>
    </Space>
  )
}
```

## 悬浮状态样式

可以通过 `hoverable` 属性设置是否在悬浮状态时隐藏底色。

```jsx live
function Demo() {
  return (
    <Space size={40}>
      <Link hoverable={false}> Link </Link>
      <Link hoverable={false} status="error">
        Link
      </Link>
    </Space>
  )
}
```

## 配合dropdown使用

配合下拉菜单实现带下拉选择的链接。

```jsx live
function Demo() {
  const Droplist = (
    <Menu>
      <Menu.Item key="1">Beijing</Menu.Item>
      <Menu.Item key="2">Shanghai</Menu.Item>
      <Menu.Item key="3">Guangzhou</Menu.Item>
      <Menu.Item disabled key="4">
        <Link disabled>Shenzhen</Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Dropdown droplist={Droplist} position="bl">
        <Link style={{ marginRight: 40 }}>
          City
          <IconDown style={{ fontSize: 12, marginLeft: 6 }} />
        </Link>
      </Dropdown>

      <Dropdown droplist={Droplist} position="bl" disabled>
        <Link>
          City
          <IconDown style={{ fontSize: 12, marginLeft: 6 }} />
        </Link>
      </Dropdown>
    </div>
  )
}
```

## API

### Link

| 参数名    | 描述                                     | 类型                              | 默认值 | 版本   |
| --------- | ---------------------------------------- | --------------------------------- | ------ | ------ |
| disabled  | 是否禁用                                 | boolean                           | `-`    | -      |
| hoverable | 悬浮状态是否有底色                       | boolean                           | `true` | 2.23.0 |
| status    | 不同状态                                 | 'error' \| 'success' \| 'warning' | `-`    | -      |
| className | 节点类名                                 | string \| string[]                | `-`    | -      |
| icon      | 显示图标，设置为 `true` 时展示默认图标。 | ReactNode \| boolean              | `-`    | -      |
| style     | 节点样式                                 | CSSProperties                     | `-`    | -      |
