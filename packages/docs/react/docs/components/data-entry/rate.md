---
sidebar_position: 1
---

# 评分 Rate

评分打星组件。

## 基础用法

基础评分。

```jsx live
function Demo() {
  return <Rate />;
};
```

## 半选

指定 `allowHalf` 来支持半选。

```jsx live
function Demo() {
  return <Rate allowHalf defaultValue={2.5} />;
};
```

## 附有文案

含有文案的评分组件。

```jsx live

function App() {
  const [rate, setRate] = useState(5);
  const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Excellent'];
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Rate value={rate} onChange={(value) => setRate(value)} />
      <Typography.Text
        style={{
          margin: '0 16px',
        }}
      >
        {desc[rate - 1]}
      </Typography.Text>
    </div>
  );
}
```

## 只读

通过 `readonly` 指定 `Rate` 为只读。

```jsx live
function Demo() {
  return <Rate readonly defaultValue={3.5} allowHalf />;
};
```

## 支持清除

指定 `allowClear` 来允许清除评分。

```jsx live
function Demo() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 15,
        }}
      >
        <Rate defaultValue={5} allowClear />
        <Typography.Text style={{ margin: '0 16px' }}>allowClear: true</Typography.Text>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Rate defaultValue={5} />
        <Typography.Text style={{ margin: '0 16px' }}>allowClear: false</Typography.Text>
      </div>
    </>
  );
};
```

## 其他评分字符

可以将星星替换为其他字符，比如表情、字母，数字，字体图标甚至中文。

```jsx live

function Demo() {
  function TextWrapper(props) {
    return (
      <div
        style={{
          width: 24,
          lineHeight: '24px',
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        {props.text}
      </div>
    );
  }

  return (
    <div>
      <Rate
        style={{ display: 'block', margin: '10px 0' }}
        defaultValue={3}
        character={<TextWrapper text="A" />}
      />
      <Rate
        style={{ display: 'block', margin: '10px 0' }}
        defaultValue={3}
        character={(index) => <TextWrapper text={index + 1} />}
      />
      <Rate
        style={{ display: 'block', margin: '10px 0' }}
        defaultValue={2.5}
        allowHalf
        character={<TextWrapper text="好" />}
      />
      <Rate
        style={{ display: 'block', margin: '10px 0' }}
        defaultValue={2.5}
        allowHalf
        character={
          <TextWrapper
            text={
              <IconHeartFill
                style={{
                  fontSize: 18,
                }}
              />
            }
          />
        }
      />
    </div>
  );
};
```

## 任意长度的评分

通过指定 `count` 来打造任意长度的评分组件。

```jsx live
function Demo() {
  return <Rate count={10} allowHalf />;
};
```

## 笑脸分级

通过 `grading` 指定使用笑脸分级。

```jsx live
function Demo() {
  return (
    <div>
      <Rate grading />
    </div>
  );
};
```

## 显示提示信息

通过 `tooltips` 来为每一个评级提供鼠标悬浮时的提示信息。

```jsx live
function Demo() {
  return (
    <div>
      <Rate tooltips={['😠', '🙂', '😊', '😘', '😍']} />
    </div>
  );
};
```

## API

### Rate

|参数名|描述|类型|默认值|
|---|---|---|---|
|allowClear|是否允许清除|boolean |`-`|
|allowHalf|是否允许半选|boolean |`-`|
|disabled|是否禁用|boolean |`-`|
|grading|笑脸分级|boolean |`-`|
|readonly|是否只读，不能选择|boolean |`-`|
|count|星的总数|number |`5`|
|defaultValue|默认值|number |`-`|
|value|星的个数，受控值|number |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|tooltips|自定义每一项的提示信息|string[] |`-`|
|character|自定义字符|ReactNode \| ((index: number) => ReactNode) |`&lt;IconStarFill />`|
|onChange|选择时的回调|(value: number) => void |`-`|
|onHoverChange|鼠标经过时数值变化的回调|(value: number) => void |`-`|

