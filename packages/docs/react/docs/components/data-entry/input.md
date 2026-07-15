---
sidebar_position: 1
---

# 输入框 Input

基本表单组件，并在原生控件基础上进行了功能扩展，可以组合使用。

## 基本用法

通过鼠标或键盘输入内容。

```jsx live
function Demo() {
  return <Input style={{ width: 350 }} allowClear  placeholder="Enter something" />;
};
```

## 输入框状态

不同的输入框状态

```jsx live
function Demo() {
  return (
    <Space wrap>
      <Input style={{ width: 350 }} status="error" placeholder="error status" />
      <Input style={{ width: 350 }} status="warning" placeholder="warning status" />
      <Input style={{ width: 350 }} disabled placeholder="disabled input" />
    </Space>
  );
};
```

## 四种尺寸

输入框定义了四种默认尺寸（`mini`,`small`, `default`, `large`），分别为 24px，28px，32px，36px。

```jsx live

class App extends React.Component {
  state = {
    size: 'default',
    height: 0,
  };
  handleHeightChange = (height) => {
    this.setState({
      height,
    });
  };
  handleChange = (size) => {
    this.setState({
      height: undefined,
      size,
    });
  };

  render() {
    const { size, height } = this.state;
    const props = {
      size,
    };

    if (height) {
      props.height = height;
    }

    return (
      <div>
        <Radio.Group
          type="button"
          mode="fill"
          name="size"
          value={this.state.size}
          onChange={this.handleChange}
          style={{ marginBottom: 24 }}
        >
          {['mini', 'small', 'default', 'large'].map((x) => {
            return (
              <Radio key={x} value={x}>
                {x}
              </Radio>
            );
          })}
        </Radio.Group>
        <br />
        <Typography.Text>Custom height</Typography.Text>
        <Slider
          value={this.state.height}
          onChange={this.handleHeightChange}
          max={60}
          min={24}
          style={{ width: 180, margin: '0 0 20px 20px' }}
        />
        <div>
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            prefix={<IconClockCircle />}
            placeholder="Enter something"
          />
          <Input
            {...props}
             style={{ width: 350, margin: 12 }}
            suffix={<IconInfoCircle />}
            placeholder="Enter something"
          />
        </div>
        <div>
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            addAfter="KG"
            placeholder="Enter something"
          />
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            addBefore="+86"
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            addBefore="+86"
            addAfter={<IconSearch />}
            prefix={<IconClockCircle />}
            suffix={<IconInfoCircle />}
            allowClear
            placeholder="Enter phone number"
          />
          <Input.Search
            {...props}
            placeholder="Enter something"
            style={{ width: 350, margin: 12 }}
            searchButton={true}
          />
        </div>
        <div>
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            addBefore={
              <Select size={size} placeholder="Select protocol" style={{ width: 100 }}>
                <Select.Option value="http://">http://</Select.Option>
                <Select.Option value="https://">https://</Select.Option>
              </Select>
            }
            allowClear={true}
            placeholder="Enter something"
          />
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            allowClear={true}
            placeholder="Enter something"
          />
        </div>
      </div>
    );
  }
}
```

## 前置、后置标签

指定`addBefore`和`addAfter`在输入框前后添加元素。

```jsx live
function Demo() {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Input style={{ width: 350 }} addAfter="RMB" placeholder="Enter amount" />
        <Input style={{ width: 350 }} addBefore="+86" placeholder="Enter phone number" />
      </Space>
      <Space wrap>
        <Input
          style={{ width: 350 }}
          addBefore="http://"
          addAfter={
            <Select defaultValue=".com" showSearch style={{ width: 80 }}>
              <Select.Option value=".com">.com</Select.Option>
              <Select.Option value=".cn">.cn</Select.Option>
              <Select.Option value=".net">.net</Select.Option>
              <Select.Option value=".org">.org</Select.Option>
            </Select>
          }
          allowClear
          placeholder="Enter host"
        />
        <Input style={{ width: 350 }} addBefore="www." addAfter=".com" placeholder="Enter host" />
      </Space>
    </Space>
  );
};
```

## 前后缀

通过指定`prefix`和`suffix`来在输入框内添加前缀和后缀。

```jsx live
function Demo() {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Input style={{ width: 350 }} prefix={<IconUser />} placeholder="Enter something" />
        <Input
          allowClear
          style={{ width: 350 }}
          suffix={<IconInfoCircle />}
          placeholder="Enter something"
        />
      </Space>
      <Space wrap>
        <Input
          style={{ width: 350 }}
          prefix={<IconUser />}
          suffix={<IconInfoCircle />}
          placeholder="Enter something"
        />
        <Input
          style={{ width: 350 }}
          addBefore="+86"
          addAfter={<IconSearch />}
          prefix={<IconUser />}
          suffix={<IconInfoCircle />}
          allowClear
          placeholder="Enter something"
        />
      </Space>
    </Space>
  );
};
```

## 搜索框

带有搜索按钮的输入框，用于内容检索。

```jsx live
function Demo() {
  return (
    <Space wrap>
      <Input.Search allowClear placeholder="Enter keyword to search" style={{ width: 350 }} />
      <Input.Search
        searchButton
        defaultValue="Search content"
        placeholder="Enter keyword to search"
        style={{ width: 350 }}
      />
      <Input.Search
        searchButton="Search"
        defaultValue="Search content"
        placeholder="Enter keyword to search"
        style={{ width: 350 }}
      />
    </Space>
  );
};
```

## 搜索框 Loading

通过 `loading` 属性可以设置搜索框在 `onSearch` 的时候展示 `loading`。

```jsx live
function Demo() {
  return (
    <Space wrap>
      <Input.Search loading placeholder="Enter keyword to search" style={{ width: 350 }} />
      <Input.Search
        searchButton
        loading
        defaultValue="Search content"
        placeholder="Enter keyword to search"
        style={{ width: 350 }}
      />
      <Input.Search
        searchButton="Search"
        loading
        defaultValue="Search content"
        placeholder="Enter keyword to search"
        style={{ width: 350 }}
      />
    </Space>
  );
};
```

## 输入框组合

通过鼠标或键盘输入内容。

```jsx live
function Demo() {
  return (
    <div>
      <Grid.Row>
        <div
          style={{
            marginRight: 24,
            width: 360,
            display: 'inline-block',
            marginBottom: 24,
          }}
        >
          <Input.Group compact>
            <Select defaultValue="Beijing" showSearch style={{ width: '25%' }}>
              <Select.Option value="Beijing">Beijing</Select.Option>
              <Select.Option value="Tianjin">Tianjin</Select.Option>
              <Select.Option value="Shanghai">Shanghai</Select.Option>
            </Select>
            <Input style={{ width: '75%' }} placeholder="Enter an address" />
          </Input.Group>
        </div>
        <div
          style={{
            marginRight: 24,
            width: 360,
            display: 'inline-block',
            marginBottom: 24,
          }}
        >
          <Input.Group compact>
            <Select defaultValue="Beijing" showSearch style={{ width: '25%' }}>
              <Select.Option value="Beijing">Beijing</Select.Option>
              <Select.Option value="Tianjin">Tianjin</Select.Option>
              <Select.Option value="Shanghai">Shanghai</Select.Option>
            </Select>
            <DatePicker style={{ width: '75%' }} />
          </Input.Group>
        </div>
        <div
          style={{
            marginRight: 24,
            width: 360,
            display: 'inline-block',
            marginBottom: 24,
          }}
        >
          <Input.Group compact>
            <Select defaultValue="Beijing" showSearch style={{ width: '25%' }}>
              <Select.Option value="Beijing">Beijing</Select.Option>
              <Select.Option value="Tianjin">Tianjin</Select.Option>
              <Select.Option value="Shanghai">Shanghai</Select.Option>
            </Select>
            <Input.Search placeholder="Search" style={{ width: '75%' }} />
          </Input.Group>
        </div>
      </Grid.Row>
      <Grid.Row>
        <div
          style={{
            marginRight: 24,
            width: 360,
            display: 'inline-block',
            marginBottom: 24,
          }}
        >
          <Input.Group>
            <Input style={{ width: '24%', marginRight: 8 }} value="010" readOnly />
            <Input style={{ width: '60%' }} placeholder="Phone number" />
          </Input.Group>
        </div>
        <div
          style={{
            marginRight: 24,
            width: 360,
            display: 'inline-block',
            marginBottom: 24,
          }}
        >
          <Input.Group>
            <Input style={{ width: '24%', marginRight: 8 }} value="010" readOnly />
            <IconMinus style={{ color: 'var(--color-text-1)' }} />
            <Input
              style={{ width: '60%', marginLeft: 8 }}
              defaultValue="8899887"
              placeholder="Phone number"
            />
          </Input.Group>
        </div>
      </Grid.Row>
    </div>
  );
};
```

## 字数统计

设置 `maxLength` 可以限制最大字数，配合 `showWordLimit` 可以显示字数统计。

设置 `maxLength.errorOnly` 后不会限制用户输入字数，但是超过最大字数会展示错误状态。

值得注意的是，如果配置了 `showWordLimit`，那么你将不能使用 `suffix`。

```jsx live
function App() {
  return (
    <Space direction="vertical">
      <Space align="start" size={24}>
        <Input
          maxLength={10}
          showWordLimit
          placeholder="Enter no more than 10 letters"
          style={{ width: 300 }}
        />
        <Input.TextArea
          maxLength={50}
          showWordLimit
          placeholder="Enter no more than 50 letters"
          wrapperStyle={{ width: 300 }}
        />
      </Space>

      <Space align="start" size={24}>
        <Input
          maxLength={{ length: 10, errorOnly: true }}
          showWordLimit
          defaultValue="More than 10 letters will be error"
          style={{ width: 300 }}
        />
        <Input.TextArea
          maxLength={{ length: 50, errorOnly: true }}
          showWordLimit
          placeholder="More than 50 letters will be error"
          wrapperStyle={{ width: 300 }}
        />
      </Space>

      <Input.TextArea
        maxLength={50}
        showWordLimit
        wordLimitPosition="outside"
        placeholder="Word count below the textarea"
        wrapperStyle={{ width: 300 }}
      />
    </Space>
  );
}
```

## 文本域

可以用于多行输入。

```jsx live
function Demo() {
  return (
    <Space wrap>
      <Input.TextArea placeholder="Enter something" style={{ minHeight: 64, width: 350 }} />
      <Input.TextArea defaultValue="Disabled" style={{ minHeight: 64, width: 350 }} disabled />
    </Space>
  );
};
```

## 适应文本高度文本域

指定 `autoSize`，文本域会自动根据输入的文本调整文本域的高度。如果指定`autoSize=&#123;&#123; minRows, maxRows }}`，也能指定最小行数和最大行数。

```jsx live
function Demo() {
  return (
    <Space wrap align="top">
      <Input.TextArea
        placeholder="Enter something"
        defaultValue="This is the contents of the textarea. "
        autoSize
        style={{ width: 350 }}
      />
      <Input.TextArea
        placeholder="Enter something"
        autoSize={{ minRows: 2, maxRows: 6 }}
        style={{ width: 350 }}
        defaultValue="This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea. "
      />
    </Space>
  );
};
```

## 密码输入

用于密码的输入。

```jsx live
function Demo() {
  return (
    <Space wrap>
      <Input.Password defaultValue="password" style={{ width: 350 }} />
      <Input.Password
        defaultValue="password"
        defaultVisibility={true}
        placeholder="Enter password"
        style={{ width: 350 }}
      />
    </Space>
  );
};
```

## 格式化输入值

在指定时机对用户输入的值进行格式化处理，前后值不一致时，会触发 onChange

```jsx live
function Demo() {
  return (
    <Space wrap size={20}>
      <div>
        <Typography.Paragraph>trim whitespace when out of focus：</Typography.Paragraph>
        <Input
          placeholder="Enter something"
          onChange={v => { console.log('current value: ', v); }}
          normalizeTrigger={['onBlur']}
          normalize={v => v ? v.trim() : v}
          style={{ width: 350 }}
        />
      </div>
      <div>

        <Typography.Paragraph>trim whitespace when press enter：</Typography.Paragraph>
        <Input
          placeholder="Enter something"
          onChange={v => { console.log('current value: ', v); }}
          normalize={v => v ? v.trim() : v}
          normalizeTrigger={['onPressEnter']}
          style={{ width: 350 }}
        />
      </div>
    </Space>
  );
};
```

## 宽度自适应

通过 `autoWidth` 属性可以设置 `Input` 的宽度跟随文字自适应

```jsx live
function Demo() {
  return (
    <div>
      <Divider>
        <Typography.Text code>{JSON.stringify({minWidth: 0, maxWidth: 500})}</Typography.Text>
      </Divider>

      <Input
        placeholder="Enter something"
        autoWidth={{ maxWidth: 500}}
      />

      <Divider>
        <Typography.Text code>{JSON.stringify({minWidth: 300, maxWidth: 500})}</Typography.Text>
      </Divider>

      <Input autoWidth={{minWidth: 300, maxWidth: 500}} placeholder="Enter something" />
      <br/><br/>
      <Input
        placeholder="Enter something"
        prefix="Prefix"
        autoWidth={{minWidth: 300, maxWidth: 500}}
      />
      <br/><br/>
      <Input
        placeholder="Enter something"
        addBefore="Before"
        prefix="Prefix"
        autoWidth={{minWidth: 300, maxWidth: 500}}
      />
      </div>
  );
};
```

## API

### Input

**Input 接受所有原生的属性值**

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|allowClear|允许清空输入框|boolean |`-`|-|
|disabled|是否禁用|boolean |`-`|-|
|error|是否是错误状态.(废弃，下个大版本移除，使用 status='error' 替代)|boolean |`-`|-|
|readOnly|是否只读|boolean |`-`|-|
|showWordLimit|配合 `maxLength`，显示字数统计|boolean |`-`|-|
|defaultValue|默认值|string |`-`|-|
|placeholder|输入框提示文字|string |`-`|-|
|value|输入框的值，受控模式|string |`-`|-|
|autoWidth|设置宽度自适应。minWidth 默认为 0，maxWidth 默认为 100%|\| boolean\| &#123; minWidth?: CSSProperties['minWidth']; maxWidth?: CSSProperties['maxWidth'] } |`-`|2.54.0|
|normalizeTrigger|指定 normalize 执行的时机|('onBlur' \| 'onPressEnter')[] |`['onBlur']`|2.50.0|
|size|输入框的尺寸|'mini' \| 'small' \| 'default' \| 'large' |`default`|-|
|status|状态|'error' \| 'warning' |`-`|2.45.0|
|addAfter|输入框后添加元素|ReactNode |`-`|-|
|addBefore|输入框前添加元素|ReactNode |`-`|-|
|clearIcon|`allowClear` 时配置清除按钮的图标。|ReactNode |`-`|2.50.0|
|prefix|添加前缀文字或者图标|ReactNode |`-`|-|
|suffix|添加后缀文字或者图标|ReactNode |`-`|-|
|afterStyle|输入框后添加元素的样式|object |`-`|-|
|beforeStyle|输入框前添加元素的样式|object |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|height|自定义输入框高度|number \| string |`-`|-|
|maxLength|输入框最大输入的长度；设置 `errorOnly`为 `true` 后，超过 `maxLength` 会展示 `error` 状态，并不限制用户输入。|number \| &#123; length: number; errorOnly?: boolean } |`-`|`errorOnly` in 2.23.0|
|style|节点样式|CSSProperties |`-`|-|
|normalize|在指定时机对用户输入的值进行格式化处理。前后值不一致时，会触发 onChange|(value: string) => string |`-`|2.50.0|
|onChange|输入时的回调|(value: string, e) => void |`-`|-|
|onClear|点击清除按钮的回调|() => void |`-`|-|
|onPressEnter|按下回车键的回调|(e) => void |`-`|-|

### Input.TextArea

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|allowClear|允许清空输入框|boolean |`-`|2.2.0|
|disabled|是否禁用|boolean |`-`|-|
|error|是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)|boolean |`-`|-|
|defaultValue|默认值|string |`-`|-|
|placeholder|输入框提示文字|string |`-`|-|
|value|值|string |`-`|-|
|status|状态|'error' \| 'warning' |`-`|2.45.0|
|clearIcon|`allowClear` 时配置清除按钮的图标。|ReactNode |`-`|2.50.0|
|autoSize|是否自动调整输入框的高度|boolean \| &#123; minRows?: number; maxRows?: number } |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|maxLength|输入框最大输入的长度；设置 `errorOnly`为 `true` 后，超过 `maxLength` 会展示 `error` 状态，并不限制用户输入。|number \| &#123; length: number; errorOnly?: boolean } |`-`|`errorOnly` in 2.23.0|
|style|节点样式|CSSProperties |`-`|-|
|wrapperStyle|开启字数统计之后，会在 `textarea` 标签外包一层 `div`，`wrapperStyle` 用来配置这个 `div` 的样式。|CSSProperties |`-`|-|
|wordLimitPosition|字数统计的位置|`'inside' \| 'outside'` |`inside`| 2.66.14 |
|onChange|输入时的回调|(value: string, e) => void |`-`|-|
|onClear|点击清除按钮的回调|() => void |`-`|2.2.0|
|onPressEnter|按下回车键的回调|(e) => void |`-`|-|

### Input.Group

|参数名|描述|类型|默认值|
|---|---|---|---|
|compact|是否使用紧凑模式|boolean |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### Input.Search

包含 Input 组件所有参数

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|loading|搜索时展示加载状态|boolean |`-`|2.6.0|
|searchButton|搜索按钮|boolean \| ReactNode |`-`|`ReactNode` in 2.6.0|
|onSearch|点击搜索按钮的回调|(value: string) => void |`-`|-|

### Input.Password

包含 Input 组件所有参数

|参数名|描述|类型|默认值|
|---|---|---|---|
|defaultVisibility|初始是否显示|boolean |`-`|
|visibility|是否显示|boolean |`-`|
|visibilityToggle|是否显示切换密码可见状态的按钮|boolean |`-`|
|onVisibilityChange|visibility 改变时触发|(visibility: boolean) => void |`-`|

## 方法

| 参数名 |     描述     |    类型    | 默认值 |
| ------ | :----------: | :--------: | -----: |
| focus  |   焦点事件   | `Function` |    `-` |
| blur   | 失去焦点事件 | `Function` |    `-` |

**示例**

```js
<Input ref={(ref) => (this.input = ref)} />;

this.input.focus();
this.input.blur();
```

