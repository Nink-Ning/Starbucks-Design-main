---
sidebar_position: 1
---

# 表格 Table

用于数据收集展示、分析整理、操作处理。

## 基础用法

最基础的用法。

```jsx live
function Demo() {

  const columns: TableColumnProps[] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Salary",
      dataIndex: "salary",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];
  const data = [
    {
      key: "1",
      name: "Jane Doe",
      salary: 23000,
      address: "32 Park Road, London",
      email: "jane.doe@example.com",
    },
    {
      key: "2",
      name: "Alisa Ross",
      salary: 25000,
      address: "35 Park Road, London",
      email: "alisa.ross@example.com",
    },
    {
      key: "3",
      name: "Kevin Sandra",
      salary: 22000,
      address: "31 Park Road, London",
      email: "kevin.sandra@example.com",
    },
    {
      key: "4",
      name: "Ed Hellen",
      salary: 17000,
      address: "42 Park Road, London",
      email: "ed.hellen@example.com",
    },
    {
      key: "5",
      name: "William Smith",
      salary: 27000,
      address: "62 Park Road, London",
      email: "william.smith@example.com",
    },
  ];

  return <Table columns={columns} data={data} />;
};
```

## 开启选择

表格开启选择，可以设置 `rowSelection.type` 来使用复选框和单选框。 `checkbox` - 复选框。 `radio` - 单选框。

```jsx live
function App() {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const data = [
    {
      id: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      id: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      id: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      id: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      id: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  const [type, setType] = useState('checkbox');
  const [selectedRowKeys, setSelectedRowKeys] = useState(['4']);
  return (
    <div>
      <Radio.Group
        style={{
          marginBottom: 20,
        }}
        type="button"
        options={['checkbox', 'radio']}
        value={type}
        onChange={(v) => setType(v)}
      />
      <Table
        rowKey="id"
        columns={columns}
        data={data}
        rowSelection={{
          type,
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            console.log('onChange:', selectedRowKeys, selectedRows);
            setSelectedRowKeys(selectedRowKeys);
          },
          onSelect: (selected, record, selectedRows) => {
            console.log('onSelect:', selected, record, selectedRows);
          },
          checkboxProps: (record) => {
            return {
              disabled: record.id === '4',
            };
          },
        }}
      />
    </div>
  );
}
```

## 展开行

当内容过长，可以通过`expandedRowRender`设置展开行。如果返回值是 `null`，不会渲染展开按钮。

```jsx live
function Demo() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      expandedRowRender={(record) => {
        return `This is No.${record.key} description.`;
      }}
      onExpand={(detail, expanded) => {
        console.log(detail, expanded);
      }}
      onExpandedRowsChange={(expandedRows) => {
        console.log(expandedRows);
      }}
      expandProps={{
        expandRowByClick: true,
        rowExpandable: (record) => record.key !== '4',
      }}
    />
  );
};
```

## 定制展开参数

可以通过 `expandProps` 定制展开列的图标，宽度，标题，是否展开等。

**Tip:** 正常情况下，是否展开是由 `expandedRowRender` 返回值决定的，如果过多的 `expandedRowRender` 计算导致卡顿，建议使用 `expandProps.rowExpandable`。

```jsx live
function App() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      expandedRowRender={(record) => record.email}
      expandProps={{
        icon: ({ expanded, record }) =>
          expanded ? (
            <button>
              <IconDown />
            </button>
          ) : (
            <button>
              <IconRight />
            </button>
          ),
        width: 60,
        columnTitle: 'Expand',
        rowExpandable: (record) => record.key !== '4',
      }}
    />
  );
}
```

## 嵌套子表格

嵌套子表格的例子，点击展开按钮可以在展开区域展示子表格。

```jsx live
function Demo() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  function expandedRowRender() {
    return <Table columns={columns} data={data} pagination={false} />;
  }

  return (
    <Table indentSize={60} expandedRowRender={expandedRowRender} columns={columns} data={data} />
  );
};
```

## 树形数据展示

树形数据展示的例子，`data` 里有 `children` 字段, 或者通过 `childrenColumnName` 设置成自定义字段。

```jsx live
function App() {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
      children: [
        {
          key: '1-1',
          name: 'Christina',
          address: '332 Park Road, London',
          email: 'christina@example.com',
        },
      ],
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
      children: [
        {
          key: '2-1',
          name: 'Ed Hellen',
          salary: 17000,
          address: '42 Park Road, London',
          email: 'ed.hellen@example.com',
          children: [
            {
              key: '2-1-1',
              name: 'Eric Miller',
              salary: 23000,
              address: '67 Park Road, London',
              email: 'eric.miller@example.com',
            },
            {
              key: '2-1-2',
              name: 'Tom Jerry',
              salary: 666,
              address: '67 Park Road, London',
              email: 'tom.jerry@example.com',
            },
          ],
        },
        {
          key: '2-2',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com',
        },
        {
          key: '2-3',
          name: 'George Bush',
          salary: 24000,
          address: '62 Park Road, London',
          email: 'george.bush@example.com',
        },
      ],
    },
    {
      key: '7',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
  ];

  const [checkStrictly, setCheckStrictly] = useState(true);
  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        checkStrictly:
        <Switch onChange={(checked) => setCheckStrictly(checked)} checked={checkStrictly} />
      </Space>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys, selectedRows);
          },
          checkStrictly,
        }}
        columns={columns}
        data={data}
      />
    </div>
  );
}
```

## 表格属性

在这里，你可以方便的打开或关闭表格的属性，来看一下吧。

```jsx live
class App extends React.Component {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  defaultData = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      checkbox: true,
      checkAll: true,
      border: true,
      borderCell: false,
      hover: true,
      stripe: false,
      loading: false,
      showHeader: true,
      fixedHeader: false,
      no_data: false,
      size: 'default',
      pagePosition: 'br',
    };
  }

  onChange = (type, checked) => {
    this.setState({
      [type]: checked,
    });
  };

  render() {
    const {
      checkbox,
      borderCell,
      checkAll,
      border,
      hover,
      stripe,
      loading,
      showHeader,
      fixedHeader,
      no_data,
      size,
      pagePosition,
    } = this.state;

    const data = no_data ? [] : this.defaultData;

    return (
      <div>
        <div>
          <Form layout="inline">
            <Form.Item label="Border" colon={false}>
              <Switch size="small" onChange={this.onChange.bind(this, 'border')} checked={border} />
            </Form.Item>
            <Form.Item label="Border Cell" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'borderCell')}
                checked={borderCell}
              />
            </Form.Item>
            <Form.Item label="Hover" colon={false}>
              <Switch size="small" onChange={this.onChange.bind(this, 'hover')} checked={hover} />
            </Form.Item>
            <Form.Item label="Stripe" colon={false}>
              <Switch size="small" onChange={this.onChange.bind(this, 'stripe')} checked={stripe} />
            </Form.Item>
            <Form.Item label="Checkbox" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'checkbox')}
                checked={checkbox}
              />
            </Form.Item>
            <Form.Item label="Check All" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'checkAll')}
                checked={checkAll}
              />
            </Form.Item>
            <Form.Item label="Loading" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'loading')}
                checked={loading}
              />
            </Form.Item>
            <Form.Item label="Table Header" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'showHeader')}
                checked={showHeader}
              />
            </Form.Item>
            <Form.Item label="Header fixed" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'fixedHeader')}
                checked={fixedHeader}
              />
            </Form.Item>
            <Form.Item label="No data" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'no_data')}
                checked={no_data}
              />
            </Form.Item>
            <Form.Item label="Size" colon={false}>
              <Radio.Group
                type="button"
                options={['default', 'middle', 'small', 'mini']}
                value={size}
                onChange={this.onChange.bind(this, 'size')}
              />
            </Form.Item>
            <Form.Item label="Pagination position" colon={false}>
              <Radio.Group
                type="button"
                options={[
                  {
                    label: 'BottomRight',
                    value: 'br',
                  },
                  {
                    label: 'BottomLeft',
                    value: 'bl',
                  },
                  {
                    label: 'TopRight',
                    value: 'tr',
                  },
                  {
                    label: 'TopLeft',
                    value: 'tl',
                  },
                  {
                    label: 'TopCenter',
                    value: 'topCenter',
                  },
                  {
                    label: 'BottomCenter',
                    value: 'bottomCenter',
                  },
                ]}
                value={pagePosition}
                onChange={this.onChange.bind(this, 'pagePosition')}
              />
            </Form.Item>
          </Form>
        </div>
        <div>
          <Table
            columns={this.columns}
            data={data}
            {...this.state}
            rowSelection={
              checkbox && {
                type: 'checkbox',
                checkAll: checkAll,
              }
            }
            scroll={fixedHeader ? { y: 120 } : {}}
            style={{ marginTop: 10, }}
            pagination={{ pageSize: 5, }}
          />
        </div>
      </div>
    );
  }
}
```

## 排序和筛选

配置 `Column` 的 `sorter`，可以对表格进行排序。
配置 `Column` 的 `filters`，可以对表格进行筛选。
`sorter` 为一个排序函数，当然，你也可以指定 `sorter` 为 `true`，这样你可以通过 `Table` 的 `onChange` 事件进行自定义排序。
`filters` 为一个数组，包含着要筛选的信息，需要配合 `onFilter` 使用。当然也可以配合 `Table` 的 `onChange` 事件进行自定义筛选或者服务端筛选。

**默认排序和筛选**：通过指定 `defaultFilters` 和 `defaultSortOrder` 可以指定默认的排序和筛选。

```jsx live
function Demo() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      sorter: (a, b) => a.salary - b.salary,
      filters: [
        {
          text: '> 20000',
          value: '20000',
        },
        {
          text: '> 30000',
          value: '30000',
        },
      ],
      defaultFilters: ['20000'],
      onFilter: (value, row) => row.salary > value,
      sortDirections: ['ascend'],
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'Paris',
          value: 'Paris',
        },
      ],
      onFilter: (value, row) => row.address.indexOf(value) > -1,
      filterMultiple: false,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, Paris',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, Paris',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  return <Table columns={columns} data={data} />;
};
```

## 自定义筛选菜单

自定义筛选菜单。

```jsx live
function App() {

  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  const inputRef = useRef(null);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filterIcon: <IconSearch />,
      filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
        return (
          <div className="arco-table-custom-filter">
            <Input.Search
              ref={inputRef}
              searchButton
              placeholder="Please enter name"
              value={filterKeys[0] || ''}
              onChange={(value) => {
                setFilterKeys(value ? [value] : []);
              }}
              onSearch={() => {
                confirm();
              }}
            />
          </div>
        );
      },
      onFilter: (value, row) => (value ? row.name.indexOf(value) !== -1 : true),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => inputRef.current.focus(), 150);
        }
      },
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  return <Table columns={columns} data={data} />;
}
```

## 多列排序

`column.sorter` 支持传入一个对象，指定该对象的 `multiple` 属性可以实现多列排序的效果。`multiple`为`number`类型，数字越大代表排序优先级越高。
**注意：** 多列排序配合 `sortOrder` 使用时，为保持状态一致性，所有指定了`sorter`的列都需要同时指定`sortOrder`（可为undefined），同时需要注意列之间的互斥关系。

```jsx live
function Demo() {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Score A',
      dataIndex: 'scoreA',
      defaultSortOrder: 'descend',
      sorter: {
        compare: (a, b) => a.scoreA - b.scoreA,
        multiple: 3,
      },
    },
    {
      title: 'Score B',
      dataIndex: 'scoreB',
      defaultSortOrder: 'ascend',
      sorter: {
        compare: (a, b) => a.scoreB - b.scoreB,
        multiple: 2,
      },
    },
    {
      title: 'Score C',
      dataIndex: 'scoreC',
      sorter: {
        compare: (a, b) => a.scoreC - b.scoreC,
        multiple: 1,
      },
    },
  ];
  const data = [
    {
      key: '1',
      name: 'A',
      age: 18,
      scoreA: 100,
      scoreB: 60,
      scoreC: 70,
    },
    {
      key: '2',
      name: 'B',
      age: 17,
      scoreA: 100,
      scoreB: 90,
      scoreC: 80,
    },
    {
      key: '3',
      name: 'C',
      age: 19,
      scoreA: 100,
      scoreB: 70,
      scoreC: 60,
    },
    {
      key: '4',
      name: 'D',
      age: 15,
      scoreA: 80,
      scoreB: 70,
      scoreC: 100,
    },
    {
      key: '5',
      name: 'E',
      age: 20,
      scoreA: 80,
      scoreB: 70,
      scoreC: 90,
    },
  ];
  return (
    <Table
      data={data}
      columns={columns}
      onChange={(pagination, changedSorter) => {
        console.log(changedSorter);
      }}
    />
  );
};
```

## 自定义分页

自定义分页，通过设置 `total`，`pageSize`，通过 `onChange` 来动态更新表格数据。当分页设置 `simple` 为 `true` 时，会应用简单分页样式。关于 `pagination` 的具体设置可查看pagination 组件文档。通过 `renderPagination` 可以自定义分页渲染部分。

```jsx live
function App() {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const allData = Array(200)
    .fill('')
    .map((_, index) => ({
      key: `${index}`,
      name: `Kevin Sandra ${index}`,
      salary: 22000,
      address: `${index} Park Road, London`,
      email: `kevin.sandra_${index}@example.com`,
    }));

  const [data, setData] = useState(allData);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({
    sizeCanChange: true,
    showTotal: true,
    total: 96,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const [loading, setLoading] = useState(false);

  function onChangeTable(pagination) {
    const { current, pageSize } = pagination;
    setLoading(true);
    setTimeout(() => {
      setData(allData.slice((current - 1) * pageSize, current * pageSize));
      setPagination((pagination) => ({ ...pagination, current, pageSize }));
      setLoading(false);
    }, 1000);
  }

  return (
    <Table
      loading={loading}
      columns={columns}
      data={data}
      pagination={pagination}
      onChange={onChangeTable}
      rowSelection={{
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          console.log('selectedRowKeys', selectedRowKeys);
          console.log('selectedRows', selectedRows);
          setSelectedRowKeys(selectedRowKeys);
        },
      }}
      renderPagination={(paginationNode) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <Space>
            <span>Selected {selectedRowKeys.length}</span>
            <Button size="mini">Save</Button>
            <Button size="mini">Delete</Button>
          </Space>
          {paginationNode}
        </div>
      )}
    />
  );
}
```

## 自定义单元格内容

通过 `columns` 中的 `render` 字段，可以自定义单元格的内容

```jsx live
function Demo() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      render: (col, record, index) => (
        <span>
          <span
            style={{
              color: '#FF7D00',
              fontWeight: 600,
            }}
          >
            $
          </span>
          {record.salary}
        </span>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  return <Table columns={columns} data={data} />;
};
```

## 固定列

在 `column` 中指定 `fixed: "left"` 或 `fixed: "right"`，可将列固定到左侧或右侧，设置 `fixed` 的列，也需要设置 `width`。
**注意：** 要配合 `scroll=&#123;&#123; x: number }}` 使用，`columns` 中需要有一列不设置宽度，自适应，不然会有样式问题。

```jsx live
function Demo() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      width: 140,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Other',
      dataIndex: 'other',
      render: () => 'Other',
    },
    {
      title: 'Other 1',
      dataIndex: 'other1',
      render: () => 'Other 1',
    },
    {
      title: 'Other 2',
      dataIndex: 'other2',
      render: () => 'Other 2',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      fixed: 'right',
      width: 120,
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      expandedRowRender={(record) => `${record.name}'s address is ${record.address}`}
      rowSelection={{}}
      scroll={{
        x: 1600,
        y: 400,
      }}
    />
  );
};
```

## 自定义样式

有多种方式定制行列样式，`rowClassName` 可以对每一行进行样式定制，`Column.className` 可以对列进行样式定制。此外，还有 `headerCellStyle`, `bodyCellStyle`， 对表头和表格主体的列进行样式定制。

```jsx live
function Demo() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      headerCellStyle: {
        backgroundColor: 'var(--color-bg-2)',
      },
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      headerCellStyle: {
        backgroundColor: 'var(--color-bg-2)',
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      headerCellStyle: {
        backgroundColor: 'var(--color-bg-2)',
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      headerCellStyle: {
        backgroundColor: 'var(--color-bg-2)',
      },
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      border={{
        wrapper: true,
        headerCell: true,
      }}
    />
  );
};
```

## 表头分组

`columns` 内可以嵌套 `children`，用于表头分组。

```jsx live
function Demo() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      width: 140,
    },
    {
      title: 'User Info',
      children: [
        {
          title: 'Birthday',
          dataIndex: 'birthday',
        },
        {
          title: 'Address',
          children: [
            {
              title: 'City',
              dataIndex: 'city',
            },
            {
              title: 'Road',
              dataIndex: 'road',
            },
            {
              title: 'No.',
              dataIndex: 'no',
            },
          ],
        },
      ],
    },
    {
      title: 'Information',
      children: [
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
        },
      ],
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      fixed: 'right',
      width: 120,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      fixed: 'right',
      width: 110,
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      birthday: '1994-04-21',
      city: 'London',
      road: 'Park',
      no: '34',
      phone: '12345678',
      email: 'jane.doe@example.com',
      gender: 'female',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      birthday: '1994-05-21',
      city: 'London',
      road: 'Park',
      no: '37',
      phone: '12345678',
      email: 'alisa.ross@example.com',
      gender: 'female',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      birthday: '1992-02-11',
      city: 'Paris',
      road: 'Arco',
      no: '67',
      phone: '12345678',
      email: 'kevin.sandra@example.com',
      gender: 'male',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      birthday: '1991-06-21',
      city: 'London',
      road: 'Park',
      no: '317',
      phone: '12345678',
      email: 'ed.hellen@example.com',
      gender: 'female',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      birthday: '1996-08-21',
      city: 'Paris',
      road: 'Park',
      no: '114',
      phone: '12345678',
      email: 'william.smith@example.com',
      gender: 'male',
    },
  ];

  return (
    <Table
      scroll={{
        x: 1200,
      }}
      border={{
        wrapper: true,
        cell: true,
      }}
      columns={columns}
      data={data}
    />
  );
};
```

## 单元格合并

用于单元格合并，表头只能进行列合并。

```jsx live
function Demo() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (col, item, index) => {
        const obj = {
          children: col,
          props: {},
        };

        if (index > 3) {
          obj.props.colSpan = 2;
        }

        return obj;
      },
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      render: (col, item, index) => {
        const obj = {
          children: col,
          props: {},
        };

        if (index > 3) {
          obj.props.colSpan = 0;
        }

        return obj;
      },
    },
    {
      title: 'Detail',
      dataIndex: 'address',
      colSpan: 2,
      render: (col, item, index) => {
        const obj = {
          children: col,
          props: {},
        };

        if (index === 0) {
          obj.props.rowSpan = 3;
        }

        if (index === 1 || index === 2) {
          obj.props.rowSpan = 0;
        }

        return obj;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      colSpan: 0,
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  return <Table border borderCell hover columns={columns} data={data} />;
};
```

## 可编辑单元格

可编辑单元格。

```jsx live
function EditableTable() {

  const EditableContext = React.createContext<{ getForm?: () => FormInstance }>({});

  function EditableRow(props) {
    const { children, record, className, ...rest } = props;
    const refForm = useRef(null);

    const getForm = () => refForm.current;

    return (
      <EditableContext.Provider
        value={{
          getForm,
        }}
      >
        <Form
          style={{ display: 'table-row' }}
          children={children}
          ref={refForm}
          wrapper="tr"
          wrapperProps={rest}
          className={`${className} editable-row`}
        />
      </EditableContext.Provider>
    );
  }

  function EditableCell(props) {
    const { children, className, rowData, column, onHandleSave } = props;
    const ref = useRef(null);
    const refInput = useRef(null);
    const { getForm } = useContext(EditableContext);
    const [editing, setEditing] = useState(false);
    const handleClick = useCallback(
      (e) => {
        if (
          editing &&
          column.editable &&
          ref.current &&
          !ref.current.contains(e.target) &&
          !e.target.classList.contains('js-demo-select-option')
        ) {
          cellValueChangeHandler(rowData[column.dataIndex]);
        }
      },
      [editing, rowData, column]
    );
    useEffect(() => {
      editing && refInput.current && refInput.current.focus();
    }, [editing]);
    useEffect(() => {
      document.addEventListener('click', handleClick, true);
      return () => {
        document.removeEventListener('click', handleClick, true);
      };
    }, [handleClick]);

    const cellValueChangeHandler = (value) => {
      if (column.dataIndex === 'salary') {
        const values = {
          [column.dataIndex]: value,
        };
        onHandleSave && onHandleSave({ ...rowData, ...values });
        setTimeout(() => setEditing(!editing), 300);
      } else {
        const form = getForm();
        form.validate([column.dataIndex], (errors, values) => {
          if (!errors || !errors[column.dataIndex]) {
            setEditing(!editing);
            onHandleSave && onHandleSave({ ...rowData, ...values });
          }
        });
      }
    };

    if (editing) {
      return (
        <div ref={ref}>
          {column.dataIndex === 'salary' ? (
            <Select
              onChange={cellValueChangeHandler}
              defaultValue={rowData[column.dataIndex]}
              options={[2000, 5000, 10000, 20000]}
            />
          ) : (
            <Form.Item
              style={{ marginBottom: 0 }}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
              initialValue={rowData[column.dataIndex]}
              field={column.dataIndex}
              rules={[{ required: true }]}
            >
              <Input ref={refInput} onPressEnter={cellValueChangeHandler} />
            </Form.Item>
          )}
        </div>
      );
    }

    return (
      <div
        className={column.editable ? `editable-cell ${className}` : className}
        onClick={() => column.editable && setEditing(!editing)}
      >
        {children}
      </div>
    );
  }

  const [count, setCount] = useState(5);
  const [data, setData] = useState([
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ]);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Operation',
      dataIndex: 'op',
      render: (_, record) => (
        <Button onClick={() => removeRow(record.key)} type="primary" status="danger">
          Delete
        </Button>
      ),
    },
  ];

  function handleSave(row) {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    newData.splice(index, 1, { ...newData[index], ...row });
    setData(newData);
  }

  function removeRow(key) {
    setData(data.filter((item) => item.key !== key));
  }

  function addRow() {
    setCount(count + 1);
    setData(
      data.concat({
        key: `${count + 1}`,
        name: 'Tom',
        salary: 10000,
        address: '33 Park Road, London',
        email: 'tom@example.com',
      })
    );
  }

  return (
    <>
      <Button
        style={{ marginBottom: 10, }}
        type="primary"
        onClick={addRow}
      >
        Add
      </Button>
      <Table
        data={data}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        columns={columns.map((column) =>
          column.editable
            ? {
                ...column,
                onCell: () => ({
                  onHandleSave: handleSave,
                }),
              }
            : column
        )}
        className="table-demo-editable-cell"
      />
    </>
  );
}
```

## 可伸缩列

配合 `react-resizable@3.0.0` 可以实现可伸缩列的效果。

```jsx live
function App() {

  const originColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 120,
      fixed: 'left',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      width: 100,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: 180,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];
  const CustomResizeHandle = forwardRef((props, ref) => {
    const { handleAxis, ...restProps } = props;
    return (
      <span
        ref={ref}
        className={`react-resizable-handle react-resizable-handle-${handleAxis}`}
        {...restProps}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    );
  });

  const ResizableTitle = (props) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
      return <th {...restProps} />;
    }

    return (
      <Resizable
        width={width}
        height={0}
        handle={<CustomResizeHandle />}
        onResize={onResize}
        draggableOpts={{
          enableUserSelectHack: false,
        }}
      >
        <th {...restProps} />
      </Resizable>
    );
  };

  const [columns, setColumns] = useState(
    originColumns.map((column, index) => {
      if (column.width) {
        return {
          ...column,
          onHeaderCell: (col) => ({
            width: col.width,
            onResize: handleResize(index),
          }),
        };
      }

      return column;
    })
  );

  function handleResize(index) {
    return (e, { size }) => {
      setColumns((prevColumns) => {
        const nextColumns = [...prevColumns];
        nextColumns[index] = { ...nextColumns[index], width: size.width };
        return nextColumns;
      });
    };
  }

  const components = {
    header: {
      th: ResizableTitle,
    },
  };
  return (
    <Table
      className="table-demo-resizable-column"
      components={components}
      border
      borderCell
      columns={columns}
      data={data}
      scroll={{ x: 1200 }}
    />
  );
}
```

## 表头吸顶

配合 `react-sticky@6.0.3` 可以实现表头吸顶的效果。

```jsx live
function App() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  function Wrapper(props) {
    return (
      <Sticky topOffset={-60}>
        {({ style, isSticky }) => (
          <div
            style={{
              ...style,
              top: isSticky ? 60 : 0,
              zIndex: 3,
              overflow: 'auto',
            }}
          >
            {props.children}
          </div>
        )}
      </Sticky>
    );
  }

  const components = {
    header: {
      wrapper: Wrapper,
    },
  };

  return (
    <StickyContainer>
      <Table
        components={components}
        scroll={{
          y: true,
        }}
        border={{
          wrapper: true,
          cell: true,
        }}
        columns={columns}
        data={data}
      />
    </StickyContainer>
  );
}
```

## 定制前置操作列

可以通过 `components` 来定制前置操作列，包括新增列、调整列的顺序等。

```jsx live
function App() {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      width: 120,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];
  const components = {
    header: {
      operations: ({ selectionNode, expandNode }) => [
        {
          node: (
            <th>
              <div className="arco-table-th-item">Index</div>
            </th>
          ),
          width: 40,
        },
        {
          name: 'selectionNode',
          node: selectionNode,
        },
        {
          name: 'expandNode',
          node: expandNode,
        },
      ],
    },
    body: {
      operations: ({ selectionNode, expandNode }) => [
        {
          node: (record) => <td>{record.key}</td>,
          width: 40,
        },
        {
          name: 'selectionNode',
          node: selectionNode,
        },
        {
          name: 'expandNode',
          node: expandNode,
        },
      ],
    },
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState(['4']);
  return (
    <Table
      components={components}
      columns={columns}
      data={data}
      expandedRowRender={(record) => {
        if (record.key !== '4') {
          return record.email;
        }

        return null;
      }}
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(selectedRowKeys, selectedRows);
          setSelectedRowKeys(selectedRowKeys);
        },
        checkboxProps: (record) => {
          return {
            disabled: record.id === 4,
          };
        },
      }}
      scroll={{
        x: 1200,
      }}
    />
  );
}
```

## 拖拽排序

可以配合 `react-sortable-hoc@2.0.0` 实现拖拽排序。

```jsx live
function App() {

  const arrayMoveMutate = (array, from, to) => {
    const startIndex = to < 0 ? array.length + to : to;

    if (startIndex >= 0 && startIndex < array.length) {
      const item = array.splice(from, 1)[0];
      array.splice(startIndex, 0, item);
    }
  };

  const arrayMove = (array, from, to) => {
    array = [...array];
    arrayMoveMutate(array, from, to);
    return array;
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const initialData = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];
  const SortableWrapper = SortableContainer((props) => {
    return <tbody {...props} />;
  });
  const SortableItem = SortableElement((props) => {
    return (
      <tr
        style={{
          cursor: 'move',
        }}
        {...props}
      />
    );
  });

  const [data, setData] = useState(initialData);

  function onSortEnd({ oldIndex, newIndex }) {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(data), oldIndex, newIndex).filter((el) => !!el);
      console.log('New Data: ', newData);
      setData(newData);
    }
  }

  const DraggableContainer = (props) => (
    <SortableWrapper
      onSortEnd={onSortEnd}
      helperContainer={() => document.querySelector('.arco-drag-table-container table tbody')}
      updateBeforeSortStart={({ node }) => {
        const tds = node.querySelectorAll('td');
        tds.forEach((td) => {
          td.style.width = td.clientWidth + 'px';
        });
      }}
      {...props}
    />
  );

  const DraggableRow = (props) => {
    const { record, index, ...rest } = props;
    return <SortableItem index={index} {...rest} />;
  };

  const components = {
    body: {
      tbody: DraggableContainer,
      row: DraggableRow,
    },
  };
  return (
    <Table
      className="arco-drag-table-container"
      components={components}
      columns={columns}
      data={data}
    />
  );
}
```

## 拖拽锚点排序

可以配合 `react-sortable-hoc@2.0.0` 可以实现拖拽锚点排序。

```jsx live
function App() {

  const arrayMoveMutate = (array, from, to) => {
    const startIndex = to < 0 ? array.length + to : to;

    if (startIndex >= 0 && startIndex < array.length) {
      const item = array.splice(from, 1)[0];
      array.splice(startIndex, 0, item);
    }
  };

  const arrayMove = (array, from, to) => {
    array = [...array];
    arrayMoveMutate(array, from, to);
    return array;
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const initialData = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];
  const DragHandle = SortableHandle(() => (
    <IconDragDotVertical
      style={{
        cursor: 'move',
        color: '#555',
      }}
    />
  ));
  const SortableWrapper = SortableContainer((props) => {
    return <tbody {...props} />;
  });
  const SortableItem = SortableElement((props) => {
    return <tr {...props} />;
  });

  const [data, setData] = useState(initialData);

  function onSortEnd({ oldIndex, newIndex }) {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(data), oldIndex, newIndex).filter((el) => !!el);
      console.log('New Data: ', newData);
      setData(newData);
    }
  }

  const DraggableContainer = (props) => (
    <SortableWrapper
      useDragHandle
      onSortEnd={onSortEnd}
      helperContainer={() => document.querySelector('.arco-drag-table-container-2 table tbody')}
      updateBeforeSortStart={({ node }) => {
        const tds = node.querySelectorAll('td');
        tds.forEach((td) => {
          td.style.width = td.clientWidth + 'px';
        });
      }}
      {...props}
    />
  );

  const DraggableRow = (props) => {
    const { record, index, ...rest } = props;
    return <SortableItem index={index} {...rest} />;
  };

  const components = {
    header: {
      operations: ({ selectionNode, expandNode }) => [
        {
          node: <th />,
          width: 40,
        },
        {
          name: 'expandNode',
          node: expandNode,
        },
        {
          name: 'selectionNode',
          node: selectionNode,
        },
      ],
    },
    body: {
      operations: ({ selectionNode, expandNode }) => [
        {
          node: (
            <td>
              <div className="arco-table-cell">
                <DragHandle />
              </div>
            </td>
          ),
          width: 40,
        },
        {
          name: 'expandNode',
          node: expandNode,
        },
        {
          name: 'selectionNode',
          node: selectionNode,
        },
      ],
      tbody: DraggableContainer,
      row: DraggableRow,
    },
  };
  return (
    <Table
      className="arco-drag-table-container-2"
      components={components}
      columns={columns}
      data={data}
      rowSelection={{
        type: 'checkbox',
      }}
    />
  );
}
```

## 大数据

内置虚拟滚动逻辑，设置 `virtualized=true` 开启。

**注意：** 开启虚拟滚动之后，不要给每一列都设置宽度，要保证有一列自适应，不然可能出现表头表身对不齐的情况。

```jsx live
function Demo() {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 140,
      fixed: 'left' as const,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      width: 100,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const data = Array(100000)
    .fill('')
    .map((_, index) => ({
      key: `${index}`,
      name: `Kevin ${index}`,
      salary: 22000,
      address: `${index} Park Road, London`,
      email: `kevin.sandra_${index}@example.com`,
    }));

  const table = useRef<TableInstance>(null);
  return (
    <div>
      <Button
        type="primary"
        onClick={() => table.current.scrollIntoView('500')}
        style={{ marginBottom: 10 }}
      >
        滚动到第 500 条
      </Button>
      <Table
        ref={table}
        virtualized
        scroll={{
          y: 500,
          x: 1000,
        }}
        border
        columns={columns}
        data={data}
        pagination={false}
        rowSelection={{}}
      />
    </div>
  );
};
```

## 自定义空状态

当表格无数据时，默认会展示一个居中的提示信息。你可以通过 `noDataElement` 属性来自定义无数据时的展示内容。

```jsx live
function Demo() {

  const columns: TableColumnProps[] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Salary",
      dataIndex: "salary",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];
  const data = [];

  return <Table columns={columns} data={data} noDataElement={<div>No data available</div>} />;
};
```

## 总结栏

总结栏 summary 的用法。

```jsx live
function Demo() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      width: 200,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Count',
      dataIndex: 'count',
    },
    {
      title: 'Stars',
      dataIndex: 'stars',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      count: 66,
      stars: 5,
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      count: 55,
      stars: 8,
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      count: 100,
      stars: 2,
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      count: 88,
      stars: 10,
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      count: 120,
      stars: 4,
    },
  ];

  function summary(currentData) {
    return (
      <Table.Summary.Row>
        <Table.Summary.Cell>Total</Table.Summary.Cell>
        <Table.Summary.Cell
          style={{
            backgroundColor: 'rgb(var(--success-1))',
          }}
        >
          <Typography.Text type="success" bold>
            {currentData.reduce((prev, next) => prev + next.salary, 0)}
          </Typography.Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell>
          {currentData.reduce((prev, next) => prev + next.count, 0)}
        </Table.Summary.Cell>
        <Table.Summary.Cell>
          {currentData.reduce((prev, next) => prev + next.stars, 0)}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    );
  }

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        border={{
          wrapper: true,
          cell: true,
        }}
        summary={summary}
      />
      <Table
        style={{
          marginTop: 20,
        }}
        columns={columns.concat({
          title: 'Operation',
          dataIndex: 'operation',
          render: () => (
            <Button type="primary" size="mini">
              Confirm
            </Button>
          ),
          fixed: 'right',
          width: 100,
        })}
        data={data}
        scroll={{
          x: 1200,
        }}
        border={{
          wrapper: true,
          cell: true,
        }}
        summary={(currentData) => (
          <Table.Summary>
            <Table.Summary.Row>
              <Table.Summary.Cell>Total</Table.Summary.Cell>
              <Table.Summary.Cell>
                <Typography.Text type="error">
                  {currentData.reduce((prev, next) => prev + next.salary, 0)}
                </Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                {currentData.reduce((prev, next) => prev + next.count, 0)}
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                {currentData.reduce((prev, next) => prev + next.stars, 0)}
              </Table.Summary.Cell>
              <Table.Summary.Cell />
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell>Avarage</Table.Summary.Cell>
              <Table.Summary.Cell colSpan={3}>
                <Typography.Text type="success">
                  {currentData.reduce((prev, next) => prev + next.salary, 0) / 5}
                </Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell />
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        data={data}
        scroll={{
          x: 1200,
          y: 150,
        }}
        border={{
          wrapper: true,
          cell: true,
        }}
        summary={(currentData) => (
          <Table.Summary fixed="bottom">{summary(currentData)}</Table.Summary>
        )}
      />
    </div>
  );
};
```

## API

### Table

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|borderCell|是否显示单元格边框，作用等同于 `border=&#123;&#123; cell: true }}`|boolean |`-`|-|
|defaultExpandAllRows|默认展开所有可展开的行|boolean |`-`|-|
|hover|是否开启鼠标悬浮效果|boolean |`true`|-|
|showHeader|是否显示表头|boolean |`true`|-|
|stripe|是否开启斑马纹|boolean |`-`|-|
|tableLayoutFixed|表格的 `table-layout` 属性设置为 `fixed`，设置为 `fixed` 后，表格的宽度不会被内容撑开超出 100%。|boolean |`-`|-|
|virtualized|表格开启虚拟滚动，用于处理大数据场景。( 注意：虚拟滚动会自动关闭对树形数据的支持 )|boolean |`-`|-|
|indentSize|树形数据每个层级向左偏移的像素|number |`15`|-|
|childrenColumnName|树形数据在 `data` 中的字段名，默认是 `children`|string |`children`|-|
|onChange|分页、排序、筛选时的回调|(pagination: PaginationProps,sorter: SorterInfo \| SorterInfo[],filters: Partial&lt;Record&lt;keyof T, string[]&gt;&gt;,extra: &#123; currentData: T[]; currentAllData: T[]; action: 'paginate' \| 'sort' \| 'filter' }) =&gt; void |`-`|extra in `2.19.0`, currentAllData in 2.53.0|
|pagePosition|设置分页器的位置，有六个方位 `右下` `左下` `右上` `左上` `上中` `下中`|'br' \| 'bl' \| 'tr' \| 'tl' \| 'topCenter' \| 'bottomCenter' |`br`|-|
|size|表格尺寸，分为 默认，`默认` `中` `小` `迷你` 四个尺寸|'default' \| 'middle' \| 'small' \| 'mini' |`-`|-|
|noDataElement|没有数据的时候显示的元素|string \| ReactNode |`&lt;Empty />`|-|
|placeholder|当单元格内容为空时，显示占位符，优先级低于 `column.placeholder`。|ReactNode |`-`|2.23.0|
|border|边框设置|\| boolean\| &#123; wrapper?: boolean; headerCell?: boolean; bodyCell?: boolean; cell?: boolean } |`true`|-|
|className|节点类名|string \| string[] |`-`|-|
|columns|列描述数据对象的数组|ColumnProps&lt;T&gt;[] |`-`|-|
|components|覆盖原生表格标签|ComponentsProps |`-`|-|
|data|表格数据|T[] |`-`|-|
|defaultExpandedRowKeys|默认展开的行|(string \| number)[] |`-`|-|
|expandedRowKeys|展开的行（受控）|(string \| number)[] |`-`|-|
|expandProps|自定义展开/关闭列的图标，宽度，标题，具体用法看这个例子|ExpandProps&lt;T&gt; |`-`|-|
|loading|表格是否在加载中|boolean \| SpinProps |`-`|-|
|onHeaderRow|设置表头行单元格的各项事件回调|(columns: ColumnProps&lt;T&gt;[], index: number) =&gt; RowCallbackProps |`-`|-|
|pagination|分页器设置，参考Pagination组件，设置 `false` 不展示分页|PaginationProps \| boolean |`-`|-|
|rowSelection|设置表格行是否可选，选中事件等。配置项|RowSelectionProps&lt;T&gt; |`-`|-|
|scroll|设置x轴或y轴的滚动。`x` 设置为 `true`，会给 table 添加 `table-layout: fixed` 以及给父元素添加 `overflow: auto`。`y` 设置为 `true`，表头和表身会分离，放在两个 table 中|&#123; x?: number \| string \| boolean; y?: number \| string \| boolean } |`-`|-|
|showSorterTooltip|表头是否显示下一次排序的 tooltip 提示。可以设置对象，可以传 `Tooltip` 组件的所有参数。|boolean \| TooltipProps |`true`|2.19.0|
|style|节点样式|CSSProperties |`-`|-|
|virtualListProps|用于配置虚拟滚动。|AvailableVirtualListProps |`-`|2.46.0|
|expandedRowRender|点击展开额外的行，渲染函数。返回值为 `null` 时，不会渲染展开按钮|(record: T, index: number) => ReactNode |`-`|-|
|footer|表格尾部|(currentPageDate) => ReactNode |`-`|-|
|onExpand|点击展开的回调|(record: T, expanded: boolean) => void |`-`|-|
|onExpandedRowsChange|点击展开时触发，参数为展开行数组|(expandedRows: (string \| number)[]) => void |`-`|-|
|onRow|设置表格行的各项事件回调|(record: T, index: number) => RowCallbackProps |`-`|-|
|renderPagination|自定义分页渲染。|(paginationNode?: ReactNode) => ReactNode |`-`|2.11.0|
|rowClassName|表格行的类名|(record: T, index: number) => string |`-`|-|
|rowKey|表格行 key 的取值字段|React.Key \| ((record: T) => React.Key) |`key`|-|
|summary|总结栏|(currentData?: T[]) => ReactNode |`-`|2.17.0|

### RowSelection

`&lt;Table>` 参数 `rowSelection` 的详细参数。

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|checkAll|多选模式下是否开启全选功能|boolean |`-`|-|
|checkCrossPage|多选模式下的复选框是否跨分页，只在非受控模式下生效。配合 preserveSelectedRowKeys: true 使用，可在受控模式下生效。|boolean |`-`|-|
|checkStrictly|设置为 `false` 的时候父子选择会自动关联。|boolean |`true`|2.33.0|
|fixed|是否固定选择列到左边|boolean |`-`|-|
|preserveSelectedRowKeys|在数据项被删除时仍然保留选项的 `key`|boolean |`-`|2.19.0|
|columnWidth|选择框列的宽度|number |`-`|-|
|type|多选或者单选|'checkbox' \| 'radio' |`-`|-|
|columnTitle|自定义列表选择的标题|string \| ReactNode |`-`|-|
|selectedRowKeys|Table选中的项，（受控模式，需要跟 `onChange` 配合使用）|(string \| number)[] |`-`|-|
|checkboxProps|选择框的属性配置|(record: T) => &#123; [key: string]: any } |`-`|-|
|onChange|单选或多选的选中项发生改变时的回调|(selectedRowKeys: (string \| number)[], selectedRows: T[]) => void |`-`|-|
|onSelect|用户手动选择/取消选择的回调|(selected: boolean, record: T, selectedRows: T[]) => void |`-`|2.22.0|
|onSelectAll|用户手动选择/取消选择所有行的回调|(selected: boolean, selectedRows) => void |`-`|2.6.0|
|renderCell|定制复选框，用法与 `column.render` 相同。|(originNode, checked: boolean, record: T) => ReactNode |`-`|2.19.0|

### ExpandProps

`&lt;Table>` 参数 `expandProps` 的详细参数。

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|expandRowByClick|支持通过点击行来展开|boolean |`-`|2.19.0|
|strictTreeData|树形数据时，只有 `children` 是数组且长度大于 1 才显示展开图标。|boolean |`true`|2.27.0|
|width|展开按钮列的宽度|number |`-`|-|
|columnTitle|展开按钮列的表头标题|ReactNode |`-`|-|
|icon|定制展开按钮的图标|(props: &#123; expanded: boolean; record: Record&lt;string, any&gt; }) =&gt; ReactNode |`-`|-|
|rowExpandable|是否允许行展开。如果不指定该参数，会以 expandedRowRender 是否有返回值决定。当出现性能问题时，建议使用 rowExpandable。|(record: T) => boolean |`-`|2.16.0|

### Column

列描述数据对象，是 `columns` 中的一项。

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|ellipsis|单元格内容超出长度后，是否自动省略，显示 `...`。设置这个属性后，table 的 `table-layout` 将自动变成 `fixed`。|boolean |`-`|-|
|filterMultiple|是否可以筛选多项|boolean |`true`|-|
|dataIndex|列数据在数据项中对应的 `key`，用于取值显示，支持 `a[0].b.c[1]` 的嵌套写法，详情看 lodash.get。|string |`-`|-|
|align|设置列的对齐方式|'left' \| 'center' \| 'right' |`left`|-|
|defaultSortOrder|默认排序方式|'ascend' \| 'descend' |`-`|-|
|fixed|固定头和列到左边或者右边|'left' \| 'right' |`-`|-|
|sortDirections|支持的排序方式。|Array&lt;'ascend' \| 'descend'> |`['ascend','descend']`|-|
|sortOrder|排序的受控属性，可以控制列的排序，可设置为 `ascend` `descend`|'ascend' \| 'descend' |`-`|-|
|filterIcon|自定义筛选图标。|ReactNode |`-`|-|
|placeholder|当单元格内容为空时，显示占位符，优先级低于 `render`。|ReactNode |`-`|2.22.0|
|title|列标题|React.ReactNode  **(必填)**|`-`|-|
|bodyCellStyle|表身单元格自定义样式|CSSProperties |`-`|-|
|className|列的类名|string \| string[] |`-`|-|
|defaultFilters|默认筛选条件|string[] |`-`|-|
|filterDropdownProps|配置筛选弹出框的一些属性。|&#123; triggerProps?: TriggerProps } |`-`|-|
|filteredValue|筛选的受控属性，值为筛选的 value 数组|string[] |`-`|-|
|filters|筛选项，需要配合 `onFilter` 或者 `onChange` 使用|&#123;text?: ReactNode;value?: any;[key: string]: any;}[] |`[]`|-|
|headerCellStyle|表头单元格自定义样式|CSSProperties |`-`|-|
|key|React的 key值，如果不指定，默认取 `dataIndex` 的值|string \| number |`-`|-|
|sorter|排序函数，如果想要服务端排序或者添加更多自定义操作，设置为true，利用`onChange`函数进行自定义排序|SorterFn \| boolean \| &#123; compare?: SorterFn; multiple?: number } |`-`|-|
|width|列宽度|number \| string |`-`|-|
|filterDropdown|自定义筛选框。|(props: &#123;filterKeys?: string[];setFilterKeys?: (filterKeys: string[], callback?: Function) => void;confirm?: Function;}) => ReactNode |`-`|-|
|onCell|设置表身单元格的各项事件回调|(record, index) => RowCallbackProps |`-`|-|
|onFilter|筛选函数，配合`filters`|(value, row) => any |`-`|-|
|onFilterDropdownVisibleChange|筛选框打开关闭的回调|(visible: boolean) => void |`-`|-|
|onHeaderCell|设置头部单元格的各项事件回调|(column, index) => RowCallbackProps |`-`|-|
|render|自定义单元格显示的内容|(col, item: T, index: number) => any |`-`|-|

### ComponentsProps

```js
export type ComponentsProps = {
  table?: any;
  header?: {
    operations?: (nodes: {
      selectionNode?: ReactNode;
      expandNode?: ReactNode;
    }) => {
      name?: string;
      node?: ReactNode;
      width?: number;
    }[];
    wrapper?: any;
    thead?: any;
    row?: any;
    th?: any;
    cell?: any;
  };
  body?: {
    operations?: (nodes: {
      selectionNode?: ReactNode;
      expandNode?: ReactNode;
    }) => {
      name?: string;
      node?: ReactNode | ((record) => ReactNode); // 2.17.0
      width?: number;
    }[];
    wrapper?: any;
    tbody?: any;
    row?: any;
    td?: any;
    cell?: any;
  };
};
```

### SorterInfo

```js
export interface SorterInfo {
  direction?: SortDirection;
  field?: string | number;
  sorterFn?: SorterFn;
  priority?: number;
}
```

### SortDirection

```js
export declare type SortDirection = "descend" | "ascend";
```

### SorterFn

```js
export type SorterFn = (a: any, b: any) => number;
```

### RowCallbackProps

```js
export type RowCallbackProps = {
  onClick?: (event) => void;
  onDoubleClick?: (event) => void;
  onContextMenu?: (event) => void;
  onMouseEnter?: (event) => void;
  onMouseLeave?: (event) => void;
  onHandleSave?: (row) => void;
  [name: string]: any;
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

### 隐藏分页

如果想在页数小于或等于一页时隐藏分页，可以配置 `pagination.hideOnSinglePage = true`，如果想全局配置，
可以配置 `ConfigProvider` 组件的 `tablePagination.hideOnSinglePage = true`。

### onRow 用法

`onRow`, `onHeaderRow`, `onCell`, `onHeaderCell` 用法一致。

```js
<Table
  onRow={(record, index) => {
    return {
      onClick: (event) => {}, // 点击表身行
      onDoubleClick: (event) => {},
      onContextMenu: (event) => {},
      onMouseEnter: (event) => {},
      onMouseLeave: (event) => {},
    };
  }}
  onHeaderRow={(column, index) => {
    return {
      onClick: (event) => {}, // 点击表头行
      onDoubleClick: (event) => {},
      onContextMenu: (event) => {},
      onMouseEnter: (event) => {},
      onMouseLeave: (event) => {},
    };
  }}
/>
```

