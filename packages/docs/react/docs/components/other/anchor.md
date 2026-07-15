---
sidebar_position: 1
---

# 锚点 Anchor

通过锚点可快速找到信息内容在当前页面的位置。

## 基本用法

基本用法，随着页面滚动，锚点浮动在页面固定位置。

```jsx live
function Demo() {
  return (
    <Anchor
      offsetTop={60}
      style={{ backgroundColor: 'var(--color-bg-2)' }}
    >
      <Anchor.Link href="#Basic" title="Basic">
        <Anchor.Link href="#Static" title="Static">
          <Anchor.Link href="#Lineless-mode" title="Lineless mode" />
          <Anchor.Link href="#Affix" title="Affix" />
        </Anchor.Link>
      </Anchor.Link>
      <Anchor.Link href="#Scroll-boundary" title="Scroll boundary" />
      <Anchor.Link href="#Hash-mode" title="Hash mode" />
    </Anchor>
  );
};
```

## 横向 Anchor

横向 Anchor，不支持嵌套

```jsx live
function Demo() {
  return (
    <div>
      <Typography.Paragraph>Default</Typography.Paragraph>
      <Anchor
        affix={false}
        direction="horizontal"
      >
        <Anchor.Link href="#Basic" title="Basic" />
        <Anchor.Link href="#Static" title="Static" />
        <Anchor.Link href="#Lineless-mode" title="Lineless mode" />
        <Anchor.Link href="#Affix" title="Affix" />
        <Anchor.Link href="#Scroll-boundary" title="Scroll boundary" />
        <Anchor.Link href="#Hash-mode" title="Hash mode" />
      </Anchor>

      <Typography.Paragraph style={{marginTop: 32}}>Lineless mode</Typography.Paragraph>
      <Anchor
        affix={false}
        direction="horizontal"
        lineless
      >
        <Anchor.Link href="#Basic" title="Basic" />
        <Anchor.Link href="#Static" title="Static" />
        <Anchor.Link href="#Lineless-mode" title="Lineless mode" />
        <Anchor.Link href="#Affix" title="Affix" />
        <Anchor.Link href="#Scroll-boundary" title="Scroll boundary" />
        <Anchor.Link href="#Hash-mode" title="Hash mode" />
      </Anchor>
    </div>
  );
};
```

## 静态位置

设置 `affix=false` 不随着页面滚动，锚点处于固定位置。

```jsx live
function Demo() {
  return (
    <Anchor affix={false}>
      <Anchor.Link href="#Basic" title="Basic" />
      <Anchor.Link href="#Static" title="Static" />
      <Anchor.Link href="#Lineless-mode" title="Lineless mode" />
      <Anchor.Link href="#Affix" title="Affix" />
      <Anchor.Link href="#Scroll-boundary" title="Scroll boundary" />
      <Anchor.Link href="#Hash-mode" title="Hash mode" />
    </Anchor>
  );
};
```

## 无轴线模式

设置 `lineless` 时，可以使用无左侧轴线的锚点样式。

```jsx live
function Demo() {
  return (
    <Anchor affix={false} lineless>
      <Anchor.Link href="#Basic" title="Basic" />
      <Anchor.Link href="#Static" title="Static" />
      <Anchor.Link href="#Lineless-mode" title="Lineless mode" />
      <Anchor.Link href="#Affix" title="Affix" />
      <Anchor.Link href="#Scroll-boundary" title="Scroll boundary" />
      <Anchor.Link href="#Hash-mode" title="Hash mode" />
    </Anchor>
  );
};
```

## 固钉样式

示例中的锚点将会出现在页面右侧。

当设置 `affix` 为 `true` 时，锚点组件将会嵌套在固钉组件内。通过 `affixStyle` 属性可以设置 `Affix` 组件的样式。

```jsx live
function Demo() {
  return (
    <Anchor
      offsetBottom={40}
      affixStyle={{
        position: 'absolute',
        right: -170,
        top: '50%',
        zIndex: 1,
      }}
    >
      <Anchor.Link href="#Basic" title="Basic" />
      <Anchor.Link href="#Static" title="Static" />
      <Anchor.Link href="#Lineless-mode" title="Lineless mode" />
      <Anchor.Link href="#Affix" title="Affix" />
      <Anchor.Link href="#Scroll-boundary" title="Scroll boundary" />
      <Anchor.Link href="#Hash-mode" title="Hash mode" />
    </Anchor>
  );
};
```

## 设置锚点滚动偏移量

可以设置 `boundary` 来定制锚点滚动偏移量。

```jsx live
function Demo() {
  return (
    <Anchor affix={false} boundary="center">
      <Anchor.Link href="#Basic" title="Basic" />
      <Anchor.Link href="#Static" title="Static" />
      <Anchor.Link href="#Lineless-mode" title="Lineless mode" />
      <Anchor.Link href="#Affix" title="Affix" />
      <Anchor.Link href="#Scroll-boundary" title="Scroll boundary" />
      <Anchor.Link href="#Hash-mode" title="Hash mode" />
    </Anchor>
  );
};
```

## 点击锚点不记录历史

可以设置点击锚点而不改变浏览器历史。

```jsx live
function Demo() {
  return (
    <Anchor affix={false} hash={false}>
      <Anchor.Link href="#Basic" title="Basic" />
      <Anchor.Link href="#Static" title="Static" />
      <Anchor.Link href="#Lineless-mode" title="Lineless mode" />
      <Anchor.Link href="#Affix" title="Affix" />
      <Anchor.Link href="#Scroll-boundary" title="Scroll boundary" />
      <Anchor.Link href="#Hash-mode" title="Hash mode" />
    </Anchor>
  );
};
```

## API

### Anchor

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|affix|是否固定。当设置为 `true`时，锚点组件将会嵌套在固钉 组件内|boolean |`true`|-|
|animation|是否平滑滚动|boolean |`true`|-|
|hash|是否改变 hash，设置为 `false` 点击锚点不会改变页面 hash。|boolean |`true`|-|
|lineless|没有左侧轴线的样式。|boolean |`-`|-|
|offsetBottom|距离窗口底部达到指定偏移量后触发。 `Affix` 固钉组件的 `offsetBottom` 属性|number |`-`|-|
|offsetTop|距离窗口顶部达到指定偏移量后触发。即 `Affix` 固钉组件的 `offsetTop` 属性|number |`-`|-|
|targetOffset|容器中基准线的位置相对容器顶部的偏移量，在没有设置的时候，取值为滚动容器高度的一半。当锚点到达或离开基准线的时候会更新锚点的状态。|number |`-`|2.22.0|
|boundary|滚动边界值，设置该值为数字后，将会在距离滚动容器 boundary 距离时停止滚动。设置为 end, start, center，目标元素将会对应滚动到底部，顶部，中间位置。|number \| 'end' \| 'start' \| 'center' \| 'nearest' |`start`|-|
|direction|方向|'vertical' \| 'horizontal' |`vertical`|2.51.0|
|affixStyle|通过该属性可以设置 `Affix` 组件的样式|CSSProperties |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|scrollContainer|滚动容器。传入选择器或者dom元素。|string \| HTMLElement \| Window |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|onChange|滚动时锚点改变或点击锚点时触发|(newLink: string, oldLink: string) => void |`-`|-|
|onSelect|点击锚点时候触发|(newLink: string, oldLink: string) => void |`-`|-|

### Anchor.Link

|参数名|描述|类型|默认值|
|---|---|---|---|
|href|锚点链接|string |`#`|
|title|文本内容。可以是字符串或者自定义节点。|string \| ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

