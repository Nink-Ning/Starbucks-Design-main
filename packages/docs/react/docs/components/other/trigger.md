---
sidebar_position: 1
---

# 触发器 Trigger

用于对元素添加 hover, click, focus 等事件，并且弹出下拉框。

## 基础用法

这个例子展示了触发器的最基础的使用。`Trigger` 组件默认是没有弹出框的样式的。以下示例均为官网添加的样式。

```jsx live
function App() {
  function Popup() {
    return (
      <div className="demo-trigger-popup" style={{ width: 300 }}>
        <Tooltip content="123" defaultPopupVisible>
          <span>123123</span>
        </Tooltip>
        <Skeleton />
      </div>
    );
  }

  return (
    <Space style={{ width: 1000, overflow: 'auto' }} size={40}>
      <Trigger
        popup={() => <Popup />}
        mouseEnterDelay={400}
        mouseLeaveDelay={400}
        position="bottom"
      >
        <Typography.Text style={{ marginRight: 20 }}>
          Hover me
        </Typography.Text>
      </Trigger>
      <Trigger  popup={() => <Popup />} trigger="click" position="bottom" classNames="zoomInTop">
        <Button>Click me</Button>
      </Trigger>
      <Trigger popup={() => <Popup />} trigger="focus" position="top" classNames="zoomInBottom">
        <Input style={{ width: 200 }} placeholder="Focus on me" />
      </Trigger>
    </Space>
  );
}
```

## 受控用法

这个例子展示了如何完全控制弹出层的展示和隐藏。
可以通过 `defaultPopupVisible` 设置默认的展开状态。

```jsx live
function App() {
  function Popup() {
    return (
      <div className="demo-trigger-popup" style={{ width: 300 }}>
        <Skeleton />
      </div>
    );
  }

  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);
  return (
    <Space size={40}>
      <Trigger
        popupVisible={visible}
        popup={() => <Popup />}
        trigger="click"
        classNames="zoomInTop"
        onVisibleChange={(visible) => {
          setVisible(visible);
        }}
      >
        <Button >Click Me (controlled)</Button>
      </Trigger>
      <Trigger
        popupVisible={visible3}
        popup={() => <Popup />}
        trigger="click"
        classNames="zoomInTop"
        onClickOutside={() => {
          setVisible3(false);
        }}
      >
        <Button
          onClick={() => {
            setVisible3(!visible3);
          }}
        >
          no onVisibleChange (controlled)
        </Button>
      </Trigger>
      <Trigger
        blurToHide={false}
        popupVisible={visible2}
        popup={() => <Popup />}
        trigger="focus"
        classNames="zoomInTop"
        onClickOutside={() => {
          setVisible2(false);
        }}
        onVisibleChange={(visible) => {
          setVisible2(visible);
        }}
      >
        <Input style={{ width: 200 }} placeholder="Focus Me (controlled)"></Input>
      </Trigger>
    </Space>
  );
}
```

```jsx live
class App extends React.Component {
  render() {
    const props = {
      getPopupContainer: () => document.querySelector('.popup-container'),
      title: '确认编辑该选项吗？',
      onOk: () => {
        Message.info({
          content: '你点击了确认',
        });
      },
      onCancel: () => {
        Message.error({
          content: '你点击了取消',
        });
      },
    };

    return (
      <div
        className="popup-container"
        directions={['right', 'bottom']}
        style={{
          width: 300,
          height: 300,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            width: 450,
            height: 300,
            position: 'relative',
          }}
        >
          <Popconfirm position="bottom" {...props} getPopupContainer={(node) => node.parentElement}>
            <Button style={{ margin: '0 200px' }}>popover</Button>
          </Popconfirm>
        </div>
      </div>
    );
  }
}
```

## 多层嵌套

弹出层可以嵌套在另一个弹出层内。

```jsx live
function App() {
  return (
    <Trigger
      popup={() => {
        return (
          <div className="demo-trigger-popup">
            <Trigger
              trigger="click"
              position="right"
              popup={() => (
                <div className="demo-trigger-popup" style={{ width: 300 }}>
                  <Skeleton />
                  <Typography.Text>Two</Typography.Text>

                  <Trigger
                    trigger="focus"
                    blurToHide={false}
                    position="right"
                    popup={() => (
                      <div className="demo-trigger-popup">
                        <Typography.Text>Three</Typography.Text>
                        <Skeleton />
                      </div>
                    )}
                  >
                    <Input placeholder="Focus Me" />
                  </Trigger>
                </div>
              )}
            >
              <Button>Click Me</Button>
            </Trigger>
          </div>
        );
      }}
    >
      <Button>Hover Me</Button>
    </Trigger>
  );
}
```

## 多个触发方式

通过`trigger`传入数组，可以设置多个触发方式。

```jsx live
function App() {
  function Popup() {
    return (
      <div className="demo-trigger-popup" style={{ width: 300 }}>
        <Skeleton />
      </div>
    );
  }

  return (
    <Space size={40}>
      <Trigger
        popup={() => <Popup />}
        trigger={['click', 'hover']}
        clickToClose={false}
        classNames="zoomInTop"
      >
        <Button>Click/Hover Me</Button>
      </Trigger>
      <Trigger
        popup={() => (
          <Typography.Paragraph className="demo-trigger-popup">
            This popup will be hidden when Input triggers the blur or click. If you don't want to
            hide it when blur, you can set blurToHide=false. If you don't want to hide when you
            click, you can set clickToClose=false.
          </Typography.Paragraph>
        )}
        trigger={['hover', 'click', 'focus']}
      >
        <Input style={{ width: 200 }} placeholder="Click/Hover/Focus Me" />
      </Trigger>
      <Trigger popup={() => <Popup />} trigger={['hover', 'focus']} blurToHide={false}>
        <Input style={{ width: 200 }} placeholder="Hover/Focus Me" />
      </Trigger>
    </Space>
  );
}
```

## 跟随鼠标显示弹出层

设置 `alignPoint` 属性，可以使弹出层出现在鼠标位置。你可能想要`trigger=click`时候，在范围内点击时，弹出层一直展示，并根据鼠标位置更新弹出层位置，可以查看下一个示例。

```jsx live
function App() {
  function Popup() {
    return (
      <div
        className="demo-trigger-popup"
        style={{
          width: 300,
        }}
      >
        <Skeleton />
      </div>
    );
  }

  const [trigger, setTrigger] = React.useState(['click']);
  return (
    <div>
      <Grid.Row align="center" style={{ marginBottom: 20 }}>
        <Typography.Text>Trigger</Typography.Text>
        <Select
          value={trigger}
          style={{ width: 300, margin: '0 20px' }}
          options={['click', 'hover', 'contextMenu']}
          onChange={setTrigger}
          mode="multiple"
        ></Select>
      </Grid.Row>
      <Trigger
        popup={() => <Popup />}
        alignPoint
        position="bl"
        popupAlign={{
          bottom: 8,
          left: 8,
        }}
        trigger={trigger}
      >
        <div className="demo-trigger-manual">
          <Typography.Text>Click</Typography.Text>
        </div>
      </Trigger>
    </div>
  );
}
```

## 更新位置

```jsx live

function App() {
  const [visible, setVisible] = React.useState(false);
  const triggerRef = React.useRef();
  return (
    <Trigger
      ref={triggerRef}
      alignPoint
      trigger="click"
      position="bl"
      popupVisible={visible}
      onClickOutside={() => {
        setVisible(false);
      }}
      popup={() => (
        <div className="demo-trigger-popup" style={{ width: 300 }}>
          <Skeleton />
        </div>
      )}
    >
      <div
        className="demo-trigger-manual"
        onClick={() => {
          if (visible) {
            triggerRef.current.update();
          } else {
            setVisible(true);
          }
        }}
      >
        <Typography.Text>Click</Typography.Text>
      </div>
    </Trigger>
  );
}
```

## 展示箭头元素

通过 `showArrow` 属性，可以展示默认的箭头元素。也可以通过 arrowProps 进行定制。

```jsx live
function App() {
  return (
    <div style={{ background: 'var(--color-fill-2)', padding: 40 }}>
      <Space size={40}>
        <Trigger
          showArrow
          trigger="click"
          position="bl"
          popup={() => (
            <div className="demo-trigger-popup" style={{ width: 300 }}>
              <Skeleton />
            </div>
          )}
        >
          <Button type="primary">
            Click Me
          </Button>
        </Trigger>
        <Trigger
          showArrow
          arrowProps={{
            style: {
              background: 'red',
            },
          }}
          trigger="click"
          position="bl"
          popup={() => (
            <div className="demo-trigger-popup">
              <Skeleton />
            </div>
          )}
        >
          <Button type="primary">Click Me（arrowProps）</Button>
        </Trigger>
      </Space>
    </div>
  );
}
```

## 设置弹窗位置偏移量

通过 `popupAlign` 属性，可以设置弹窗在原本位置的基础上进行额外的位置调整。

例如 `position=top`时， 设置 `popupAlign=&#123;top: 20}`，弹窗会向上移动 `20px`。设置 `popupAlign=&#123; top: [100, 20] }`，弹窗将会在水平方向移动 `100px`，并向上移动 `20px`。

```jsx live
function App() {
  function Popup() {
    return <Skeleton className="demo-trigger-popup" style={{ width: 300 }} />;
  }

  return (
    <div style={{ background: 'var(--color-fill-2)', padding: 40 }}>
      <Space size={[40, 10]} wrap>
        <Trigger
          trigger="click"
          position="top"
          popupAlign={{
            top: 20,
          }}
          popup={() => <Popup />}
        >
          <Button type="primary">
            Top
          </Button>
        </Trigger>
        <Trigger
          trigger="click"
          position="top"
          popupAlign={{
            top: [100, 20],
          }}
          popup={() => <Popup />}
        >
          <Button type="primary">
            Top offset [100, 20]
          </Button>
        </Trigger>
        <Trigger
          trigger="click"
          position="top"
          popupAlign={{
            top: [-100, 20],
          }}
          popup={() => <Popup />}
        >
          <Button type="primary">
            Top offset [-100, 20]
          </Button>
        </Trigger>
        <Trigger
          trigger="click"
          position="right"
          popupAlign={{
            right: 30,
          }}
          popup={() => <Popup />}
        >
          <Button type="primary">
            Right
          </Button>
        </Trigger>
        <Trigger
          trigger="click"
          position="right"
          popupAlign={{
            right: [30, 50],
          }}
          popup={() => <Popup />}
        >
          <Button type="primary">
            Right offset [30, 50]
          </Button>
        </Trigger>
        <Trigger
          trigger="click"
          position="right"
          popupAlign={{
            right: [30, -50],
          }}
          popup={() => <Popup />}
        >
          <Button type="primary">
            Right offset [30, -50]
          </Button>
        </Trigger>
      </Space>
    </div>
  );
}
```

## 滚动容器

通过设置 `updateOnScroll` 监听容器的滚动。

```jsx live
function App() {
  function Popup() {
    return <Skeleton className="demo-trigger-popup" style={{ width: 300 }} />;
  }

  return (
    <div
      style={{
        background: 'var(--color-fill-2)',
        padding: 40,
        height: 100,
        overflow: 'auto',
      }}
    >
      <div style={{ height: 200 }}>
        <Trigger trigger="click" position="bottom" popup={() => <Popup />} updateOnScroll>
          <Button type="primary" style={{ marginTop: 80 }}>
            Button
          </Button>
        </Trigger>
      </div>
    </div>
  );
}
```

## 到视口指定距离时调整定位

默认弹出层位置会根据视口边界进行定位及微调，`boundaryDistance` 参数可以设置到视口边界一定距离时即进行定位调整。仅在 autoFitPosition=true 且 alignPoint=false 生效。

根据 `position` 不同传入对应的 `boundaryDistance`。如 position='right' 传入 `boundaryDistance=&#123;right: 200, ['top' | 'bottom']: xxx}`，position='top' 传入 `boundaryDistance=&#123;top: 200, ['left' | 'right']: xxx}`

```jsx live
function App() {
  function Popup() {
    return <Skeleton className="demo-trigger-popup" style={{ width: 600 }} />;
  }

  return (
    <div>
      <Typography>
        滚动当前 demo 到视口顶部距离大于 200px 的位置，点击 button ，弹出层将会在 button 上方出现。隐藏弹出层后再向上滚动页面，直到 button 距离视口小于 200px 的位置，再次点击 button。 弹出层将会出现在 button 下方。
      </Typography>
      <Trigger trigger="click" position="top" popup={() => <Popup />} boundaryDistance={{top: 200}}>
        <Button type="primary" style={{ marginTop: 80 }}>
          Button (boundaryDistance: `top: 200`)
        </Button>
      </Trigger>
    </div>
  );
}
```

## API

### Trigger

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|alignPoint|弹出层跟随鼠标位置|boolean |`-`|-|
|autoAlignPopupMinWidth|自动对齐子元素的宽度设置弹出框的最小宽度|boolean |`-`|-|
|autoAlignPopupWidth|自动对齐子元素的宽度设置弹出框的宽度|boolean |`-`|-|
|autoFitPosition|是否根据空间自动调整弹出框的位置。|boolean |`true`|-|
|autoFixPosition|当内容发生变化导致内容区域尺寸发生变化，自动进行重新定位。|boolean |`true`|-|
|blurToHide|是否在触发节点失去焦点的时候关闭弹出框，仅在 `trigger` 中含有 `focus` 时生效|boolean |`true`|-|
|clickToClose|是否能通过点击触发节点来关闭弹出框。trigger 包含 click, contextMenu 时，默认为 true。否则为 false|boolean |`-`|-|
|containerScrollToClose|是否在容器滚动时关闭弹出框|boolean |`-`|2.34.0|
|defaultPopupVisible|默认弹出框开启或关闭|boolean |`-`|-|
|disabled|是否禁用|boolean |`-`|-|
|escToClose|是否允许按 `ESC` 键关闭弹出框。|boolean |`-`|-|
|mouseLeaveToClose|是否在鼠标移出触发节点和弹出层的时候关闭弹出层|boolean |`true`|2.22.0|
|popupHoverStay|是否在鼠标移出触发节点，移入弹出框时保留弹出框。|boolean |`true`|-|
|popupVisible|设置弹出框开启或关闭|boolean |`-`|-|
|showArrow|是否展示箭头元素|boolean |`-`|-|
|unmountOnExit|隐藏后是否销毁 DOM 结构|boolean |`true`|-|
|updateOnScroll|是否在容器滚动时更新弹出框的位置|boolean |`-`|2.32.0|
|focusDelay|focus 触发延时的毫秒数|number |`-`|-|
|mouseEnterDelay|mouseenter 触发延时的毫秒数|number |`100`|-|
|mouseLeaveDelay|mouseleave 触发延时的毫秒数|number |`100`|-|
|childrenPrefix|设置这个参数后，打开弹出后，children 上会添加一个名为 `$&#123;childrenPrefix}-open` 的类。|string |`-`|-|
|classNames|动画类名|string |`fadeIn`|-|
|position|弹出位置，一共有 12 个方位可供选择|\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb' |`bottom`|-|
|trigger|触发方式|\| 'hover'\| 'click'\| 'focus'\| 'contextMenu'\| Array&lt;'hover' \| 'click' \| 'focus' \| 'contextMenu'> |`hover`|-|
|arrowProps|箭头元素的所有 html 参数|HTMLAttributes&lt;HTMLDivElement&gt; |`-`|-|
|boundaryDistance|默认弹出层位置会根据视口边界进行定位及微调，此参数可以设置到视口边界一定距离时即进行定位调整。仅在 autoFitPosition=true 且 alignPoint=false 生效。|\| &#123; left?: number; bottom?: number }\| &#123; left?: number; top?: number }\| &#123; right?: number; bottom?: number }\| &#123; right?: number; top?: number } |`-`|2.59.0|
|className|节点类名|string \| string[] |`-`|-|
|clickOutsideToClose|是否在点击空白处（触发节点和弹出框以外的区域）时关闭弹出层。 关闭时会触发 `onVisibleChange`。默认是在冒泡阶段触发该逻辑，可设置 `&#123; capture: true }` 指定捕获阶段触发|boolean \| &#123; capture: boolean } |`true`|`&#123; capture: boolean }` in `2.55.0`|
|duration|动画过渡时间|number \| &#123; exit?: number; enter?: number; appear?: number } |`200`|-|
|onClickOutside|点击触发节点和弹出框以外的区域的回调。|Function |`-`|-|
|popupAlign|调整弹出框的位置，有四个属性值，`left`, `right`, `top`, `bottom`，分别表示向该方向移动几个像素。具体可查看 示例|&#123;left?: number \| [number, number];right?: number \| [number, number];top?: number \| [number, number];bottom?: number \| [number, number];} |`&#123;}`|-|
|popupStyle|弹出框（内部）的样式|CSSProperties |`-`|-|
|style|弹出框（外部）的样式|CSSProperties |`-`|-|
|getDocument|在该元素上执行 clickOutside，触发弹出框关闭|() => Element |`() => window.document`|-|
|getPopupContainer|设置弹出内容所插入的父元素|(node: HTMLElement) => Element |`-`|-|
|onClick|按钮点击事件（`trigger` 包含 `click` 时生效）|(e) => void |`-`|-|
|onVisibleChange|显示或隐藏时触发的回调|(visible: boolean) => void |`-`|-|
|popup|弹出框的内容|() => ReactNode |`-`|-|

### `onVisibleChange`的触发时机说明

- `trigger`包含`click`时
  1. 鼠标点击空白处，会触发`onVisibleChange`，隐藏弹出层。设置 `clickOutsideToClose=false` 可以阻止触发。
  2. 鼠标点击触发节点，例如示例中的 `Button`，会触发`onVisibleChange`，隐藏/显示弹出层。在弹出层展示状态下，如果设置 `clickToClose=false`，则再点击触发节点，将不会隐藏弹出层。

  **也可以不设置onVisibleChange，完全由外部控制是否显示。**

- `trigger`包含`contextMenu`时
  1. 鼠标点击空白处，会触发`onVisibleChange`，隐藏弹出层。设置 `clickOutsideToClose=false` 可以阻止触发。
  2. 在children上鼠标点击右键，会触发`onVisibleChange`，显示弹出层。

- `trigger` 包含 `hover` 时
  1. 鼠标从弹出层移出，并未在`mouseLeaveDelay`时间内移入触发节点，会触发`onVisibleChange`，隐藏弹出层。
  2. 鼠标从触发节点移出，并未在`mouseLeaveDelay`时间内移入弹出层，会触发`onVisibleChange`，隐藏弹出层。

  **如果设置了`popupHoverStay=false`，则鼠标无法移入弹出层。在trigger包含hover时，点击空白处不会隐藏弹窗，因为可能引起onVisibleChange被多次触发。可以在 onClickOutside 执行必要的逻辑 **

- `trigger` 包含 `focus` 时
  1. 触发节点失去焦点，就会触发`onVisibleChange`，隐藏弹出层。
  2. 当设置`blurToHide=false`时，点击空白处会触发`onVisibleChange`，隐藏弹出层。设置 `clickOutsideToClose=false` 可以阻止触发。

  **如果不期望失去焦点隐藏弹出层，可设置 `blurToHide=false`**

## 常见问题

1. 设置了 `getPopupContainer` 后，弹出层位置不对？
   组件默认 `autoFitPosition` 属性为 `true`，也就是说组件会根据弹出层的尺寸，在视口中的位置以及所挂载的父元素来自动调整弹出层的位置。
   例如设置 `position=top` ，但是上方空间不足，弹出层会被遮住，组件就会根据情况来判断是否将弹出层展示在触发元素的下方。
   如果设置了 `getPopupContainer`，弹出层的样式属性`left`最小为0，也就是最小距离父元素的左边界为0，避免超出父元素，导致被遮挡。

