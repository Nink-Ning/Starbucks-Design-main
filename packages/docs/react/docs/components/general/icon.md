---
sidebar_position: 2
---

# Icon 图标

Starbucks UI 内置 Arco Design 图标集。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <IconHome style={{ fontSize: 24 }} />
      <IconUser style={{ fontSize: 24 }} />
      <IconSettings style={{ fontSize: 24 }} />
      <IconSearch style={{ fontSize: 24 }} />
      <IconStar style={{ fontSize: 24 }} />
    </Space>
  )
}
```

## API

| 属性      | 类型            | 默认值 | 说明       |
| --------- | --------------- | ------ | ---------- |
| style     | `CSSProperties` | —      | 自定义样式 |
| className | `string`        | —      | 自定义类名 |

## 使用 Icon 组件

也可以通过 `Icon` 组件的 `type` 属性使用图标（需配置 iconfont）：

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Icon type="home" style={{ fontSize: 24 }} />
      <Icon type="user" style={{ fontSize: 24 }} />
      <Icon type="settings" style={{ fontSize: 24 }} />
    </Space>
  )
}
```

> 完整图标列表请参考 [Arco Design Icon](https://arco.design/react/components/icon)。
