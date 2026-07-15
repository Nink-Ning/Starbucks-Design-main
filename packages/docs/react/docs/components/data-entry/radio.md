---
sidebar_position: 1
---

# 单选框 Radio

在一组相关且互斥数据中，用户仅能选择一个选项。

## 基础用法

基础单选框。

```jsx live
function Demo() {
  return (
    <Space size={40}>
      <Radio>Radio</Radio>
      <Radio checked disabled>
        Disabled Radio
      </Radio>
    </Space>
  );
};
```

## 单选框组

单选组的用法。有两种用法，可以通过 `children` 的方式或者 `options` 数组的方式。

```jsx live
function Demo() {
  return (
    <div>
      <Radio.Group defaultValue="a" style={{ marginBottom: 20 }}>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio disabled value="d">
          D
        </Radio>
      </Radio.Group>
      <br />
      <Radio.Group options={['A', 'B', 'C', 'D']} style={{ marginBottom: 20 }} />
      <br />
      <Radio.Group
        options={[
          {
            label: 'A',
            value: 'a',
          },
          {
            label: 'B',
            value: 'b',
          },
          {
            label: 'C',
            value: 'c',
          },
          {
            label: 'D',
            value: 'd',
            disabled: true,
          },
        ]}
      />
    </div>
  );
};
```

## 竖直单选组

设置 `direction="vertical"` 可以展示竖直的单选组。

```jsx live
function Demo() {
  return (
    <div>
      <Radio.Group direction="vertical" defaultValue="a">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio disabled value="d">
          D
        </Radio>
      </Radio.Group>
    </div>
  );
};
```

## 带图标的单选框

单选框可以与图标进行组合。

```jsx live

function Demo() {
  const imgStyle = {
    width: 30,
    height: 30,
    verticalAlign: 'middle',
  };

  return (
    <div>
      <Radio.Group>
        <Radio value="BCY">
          <img
            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c621ef94232e4b91917c7d2e5d9eae00~tplv-uwbnlip3yd-image.image"
            style={imgStyle}
          />
          BCY
        </Radio>
        <Radio value="pipidance">
          <img
            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cb76fb049c3c44128b26f02902a0373b~tplv-uwbnlip3yd-image.image"
            style={imgStyle}
          />
          Pipidance
        </Radio>
        <Radio disabled value="xigua">
          <img
            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/74fb860e37aa4840a8eb235e6df6e6e0~tplv-uwbnlip3yd-image.image"
            style={imgStyle}
          />
          Xigua Video
        </Radio>
      </Radio.Group>
    </div>
  );
};
```

## 按钮类型

指定 `type=button`，单选框会展示为按钮样式。

```jsx live
function Demo() {
  const options = ['选项', '选项', '选项', '选项', '选项', '选项'];

  const renderGroup = (className) => (
    <Radio.Group
      className={className}
      type="button"
      defaultValue="2"
    >
      {options.map((label, index) => (
        <Radio key={index} value={`${index}`} disabled={index === 4}>
          {label}
        </Radio>
      ))}
    </Radio.Group>
  );

  return (
    <Space direction="vertical" size="large">
      {renderGroup('starbucks-radio-button-outline')}
      {renderGroup('starbucks-radio-button-primary-filled')}
      {renderGroup('starbucks-radio-button-default-filled')}
    </Space>
  );
};
```

## 不同尺寸

按钮类型的单选框分为 4 个尺寸，分别为 `mini`, `small`, `default`, `large`。

```jsx live

function Demo() {
  const options = [
    {
      value: 'Beijing',
      label: 'Beijing',
    },
    {
      value: 'Shanghai',
      label: 'Shanghai',
    },
    {
      value: 'Guangzhou',
      label: 'Guangzhou',
      disabled: true,
    },
    {
      value: 'Shenzhen',
      label: 'Shenzhen',
    },
  ];

  return (
    <div>
      <Radio.Group
        options={options}
        size="mini"
        type="button"
        defaultValue="Beijing"
        style={{ marginBottom: 20 }}
      />
      <br />
      <Radio.Group
        options={options}
        size="small"
        type="button"
        defaultValue="Beijing"
        style={{ marginBottom: 20 }}
      />
      <br />
      <Radio.Group
        options={options}
        size="default"
        type="button"
        defaultValue="Beijing"
        style={{ marginBottom: 20 }}
      />
      <br />
      <Radio.Group
        options={options}
        size="large"
        type="button"
        defaultValue="Beijing"
        style={{ marginBottom: 20 }}
      />
    </div>
  );
};
```

## 自定义节点内容

可以通过传入函数类型的 `children` 来自定义渲染单选节点。(`2.29.0`)

```jsx live
function Demo() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Radio.Group defaultValue={'Beijing'} name="button-radio-group">
          {['Beijing', 'Shanghai', 'Guangzhou'].map((item) => {
            return (
              <Radio key={item} value={item}>
                {({ checked }) => {
                  return (
                    <Button tabIndex={-1} key={item} shape="round" type={checked ? 'primary' : 'default'}>
                      {item}
                    </Button>
                  );
                }}
              </Radio>
            );
          })}
        </Radio.Group>
      </div>
      <Radio.Group name="card-radio-group">
        {[1, 2].map((item) => {
          return (
            <Radio key={item} value={item}>
              {({ checked }) => {
                return (
                  <Space
                    align="start"
                    className={`custom-radio-card ${checked ? 'custom-radio-card-checked' : ''}`}
                  >
                    <div className="custom-radio-card-mask">
                      <div className="custom-radio-card-mask-dot"></div>
                    </div>
                    <div>
                      <div className="custom-radio-card-title">Radio Card {item}</div>
                      <Typography.Text type="secondary">this is a text</Typography.Text>
                    </div>
                  </Space>
                );
              }}
            </Radio>
          );
        })}
      </Radio.Group>
    </div>
  );
};
```

## API

### Radio

|参数名|描述|类型|默认值|
|---|---|---|---|
|checked|是否选中（受控模式）|boolean |`-`|
|defaultChecked|初始是否选中|boolean |`-`|
|disabled|是否禁用|boolean |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|value|控件的 `value`|T |`-`|
|onChange|值变化的回调|(checked: boolean, event: ChangeEvent) => void |`-`|

### Radio.Group

|参数名|描述|类型|默认值|
|---|---|---|---|
|disabled|禁用|boolean |`-`|
|name|`Radio` 的 name|string |`-`|
|direction|方向|'vertical' \| 'horizontal' |`horizontal`|
|size|按钮类型的单选框尺寸（只在按钮类型下生效）|'small' \| 'default' \| 'large' \| 'mini' |`-`|
|type|单选的类型，是单选还是按钮|'radio' \| 'button' |`radio`|
|className|节点类名|string \| string[] |`-`|
|defaultValue|默认选中的值|any |`-`|
|options|以数组配置的形式来设置单选组|(string \| number \| &#123; label: ReactNode; value: any; disabled?: boolean })[] |`-`|
|style|节点样式|CSSProperties |`-`|
|value|选中的值（受控模式）|any |`-`|
|onChange|点击单选的回调|(value: any, event: ChangeEvent) => void |`-`|
