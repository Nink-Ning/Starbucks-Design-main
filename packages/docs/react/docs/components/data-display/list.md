---
sidebar_position: 1
---

# 列表 List

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

## 基本用法

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

```jsx live
function Demo() {
  return (
    <List
      style={{ width: 622 }}
      size="small"
      header="List title"
      dataSource={[
        'Beijing Bytedance Technology Co., Ltd.',
        'Bytedance Technology Co., Ltd.',
        'Beijing Toutiao Technology Co., Ltd.',
        'Beijing Volcengine Technology Co., Ltd.',
        'China Beijing Bytedance Technology Co., Ltd.',
      ]}
      render={(item, index) => <List.Item key={index}>{item}</List.Item>}
    />
  );
};
```

## 不同尺寸

设置 `size` 可以使用三种尺寸（`small`, `default`, `large`）的列表，可根据业务需求自行选择。

```jsx live

function App() {
  const [size, setSize] = useState('default');
  return (
    <>
      <Radio.Group
        type="button"
        name="size"
        value={size}
        onChange={(value) => setSize(value)}
        style={{ marginBottom: 20, borderRadius: 4 }}
      >
        <Radio value="small">small</Radio>
        <Radio value="default">default</Radio>
        <Radio value="large">large</Radio>
      </Radio.Group>
      <List
        style={{ width: 622 }}
        size={size}
        header="List title"
        dataSource={[
          'Beijing Bytedance Technology Co., Ltd.',
          'Bytedance Technology Co., Ltd.',
          'Beijing Toutiao Technology Co., Ltd.',
          'Beijing Volcengine Technology Co., Ltd.',
          'China Beijing Bytedance Technology Co., Ltd.',
        ]}
        render={(item, index) => <List.Item key={index}>{item}</List.Item>}
      />
    </>
  );
}
```

## 基础列表

使用 `List.Item.Meta` 可快速指定头像、标题、文字。

```jsx live
function Demo() {
  return (
    <List
      style={{ width: 600 }}
      dataSource={new Array(4).fill({
        title: 'Beijing Bytedance Technology Co., Ltd.',
        description: 'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
      })}
      render={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            avatar={<Avatar shape="square">A</Avatar>}
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};
```

## 增加操作项

通过 `actions` 来为列表添加操作项。

```jsx live

function App() {
  const dataSource = new Array(4).fill({
    title: 'Beijing Bytedance Technology Co., Ltd.',
    description: 'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
  });
  const [loading, setLoading] = useState(false);

  const render = (actions, item, index) => (
    <List.Item key={index} actions={actions}>
      <List.Item.Meta
        avatar={<Avatar shape="square">A</Avatar>}
        title={item.title}
        description={item.description}
      />
    </List.Item>
  );

  const footer = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
      onClick={() => setLoading(!loading)}
      onKeyDown={e => {
        const keyCode = e.keyCode || e.which;
        if (keyCode === 13) { // enter
          setLoading(!loading)
        }
      }}
    >
      {loading ? (
        <span style={{ color: 'var(--color-text-3)' }}>
          <IconLoading style={{ marginRight: 8, color: 'rgb(var(--arcoblue-6))' }} />
          loading...
        </span>
      ) : (
        <span className="list-demo-actions-button" tabIndex={0} >
          More
          <IconDown style={{ marginLeft: 8 }} />
        </span>
      )}
    </div>
  );
  return (
    <>
      <List
        className="list-demo-actions"
        style={{ width: 700, marginBottom: 48 }}
        dataSource={dataSource}
        render={render.bind(null, [
          <span className="list-demo-actions-icon">
            <IconEdit />
          </span>,
          <span className="list-demo-actions-icon">
            <IconDelete />
          </span>,
        ])}
        footer={footer}
      />
      <List
        className="list-demo-actions"
        style={{ width: 700 }}
        dataSource={dataSource}
        render={render.bind(null, [
          <span className="list-demo-actions-button">Edit</span>,
          <span className="list-demo-actions-button">Delete</span>,
        ])}
      />
    </>
  );
}
```

## 竖排列表样式

这是一个包括分页、右侧内容、下方列表操作的示例。

```jsx live
function Demo() {
  const names = ['Socrates', 'Balzac', 'Plato'];
  const avatarSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp',
  ];
  const imageSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp',
  ];
  const dataSource = new Array(15).fill(null).map((_, index) => {
    return {
      index: index,
      avatar: avatarSrc[index % avatarSrc.length],
      title: names[index % names.length],
      description:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
      imageSrc: imageSrc[index % imageSrc.length],
    };
  });
  return (
    <List
      className="list-demo-action-layout"
      wrapperStyle={{ maxWidth: 830 }}
      bordered={false}
      pagination={{ pageSize: 3 }}
      dataSource={dataSource}
      render={(item, index) => (
        <List.Item
          key={index}
          style={{ padding: '20px 0', borderBottom: '1px solid var(--color-fill-3)' }}
          actionLayout="vertical"
          actions={[
            <span key={1}>
              <IconHeart />
              {83}
            </span>,
            <span key={2}>
              <IconStar />
              {item.index}
            </span>,
            <span key={3}>
              <IconMessage />
              Reply
            </span>,
          ]}
          extra={
            <div className="image-area">
              <img alt="arcodesign" src={item.imageSrc} />
            </div>
          }
        >
          <List.Item.Meta
            avatar={
              <Avatar shape="square">
                <img alt="avatar" src={`${item.avatar}`} />
              </Avatar>
            }
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};
```

## 栅格列表

通过 `grid.span` 设置期望每行展示的列数。

```jsx live
function Demo() {
  const data = [
    {
      title: 'Platform',
      data: ['iOS', 'Android', 'Web'],
    },
    {
      title: 'Framework',
      data: ['Angular', 'Vue', 'React'],
    },
    {
      title: 'Language',
      data: ['C++', 'JavaScript', 'Python'],
    },
    {
      title: 'Component',
      data: ['Button', 'Breadcrumb', 'Transfer'],
    },
  ];

  return (
    <List
      grid={{ gutter: 0, span: 6 }}
      dataSource={data}
      bordered={false}
      render={(item, index) => (
        <List.Item key={index}>
          <List
            size="small"
            header={item.title}
            dataSource={item.data}
            render={(item, index) => <List.Item key={index}>{item}</List.Item>}
          />
        </List.Item>
      )}
    />
  );
};
```

## 响应式栅格

通过 `grid.sm` 等响应式参数动态设置每个单项横跨的列数，注意此时不要设置 `grid.span`。

```jsx live
function Demo() {
  const data = [
    {
      title: 'Platform',
      data: ['iOS', 'Android', 'Web'],
    },
    {
      title: 'Framework',
      data: ['Angular', 'Vue', 'React'],
    },
    {
      title: 'Language',
      data: ['C++', 'JavaScript', 'Python'],
    },
    {
      title: 'Component',
      data: ['Button', 'Breadcrumb', 'Transfer'],
    },
    {
      title: 'Design',
      data: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Plugin',
      data: ['Edu Tools', 'BashSupport', 'GitToolBox'],
    },
    {
      title: 'Platform',
      data: ['iOS', 'Android', 'Web'],
    },
    {
      title: 'Framework',
      data: ['Angular', 'Vue', 'React'],
    },
    {
      title: 'Language',
      data: ['C++', 'JavaScript', 'Python'],
    },
  ];

  return (
    <List
      grid={{
        sm: 24,
        md: 12,
        lg: 8,
        xl: 6,
      }}
      dataSource={data}
      bordered={false}
      render={(item, index) => (
        <List.Item key={index}>
          <List
            header={item.title}
            dataSource={item.data}
            render={(item, index) => <List.Item key={index}>{item}</List.Item>}
          />
        </List.Item>
      )}
    />
  );
};
```

## 滚动加载列表

可设置 `onReachBottom` 来动态滚动加载列表。当 `onReachBottom` 无法满足需求，可通过 `onListScroll` 来自定义列表滚动监听函数，此时默认的滚动监听函数将失效。

```jsx live

function App() {
  const [mockData, setMockData] = useState([]);
  const [scrollLoading, setScrollLoading] = useState(<Spin loading={true} />);

  const fetchData = (currentPage) => {
    if (currentPage > 10) {
      setScrollLoading('No more data');
    } else {
      fetch('https://randomuser.me/api/?results=10')
        .then((res) => res.json())
        .then((data) => {
          setMockData((mockData) => mockData.concat(...data.results));
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);
  return (
    <List
      style={{ width: 600, maxHeight: 320 }}
      scrollLoading={scrollLoading}
      onReachBottom={(currentPage) => fetchData(currentPage)}
      dataSource={mockData}
      render={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            avatar={
              <Avatar shape="square">
                <img alt="avatar" src={item.picture.thumbnail} />
              </Avatar>
            }
            title={`${item.name.first} ${item.name.last}`}
            description={item.email}
          />
        </List.Item>
      )}
    />
  );
}
```

## 无限长列表

通过指定 `virtualListProps` 来开启虚拟列表，在大量数据时获得高性能表现。
在使用虚拟列表时，如果列表元素之间高度变化较大可能导致滚动时视口出现空白区域，可以通过设定 `virtualListProps.itemHeight` 解决。`itemHeight` 用于计算实际需要渲染的 DOM 节点数目（视口高度 / 元素高度），其值越小实际渲染的 DOM 节点越多，性能开销也会随之增大。

**由于虚拟列表内部使用到了 ListItem 的 `ref`，因此如果你通过 `render` 返回了一个自定义函数组件，请使用 `React.forwardRef` 包裹它。**

```jsx live
function Demo() {
  return (
    <>
      <h3 style={{ color: 'var(--color-text-2)' }}>10000 items</h3>
      <List
        style={{ width: 600 }}
        virtualListProps={{
          height: 560,
        }}
        dataSource={new Array(10000).fill(null).map((_, index) => {
          const prefix = `0000${index}`.slice(-5);
          return {
            title: 'Beijing Bytedance Technology Co., Ltd.',
            description: `(${prefix}) Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.`,
          };
        })}
        render={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={<Avatar shape="square">A</Avatar>}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </>
  );
};
```

## API

### List

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|bordered|是否显示边框|boolean |`true`|-|
|hoverable|列表项是否可悬浮|boolean |`-`|2.9.0|
|loading|是否加载中|boolean |`-`|-|
|split|是否显示分割线|boolean |`true`|-|
|defaultCurrent|滚动加载数据当前页码|number |`1`|-|
|offsetBottom|触发底部函数的距离阙值|number |`0`|-|
|throttleDelay|节流延时|number |`500`|-|
|size|列表的尺寸|'small' \| 'default' \| 'large' |`-`|-|
|children|当 dataSource 和 render 存在时，可不传此参数|ReactNode |`-`|-|
|footer|列表底部|ReactNode |`-`|-|
|header|列表头部|ReactNode |`-`|-|
|noDataElement|没有数据的时候显示的元素|ReactNode |`-`|-|
|scrollLoading|滚动加载状态时，滚动到底部的提示|string \| ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|dataSource|列表渲染数据源，当children存在时，可不传此参数 (dataSource优先级更高）|T[] |`-`|-|
|grid|列表栅格配置|ListGridProps |`-`|`column` in 2.20.0|
|listRef|当前列表的引用|MutableRefObject&lt;ListHandle&gt; |`-`|2.20.0|
|pagination|是否使用翻页，也可传入 `Pagination` 的配置|boolean \| PaginationProps |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|virtualListProps|传递虚拟列表属性，传入此参数以开启虚拟滚动|AvailableVirtualListProps |`-`|2.11.0|
|wrapperClassName|指定最外层包裹元素的类名|string \| string[] |`-`|-|
|wrapperStyle|指定最外层包裹元素的样式|CSSProperties |`-`|-|
|onListScroll|列表滚动回调函数,参数为列表滚动元素，当onReachBottom无法满足需求，可自定义滚动监听函数。|(elem: Element) => void |`-`|-|
|onReachBottom|滚动至底部触发函数|(currentPage: number) => void |`-`|-|
|render|单个列表渲染函数，当 children 存在时，可不传此参数|(item: T, index: number) => ReactNode |`-`|-|

### List.Item

|参数名|描述|类型|默认值|
|---|---|---|---|
|actionLayout|列表操作组的位置，默认horizontal，出现在右侧；vertical出现在下方。|'horizontal' \| 'vertical' |`horizontal`|
|extra|列表最右侧内容，额外内容|ReactNode |`-`|
|actions|列表项下方内容（列表操作组）|ReactNode[] |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### List.Item.Meta

|参数名|描述|类型|默认值|
|---|---|---|---|
|avatar|列表元素的图标|ReactNode |`-`|
|description|列表元素描述内容|ReactNode |`-`|
|title|列表元素标题|ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### ListGridProps

```js
type ListGridProps = {
  column?: number;
} & Pick<RowProps, "gutter" | "justify" | "align"> &
  Pick<
    ColProps,
    "span" | "offset" | "order" | "pull" | "push" | GridResponsiveBreakpoint
  >;
```

### ListHandle

```js
export type ListHandle = {
  dom: HTMLDivElement;
  scrollIntoView: (index: number) => void;
};
```

### AvailableVirtualListProps

```js
export type AvailableVirtualListProps = Pick<
  VirtualListProps<any>,
  | "height"
  | "itemHeight"
  | "threshold"
  | "isStaticItemHeight"
  | "scrollOptions"
  | "onScroll"
  | "wrapperChild"
>;
```

### `&lt;ListGridProps>`

|参数名|描述|类型|默认值|
|---|:---:|:---:|---:|
|gutter|行间距|`number`|`-`|
|span|栅格占位格数|`number`|`-`|
|xs|`xs` 对应的栅格占位格数|`number`|`-`|
|sm|`sm` 对应的栅格占位格数|`number`|`-`|
|md|`md` 对应的栅格占位格数|`number`|`-`|
|lg|`lg` 对应的栅格占位格数|`number`|`-`|
|xl|`xl` 对应的栅格占位格数|`number`|`-`|
|xxl|`xxl` 对应的栅格占位格数|`number`|`-`|

### VirtualListProps

|参数名|描述|类型|默认值|
|------|:----------:|:--------:|-----:|
|height|可视区高度 (`2.11.0` 开始支持如 `80%` 的 `string` 类型)|`number`|`200`|
|threshold|自动开启虚拟滚动的元素数量阈值，传入`null`以禁用虚拟滚动。|`number`\|`null`|`100`|
|isStaticItemHeight|是否为相同高度的静态元素|`boolean`|`true`|

