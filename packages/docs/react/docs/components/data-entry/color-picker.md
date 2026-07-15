---
sidebar_position: 1
---

# 颜色选择器 ColorPicker

用于选择和展示颜色

## 基础用法

基本使用方法。

```jsx live
function Demo() {
  return (
    <div>
      <ColorPicker defaultValue={'#165DFF'} />
      <div style={{ marginTop: 10 }}/>
      <ColorPicker defaultValue={'#165DFF'} showText />
    </div>
  );
};
```

## 受控模式

颜色选择器面板会在打开时同步输入框中的值。

```jsx live

function Demo() {
  const [value, setValue] = useState('#165DFF');

  return (
    <div>
      <div>
        <Button onClick={() => setValue('#165DFF')}>#165DFF</Button>
        <Button onClick={() => setValue('#165DFF88')}>#165DFF88</Button>
      </div>
      <div style={{ marginTop: 10 }}/>
      <ColorPicker value={value} onChange={(value)=>setValue(value)} showText />
    </div>
  );
};
```

## 尺寸

颜色选择器定义了四种尺寸（`mini`,`small`, `default`, `large`），分别为 24px，28px，32px，36px。

```jsx live
function Demo() {
  return (
    <div>
      <ColorPicker defaultValue={'#165DFF'} size={'mini'} />
      <div style={{ marginTop: 10 }}/>
      <ColorPicker defaultValue={'#165DFF'} size={'small'} />
      <div style={{ marginTop: 10 }}/>
      <ColorPicker defaultValue={'#165DFF'} size={'default'} />
      <div style={{ marginTop: 10 }}/>
      <ColorPicker defaultValue={'#165DFF'} size={'large'} />
    </div>
  );
};
```

## 禁用

设置 `disabled` 禁用整个选择器。

```jsx live
function Demo() {
  return (
    <div>
      <ColorPicker defaultValue={'#165DFF'} disabled />
      <div style={{ marginTop: 10 }}/>
      <ColorPicker defaultValue={'#165DFF'} showText disabled />
    </div>
  ) ;
};
```

## 禁用透明通道

设置 `disabledAlpha` 以隐藏 Alpha 值滑条和数值显示。

如果 `defaultValue` 传入的初始色值包含 Alpha，那么初次显示时，色块会保留传入的 Alpha。当用户在取色版上取色时，Alpha 将被重置并锁定为100。

```jsx live
function Demo() {
  return (
    <div>
      <ColorPicker defaultValue={'#165DFF'} disabledAlpha />
      <br />
      <ColorPicker defaultValue={'#165DFF80'} disabledAlpha />
    </div>
  ) ;
};
```

## 颜色格式

通过 `format` 设置颜色值的格式，支持 `hex` 和 `rgb`。

```jsx live

function Demo() {
  const [format, setFormat] = useState('hex')

  return (
    <div>
      <Radio.Group
        type="button"
        mode="fill"
        name="size"
        value={format}
        onChange={setFormat}
        style={{ marginBottom: 24 }}
      >
        {['hex', 'rgb'].map((x) => {
          return (
            <Radio key={x} value={x}>
              {x}
            </Radio>
          );
        })}
      </Radio.Group>
      <div style={{ marginTop: 10 }}/>
      <ColorPicker defaultValue={'#165DFF'} showText format={format} />
    </div>
  );
};
```

## 渐变色

通过 `mode` 设置颜色为单一颜色或渐变色。

```jsx live

function Demo() {
  const defaultValue = [
    {
      color: '#165DFFAA',
      percent: 0,
    },
    {
      color: '#00B42AFF',
      percent: 100,
    },
  ]
  return (
    <div>
      <ColorPicker defaultValue={defaultValue} mode={['single', 'gradient']} showText />
       <br />
      <ColorPicker defaultValue={defaultValue} mode="gradient" showText />
    </div>
  );
};
```

## 预设颜色和历史颜色

可以通过 `showPreset` 和 `showHistory` 开启预设颜色和历史颜色区域。历史颜色需要用户自行控制展示内容。

```jsx live

function Demo() {
  const [color, setColor] = useState('#165DFF')
  const [history, setHistory] = useState([]);

  const addHistory = (visible) => {
    if (!visible) {
      const newHistory = [...history.slice(-10), color];
      setHistory(newHistory)
    }
  }

  return (
    <div>
      <div>Preset: </div>
      <ColorPicker defaultValue={'#165DFF'} showPreset showText />
      <div style={{ marginTop: 10 }} />
      <div>History & Preset: </div>
      <ColorPicker value={color} historyColors={history} showPreset showHistory showText onChange={setColor}
                   onVisibleChange={addHistory} />
    </div>
  );
};
```

## 自定义触发器

可以自定义颜色选择器的触发元素，此时与颜色输入框相关的属性将会失效。

```jsx live

function Demo() {
  const [value, setValue] = useState('#165DFF');

  return (
    <div>
      <ColorPicker defaultValue={'#165DFF'} triggerElement={({ value }) => {
        return <Button>Open Color Picker: {value}</Button>
      }}>

      </ColorPicker>
    </div>
  );
};
```

## API
### ColorPicker

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|defaultPopupVisible|默认弹出框是打开还是关闭|boolean |`-`|-|
|disabled|禁用|boolean |`-`|-|
|disabledAlpha|禁用透明通道|boolean |`-`|-|
|popupVisible|弹出框是打开还是关闭。(受控)|boolean |`-`|-|
|showHistory|显示历史颜色|boolean |`-`|-|
|showPreset|显示预设颜色|boolean |`-`|-|
|showText|显示颜色值|boolean |`-`|-|
|unmountOnExit|隐藏后是否销毁 DOM 结构|boolean |`true`|-|
|format|颜色值的格式|'hex' \| 'rgb' |`-`|-|
|size|输入框的尺寸|InputProps['size'] |`default`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultValue|默认值|string \| GradientColor[] |`-`|-|
|historyColors|历史颜色的颜色数组|string[] |`-`|-|
|mode|单一颜色或渐变色模式|ColorPickerMode \| ColorPickerMode[] |`single`|-|
|presetColors|预设颜色的颜色数组|string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|triggerProps|可以接受所有 Trigger 组件的 Props|Partial&lt;TriggerProps&gt; |`-`|-|
|value|颜色值，受控模式|string \| GradientColor[] |`-`|-|
|onChange|颜色值改变时触发|(value: string \| GradientColor[]) => void |`-`|-|
|onVisibleChange|下拉框收起展开时触发。|(visible: boolean) => void |`-`|-|
|renderFooter|自定义面板底部内容|() => ReactNode |`-`|2.62.0|
|triggerElement|自定义触发元素。|ReactNode \| ((params: &#123; value: string \| GradientColor[] }) => ReactNode) |`-`|2.60.0|

### GradientColor

```js
export interface GradientColor {
  color: string;
  percent: number;
}
```

### ColorPickerMode

```js
export enum ColorPickerMode {
  Single = "single",
  Gradient = "gradient",
}
```

