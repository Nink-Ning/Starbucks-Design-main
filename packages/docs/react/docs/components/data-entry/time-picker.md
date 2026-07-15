---
sidebar_position: 1
---

# 时间选择器 TimePicker

在弹出面板上选择时间，以便捷完成时间输入的控件。

## 基础用法

时间输入器的基础用法。

```jsx live
function Demo() {
  return (
    <TimePicker style={{ width: 194 }} />
  );
};
```

## 不同状态

不同状态的时间输入器

```jsx live
function Demo() {
  return (
    <div>
    <Space wrap>
      <TimePicker status="error" placeholder="error status" style={{ width: 200 }}/>
      <TimePicker.RangePicker status="error"  placeholder={["error status", "error status"]}  style={{ width: 250 }}/>
    </Space>
    <br/>
    <Space wrap>
      <TimePicker status="warning"  placeholder="warning status"  style={{ width: 200 }}/>
      <TimePicker.RangePicker status="warning"  placeholder={["warning status", "warning status"]}  style={{ width: 250 }}/>
    </Space>
    </div>
  );
};
```

## 受控组件

`value` 和 `onChange` 需要配合使用。

```jsx live

function App() {
  const [value, setValue] = useState();
  return (
    <TimePicker
      style={{ width: 194 }}
      value={value}
      onChange={(valueString) => setValue(valueString)}
    />
  );
}
```

## 带有前缀

通过 `prefix` 属性设置前缀

```jsx live
function Demo() {
  return (
    <Space>
      <TimePicker prefix={<IconInfoCircle/>} style={{ width: 200, }} />
      <TimePicker.RangePicker prefix={<IconInfoCircle/>} style={{ width: 250, }} />
    </Space>
  );
};
```

## 尺寸

有四种尺寸可供选择。

```jsx live

function App() {
  const [size, setSize] = useState('default');
  return (
    <div>
      <Radio.Group
        value={size}
        options={['large', 'default', 'small', 'mini']}
        onChange={(value) => setSize(value)}
        type="button"
        style={{ marginBottom: 24, }}
      />
      <br />
      <TimePicker
        style={{ width: 194, }}
        size={size}
        placeholder="请选择时间"
      />
    </div>
  );
}
```

## 禁用

禁用状态。

```jsx live
function Demo() {
  return (
    <div>
      <TimePicker
        disabled
        style={{ margin: '0 24px 24px 0', }} />
      <TimePicker.RangePicker
        disabled
        style={{ width: 252, margin: '0 24px 24px 0', }}
      />
    </div>
  );
};
```

## 定制时分

通过设置 `format`，可以定制需要显示的时、分、秒。

```jsx live

function Demo() {
  return (
    <TimePicker
      format="HH:mm"
      defaultValue={dayjs('09:24', 'HH:mm')}
      style={{ width: 130, }}
    />
  );
};
```

## 定制步长

通过设置 `step`，可以定制需要显示的时、分、秒的步长。

```jsx live
function Demo() {
  return (
    <TimePicker
      defaultValue="10:25:30"
      step={{
        hour: 2,
        minute: 5,
        second: 10,
      }}
      style={{ width: 194, }}
    />
  );
};
```

## 默认值

时间输入器的有默认值的情况。

```jsx live
function Demo() {
  return (
    <div>
      <TimePicker
        defaultValue="18:24:23"
        style={{
          width: 194,
          marginRight: 24,
          marginBottom: 24,
        }}
      />
      <TimePicker.RangePicker
        defaultValue={['09:24:53', '18:44:33']}
        style={{ width: 252, marginBottom: 24 }}
      />
    </div>
  );
};
```

## 附加内容

选择框底部显示自定义的内容。

```jsx live
function Demo() {
  return (
    <TimePicker
      extra="Extra Footer"
      style={{ width: 194, }}
    />
  );
};
```

## 禁用部分时间选项

通过设置 `disabledHours` `disabledMinutes` `disabledSeconds`，可以禁用 时 / 分 / 秒的部分选项。

```jsx live
function Demo() {
  const style = {
    width: 194,
    margin: '0 24px 24px 0',
  };

  return (
    <div>
      <TimePicker
        style={style}
        disabledHours={() => [1, 2, 4, 14]}
        disabledMinutes={() => [1, 2, 3, 4, 14, 15, 16, 20, 50]}
        disabledSeconds={() => [1, 2, 3, 4, 5, 6, 7, 10, 14, 60]}
      />
      <TimePicker.RangePicker
        style={{ ...style, width: 252 }}
        disabledHours={() => [1, 2, 4, 14]}
        disabledMinutes={() => [1, 2, 3, 4, 14, 15, 16, 20, 50]}
        disabledSeconds={() => [1, 2, 3, 4, 5, 6, 7, 10, 14, 60]}
      />
    </div>
  );
};
```

## 十二小时制

通过设置 `use12Hours`，可以定制需要显示的时、分、秒。

```jsx live
function Demo() {
  const style = {
    width: 194,
    margin: '0 24px 24px 0',
  };

  return (
    <div>
      <TimePicker
        use12Hours
        format="hh:mm:ss A"
        defaultValue={dayjs('12:20:20 AM', 'hh:mm:ss A')}
        placeholder="请选择时间"
        style={style}
      />
      <TimePicker
        use12Hours
        format="hh:mm:ss a"
        defaultValue={dayjs('09:20:20 pm', 'hh:mm:ss a')}
        placeholder="请选择时间"
        style={style}
      />
      <TimePicker
        use12Hours
        format="h:mm A"
        defaultValue={dayjs('2:20 AM', 'h:mm A')}
        placeholder="请选择时间"
        style={style}
      />
      <TimePicker.RangePicker
        use12Hours
        format="hh:mm:ss A"
        defaultValue={[dayjs('12:20:20 AM', 'hh:mm:ss A'), dayjs('08:30:30 PM', 'hh:mm:ss A')]}
        style={{ ...style, width: 300 }}
      />
    </div>
  );
};
```

## 范围选择器

时间输入器的范围选择器。

```jsx live
function Demo() {
  return (
    <TimePicker.RangePicker
      style={{ width: 252, }}
      onSelect={(valueString, value) => console.log('onSelect:', valueString, value)}
      onChange={(valueString, value) => console.log('onChange:', valueString, value)}
    />
  );
};
```

## 禁用确认

跳过确认步骤，直接点击选择时间。

```jsx live
function Demo() {
  const style = {
    width: 194,
    margin: '0 24px 24px 0',
  };

  function onSelect(valueString, value) {
    console.log('onSelect', valueString, value);
  }

  function onChange(valueString, value) {
    console.log('onChange', valueString, value);
  }

  return (
    <div>
      <TimePicker disableConfirm style={style} onSelect={onSelect} onChange={onChange} />
      <TimePicker.RangePicker
        disableConfirm
        style={{ ...style, width: 252 }}
        onSelect={onSelect}
        onChange={onChange}
      />
    </div>
  );
};
```

## UTC 时间

通过 `utcOffset` 字段设置 UTC 时间。

**注意：使用 UTC 或者时区时间，传值的时候要用 timestamp 或者 Date 对象，使用字符串不能表示唯一时间，会造成困扰。**

```jsx live
function App() {
  const utcList = [];
  const utcLength = 25;
  let uo = -12;

  for (let i = 0; i < 25; i++) {
    utcList[i] = {
      label: `UTC ${uo ? (uo > 0 ? `+${uo}` : uo) : ''}`,
      value: uo++,
    };
  }

  const [utcOffset, setUtcOffset] = useState(0);
  const [value, setValue] = useState(new Date('2022-02-22'));
  return (
    <Space direction="vertical">
      <Space>
        <Select
          defaultValue={utcOffset}
          options={utcList}
          onChange={(offset) => setUtcOffset(offset)}
          triggerProps={{
            autoAlignPopupWidth: false,
            position: 'bl',
          }}
        />
        <TimePicker
          utcOffset={utcOffset}
          value={value}
          onChange={(v, vd) => setValue(vd && vd.toDate())}
        />
      </Space>
      <Alert
        showIcon={false}
        content={
          <Space direction="vertical">
            <div>
              <Typography.Text bold>Locale String:</Typography.Text> {value.toLocaleString('en-US')}
            </div>
            <div>
              <Typography.Text bold>ISO String:</Typography.Text> {value.toISOString()}
            </div>
            <div>
              <Typography.Text bold>Timestamp:</Typography.Text> {value.valueOf()}
            </div>
          </Space>
        }
      />
    </Space>
  );
}
```

## 时区

通过 `timezone` 字段设置时区，如果设置了 `utcOffset`，以 `utcOffset` 为准。

**注意：使用 UTC 或者时区时间，传值的时候要用 timestamp 或者 Date 对象，使用字符串不能表示唯一时间，会造成困扰。**

```jsx live
function App() {
  const zoneList = ['America/Los_Angeles', 'Europe/London', 'Africa/Cairo', 'Asia/Shanghai'];
  const defaultValue = new Date('2022-02-22');

  const [timezone, setTimezone] = useState('Asia/Shanghai');
  const [value, setValue] = useState(defaultValue);
  return (
    <Space direction="vertical">
      <Space>
        <Select
          defaultValue={timezone}
          options={zoneList}
          onChange={(tz) => setTimezone(tz)}
          triggerProps={{
            autoAlignPopupWidth: false,
            position: 'bl',
          }}
        />
        <TimePicker
          timezone={timezone}
          defaultValue={defaultValue}
          onChange={(v, vd) => setValue(vd && vd.toDate())}
        />
      </Space>
      <Alert
        showIcon={false}
        content={
          <Space direction="vertical">
            <div>
              <Typography.Text bold>Locale String:</Typography.Text> {value.toLocaleString('en-US')}
            </div>
            <div>
              <Typography.Text bold>ISO String:</Typography.Text> {value.toISOString()}
            </div>
            <div>
              <Typography.Text bold>Timestamp:</Typography.Text> {value.valueOf()}
            </div>
          </Space>
        }
      />
    </Space>
  );
}
```

## API

### Picker

`TimePicker` 和 `RangePicker` 的通用属性

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|allowClear|允许清除|boolean |`true`|-|
|disableConfirm|禁用确认步骤，开启后直接点选时间不需要点击确认按钮。|boolean |`-`|2.12.0|
|disabled|是否禁用|boolean |`-`|-|
|editable|是否可手动输入|boolean |`true`|-|
|error|是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)|boolean |`-`|-|
|hideDisabledOptions|隐藏禁止选择的选项|boolean |`-`|-|
|popupVisible|控制弹出框打开或者关闭|boolean |`-`|-|
|scrollSticky|时间列在滚动的时候自动吸附和选中|boolean |`true`|2.23.0|
|unmountOnExit|是否在关闭后销毁 dom 结构|boolean |`-`|-|
|use12Hours|12 小时制|boolean |`-`|-|
|utcOffset|设置时区偏移，如果需要 utc 时间则设置为 0。|number |`-`|-|
|format|展示日期的格式，参考dayjs|string |`HH:mm:ss`|-|
|timezone|设置时区, 如果设置了 `utcOffset`，则以 `utcOffset` 为准。|string |`-`|-|
|position|弹出的框的位置|'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' |`bl`|-|
|size|输入框尺寸|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|status|状态|'error' \| 'warning' |`-`|2.45.0|
|extra|底部附加内容|ReactNode |`-`|-|
|prefix|前缀|ReactNode |`-`|2.43.0|
|triggerElement|触发元素。|ReactNode |`-`|2.38.0|
|className|节点类名|string \| string[] |`-`|-|
|icons|用于配置图标|&#123; inputSuffix?: ReactNode } |`-`|-|
|placeholder|提示文案|string \| string[] |`-`|-|
|step|设置 时 / 分 / 秒 的选择间隔|&#123; hour?: number; minute?: number; second?: number } |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|triggerProps|可以传入 `Trigger` 组件的参数|Partial&lt;TriggerProps&gt; |`-`|-|
|disabledHours|禁用的部分小时选项|() => number[] |`-`|-|
|disabledMinutes|禁用的部分分钟选项|(selectedHour) => number[] |`-`|-|
|disabledSeconds|禁用的部分秒数选项|(selectedHour, selectedMinute) => number[] |`-`|-|
|getPopupContainer|弹出框挂载的父节点|(node: HTMLElement) => Element |`-`|-|
|onClear|点击清除按钮的回调|() => void |`-`|-|

### TimePicker

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|showNowBtn|是否显示选择当前时间的按钮|boolean |`true`|2.21.0|
|defaultValue|默认时间|CalendarValue |`-`|-|
|value|组件的值，受控模式|CalendarValue |`-`|-|
|onChange|选择时间时的回调|(valueString: string, value: Dayjs) => void |`-`|-|
|onSelect|组件值发生改变时的回调|(valueString: string, value: Dayjs) => void |`-`|-|

### TimePicker.RangePicker

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|order|起止时间是否自动排序|boolean |`true`|2.21.0|
|defaultValue|默认时间|CalendarValue[] |`-`|-|
|placeholder|提示文案|string[] |`-`|-|
|value|日历组件的值|CalendarValue[] |`-`|-|
|onChange|日历组件值发生改变时的回调|(valueString: string[], value: Dayjs[]) => void |`-`|-|
|onSelect|选择日期时的回调|(valueString: string[], value: Dayjs[]) => void |`-`|-|

### CalendarValue

```js
export type CalendarValue = Dayjs | Date | string | number;
```

