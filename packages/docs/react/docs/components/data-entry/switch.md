---
sidebar_position: 1
---

# 开关 Switch

互斥性的操作控件，用户可打开或关闭某个功能。

## 基础用法

最基础的应用。

```jsx live
function Demo() {
  return <Switch />;
};
```

## 不同类型

提供默认开关样式。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Switch />
      <Switch defaultChecked />
    </Space>
  );
};
```

## 禁用状态

通过 `disabled` 设置 `Switch` 为禁用状态。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Switch disabled />
      <Switch checked disabled />
      <Switch className="arco-switch-large" disabled />
      <Switch className="arco-switch-large" checked disabled />
    </Space>
  );
};
```

## 不同尺寸的开关

通过指定 `size` 可以得到不同尺寸的开关。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Switch size="small" />
      <Switch />
      <Switch className="arco-switch-large" />
      <Switch size="small" defaultChecked />
      <Switch defaultChecked />
      <Switch className="arco-switch-large" defaultChecked />
    </Space>
  );
};
```

## 自定义文案

自定义开关打开（关闭）时需要显示的文字或者图标。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Switch checkedText="ON" uncheckedText="OFF" />
      <Switch checkedText={<IconCheck />} uncheckedText={<IconClose />} defaultChecked />
    </Space>
  );
};
```

## 带图标的开关

自定义开关按钮上显示的图标。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Switch checkedIcon={<IconCheck />} uncheckedIcon={<IconClose />} defaultChecked />
    </Space>
  );
};
```

## 加载中

开关处于加载中状态，不可点击。

```jsx live
function Demo() {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <Switch loading defaultChecked />
        <Switch loading />
        <Switch className="arco-switch-large" loading defaultChecked />
        <Switch className="arco-switch-large" loading />
      </Space>
      <Space size="large">
        <Switch loading size="small" defaultChecked />
        <Switch loading size="small" />
      </Space>
    </Space>
  );
};
```

## API

### Switch

|参数名|描述|类型|默认值|
|---|---|---|---|
|checked|开关是否打开|boolean |`-`|
|defaultChecked|默认是否选中|boolean |`-`|
|disabled|是否禁用|boolean |`-`|
|loading|加载中状态|boolean |`-`|
|size|开关的尺寸，有 `small` 和 `default` 可供选择；大号可通过 `className="arco-switch-large"` 使用。|'small' \| 'default' |`-`|
|type|样式类型|'circle' |`circle`|
|checkedIcon|开关打开时，按钮上显示的图标|ReactNode |`-`|
|checkedText|开关打开时的文案，small 尺寸不生效。|ReactNode |`-`|
|uncheckedIcon|开关关闭时，按钮上显示的图标|ReactNode |`-`|
|uncheckedText|开关关闭时的文案，small 尺寸不生效。|ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|onChange|点击开关的回调|(value: boolean, event) => void |`-`|
