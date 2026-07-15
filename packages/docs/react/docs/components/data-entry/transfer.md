---
sidebar_position: 1
---

# 数据穿梭框 Transfer

两栏布局的多选组件，将元素从一栏即时移到另一栏。

## 基础用法

两栏布局的多选穿梭框组件，将元素从一栏即时移到另一栏。

```jsx live
function App() {
  const dataSource = new Array(8).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  return (
    <Transfer
      dataSource={dataSource}
      defaultTargetKeys={['1', '2', '3']}
      defaultSelectedKeys={['4', '6', '7']}
      titleTexts={['To-do list', 'Selected list']}
    />
  );
}
```

## 带搜索框

指定 `showSearch` 来使用带搜索框的穿梭框，可以自定义搜索函数。

```jsx live
function App() {
  const dataSource = new Array(8).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  return (
    <Transfer
      showSearch
      dataSource={dataSource}
      searchPlaceholder="Please select"
      defaultTargetKeys={['1', '2', '3']}
      defaultSelectedKeys={['4', '6', '7']}
      titleTexts={['To-do list', 'Selected list']}
    />
  );
}
```

## 单向模式

指定 `oneWay` 使用单向模式的穿梭框。

```jsx live
function App() {
  const dataSource = new Array(8).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  return (
    <Transfer
      oneWay
      dataSource={dataSource}
      searchPlaceholder="Please select"
      defaultTargetKeys={['1', '2', '3']}
      defaultSelectedKeys={['4', '6', '7']}
      titleTexts={['To-do list', 'Selected list']}
    />
  );
}
```

## 高级用法

穿梭框高级用法，可配置操作文案，可定制宽高。

```jsx live
function App() {
  const dataSource = new Array(10).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  return (
    <Transfer
      showFooter
      dataSource={dataSource}
      defaultTargetKeys={['1', '3', '4']}
      defaultSelectedKeys={['2', '6', '7']}
      titleTexts={['To-do list', 'Selected list']}
      operationTexts={['To right', 'To left']}
      listStyle={{
        width: 220,
        height: 316,
      }}
    />
  );
}
```

## 分页

数据量大时，指定 `pagination` 来使用分页。

```jsx live
function App() {
  const dataSource = new Array(30).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  return (
    <Transfer
      pagination
      dataSource={dataSource}
      defaultTargetKeys={['1', '3', '4']}
      defaultSelectedKeys={['2', '6', '7']}
      titleTexts={['To-do list', 'Selected list']}
    />
  );
}
```

## 自定义渲染行数据

通过 `render` 自定义渲染每一个项目，可用于渲染复杂数据。

```jsx live
function App() {
  const dataSource = new Array(8).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  return (
    <Transfer
      render={(item) => (
        <span
          style={
            +item.key % 5 === 1
              ? {
                  color: '#165DFF',
                }
              : {}
          }
        >
          {item.value}
          {+item.key === 7 ? (
            <IconStar
              style={{
                marginLeft: 4,
                color: 'rgb(var(--gold-6))',
              }}
            />
          ) : null}
        </span>
      )}
      dataSource={dataSource}
      defaultTargetKeys={['1', '2', '3']}
      defaultSelectedKeys={['4', '6', '7']}
      titleTexts={['To-do list', 'Selected list']}
    />
  );
}
```

## 表格穿梭框

使用 `Table` 组件作为自定义渲染列表。

```jsx live

function App() {
  const dataSource = [
    {
      key: '0',
      company: 'Bytedance Technology Co., Ltd.',
      headcount: 3000000,
      industry: 'Technology',
    },
    {
      key: '1',
      company: 'Toutiao Co., Ltd.',
      headcount: 40000,
      industry: 'AI',
    },
    {
      key: '2',
      company: 'Beijing Toutiao Technology Co., Ltd.',
      headcount: 500000,
      industry: 'Technology',
    },
    {
      key: '3',
      company: 'Beijing Volcengine Technology...',
      headcount: 6000000,
      industry: 'Technology',
    },
  ];
  const tableColumns = [
    {
      dataIndex: 'company',
      title: 'Company',
    },
    {
      dataIndex: 'headcount',
      title: 'Headcount',
      sorter: (a, b) => a.headcount - b.headcount,
      render: (_, item) => `${item.headcount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      dataIndex: 'industry',
      title: 'Industry',
      sorter: (a, b) => (a.industry.toUpperCase() > b.industry.toUpperCase() ? 1 : -1),
    },
  ];

  const TableTransfer = ({ sourceColumns, targetColumns, ...restProps }) => (
    <Transfer {...restProps}>
      {({
        listType,
        filteredItems,
        onItemSelect,
        onItemSelectAll,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = listType === 'source' ? sourceColumns : targetColumns;
        return (
          <Table
            style={{
              pointerEvents: listDisabled ? 'none' : null,
              borderRadius: 0,
            }}
            pagination={false}
            data={filteredItems}
            columns={columns}
            rowSelection={{
              checkCrossPage: true,
              selectedRowKeys: listSelectedKeys,
              checkboxProps: (item) => {
                return {
                  disabled: listDisabled || item.disabled,
                  // Avoid triggering onRow.onClick
                  onClick: (e) => e.stopPropagation(),
                };
              },

              onChange(selectedRowKeys) {
                onItemSelectAll(selectedRowKeys, true);
              },
            }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: (e) => {
                !itemDisabled && !listDisabled && onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </Transfer>
  );

  const [targetKeys, setTargetKeys] = useState([]);
  return (
    <TableTransfer
      className="transfer-demo-with-table"
      listStyle={{
        width: 540,
        height: 240,
      }}
      dataSource={dataSource}
      targetKeys={targetKeys}
      sourceColumns={tableColumns}
      targetColumns={tableColumns}
      onChange={(keys) => setTargetKeys(keys)}
    />
  );
}
```

## 树穿梭框

使用 `Tree` 组件作为自定义渲染列表。

```jsx live

function Demo() {
  const treeData = [
    {
      key: '1',
      title: 'Trunk 1',
      children: [
        {
          key: '1-1',
          title: 'Branch',
          children: [
            {
              key: '1-1-1',
              title: 'Leaf',
            },
            {
              key: '1-1-2',
              title: 'Leaf',
            },
          ],
        },
      ],
    },
    {
      key: '2',
      title: 'Trunk 2',
      children: [
        {
          key: '2-1',
          title: 'Trunk 2-1',
        },
        {
          key: '2-2',
          title: 'Trunk 2-2',
        },
        {
          key: '2-3',
          title: 'Trunk 2-3',
        },
      ],
    },
    {
      key: '3',
      title: 'Trunk 3',
    },
    {
      key: '4',
      title: 'Trunk 4',
    },
  ];

  const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
    const generateTreeData = (treeNodes = [], checkedKeys = []) => {
      return treeNodes.map(({ children, ...props }) => ({
        ...props,
        disabled: checkedKeys.includes(props.key),
        children: generateTreeData(children, checkedKeys),
      }));
    };

    const generateTransferData = (list = [], transferDataSource = []) => {
      list.forEach((item) => {
        transferDataSource.push(item);
        generateTransferData(item.children, transferDataSource);
      });
      return transferDataSource;
    };

    const transferDataSource = generateTransferData(dataSource);
    const treeData = generateTreeData(dataSource, targetKeys);
    return (
      <Transfer
        targetKeys={targetKeys}
        dataSource={transferDataSource}
        render={(item) => item.title}
        {...restProps}
      >
        {({ listType, onItemSelect, selectedKeys }) => {
          if (listType === 'source') {
            const checkedKeys = [...selectedKeys, ...targetKeys];
            return (
              <Tree
                style={{
                  padding: '0 14px',
                }}
                blockNode
                checkable
                checkStrictly
                treeData={treeData}
                checkedKeys={checkedKeys}
                onCheck={(_, { node: { key } }) => {
                  onItemSelect(key, checkedKeys.indexOf(key) === -1);
                }}
                onSelect={(_, { node: { key } }) => {
                  onItemSelect(key, checkedKeys.indexOf(key) === -1);
                }}
              />
            );
          }
        }}
      </Transfer>
    );
  };

  const [targetKeys, setTargetKeys] = useState(['2-1', '2-2', '2-3', '4']);

  const onChange = (keys) => {
    setTargetKeys(keys);
  };

  return (
    <TreeTransfer
      dataSource={treeData}
      defaultSelectedKeys={['1-1-1']}
      targetKeys={targetKeys}
      onChange={onChange}
    />
  );
}
```

## 简单模式

指定 `simple` 来开启简单模式，点击选项即可移动。额外配置 `simple = &#123; retainSelectedItems: true }`，将选中的条目保留在左侧。

```jsx live

function App() {
  const [retainSelectedItems, setRetainSelectedItems] = useState(false);

  const dataSource = useMemo(() => {
    return new Array(8).fill(null).map((_, index) => ({
      key: `${index + 1}`,
      value: `Option ${index + 1}`,
    }));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Switch
          style={{ marginRight: 8 }}
          size="small"
          checked={retainSelectedItems}
          onChange={setRetainSelectedItems}
        />
        <Typography.Text code>
          {`simple = { retainSelectedItems: ${retainSelectedItems} }`}
        </Typography.Text>
      </div>
      <Transfer
        simple={{ retainSelectedItems }}
        dataSource={dataSource}
        defaultTargetKeys={['1', '2', '3']}
        titleTexts={['To-do list', 'Selected list']}
      />
    </div>
  );
}
```

## 拖拽排序

指定 `draggable` 属性为 `true`，可拖拽排序左右面板。

```jsx live

function App() {
  const swapArrayItem = (arr, index1, index2) => {
    arr = [...arr];
    arr.splice(index1, 1, ...arr.splice(index2, 1, arr[index1]));
    return arr;
  };

  const [dataSource, setDataSource] = useState(
    new Array(8).fill(null).map((_, index) => ({
      key: `${index + 1}`,
      value: `Option ${index + 1}`,
    }))
  );
  return (
    <Transfer
      draggable
      dataSource={dataSource}
      defaultTargetKeys={['1', '2', '3']}
      defaultSelectedKeys={['4', '6', '7']}
      titleTexts={['To-do list', 'Selected list']}
      onDrop={({ dragItem, dropItem }) => {
        const indexDragItem = dataSource.indexOf(dragItem);
        const indexDropItem = dataSource.indexOf(dropItem);
        setDataSource(swapArrayItem(dataSource, indexDragItem, indexDropItem));
      }}
    />
  );
}
```

## 自定义标题栏

`titleTexts` 允许传入 render 函数以完全自定义 Transfer 的标题栏，函数接收的参数为 `&#123; countTotal: number; countSelected: number; checkbox: ReactNode; clear: () => void }`。

```jsx live
function App() {
  const dataSource = new Array(8).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  const styleHeader = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  return (
    <Transfer
      dataSource={dataSource}
      defaultTargetKeys={['1', '2', '3']}
      defaultSelectedKeys={['4', '6', '7']}
      titleTexts={[
        ({ countTotal, countSelected, checkbox }) => {
          return (
            <div style={styleHeader}>
              {`LEFT ${countSelected}-${countTotal}`}
              {checkbox}
            </div>
          );
        },
        ({ countTotal, countSelected, clear }) => {
          return (
            <div style={styleHeader}>
              {`RIGHT ${countSelected}-${countTotal}`}
              <IconDelete
                style={{ cursor: 'pointer', }}
                onClick={clear}
              />
            </div>
          );
        },
      ]}
    />
  );
}
```

## API

### Transfer

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|disabled|禁用穿梭框|boolean |`-`|-|
|draggable|列表内条目是否可拖拽|boolean |`-`|-|
|oneWay|单向|boolean |`-`|-|
|onChange|选中项在两栏之间转移时的回调|(newTargetKeys: string[], direction: 'source' \| 'target', moveKeys: string[]) => void |`-`|-|
|onSearch|搜索框输入进行搜索时回调函数|(value: string, type?: 'source' \| 'target') => void |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|dataSource|穿梭框数据源，其中一部分会被渲染到左边一栏，targetKeys 中指定的除外|TransferItem[] |`-`|-|
|defaultSelectedKeys|默认的 `selectKeys`|string[] |`[]`|-|
|defaultTargetKeys|默认的 `targetKeys`|string[] |`[]`|-|
|listStyle|左右两栏框的样式，通过数组为左右列表传入不同属性|CSSProperties \| CSSProperties[] |`-`|Array format in '2.40.0'|
|onDragEnd|节点结束拖拽的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, item: TransferItem) =&gt; void |`-`|-|
|onDragLeave|节点离开可释放目标上时的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, item: TransferItem) =&gt; void |`-`|-|
|onDragOver|节点被拖拽至可释放目标上时的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, item: TransferItem) =&gt; void |`-`|-|
|onDragStart|节点开始拖拽的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, item: TransferItem) =&gt; void |`-`|-|
|onDrop|节点在可释放目标上释放时的回调|(info: &#123;e: DragEvent&lt;HTMLSpanElement&gt;;dragItem: TransferItem;dropItem: TransferItem;dropPosition: number;}) =&gt; void |`-`|-|
|operationStyle|穿梭中间操作部分的样式|CSSProperties |`-`|-|
|operationTexts|穿梭按钮的文案数组，顺序从上至下|string[] \| ReactNode[] |`-`|-|
|pagination|是否使用翻页，也可传入 `Pagination` 的配置，通过数组为左右列表传入不同属性|boolean \| PaginationProps \| Array&lt;boolean \| PaginationProps&gt; |`-`|Array format in '2.40.0'|
|searchPlaceholder|搜索框默认提示文字，通过数组为左右列表传入不同属性|string \| string[] |`-`|Array format in '2.40.0'|
|selectedKeys|当前应该有哪些项被选中|string[] |`-`|-|
|showFooter|左右两栏是否显示底部重置按钮，通过数组为左右列表传入不同属性|boolean \| ReactNode \| Array&lt;boolean \| ReactNode&gt; |`-`|ReactNode in `2.11.0`, array format in '2.40.0'|
|showSearch|左右两栏是否显示搜索框，通过数组为左右列表传入不同属性|boolean \| InputProps \| Array&lt;boolean \| InputProps&gt; |`-`|Array format in '2.40.0'|
|simple|简单模式|\| boolean\| &#123;retainSelectedItems?: boolean;} |`-`|`retainSelectedItems` in '2.21.0'|
|style|节点样式|CSSProperties |`-`|-|
|targetKeys|渲染到右边一栏数据的 key 集合|string[] |`-`|-|
|titleTexts|穿梭框左右栏标题数组。(函数写法 `2.18.0` 开始支持)|Array&lt;TransferListTitle&gt; |`['Source', 'Target']`|-|
|virtualListProps|传递虚拟滚动属性。|AvailableVirtualListProps |`-`|2.42.0|
|children|自定义列表渲染函数|(props: TransferCustomListProps) => ReactNode |`-`|-|
|filterOption|搜索框筛选算法|(inputValue: string, item: TransferItem) => boolean |`(inputValue, item) => item.value.indexOf(inputValue) !== -1`|-|
|onResetData|点击重置按钮后的回调|() => void |`-`|-|
|onSelectChange|数据项选中状态发生改变的回调|(leftSelectedKeys: string[], rightSelectedKeys: string[]) => void |`-`|-|
|render|每行数据渲染函数|(item: TransferItem) => any |`-`|-|

### TransferCustomListProps

```js
export interface TransferCustomListProps
  extends Pick<
    TransferListProps,
    | "disabled"
    | "listType"
    | "selectedKeys"
    | "validKeys"
    | "selectedDisabledKeys"
  > {
  filteredItems: TransferItem[];
  onItemSelect: (key: string, selected: boolean) => void;
  onItemRemove: (key: string) => void;
  onItemSelectAll: (keys: string[], selected: boolean) => void;
}
```

### TransferItem

```js
export type TransferItem = {
  key: string;
  value: string;
  disabled?: boolean;
};
```

### TransferListTitle

```js
type TransferListTitle =
  | string
  | ((params: {
      countTotal: number;
      countSelected: number;
      clear: () => void;
      checkbox: ReactNode;
      searchInput: ReactNode;
    }) => ReactNode);
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

### Transfer.Item

|Property|Description|Type|Default|
|---|:---:|:---:|---:|
|key|选项的键值（唯一标识符）|`string` **(required)**|`-`|
|value|选项对应的值|`string` **(required)**|`-`|
|disabled|是否禁用此选项|`boolean`|`-`|

