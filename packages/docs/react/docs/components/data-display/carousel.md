---
sidebar_position: 1
---

# 图片轮播 Carousel

用于展示多张图片、视频或内嵌框架等内容的循环播放，支持系统自动播放或用户手动切换。

## 基础用法

最基本的使用

```jsx live
function Demo() {
  const imageSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp'
  ]

  return (
    <Carousel style={{ width: 600, height: 240 }}>
      {imageSrc.map((src, index) => (
        <div key={index}>
          <img src={src} style={{ width: '100%' }} />
        </div>
      ))}
    </Carousel>
  )
}
```

## 自动切换

可以通过 `autoPlay` 设置是否自动切换。可设置 `moveSpeed`, `timingFunc` 实现不同切换幻灯片效果。

```jsx live
function Demo() {
  const imageSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp'
  ]

  return (
    <Carousel style={{ width: 600, height: 240 }} autoPlay={true} indicatorType="dot" showArrow="hover">
      {imageSrc.map((src, index) => (
        <div key={index}>
          <img src={src} style={{ width: '100%' }} />
        </div>
      ))}
    </Carousel>
  )
}
```

## 指示器

可以指定指示器类型：`dot` | `line` | `slider` 和位置 `left` | `right` | `top` | `bottom` | `outer`。

```jsx live
function App() {
  const imageSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp'
  ]

  const [indicatorType, setIndicatorType] = useState('dot')
  const [indicatorPosition, setIndicatorPosition] = useState('bottom')
  return (
    <>
      <Radio.Group
        type="button"
        name="type"
        value={indicatorType}
        onChange={(value) => {
          setIndicatorType(value)
        }}
        style={{ marginBottom: 10 }}
      >
        <Radio value="dot">dot</Radio>
        <Radio value="line">line</Radio>
        <Radio value="slider">slider</Radio>
      </Radio.Group>
      <br />
      <Radio.Group
        type="button"
        name="position"
        value={indicatorPosition}
        onChange={(value) => {
          setIndicatorPosition(value)
        }}
        style={{
          marginBottom: 20
        }}
      >
        <Radio value="left">left</Radio>
        <Radio value="right">right</Radio>
        <Radio value="top">top</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="outer">outer</Radio>
      </Radio.Group>
      <Carousel
        indicatorType={indicatorType}
        indicatorPosition={indicatorPosition}
        showArrow="never"
        style={{ width: 600, height: 240 }}
      >
        {imageSrc.map((src, index) => (
          <div key={index}>
            <img src={src} style={{ width: '100%' }} />
          </div>
        ))}
      </Carousel>
    </>
  )
}
```

## 切换方向

默认情况下，`direction` 为 `horizontal`。通过设置 `direction` 为 `vertical` 来使用垂直方向切换。

```jsx live
function Demo() {
  const imageSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp'
  ]

  return (
    <Carousel style={{ width: 600, height: 240 }} showArrow="never" direction="vertical" indicatorPosition="right">
      {imageSrc.map((src, index) => (
        <div key={index}>
          <img src={src} style={{ width: '100%' }} />
        </div>
      ))}
    </Carousel>
  )
}
```

## 卡片化

当页面宽度方向空间空余，但高度方向空间多余时，可指定 `animation` 为 `card` 使用卡片化风格。

```jsx live
function App() {
  const imageSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp'
  ]

  return (
    <Carousel
      autoPlay
      animation="card"
      showArrow="never"
      indicatorPosition="outer"
      style={{ width: '100%', height: 240 }}
    >
      {imageSrc.map((src, index) => (
        <div key={index} style={{ width: '60%' }}>
          <img src={src} style={{ width: '100%' }} />
        </div>
      ))}
    </Carousel>
  )
}
```

## 纵向卡片

当使用纵向卡片卡片时，需要手动指定容器的宽高来撑起空间，容器高度可以指定为 `图片高度 * 1.5`。在此模式下需要同时设定 `indicatorPosition="outer-right"`。

```jsx live
function App() {
  const imageSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp'
  ]

  return (
    <Carousel
      autoPlay
      animation="card"
      showArrow="never"
      indicatorPosition="outer-right"
      indicatorType="line"
      direction="vertical"
      style={{ height: 300, width: 600 }}
    >
      {imageSrc.map((src, index) => (
        <div key={index} style={{ height: 200 }}>
          <img src={src} style={{ height: '100%' }} />
        </div>
      ))}
    </Carousel>
  )
}
```

## 渐隐切换

指定 `animation` 为 `fade` 使用渐隐切换效果。

```jsx live
function App() {
  const imageSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp'
  ]

  return (
    <Carousel autoPlay animation="fade" showArrow="never" style={{ width: 600, height: 240 }}>
      {imageSrc.map((src, index) => (
        <div key={index} style={{ width: '100%' }}>
          <img src={src} style={{ width: '100%' }} />
        </div>
      ))}
    </Carousel>
  )
}
```

## 自定义子元素

因为动画是通过 CSS 实现，所以当使用`自定义组件`作为`Carousel`的子元素时，自定义组件需要支持`style`和`className`两个属性。

```jsx live
function App() {
  const imageSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp'
  ]

  function ImgComponent(props) {
    const { src, style, className } = props
    return (
      <div style={style} className={className}>
        <img src={src} style={{ width: '100%' }} />
      </div>
    )
  }

  return (
    <div>
      <Carousel style={{ width: 600, height: 240 }}>
        {imageSrc.map((src, index) => (
          <ImgComponent key={index} src={src} />
        ))}
      </Carousel>
    </div>
  )
}
```

## API

### Carousel

| 参数名 | 描述 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| miniRender | 是否仅渲染满足动画效果的最少数量的 children | boolean | `-` | 2.21.0 |
| currentIndex | 当前展示索引 | number | `0` | - |
| moveSpeed | 幻灯片移动速率(ms) | number | `500` | - |
| timingFunc | 过渡速度曲线, 默认匀速 transition-timing-function | string | `cubic-bezier(0.34, 0.69, 0.1, 1)` | - |
| animation | 切换动画 | 'slide' \| 'card' \| 'fade' | `slide` | - |
| direction | 幻灯片移动方向 | 'horizontal' \| 'vertical' | `horizontal` | - |
| indicatorPosition | 指示器位置 | 'bottom' \| 'top' \| 'left' \| 'right' \| 'outer' \| 'outer-right' | `bottom` | - |
| indicatorType | 指示器类型，可为小方块和小圆点或不显示 | 'line' \| 'dot' \| 'slider' \| 'never' | `dot` | - |
| showArrow | 切换箭头显示时机 | 'always' \| 'hover' \| 'never' | `always` | - |
| trigger | 幻灯片切换触发方式, click/hover 指示器 | 'click' \| 'hover' | `click` | - |
| arrowClassName | 切换箭头样式 | string \| string[] | `-` | - |
| autoPlay | 是否自动循环展示，或者传入 `&#123; interval: 自动切换的时间间隔(默认: 3000), hoverToPause: 鼠标悬浮时是否暂停自动切换(默认: true) }` 进行高级配置 (`2.14.0` 支持传入对象) | boolean \| &#123; interval?: number; hoverToPause?: boolean } | `-` | - |
| carousel | 用于获得带有 API 方法的 Carousel 引用。 | MutableRefObject&lt;CarouselHandle&gt; | `-` | 2.16.1 |
| className | 节点类名 | string \| string[] | `-` | - |
| icons | 自定义图标 | &#123;prev?: ReactNode;next?: ReactNode;} | `-` | 2.25.0 |
| indicatorClassName | 指示器的样式 | string \| string[] | `-` | - |
| style | 节点样式 | CSSProperties | `-` | - |
| onChange | 幻灯片发生切换时的回调函数。 | (index: number, prevIndex: number, isManual: boolean) => void | `-` | `isManual` in 2.4.0 |

### CarouselHandle

```js
export type CarouselHandle = {
  dom: HTMLElement;
  goto: (options: {
    /** 目标索引 */
    index: number;
    /** 是否为逆向 */
    isNegative?: boolean;
    /** 是否由用户触发，将决定 onChange 回调的第三个参数 */
    isManual?: boolean;
    /** 是否重置自动播放的 interval */
    resetAutoPlayInterval?: boolean;
  }) => void;
};
```

## 常见问题

### 动画结束后闪动

如果子元素是透明的，`Carousel` 翻页完成之后可能出现由于浏览器渲染导致的闪动问题，此时可以尝试为子元素添加背景色解决。参考此 ISSUE。
