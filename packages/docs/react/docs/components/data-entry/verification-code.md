---
sidebar_position: 1
---

# 验证码输入 VerificationCode

验证码输入组件，`2.55.0` 支持

## 基本用法

基本用法

```jsx live
function Demo() {
  return <VerificationCode
    style={{width: 300}}
    onChange={v => {
      console.log(v)
    }}
    onFinish={v => {
      Message.info('onFinish: ' + v)
    }}
  />;
};
```

## 不同状态

禁用状态、错误状态

```jsx live
function Demo() {
  return (
    <div>
      <Space>
        <div style={{width: 80}}>
          <Typography.Text >Disabled</Typography.Text>
        </div>
        <VerificationCode defaultValue={'123456'} disabled style={{width: 300}}/>
      </Space>
      <br/>
      <br/>
      <Space>
        <div style={{width: 80}}>
          <Typography.Text>ReadOnly</Typography.Text>
        </div>
        <VerificationCode defaultValue={'123456'} readOnly style={{width: 300}}/>
      </Space>
      <br/>
      <br/>
      <Space>
        <div style={{width: 80}}>
          <Typography.Text>Error</Typography.Text>
        </div>
        <VerificationCode status="error" style={{width: 300}}/>
      </Space>
    </div>
  );
};
```

## 密码模式

指定 `masked = true`，可开启密码模式

```jsx live
function Demo() {
  return (
    <div>
      <VerificationCode
        defaultValue="123"
        masked
        style={{ width: 300 }}
        onChange={(v) => {
          console.log(v);
        }}
        onFinish={(v) => {
          Message.info('onFinish: ' + v);
        }}
      />
    </div>
  );
};
```

## 自定义分隔符

指定 `separator` 可以自定义渲染分隔符

```jsx live
function Demo() {
  return (
    <VerificationCode style={{width: 400}} length={9}  separator={({ index, character }) => {
    return ((index + 1) % 3 || index > 7 )? null : '-'
  }}     />
  );
};
```

## 配合表单使用

配合表单使用实现校验

```jsx live
function Demo() {
  return (
    <div className="demo-verify-code-wrapper">
      <Typography.Title heading={5}>Verification Code</Typography.Title>
      <Form wrapperCol={{ span: 24 }}>
        <Form.Item
          field="code"
          rules={[
            {
              validator: (v, cb) => {
                return v !== '123456' ? cb('must be 123456') : cb();
              },
            },
          ]}
          validateTrigger={['onFinish']}
        >
          <VerificationCode size="large" validate={({inputValue}) => /\d/.test(inputValue)} />
        </Form.Item>
        <Button type="primary" size="large" htmlType="submit" style={{marginTop: 20}}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
```

## 校验与格式化输入

通过 validate 校验输入。此外，可以返回非布尔类型来将用户输入的字符串为特定的格式。

```jsx live
function Demo() {

  return (
    <div>
      <div style={{width: 200}}>
        <Typography.Paragraph>Only numbers can be entered: </Typography.Paragraph>
      </div>
      <VerificationCode
        style={{ width: 300 }}
        defaultValue="123456"
        validate={({ inputValue }) => {
          return /^\d*$/.test(inputValue) ? inputValue : false;
        }}
      />
      <br />
      <br />

      <div style={{width: 200}}>
        <Typography.Paragraph>Only `a-z` can be entered: </Typography.Paragraph>
      </div>

      <VerificationCode
        style={{ width: 300 }}
        defaultValue="abcdef"
        validate={({ inputValue }) => {
          return /^[a-zA-Z]*$/.test(inputValue) ? inputValue.toLowerCase() : false;
        }}
        />

    </div>
  );
};
```

## useVerificationCode

通过 useVerificationCode 自定义验证码组件

```jsx live

function Demo() {

  const inputRefList = React.useRef([]);

  const { filledValue, getInputProps } = useVerificationCode({
    getInputRefList: () => inputRefList.current || [],
    onFinish: (value) => {
      console.log(value);
    },
    onChange: (value) => {
      console.log(value);
    }
  });

  return (
    <div>
       <Space size="large">
        {filledValue.map((v, index) => {
          const inputProps = { ...getInputProps(index) };
          return (
            <input
              className="custom-code-input"
              ref={(node) => {
                inputRefList.current[index] = node;
              }}
              {...inputProps}
              onChange={(e) => {
                inputProps.onChange?.(e.target.value);
              }}
            />
          );
        })}
      </Space>
    </div>
  );
};
```

## API

### VerificationCode

`2.55.0` 支持

|参数名|描述|类型|默认值|
|---|---|---|---|
|disabled|禁用|boolean |`-`|
|masked|是否是密码模式|boolean |`-`|
|readOnly|只读|boolean |`-`|
|length|验证码的长度，根据长度渲染对应个数的输入框|number |`6`|
|defaultValue|默认值|string |`-`|
|value|验证码输入框的值，受控模式|string |`-`|
|size|尺寸|InputProps['size'] |`-`|
|status|状态|'error' |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|onChange|输入值改变时触发的回调|(value: string) => void |`-`|
|onFinish|输入框都被填充后触发的回调|(value: string) => void |`-`|
|separator|分隔符。可在不同索引的输入框后自定义渲染分隔符|(data: &#123; index: number; character: string }) => ReactNode |`-`|
|validate|校验函数，用户输入值改变时触发|(data: &#123; inputValue: string; value: string; index: number }) => boolean \| string |`-`|

