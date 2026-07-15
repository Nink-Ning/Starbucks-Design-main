---
sidebar_position: 1
---

# 标签页 Tabs

将内容组织同一视图中，一次可查看一个视图内容。查看其他内容可切换选项卡查看。

## 基础用法

最简单的使用。

```jsx live
function Demo() {
  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  return (
    <Tabs defaultActiveTab="1">
      <Tabs.TabPane key="1" title="Tab 1">
        <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
      </Tabs.TabPane>
      <Tabs.TabPane key="2" title="Tab 2" disabled>
        <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
      </Tabs.TabPane>
      <Tabs.TabPane key="3" title="Tab 3">
        <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
      </Tabs.TabPane>
    </Tabs>
  );
};
```

## 带图标的页签

通过自定义的 title, 可以给页签加 icon。

```jsx live
function Demo() {
  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  return (
    <Tabs defaultActiveTab="1">
      <Tabs.TabPane
        key="1"
        title={
          <span>
            <IconCalendar style={{ marginRight: 6 }} />
            Tab 1
          </span>
        }
      >
        <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
      </Tabs.TabPane>
      <Tabs.TabPane
        key="2"
        title={
          <span>
            <IconClockCircle style={{ marginRight: 6 }} />
            Tab 2
          </span>
        }
        disabled
      >
        <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
      </Tabs.TabPane>
      <Tabs.TabPane
        key="3"
        title={
          <span>
            <IconUser style={{ marginRight: 6 }} />
            Tab 3
          </span>
        }
      >
        <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
      </Tabs.TabPane>
    </Tabs>
  );
};
```

## 位置

通过 `tabPosition` 设置位置。

```jsx live
function App() {

  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  const [position, setPosition] = useState('top');
  return (
    <div>
      <Radio.Group
        type="button"
        name="position"
        value={position}
        onChange={setPosition}
        style={{ marginBottom: 40 }}
        options={['left', 'top', 'bottom', 'right']}
      ></Radio.Group>

      <Tabs key="card" tabPosition={position}>
        <Tabs.TabPane key="1" title="Tab 1">
          <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="2" title="Tab 2">
          <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="3" title="Tab 3">
          <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
```

## 不同类型

使用 `type` 属性设置不同类型的页签。

```jsx live
function App() {

  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  const [type, setType] = useState('line');
  return (
    <div>
      <Radio.Group name="type" value={type} onChange={setType} style={{ marginBottom: 40 }}>
        <Radio value="line">line</Radio>
        <Radio value="card">card</Radio>
        <Radio value="card-gutter">card-gutter</Radio>
        <Radio value="text">text</Radio>
        <Radio value="rounded">rounded</Radio>
        <Radio value="capsule">capsule</Radio>
      </Radio.Group>

      <Tabs type={type}>
        <Tabs.TabPane key="1" title="Tab 1">
          <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="2" title="Tab 2" disabled>
          <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="3" title="Tab 3">
          <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="4" title="Tab 4">
          <Typography.Paragraph style={style}>Content of Tab Panel 4</Typography.Paragraph>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
```

## 附加

通过 `extra` 可以在页签的右侧添加额外内容。

```jsx live
function Demo() {
  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  return (
    <Tabs
      defaultActiveTab="1"
      extra={
        <Button size="small" type="secondary">
          Action
        </Button>
      }
    >
      <Tabs.TabPane key="1" title="Tab 1">
        <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
      </Tabs.TabPane>
      <Tabs.TabPane key="2" title="Tab 2" disabled>
        <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
      </Tabs.TabPane>
      <Tabs.TabPane key="3" title="Tab 3">
        <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
      </Tabs.TabPane>
    </Tabs>
  );
};
```

## 动态增减页签

动态增减页签。仅在 `type=card | card-gutter`的时候生效。

```jsx live
function App() {

  let count = 5;
  const style = {
    textAlign: 'center',
    marginTop: 20,
  };
  const initTabs = [...new Array(count)].map((x, i) => ({
    title: `Tab ${i + 1}`,
    key: `key${i + 1}`,
    content: `${i + 1}`,
  }));

  const [tabs, setTabs] = useState(initTabs);
  const [activeTab, setActiveTab] = useState('key2');

  const handleAddTab = () => {
    const newTab = {
      title: `New Tab${++count}`,
      key: `new key${count}`,
      content: `${count}`,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.key);
  };

  const handleDeleteTab = (key) => {
    const index = tabs.findIndex((x) => x.key === key);
    const newTabs = tabs.slice(0, index).concat(tabs.slice(index + 1));

    if (key === activeTab && index > -1 && newTabs.length) {
      setActiveTab(newTabs[index] ? newTabs[index].key : newTabs[index - 1].key);
    }

    if (index > -1) {
      setTabs(newTabs);
    }
  };

  return (
    <Tabs
      editable
      type="card-gutter"
      activeTab={activeTab}
      onAddTab={handleAddTab}
      onDeleteTab={handleDeleteTab}
      onChange={setActiveTab}
    >
      {tabs.map((x, i) => (
        <Tabs.TabPane destroyOnHide key={x.key} title={x.title}>
          <Typography.Paragraph
            style={style}
          >{`Content of Tab Panel ${x.content}`}</Typography.Paragraph>
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}
```

## 受控模式

通过 `activeTab` 开启受控模式。

```jsx live
function App() {

  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  const [activeTab, setActiveTab] = useState('1');
  return (
    <Tabs activeTab={activeTab} onChange={setActiveTab}>
      <Tabs.TabPane key="1" title="Tab 1">
        <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
      </Tabs.TabPane>
      <Tabs.TabPane key="2" title="Tab 2">
        <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
      </Tabs.TabPane>
      <Tabs.TabPane key="3" title="Tab 3">
        <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
      </Tabs.TabPane>
    </Tabs>
  );
}
```

## 嵌套使用

组件可以嵌套使用。

```jsx live
function Demo() {
  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  return (
    <Tabs tabPosition="left">
      <Tabs.TabPane key="tab1" title="Tab 1">
        <div>
          <Tabs>
            <Tabs.TabPane key="tab1" title="Tab 1">
              <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
            </Tabs.TabPane>
            <Tabs.TabPane key="tab2" title="Tab 2">
              <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
            </Tabs.TabPane>
            <Tabs.TabPane key="tab3" title="Tab 3">
              <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane key="tab2" title="Tab 2">
        <Typography.Paragraph>Content of Tab Panel 2</Typography.Paragraph>
      </Tabs.TabPane>
      <Tabs.TabPane key="tab3" title="Tab 3">
        <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
      </Tabs.TabPane>
    </Tabs>
  );
};
```

## 不同尺寸

使用 `size` 属性设置不同尺寸的页签。

```jsx live
function App() {

  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  const [type, setType] = useState('line');
  const [size, setSize] = useState('default');
  return (
    <div>
      <span style={{ marginRight: 20 }}>Size:</span>
      <Radio.Group name="size" value={size} onChange={setSize} style={{ marginBottom: 24 }}>
        <Radio value="mini">mini</Radio>
        <Radio value="small">small</Radio>
        <Radio value="default">default</Radio>
        <Radio value="large">large</Radio>
      </Radio.Group>
      <br />
      <span style={{ marginRight: 20 }}>Type:</span>
      <Radio.Group name="type" value={type} onChange={setType} style={{ marginBottom: 40 }}>
        <Radio value="line">line</Radio>
        <Radio value="card">card</Radio>
        <Radio value="card-gutter">card-gutter</Radio>
        <Radio value="text">text</Radio>
        <Radio value="rounded">rounded</Radio>
        <Radio value="capsule">capsule</Radio>
      </Radio.Group>

      <Tabs type={type} size={size}>
        <Tabs.TabPane key="1" title="Tab 1">
          <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="2" title="Tab 2" disabled>
          <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="3" title="Tab 3">
          <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="4" title="Tab 4">
          <Typography.Paragraph style={style}>Content of Tab Panel 4</Typography.Paragraph>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
```

## 自定义选项卡头部

使用 `react-sticky` 实现选项卡头部吸顶效果。当前文档站未内置 `react-sticky` 运行时依赖，因此该示例仅展示代码。

```tsx
function Demo() {
  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  return (
    <StickyContainer>
      <Tabs
        defaultActiveTab="3"
        renderTabHeader={(props, DefaultTabHeader) => {
          return (
            <Sticky topOffset={-52}>
              {({ style, isSticky }) => (
                <DefaultTabHeader
                  {...props}
                  style={{
                    ...style,
                    top: isSticky ? 52 : 0,
                    background: 'var(--color-bg-2)',
                  }}
                />
              )}
            </Sticky>
          );
        }}
      >
        <Tabs.TabPane key="1" title="Tab 1" style={{ height: 300 }}>
          <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="2" title="Tab 2">
          <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="3" title="Tab 3">
          <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
        </Tabs.TabPane>
      </Tabs>
    </StickyContainer>
  );
};
```

## 可拖拽页签

通过 `react-dnd` 可以实现页签的拖拽。当前文档站未内置 `react-dnd` 运行时依赖，因此该示例仅展示代码。

```tsx
function Demo() {

    interface DragItem {
        index: number;
    }

    interface WrapTabNodeProps {
        index: number;
        moveTabNode: (dragIndex: number, hoverIndex: number) => void;
        children: React.ReactNode;
    }

    const initTabs: (TabPaneProps & { key: React.Key })[] = [
        { key: 'tab 1', title: 'tab 1', children: 'Content of Tab Pane 1' },
        { key: 'tab 2', title: 'tab 2', children: 'Content of Tab Pane 2' },
        { key: 'tab 3', title: 'tab 3', children: 'Content of Tab Pane 3' }
    ];

    const WrapTabNode = (props: WrapTabNodeProps) => {
        const { index, moveTabNode, children, ...elseProps } = props;

        const ref = useRef<HTMLDivElement>(null);

        const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
            accept: 'DND_NODE',
            collect(monitor) {
                return {
                    handlerId: monitor.getHandlerId()
                };
            },
            hover(item, monitor) {
                if (!ref.current) {
                    return;
                }
                const dragIndex = item.index;
                const hoverIndex = index;

                if (dragIndex === hoverIndex) {
                    return;
                }

                const hoverBoundingRect = ref.current?.getBoundingClientRect();
                const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

                const clientOffset = monitor.getClientOffset();
                const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

                if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                    return;
                }

                if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                    return;
                }

                moveTabNode(dragIndex, hoverIndex);

                item.index = hoverIndex;
            }
        });

        const [, drag] = useDrag({
            type: 'DND_NODE',
            item: () => {
                return { index };
            }
        });

        drag(drop(ref));

        return (
            <div ref={ref} data-handler-id={handlerId} {...elseProps}>
                {children}
            </div>
        );
    };

    const [tabs, setTabs] = useState(initTabs);

    const moveTabNode = (dragIndex: number, hoverIndex: number) =>
        setTabs(prevTabs => {
            const newCards = [...prevTabs];
            newCards.splice(hoverIndex, 0, ...newCards.splice(dragIndex, 1));

            return newCards;
        });

    return (
        <DndProvider backend={HTML5Backend}>
            <Tabs>
                {tabs.map((tabPane, index) => (
                    <Tabs.TabPane
                        key={tabPane.key}
                        title={
                            <WrapTabNode key={index} index={index} moveTabNode={moveTabNode}>
                                {tabPane.title}
                            </WrapTabNode>
                        }
                    >
                        {tabPane.children}
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </DndProvider>
    );
};
```

## 滚动

支持通过滚轮或者触摸板进行滚动操作。

```jsx live
function App() {

  const paneStyle = {
    width: '100%',
    height: 50,
    padding: '24px 0',
    color: '#939aa3',
  };
  const tabs = [...new Array(30)].map((x, i) => ({
    title: `标签${i + 1}`,
    key: `key${i + 1}`,
    content: `标签${i + 1}内容`,
  }));

  const [direction, setDirection] = useState('horizontal');
  return (
    <div>
      <Radio.Group
        type="button"
        name="direction"
        value={direction}
        onChange={setDirection}
        style={{ marginBottom: 40 }}
        options={['horizontal', 'vertical']}
      ></Radio.Group>
      <Tabs defaultActiveTab="key1" direction={direction} style={{ height: 200 }}>
        {tabs.map((x, i) => (
          <Tabs.TabPane destroyOnHide key={x.key} title={x.title}>
            <div style={paneStyle}>{`这里是${x.content}`}</div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}
```

## 滚动偏移位置

支持设置 `scrollPosition` 来改变选中的选项卡的滚动位置

```jsx live
function App() {

  const paneStyle = {
    width: '100%',
    height: 50,
    padding: '24px 0',
    color: '#939aa3',
  };
  const tabs = [...new Array(30)].map((x, i) => ({
    title: `标签${i + 1}`,
    key: `key${i + 1}`,
    content: `标签${i + 1}内容`,
  }));

  const [direction, setDirection] = useState('horizontal');
  const [position, setPosition] = useState('auto');
  return (
    <div>
      <Space direction="vertical" style={{ marginBottom: 40 }}>
        <Radio.Group
          type="button"
          name="direction"
          value={direction}
          onChange={setDirection}
          options={['horizontal', 'vertical']}
        ></Radio.Group>
        <Radio.Group
          type="button"
          name="direction"
          value={position}
          onChange={setPosition}
          options={['auto', 'start', 'end', 'center']}
        ></Radio.Group>
      </Space>

      <Tabs
        defaultActiveTab="key1"
        direction={direction}
        style={{ height: 200 }}
        scrollPosition={position}
      >
        {tabs.map((x, i) => (
          <Tabs.TabPane destroyOnHide key={x.key} title={x.title}>
            <div style={paneStyle}>{`这里是${x.content}`}</div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}
```

## API

### Tabs

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|destroyOnHide|是否销毁隐藏标签页的节点, `TabPane` 的该属性优先级高于 `Tabs`。|boolean |`-`|-|
|editable|是否允许增减标签。只在 `type` 为 `card` 或 `card-gutter` 时候生效。|boolean |`-`|-|
|headerPadding|选项卡头部是否存在水平边距。仅对 `type`等于 `line`、`text`类型的选项卡生效|boolean |`true`|2.6.0|
|justify|高度撑满容器，只在水平模式下生效。（默认的高度是又撑起的。）|boolean |`-`|-|
|lazyload|设置为 `true` 时，将不会在组件挂载的时候渲染被隐藏的标签页。|boolean |`true`|-|
|showAddButton|是否显示新增按钮（仅在`editable`为`true`时生效）|boolean |`true`|-|
|activeTab|当前选中的 tab 的 key|string |`-`|-|
|defaultActiveTab|默认选中的标签选项卡，如不指定默认选择第一个|string |`-`|-|
|direction|标签选项卡的方向是水平还是竖直，分别对应 `horizontal `和 `vertical`。** 注意： 已废弃，使用 tabPosition 替代。**|'horizontal' \| 'vertical' |`-`|-|
|inkBarSize|定制下划线尺寸|&#123; width?: CSSProperties['width']; height?: CSSProperties['height'] } |`-`|2.54.0|
|overflow|标签页较多时候，选择滚动/下拉菜单形式展示 tab|'scroll' \| 'dropdown' |`scroll`|-|
|scrollPosition|被选中 tab 的滚动位置，默认 auto 即会将 activeTab 滚动到可见区域，但不会特意做位置调整|'start' \| 'end' \| 'center' \| 'auto' \| number |`auto`|2.25.0|
|size|有四个尺寸供选择，分别为`mini`, `small`, `default`, `large`|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|tabPosition|选项卡位置|'left' \| 'right' \| 'top' \| 'bottom' |`top`|-|
|type|标签选项卡的类型|'line' \| 'card' \| 'card-gutter' \| 'text' \| 'rounded' \| 'capsule' |`line`|-|
|addButton|自定义新增按钮|ReactNode |`-`|2.16.0|
|deleteButton|自定义删除按钮|ReactNode |`-`|2.16.0|
|extra|显示在标签页右侧的附加|ReactNode |`-`|-|
|animation|是否开启过渡效果|boolean \| &#123; tabPane?: boolean; inkBar?: boolean } |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|icons|标签页头部 编辑/滚动/下拉 图标配置。对于不想展示的图标可以将其设置为`null`|&#123;add?: ReactNode;delete?: ReactNode;prev?: ReactNode;next?: ReactNode;dropdown?: ReactNode;} |`-`|2.15.0, `prev`,`next`,`dropdown` in `2.47.0`|
|scrollAfterEdit|是否在标签增减后，自动进行滚动调整(`editable`为`true`时生效）|&#123;delete?: boolean;add?: boolean;} |`&#123; add: true, delete: true }`|2.25.0|
|style|节点样式|CSSProperties |`-`|-|
|onAddTab|点击新增 tab 按钮的回调|() => void |`-`|-|
|onChange|`activeTab` 改变的回调|(key: string) => void |`-`|-|
|onClickTab|点击选项卡的回调|(key: string) => void |`-`|-|
|onDeleteTab|点击删除按钮的回调|(key: string) => void |`-`|-|
|renderTabHeader|自定义选项卡头部|(tabProps: TabsProps, DefaultTabHeader: typeof TabHeader) => ReactElement |`-`|-|
|renderTabTitle|自定义单个选项卡头部|(tabTitle: ReactNode,info: &#123;key: string \| number;isActive: boolean;disabled: boolean;editable: boolean;}) => ReactNode |`-`|-|

### Tabs.TabPane

|参数名|描述|类型|默认值|
|---|---|---|---|
|closable|动态增减标签页时是否允许关闭当前标签页|boolean |`-`|
|destroyOnHide|选项卡隐藏的时候是否销毁标签页内的DOM结构，优先级高于 `Tabs` 的 `destroyOnHide` 属性|boolean |`-`|
|disabled|是否禁用|boolean |`-`|
|title|选项卡的标题显示|string \| ReactNode  **(必填)**|`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

