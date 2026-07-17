---
sidebar_position: 3
---

# Avatar 头像

用于展示用户头像。

```jsx live
function Demo() {
  return (
    <Space>
      <Avatar>Nink</Avatar>
      <Avatar style={{ backgroundColor: '#00754A' }}>凯</Avatar>
      <Avatar>
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=starbucks" alt="avatar" />
      </Avatar>
    </Space>
  )
}
```

## API

| 属性     | 类型                   | 默认值     | 说明     |
| -------- | ---------------------- | ---------- | -------- |
| size     | `number \| string`     | —          | 头像大小 |
| shape    | `'circle' \| 'square'` | `'circle'` | 头像形状 |
| children | `ReactNode`            | —          | 头像内容 |

> 完整 API 请参考 [Arco Design Avatar](https://arco.design/react/components/avatar)。
