---
sidebar_position: 1
---

# 树 Tree

对于文件夹、分类目录、组织架构等层级较多的内容，树可以清楚显示他们的层级关系，并具有展开、收起、选择等交互功能。

## 基础用法

为每个 `TreeNode` 节点赋予全局唯一的 `key`（必填项），`title` 为该节点显示的内容。

```jsx live
function Demo() {
  return (
    <Tree
      defaultExpandedKeys={['0-0-0']}
      defaultSelectedKeys={['0-0-0', '0-0-1']}
      onSelect={(value, info) => {
        console.log(value, info);
      }}
      onExpand={(keys, info) => {
        console.log(keys, info);
      }}
    >
      <Tree.Node title="Trunk" key="0-0">
        <Tree.Node title="Branch 0-0-0" key="0-0-0" disabled>
          <Tree.Node title="Leaf" key="0-0-0-0" />
          <Tree.Node title="Leaf" key="0-0-0-1" />
        </Tree.Node>
        <Tree.Node title="Branch 0-0-1" key="0-0-1">
          <Tree.Node title="Leaf" key="0-0-1-0" />
        </Tree.Node>
      </Tree.Node>
    </Tree>
  );
};
```

## 由treeData直接生成

```jsx live
function App() {

  const TreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Branch 0-0-2',
          key: '0-0-2',
          selectable: false,
          children: [
            {
              title: 'Leaf',
              key: '0-0-2-1',
              children: [
                {
                  title: 'Leafsss 0-0-2',
                  key: '0-0-2-1-0',
                  children: [
                    {
                      title: 'Leaf',
                      key: '0-0-2-1-0-0',
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
      title: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          key: '0-1-1',
          children: [
            {
              title: 'Leaf',
              key: '0-1-1-0',
            },
          ],
        },
      ],
    },
  ];

  const [treeData, setTreeData] = useState(TreeData);
  return (
    <div>
      <Tree defaultSelectedKeys={['0-0-1']} treeData={treeData}></Tree>
    </div>
  );
}
```

## 节点占一行

节点占据一整行。

```jsx live
function Demo() {
  return (
    <Tree blockNode>
      <Tree.Node title="Trunk 0-0" key="0-0">
        <Tree.Node title="Branch 0-0-0" key="0-0-0" disabled>
          <Tree.Node title="Leaf 0-0-0-0" key="0-0-0-0" />
          <Tree.Node title="Leaf 0-0-0-1" key="0-0-0-1" />
        </Tree.Node>
        <Tree.Node title="Branch 0-0-1" key="0-0-1">
          <Tree.Node title="Leaf 0-0-1-0" key="0-0-1-0" />
        </Tree.Node>
      </Tree.Node>
    </Tree>
  );
};
```

## 多选

`Tree` 设置 `multiple` 属性为`true`，可以启用多选。

```jsx live
function App() {

  const TreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          key: '0-0-2',
          disableCheckbox: true,
          children: [
            {
              title: 'Leaf',
              key: '0-0-2-1',
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
          checkable: false,
          children: [
            {
              title: 'Leaf',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf',
              key: '0-1-1-2',
            },
          ],
        },
        {
          title: 'Leaf',
          key: '0-1-2',
        },
      ],
    },
  ];

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [checked, setChecked] = useState(true);
  return (
    <div>
      <Checkbox
        style={{ marginBottom: 24 }}
        checked={checked}
        onChange={(value) => {
          setChecked(value);
          setSelectedKeys([]);
        }}
      >
        multiple
      </Checkbox>

      <br />
      <Typography.Text>Current: {selectedKeys.join(' , ')}</Typography.Text>
      <br />
      <Tree
        multiple={checked}
        selectedKeys={selectedKeys}
        onSelect={(value, extra) => {
          console.log(value, extra);
          setSelectedKeys(value);
        }}
        treeData={TreeData}
      ></Tree>
    </div>
  );
}
```

## 带复选框的树

为 `Tree` 添加 `checkable` 属性即可使树具有复选框功能，可以用 `defaultCheckedKeys` 指定复选框默认选中的节点。

```jsx live
function App() {

  const TreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          key: '0-0-2',
          disabled: true,
          children: [
            {
              title: 'Leaf',
              key: '0-0-2-1',
            },
            {
              title: 'Leaf',
              key: '0-0-2-2',
              disableCheckbox: true,
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
              title: 'Leaf ',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf ',
              key: '0-1-1-2',
            },
          ],
        },
        {
          title: 'Leaf',
          key: '0-1-2',
        },
      ],
    },
  ];

  const [checkedKeys, setCheckedKeys] = useState(['0-0', '0-1']);
  const [checkStrictly, setCheckStrictly] = useState(false);
  return (
    <div>
      <Checkbox
        style={{ marginBottom: 24 }}
        onChange={(value) => {
          setCheckStrictly(value);
          setCheckedKeys([]);
        }}
      >
        checkStrictly
      </Checkbox>

      <Tree
        checkStrictly={checkStrictly}
        checkable
        checkedKeys={checkedKeys}
        onCheck={(value, extra) => {
          setCheckedKeys(value);
        }}
        treeData={TreeData}
      ></Tree>
    </div>
  );
}
```

## 受控模式

可以指定树的 `selectedKeys` 或 `checkedKeys` 或 `expandedKeys` 属性使树变为受控模式，在对应的 `onSelect` / `onCheck` / `onExpand` 回调中对返回值进行操作。

```jsx live
function App() {

  const TreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf 0-0-1',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          key: '0-0-2',
          children: [
            {
              title: 'Leaf 0-0-2-1',
              key: '0-0-2-1',
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
          title: 'Leaf 0-1-1',
          key: '0-1-1',
        },
        {
          title: 'Leaf 0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ];

  const allCheckedKeys = ['0-0', '0-0-1', '0-0-2', '0-0-2-1', '0-1', '0-1-1', '0-1-2'];
  const allExpandedKeys = ['0-0', '0-1', '0-0-2'];
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(allExpandedKeys);
  return (
    <div>
      <Button.Group style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          onClick={() => setCheckedKeys(checkedKeys.length ? [] : allCheckedKeys)}
        >
          {checkedKeys.length ? 'deselect all' : 'select all'}
        </Button>
        <Button
          type="primary"
          onClick={() => setExpandedKeys(expandedKeys.length ? [] : allExpandedKeys)}
        >
          {expandedKeys.length ? 'fold' : 'unfold'}
        </Button>
      </Button.Group>
      <Tree
        checkable
        checkedKeys={checkedKeys}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        onSelect={(keys, extra) => {
          console.log(keys, extra);
          setSelectedKeys(keys);
        }}
        onCheck={(keys, extra) => {
          console.log(keys, extra);
          setCheckedKeys(keys);
        }}
        onExpand={(keys, extra) => {
          console.log(keys, extra);
          setExpandedKeys(keys);
        }}
        treeData={TreeData}
      ></Tree>
    </div>
  );
}
```

## 动态加载

动态加载节点。

```jsx live
function App() {

  const defaultTreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
    },
    {
      title: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          key: '0-1-1',
        },
      ],
    },
  ];

  const [treeData, setTreeData] = React.useState(defaultTreeData);

  const loadMore = (treeNode) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        treeNode.props.dataRef.children = [
          {
            title: `leaf`,
            key: `${treeNode.props._key}-1`,
            isLeaf: true,
          },
        ];
        setTreeData([...treeData]);
        resolve();
      }, 1000);
    });
  };

  return <Tree defaultSelectedKeys={['node1']} loadMore={loadMore} treeData={treeData}></Tree>;
}
```

## 拖拽

可拖拽的树节点。

```jsx live
function App() {

  const TreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf 0-0-1',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          key: '0-0-2',
          disableCheckbox: true,
          children: [
            {
              draggable: false,
              title: 'Leaf 0-0-2-1 (Drag disabled)',
              key: '0-0-2-1',
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
          checkable: false,
          children: [
            {
              title: 'Leaf 0-1-1-1',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf 0-1-1-2',
              key: '0-1-1-2',
            },
          ],
        },
        {
          title: 'Leaf 0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ];

  const [treeData, setTreeData] = useState(TreeData);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={setChecked}
        style={{ marginBottom: 20 }}
      >
        checkable
      </Checkbox>
      <Tree
        draggable
        blockNode
        checkable={checked}
        onDrop={({ dragNode, dropNode, dropPosition }) => {
          const loop = (data, key, callback) => {
            data.some((item, index, arr) => {
              if (item.key === key) {
                callback(item, index, arr);
                return true;
              }

              if (item.children) {
                return loop(item.children, key, callback);
              }
            });
          };

          const data = [...treeData];
          let dragItem;
          loop(data, dragNode.props._key, (item, index, arr) => {
            arr.splice(index, 1);
            dragItem = item;
            dragItem.className = 'tree-node-dropover';
          });

          if (dropPosition === 0) {
            loop(data, dropNode.props._key, (item, index, arr) => {
              item.children = item.children || [];
              item.children.push(dragItem);
            });
          } else {
            loop(data, dropNode.props._key, (item, index, arr) => {
              arr.splice(dropPosition < 0 ? index : index + 1, 0, dragItem);
            });
          }

          setTreeData([...data]);
          setTimeout(() => {
            dragItem.className = '';
            setTreeData([...data]);
          }, 1000);
        }}
        treeData={treeData}
      ></Tree>
    </div>
  );
}
```

## 设置回填方式

为 `Tree` 添加 `checkedStrategy` 可以设置选中时的回填方式

```jsx live
function App() {

  const TreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          key: '0-0-2',
          children: [
            {
              title: 'Leaf',
              key: '0-0-2-1',
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
              title: 'Leaf',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf',
              key: '0-1-1-2',
            },
          ],
        },
        {
          title: 'Leaf',
          key: '0-1-2',
        },
      ],
    },
  ];

  const [checkedKeys, setCheckedKeys] = useState(['0-0', '0-1']);
  const [checkedStrategy, setCheckedStrategy] = useState(Tree.SHOW_ALL);
  return (
    <div>
      <Radio.Group
        type="button"
        value={checkedStrategy}
        onChange={(value) => {
          setCheckedStrategy(value);
          setCheckedKeys([]);
        }}
        options={[
          {
            value: Tree.SHOW_ALL,
            label: 'show all',
          },
          {
            value: Tree.SHOW_PARENT,
            label: 'show parent',
          },
          {
            value: Tree.SHOW_CHILD,
            label: 'show child',
          },
        ]}
      />
      <div style={{ margin: '20px 0' }}>
        <Typography.Text>Current: {checkedKeys.join(' , ')}</Typography.Text>
      </div>
      <Tree
        checkedStrategy={checkedStrategy}
        checkable
        checkedKeys={checkedKeys}
        onCheck={(value, extra) => {
          setCheckedKeys(value);
        }}
        treeData={TreeData}
      ></Tree>
    </div>
  );
}
```

## 显示连接线

为 `Tree` 添加 `showLine` 属性即可使树具有连接线

```jsx live
function App() {

  const TreeData = [
    {
      title: 'Trunk 1',
      key: '0-0',
      children: [
        {
          title: 'Trunk 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
              children: [
                {
                  title: 'leaf',
                  key: '0-0-0-1-0',
                },
              ],
            },
            {
              title: 'leaf',
              key: '0-0-0-2',
            },
          ],
        },
        {
          title: 'Trunk 1-1',
          key: '0-0-1',
        },
        {
          title: 'Trunk 1-2',
          key: '0-0-2',
          children: [
            {
              title: 'leaf',
              key: '0-0-2-0',
            },
            {
              title: 'leaf',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
    {
      title: 'Trunk 2',
      key: '0-1',
    },
    {
      title: 'Trunk 3',
      key: '0-2',
      children: [
        {
          title: 'Trunk 3-0',
          key: '0-2-0',
          children: [
            {
              title: 'leaf',
              key: '0-2-0-0',
            },
            {
              title: 'leaf',
              key: '0-2-0-1',
            },
          ],
        },
      ],
    },
  ];

  const [treeData, setTreeData] = useState(TreeData);
  const [checked, setChecked] = useState(true);
  return (
    <div>
      <div>
        <Typography.Text>showLine</Typography.Text>
        <Switch style={{ marginLeft: 12 }} checked={checked} onChange={setChecked}></Switch>
      </div>
      <Tree defaultSelectedKeys={['0-0-1']} treeData={treeData} showLine={checked}></Tree>
    </div>
  );
}
```

## 不同尺寸

```jsx live
function App() {

  const [size, setSize] = React.useState('default');
  return (
    <div>
      <Radio.Group
        options={['mini', 'small', 'default', 'large']}
        type="button"
        value={size}
        onChange={setSize}
        style={{ marginBottom: 20 }}
      ></Radio.Group>
      <Tree blockNode style={{ marginRight: 20 }} checkable size={size}>
        <Tree.Node title="Trunk 0-0" key="0-0">
          <Tree.Node title="Branch 0-0-0" key="0-0-0" disabled>
            <Tree.Node title="Leaf" key="0-0-0-0" />
            <Tree.Node title="Leaf" key="0-0-0-1" />
          </Tree.Node>
          <Tree.Node title="Branch 0-0-1" key="0-0-1">
            <Tree.Node title="Leaf" key="0-0-1-0" />
          </Tree.Node>
        </Tree.Node>
      </Tree>
    </div>
  );
}
```

## 定制节点图标

只需为 `TreeNode` 指定 `icon` 属性的值即可为任意节点指定任意图标。

```jsx live
function App() {
  return (
    <Tree>
      <Tree.Node icon={<IconStar />} key="node1" title="Trunk">
        <Tree.Node icon={<IconStar />} key="node2" title="Leaf" />
      </Tree.Node>
      <Tree.Node icon={<IconStar />} key="node3" title="Trunk">
        <Tree.Node icon={<IconStar />} key="node4" title="Leaf" />
        <Tree.Node icon={<IconStar />} key="node5" title="Leaf" />
      </Tree.Node>
    </Tree>
  );
}
```

## 定制额外节点

为 `Tree` 设置 `renderExtra` 可以自定义树节点的展示。

```jsx live
function App() {

  const generatorTreeNodes = (treeData) => {
    return treeData.map((item) => {
      const { children, key, ...rest } = item;
      return (
        <Tree.Node key={key} {...rest} dataRef={item}>
          {children ? generatorTreeNodes(item.children) : null}
        </Tree.Node>
      );
    });
  };

  const TreeData = [
    {
      title: 'Trunk',
      key: '0-0',
      children: [
        {
          title: 'Leaf',
          key: '0-0-1',
        },
        {
          title: 'Branch',
          key: '0-0-2',
          children: [
            {
              title: 'Leaf',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
    {
      title: 'Trunk',
      key: '0-1',
      children: [
        {
          title: 'Branch',
          key: '0-1-1',
          children: [
            {
              title: 'Leaf',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf',
              key: '0-1-1-2',
            },
          ],
        },
        {
          title: 'Leaf',
          key: '0-1-2',
        },
      ],
    },
  ];

  const [treeData, setTreeData] = useState(TreeData);
  return (
    <div style={{ width: 500, padding: 2, overflow: 'auto' }}>
      <Tree
        blockNode
        checkable
        renderExtra={(node) => {
          return (
            <IconPlus
              style={{
                position: 'absolute',
                right: 8,
                fontSize: 12,
                top: 10,
                color: '#3370ff',
              }}
              onClick={() => {
                const dataChildren = node.dataRef.children || [];
                dataChildren.push({
                  title: 'new tree node',
                  key: node._key + '-' + (dataChildren.length + 1),
                });
                node.dataRef.children = dataChildren;
                setTreeData([...treeData]);
              }}
            />
          );
        }}
      >
        {generatorTreeNodes(treeData)}
      </Tree>
    </div>
  );
}
```

## 定制组件图标

通过`icons` 属性即可设置组件 `loadingIcon`,`dragIcon`,`switcherIcon`。

```jsx live
function App() {
  return (
    <Tree
      icons={{
        switcherIcon: <IconDown />,
        dragIcon: <IconDragArrow />,
      }}
      showLine
      draggable
    >
      <Tree.Node key="node1" title="Trunk">
        <Tree.Node key="node2" title="Leaf" />
      </Tree.Node>
      <Tree.Node key="node3" title="Trunk">
        <Tree.Node
          key="node4"
          icons={{
            switcherIcon: <IconDriveFile />,
          }}
          title="Leaf"
        />
        <Tree.Node
          key="node5"
          icons={{
            switcherIcon: <IconDriveFile />,
          }}
          title="Leaf"
        />
      </Tree.Node>
    </Tree>
  );
}
```

## 虚拟列表

通过指定 `virtualListProps` 来开启虚拟列表，在大量数据时获得高性能表现。

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
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => {
          treeRef.current && treeRef.current.scrollIntoView('0-0-2-2');
        }}
      >
        Scroll to 0-0-2-2, i.e. the 26th.
      </Button>
      <Tree
        ref={treeRef}
        blockNode
        checkable
        treeData={treeData}
        virtualListProps={{ height: 200 }}
      />
    </div>
  );
}
```

## 搜索树

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

  const [treeData, setTreeData] = useState(TreeData);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    if (!inputValue) {
      setTreeData(TreeData);
    } else {
      const result = searchData(inputValue);
      setTreeData(result);
    }
  }, [inputValue]);
  return (
    <div>
      <Input.Search
        style={{
          marginBottom: 8,
          maxWidth: 240,
        }}
        onChange={setInputValue}
      />

      <Tree
        treeData={treeData}
        renderTitle={({ title }) => {
          if (inputValue) {
            const index = title.toLowerCase().indexOf(inputValue.toLowerCase());

            if (index === -1) {
              return title;
            }

            const prefix = title.substr(0, index);
            const suffix = title.substr(index + inputValue.length);
            return (
              <span>
                {prefix}
                <span style={{ color: 'var(--color-primary-light-4)' }}>
                  {title.substr(index, inputValue.length)}
                </span>
                {suffix}
              </span>
            );
          }

          return title;
        }}
      ></Tree>
    </div>
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
      <Tree
        defaultSelectedKeys={['0-0-1']}
        treeData={treeData}
        fieldNames={{
          key: 'value',
          title: 'label',
          children: 'items',
        }}
      ></Tree>
    </div>
  );
}
```

## API

### Tree

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|autoExpandParent|是否自动展开父节点|boolean |`true`|-|
|blockNode|是否节点占据一行|boolean |`-`|-|
|checkable|是否在节点前添加选框|boolean |`-`|-|
|checkStrictly|是否取消父子节点关联|boolean |`-`|-|
|draggable|是否可拖拽|boolean |`-`|-|
|multiple|是否支持多选|boolean |`-`|-|
|selectable|是否可以选择|boolean |`true`|-|
|showLine|是否展示连接线|boolean |`-`|-|
|size|不同尺寸|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|actionOnClick|点击节点时对应的操作，可以是选中，复选选中，展开/收起|ActionOnClick \| ActionOnClick[] |`-`|select|
|allowDrop|是否允许拖拽时放置在该节点。 (`dragNode` in `2.23.0`)|AllowDrop |`() => true`|2.7.0|
|checkedKeys|选中复选框的树节点。（受控）|string[] |`-`|-|
|checkedStrategy|定制回填方式 &lt;br/> all: 返回所有选中的节点&lt;br/> parent: 父子节点都选中时只返回父节点 &lt;br/> child: 只返回子节点|SHOW_ALL \| SHOW_PARENT \| SHOW_CHILD |`all`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultCheckedKeys|默认选中复选框的树节点|string[] |`-`|-|
|defaultExpandedKeys|默认展开的节点。|string[] |`-`|-|
|defaultSelectedKeys|默认选中的树节点|string[] |`-`|-|
|expandedKeys|展开的节点，(受控)。|string[] |`-`|-|
|fieldNames|指定 key，title，isLeaf，disabled，children 对应的字段|FieldNamesType |`-`|2.11.0|
|halfCheckedKeys|半选状态的节点.仅在 checkable 且 checkStrictly 时生效|string[] |`-`|2.27.0|
|loadMore|异步加载数据的回调，返回一个 `Promise`。|(node: NodeInstance) =&gt; Promise&lt;void&gt; |`-`|-|
|onDragEnd|节点结束拖拽的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, node: NodeInstance) =&gt; void |`-`|-|
|onDragLeave|节点离开可释放目标上时的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, node: NodeInstance) =&gt; void |`-`|-|
|onDragOver|节点被拖拽至可释放目标上时的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, node: NodeInstance) =&gt; void |`-`|-|
|onDragStart|节点开始拖拽的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, node: NodeInstance) =&gt; void |`-`|-|
|onDrop|节点在可释放目标上释放时的回调|(info: &#123;e: DragEvent&lt;HTMLSpanElement&gt;;dragNode: NodeInstance \| null;dropNode: NodeInstance \| null;dropPosition: number;}) =&gt; void |`-`|-|
|selectedKeys|选中的树节点。（受控）|string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|treeData|可以通过传入`treeData`,生成对应的树结构|TreeDataType[] |`-`|-|
|virtualListProps|传递虚拟列表属性，传入此参数以开启虚拟滚动|AvailableVirtualListProps |`-`|2.11.0|
|icons|定制节点图标|\| ((nodeProps: NodeProps) => &#123;dragIcon?: ReactNode;switcherIcon?: ReactNode;loadingIcon?: ReactNode;})\| &#123;dragIcon?: ReactNode;switcherIcon?: ReactNode;loadingIcon?: ReactNode;} |`FieldNamesType`|2.9.0|
|onCheck|点击树节点复选框的回调|(checkedKeys: string[],extra: &#123;node: NodeInstance;checkedNodes: NodeInstance[];checked: boolean;halfCheckedKeys: string[];halfCheckedNodes: NodeInstance[];e: Event;}) => void |`-`|-|
|onExpand|点击展开/关闭的回调|(expandedKeys: string[],exra?: &#123; expanded: boolean; node: NodeInstance; expandedNodes: NodeInstance[] }) => void |`-`|-|
|onSelect|点击树节点的回调|(selectedKeys: string[],extra: &#123;selected: boolean;selectedNodes: NodeInstance[];node: NodeInstance;e: Event;}) => void |`-`|-|
|renderExtra|渲染额外节点|(props: NodeProps) => ReactNode |`-`|-|
|renderTitle|自定义 title 的渲染|(props: NodeProps) => ReactNode |`-`|-|

### Tree.Node

|参数名|描述|类型|默认值|
|---|---|---|---|
|checkable|是否显示多选框|boolean |`-`|
|disableCheckbox|是否禁用复选框|boolean |`-`|
|disabled|是否禁用节点|boolean |`-`|
|draggable|当前节点是否可拖拽|boolean |`-`|
|isLeaf|是否是叶子节点。动态加载时有效|boolean |`-`|
|selectable|是否允许选中|boolean |`true`|
|icons|定制节点图标，优先级高于 Tree。同时设置 Tree 上的 icons 属性时候，将会进行合并。|TreeProps['icons'] |`-`|
|icon|该节点个性化显示的图标|ReactNode |`-`|
|title|该节点显示的标题|string \| ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### AllowDrop

```js
export type AllowDrop = (options: {
  dropNode: NodeInstance;
  dragNode: NodeInstance | null;
  dropPosition: number;
}) => boolean;
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

### ActionOnClick

```js
export type ActionOnClick = "select" | "check" | "expand";
```

### NodeInstance

```js
export type NodeInstance = ReactElement<
  PropsWithChildren<NodeProps>,
  typeof TreeNode
>;
```

### VirtualListProps

|参数名|描述|类型|默认值|
|------|:----------:|:--------:|-----:|
|height|可视区高度 (`2.11.0` 开始支持如 `80%` 的 `string` 类型)|`number`|`200`|
|threshold|自动开启虚拟滚动的元素数量阈值，传入`null`以禁用虚拟滚动。|`number`\|`null`|`100`|
|isStaticItemHeight|是否为相同高度的静态元素|`boolean`|`true`|

## 常见问题

1. `Tree` 设置了`autoExpandParent=true`，但没有默认展开全部节点？

  `autoExpandParent` 仅在 `Tree` 第一次挂载的时候生效。如果数据是从远程获取，可以在数据获取完成后，再去渲染 `Tree` 组件。

