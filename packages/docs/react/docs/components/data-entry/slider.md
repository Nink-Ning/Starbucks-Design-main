---
sidebar_position: 1
---

# 滑动输入条 Slider

滑动型输入器，展示当前值和可选范围。

## 基本用法

基本用法展示。

```jsx live

function App() {
  const [value, setValue] = useState(30);
  return <Slider value={value} onChange={setValue} style={{ width: 200 }} />;
}
```

## 基础状态

默认态、禁用态。

```jsx live
function App() {
  return (
    <Space size={60}>
      <Slider defaultValue={30} style={{ width: 200 }} />
      <Slider defaultValue={30} disabled={true} style={{ width: 200 }} />
    </Space>
  );
}
```

## 设置步长

传入 `step` 设置步长。 默认步长为 1。建议设置值能够被 `max-min` 整除，否则会出现可选最大值小于 `max` 的情况。当设置 `showTicks` 为 `true` 的时候，可显示 step 的刻度线。

```jsx live

function App() {
  const [step, setStep] = useState(1);
  const [showTicks, setShowTicks] = useState(true);
  return (
    <div style={{ maxWidth: '40%', minWidth: '20%' }}>
      <Space style={{ marginBottom: 20, lineHeight: '32px' }} size={20}>
        <div>
          <Typography.Text style={{ margin: '0 4px' }}>step</Typography.Text>
          <InputNumber
            value={step}
            min={1}
            max={10}
            onChange={setStep}
            style={{ width: 68 }}
          />
        </div>
        <div>
          <Typography.Text style={{ margin: '0 4px'}}>showTicks</Typography.Text>
          <Switch checked={showTicks} onChange={setShowTicks} />
        </div>
      </Space>
      <div>
        <Typography.Text>0</Typography.Text>
        <Slider
          defaultValue={5}
          max={10}
          step={step}
          showTicks={showTicks}
          style={{
            width: 258,
            marginLeft:8,
            marginRight: 8,
            verticalAlign: 'middle',
          }}
        />
        <Typography.Text>10</Typography.Text>
      </div>
    </div>
  );
}
```

## 范围选择

设置 `range = true` 即可开启范围选择，此时 `value` 为数组。

```jsx live

function App() {
  const [value, setValue] = useState([0, 50]);
  return (
    <div style={{ width: 200 }}>
      <Slider range value={value} onChange={setValue} />
    </div>
  );
}
```

## 多点选择

范围内多个点选择。(`2.61.0` 支持)

```jsx live

function App() {
  const [value, setValue] = useState([0, 20, 50]);
  return (
    <div style={{ width: 200 }}>
      <Slider range value={value} onChange={setValue} />
      <br/>
      <Typography.Text code>value: {JSON.stringify(value)}</Typography.Text>
    </div>
  );
}
```

## 显示输入框

当 `showInput` 为 true 时，将显示输入框。当设置 `onlyMarkValue` 为 `true` 或者范围内多点选择时，输入框始终不会显示。

当 `showInput` 传入 `InputNumberProps` 时，`min`、`max`、`step` 属性会以 `SliderProps` 为先。

**分段输入条设置的分段步长对 InputNumber 无效**

```jsx live
function App() {
  return (
    <>
      <Space size={60}>
        <Slider defaultValue={80} showInput style={{ width: 280 }} />
        <Slider defaultValue={[10, 80]} range showInput style={{ width: 360 }} />
      </Space>
      <Space style={{ marginTop: '20px' }} size={60}>
        <Slider
          defaultValue={80}
          showInput={{
            hideControl: false,
            style: {
              width: 80,
            },
          }}
          style={{ width: 280 }}
        />
        <Slider
          defaultValue={[10, 80]}
          showInput={{
            hideControl: false,
            style: {
              width: 80,
            },
          }}
          range
          style={{ width: 360 }}
        />
      </Space>
    </>
  );
}
```

## 添加标签文本

可以通过传入 `marks` 添加标签文本。当设置 `onlyMarkValue` 的时候，只可以选择节点值。此时`step`会被忽略。

```jsx live

class App extends React.Component {
  render() {
    return (
      <div style={{ width: 240 }}>
        <Slider
          defaultValue={5}
          max={15}
          marks={{
            0: '0km',
            5: '5km',
            10: '10km',
            15: '15km',
          }}
          style={{ marginBottom: 80 }}
        />
        <Slider
          onlyMarkValue
          defaultValue={10}
          max={15}
          marks={{
            0: '0km',
            5: '5km',
            10: '10km',
            15: '15km',
          }}
        />
      </div>
    );
  }
}
```

## 带有icon的滑动输入条

两边带有 icon 表示状态。

```jsx live

function App() {
  const [value, setValue] = useState(10);
  return (
    <Space size={60}>
      <Space>
        <img
          style={{ width: 22, verticalAlign: 'bottom' }}
          src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/48872c084d77494ebc0ddd0892d97e3d~tplv-uwbnlip3yd-image.image"
        />
        <Slider defaultValue={50} style={{ width: 200 }} />
        <img
          style={{ width: 22, verticalAlign: 'bottom' }}
          src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/40b91e0c13cb4069976ae726da62aa75~tplv-uwbnlip3yd-image.image"
        />
      </Space>
      <Space>
        <IconMute
          style={{
            fontSize: 16,
            color: value > 0 ? 'var(--color-text-4)' : 'var(--color-text-1)',
          }}
        />
        <Slider value={value} onChange={setValue} style={{ width: 200 }} />
        <IconSound
          style={{
            fontSize: 16,
            color: value === 0 ? 'var(--color-text-4)' : 'var(--color-text-1)',
          }}
        />
      </Space>
    </Space>
  );
}
```

## 竖直滑动条

设置 `vertical` 为 `true`，将会显示竖直的滑动条

```jsx live

function App() {
  const [value, setValue] = useState(10);
  return (
    <Space style={{ maxWidth: '60%', minWidth: '20%' }} size={100}>
      <div
        style={{
          width: 22,
          textAlign: 'center',
          display: 'inline-block',
        }}
      >
        <Slider value={value} onChange={setValue} vertical />
        {value ? <IconSound style={{ fontSize: 16, color: 'var(--color-text-1)' }} /> : null}
        {!value ? <IconMute style={{ fontSize: 16, color: 'var(--color-text-1)' }} /> : null}
      </div>
      <Slider
        range
        max={20}
        vertical
        defaultValue={[5, 10]}
        marks={{
          5: '5km',
          10: '10km',
        }}
        style={{ verticalAlign: 'top' }}
      />
    </Space>
  );
}
```

## 控制 tooltip 的展示

```jsx live
function App() {
  return (
    <Space size={60}>
      <Slider
        defaultValue={20}
        tooltipVisible={true}
        style={{ marginBottom: 80 }}
        onAfterChange={(value) => {
          console.log(value);
        }}
        style={{ width: 200, marginRight: 100 }}
      />
      <Slider
        range
        defaultValue={[0, 50]}
        tooltipVisible={true}
        onAfterChange={(value) => {
          console.log(value);
        }}
        style={{ width: 200 }}
      />
    </Space>
  );
}
```

## 自定义提示

使用 `formatterTooltip` 可以格式化 Tooltip 的内容。

```jsx live
function App() {
  function formatTooltip(val) {
    return <span>{val}%</span>;
  }

  return (
    <div style={{ width: 200 }}>
      <Slider defaultValue={20} formatTooltip={formatTooltip} />
    </div>
  );
}
```

## 范围刻度可拖拽

通过设置 `range.draggableBar` 为 `true`, 让范围刻度可以拖拽。

```jsx live
function App() {
  return (
    <Slider
      style={{ width: 200 }}
      max={10}
      range={{
        draggableBar: true,
      }}
      defaultValue={[3, 6]}
    />
  );
}
```

## 设置范围

通过 `min` 和 `max` 设置可选范围。

```jsx live

function App() {
  const [value, setValue] = useState(30);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  return (
    <Space size={16}>
      <InputNumber
        value={min}
        onChange={(val) => setMin(val)}
        style={{ width: 78 }}
      />
      <Slider
        value={value}
        min={min}
        max={max}
        onChange={(val) => setValue(val)}
        style={{ width: 200 }}
      />
      <InputNumber
        value={max}
        onChange={(val) => setMax(val)}
        style={{ width: 78 }}
      />
    </Space>
  );
}
```

## 反向

设置 `reverse=&#123;true}` ，可以交换滑动条的起点和终点。

```jsx live

function App() {
  const [reverse, setReverse] = useState(true);
  return (
    <>
      <Space style={{ marginBottom: 24 }} size={4}>
        <Switch checked={reverse} onChange={setReverse} />
        <Typography.Text>Reversed</Typography.Text>
      </Space>
      <div>
        <Slider
          reverse={reverse}
          showTicks
          max={15}
          defaultValue={10}
          marks={{
            0: '0km',
            5: '5km',
            10: '10km',
            15: '15km',
          }}
          style={{ width: 200 }}
        />
      </div>
    </>
  );
}
```

## 分段输入条

在设置了 `marks` 后，实际上将 `Slider` 分成了多个区间，可以传入 `getIntervalConfig` 对每个区间的宽度和步长进行设置。

**注意：会优先将空间分配给传入了 `width`的区间, 剩下的将会按照区间长度分配剩余的空间。**

```jsx live

function App() {
  const defaultConfig = {
    showTicks: false,
    showInput: false,
    onlyMarkValue: false,
    reverse: false,
  };
  const marks = {
    0: '0km',
    10: '10km',
    20: '20km',
    30: '30km',
    50: '50km',
  };

  const [config, setConfig] = useState(defaultConfig);
  return (
    <div style={{ width: 600 }}>
      <Form
        style={{ margin: '20px' }}
        layout="inline"
        onValuesChange={(_, values) => {
          setConfig(values);
        }}
      >
        {Object.keys(defaultConfig).map((key) => (
          <Form.Item
            label={key}
            field={key}
            triggerPropName="checked"
            key={key}
            initialValue={config[key]}
          >
            <Switch />
          </Form.Item>
        ))}
      </Form>

      <div style={{ marginBottom: 20 }}>
        <Typography.Text bold>分段区间-滑动输入条</Typography.Text>
        <Slider
          {...config}
          max={50}
          defaultValue={10}
          marks={marks}
          getIntervalConfig={([begin, end]) => {
            const interval = `${begin}~${end}`;

            switch (interval) {
              case `0~10`: {
                return {
                  width: '50%',
                };
              }

              default:
                return {
                  step: (end - begin) / 5,
                };
            }
          }}
        />
      </div>
      <Typography.Text bold>未分段-滑动输入条</Typography.Text>
      <Slider {...config} max={50} defaultValue={10} marks={marks} />
    </div>
  );
}
```

## API

### Slider

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|disabled|是否禁用|boolean |`-`|-|
|onlyMarkValue|只能选择标签值，此时step将会被忽略|boolean |`-`|-|
|reverse|反向坐标轴, `rtl` 场景默认为 `true`|boolean |`-`|-|
|showTicks|是否显示步长刻度线|boolean |`-`|-|
|tooltipVisible|控制 tooltip 的展示。设置为 `true` 时，将一直展示 tooltip。设置为 `false` 时，将一直隐藏 tooltip。|boolean |`-`|-|
|vertical|是否竖直方向|boolean |`-`|-|
|max|滑动范围最大值|number |`100`|-|
|min|滑动范围最小值|number |`0`|-|
|step|步长|number |`1`|-|
|tooltipPosition|tooltip 的位置|\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb' |`-`|-|
|formatTooltip|格式化 `tooltip` 内容|(value: number) => string \| ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultValue|默认值|number \| number[] |`-`|-|
|marks|标签。是一个对象。key 为在[min, max]内的整数。|Record&lt;number, ReactNode&gt; |`-`|-|
|range|是否是范围选择|boolean \| &#123; draggableBar: boolean } |`-`|2.14.0|
|showInput|是否展示输入框，`onlyMarkValue` 为 `true` 或范围内多点选择时输入框始终隐藏。可接受 `InputNumber` 的 `props`。|boolean \| InputNumberProps \| InputNumberProps[] |`-`|`InputNumberProps` in `2.32.0`|
|style|节点样式|CSSProperties |`-`|-|
|value|值|number \| number[] |`-`|-|
|getIntervalConfig|针对区间配置，返回区间步长和相对于整个滑动轴的宽度比例(如 0.5 或 "50%")。**只在`marks`场景下生效**|(range: number[],index: number) => &#123; step?: number; width?: number \| string } |`-`|2.30.0|
|getTooltipContainer|设置 `tooltip` 所插入的父元素|() => Element |`-`|-|
|onAfterChange|触发时机在 `mouseup`，参数是当前值|(val: number \| number[]) => void |`-`|2.20.0|
|onChange|选择值变化时触发|(val: number \| number[]) => void |`-`|-|

