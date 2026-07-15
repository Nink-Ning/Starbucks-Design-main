---
sidebar_position: 1
---

# 级联选择 Cascader

指在选择器选项数量较多时，采用多级分类的方式将选项进行分隔。

## 基础

最基础的用法。
默认通过点击展开下一级，可以设置`expandTrigger='hover'`来控制`hover`展开下一级

```jsx live
function Demo() {
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <Space size="large">
        <Cascader
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
        />
        <Cascader
          placeholder="Hover to expand"
          expandTrigger="hover"
          style={{ width: 300, marginBottom: 20 }}
          options={options}
        />
      </Space>
      <br/>
      <Space size="large">
        <Cascader
          status="error"
          allowClear
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
        />
        <Cascader
          status="warning"
          allowClear
          placeholder="Hover to expand"
          expandTrigger="hover"
          style={{ width: 300, marginBottom: 20 }}
          options={options}
        />
      </Space>
    </div>
  );
}
```

## 允许清除

支持清除。

```jsx live
function Demo() {
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];

  return (
    <Cascader
      placeholder="Please select ..."
      style={{ width: 300 }}
      options={options}
      onChange={(value, option) => {
        console.log(value, option);
      }}
      defaultValue={['shanghai', 'shanghaishi', 'huangpu']}
      allowClear
    />
  );
}
```

## 前置标签

通过 `addBefore` 设置前置标签 (`2.41.0`)

```jsx live
function Demo() {
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];

  return (
    <Space size="large">
      <Cascader
        addBefore="Select city"
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
      />
      <Cascader
        placeholder="Hover to expand"
        expandTrigger="hover"
        addBefore="Select city"
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        mode="multiple"
      />
    </Space>
  );
}
```

## 格式化展示选中值

利用`renderFormat`对显示的内容进行自定义处理。

```jsx live
function Demo() {
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];

  return (
    <Cascader
      placeholder="Please select ..."
      style={{ width: 300 }}
      options={options}
      defaultValue={['shanghai', 'shanghaishi', 'huangpu']}
      renderFormat={(valueShow) => `${valueShow.join(' > ')}`}
      allowClear
    />
  );
}
```

## 自定义选择框

`children` 会覆盖默认的选择框。

```jsx live

class App extends React.Component {
  state = {
    text: ['Shanghai', 'Shanghai', 'Huangpu'].join(', '),
    inputValue: '',
  };
  onChange = (value, selectedOptions) => {
    this.setState({
      text: selectedOptions.map((a) => a.label).join(', '),
    });
  };
  onInputValueChange = (inputValue) => {
    this.setState({
      inputValue,
    });
  };

  render() {
    const options = [
      {
        value: 'Beijing',
        label: 'Beijing',
        children: [
          {
            value: 'Beijing',
            label: 'Beijing',
            children: [
              {
                value: 'Chaoyang',
                label: 'Chaoyang',
                children: [
                  {
                    value: 'Datunli',
                    label: 'Datunli',
                  },
                ],
              },
              {
                value: 'Dongcheng',
                label: 'Dongcheng',
              },
              {
                value: 'Xicheng',
                label: 'Xicheng',
              },
              {
                value: 'Haidian',
                label: 'Haidian',
              },
            ],
          },
        ],
      },
      {
        value: 'Shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'Shanghai',
            label: 'Shanghai',
            children: [
              {
                value: 'Huangpu',
                label: 'Huangpu',
              },
            ],
          },
        ],
      },
    ];

    return (
      <div>
        <Typography.Text>City</Typography.Text>
        <Cascader
          defaultValue={['Shanghai', 'Shanghai', 'Huangpu']}
          placeholder="Please select ..."
          inputValue={this.state.inputValue}
          style={{ width: 300 }}
          options={options}
          onChange={this.onChange}
          dropdownRender={(menu) => {
            return (
              <div
                style={{ maxWidth: 'fit-content', minWidth: 120 }}
              >
                <div
                  style={{ padding: '6px 8px' }}
                >
                  <Input.Search
                    placeholder="Please select ..."
                    allowClear
                    onChange={this.onInputValueChange}
                    value={this.state.inputValue}
                  />
                </div>

                <Divider
                  style={{ margin: 0 }}
                />
                {menu}
              </div>
            );
          }}
        >
          <Link className="trigger-element" role="button" tabIndex={0}>{this.state.text}</Link>
        </Cascader>
      </div>
    );
  }
}
```

## 选择即改变

设置属性 `changeOnSelect`，点击任何一级都可以选择。多选时将会解除父子节点的关联。

```jsx live
function Demo() {
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];

  return (
    <Space size="large">
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        showSearch
        changeOnSelect
        allowClear
      />
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        mode="multiple"
        changeOnSelect
        allowClear
        showSearch
      />
    </Space>
  );
}
```

## 支持多选

指定`mode=multiple`，即可使用多选。设置 `checkedStrategy` 属性设置数据回显方式（`2.31.0`）。

```jsx live
function Demo() {
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              disableCheckbox: true,
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
            {
              value: 'dongcheng',
              label: 'Dongcheng',
            },
            {
              value: 'xicheng',
              label: 'Xicheng',
            },
            {
              value: 'haidian',
              label: 'Haidian',
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];

  return (
    <Space>
      <Cascader
        placeholder="Please select ..."
        style={{
          width: 300,
        }}
        options={options}
        mode="multiple"
        defaultValue={[['beijing', 'Beijing', 'chaoyang', 'datunli']]}
      />
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300 }}
        options={options}
        mode="multiple"
        checkedStrategy="parent"
      />
    </Space>
  );
}
```

## 允许搜索

指定`showSearch=true`，可以输入文本对选项进行搜索。

```jsx live
function Demo() {
  const options = [
    {
      id: 'beijing',
      name: 'Beijing',
      child: [
        {
          id: 'Beijing',
          name: 'Beijing',
          child: [
            {
              id: 'chaoyang',
              name: 'Chaoyang',
              child: [
                {
                  id: 'datunli',
                  name: 'Datunli',
                },
              ],
            },
            {
              id: 'dongcheng',
              name: 'Dongcheng',
            },
            {
              id: 'xicheng',
              name: 'Xicheng',
            },
            {
              id: 'haidian',
              name: 'Haidian',
            },
            {
              id: 'fengtai',
              name: 'fengtai',
            },
            {
              id: 'shijingshan',
              name: 'Shijingshan',
            },
            {
              id: 'mentougou',
              name: 'Mentougou',
            },
            {
              id: 'fangshan',
              name: 'Fangshan',
            },
            {
              id: 'tongzhou',
              name: 'Tongzhou',
            },
            {
              id: 'shunyi',
              name: 'Shunyi',
            },
          ],
        },
      ],
    },
    {
      id: 'shanghai',
      name: 'Shanghai',
      child: [
        {
          id: 'shanghaishi',
          name: 'Shanghai',
          child: [
            {
              id: 'huangpu',
              name: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];

  return (
    <Space size="large">
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        defaultValue={['shanghai', 'shanghaishi', 'huangpu']}
        showSearch
        allowClear
        fieldNames={{
          children: 'child',
          label: 'name',
          value: 'id',
        }}
      />
      <Cascader
        mode="multiple"
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        onChange={(x, y) => {
          console.log(x, y);
        }}
        options={options}
        defaultValue={[['beijing', 'Beijing', 'chaoyang', 'datunli']]}
        showSearch={{ retainInputValueWhileSelect: false }}
        allowClear
        fieldNames={{
          children: 'child',
          label: 'name',
          value: 'id',
        }}
      />
    </Space>
  );
}
```

## 自定义搜索

通过 `filterOption` 自定义搜索逻辑

```jsx live
function Demo() {
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
            {
              value: 'dongcheng',
              label: 'Dongcheng',
            },
            {
              value: 'xicheng',
              label: 'Xicheng',
            },
            {
              value: 'haidian',
              label: 'Haidian',
            },
            {
              value: 'fengtai',
              label: 'fengtai',
            },
            {
              value: 'shijingshan',
              label: 'Shijingshan',
            },
            {
              value: 'mentougou',
              label: 'Mentougou',
            },
            {
              value: 'fangshan',
              label: 'Fangshan',
            },
            {
              value: 'tongzhou',
              label: 'Tongzhou',
            },
            {
              value: 'shunyi',
              label: 'Shunyi',
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];

  return (
    <Space size="large">
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        defaultValue={['shanghai', 'shanghaishi', 'huangpu']}
        filterOption={(input, node) => {
          return node.value.indexOf(input) > -1 || node.label.indexOf(input) > -1;
        }}
        showSearch
        allowClear
      />
      <Cascader
        mode="multiple"
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        defaultValue={[['beijing', 'Beijing', 'chaoyang', 'datunli']]}
        filterOption={(input, node) => {
          return node.value.indexOf(input) > -1 || node.label.indexOf(input) > -1;
        }}
        showSearch
        allowClear
      />
    </Space>
  );
}
```

## 动态加载

利用`loadMore`可以进行动态加载数据。

**使用动态加载的时候请注意：**

**1.选项必须设置 `isLeaf` 来标示是否需要继续加载**
**2. 如果使用搜索功能，将只对已加载选项执行搜索逻辑。**

```jsx live

class App extends React.Component {
  loadMore = (pathValue, level) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const nodes = pathValue.map((x, i) => ({
          label: `Option ${i + 1}`,
          value: i,
          isLeaf: level >= 2,
        }));
        resolve(nodes);
      }, 500);
    });

  render() {
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'shanghaishi',
            label: 'Shanghai',
          },
        ],
      },
    ];

    return (
      <Space size="large">
        <Cascader
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
          loadMore={this.loadMore}
          showSearch
          allowClear
        />
        <Cascader
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
          loadMore={this.loadMore}
          showSearch
          allowClear
          mode="multiple"
        />
      </Space>
    );
  }
}
```

## 选项禁用

指定 `option` 的 `disabled` 为 `true`，可以禁用该选项

```jsx live
function Demo() {
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
            {
              value: 'dongcheng',
              label: 'Dongcheng',
              disabled: true,
              children: [
                {
                  value: 'chaoyangmen',
                  label: 'Chaoyangmen',
                },
                {
                  value: 'jianguo',
                  label: 'Jianguomen',
                },
              ],
            },
            {
              value: 'xicheng',
              label: 'Xicheng',
            },
            {
              value: 'haidian',
              label: 'Haidian',
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];

  return (
    <Space size="large" align="start">
      <Cascader
        allowClear
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        defaultValue={['beijing', 'Beijing', 'dongcheng', 'chaoyangmen']}
        placeholder="Please select ..."
        showSearch
      />
      <Cascader
        allowClear
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        defaultValue={[
          ['beijing', 'Beijing', 'dongcheng', 'chaoyangmen'],
          ['beijing', 'Beijing', 'dongcheng', 'jianguo'],
        ]}
        placeholder="Please select ..."
        mode="multiple"
        showSearch
      />
    </Space>
  );
}
```

## 受控模式

可以完全控制级联选择。

```jsx live

class App extends React.Component {
  state = {
    value: undefined,
    value1: undefined,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        value: [['beijing', 'Beijing', 'chaoyang', 'datunli']],
      });
    }, 200);
  }

  render() {
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'Beijing',
            label: 'Beijing',
            children: [
              {
                value: 'chaoyang',
                label: 'Chaoyang',
                children: [
                  {
                    value: 'datunli',
                    label: 'Datunli',
                  },
                ],
              },
              {
                value: 'dongcheng',
                label: 'Dongcheng',
              },
              {
                value: 'xicheng',
                label: 'Xicheng',
              },
              {
                value: 'haidian',
                label: 'Haidian',
              },
            ],
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'shanghaishi',
            label: 'Shanghai',
            children: [
              {
                value: 'huangpu',
                label: 'Huangpu',
              },
            ],
          },
        ],
      },
    ];

    return (
      <Space size="large">
        <Cascader
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
          showSearch
          value={this.state.value1}
          onChange={(value, option) => {
            console.log(option);
            this.setState({
              value1: value,
            });
          }}
        ></Cascader>
        <Cascader
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
          showSearch
          mode="multiple"
          value={this.state.value}
          onChange={(value, options) => {
            console.log(value, options);
            this.setState({
              value,
            });
          }}
        />
      </Space>
    );
  }
}
```

## 不同尺寸

设置 `size` 可以使用四种尺寸（`mini`, `small`, `default`, `large`）的选择器。高度分别对应`24px`、`28px`、`32px`、`36px`

```jsx live

class App extends React.Component {
  state = {
    value: 'default',
  };

  render() {
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'Beijing',
            label: 'Beijing',
            children: [
              {
                value: 'chaoyang',
                label: 'Chaoyang',
                children: [
                  {
                    value: 'datunli',
                    label: 'Datunli',
                  },
                ],
              },
              {
                value: 'dongcheng',
                label: 'Dongcheng',
              },
              {
                value: 'xicheng',
                label: 'Xicheng',
              },
              {
                value: 'haidian',
                label: 'Haidian',
              },
            ],
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'shanghaishi',
            label: 'Shanghai',
            children: [
              {
                value: 'huangpu',
                label: 'Huangpu',
              },
            ],
          },
        ],
      },
    ];

    return (
      <div>
        <Radio.Group
          type="button"
          name="size"
          value={this.state.value}
          onChange={(value) => {
            this.setState({
              value,
            });
          }}
          style={{ marginBottom: 20 }}
        >
          <Radio value="mini">mini</Radio>
          <Radio value="small">small</Radio>
          <Radio value="default">default</Radio>
          <Radio value="large">large</Radio>
        </Radio.Group>
        <div>
          <Cascader
            placeholder="Please select ..."
            style={{ width: 300, marginBottom: 20 }}
            options={options}
            size={this.state.value}
            allowClear
          />
          <br />
          <Cascader
            placeholder="Please select ..."
            style={{ width: 300 }}
            options={options}
            mode="multiple"
            size={this.state.value}
            allowClear
          />
        </div>
      </div>
    );
  }
}
```

## 自定义Option

使用 `renderOption`，可以自定义渲染选项。

```jsx live
function Demo() {
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
            {
              value: 'dongcheng',
              label: 'Dongcheng',
            },
            {
              value: 'xicheng',
              label: 'Xicheng',
            },
            {
              value: 'haidian',
              label: 'Haidian',
            },
            {
              value: 'fengtai',
              label: 'fengtai',
            },
            {
              value: 'shijingshan',
              label: 'Shijingshan',
            },
            {
              value: 'mentougou',
              label: 'Mentougou',
            },
            {
              value: 'fangshan',
              label: 'Fangshan',
            },
            {
              value: 'tongzhou',
              label: 'Tongzhou',
            },
            {
              value: 'shunyi',
              label: 'Shunyi',
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];

  return (
    <Space size="large">
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        defaultValue={['shanghai', 'shanghaishi', 'huangpu']}
        showSearch
        renderOption={(node, level) => {
          console.log(node, level);
          return (
            <span>
              {node.label}({node.value})
            </span>
          );
        }}
      />
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        defaultValue={[['beijing', 'Beijing', 'chaoyang', 'datunli']]}
        showSearch
        mode="multiple"
        renderOption={(node, level) => {
          return (
            <span>
              {node.label}({node.value})
            </span>
          );
        }}
      />
    </Space>
  );
}
```

## 自定义footer

通过 `renderFooter` 可以自定义每一层级的footer。

```jsx live
function Demo() {
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
            {
              value: 'dongcheng',
              label: 'Dongcheng',
            },
            {
              value: 'xicheng',
              label: 'Xicheng',
            },
            {
              value: 'haidian',
              label: 'Haidian',
            },
            {
              value: 'fengtai',
              label: 'fengtai',
            },
            {
              value: 'shijingshan',
              label: 'Shijingshan',
            },
            {
              value: 'mentougou',
              label: 'Mentougou',
            },
            {
              value: 'fangshan',
              label: 'Fangshan',
            },
            {
              value: 'tongzhou',
              label: 'Tongzhou',
            },
            {
              value: 'shunyi',
              label: 'Shunyi',
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
    {
      value: 'guangzhou',
      label: 'guangzhou',
    },
    {
      value: 'shenzhen',
      label: 'Shenzhen',
    },
    {
      value: 'hangzhou',
      label: 'Hangzhou',
    },
  ];

  return (
    <Space size="large">
      <Cascader
        placeholder="Please select ..."
        style={{ maxWidth: 300 }}
        options={options}
        defaultValue={['shanghai', 'shanghaishi', 'huangpu']}
        showSearch
        allowClear
        renderFooter={(level, activeNode) => {
          console.log(level, activeNode);

          if (level < 2) {
            return (
              <Link
                type="text"
                onClick={() => {
                  Message.info('Click me');
                }}
              >
                Click me
              </Link>
            );
          }

          return null;
        }}
      />
      <Cascader
        mode="multiple"
        placeholder="Please select ..."
        style={{ maxWidth: 300 }}
        options={options}
        defaultValue={[['beijing', 'Beijing', 'chaoyang', 'datunli']]}
        showSearch
        allowClear
        renderFooter={(level, activeNode) => {
          console.log(level, activeNode);

          if (level < 2) {
            return (
              <Link
                type="text"
                onClick={() => {
                  Message.info('Click me');
                }}
              >
                Click me
              </Link>
            );
          }

          return null;
        }}
      />
    </Space>
  );
}
```

## 展示空数据

`showEmptyChildren=true`时，当`children`为`[]`也会展示下一级空菜单。

```jsx live

function App() {
  const options = [
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
              children: [],
            },
            {
              value: 'jingan',
              label: 'Jingan',
            },
          ],
        },
      ],
    },
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [],
        },
      ],
    },
  ];

  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState();
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Checkbox
          onChange={(v) => {
            setChecked(v);
            setValue();
          }}
        >
          showEmptyChildren
        </Checkbox>
      </div>
      <Cascader
        showSearch
        allowClear
        value={value}
        onChange={setValue}
        placeholder="Please select ..."
        showEmptyChildren={checked}
        style={{ width: 300 }}
        options={options}
      />
    </div>
  );
}
```

## 控制下拉框的展开收起

通过 popupVisible 和 onVisibleChange 控制下拉框的展开和收起。
更多示例可查看Trigger组件文档

```jsx live

function App() {
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
            {
              value: 'dongcheng',
              label: 'Dongcheng',
            },
            {
              value: 'xicheng',
              label: 'Xicheng',
            },
            {
              value: 'haidian',
              label: 'Haidian',
            },
            {
              value: 'fengtai',
              label: 'fengtai',
            },
            {
              value: 'shijingshan',
              label: 'Shijingshan',
            },
            {
              value: 'mentougou',
              label: 'Mentougou',
            },
            {
              value: 'fangshan',
              label: 'Fangshan',
            },
            {
              value: 'tongzhou',
              label: 'Tongzhou',
            },
            {
              value: 'shunyi',
              label: 'Shunyi',
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
    {
      value: 'guangzhou',
      label: 'guangzhou',
    },
    {
      value: 'shenzhen',
      label: 'Shenzhen',
    },
    {
      value: 'hangzhou',
      label: '杭州',
    },
  ];

  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <p>
        <Button
          style={{ marginRight: 20 }}
          onClick={() => {
            setVisible(!visible);
          }}
        >
          Show Menu
        </Button>
      </p>
      <Cascader
        style={{ width: 300, marginTop: 20 }}
        placeholder="Please select ..."
        popupVisible={visible}
        trigger={[]}
        onVisibleChange={setVisible}
        triggerProps={{
          clickOutsideToClose: false,
        }}
        allowClear
        options={options}
        renderFooter={() => {
          return (
            <Link
              onClick={() => {
                setVisible(false);
              }}
            >
              Close
            </Link>
          );
        }}
      />
    </div>
  );
}
```

## 自定义下拉菜单的展示

使用 `dropdownRender` 对下拉菜单进行扩展。

```jsx live
function Demo() {
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];

  return (
    <Space size="large">
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300 }}
        options={options}
        dropdownRender={(menu) => {
          return (
            <div>
              {menu}
              <Divider style={{ margin: 0 }} />
              <div style={{ margin: 4 }}>
                The footer content
              </div>
            </div>
          );
        }}
      />
      <Cascader
        style={{ width: 300 }}
        dropdownColumnRender={(menu, level) => {
          return (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ flex: 1 }} >
                {menu}
              </div>
              <Divider style={{ margin: 0 }}/>
              <div style={{ margin: 4 }}>
                The footer content(Level {level})
              </div>
            </div>
          );
        }}
        options={options}
      />
    </Space>
  );
}
```

## 自定义字段名

通过`fieldNames`属性指定 `label`，`value`，`isLeaf`，`disabled`，`children` 对应的字段。

```jsx live
function Demo() {
  const options = [
    {
      id: 'beijing',
      name: 'Beijing',
      child: [
        {
          id: 'Beijing',
          name: 'Beijing',
          child: [
            {
              id: 'chaoyang',
              name: 'Chaoyang',
              child: [
                {
                  id: 'datunli',
                  name: 'Datunli',
                },
              ],
            },
            {
              id: 'dongcheng',
              name: 'Dongcheng',
            },
            {
              id: 'xicheng',
              name: 'Xicheng',
            },
            {
              id: 'haidian',
              name: 'Haidian',
            },
            {
              id: 'fengtai',
              name: 'fengtai',
            },
            {
              id: 'shijingshan',
              name: 'Shijingshan',
            },
            {
              id: 'mentougou',
              name: 'Mentougou',
            },
            {
              id: 'fangshan',
              name: 'Fangshan',
            },
            {
              id: 'tongzhou',
              name: 'Tongzhou',
            },
            {
              id: 'shunyi',
              name: 'Shunyi',
            },
          ],
        },
      ],
    },
    {
      id: 'shanghai',
      name: 'Shanghai',
      child: [
        {
          id: 'shanghaishi',
          name: 'Shanghai',
          child: [
            {
              id: 'huangpu',
              name: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <Cascader
        mode="multiple"
        placeholder="Please select ..."
        style={{ width: 300 }}
        onChange={(x, y) => {
          console.log(x, y);
        }}
        options={options}
        defaultValue={[['beijing', 'Beijing', 'chaoyang', 'datunli']]}
        showSearch
        allowClear
        fieldNames={{
          children: 'child',
          label: 'name',
          value: 'id',
        }}
      />
    </div>
  );
}
```

## 远程搜索

使用 `onSearch` 自定义搜索逻辑。可以通过 `showSearch.panelMode` 属性控制是否以搜索面板的形式展示所有可选项。

```jsx live

function App () {
  const genOptions = (keyword) => {
    return !keyword
      ? []
      : [
          {
            label: keyword,
            value: keyword + '-value',
            children: [
              {
                label: `${keyword}-1`,
                value: `${keyword}-value-1`,
              },
              {
                label: `${keyword}-2`,
                value: `${keyword}-value-2`,
              },
            ],
          },
        ];
  };

  function CascaderDemo(props) {
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const handleSearch = (inputValue) => {
      setLoading(true);
      setTimeout(() => {
        setOptions(genOptions(inputValue));
        setLoading(false);
      }, 200);
    };

    return (
        <Cascader
          placeholder="Please enter ..."
          showSearch
          style={{ width: 300 }}
          options={options}
          onSearch={handleSearch}
          onChange={(_, a) => {
            console.log(a);
          }}
          loading={loading}
          dropdownRender={(menu) => {
            return loading ? (
              <div
                style={{
                  height: 100,
                  width: 300,
                  textAlign: 'center',
                  lineHeight: '100px',
                }}
              >
                <Spin />
              </div>
            ) : (
              menu
            );
          }}
          {...props}
        />
    );
  }

  const [showSearchPanel, setShowSearchPanel] = React.useState(false);

  return <div>
    <div style={{marginBottom: 20}}>
      <Checkbox checked={showSearchPanel} onChange={setShowSearchPanel}>是否以搜索面板展示可选项</Checkbox>
    </div>
    <Space size="large">
      <CascaderDemo showSearch={{ panelMode: showSearchPanel ? 'select' : 'cascader' }} />
      <CascaderDemo  showSearch={{ panelMode: showSearchPanel ? 'select' : 'cascader'}} mode="multiple" />
    </Space>
  </div>
}
```

## 拖拽排序

多选时，指定 `dragToSort` 属性以允许对已输入的值进行拖拽排序。

```jsx live
function Demo() {
  const options = [
    {
      id: 'beijing',
      name: 'Beijing',
      child: [
        {
          id: 'Beijing',
          name: 'Beijing',
          child: [
            {
              id: 'chaoyang',
              name: 'Chaoyang',
              child: [
                {
                  id: 'datunli',
                  name: 'Datunli',
                },
              ],
            },
            {
              id: 'dongcheng',
              name: 'Dongcheng',
            },
            {
              id: 'xicheng',
              name: 'Xicheng',
            },
            {
              id: 'haidian',
              name: 'Haidian',
            },
            {
              id: 'fengtai',
              name: 'fengtai',
            },
            {
              id: 'shijingshan',
              name: 'Shijingshan',
            },
            {
              id: 'mentougou',
              name: 'Mentougou',
            },
            {
              id: 'fangshan',
              name: 'Fangshan',
            },
            {
              id: 'tongzhou',
              name: 'Tongzhou',
            },
            {
              id: 'shunyi',
              name: 'Shunyi',
            },
          ],
        },
      ],
    },
    {
      id: 'shanghai',
      name: 'Shanghai',
      child: [
        {
          id: 'shanghaishi',
          name: 'Shanghai',
          child: [
            {
              id: 'huangpu',
              name: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];

  return (
    <Cascader
        mode='multiple'
        placeholder='Please select ...'
        style={{ width: 600 }}
        onChange={(x, y) => {
          console.log(x, y);
        }}
        dragToSort
        options={options}
        defaultValue={[['beijing', 'Beijing', 'chaoyang', 'datunli']]}
        showSearch
        allowClear
        fieldNames={{
          children: 'child',
          label: 'name',
          value: 'id',
        }}
      />
  );
}
```

## API

### Cascader

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|allowClear|允许清除值。|boolean |`-`|-|
|animation|是否为内部标签变化添加动画。|boolean |`true`|2.15.0|
|bordered|是否需要边框|boolean |`true`|-|
|changeOnSelect|每当选择的时候，值都会发生改变。多选时如果设置为`true`，会取消父子关系的关联。(默认只有在选择完成的时候，值才会更新)|boolean |`-`|-|
|defaultActiveFirstOption|是否默认高亮搜索结果第一个选项。|boolean |`true`|2.37.0|
|defaultPopupVisible|默认下拉框的展开收起状态|boolean |`-`|-|
|disabled|是否为禁用状态。|boolean |`-`|-|
|dragToSort|是否可以通过拖拽为 Tag 排序|boolean |`-`|2.27.0|
|error|是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)|boolean |`-`|-|
|loading|是否为加载状态。|boolean |`-`|-|
|popupVisible|控制下拉框的展开收起|boolean |`-`|-|
|showEmptyChildren|是否在非动态加载时，选中项children为[]的时候渲染下一级节点。|boolean |`-`|-|
|unmountOnExit|是否在隐藏之后销毁DOM结构，默认为 `true`。如果是动态加载时，默认为`false`。|boolean |`-`|-|
|inputValue|输入框的值|string |`-`|2.34.0|
|placeholder|选择框默认文字。|string |`-`|-|
|autoWidth|设置宽度自适应。minWidth 默认为 0，maxWidth 默认为 100%|\| boolean\| &#123; minWidth?: CSSProperties['minWidth']; maxWidth?: CSSProperties['maxWidth'] } |`-`|2.54.0|
|checkedStrategy|定制回填方式 &lt;br/> parent: 子节点都被选中时候返回父节点 &lt;br/> child: 返回子节点|'parent' \| 'child' |`child`|2.31.0|
|expandTrigger|展开下一级方式|'click' \| 'hover' |`click`|-|
|maxTagCount|最多显示多少个 `tag`，仅在多选或标签模式有效。设置 `responsive` 响应式显示标签数不建议在选项较多时使用，可能存在性能问题，|\| number\| 'responsive'\| &#123;count: number \| 'responsive';render?: (invisibleTagCount: number) =&gt; ReactNode;showPopover?: boolean \| Partial&lt;PopoverProps&gt;;} |`-`|Object type in 2.37.0. `responsive ` in `2.62.0`|
|mode|是否开启多选|'multiple' |`-`|-|
|showSearch|使单选模式可搜索，传入 `&#123; retainInputValue: true }` 在搜索框聚焦时保留现有内容传入 `&#123; retainInputValueWhileSelect: true }` 在多选选择时保留输入框内容。传入 `&#123; panelMode: 'select' }` 以搜索面板形式展示可选项 (`2.39.0`)`renderOption` 自定义渲染搜索项 (`2.39.0`)|\| boolean\| &#123;panelMode?: 'cascader' \| 'select';renderOption?: (inputValue: string,option: NodeProps&lt;T&gt;,options: extraOptions) =&gt; ReactNode;retainInputValue?: boolean;retainInputValueWhileSelect?: boolean;} |`-`|-|
|size|分别不同尺寸的选择器。对应 `24px`, `28px`, `32px`, `36px`|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|status|状态|'error' \| 'warning' |`-`|2.45.0|
|virtualListProps|传递虚拟滚动属性。开启虚拟滚动后，每列级联菜单的会存在默认宽度，可通过 `dropdownMenuColumnStyle` 进行样式调整|Pick&lt;VirtualListProps&lt;any&gt;, 'threshold' \| 'isStaticItemHeight'&gt; |`-`|2.35.0|
|addBefore|选择框前添加元素|ReactNode |`-`|2.41.0|
|clearIcon|`allowClear` 时配置清除按钮的图标。|ReactNode |`-`|2.26.0|
|notFoundContent|没有数据时显示的内容|ReactNode |`-`|-|
|prefix|前缀。|ReactNode |`-`|2.11.0|
|suffixIcon|自定义选择框后缀图标。|ReactNode |`-`|-|
|arrowIcon|自定义箭头图标，设置为 `null` 不显示箭头图标。|ReactNode \| null |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultValue|选择框的默认值|(string \| string[])[] |`-`|-|
|dropdownMenuClassName|自定义下拉列表类名|string \| string[] |`-`|2.35.0|
|dropdownMenuColumnStyle|菜单列样式|CSSProperties |`-`|2.35.0|
|fieldNames|指定label，value，isLeaf，disabled，children 对应的字段|FieldNamesType |`DefaultFieldNames`|-|
|filterOption|默认搜索从 `label` 属性中进行关键字搜索。通过该方法可以自定义搜索逻辑|(inputValue: string, option: NodeProps&lt;T&gt;) =&gt; boolean |`-`|-|
|icons|图标配置。|&#123;loading?: ReactNode;checked?: ReactNode;next?: ReactNode;} |`-`|2.50.0|
|loadMore|动态加载数据。pathValue: 当前选中项的路径 value； level: 选中项层级。|(pathValue: string[], level: number) =&gt; Promise&lt;T[]&gt; |`-`|-|
|options|级联数据|T[] |`[]`|-|
|removeIcon|多选时配置选中项的删除图标。当传入`null`，不显示删除图标。|ReactNode \| null |`-`|-|
|renderFooter|定义每一层级的 `footer`。参数：level: 当前层级, activeOption: 当前点击的节点。返回 `null` 不展示|(level: number, activeOption: NodeProps&lt;T&gt; \| null) =&gt; ReactNode |`-`|-|
|renderOption|自定义展示 `option`|(option: NodeProps&lt;T&gt;, level: number) =&gt; ReactNode |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|triggerProps|可以接受所有 Trigger 组件的 Props|Partial&lt;TriggerProps&gt; |`-`|-|
|value|选中值|(string \| string[])[] |`-`|-|
|dropdownColumnRender|自定义下拉菜单每一列的展示。|(menu: ReactNode, level: number) => ReactNode |`-`|2.15.0, `level` in 2.17.0|
|dropdownRender|自定义下拉菜单的展示。|(menu: ReactNode) => ReactNode |`-`|2.15.0|
|getPopupContainer|弹出框挂在的父节点|(node: HTMLElement) => Element |`-`|-|
|onChange|点击选择框的回调。|(value: (string \| string[])[],selectedOptions,extra: &#123; dropdownVisible?: boolean }) => void |`-`|-|
|onClear|点击清除时触发，参数是当前下拉框的展开状态。|(visible: boolean) => void |`-`|-|
|onClick|鼠标点击下拉框时的回调|(e) => void |`-`|-|
|onInputValueChange|inputValue改变时的回调|(inputValue: string, reason: InputValueChangeReason) => void |`-`|2.34.0|
|onKeyDown|键盘输入时的回调|(e) => void |`-`|2.40.0|
|onSearch|搜索时的回调。(reason in `2.34.0`)|(inputValue: string, reason: InputValueChangeReason) => void |`-`|2.20.0|
|onVisibleChange|下拉框收起展开时触发。|(visible: boolean) => void |`-`|-|
|renderFormat|格式化显示内容。|(valueShow: any[], options?: OptionProps[]) => ReactNode |`-`|-|
|renderTag|自定义标签渲染，`props` 为当前标签属性，`index` 为当前标签的顺序，`values` 为所有标签的值.|(props: &#123;value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: ObjectValueType[]) => ReactNode |`-`|index、values added in 2.15.0|

### extraOptions

```js
export interface extraOptions {
  checked: boolean;
}
```

### FieldNamesType

```js
/**
 * fieldnames 属性类型
 */
export type FieldNamesType = {
  /* Custom field name for label */
  label?: string;
  /** Custom field name for value */
  value?: string;
  /** Custom field name for children */
  children?: string;
  /** Custom field name for disabled  */
  disabled?: string;
  /** Custom field name for isLeaf */
  isLeaf?: string;
};
```

### OptionProps

```js
export interface OptionProps {
  /**
   * @zh 选项的值
   * @en: the value of Option
   *
   */
  value?: string;
  /**
   * @zh 选项文本
   * @en option text
   */
  label?: string;
  /**
   * @zh 是否禁用该选项
   * @en whether to disabled
   */
  disabled?: boolean;
  /**
   * @zh 下一级选项
   * @en next level menu
   */
  children?: OptionProps[];
  /**
   * @zh 是否是叶子节点
   * @en Flag whether it is a leaf node
   */
  isLeaf?: boolean;
  /**
   * @zh 是否禁用复选框选中
   * @en Whether to disable the check box is selected
   * @version 2.21.0
   */
  disableCheckbox?: boolean;
  /**
   * @zh 其他字段
   * @en other fields
   */
  [key: string]: any;
}
```

### InputValueChangeReason

```js
// 造成输入框值改变的原因：用户输入、选项下拉框收起、其他
export type InputValueChangeReason =
  | "manual"
  | "optionListHide"
  | "optionChecked";
```

### ObjectValueType

```js
export type ObjectValueType = {
  value?: any;
  label?: ReactNode;
  closable?: boolean;
};
```

## 方法

| 参数名 |     描述     |    类型    | 默认值 |
| ------ | :----------: | :--------: | -----: |
| focus  |   焦点事件。   | `Function` |    `-` |
| blur   | 失去焦点事件。 | `Function` |    `-` |

**示例**

```js
<Cascader ref={(ref) => (this.select = ref)} />;

this.select.focus();
this.select.blur();
```

