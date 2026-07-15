---
sidebar_position: 1
---

# 选择器 Select

当用户需要从一组同类数据中选择一个或多个时，可以使用下拉选择器，点击后选择对应项。

## 基础用法

基础选择器。

```jsx live
function Demo() {
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];
  return (
    <div>
    <Space size="large">
      <Select
        placeholder="Select city"
        style={{ width: 154 }}
        onChange={(value) =>
          Message.info({
            content: `You select ${value}.`,
            showIcon: true,
          })
        }
      >
        {options.map((option, index) => (
          <Select.Option key={option} disabled={index === 3} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
      <Select placeholder="Select city" style={{ width: 154 }} defaultValue="Beijing" disabled>
        {options.map((option, index) => (
          <Select.Option key={option} disabled={index === 4} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Space>
    <br/>
    <br/>
    <Space size="large">
      <Select
        status="error"
        placeholder="Select city"
        style={{ width: 154 }}
        onChange={(value) =>
          Message.info({
            content: `You select ${value}.`,
            showIcon: true,
          })
        }
      >
        {options.map((option, index) => (
          <Select.Option key={option} disabled={index === 3} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
      <Select status="warning" placeholder="Select city" style={{ width: 154 }} defaultValue="Beijing" >
        {options.map((option, index) => (
          <Select.Option key={option} disabled={index === 4} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Space>
    </div>
  );
};
```

## 允许清除

支持清除按钮。

```jsx live
function Demo() {
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];
  return (
    <Select placeholder="Select" style={{ width: 154 }} allowClear>
      {options.map((option, index) => (
        <Select.Option key={option} disabled={index === 3} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  );
};
```

## 多选模式

指定 `mode=multiple`，即可使用多选。通过 `maxTagCount` 设置最多显示的标签个数，通过 `renderTag` 属性自定义标签的渲染方式，实现更复杂的定制。

```jsx live
function Demo() {
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Wuhan'];
  return (
    <Space size="large" direction="vertical">
      <Select
        mode="multiple"
        placeholder="Select cities"
        style={{ width: 345 }}
        defaultValue={['Beijing', 'Shenzhen']}
        allowClear
      >
        {options.map((option) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>

      <Select
        mode="multiple"
        maxTagCount={2}
        placeholder="Select cities"
        style={{ width: 345 }}
        defaultValue={['Beijing', 'Shenzhen', 'Wuhan']}
        allowClear
      >
        {options.map((option) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>

      <Select
        mode="multiple"
        maxTagCount={{count: 2, render: (invisibleNumber) => `+${invisibleNumber} more`}}
        placeholder="Select cities"
        style={{ width: 345 }}
        defaultValue={['Beijing', 'Shenzhen', 'Wuhan']}
        allowClear
      >
        {options.map((option) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>

      <Select
        mode="multiple"
        placeholder="Select"
        style={{ width: 345 }}
        defaultValue={['Beijing', 'Shenzhen', 'Wuhan']}
        allowClear
        renderTag={({ label, value, closable, onClose }, index, valueList) => {
          const tagCount = valueList.length;

          if (tagCount > 2) {
            return index === 0 ? (
              <span style={{ marginLeft: 8 }}>{`${tagCount} cities selected`}</span>
            ) : null;
          }

          return (
            <Tag
              color="arcoblue"
              closable={closable}
              onClose={onClose}
              style={{ margin: '2px 6px 2px 0' }}
            >
              {label}
            </Tag>
          );
        }}
      >
        {options.map((option) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};
```

## 带有前置标签

通过 `addBefore` 设置前置标签  (`2.41.0`)

```jsx live
function Demo() {
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Tianjin'];
  return (
    <Space size="large">
      <Select
        addBefore="Select city"
        placeholder="Select city"
        style={{ width: 300 }}
        onChange={(value) =>
          Message.info({
            content: `You select ${value}.`,
            showIcon: true,
          })
        }
      >
        {options.map((option, index) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
      <Select
        addBefore="Select city"
        placeholder="Select city"
        style={{ width: 300 }}
        mode="multiple"
      >
        {options.map((option, index) => (
          <Select.Option key={option} disabled={index === 4} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};
```

## 允许创建

指定 `allowCreate` 为 `true`，即可创建选项中不存在的条目。通过 `allowCreate.formatter` 格式化用户创建的选项。

```jsx live
function App() {
  const options = [];

  for (let i = 10; i < 24; i++) {
    options.push(i.toString(36) + i);
  }

  return (
    <Space size="large">
      <Select allowCreate placeholder="Create an item" allowClear style={{ width: 345 }}>
        {options.map((option) => (
          <Select.Option key={option} value={option} disabled={option === 'b11' ? true : false}>
            {option}
          </Select.Option>
        ))}
      </Select>

      <Select
        allowClear
        mode="multiple"
        placeholder="Create an item"
        defaultValue={['a10', 'b11']}
        allowCreate={{
          formatter: (inputValue, creating) => {
            return {
              value: inputValue,
              label: `${creating ? 'Enter to create: ' : 'Created: '}${inputValue}`
            };
          },
        }}
        style={{ width: 345 }}
      >
        {options.map((option) => (
          <Select.Option key={option} value={option} disabled={option === 'b11' ? true : false}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
}
```

## 搜索

指定`showSearch=true`，可以对展开的选项进行搜索，配合 `filterOption` 可以自定义搜索。
搜索框聚焦时默认会清空已输入的内容，通过指定 `showSearch=&#123; retainInputValue: true }` 来保留内容。

```jsx live
function Demo() {
  const cities = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Wuhan'];
  const foods = [
    {
      label: '南非龙虾',
      value: 'nanfeilongxia',
    },
    {
      label: '新西兰羊排',
      value: 'xinxilanyangpai',
    },
    {
      label: '海鲜烩意面',
      value: 'haixianhuiyimian',
    },
    {
      label: '酱烧豆腐',
      value: 'jiangshaodoufu',
    },
    {
      label: '西红柿炒蛋',
      value: 'xihongshichaodan',
    },
    {
      label: '提拉米苏',
      value: 'tilamisu',
    },
  ];
  return (
    <Space size="large">
      <Select placeholder="Select city" style={{ width: 154 }} allowClear showSearch>
        {cities.map((option, index) => (
          <Select.Option key={option} disabled={index === 3} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
      <Select
        style={{ width: 154 }}
        showSearch
        allowClear
        placeholder="Filter option"
        filterOption={(inputValue, option) =>
          option.props.value.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
          option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
        }
      >
        {foods.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      <Select
        placeholder="Retain input value"
        style={{ width: 154 }}
        allowClear
        showSearch={{
          retainInputValue: true,
        }}
      >
        {cities.map((option, index) => (
          <Select.Option key={option} disabled={index === 3} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};
```

## 远程搜索

指定 `showSearch`，并且结合 `filterOption` 和 `onSearch`，可以使用远程搜索功能。

```jsx live

function App() {
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);
  const refFetchId = useRef(null);
  const debouncedFetchUser = useCallback(
    debounce((inputValue) => {
      refFetchId.current = Date.now();
      const fetchId = refFetchId.current;
      setFetching(true);
      setOptions([]);
      fetch('https://randomuser.me/api/?results=5')
        .then((response) => response.json())
        .then((body) => {
          if (refFetchId.current === fetchId) {
            const options = body.results.map((user) => ({
              label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar size={24} style={{ marginLeft: 6, marginRight: 12 }}>
                    <img alt="avatar" src={user.picture.thumbnail} />
                  </Avatar>
                  {`${user.name.first} ${user.name.last}`}
                </div>
              ),
              value: user.email,
            }));
            setFetching(false);
            setOptions(options);
          }
        });
    }, 500),
    []
  );
  return (
    <Select
      style={{ width: 345 }}
      showSearch
      mode="multiple"
      options={options}
      placeholder="Search by name"
      filterOption={false}
      renderFormat={(option) => {
        return option.children.props.children[1];
      }}
      notFoundContent={
        fetching ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spin style={{ margin: 12 }} />
          </div>
        ) : null
      }
      onSearch={debouncedFetchUser}
    />
  );
}
```

## 自定义弹出框宽度

这个例子展示了弹出框可以根据内容自动调节宽度，最小宽度为输入框的宽度。
`triggerProps.autoAlignPopupWidth` 参数为弹出框宽度跟输入框保持一致。
`triggerProps.autoAlignPopupMinWidth` 参数为弹出框最小宽度跟输入框保持一致。
可以自由组合。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Select
        placeholder="Select city"
        style={{ width: 154 }}
        triggerProps={{
          autoAlignPopupWidth: false,
          position: 'bl',
        }}
      >
        <Select.Option value="1">Beijing</Select.Option>
        <Select.Option disabled value="2">
          Shanghai
        </Select.Option>
        <Select.Option value="3">Guangzhou</Select.Option>
        <Select.Option value="4">Shenzhen</Select.Option>
      </Select>
      <Select
        placeholder="Select city"
        style={{ width: 154 }}
        triggerProps={{
          autoAlignPopupWidth: false,
          autoAlignPopupMinWidth: true,
          position: 'bl',
        }}
      >
        <Select.Option value="1">Beijing Beijing Beijing Beijing Beijing</Select.Option>
        <Select.Option disabled value="2">
          Shanghai
        </Select.Option>
        <Select.Option value="3">Guangzhou</Select.Option>
        <Select.Option value="4">Shenzhen</Select.Option>
      </Select>
    </Space>
  );
};
```

## 不同尺寸

通过 `size` 选择 Select 的尺寸（`mini`, `small`, `default`, `large`），高度分别对应`24px`、`28px`、`32px`、`36px`。

```jsx live
class App extends React.Component {
  state = {
    value: 'default',
  };

  render() {
    const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Wuhan'];
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
          style={{ marginBottom: 20, borderRadius: 4 }}
        >
          <Radio value="mini">mini</Radio>
          <Radio value="small">small</Radio>
          <Radio value="default">default</Radio>
          <Radio value="large">large</Radio>
        </Radio.Group>
        <div>
          <Select
            size={this.state.value}
            placeholder="Select city"
            showSearch
            style={{ width: 345, marginBottom: 20 }}
          >
            {options.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
          <br />
          <Select
            mode={'multiple'}
            size={this.state.value}
            placeholder="Select cities"
            showSearch
            style={{ width: 345 }}
          >
            {options.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    );
  }
}
```

## 定制回显内容

使用 `renderFormat` 可以定制回显内容。

**注意：在如远程加载选项数据的场景下，value 中对应的选项可能在某些时刻并不存在，需要判断若 `option` 不存在则返回 `value` 作为显示的内容。**

```jsx live
function App() {
  const data = ['Beijing', 'Guangzhou', 'Shanghai', 'Shenzhen'];
  return (
    <Space size="large">
      <Select
        placeholder="Select city"
        style={{ width: 345, }}
        renderFormat={(option, value) => {
          return option ? (
            <span>
              <IconStar style={{ color: '#f7ba1e', }} />
              {` ${option.value} `}
            </span>
          ) : (
            value
          );
        }}
      >
        {data.map((item, index) => (
          <Select.Option value={item} key={index}>
            {item}
          </Select.Option>
        ))}
      </Select>

      <Select
        placeholder="Select city"
        style={{ width: 345, }}
        mode="multiple"
        removeIcon={<IconDelete />}
        defaultValue={['Beijing', 'Shenzhen']}
        renderFormat={(option, value) => {
          // When labelInValue is true, the value is an object
          return option ? (
            <span>
              <IconStar
                style={{
                  color: '#f7ba1e',
                }}
              />
              {` ${option.value} City `}
            </span>
          ) : (
            value
          );
        }}
      >
        {data.map((item, index) => (
          <Select.Option value={item} key={index}>
            {item}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
}
```

## 分组

使用 `Select.Group` 对下拉菜单选项进行编组。

```jsx live
function Demo() {
  const groups = [
    ['Black tea latte', 'Green tea latte'],
    ['Vanilla Frappuccino', 'Matcha Frappuccino'],
    ['Chocolate milk', 'Banana milk'],
  ];
  return (
    <div>
      <Select showSearch allowClear placeholder="Select drink" style={{ width: 154 }}>
        {groups.map((options, index) => {
          return (
            <Select.OptGroup label={`Group-${index}`} key={index}>
              {options.map((option, index) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select.OptGroup>
          );
        })}
      </Select>
    </div>
  );
};
```

## 指定可选项

通过传入`options`指定可选项。

```jsx live
function Demo() {
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Wuhan'];
  return (
    <Space size="large">
      <Select
        options={options}
        defaultValue="Beijing"
        placeholder="Select city"
        style={{ width: 154 }}
      />

      <Select
        mode="multiple"
        options={options}
        defaultValue={['Beijing', 'Shanghai']}
        placeholder="Select cities"
        style={{
          width: 345,
        }}
      />
    </Space>
  );
};
```

## 滚动加载选项

当动态加载时，可通过`onPopupScroll`来监听滚动事件

```jsx live

function App() {
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);
  const refFetchId = useRef(null);
  const refCanTriggerLoadMore = useRef(true);
  const debouncedFetchUser = useCallback(
    debounce((inputValue) => {
      refFetchId.current = Date.now();
      const fetchId = refFetchId.current;
      setFetching(true);
      setOptions([]);
      fetch('https://randomuser.me/api/?results=10')
        .then((response) => response.json())
        .then((body) => {
          if (refFetchId.current === fetchId) {
            const newOptions = body.results.map((user) => ({
              label: (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    size={24}
                    style={{
                      marginLeft: 6,
                      marginRight: 12,
                    }}
                  >
                    <img alt="avatar" src={user.picture.thumbnail} />
                  </Avatar>
                  {`${user.name.first} ${user.name.last}`}
                </div>
              ),
              value: user.email,
            }));
            setFetching(false);
            setOptions(newOptions);
          }
        });
    }, 500),
    [options]
  );

  const popupScrollHandler = (element) => {
    const { scrollTop, scrollHeight, clientHeight } = element;
    const scrollBottom = scrollHeight - (scrollTop + clientHeight);

    if (scrollBottom < 10) {
      if (!fetching && refCanTriggerLoadMore.current) {
        debouncedFetchUser();
        refCanTriggerLoadMore.current = false;
      }
    } else {
      refCanTriggerLoadMore.current = true;
    }
  };

  return (
    <Select
      style={{ width: 345 }}
      mode="multiple"
      options={options}
      placeholder="Search by name"
      filterOption={false}
      renderFormat={(option) => {
        return option.children.props.children[1];
      }}
      notFoundContent={
        fetching ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spin style={{ margin: 12 }} />
          </div>
        ) : null
      }
      onSearch={debouncedFetchUser}
      onPopupScroll={popupScrollHandler}
    />
  );
}
```

## 自动分词

设置 `tokenSeparators` 可以使用自动分词功能。试试复制 `Beijing,Shanghai,Shenzhen|Nanjing/Xi'an|Hangzhou` 到输入框里。只在 `multiple` 模式下可用。

```jsx live
function Demo() {
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Wuhan'];
  return (
    <Select
      mode="multiple"
      placeholder="Select cities"
      tokenSeparators={[',', '|', '/']}
      allowCreate
      allowClear
      style={{ width: 345 }}
    >
      {options.map((option) => (
        <Select.Option key={option} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  );
};
```

## 自定义触发节点

设置 `triggerElement` 可以自定义触发下拉框的节点。当自定义了触发节点时，由于内部绑定的键盘处理事件失效，所以快捷键操作将不可用，需要通过组件引用的 `hotkeyHandler` 进行额外处理。

```jsx live
const DemoSelect = () => {
  const refSelect = useRef(null);
  const [text, setText] = useState('None');
  return (
    <div>
      <Select
        ref={refSelect}
        mode="multiple"
        onChange={(_, option) => {
          const array = option.map((item) => item.children);
          setText(array.join('，') || 'None');
        }}
        triggerElement={
          <Typography.Paragraph
            style={{
              width: 300,
            }}
            className="trigger-element"
            tabIndex={0}
            onKeyDown={(e) => {
              refSelect.current && refSelect.current.hotkeyHandler(e);
            }}
          >
            Favorite Cities：<Link>{text}</Link>
          </Typography.Paragraph>
        }
      >
        <Select.Option value="1">Beijing</Select.Option>
        <Select.Option disabled value="2">
          Shanghai
        </Select.Option>
        <Select.Option value="3">Shenzhen</Select.Option>
        <Select.Option value="4">Wuhan</Select.Option>
      </Select>
    </div>
  );
};
```

## 扩展菜单

使用 `dropdownRender` 对下拉菜单进行自由扩展。

```jsx live
function App() {
  const [options, setOptions] = useState(['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']);
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue && options.indexOf(inputValue) === -1) {
      setOptions(options.concat([inputValue]));
      setInputValue('');
    }
  };

  return (
    <Select
      style={{ width: 240 }}
      placeholder="Select city"
      dropdownRender={(menu) => (
        <div>
          {menu}
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
      )}
      dropdownMenuStyle={{ maxHeight: 100 }}
    >
      {options.map((option) => (
        <Select.Option key={option} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  );
}
```

## 无边框

使用 `bordered = false`，可以使用无边框的选择器。

```jsx live
function Demo() {
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Wuhan'];
  return (
    <Space size="large">
      <Select
        placeholder="Select city"
        bordered={false}
        style={{ width: 154 }}
        onChange={(value) =>
          Message.info({
            content: `You select ${value}.`,
            showIcon: true,
          })
        }
      >
        {options.map((option, index) => (
          <Select.Option key={option} disabled={index === 3} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
      <Select
        placeholder="Select city"
        bordered={false}
        style={{ width: 154 }}
        defaultValue="Beijing"
        disabled
      >
        {options.map((option, index) => (
          <Select.Option key={option} disabled={index === 4} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};
```

## 自定义标签样式

指定 `renderTag` 来自定义标签节点。

```jsx live
function Demo() {
  const options = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'purple',
    'magenta',
  ];

  function tagRender(props) {
    const { label, value, closable, onClose } = props;
    return (
      <Tag
        color={options.indexOf(value) > -1 ? value : 'gray'}
        closable={closable}
        onClose={onClose}
        style={{ margin: '2px 6px 2px 0' }}
      >
        {label}
      </Tag>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Select
          style={{ maxWidth: 350, marginRight: 20 }}
          allowClear
          placeholder="Select color"
          mode={'multiple'}
          defaultValue={options.slice(0, 2)}
          options={options}
          renderTag={tagRender}
        />
      </div>
    </div>
  );
};
```

## 联动

省市联动示例。

```jsx live
function App() {
  const data = {
    Beijing: ['Haidian', 'Chaoyang', 'Changping'],
    Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
    Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou'],
  };
  const provinces = Object.keys(data);
  const defaultProvince = provinces[0];
  const [province, setProvince] = useState(defaultProvince);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');
  useEffect(() => {
    const cities = data[province] || [];
    setCities(cities);
    setCity(cities[0]);
  }, [province]);
  return (
    <Space size="large">
      <Select
        placeholder="Select Province"
        style={{ width: 154 }}
        onChange={(value) => setProvince(value)}
        defaultValue={province}
      >
        {provinces.map((option, index) => (
          <Select.Option key={index} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
      <Select
        placeholder="Select city"
        style={{ width: 154 }}
        onChange={(value) => setCity(value)}
        value={city}
      >
        {cities.map((option, index) => (
          <Select.Option key={index} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
}
```

## 隐藏已选择项

在下拉列表中隐藏已选择的项。

```jsx live
function App() {
  const OPTIONS = new Array(10).fill(null).map((_, index) => `Option ${index + 1}`);
  const [options, setOptions] = useState(OPTIONS);
  return (
    <>
      <Select
        placeholder="Select an item"
        style={{ width: 345, marginRight: 20 }}
        mode="multiple"
        onChange={(value) => setOptions(OPTIONS.filter((option) => value.indexOf(option) === -1))}
      >
        {options.map((option, index) => (
          <Select.Option wrapperClassName="select-demo-hide-option-checkbox" key={index} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </>
  );
}
```

## 大数据

`Select` 使用了虚拟滚动技术，在大量数据的情况也能保证性能。

**当指定了 `triggerProps.autoAlignPopupWidth = false` 且 `Option.label` 为非文本类型时，由于无法在选项列表首次渲染时获取选项的最大宽度，虚拟滚动会被自动关闭。**

```jsx live
function Demo() {
  const options = new Array(10000).fill(null).map((value, index) => `Item ${index}`);
  return (
    <>
      <Typography.Title heading={6}>10000 items</Typography.Title>
      <Select
        mode="multiple"
        allowCreate
        placeholder="Select a tag"
        allowClear
        style={{ width: 345 }}
      >
        {options.map((option) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};
```

## 拖拽排序

多选时，指定 `dragToSort` 属性以允许对已输入的值进行拖拽排序。

```jsx live
function Demo() {
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen','a', 'b'];
  return (
    <Select
      placeholder="Select city"
      style={{ width: 345 }}
      mode="multiple"
      dragToSort
      defaultValue={options.slice(0, 3)}
      maxTagCount={3}
    >
      {options.map((option, index) => (
        <Select.Option key={option} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  );
};
```

## 宽度自适应

通过 `autoWidth` 属性可以设置 `Select` 的宽度自适应

```jsx live
function Demo() {
  const options = ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'BBBBBBBBBBBBBBBBBBBB', 'CCCCCCCCCCCC', 'DDDD', 'EEE', 'FF'];
  return (
    <div >
      <div style={{marginBottom: 32}}>
        <Divider orientation="center">
          <Typography.Text code>{JSON.stringify({minWidth: 200, maxWidth: 500})}</Typography.Text>
        </Divider>
        <Select
          autoWidth={{minWidth: 200, maxWidth: 500}}
          placeholder="Select an item"
          options={options}
          allowClear
          showSearch
        >
        </Select>
        <br/><br/>
        <Select
          autoWidth={{minWidth: 200, maxWidth: 500}}
          placeholder="Select an item"
          options={options}
          allowClear
          showSearch
          addBefore="Select"
        >
        </Select>
      </div>

      <div style={{marginBottom: 32}}>
        <Divider orientation="center">
          <Typography.Text code>{JSON.stringify({minWidth: 0, maxWidth: 500})}</Typography.Text>
        </Divider>
        <Select
          autoWidth={{ maxWidth: 500}}
          placeholder="Select an item"
          options={options}
          allowClear
          showSearch
        >
        </Select>
        <br/><br/>
        <Select
          autoWidth={{ maxWidth: 500}}
          placeholder="Select an item"
          options={options}
          allowClear
          showSearch
          addBefore="Select"
        >
        </Select>
      </div>

      <div style={{marginBottom: 32}}>
      <Divider orientation="center">
          <Typography.Text code>{JSON.stringify({minWidth: 300, maxWidth: "100%"})}</Typography.Text>
        </Divider>
        <Select
          autoWidth={{ minWidth: 300 }}
          placeholder="Select an item"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        >
        </Select>
        <br/>
        <br/>
        <Select
          addBefore="Select"
          autoWidth={{ minWidth: 300 }}
          placeholder="Select an item"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        >
        </Select>
      </div>
    </div>
  );
};
```

## 最大标签数

通过 `maxTagCount` 属性可以设置 `Select` 的最大标签数。
`maxTagCount=responsive` 时会根据容器尺寸动态显示标签数。因为会监听所有 Tag 及容器的尺寸变化，所以在选项较多时不建议使用，可能存在性能问题。

```jsx live
function Demo() {
  const options = [...new Array(20)].map((_, index) => `label ${index}`);
  return (
    <Space size="large" direction="vertical">
      <div>
        <Divider orientation="left"> 最多显示三个 Tag </Divider>
        <Select
          defaultValue={options.slice(0, 4)}
          maxTagCount={3}
          style={{ width: 350 }}
          placeholder="Select an item"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        ></Select>
      </div>
      <div>
        <Divider orientation="left"> 最多显示三个 Tag，并自定义渲染省略节点 </Divider>
        <Select
          defaultValue={options.slice(0, 4)}
          maxTagCount={{ count: 3, render: (invisibleCount) => `+${invisibleCount}` }}
          style={{ width: 350 }}
          placeholder="Select an item"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        ></Select>
      </div>

      <div>
        <Divider orientation="left"> 最多显示三个 Tag，隐藏节点以 Popover 展示 </Divider>
        <Select
          defaultValue={options.slice(0, 4)}
          maxTagCount={{ count: 3, showPopover: true,  }}
          style={{ width: 350 }}
          placeholder="Select an item"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        ></Select>
      </div>
      <div>
        <Divider orientation="left"> 根据 select 宽度自适应渲染 Tag 个数 </Divider>
        <Select
          defaultValue={options.slice(0, 5)}
          maxTagCount="responsive"
          style={{ width: 350 }}
          placeholder="Select an item"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        ></Select>
      </div>
    </Space>
  );
};
```

## API

### Select

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|allowClear|允许清除值。|boolean |`-`|-|
|animation|是否为内部标签变化添加动画。|boolean |`true`|2.15.0|
|bordered|是否需要边框|boolean |`true`|-|
|defaultActiveFirstOption|是否默认高亮第一个选项|boolean |`true`|-|
|defaultPopupVisible|下拉框是否默认打开。|boolean |`-`|2.14.0|
|disabled|是否为禁用状态。|boolean |`-`|-|
|dragToSort|是否可以通过拖拽为 Tag 排序|boolean |`-`|2.27.0|
|error|是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)|boolean |`-`|-|
|labelInValue|设置 `onChange` 回调中 `value` 的格式。默认是string，设置为true时候，value格式为： &#123; label: string, value: string }|boolean |`-`|-|
|loading|是否为加载状态。|boolean |`-`|-|
|popupVisible|控制下拉框是否打开。|boolean |`-`|2.6.0|
|unmountOnExit|是否在隐藏的时候销毁 DOM 结构|boolean |`true`|-|
|inputValue|输入框的值（受控模式）|string |`-`|-|
|placeholder|选择框默认文字。|string |`-`|-|
|allowCreate|是否允许通过输入创建新的选项。|\| boolean\| &#123;formatter: (inputValue: string, creating: boolean) => SelectProps['options'][number];} |`-`|2.13.0, `&#123; formatter }` in 2.54.0|
|autoWidth|设置宽度自适应。minWidth 默认为 0，maxWidth 默认为 100%|\| boolean\| &#123; minWidth?: CSSProperties['minWidth']; maxWidth?: CSSProperties['maxWidth'] } |`-`|2.54.0|
|maxTagCount|最多显示多少个 `tag`，仅在多选或标签模式有效。设置 `responsive` 响应式显示标签数不建议在选项较多时使用，可能存在性能问题，|\| number\| 'responsive'\| &#123;count: number \| 'responsive';render?: (invisibleTagCount: number) => ReactNode;} |`-`|Object type in 2.37.0. `responsive ` in `2.62.0`|
|mode|是否开启多选模式或标签模式 (**`tags` 推荐使用 `mode: multiple; allowCreate: true` 替代，下一大版本将移除此模式**)|'multiple' \| 'tags' |`-`|-|
|size|分别不同尺寸的选择器。对应 `24px`, `28px`, `32px`, `36px`|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|status|状态|'error' \| 'warning' |`-`|2.45.0|
|trigger|触发方式。|TriggerProps['trigger'] |`click`|-|
|addBefore|选择框前添加元素|ReactNode |`-`|2.41.0|
|clearIcon|`allowClear` 时配置清除按钮的图标。|ReactNode |`-`|2.26.0|
|notFoundContent|没有数据时显示的内容|ReactNode |`-`|-|
|prefix|前缀。|ReactNode |`-`|2.11.0|
|suffixIcon|自定义选择框后缀图标。|ReactNode |`-`|-|
|arrowIcon|自定义箭头图标，设置为 `null` 不显示箭头图标。|ReactNode \| null |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultValue|选择框的默认值|string \| string[] \| number \| number[] \| LabeledValue \| LabeledValue[] |`-`|-|
|dropdownMenuClassName|下拉列表的类。|string \| string[] |`-`|-|
|dropdownMenuStyle|下拉列表的样式。|CSSProperties |`-`|-|
|options|指定可选项|(\| string\| number\| &#123; label: ReactNode \| string; value: string \| number; disabled?: boolean; extra?: any })[] |`-`|`extra` in 2.2.0|
|removeIcon|多选时配置选中项的删除图标。当传入`null`，不显示删除图标。|ReactNode \| null |`-`|-|
|showSearch|使单选模式可搜索，传入 `&#123; retainInputValue: true }` 在搜索框聚焦时保留现有内容传入 `&#123; retainInputValueWhileSelect: true }` 在多选选择时保留输入框内容。|boolean \| &#123; retainInputValue?: boolean; retainInputValueWhileSelect?: boolean } |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|tokenSeparators|在多选模式下自动分词的分隔符。|string[] |`-`|-|
|triggerProps|可以接受所有 `Trigger` 的 `Props`|Partial&lt;TriggerProps&gt; |`-`|-|
|value|选择器的值（受控模式）|string \| string[] \| number \| number[] \| LabeledValue \| LabeledValue[] |`-`|-|
|virtualListProps|传递虚拟滚动属性。|AvailableVirtualListProps |`-`|2.1.0|
|dropdownRender|自定义弹出内容。|(menu: ReactNode) => ReactNode |`-`|-|
|filterOption|是否根据输入的值筛选数据。如果传入函数的话，接收 `inputValue` 和 `option` 两个参数，当option符合筛选条件时，返回 `true`，反之返回 `false`。|boolean \| ((inputValue: string, option: ReactElement) => boolean) |`true`|-|
|getPopupContainer|弹出框挂载的父节点。|(node: HTMLElement) => Element |`-`|-|
|onBlur|失去焦点时的回调|(e) => void |`-`|-|
|onChange|点击选择框的回调|(value, option: OptionInfo \| OptionInfo[]) => void |`-`|-|
|onClear|点击清除时触发，参数是当前下拉框的展开状态。|(visible: boolean) => void |`-`|-|
|onClick|鼠标点击下拉框时的回调|(e) => void |`-`|-|
|onDeselect|取消选中的时候触发的回调，(只在 `multiple` 模式下触发)。|(value: string \| number \| LabeledValue, option: OptionInfo) => void |`-`|-|
|onFocus|获得焦点时的回调|(e) => void |`-`|-|
|onInputValueChange|输入框文本改变的回调。|(value: string, reason: InputValueChangeReason) => void |`-`|2.3.0|
|onKeyDown|键盘输入时的回调|(e) => void |`-`|2.40.0|
|onPaste|输入框文本粘贴的回调。|(e) => void |`-`|2.9.0|
|onPopupScroll|下拉框的滚动监听函数，参数为滚动元素。|(elem) => void |`-`|-|
|onSearch|搜索时的回调|(value: string, reason: InputValueChangeReason) => void |`-`|-|
|onSelect|选中选项时触发的回调，(只在 `multiple` 模式下触发)。|(value: string \| number \| LabeledValue, option: OptionInfo) => void |`-`|2.52.0|
|onVisibleChange|下拉框收起展开时触发|(visible: boolean) => void |`-`|-|
|renderFormat|定制回显内容。返回值将会显示在下拉框内。若 `value` 对应的 `Option` 不存在，则第一个参数是 null|(option: OptionInfo \| null, value: string \| number \| LabeledValue) => ReactNode |`-`|-|
|renderTag|自定义标签渲染，`props` 为当前标签属性，`index` 为当前标签的顺序，`values` 为所有标签的值.|(props: &#123;value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: ObjectValueType[]) => ReactNode |`-`|index、values added in 2.15.0|
|triggerElement|自定义触发元素。|\| ReactNode\| ((params: &#123; value: any; option: OptionInfo \| OptionInfo[] }) => ReactNode) |`-`|`() => ReactNode` in 2.31.0|

### Select.Option

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|disabled|是否禁用|boolean |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|extra|携带任意自定义数据。|any |`-`|2.2.0|
|style|节点样式|CSSProperties |`-`|-|
|value|默认根据此属性值进行筛选|string \| number  **(必填)**|`-`|-|

### Select.OptGroup

|参数名|描述|类型|默认值|
|---|---|---|---|
|label|组名|ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### Select Reference Type

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|activeOptionValue|处于悬浮态的选项的值|OptionProps['value']  **(必填)**|`-`|-|
|getOptionInfoByValue|根据选项值获得对应的选项信息|(value: OptionProps['value']) => OptionInfo  **(必填)**|`-`|-|
|scrollIntoView|将下拉列表滚动至指定选项|(value: OptionProps['value'], options?: ScrollIntoViewOptions) => void  **(必填)**|`-`|2.46.0|
|dom|DOM 节点|HTMLDivElement  **(必填)**|`-`|-|
|blur|使选择框失焦|() => void  **(必填)**|`-`|-|
|focus|使选择框聚焦|() => void  **(必填)**|`-`|-|
|getOptionInfoList|获得选项信息的列表|() => OptionInfo[]  **(必填)**|`-`|-|
|hotkeyHandler|鼠标快捷操作的处理函数|(event: KeyboardEvent) => void  **(必填)**|`-`|-|

### LabeledValue

```js
export type LabeledValue = {
  value: string | number;
  label: ReactNode;
};
```

### OptionInfo

```js
export interface OptionInfo extends PropsWithChildren<OptionProps> {
  child?: ReactElement;
  _valid: boolean;
  _index: number;
  _origin: "children" | "options" | "userCreatedOptions" | "userCreatingOption";
}
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

### InputValueChangeReason

```js
// 造成输入框值改变的原因：用户输入、选中选项、选项下拉框收起、触发自动分词
export type InputValueChangeReason =
  | "manual"
  | "optionChecked"
  | "optionListHide"
  | "tokenSeparator";
```

### ObjectValueType

```js
export type ObjectValueType = {
  value?: any;
  label?: ReactNode;
  closable?: boolean;
};
```

### VirtualListProps

|参数名|描述|类型|默认值|
|------|:----------:|:--------:|-----:|
|height|可视区高度 (`2.11.0` 开始支持如 `80%` 的 `string` 类型)|`number`|200|
|threshold|自动开启虚拟滚动的元素数量阈值，传入`null`以禁用虚拟滚动。|`number`\|`null`|100|
|isStaticItemHeight|是否为相同高度的静态元素|`boolean`|true|

