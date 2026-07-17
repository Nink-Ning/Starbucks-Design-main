---
sidebar_position: 1
---

# 分页 Pagination

采用分页控制单页内的信息数量，也可进行页面跳转。

## 基础用法

最简单的用法。

```jsx live
function Demo() {
  return <Pagination total={200} />;
};
```

## 更多页码

页码数较大时，使用多页码的分页样式。

```jsx live
function Demo() {
  return <Pagination defaultCurrent={5} total={200} sizeCanChange />;
};
```

## 改变每页展示条目

可定义每页展示条目数量。

```jsx live
function Demo() {
  return <Pagination total={200} sizeCanChange />;
};
```

## 跳转

输入页码，可快速跳转到指定页。

```jsx live
function Demo() {
  return <Pagination total={200} showJumper />;
};
```

## 尺寸

通过指定 `size` 字段，可以使用不同尺寸的分页器。

```jsx live

function Demo() {
  const [size, setSize] = useState('default');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 32 }}>
      <Radio.Group
        value={size}
        options={['large', 'default', 'small', 'mini']}
        onChange={(value) => setSize(value)}
        type="button"
      />
      <Pagination size={size} total={50} showTotal showJumper sizeCanChange />
    </div>
  );
}
```

## 简洁

在空间有限的场景下，可以将 `simple` 设置为 `true`，使用较为简单的文本分页方式。

```jsx live
function Demo() {
  return <Pagination simple total={50} size="small" />;
};
```

## 展示总数

您可以通过设置 `showTotal` 来显示数据总数。

```jsx live
function Demo() {
  return (
    <div>
      <Pagination
        showTotal
        total={50}
        style={{
          marginBottom: 20,
        }}
      />
      <Pagination
        showTotal={(total, range) => <span>{`${range[0]} - ${range[1]} of ${total} items`}</span>}
        total={200}
      />
    </div>
  );
};
```

## 受控的数据总数

通过改变 `total` 的值，解决无法计算页码总数的情景。

```jsx live

function Demo() {
  const [current, setCurrent] = useState(1);
  const [showMore, setShowMore] = useState(true);
  const [total, setTotal] = useState(20);

  function handleChange(pageNum) {
    if (pageNum > 20) {
      setShowMore(false);
      setCurrent(pageNum);
      return;
    }

    setTotal(Math.max((pageNum + 1) * 10, total));
    setShowMore(true);
    setCurrent(pageNum);
  }

  return <Pagination current={current} total={total} onChange={handleChange} showMore={showMore} />;
}
```

## 全部展示

展示全部配置项。

```jsx live
function Demo() {
  return (
    <div>
      <Pagination
        showTotal
        total={200}
        showJumper
        sizeCanChange
        style={{ width: '100%', maxWidth: 800, marginBottom: 20 }}
      />
      <Pagination
        disabled
        showTotal
        total={200}
        showJumper
        sizeCanChange
        style={{ width: '100%', maxWidth: 800 }}
      />
    </div>
  );
};
```

## 样式定制

可以通过样式定制得到不同的视觉风格。

```jsx live
function Demo() {
  return (
    <div>
      <Pagination
        total={200}
        style={{ marginBottom: 20 }}
        pageItemStyle={{ background: 'var(--bg-color-container)', marginRight: 2 }}
        activePageItemStyle={{ background: 'var(--color-primary-light)' }}
      />
      <Pagination
        total={200}
        pageItemStyle={{ background: 'var(--bg-color-container)' }}
        activePageItemStyle={{ background: 'var(--color-primary-light)' }}
      />
    </div>
  );
};
```

## 上一步和下一步

设置 `itemRender`，可以自由定制分页按钮。

```jsx live
function Demo() {
  function itemRender(page, type, originElement) {
    if (type === 'prev') {
      return <a style={{ fontSize: 14, margin: '0 8px' }}>Prev</a>;
    }

    if (type === 'next') {
      return <a style={{ fontSize: 14, margin: '0 8px' }}>Next</a>;
    }

    return originElement;
  }

  return <Pagination itemRender={itemRender} total={200} />;
};
```

## 省略页码时展示长度

通过 `bufferSize` 可以设置 `current` 页与 `...` 之间的页码个数。

一个 `...` 至少代表省略 `2` 页。

```jsx live
function Demo() {
  return (
    <div>
      <Space direction="vertical" size="large">
        <Pagination sizeCanChange total={200} bufferSize={0} defaultCurrent={10} />
        <Pagination sizeCanChange total={200} bufferSize={1} defaultCurrent={10} />
        <Pagination sizeCanChange total={200} bufferSize={2} defaultCurrent={10} />
      </Space>
    </div>
  );
};
```

## API 

### Pagination

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|disabled|是否禁用|boolean |`-`|-|
|hideOnSinglePage|是否在只有一页的情况下隐藏|boolean |`-`|2.6.0|
|pageSizeChangeResetCurrent|`pageSize` 改变的时候重置当前页码为 `1`|boolean |`true`|-|
|showJumper|是否显示快速跳转到某页，在 `simple` 模式下默认为 true|boolean |`-`|-|
|showMore|是否显示更多页码提示（当尚无法计算数据总数时可以使用）|boolean |`-`|-|
|simple|是否应用精简分页模式|boolean |`-`|-|
|sizeCanChange|是否可以改变每页条数|boolean |`-`|-|
|bufferSize|`current` 页与 `...` 之间的页码个数|number |`2`|2.32.0|
|current|当前页|number |`-`|-|
|defaultCurrent|当前页默认值|number |`-`|-|
|defaultPageSize|默认每页数据条数|number |`-`|-|
|pageSize|每页数据条数|number |`-`|-|
|total|数据总数|number |`-`|-|
|itemRender|定制分页按钮的结构|(page: number,type: 'page' \| 'more' \| 'prev' \| 'next',originElement: ReactNode) => ReactNode |`-`|-|
|size|分页器尺寸|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|activePageItemStyle|被选中的分页按钮样式|CSSProperties |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|icons|设置分页器的图标|&#123;prev?: ReactNode;next?: ReactNode;more?: ReactNode;} |`-`|-|
|pageItemStyle|分页按钮样式|CSSProperties |`-`|-|
|selectProps|用于配置弹出框的属性|Partial&lt;SelectProps&gt; |`-`|-|
|sizeOptions|每页可以显示数据条数|number[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|onChange|变化时的回调|(pageNumber: number, pageSize: number) => void |`-`|-|
|onPageSizeChange|pageSize 变化时的回调|(size: number, current: number) => void |`-`|-|
|showTotal|是否显示数据总数|boolean \| ((total: number, range: number[]) => ReactNode) |`-`|-|
