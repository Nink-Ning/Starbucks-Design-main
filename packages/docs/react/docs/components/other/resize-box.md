---
sidebar_position: 1
---

# 伸缩框 ResizeBox

伸缩框组件。

## 基础用法

`ResizeBox` 伸缩框组件的基础使用。通过设置 `directions`，可以指定四条边中的哪几条边可以进行伸缩。

```jsx live
function Demo() {
  return (
    <div>
      <ResizeBox
        directions={['right', 'bottom']}
        style={{
          width: 500,
          minWidth: 100,
          maxWidth: '100%',
          height: 200,
          textAlign: 'center',
        }}
      >
        <Typography.Paragraph>We are building the future of content discovery and creation.</Typography.Paragraph>
        <Divider />
        <Typography.Paragraph>
          ByteDance's content platforms enable people to enjoy content powered by AI technology. We
          inform, entertain, and inspire people across language, culture and geography.
        </Typography.Paragraph>
        <Divider>ByteDance</Divider>
        <Typography.Paragraph>Yiming Zhang is the founder and CEO of ByteDance.</Typography.Paragraph>
      </ResizeBox>
    </div>
  );
};
```

## 定制伸缩杆内容

可通过属性 `resizeTriggers` 定制各个方向的伸缩杆的内容。

```jsx live
function Demo() {
  const TriggerContent = function ({ className }) {
    return (
      <div className={`resizebox-demo-custom-trigger ${className}`}>
        <div className="resizebox-demo-custom-trigger-line" />
      </div>
    );
  };

  return (
    <div>
      <ResizeBox
        directions={['right', 'bottom']}
        style={{
          width: 500,
          minWidth: 100,
          maxWidth: '100%',
          height: 200,
          textAlign: 'center',
        }}
        resizeTriggers={{
          right: <TriggerContent className="resizebox-demo-custom-trigger-vertical" />,
          bottom: <TriggerContent className="resizebox-demo-custom-trigger-horizontal" />,
        }}
      >
        <Typography.Paragraph>We are building the future of content discovery and creation.</Typography.Paragraph>
        <Divider />
        <Typography.Paragraph>
          ByteDance's content platforms enable people to enjoy content powered by AI technology. We
          inform, entertain, and inspire people across language, culture and geography.
        </Typography.Paragraph>
        <Divider>ByteDance</Divider>
        <Typography.Paragraph>Yiming Zhang is the founder and CEO of ByteDance.</Typography.Paragraph>
      </ResizeBox>
    </div>
  );
};
```

## 受控的高宽

`ResizeBox` 的高宽都支持受控，分别对应属性 `width` 和 `height`，通过 `onChange` 得到拖动中的高宽值。

```jsx live
function App() {
  const [width, setWidth] = React.useState(500);
  const [height, setHeight] = React.useState(200);
  return (
    <div>
      <ResizeBox
        directions={['right', 'bottom']}
        style={{
          minWidth: 100,
          maxWidth: '100%',
          textAlign: 'center',
        }}
        width={width}
        height={height}
        onMoving={(e, { width, height }) => {
          setWidth(width);
          setHeight(height);
        }}
      >
        <Typography.Paragraph>We are building the future of content discovery and creation.</Typography.Paragraph>
        <Divider />
        <Typography.Paragraph>
          ByteDance's content platforms enable people to enjoy content powered by AI technology. We
          inform, entertain, and inspire people across language, culture and geography.
        </Typography.Paragraph>
        <Divider>ByteDance</Divider>
        <Typography.Paragraph>Yiming Zhang is the founder and CEO of ByteDance.</Typography.Paragraph>
      </ResizeBox>
    </div>
  );
}
```

## 在布局中使用

Layout 组件中集成了 `ResizeBox` 组件，可以在 Layout 中使用可伸缩的侧边栏。

```jsx live
function Demo() {
  return (
    <div className="layout-basic-demo">
      <Layout>
        <Layout.Header>Header</Layout.Header>
        <Layout>
          <Layout.Sider
            resizeDirections={['right']}
            style={{
              minWidth: 150,
              maxWidth: 500,
              height: 200,
            }}
          >
            Sider
          </Layout.Sider>
          <Layout.Content>Content</Layout.Content>
        </Layout>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </div>
  );
};
```

## 面板分割

将一个面板分割成两个可以调整宽度或高度的两部分。用`direction`控制分割方向。

```jsx live

function App() {
  const [direction, setDirection] = useState('horizontal');
  return (
    <Space direction="vertical" size={20}>
      <Radio.Group
        type="button"
        value={direction}
        onChange={setDirection}
        options={['horizontal', 'vertical', 'horizontal-reverse', 'vertical-reverse']}
      />
      <ResizeBox.Split
        direction={direction}
        style={{
          height: 300,
          width: 300,
          border: '1px solid var(--color-border)',
        }}
        max={0.8}
        min={0.2}
        panes={[
          <Tag key="first" color="arcoblue">
            Fist
          </Tag>,
          <Tag key="second" color="green">
            Second
          </Tag>,
        ]}
      />
    </Space>
  );
}
```

## 面板分割嵌套

面板分割可以嵌套使用。

```jsx live
function Demo() {
  const rightPane = (
    <div>
      <ResizeBox.Split
        direction="vertical"
        style={{ height: 200 }}
        panes={[
          <Typography.Paragraph>Top</Typography.Paragraph>,
          <Typography.Paragraph>Bottom</Typography.Paragraph>,
        ]}
      ></ResizeBox.Split>
    </div>
  );

  return (
    <div>
      <ResizeBox.Split
        style={{
          height: 200,
          width: 500,
          border: '1px solid var(--color-border)',
        }}
        panes={[<Typography.Paragraph>Right</Typography.Paragraph>, rightPane]}
      ></ResizeBox.Split>
    </div>
  );
};
```

## 多个面板分割

可以通过 `SplitGroup` 进行多个面板分割，同时还支持快速收缩及手动收缩

```jsx live
function App() {
  const panes = [
    {
      size: 0.2,
      collapsible: {
        prev: true,
      },
    },
    {
      size: 0.4,
      min: '50px',
    },
    {
      resizable: false,
      collapsible: {
        prev: {
          // 自定义伸缩杆向前快速收缩触发器
          icon: <IconDoubleLeft />,
          onClick: (_, collapsed, status, activeIndex) => {
            console.log('快速收缩：', collapsed, status, activeIndex);
          },
        },
        next: {
          icon: <IconDoubleRight />,
          onClick: (_, collapsed, status, activeIndex) => {
            console.log('快速收缩：', collapsed, status, activeIndex);
          },
        },
      },
      // 自定义伸缩杆
      trigger: (prev, resize, next) => {
        return (
          <div className="resizebox-split-group-demo-trigger">
            {prev}
            {resize}
            {next}
          </div>
        );
      },
    },
    {},
  ];
  const verticalPanes = [
    {
      collapsible: true,
    },
    {
      min: 0.1,
      collapsible: {
        next: true,
      },
    },
    {},
  ];

  const HorizontalSplitGroup = () => {
    const [offsets, setOffsets] = useState([]);
    return (
      <ResizeBox.SplitGroup
        onMoving={(_, sizes) => setOffsets(sizes)}
        className="resizebox-split-group-demo-horizontal"
        panes={panes.map((obj, index) => ({
          content: (
            <div className="resizebox-split-group-demo-content">
              <Typography.Paragraph>
                <Typography.Paragraph>
                  <Typography.Text mark>pane {index}</Typography.Text>
                  <br />
                  <Typography.Text code>min：{obj.min || 0}</Typography.Text>
                  <br />
                  <Typography.Text code>size： {obj.size || 'not set'}</Typography.Text>
                  <br />
                  <Typography.Text code>offset：{offsets[index] || 'initial'}</Typography.Text>
                </Typography.Paragraph>
              </Typography.Paragraph>
            </div>
          ),
          ...obj,
        }))}
      />
    );
  };

  const VerticalSplitGroup = () => {
    return (
      <ResizeBox.SplitGroup
        className="resizebox-split-group-demo-vertical"
        direction="vertical"
        panes={verticalPanes.map((obj, index) => ({
          content: (
            <div className="resizebox-split-group-demo-content">
              <Typography.Text mark>pane {index}</Typography.Text>
            </div>
          ),
          ...obj,
        }))}
      />
    );
  };

  return (
    <ResizeBox.SplitGroup
      direction="vertical"
      className="resizebox-split-group-demo"
      panes={[
        {
          content: <HorizontalSplitGroup />,
          size: 0.4,
        },
        {
          content: <VerticalSplitGroup />,
        },
      ]}
    />
  );
}
```

## API

### ResizeBox

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|height|高度，受控属性|number |`-`|2.7.0|
|width|宽度，受控属性|number |`-`|2.7.0|
|component|伸缩框的 html 标签|string |`div`|-|
|directions|可以进行伸缩的边，有上、下、左、右可以使用，默认是右方向。|Array&lt;'left' \| 'right' \| 'top' \| 'bottom'> |`['right']`|-|
|className|节点类名|string \| string[] |`-`|-|
|resizeIcons|定制伸缩杆的图标，四个方向都支持定制。|&#123;top?: ReactNode;bottom?: ReactNode;left?: ReactNode;right?: ReactNode;} |`&#123;}`|-|
|resizeTriggers|定制伸缩杆的内容，四个方向都支持定制。|&#123;top?: ReactNode;bottom?: ReactNode;left?: ReactNode;right?: ReactNode;} |`&#123;}`|-|
|style|节点样式|CSSProperties |`-`|-|
|onMoving|拖拽中的回调|(e: MouseEvent, size: &#123; width: number; height: number }) => void |`-`|`size` in `2.7.0`|
|onMovingEnd|拖拽结束之后的回调|() => void |`-`|-|
|onMovingStart|开始拖拽之前的回调|() => void |`-`|-|

### ResizeBox.Split

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|disabled|禁用|boolean |`-`|-|
|component|分割框的 html 标签|string |`div`|-|
|direction|分割方向分为水平 `horizontal` 和垂直 `vertical`，默认是水平分割|'horizontal' \| 'vertical' \| 'horizontal-reverse' \| 'vertical-reverse' |`horizontal`|`reverse` in `2.35.0`|
|icon|定制伸缩杆的图标|ReactNode |`-`|-|
|trigger|定制伸缩杆的内容|ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|max|最大阈值|number \| string |`-`|-|
|min|最小阈值|number \| string |`-`|-|
|panes|面板，[firstPane, secondPane]|ReactNode[]  **(必填)**|`-`|-|
|size|分割的大小，可以是 0~1 代表百分比，或具体数值的像素，如 300px|number \| string |`0.5`|-|
|style|节点样式|CSSProperties |`-`|-|
|onMoving|拖拽中的回调|(e: MouseEvent, size: number \| string) => void |`-`|`size` in `2.14.0`|
|onMovingEnd|拖拽结束之后的回调|() => void |`-`|-|
|onMovingStart|开始拖拽之前的回调|() => void |`-`|-|
|onPaneResize|面板大小变化的回调|(paneContainers: HTMLElement[]) => void |`-`|2.25.0|

### ResizeBox.SplitGroup in `2.27.0`

|参数名|描述|类型|默认值|
|---|---|---|---|
|component|分割框的 html 标签|string |`div`|
|direction|分割方向分为水平 `horizontal` 和垂直 `vertical`，默认是水平分割|'horizontal' \| 'vertical' |`horizontal`|
|icon|定制伸缩杆的图标|ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|panes|面板|SplitGroupPane[]  **(必填)**|`-`|
|style|节点样式|CSSProperties |`-`|
|onMoving|拖拽中的回调, `size` 参数是各个面板占的像素值|(e: MouseEvent, size: string[], activeIndex: number) => void |`-`|
|onMovingEnd|拖拽结束之后的回调|(activeIndex: number) => void |`-`|
|onMovingStart|开始拖拽之前的回调|(activeIndex: number) => void |`-`|
|onPaneResize|面板大小变化的回调|(paneContainers: HTMLElement[]) => void |`-`|

### ResizeBox.SplitGroup.CollapsedConfig

|参数名|描述|类型|默认值|
|---|---|---|---|
|onClick|点击快速折叠的回调|(e, collapsed, activeIndex, direction: 'prev' \| 'next') => void |`-`|
|icon|快速折叠按钮的icon|ReactNode |`-`|

### ResizeBox.SplitGroup.Pane

|参数名|描述|类型|默认值|
|---|---|---|---|
|disabled|禁用，将不会展示伸缩杆。|boolean |`-`|
|resizable|是否支持拖拽伸缩|boolean |`true`|
|content|当前面板的内容|ReactNode  **(必填)**|`-`|
|collapsible|是否支持快速折叠;|\| boolean\| &#123;prev?: boolean \| CollapsedConfig;next?: boolean \| CollapsedConfig;} |`-`|
|max|最大阈值|number \| string |`-`|
|min|最小阈值，优先级比 `max`高，并且会影响相邻面板的阈值。|number \| string |`-`|
|size|分割的大小，可以是 0~1 代表百分比，或具体数值的像素，如 300px|number \| string |`-`|
|trigger|定制伸缩杆内容, 参数分别表示向前快速收缩、拖拽伸缩触发器、向后快速收缩的触发器|(prevNode: ReactNode, resizeNode: ReactNode, nextNode: ReactNode) => ReactNode |`-`|

