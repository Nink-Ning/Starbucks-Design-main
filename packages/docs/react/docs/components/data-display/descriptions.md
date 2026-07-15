---
sidebar_position: 1
---

# 描述列表 Descriptions

一般用于详情页的信息展示。

## 基本用法

简单地成组展示多个只读字段，一般用于详情页的信息。

```jsx live
function Demo() {
  const data = [
    {
      label: 'Name',
      value: 'Socrates',
    },
    {
      label: 'Mobile',
      value: '123-1234-1234',
    },
    {
      label: 'Residence',
      value: 'Beijing',
    },
    {
      label: 'Hometown',
      value: 'Beijing',
    },
    {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing',
    },
  ];

  return <Descriptions colon=" :" layout="inline-horizontal" title="User Info" data={data} />;
};
```

## 单列样式

单列的描述列表样式。

```jsx live
function Demo() {
  const data = [
    {
      label: 'Name',
      value: 'Socrates',
    },
    {
      label: 'Mobile',
      value: '123-1234-1234',
    },
    {
      label: 'Residence',
      value: 'Beijing',
    },
    {
      label: 'Hometown',
      value: 'Beijing',
    },
    {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing',
    },
  ];

  return (
    <div>
      <Descriptions
        column={1}
        title="User Info"
        data={data}
        style={{ marginBottom: 20 }}
        labelStyle={{ paddingRight: 36 }}
      />
      <Descriptions
        column={1}
        title="User Info"
        data={data}
        labelStyle={{ textAlign: 'right', paddingRight: 36 }}
      />
    </div>
  );
};
```

## 标签文本对齐

标签文本可以设置左对齐右对齐，也可以设置垂直的排列方式。

```jsx live
function Demo() {
  const data = [
    {
      label: 'Name',
      value: 'Socrates',
    },
    {
      label: 'Mobile',
      value: '123-1234-1234',
    },
    {
      label: 'Residence',
      value: 'Beijing',
    },
    {
      label: 'Hometown',
      value: 'Beijing',
    },
    {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing',
    },
  ];

  return (
    <div>
      <Descriptions
        colon=" :"
        title="User Info"
        data={data}
        labelStyle={{ textAlign: 'right' }}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="User Info" data={data} layout="inline-vertical" />
    </div>
  );
};
```

## 带边框展示

带边框和背景颜色的列表。

```jsx live
function Demo() {
  const data = [
    {
      label: 'Name',
      value: 'Socrates',
    },
    {
      label: 'Mobile',
      value: '123-1234-1234',
    },
    {
      label: 'Residence',
      value: 'Beijing',
    },
    {
      label: 'Hometown',
      value: 'Beijing',
    },
    {
      label: 'Date of Birth',
      value: '2020-05-15',
      span: 2,
    },
    {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing',
    },
  ];

  return <Descriptions border data={data} />;
};
```

## 不同排列模式

有水平排列、垂直排列、行内水平排列、行内垂直排列四种排列模式。

```jsx live
function Demo() {
  const data = [
    {
      label: 'Name',
      value: 'Socrates',
    },
    {
      label: 'Mobile',
      value: '123-1234-1234',
    },
    {
      label: 'Residence',
      value: 'Beijing',
    },
    {
      label: 'Hometown',
      value: 'Beijing',
    },
    {
      label: 'Date of Birth',
      value: '2020-05-15',
      span: 2,
    },
    {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing',
    },
  ];
  const data2 = [
    {
      label: 'Name',
      value: 'Socrates',
    },
    {
      label: 'Hometown',
      value: 'Beijing',
    },
    {
      label: 'Mobile',
      value: '123-1234-1234',
    },
    {
      label: 'Date of Birth',
      value: '2020-05-15',
    },
    {
      label: 'Residence',
      value: 'Beijing',
    },
    {
      label: 'Gender',
      value: 'Male',
    },
    {
      label: 'Ethnicity',
      value: 'Han',
    },
    {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing',
    },
  ];

  return (
    <div>
      <Descriptions
        title="Inline Horizontal"
        colon=":"
        data={data.slice(0, 5)}
        layout="inline-horizontal"
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        title="Horizontal"
        data={data}
        layout="horizontal"
        border
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        title="Vertical"
        data={data2}
        layout="vertical"
        border
        column={5}
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        title="Inline Vertical"
        data={data2}
        layout="inline-vertical"
        border
        column={5}
      />
    </div>
  );
};
```

## 不同尺寸

展示不同尺寸下的描述列表。

```jsx live
function App() {

  const data = [
    {
      label: 'Name',
      value: 'Socrates',
    },
    {
      label: 'Mobile',
      value: '123-1234-1234',
    },
    {
      label: 'Residence',
      value: 'Beijing',
    },
    {
      label: 'Hometown',
      value: 'Beijing',
    },
    {
      label: 'Date of Birth',
      value: '2020-05-15',
      span: 2,
    },
    {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing',
    },
  ];

  const [size, setSize] = useState('default');
  return (
    <div>
      <Radio.Group
        value={size}
        options={['mini', 'small', 'medium', 'default', 'large']}
        onChange={(value) => setSize(value)}
        type="button"
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        border
        title="User Info"
        data={data}
        size={size}
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        column={1}
        title="User Info"
        data={data}
        size={size}
        labelStyle={{ paddingRight: 40 }}
      />
    </div>
  );
}
```

## 响应式排列

支持响应式排列。

```jsx live
function Demo() {
  const data = [
    {
      label: 'Name',
      value: 'Socrates',
    },
    {
      label: 'Mobile',
      value: '123-1234-1234',
    },
    {
      label: 'Residence',
      value: 'Beijing',
    },
    {
      label: 'Hometown',
      value: 'Beijing',
    },
    {
      label: 'Date of Birth',
      value: '2020-05-15',
      span: 2,
    },
    {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing',
    },
  ];

  return (
    <Descriptions
      title="Responsive"
      data={data}
      border
      column={{
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4,
      }}
    />
  );
};
```

## API

### Descriptions

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|border|是否显示边框|boolean |`-`|-|
|layout|排列方式|'horizontal' \| 'vertical' \| 'inline-horizontal' \| 'inline-vertical' |`horizontal`|-|
|size|描述列表的尺寸，如不指定默认为 `default`|'mini' \| 'small' \| 'medium' \| 'default' \| 'large' |`-`|-|
|tableLayout|描述中表格样式的 `layout-fixed`，当设置成 `fixed` 时，宽度会均分。|'auto' \| 'fixed' |`auto`|2.6.0|
|colon|标签文字后显示的内容，一般配置为 ` :`|ReactNode |`-`|-|
|title|标题|ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|column|一行放置几列数据，一个数据为一列。支持配置 `column` 为数字或者对象，配置对象格式时，支持配置为 `&#123; xs: 1, md: 2, lg: 3 }` 这种形式来支持响应式排列|\| number\| &#123;xs?: number;sm?: number;md?: number;lg?: number;xl?: number;xxl?: number;xxxl?: number;} |`3`|-|
|data|描述列表的数据|DataType |`-`|-|
|labelStyle|显示标签的单元格的样式|CSSProperties |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|valueStyle|显示值的单元格的样式|CSSProperties |`-`|-|

### DataType

```js
export type DataType = {
  key?: React.Key;
  label?: ReactNode;
  value?: ReactNode;
  span?: number;
}[];
```

