---
sidebar_position: 1
---

# 树选择 TreeSelect

可以对树形结构数据进行选择。

## 基础用法

最简单的用法。

```jsx live
function Demo() {
  return (
    <TreeSelect defaultValue="node1" style={{ width: 300 }} allowClear>
      <TreeSelect.Node key="node1" title="Trunk">
        <TreeSelect.Node key="node2" title="Leaf" />
      </TreeSelect.Node>
      <TreeSelect.Node key="node3" title="Trunk2">
        <TreeSelect.Node key="node4" title="Leaf" />
        <TreeSelect.Node key="node5" title="Leaf" />
      </TreeSelect.Node>
    </TreeSelect>
  );
};
```

## 设置 value 格式

`labelInValue` 为 `true` 时，`value` 格式为： `&#123; label: string, value: string }`。

```jsx live

function Demo() {
  const treeData = [
    {
      key: 'node1',
      title: 'Trunk',
      children: [
        {
          key: 'node2',
          title: 'Leaf',
        },
      ],
    },
    {
      key: 'node3',
      title: 'Trunk2',
      children: [
        {
          key: 'node4',
          title: 'Leaf',
        },
        {
          key: 'node5',
          title: 'Leaf',
        },
      ],
    },
  ];

  const [value, setValue] = React.useState({
    value: 'node2',
    label: <span><IconStar/> Leaf</span>,
  });

  return (
    <TreeSelect
      labelInValue={true}
      treeData={treeData}
      value={value}
      onChange={(v) => {
        setValue(v ? {
          value: v.value,
          label: <span><IconStar/> {v.label}</span>
        } : v)
      }}
      style={{ width: 300 }}
    />
  )
}
```

## 自定义渲染

单选下通过 `renderFormat` 可自定义渲染展示

```jsx live

function Demo() {
  const treeData = [
    {
      key: 'node1',
      title: 'Trunk',
      children: [
        {
          key: 'node2',
          title: 'Leaf',
        },
      ],
    },
    {
      key: 'node3',
      title: 'Trunk2',
      children: [
        {
          key: 'node4',
          title: 'Leaf',
        },
        {
          key: 'node5',
          title: 'Leaf',
        },
      ],
    },
  ];

  const [value, setValue] = React.useState('node2');

  return (
    <TreeSelect
      renderFormat={(nodeProps, value) => {
        return <span><IconStar /> {nodeProps.title || value}</span>
      }}
      treeData={treeData}
      value={value}
      onChange={(v) => {
        setValue(v)
      }}
      style={{ width: 300 }}
    />
  )
}
```

## 前置标签

通过 `addBefore` 设置前置标签 (`2.41.0`)

```jsx live
function Demo() {
  const treeData = [
    {
      key: 'node1',
      title: 'Trunk',
      disabled: true,
      children: [
        {
          key: 'node2',
          title: 'Leaf',
        },
      ],
    },
    {
      key: 'node3',
      title: 'Trunk2',
      children: [
        {
          key: 'node4',
          title: 'Leaf',
        },
        {
          key: 'node5',
          title: 'Leaf',
        },
      ],
    },
  ];

  return <Space>
  <TreeSelect addBefore={"TreeNode"} treeData={treeData} style={{ width: 350 }} />
  <TreeSelect addBefore={"TreeNode"} treeData={treeData} treeCheckable style={{ width: 350 }} />
  </Space>
};
```

## 通过数据生成树结构

通过传入 `treeData` 数据生成树结构。

```jsx live
function Demo() {
  const treeData = [
    {
      key: 'node1',
      icon: <IconCalendar />,
      title: 'Trunk',
      disabled: true,
      children: [
        {
          key: 'node2',
          title: 'Leaf',
        },
      ],
    },
    {
      key: 'node3',
      title: 'Trunk2',
      icon: <IconCalendar />,
      children: [
        {
          key: 'node4',
          title: 'Leaf',
        },
        {
          key: 'node5',
          title: 'Leaf',
        },
      ],
    },
  ];

  return <TreeSelect treeData={treeData} placeholder="请选择..." style={{ width: 300 }} />;
};
```

## 受控模式

受控模式。

```jsx live

class App extends React.Component {
  state = {
    value: 'node2',
  };
  handleChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  };

  render() {
    const treeData = [
      {
        key: 'node1',
        icon: <IconCalendar />,
        title: 'Trunk',
        children: [
          {
            key: 'node2',
            title: 'Leaf',
          },
        ],
      },
      {
        key: 'node3',
        title: 'Trunk2',
        icon: <IconCalendar />,
        children: [
          {
            key: 'node4',
            title: 'Leaf',
          },
          {
            key: 'node5',
            title: 'Leaf',
          },
        ],
      },
    ];

    return (
      <TreeSelect
        treeData={treeData}
        value={this.state.value}
        onChange={this.handleChange}
        style={{ width: 300 }}
      />
    );
  }
}
```

## 动态加载

可以通过 `loadMore` 进行动态加载。此时可设置 `isLeaf` 来标示叶子节点。

```jsx live

function App() {
  const defaultData = [
    {
      key: 'node1',
      value: 'node1',
      title: 'node1',
      children: [
        {
          key: 'node2',
          value: 'node2',
          title: 'node2',
        },
      ],
    },
    {
      key: 'node3',
      value: 'node3',
      title: 'node3',
      children: [
        {
          key: 'node4',
          value: 'node4',
          title: 'node4',
          isLeaf: true,
        },
        {
          key: 'node5',
          value: 'node5',
          title: 'node5',
          isLeaf: true,
        },
      ],
    },
  ];

  const [treeData, setTreeData] = useState(defaultData);
  const [value, setValue] = useState('node2');

  const loadMore = (node, dataRef) => {
    const { title, _key: key } = node.props;
    const children = [
      {
        title: `${title}-0`,
        value: `${title}-0`,
        key: `${key}-0`,
      },
      {
        title: `${title}-1`,
        value: `${title}-1`,
        key: `${key}-1`,
      },
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        dataRef.children = children;
        setTreeData([...treeData]);
        resolve();
      }, 1000);
    });
  };

  return (
    <TreeSelect
      showSearch
      placeholder="请选择..."
      treeData={treeData}
      value={value}
      onChange={setValue}
      loadMore={loadMore}
      triggerProps={{
        popupStyle: {
          maxHeight: 300,
        },
      }}
      style={{ width: 300 }}
    />
  );
}
```

## 搜索

设置 `showSearch=true` 启用搜索功能。动态加载时候只能在已加载数据中进行搜索。默认的关键字搜索是从`value`字段匹配。也可以传入 `filterTreeNode`自定义过滤方式。

```jsx live

class App extends React.Component {
  handleChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  };
  filterTreeNode = (inputText, node) => {
    return node.props.title.toLowerCase().indexOf(inputText.toLowerCase()) > -1;
  };

  render() {
    const treeData = [
      {
        title: 'Trunk 0-0',
        value: 'Trunk 0-0',
        key: '0-0',
        children: [
          {
            title: 'Branch 0-0-1',
            value: 'Branch 0-0-1',
            key: '0-0-1',
            children: [
              {
                title: 'Leaf 0-0-1-1',
                value: 'Leaf 0-0-1-1',
                key: '0-0-1-1',
              },
              {
                title: 'Leaf 0-0-1-2',
                value: 'Leaf 0-0-1-2',
                key: '0-0-1-2',
              },
            ],
          },
        ],
      },
      {
        title: 'Trunk 0-1',
        value: 'Trunk 0-1',
        key: '0-1',
        children: [
          {
            title: 'Branch 0-1-1',
            value: 'Branch 0-1-1',
            key: '0-1-1',
            children: [
              {
                title: 'Leaf 0-1-1-0',
                value: 'Leaf 0-1-1-0',
                key: '0-1-1-0',
              },
            ],
          },
          {
            title: 'Branch 0-1-2',
            value: 'Branch 0-1-2',
            key: '0-1-2',
            children: [
              {
                title: 'Leaf 0-1-2-0',
                value: 'Leaf 0-1-2-0',
                key: '0-1-2-0',
              },
            ],
          },
        ],
      },
    ];

    return (
      <Space size="large">
        <TreeSelect
          showSearch={true}
          placeholder="Please select ..."
          allowClear={true}
          treeData={treeData}
          onChange={this.handleChange}
          treeProps={{
            onSelect: (v, n) => {
              console.log(n);
            },
          }}
          style={{ width: 300 }}
        />
        <TreeSelect
          showSearch={true}
          placeholder="Please select ..."
          allowClear={true}
          treeProps={{
            onSelect: (v, n) => {
              console.log(n);
            },
          }}
          treeData={treeData}
          filterTreeNode={this.filterTreeNode}
          onChange={this.handleChange}
          style={{ width: 300 }}
        />
      </Space>
    );
  }
}
```

## 远程搜索

当传入 `onSearch` 为函数时，启用自定义搜索，可以从远程加载数据。

```jsx live

function App() {
  const TreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Branch 0-0-1',
          key: '0-0-1',
          children: [
            {
              title: 'Leaf 0-0-1-1',
              key: '0-0-1-1',
            },
            {
              title: 'Leaf 0-0-1-2',
              key: '0-0-1-2',
            },
          ],
        },
      ],
    },
    {
      title: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          key: '0-1-1',
          children: [
            {
              title: 'Leaf 0-1-1-0',
              key: '0-1-1-0',
            },
          ],
        },
        {
          title: 'Branch 0-1-2',
          key: '0-1-2',
          children: [
            {
              title: 'Leaf 0-1-2-0',
              key: '0-1-2-0',
            },
          ],
        },
      ],
    },
  ];

  function searchData(inputValue) {
    const loop = (data) => {
      const result = [];
      data.forEach((item) => {
        if (item.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1) {
          result.push({ ...item });
        } else if (item.children) {
          const filterData = loop(item.children);

          if (filterData.length) {
            result.push({ ...item, children: filterData });
          }
        }
      });
      return result;
    };

    return loop(TreeData);
  }

  const [treeData, setTreeData] = React.useState(TreeData);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState([]);
  return (
    <TreeSelect
      treeCheckable
      value={value}
      onChange={setValue}
      showSearch={true}
      allowClear={true}
      notFoundContent={loading ? <Spin /> : undefined}
      placeholder="please select..."
      treeData={loading ? [] : treeData}
      onSearch={(inputValue) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setTreeData(searchData(inputValue));
        }, 200);
      }}
      style={{ width: 300 }}
    />
  );
}
```

## 不同尺寸

设置 `size` 可以使用四种尺寸（small, default, large, huge）的选择器。高度分别对应 24px、32px、36px、40px。

```jsx live

function App() {
  const [size, setSize] = useState('default');
  return (
    <div>
      <Radio.Group
        type="button"
        name="size"
        value={size}
        onChange={setSize}
        style={{ marginBottom: 20, }}
      >
        <Radio value="mini">mini</Radio>
        <Radio value="small">small</Radio>
        <Radio value="default">default</Radio>
        <Radio value="large">large</Radio>
      </Radio.Group>
      <div>
        <TreeSelect
          size={size}
          defaultValue="node1"
          style={{ width: 300, }}
        >
          <TreeSelect.Node key="node1" title="Trunk">
            <TreeSelect.Node key="node2" title="Leaf" />
          </TreeSelect.Node>
          <TreeSelect.Node key="node3" title="Trunk2">
            <TreeSelect.Node key="node4" title="Leaf" />
            <TreeSelect.Node key="node5" title="Leaf" />
          </TreeSelect.Node>
        </TreeSelect>
      </div>
    </div>
  );
}
```

## 自定义显示

设置 `triggerElement` 可以自定义显示。

```jsx live

const DemoTreeSelect = () => {
  const [text, setText] = useState('node1');
  return (
    <TreeSelect
      allowClear
      onChange={(value) => {
        setText(value.label);
      }}
      labelInValue
      triggerElement={
        <Typography.Paragraph style={{ width: '300px' }}>
          You selected: <Link>{text}</Link>
        </Typography.Paragraph>
      }
    >
      <TreeSelect.Node key="node1" title="Trunk">
        <TreeSelect.Node key="node2" title="Leaf" />
      </TreeSelect.Node>
      <TreeSelect.Node key="node3" title="Trunk2">
        <TreeSelect.Node key="node4" title="Leaf" />
        <TreeSelect.Node key="node5" title="Leaf">
          <TreeSelect.Node key="node6" title="Leaf" />
          <TreeSelect.Node key="node7" title="Leaf" />
        </TreeSelect.Node>
      </TreeSelect.Node>
    </TreeSelect>
  );
};

export default DemoTreeSelect;
```

## 多选

多选

```jsx live

class App extends React.Component {
  state = {
    value: [],
  };
  handleChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  };

  render() {
    const treeData = [
      {
        key: 'node1',
        icon: <IconCalendar />,
        title: 'Trunk',
        children: [
          {
            key: 'node2',
            title: 'Leaf',
          },
        ],
      },
      {
        key: 'node3',
        title: 'Trunk2',
        icon: <IconCalendar />,
        children: [
          {
            key: 'node4',
            title: 'Leaf',
          },
          {
            key: 'node5',
            title: 'Leaf',
          },
        ],
      },
    ];

    return (
      <Space size="large">
        <TreeSelect
          allowClear
          placeholder="Please select ..."
          multiple
          showSearch
          treeData={treeData}
          value={this.state.value}
          onChange={this.handleChange}
          style={{ width: 300 }}
        />
        <TreeSelect
          allowClear
          placeholder="Max display 2 tags"
          multiple
          showSearch
          maxTagCount={2}
          treeData={treeData}
          value={this.state.value}
          onChange={this.handleChange}
          style={{ width: 300 }}
        />
      </Space>
    );
  }
}
```

## 复选框多选

可以通过设置 `treeCheckable` 属性开启复选框勾选。

```jsx live
function App() {
  const treeData = [
    {
      title: 'Trunk 0-0',
      value: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf 0-0-1',
          value: 'Leaf 0-0-1',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          value: 'Branch 0-0-2',
          key: '0-0-2',
          children: [
            {
              title: 'Leaf 0-0-2-1',
              value: 'Leaf 0-0-2-1',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
    {
      title: 'Trunk 0-1',
      value: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          value: 'Branch 0-1-1',
          key: '0-1-1',
          checkable: false,
          children: [
            {
              title: 'Leaf 0-1-1-1',
              value: 'Leaf 0-1-1-1',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf 0-1-1-2',
              value: 'Leaf 0-1-1-2',
              key: '0-1-1-2',
              disabled: true,
            },
          ],
        },
        {
          title: 'Leaf 0-1-2',
          value: 'Leaf 0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ];

  const [treeCheckStrictly, setTreeCheckStrictly] = useState(false);
  const [value, setValue] = useState(['0-1']);
  return (
    <div>
      <div style={{ marginBottom: 20 }} >
        <Checkbox checked={treeCheckStrictly} onChange={setTreeCheckStrictly}>
          treeCheckStrictly
        </Checkbox>
      </div>
      <TreeSelect
        showSearch
        allowClear
        treeCheckable
        treeData={treeData}
        value={value}
        treeCheckStrictly={treeCheckStrictly}
        onChange={(value) => {
          console.log(value);
          setValue(value);
        }}
        style={{ width: 300, }}
      />
    </div>
  );
}
```

## 定制回填方式

可以通过`treeCheckStrategy`属性定制回填方式。

```jsx live
function App() {
  const treeData = [
    {
      title: 'Trunk 0-0',
      value: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf 0-0-1',
          value: 'Leaf 0-0-1',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          value: 'Branch 0-0-2',
          key: '0-0-2',
          children: [
            {
              title: 'Leaf 0-0-2-1',
              value: 'Leaf 0-0-2-1',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
    {
      title: 'Trunk 0-1',
      value: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          value: 'Branch 0-1-1',
          key: '0-1-1',
          checkable: false,
          children: [
            {
              title: 'Leaf 0-1-1-1',
              value: 'Leaf 0-1-1-1',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf 0-1-1-2',
              value: 'Leaf 0-1-1-2',
              key: '0-1-1-2',
              disabled: true,
            },
          ],
        },
        {
          title: 'Leaf 0-1-2',
          value: 'Leaf 0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ];

  const [treeCheckedStrategy, setTreeCheckedStrategy] = useState(TreeSelect.SHOW_CHILD);
  const [value, setValue] = useState(['0-0']);
  return (
    <div>
      <div
        style={{ marginBottom: 20, }}
      >
        <Radio.Group
          type="button"
          value={treeCheckedStrategy}
          onChange={setTreeCheckedStrategy}
          options={[
            {
              value: TreeSelect.SHOW_ALL,
              label: 'show all',
            },
            {
              value: TreeSelect.SHOW_PARENT,
              label: 'show parent',
            },
            {
              value: TreeSelect.SHOW_CHILD,
              label: 'show child',
            },
          ]}
        />
      </div>
      <TreeSelect
        showSearch
        allowClear
        treeCheckable
        treeData={treeData}
        value={value}
        treeCheckedStrategy={treeCheckedStrategy}
        onChange={(value) => {
          console.log(value);
          setValue(value);
        }}
        style={{ width: 300, }}
      />
    </div>
  );
}
```

## 扩展下拉菜单

使用 `dropdownRender` 对下拉菜单进行自由扩展。

```jsx live

function App() {
  const defaultTreeData = [
    {
      key: 'node1',
      title: 'Trunk',
      disabled: true,
      children: [
        {
          key: 'node2',
          title: 'Leaf',
        },
      ],
    },
    {
      key: 'node3',
      title: 'Trunk2',
      children: [
        {
          key: 'node4',
          title: 'Leaf',
        },
        {
          key: 'node5',
          title: 'Leaf',
        },
      ],
    },
  ];

  const [treeData, setTreeData] = useState(defaultTreeData);
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    setTreeData([
      ...treeData,
      {
        key: inputValue,
        title: inputValue,
      },
    ]);
  };

  return (
    <TreeSelect
      placeholder="Please select ..."
      treeData={treeData}
      style={{ width: 300 }}
      allowClear
      dropdownMenuStyle={{
        maxHeight: 250,
        display: 'flex',
        flexDirection: 'column',
      }}
      dropdownRender={(menu) => (
        <>
          <div style={{ flex: 1, overflow: 'auto' }}>{menu}</div>
          <div>
            <Divider style={{ margin: 0 }} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 12px',
              }}
            >
              <Input
                size="small"
                style={{ marginRight: 18 }}
                value={inputValue}
                onChange={(value) => setInputValue(value)}
              />
              <Button
                style={{ fontSize: 14, padding: '0 6px' }}
                type="text"
                size="mini"
                onClick={addItem}
              >
                <IconPlus />
                Add item
              </Button>
            </div>
          </div>
        </>
      )}
    ></TreeSelect>
  );
}
```

## 控制下拉框的展开收起

默认展开下拉框。通过 popupVisible 和 onVisibleChange 控制下拉框的展开和收起。
例如以下 demo，在鼠标移出下拉框和弹出框的时候触发 onVisibleChange，参数为 false，收起下拉框。 具体 onVisibleChange 的触发事件可查看Trigger组件文档

```jsx live

function App() {
  const [visible, setVisible] = React.useState(false);
  return (
    <TreeSelect
      placeholder="hover to show options"
      popupVisible={visible}
      onVisibleChange={setVisible}
      triggerProps={{
        trigger: 'hover',
      }}
      style={{ width: 300 }}
      allowClear
    >
      <TreeSelect.Node key="node1" title="Trunk">
        <TreeSelect.Node key="node2" title="Leaf" />
      </TreeSelect.Node>
      <TreeSelect.Node key="node3" title="Trunk2">
        <TreeSelect.Node key="node4" title="Leaf" />
        <TreeSelect.Node key="node5" title="Leaf" />
      </TreeSelect.Node>
    </TreeSelect>
  );
}
```

## 自定义 TreeData 的字段名称

通过 `fieldNames` 字段可以自定义 TreeData 的字段名。

```jsx live

function App() {
  const TreeData = [
    {
      label: 'Trunk 0-0',
      value: '0-0',
      items: [
        {
          label: 'Branch 0-0-2',
          value: '0-0-2',
          selectable: false,
          items: [
            {
              label: 'Leaf',
              value: '0-0-2-1',
              items: [
                {
                  label: 'Leaf 0-0-2',
                  value: '0-0-2-1-0',
                  items: [
                    {
                      label: 'Leaf',
                      value: '0-0-2-1-0-0',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Trunk 0-1',
      value: '0-1',
      items: [
        {
          label: 'Branch 0-1-1',
          value: '0-1-1',
          items: [
            {
              label: 'Leaf',
              value: '0-1-1-0',
            },
          ],
        },
      ],
    },
  ];

  const [treeData, setTreeData] = useState(TreeData);
  return (
    <div>
      <TreeSelect
        style={{ width: 300 }}
        defaultValue={['0-1-1']}
        treeData={treeData}
        fieldNames={{
          key: 'value',
          title: 'label',
          children: 'items',
        }}
      ></TreeSelect>
    </div>
  );
}
```

## 虚拟列表

通过指定 `treeProps.virtualListProps` 来开启虚拟列表，在大量数据时获得高性能表现。

```jsx live

function App() {
  function loop(path = '0', level = 2) {
    const list = [];

    for (let i = 0; i < 10; i += 1) {
      const key = `${path}-${i}`;
      const treeNode = {
        title: key,
        key,
      };

      if (level > 0) {
        treeNode.children = loop(key, level - 1);
      }

      list.push(treeNode);
    }

    return list;
  }

  const treeData = loop();

  const treeRef = React.useRef();
  return (
    <div>
      <TreeSelect
        treeData={treeData}
        treeProps={{
          height: 200,
          renderTitle: (props) => {
            return (
              <span style={{ whiteSpace: 'nowrap', }} >
                {props.title}
              </span>
            );
          },
        }}
      />
    </div>
  );
}
```

## 拖拽排序

多选时，指定 `dragToSort` 属性以允许对已输入的值进行拖拽排序。

```jsx live
function Demo() {
  const treeData = [
    {
      key: 'node1',
      title: 'Trunk1',
      disabled: true,
      children: [
        {
          key: 'node2',
          title: 'Leaf1',
        },
      ],
    },
    {
      key: 'node3',
      title: 'Trunk2',
      children: [
        {
          key: 'node4',
          title: 'Leaf2',
        },
        {
          key: 'node5',
          title: 'Leaf3',
        },
      ],
    },
  ];

  return (
    <TreeSelect treeData={treeData} multiple dragToSort placeholder='请选择...' style={{ width: 300 }} />
  );
};
```

## API

### TreeSelect

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|allowClear|允许清除值。|boolean |`-`|-|
|animation|是否为内部标签变化添加动画。|boolean |`true`|2.15.0|
|bordered|是否显示边框|boolean |`true`|-|
|disabled|是否为禁用状态。|boolean |`-`|-|
|dragToSort|是否可以通过拖拽为 Tag 排序|boolean |`-`|2.27.0|
|error|是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)|boolean |`-`|-|
|labelInValue|设置 value 格式。默认是 `string`，设置为 `true` 时候，value 格式为： `&#123; label: string, value: string }`|boolean |`-`|-|
|loading|是否为加载状态。|boolean |`-`|-|
|multiple|是否多选|boolean |`-`|-|
|popupVisible|控制下拉框的展开收起|boolean |`-`|-|
|treeCheckable|是否展示复选框|boolean |`-`|-|
|treeCheckStrictly|树选项是否严格选中。设置为`true`时候，表示严格选中，不与父节点关联；设置为`false`时候，表示非严格选中，与父节点关联变化|boolean |`-`|-|
|unmountOnExit|是否在隐藏之后销毁 DOM 结构|boolean |`-`|-|
|inputValue|输入框搜索文本的受控值|string |`-`|2.39.0|
|placeholder|选择框默认文字。|string |`-`|-|
|autoWidth|设置宽度自适应。minWidth 默认为 0，maxWidth 默认为 100%|\| boolean\| &#123; minWidth?: CSSProperties['minWidth']; maxWidth?: CSSProperties['maxWidth'] } |`-`|2.54.0|
|fieldNames|指定 key，title，isLeaf，disabled，children 对应的字段|TreeProps['fieldNames'] |`DefaultFieldNames`|2.11.0|
|maxTagCount|最多显示多少个 `tag`，仅在多选或标签模式有效。设置 `responsive` 响应式显示标签数不建议在选项较多时使用，可能存在性能问题，|\| number\| 'responsive'\| &#123;count: number \| 'responsive';render?: (invisibleTagCount: number) => ReactNode;} |`-`|Object type in 2.37.0. `responsive ` in `2.62.0`|
|size|分别不同尺寸的选择器。对应 `24px`, `28px`, `32px`, `36px`|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|status|状态|'error' \| 'warning' |`-`|2.45.0|
|treeCheckedStrategy|定制回显方式|TreeProps['checkedStrategy'] |`all`|-|
|addBefore|选择框前添加元素|ReactNode |`-`|2.41.0|
|clearIcon|`allowClear` 时配置清除按钮的图标。|ReactNode |`-`|2.26.0|
|notFoundContent|没有数据时显示的内容|ReactNode |`-`|-|
|prefix|前缀。|ReactNode |`-`|2.11.0|
|suffixIcon|自定义选择框后缀图标。|ReactNode |`-`|-|
|arrowIcon|自定义箭头图标，设置为 `null` 不显示箭头图标。|ReactNode \| null |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultValue|选择框的默认值|\| string\| string[]\| &#123; label: ReactNode; value: string; disabled?: boolean }\| &#123; label: ReactNode; value: string; disabled?: boolean }[] |`-`|-|
|dropdownMenuStyle|设置下拉框样式|CSSProperties |`-`|2.3.0|
|removeIcon|多选时配置选中项的删除图标。当传入`null`，不显示删除图标。|ReactNode \| null |`-`|-|
|showSearch|使单选模式可搜索，传入 `&#123; retainInputValue: true }` 在搜索框聚焦时保留现有内容传入 `&#123; retainInputValueWhileSelect: true }` 在多选选择时保留输入框内容。|boolean \| &#123; retainInputValue?: boolean; retainInputValueWhileSelect?: boolean } |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|treeData|数据|TreeSelectDataType[] |`-`|-|
|treeProps|可以接受所有 Tree 组件的参数|Partial&lt;TreeProps&gt; |`-`|-|
|triggerProps|可以接受所有 Trigger 组件的参数|Partial&lt;TriggerProps&gt; |`-`|-|
|value|选中值|\| string\| string[]\| &#123; label: ReactNode; value: string; disabled?: boolean }\| &#123; label: ReactNode; value: string; disabled?: boolean }[] |`-`|-|
|dropdownRender|自定义下拉框展示|(dom: ReactNode) => ReactNode |`-`|2.3.0|
|filterTreeNode|根据输入的值筛选数据。接收 `inputText` 和 `treeNode` 两个参数，当 `option` 符合筛选条件时，返回 `true`，反之返回 `false`。treeNode 是树节点。|(inputText, treeNode: any) => boolean \| void |`-`|-|
|getPopupContainer|弹出框挂载的父节点|(node: HTMLElement) => Element |`-`|-|
|loadMore|动态加载数据|(treeNode: NodeProps, dataRef) => void |`-`|-|
|onChange|选中值改变的回调|(value: any,extra: &#123;trigger?: NodeProps;checked?: boolean;selected?: boolean;}) => void |`-`|`extra` in `2.29.0`|
|onClear|点击清除时触发，参数是当前下拉框的展开状态。|(visible: boolean) => void |`-`|-|
|onClick|鼠标点击下拉框时的回调|(e) => void |`-`|-|
|onInputValueChange|输入框搜索文本改变的回调。|(value: string, reason: InputValueChangeReason) => void |`-`|2.39.0|
|onKeyDown|键盘输入时的回调|(e) => void |`-`|2.40.0|
|onSearch|自定义搜索方法。未定义的时候将会在已经在数据中进行搜索|(inputValue: string) => void |`-`|-|
|onVisibleChange|下拉框收起展开时触发|(visible: boolean) => void |`-`|-|
|renderFormat|定制回显内容。返回值将会显示在下拉框内。若 `value` 对应的 `Option` 不存在，则第一个参数是 null|(option: NodeProps \| null, value: string \| LabelValue) => ReactNode |`-`|2.46.0|
|renderTag|自定义标签渲染，`props` 为当前标签属性，`index` 为当前标签的顺序，`values` 为所有标签的值.|(props: &#123;value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: ObjectValueType[]) => ReactNode |`-`|index、values added in 2.15.0|
|triggerElement|自定义上方显示元素|ReactNode \| ((params: &#123; value: any }) => ReactNode) |`-`|`() => ReactNode` in 2.31.0|

### LabelValue

```js
export type LabelValue = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};
```

### FieldNamesType

```js
export type FieldNamesType = {
  key?: string;
  title?: string;
  disabled?: string;
  children?: string;
  isLeaf?: string;
  disableCheckbox?: string;
  checkable?: string;
};
```

### TreeSelectDataType

```js
export type TreeSelectDataType = TreeDataType & {
  value?: string;
};
```

### TreeDataType

```js
export type TreeDataType = NodeProps & {
  key?: string;
  _index?: number;
  children?: TreeDataType[];
  [key: string]: any;
};
```

### InputValueChangeReason

```js
// 造成输入框值改变的原因：用户输入、选中选项、选项下拉框收起
export type InputValueChangeReason =
  | "manual"
  | "optionChecked"
  | "optionListHide";
```

### ObjectValueType

```js
export type ObjectValueType = {
  value?: any;
  label?: ReactNode;
  closable?: boolean;
};
```

