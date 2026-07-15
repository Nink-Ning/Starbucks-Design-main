---
sidebar_position: 1
---

# 图片 Image

展示和预览图片。

## 基础用法

需要查看图片的时候，简单的设置 `src` 属性，就能获得一个有预览图片功能的组件。

```jsx live
function App() {
  return (
    <Image
      width={200}
      src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      alt="lamp"
    />
  );
}
```

## 显示 Caption

通过设置 `title` 和 `description` 可以将图片的标题和描述显示在图片内部或者底部，显示的位置通过 `footerPosition` 控制。

```jsx live
function App() {
  const src =
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp';
  const title = 'A user’s avatar';
  const description = 'Present by Arco Design';
  return (
    <Space size={60} align="start">
      <Image width={200} src={src} title={title} description={description} alt="lamp" />
      <Image
        width={200}
        src={src}
        title={title}
        description={description}
        footerPosition="outer"
        alt="lamp"
      />
    </Space>
  );
}
```

## 额外操作

额外操作通过 `actions` 设置，默认情况下水平排列，如果您的操作按钮比较多，我们也提供了 `simple` 模式将按钮收入一个下拉框中，但是需要注意的是在 `simple` 模式下，描述将不显示。

```jsx live
function DemoImage(props) {
  const [visible, setVisible] = React.useState(false);
  return (
    <Image
      src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      title="A user’s avatar"
      description="Present by Arco Design"
      actions={[
        <button
          key="1"
          className="image-demo-action-item"
          onClick={(e) => {
            setVisible(true);
          }}
        >
          <IconEye />
        </button>,
        <button
          key="2"
          className="image-demo-action-item"
          onClick={(e) => {
            console.log('download');
          }}
        >
          <IconDownload />
        </button>,
        <Tooltip key="3" content="A user’s avatar">
          <button className="image-demo-action-item">
            <IconInfoCircle />
          </button>
        </Tooltip>,
      ]}
      previewProps={{
        visible,
        onVisibleChange: (e) => {
          setVisible(false);
        },
      }}
      {...props}
    />
  );
}
```

## 错误状态

当加载图片失败的时候显示的内容。

```jsx live
function App() {
  return (
    <Space size={20}>
      <Image width={400} height={300} src="some-error.png" alt="some-error" />
      <Image
        width={400}
        height={300}
        src="some-error.png"
        alt="This is a picture of humans eating ice cream. The humans on the screen are very happy just now. The ice cream is green, it seems to be flavored with matcha. The gender of the human is unknown. It has very long hair and the human hair is brown."
      />
    </Space>
  );
}
```

## 加载状态

默认情况下，加载效果是不显示的，可通过设置 `loader=true` 显示默认加载效果。如果默认加载效果不符合需求。还可以通过 `loaderClassName` 自行设置加载样式。

```jsx live
function App() {
  const [timestamp, setTimestamp] = React.useState('');
  return (
    <div>
      <div>
        <Button
          type="primary"
          onClick={() => {
            setTimestamp(Date.now());
          }}
          style={{ marginBottom: 20 }}
        >
          reload
        </Button>
      </div>
      <Space size={20}>
        <Image
          width={200}
          height={200}
          src={`//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}`}
          loader={true}
          alt="lamp1"
        />
        <Image
          width={200}
          height={200}
          src={`//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}`}
          loaderClassName="image-demo-loader-animate"
          alt="lamp2"
          style={{ marginLeft: 67 }}
        />
      </Space>
    </div>
  );
}
```

## 渐进加载

大图可通过给 `loader` 传递一个小一些的图片，让其在原图未被加载成功时显示，以此来模拟渐进加载。

```jsx live
function App() {
  const [timestamp, setTimestamp] = React.useState('');
  return (
    <div>
      <div>
        <Button
          type="primary"
          onClick={() => {
            setTimestamp(Date.now());
          }}
          style={{ marginBottom: 20 }}
        >
          reload
        </Button>
      </div>
      <Image
        width={200}
        src={`//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}`}
        loader={
          <img
            width={200}
            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
            style={{
              filter: 'blur(5px)',
            }}
          />
        }
        alt="lamp"
      />
    </div>
  );
}
```

## 自定义预览控制条

通过设置 `actionsLayout` 可以调整预览控制条中功能按钮的顺序，同时可以过滤功能按钮，只有在 actionsLayout 中的按钮才会出现。其中 `extra` 代表 `actions` 中的按钮，而且 `actions` 中的 `key` 也支持单独拿出来排序。

```jsx live
function App() {
  return (
    <Image
      width={200}
      src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      previewProps={{
        actions: [
          {
            key: 'download',
            content: <IconDownload />,
            name: 'Download',
          },
          {
            key: 'info',
            content: <IconInfoCircle />,
            name: 'Info',
            getContainer: (action) => {
              return <Tooltip content="A user’s avatar">{action}</Tooltip>;
            },
          },
        ],
        actionsLayout: ['info', 'rotateRight', 'zoomIn', 'zoomOut', 'extra'],
      }}
      alt="lamp"
    />
  );
}
```

## 多图预览

用 `&lt;Image.PreviewGroup>` 包裹 `&lt;Image>` 组件即可进行多图预览。

```jsx live
function App() {
  const srcList = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp',
  ];
  return (
    <div>
      <Space direction="vertical">
        <Image.PreviewGroup infinite>
          <Space>
            {srcList.map((src, index) => (
              <Image key={index} src={src} width={200} alt={`lamp${index + 1}`} />
            ))}
          </Space>
        </Image.PreviewGroup>
      </Space>
    </div>
  );
}
```

## 单独使用预览组件

`Image.Preview` 可单独使用，需要配置 `src`，并控制 `visible`。

```jsx live
function App() {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Click me to preview image
      </Button>
      <Image.Preview
        src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
        visible={visible}
        onVisibleChange={setVisible}
      />
    </div>
  );
}
```

## 单独使用多图预览组件

`Image.PreviewGroup` 可单独使用，需通过 `visible` 和 `onVisibleChange` 控制显隐。在图片的展示上分为两种场景，一是通过 `defaultCurrent` 指定第一张展示的图片；二是通过 `current` 和 `onChange` 以受控的方式控制当前显示的是第几张图片。

```jsx live
function App() {
  const [visible, setVisible] = React.useState(false);
  const srcList = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp',
  ];
  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Click me to preview multiple image
      </Button>
      <Image.PreviewGroup srcList={srcList} visible={visible} onVisibleChange={setVisible} />
    </div>
  );
}
```

## 挂载节点

可以通过 `getPopupContainer` 指定预览挂载的父级节点。

```jsx live
function App() {
  const wrapperStyle = {
    width: '100%',
    height: 400,
    backgroundColor: 'var(--color-fill-2)',
    position: 'relative',
    overflow: 'hidden',
    lineHeight: '400px',
    textAlign: 'center',
  };

  const ref = React.useRef();
  return (
    <div style={wrapperStyle} ref={ref}>
      <Image
        width={200}
        previewProps={{
          getPopupContainer: () => ref.current,
          closable: false,
        }}
        src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
        alt="lamp"
      />
    </div>
  );
}
```

## 懒加载

设置 `lazyload` 可以开启懒加载，当图片出现在视口才会进行加载。`lazyload` 属性基于 **IntersectionObserver API** 实现

```jsx live
function App() {
  const imageSize = { width: 380, height: 150 };
  const srcList = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-medical.png~tplv-uwbnlip3yd-png.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-automotive.png~tplv-uwbnlip3yd-png.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-tourism.png~tplv-uwbnlip3yd-png.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-finance.png~tplv-uwbnlip3yd-png.png',
  ];

  return (
    <Space direction="vertical" size={50} className="image-demo-wrapper">
      {srcList.map((src, key) => (
        <Image
          key={key}
          {...imageSize}
          src={src}
          alt="lamp"
          lazyload={{ threshold: 0.5 }}
          loader={<Skeleton image={{ style: imageSize }} text={false} animation />}
        />
      ))}
    </Space>
  );
}
```

## API

&lt;div class="image-demo-props">

### Image

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|preview|是否开启预览|boolean |`true`|-|
|simple|是否开启简洁模式|boolean |`-`|-|
|index|使用 `Image.PreviewGroup`包裹时的预览索引，一般不用指定，当多图预览顺序出现问题时，可手动指定当前 `image` 的预览顺序|number |`-`|2.23.0|
|description|描述|string |`-`|-|
|src|图片获取地址|string |`-`|-|
|title|标题|string |`-`|-|
|footerPosition|底部显示的位置|'inner' \| 'outer' |`inner`|-|
|error|error 状态下显示的内容|ReactNode |`-`|-|
|loader|加载过渡效果，为 true 显示默认加载效果|boolean \| ReactNode |`-`|-|
|actions|额外操作|ReactNode[] |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|height|图片显示高度|string \| number |`-`|-|
|lazyload|开启懒加载 Intersection_Observer|boolean \| IntersectionObserverInit |`-`|2.47.0|
|loaderClassName|loader 的样式，将覆盖默认过渡效果|string \| string[] |`-`|-|
|onError|图片加载失败时触发|(ev: SyntheticEvent&lt;HTMLImageElement&gt;) =&gt; void |`-`|-|
|onLoad|图片加载完成时触发|(ev: SyntheticEvent&lt;HTMLImageElement&gt;) =&gt; void |`-`|-|
|previewProps|预览的配置项 （所有选项都是可选的）ImagePreviewProps|PartialImagePreviewProps |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|width|图片显示宽度|string \| number |`-`|-|

### Image.Preview

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|closable|是否显示关闭按钮|boolean |`true`|2.16.0|
|defaultVisible|默认是否可见，非受控|boolean |`-`|-|
|escToExit|按 `ESC` 键关闭预览|boolean |`true`|2.24.0|
|maskClosable|点击 mask 是否触发关闭|boolean |`true`|-|
|resetTranslate|开启位置修正|boolean |`true`|2.61.0|
|visible|是否可见，受控属性|boolean |`-`|-|
|breakPoint|触发 toolbar 切换为 simple 模式的宽度|number |`316`|-|
|src|图片获取地址, 在 Image 中默认是 Image 的 src|string  **(必填)**|`-`|-|
|imgAttributes|图片属性，透传至预览弹窗中的 `img` 标签上|Omit&lt;ImgHTMLAttributes&lt;HTMLImageElement&gt;, 'src'&gt; |`-`|2.39.0|
|extra|自定义图片预览区域的额外节点|ReactNode |`-`|2.53.0|
|actions|额外操作，ImagePreviewActionProps|ImagePreviewActionProps[] |`-`|-|
|actionsLayout|控制条的布局|string[] |`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|-|
|className|节点类名|string \| string[] |`-`|-|
|scales|在预览缩放时会使用当前数组中的缩放百分比。若不包含 `100%`，则会自动添加在最相邻的位置。|number[] |`[25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];`|2.30.0|
|style|节点样式|CSSProperties |`-`|-|
|getPopupContainer|弹出层挂载的节点|() => HTMLElement |`() => document.body`|2.16.0|
|imageRender|自定义 IMG 元素的渲染|(originalNode: ReactElement) => ReactNode |`-`|2.58.0|
|onVisibleChange|切换可见状态触发的事件|(visible: boolean, preVisible: boolean) => void |`-`|-|

### Image.PreviewGroup

从 `v2.14.0` 开始支持

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|closable|是否显示关闭按钮|boolean |`true`|2.16.0|
|defaultVisible|默认是否可见，非受控|boolean |`-`|-|
|escToExit|按 `ESC` 键关闭预览|boolean |`true`|2.24.0|
|forceRender|是否渲染图片列表，用于提前加载图片|boolean |`-`|2.58.0|
|infinite|是否无限循环|boolean |`-`|-|
|maskClosable|点击 mask 是否触发关闭|boolean |`true`|-|
|resetTranslate|开启位置修正|boolean |`true`|2.61.0|
|visible|是否可见，受控属性|boolean |`-`|-|
|breakPoint|触发 toolbar 切换为 simple 模式的宽度|number |`316`|-|
|current|当前展示的图片的下标 (受控属性)|number |`-`|-|
|defaultCurrent|第一张展示的图片的下标|number |`-`|-|
|imgAttributes|图片属性，透传至预览弹窗中的 `img` 标签上|Omit&lt;ImgHTMLAttributes&lt;HTMLImageElement&gt;, 'src'&gt; |`-`|2.39.0|
|extra|自定义图片预览区域的额外节点|ReactNode |`-`|2.53.0|
|actions|额外操作，ImagePreviewActionProps|ImagePreviewActionProps[] |`-`|-|
|actionsLayout|控制条的布局|string[] |`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|-|
|className|节点类名|string \| string[] |`-`|-|
|scales|在预览缩放时会使用当前数组中的缩放百分比。若不包含 `100%`，则会自动添加在最相邻的位置。|number[] |`[25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];`|2.30.0|
|srcList|图片列表 （设置了本属性之后，将不再收集 Image 子组件的图片信息）|string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|getPopupContainer|弹出层挂载的节点|() => HTMLElement |`() => document.body`|2.16.0|
|imageRender|自定义 IMG 元素的渲染|(originalNode: ReactElement) => ReactNode |`-`|2.58.0|
|onChange|切换图片触发的事件|(index: number) => void |`-`|-|
|onVisibleChange|切换可见状态触发的事件|(visible: boolean, preVisible: boolean) => void |`-`|-|

### ImagePreviewActionProps

`&lt;Image.Preview>` 中类型 `ImagePreviewActionProps` 详细参数。

|参数名|描述|类型|默认值|
|---|---|---|---|
|disabled|是否禁用|boolean |`-`|
|key|唯一标识|string  **(必填)**|`-`|
|name|名称|string |`-`|
|content|内容|ReactNode  **(必填)**|`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|getContainer|因为 content 只能定义内容，所以提供这个函数用于支持自定义外围元素，需要注意的是设置了 `getContainer`, 显示 `name` 的 `Tooltip` 将失效。|(actionElement: ReactNode) => ReactNode |`-`|

&lt;/div>

