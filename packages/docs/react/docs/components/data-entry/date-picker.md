---
sidebar_position: 1
---

# 日期选择器 DatePicker

选择日期。支持年、月、周、日类型，支持范围选择等。

## 基础用法

日期输入器的基础使用。

```jsx live
function Demo() {
  return (
    <DatePicker style={{ width: 200 }}/>
  );
};
```

## 不同状态

不同状态的日期输入器

```jsx live
function Demo() {
  return (
   <div>
    <Space wrap>
      <DatePicker status="error" placeholder="error status" style={{ width: 200 }}/>
      <DatePicker.RangePicker status="error"  placeholder="warning status"  style={{ width: 250 }}/>
    </Space>
    <br/>
    <Space wrap>
      <DatePicker status="warning"  placeholder="warning status"  style={{ width: 200 }}/>
      <DatePicker.RangePicker status="warning"  placeholder="warning status"  style={{ width: 250 }}/>
    </Space>
    </div>
  );
};
```

## 带有前缀

通过 `prefix` 属性设置前缀

```jsx live
function Demo() {
  return (
    <Space>
      <DatePicker style={{ width: 200 }} prefix={<IconInfoCircle />}/>
      <DatePicker.RangePicker style={{ width: 350 }} prefix={<IconInfoCircle />}/>
    </Space>
  );
};
```

## 月份选择器

月份输入器的基础使用。

```jsx live
function Demo() {
  return (
    <DatePicker.MonthPicker style={{ width: 200 }}/>
  );
};
```

## 年份选择器

年份输入器的基础使用。

```jsx live
function Demo() {
  return <DatePicker.YearPicker style={{ width: 200 }} />;
};
```

## 周选择器

周输入器的基础使用。

```jsx live
function Demo() {
  return <DatePicker.WeekPicker style={{ width: 200 }} />;
};
```

## 季度选择器

季度选择器的使用。

```jsx live
function Demo() {
  return <DatePicker.QuarterPicker style={{ width: 200 }} />;
};
```

## 带时间的日期选择

使用 `showTime` 可以使用带时间的日期选择。

```jsx live
function Demo() {
  const style = {
    width: 220,
    margin: '0 24px 24px 0',
  };

  function onSelect(dateString, date) {
    console.log('onSelect', dateString, date);
  }

  function onChange(dateString, date) {
    console.log('onChange: ', dateString, date);
  }

  function onOk(dateString, date) {
    console.log('onOk: ', dateString, date);
  }

  return (
    <div>
      <DatePicker
        style={style}
        showTime={{
          defaultValue: '04:05:06',
        }}
        format="YYYY-MM-DD HH:mm:ss"
        onChange={onChange}
        onSelect={onSelect}
        onOk={onOk}
      />
      <DatePicker
        style={style}
        showTime
        format="YYYY-MM-DD hh:mm A"
        onChange={onChange}
        onSelect={onSelect}
        onOk={onOk}
      />
      <DatePicker.RangePicker
        style={{ ...style, width: 360 }}
        showTime={{
          defaultValue: ['00:00', '04:05'],
          format: 'HH:mm',
        }}
        format="YYYY-MM-DD HH:mm"
        onChange={onChange}
        onSelect={onSelect}
        onOk={onOk}
      />
    </div>
  );
};
```

## 范围选择器

范围输入器的基础使用。

```jsx live

function App() {
  function onSelect(dateString, date) {
    console.log('onSelect', dateString, date);
  }

  function onChange(dateString, date) {
    console.log('onChange: ', dateString, date);
  }

  const [value, setValue] = useState('date');
  const mode = value === 'date time' ? 'date' : value;
  const style =
    value === 'date time'
      ? {
          width: 380,
        }
      : {
          width: 254,
          marginBottom: 20,
        };
  return (
    <Space direction="vertical">
      <Radio.Group
        options={['date', 'week', 'month', 'year', 'quarter', 'date time']}
        value={value}
        onChange={(v) => setValue(v)}
        type="button"
      />
      <DatePicker.RangePicker
        mode={mode}
        onChange={onChange}
        onSelect={onSelect}
        style={style}
        showTime={value === 'date time'}
      />
    </Space>
  );
}
```

## 默认值

日期输入器有默认值的情况。

```jsx live
function Demo() {
  function onSelect(dateString, date) {
    console.log('onSelect', dateString, date);
  }

  function onChange(dateString, date) {
    console.log('onChange: ', dateString, date);
  }

  const style = {
    width: 220,
    marginBottom: 24,
    marginRight: 24,
  };

  return (
    <div>
      <DatePicker defaultValue="2019-06-03" onSelect={onSelect} onChange={onChange} style={style} />
      <DatePicker
        defaultValue="2019-06-03"
        format={(value) => `custom format: ${value.format('YYYY-MM-DD')}`}
        onSelect={onSelect}
        onChange={onChange}
        style={{ ...style, width: 240 }}
      />
      <DatePicker
        showTime
        defaultValue="2019-06-03 08:00:00"
        onSelect={onSelect}
        onChange={onChange}
        style={style}
      />
      <DatePicker.YearPicker defaultValue="2019" onSelect={onSelect} onChange={onChange} style={style} />
      <DatePicker.MonthPicker defaultValue="2019-06" onSelect={onSelect} onChange={onChange} style={style} />
      <DatePicker.WeekPicker
        defaultValue={dayjs('2019-08-02')}
        onSelect={onSelect}
        onChange={onChange}
        style={style}
      />
      <DatePicker.RangePicker
        showTime
        defaultValue={['2019-08-08 00:00:00', '2019-08-18 09:09:06']}
        onSelect={onSelect}
        onChange={onChange}
        style={{ ...style, width: 360 }}
      />
      <DatePicker.RangePicker
        mode="month"
        defaultValue={['2019-08', '2020-06']}
        onSelect={onSelect}
        onChange={onChange}
        style={{ width: 300, marginBottom: 24 }}
      />
    </div>
  );
};
```

## 不可选取的时间

使用 `disabledDate` 可以禁用某些日期，`2.5.0` 开始支持 `disabledTime` 禁用时间，需要配合 `showTime` 使用。

```jsx live
function Demo() {
  function range(start, end) {
    const result = [];

    for (let i = start; i < end; i++) {
      result.push(i);
    }

    return result;
  }

  function getDisabledTime(date) {
    return {
      disabledHours: () => range(6, 24),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => range(30, 60),
    };
  }

  function getDisabledRangeTime(date, type) {
    return {
      disabledHours: () => (type === 'start' ? range(0, 6) : range(6, 24)),
      disabledMinutes: () => (type === 'end' ? range(0, 30) : [31, 60]),
      disabledSeconds: () => range(30, 60),
    };
  }

  return (
    <div>
      <DatePicker
        style={{ width: 200, marginRight: 24, marginBottom: 24 }}
        disabledDate={(current) => current.isBefore(dayjs()) || current.isAfter(dayjs().add(7, 'day'))}
      />
      <DatePicker.RangePicker
        style={{ width: 300, marginRight: 24, marginBottom: 24 }}
        disabledDate={(current) => current.isBefore(dayjs())}
      />
      <DatePicker
        style={{ width: 200, marginRight: 24, marginBottom: 24 }}
        showTime
        disabledDate={(current) => current.isBefore(dayjs())}
        disabledTime={getDisabledTime}
      />
      <DatePicker.RangePicker
        style={{ width: 380, marginBottom: 24 }}
        showTime={{
          hideDisabledOptions: true,
        }}
        disabledDate={(current) => current.isBefore(dayjs())}
        disabledTime={getDisabledRangeTime}
      />
    </div>
  );
};
```

## 预设时间快捷选择

使用 `shortcuts` 可以预设时间快捷选择。

```jsx live
function Demo() {
  return (
    <div>
      <DatePicker
        style={{ width: 200, marginBottom: 24, marginRight: 24 }}
        shortcuts={[
          {
            text: 'a month later',
            value: () => dayjs().add(1, 'month'),
          },
        ]}
        showTime
      />
      <DatePicker.MonthPicker
        style={{ width: 200, marginBottom: 24, marginRight: 24 }}
        shortcuts={[
          {
            text: 'last month',
            value: () => dayjs().subtract(1, 'month'),
          },
          {
            text: 'six months later',
            value: () => dayjs().add(6, 'month'),
          },
          {
            text: 'two years later',
            value: () => dayjs().add(2, 'year'),
          },
        ]}
      />
      <DatePicker.RangePicker
        style={{ width: 280, marginBottom: 24, marginRight: 24 }}
        shortcuts={[
          {
            text: 'next 7 days',
            value: () => [dayjs(), dayjs().add(1, 'week')],
          },
          {
            text: 'next 30 days',
            value: () => [dayjs(), dayjs().add(1, 'month')],
          },
          {
            text: 'next 365 days',
            value: () => [dayjs(), dayjs().add(1, 'year')],
          },
        ]}
      />
      <DatePicker.RangePicker
        style={{ width: 240, marginBottom: 24 }}
        mode="month"
        shortcuts={[
          {
            text: 'next 6 months',
            value: () => [dayjs(), dayjs().add(6, 'month')],
          },
          {
            text: 'next 12 months',
            value: () => [dayjs(), dayjs().add(1, 'year')],
          },
          {
            text: 'next 10 years',
            value: () => [dayjs(), dayjs().add(10, 'year')],
          },
        ]}
      />
    </div>
  );
};
```

## 定制预设范围位置

使用 `shortcutsPlacementLeft` 可以将预设时间快捷选择放到左边。

```jsx live

function Demo() {
  return (
    <div>
      <DatePicker
        style={{ width: 254, marginBottom: 20 }}
        shortcutsPlacementLeft
        shortcuts={[
          {
            text: 'yesterday',
            value: () => dayjs().subtract(1, 'day'),
          },
          {
            text: 'today',
            value: () => dayjs(),
          },
          {
            text: 'a week later',
            value: () => dayjs().add(1, 'week'),
          },
          {
            text: 'a month later',
            value: () => dayjs().add(1, 'month'),
          },
          {
            text: '2 months later',
            value: () => dayjs().add(2, 'month'),
          },
        ]}
      />
      <br />
      <DatePicker.RangePicker
        style={{ width: 300 }}
        shortcutsPlacementLeft
        shortcuts={[
          {
            text: 'next 2 days',
            value: () => [dayjs(), dayjs().add(2, 'day')],
          },
          {
            text: 'next 7 days',
            value: () => [dayjs(), dayjs().add(1, 'week')],
          },
          {
            text: 'next 30 days',
            value: () => [dayjs(), dayjs().add(1, 'month')],
          },
          {
            text: 'next 6 months',
            value: () => [dayjs(), dayjs().add(6, 'month')],
          },
          {
            text: 'next 12 months',
            value: () => [dayjs(), dayjs().add(1, 'year')],
          },
          {
            text: 'next 10 years',
            value: () => [dayjs(), dayjs().add(10, 'year')],
          },
        ]}
      />
    </div>
  );
};
```

## 动态控制选取范围

根据选择的值来控制选取的范围，使用 `onSelect` 配合 `disabledDate` 来实现。如果设置了 `showTime` 需要将比较维度转化为 `day`。

```jsx live

function App() {
  const [dates, setDates] = useState([]);
  const [timeDates, setTimeDates] = useState([]);

  return (
    <Space size={24} direction="vertical">
      <DatePicker.RangePicker
        style={{ width: 300 }}
        onSelect={(valueString, value) => {
          setDates(value);
        }}
        onVisibleChange={(visible) => {
          if (!visible) {
            setDates([]);
          }
        }}
        disabledDate={(current) => {
          if (dates && dates.length) {
            const tooLate = dates[0] && Math.abs(current.diff(dates[0], 'day')) > 7;
            const tooEarly = dates[1] && Math.abs(dates[1].diff(current, 'day')) > 7;
            return tooEarly || tooLate;
          }

          return false;
        }}
        clearRangeOnReselect
      />

      <DatePicker.RangePicker
        showTime
        style={{ width: 400 }}
        onSelect={(valueString, value) => {
          setTimeDates(value);
        }}
        onVisibleChange={(visible) => {
          if (!visible) {
            setTimeDates([]);
          }
        }}
        disabledDate={(current) => {
          if (timeDates && timeDates.length) {
            const tooLate =
              timeDates[0] && Math.abs(current.diff(timeDates[0].startOf('day'), 'day')) > 7;
            const tooEarly =
              timeDates[1] && Math.abs(timeDates[1].endOf('day').diff(current, 'day')) > 7;
            return tooEarly || tooLate;
          }
          return false;
        }}
        clearRangeOnReselect
      />
    </Space>
  );
}
```

## 尺寸

设置 `size` 可以使用四种尺寸（`mini` `small` `default` `large`）的输入框。高度分别对应 24px、32px、36px、40px。

```jsx live

class App extends React.Component {
  state = {
    size: 'default',
  };
  handleChange = (size) => {
    this.setState({
      size,
    });
  };

  render() {
    const { size } = this.state;
    return (
      <div>
        <Radio.Group
          type="button"
          mode="fill"
          name="size"
          value={this.state.size}
          onChange={this.handleChange}
          style={{ marginBottom: 20 }}
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
        <DatePicker
          size={size}
          style={{ width: 254 }}
        />
      </div>
    );
  }
}
```

## 额外的页脚

在浮层中加入额外的页脚，以满足某些定制信息的需求。

```jsx live
function Demo() {
  return (
    <div>
      <DatePicker
        extra="Extra footer"
        style={{ width: 200, marginBottom: 20 }}
      />
      <br />
      <DatePicker.RangePicker
        showTime
        extra="Extra footer"
        style={{ width: 380 }}
      />
    </div>
  );
};
```

## 禁用

禁用状态。

```jsx live

function Demo() {
  return (
    <div>
      <DatePicker
        defaultValue="2020-08-08"
        disabled
        style={{ width: 200, marginBottom: 20 }}
      />
      <br />
      <DatePicker.RangePicker
        defaultValue={['2020-08-08', '2020-08-18']}
        disabled
        style={{ width: 300, marginBottom: 20 }}
      />
      <br />
      <DatePicker.RangePicker
        defaultValue={[undefined, '2020-08-08']}
        disabled={[false, true]}
        style={{ width: 300, marginBottom: 20 }}
      />
      <br />
      <DatePicker.RangePicker
        showTime
        defaultValue={['2020-08-08 02:02:02']}
        disabled={[true, false]}
        style={{ width: 380 }}
      />
    </div>
  );
};
```

## 定制日期单元格

利用 `dateRender` 可以定制日期单元格。

```jsx live
function Demo() {
  const highlightStyle = {
    border: '1px solid rgb(var(--arcoblue-6))',
  };

  return (
    <DatePicker
      dateRender={(current) => {
        const date = current.date();
        const highlightDates = [6, 14, 22];
        return (
          <div className="arco-picker-date">
            <div
              className="arco-picker-date-value"
              style={highlightDates.indexOf(date) > -1 ? highlightStyle : {}}
            >
              {current.date()}
            </div>
          </div>
        );
      }}
      style={{ width: 200 }}
    />
  );
};
```

## 受控模式

`value` 和 `onChange` 应该一起使用。

```jsx live

function App() {
  const [value, setValue] = useState();
  const [valueRange, setValueRange] = useState();
  useEffect(() => {
    setValue(Date.now());
    setValueRange([Date.now(), Date.now()]);
  }, []);
  return (
    <Space>
      <DatePicker
        showTime
        value={value}
        onChange={(v) => setValue(v)}
        style={{ width: 200 }}
      />
      <DatePicker.RangePicker
        showTime
        value={valueRange}
        onChange={(v) => setValueRange(v)}
        style={{ width: 380 }}
      />
    </Space>
  );
}
```

## 自定义触发元素

自定义触发元素。

```jsx live

function App() {
  const [value, setValue] = useState();
  const [rangeValue, setRangeValue] = useState();
  return (
    <Space>
      <DatePicker
        triggerElement={<Button>{value || '请选择日期'}</Button>}
        style={{ width: 268 }}
        value={value}
        onChange={(v) => setValue(v)}
      />
      <DatePicker.RangePicker
        triggerElement={
          <Button>{(rangeValue && rangeValue.join(' - ')) || '请选择日期范围'}</Button>
        }
        style={{ width: 268 }}
        value={rangeValue}
        onChange={(v) => setRangeValue(v)}
      />
    </Space>
  );
}
```

## 只使用面板

只是用选择面板，不显示输入框。

```jsx live

function App() {
  const [value, setValue] = useState();
  const [pickerValue, setPickerValue] = useState();
  const [rangeValue, setRangeValue] = useState();
  const [rangePickerValue, setRangePickerValue] = useState();
  return (
    <div>
      <DatePicker
        triggerElement={null}
        style={{ width: 268 }}
        value={value}
        onChange={(v) => setValue(v)}
        pickerValue={pickerValue}
        onPickerValueChange={(v) => setPickerValue(v)}
      />
      <DatePicker.RangePicker
        triggerElement={null}
        style={{ width: 560, marginTop: 20 }}
        value={rangeValue}
        onChange={(v) => setRangeValue(v)}
        pickerValue={rangePickerValue}
        onPickerValueChange={(v) => setRangePickerValue(v)}
      />
    </div>
  );
}
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

  const defaultValue = new Date('2022-02-22');
  const defaultRangeValue = [new Date(2022, 1, 22, 8), new Date(2022, 2, 22, 10)];

  const [utcOffset, setUtcOffset] = useState(0);
  const [value, setValue] = useState(defaultValue);
  const [rangeValue, setRangeValue] = useState(defaultRangeValue);
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
        <DatePicker
          showTime
          utcOffset={utcOffset}
          value={value}
          onChange={(v, vd) => setValue(vd && vd.toDate())}
        />
        <DatePicker.RangePicker
          showTime
          utcOffset={utcOffset}
          value={rangeValue}
          onChange={(v, vd) => setRangeValue(vd && vd.map((d) => d.toDate()))}
        />
      </Space>
      <Alert
        showIcon={false}
        content={
          <Space direction="vertical">
            <Tag bordered color="gray">
              DatePicker
            </Tag>
            <div>
              <Typography.Text bold>Locale String:</Typography.Text>
              {value ? value.toLocaleString('en-US') : '-'}
            </div>
            <div>
              <Typography.Text bold>ISO String:</Typography.Text>
              {value ? value.toISOString() : '-'}
            </div>
            <div>
              <Typography.Text bold>Timestamp:</Typography.Text>
              {value ? value.valueOf() : '-'}
            </div>
          </Space>
        }
      />
      <Alert
        showIcon={false}
        content={
          <Space direction="vertical">
            <Tag bordered color="gray">
              RangePicker
            </Tag>
            <div>
              <Typography.Text bold>Locale String:</Typography.Text>
              {rangeValue ? rangeValue.map((v) => v.toLocaleString('en-US')).join(' --- ') : '-'}
            </div>
            <div>
              <Typography.Text bold>ISO String:</Typography.Text>
              {rangeValue ? rangeValue.map((v) => v.toISOString()).join(' --- ') : '-'}
            </div>
            <div>
              <Typography.Text bold>Timestamp:</Typography.Text>
              {rangeValue ? rangeValue.map((v) => v.valueOf()).join(' --- ') : '-'}
            </div>
          </Space>
        }
      />
    </Space>
  );
}
```

## 设置时区

通过 `timezone` 字段设置时区，如果设置了 `utcOffset`，以 `utcOffset` 为准。

**注意：使用 UTC 或者时区时间，传值的时候要用 timestamp 或者 Date 对象，使用字符串不能表示唯一时间，会造成困扰。**

```jsx live

function App() {
  const zoneList = ['America/Los_Angeles', 'Europe/London', 'Africa/Cairo', 'Asia/Shanghai'];
  const defaultValue = new Date('2022-02-22');
  const defaultRangeValue = [new Date(2022, 1, 22, 8), new Date(2022, 2, 22, 10)];

  const [timezone, setTimezone] = useState('Asia/Shanghai');
  const [value, setValue] = useState(defaultValue);
  const [rangeValue, setRangeValue] = useState(defaultRangeValue);
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
        <DatePicker
          showTime
          timezone={timezone}
          value={value}
          onChange={(v, vd) => setValue(vd && vd.toDate())}
        />
        <DatePicker.RangePicker
          showTime
          timezone={timezone}
          value={rangeValue}
          onChange={(v, vd) => setRangeValue(vd && vd.map((d) => d.toDate()))}
        />
      </Space>
      <Alert
        showIcon={false}
        content={
          <Space direction="vertical">
            <Tag bordered color="gray">
              DatePicker
            </Tag>
            <div>
              <Typography.Text bold>Locale String:</Typography.Text>
              {value ? value.toLocaleString('en-US') : '-'}
            </div>
            <div>
              <Typography.Text bold>ISO String:</Typography.Text>
              {value ? value.toISOString() : '-'}
            </div>
            <div>
              <Typography.Text bold>Timestamp:</Typography.Text>
              {value ? value.valueOf() : '-'}
            </div>
          </Space>
        }
      />
      <Alert
        showIcon={false}
        content={
          <Space direction="vertical">
            <Tag bordered color="gray">
              RangePicker
            </Tag>
            <div>
              <Typography.Text bold>Locale String:</Typography.Text>
              {rangeValue ? rangeValue.map((v) => v.toLocaleString('en-US')).join(' --- ') : '-'}
            </div>
            <div>
              <Typography.Text bold>ISO String:</Typography.Text>
              {rangeValue ? rangeValue.map((v) => v.toISOString()).join(' --- ') : '-'}
            </div>
            <div>
              <Typography.Text bold>Timestamp:</Typography.Text>
              {rangeValue ? rangeValue.map((v) => v.valueOf()).join(' --- ') : '-'}
            </div>
          </Space>
        }
      />
    </Space>
  );
}
```

## API

**Picker 为所有组件共有的属性**

### Picker Props

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|allowClear|允许清除|boolean |`true`|-|
|editable|是否可输入。|boolean |`true`|-|
|error|是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)|boolean |`-`|-|
|hideNotInViewDates|面板隐藏不在当前时间范围的灰色日期|boolean |`-`|2.20.0|
|popupVisible|指定弹框打开或者关闭状态。|boolean |`-`|-|
|shortcutsPlacementLeft|预设范围选择放在面板左侧，用于大量预设时间的场景。|boolean |`-`|-|
|unmountOnExit|是否在隐藏的时候销毁 DOM 结构|boolean |`-`|-|
|utcOffset|设置时区偏移，如果需要 utc 时间则设置为 0。|number |`-`|-|
|timezone|设置时区, 如果设置了 `utcOffset`，则以 `utcOffset` 为准。|string |`-`|-|
|position|弹出的框的位置|'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' |`-`|-|
|size|日期选择器的尺寸|'mini' \| 'small' \| 'default' \| 'large' |`default`|-|
|status|状态|'error' \| 'warning' |`-`|2.45.0|
|extra|额外的页脚|ReactNode |`-`|-|
|prefix|前缀|ReactNode |`-`|2.43.0|
|separator|范围选择器输入框内的分割符号|ReactNode |`-`|-|
|triggerElement|触发元素。|ReactNode |`-`|2.9.0|
|className|节点类名|string \| string[] |`-`|-|
|dayStartOfWeek|每周的第一天开始于周几，0 - 周日，1 - 周一，以此类推。|0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 |`-`|2 - 6 in `2.20.0`|
|defaultPickerValue|默认面板显示的日期|CalendarValue |`-`|-|
|disabled|是否禁用|boolean \| boolean[] |`-`|-|
|icons|日历翻页的图标配置。|&#123;prev?: ReactNode;prevDouble?: ReactNode;next?: ReactNode;nextDouble?: ReactNode;inputSuffix?: ReactNode;} |`-`|2.20.0|
|inputProps|原生输入框属性|React.InputHTMLAttributes&lt;HTMLInputElement&gt; |`-`|2.60.0|
|locale|国际化配置|Record&lt;string, any&gt; |`-`|-|
|pickerValue|面板显示的日期。|CalendarValue |`-`|2.9.0|
|placeholder|提示文案|string \| string[] |`-`|-|
|shortcuts|预设时间范围快捷选择|ShortcutType[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|triggerProps|可以传入 `Trigger` 组件的参数。|Partial&lt;TriggerProps&gt; |`-`|-|
|dateRender|自定义日期单元格的内容。|(currentDate: Dayjs) => ReactNode |`-`|-|
|disabledDate|不可选取的日期|(current: Dayjs) => boolean |`-`|-|
|getPopupContainer|弹出框挂载的父节点|(node: HTMLElement) => Element |`bl`|-|
|onChange|日历组件值发生改变时的回调|(dateString: string, date: Dayjs) => void |`-`|-|
|onClear|点击清除按钮后的回调|() => void |`-`|-|
|onOk|点击确认按钮的回调|(dateString: string, date: Dayjs) => void |`-`|-|
|onPickerValueChange|面板日期改变的回调。|(dateString: string, value: Dayjs) => void |`-`|2.9.0|
|onSelect|选中日期发生改变但组件值未改变时的回调|(dateString: string, date: Dayjs) => void |`-`|-|
|onSelectShortcut|点击快捷选择时的回调。|(shortcut: ShortcutType) => void |`-`|-|
|onVisibleChange|打开或关闭时的回调|(visible?: boolean) => void |`-`|-|
|panelRender|自定义渲染面板|(panelNode: ReactNode) => ReactNode |`-`|2.34.0|

### DatePicker

`type CalendarValue = number | string | Date | Dayjs`。

|参数名|描述|类型|默认值|
|---|---|---|---|
|showNowBtn|是否显示 `showTime` 时，选择当前时间的按钮。|boolean |`true`|
|defaultValue|默认日期|CalendarValue |`-`|
|showTime|是否增加时间选择|boolean \| TimePickerProps |`-`|
|timepickerProps|时间显示的参数，参考 TimePickerProps，作用同 `showTime`。|TimePickerProps |`-`|
|value|日历组件的值|CalendarValue |`-`|
|disabledTime|不可选取的时间|(current?: Dayjs) => DisabledTimeProps |`-`|
|format|展示日期的格式，参考dayjs。使用 `string` 时，可以手动键入和编辑日期。使用 `(value: Dayjs) => string` 时，只能在 Picker 中选取日期。|string \| ((value: Dayjs) => string) |`YYYY-MM-DD`|

### WeekPicker

|参数名|描述|类型|默认值|
|---|---|---|---|
|format|展示日期的格式，参考dayjs|string |`gggg-wo`|
|defaultValue|默认日期|CalendarValue |`-`|
|value|日历组件的值|CalendarValue |`-`|

### MonthPicker

|参数名|描述|类型|默认值|
|---|---|---|---|
|format|展示日期的格式，参考dayjs|string |`YYYY-MM`|
|defaultValue|默认日期|CalendarValue |`-`|
|value|日历组件的值|CalendarValue |`-`|

### YearPicker

|参数名|描述|类型|默认值|
|---|---|---|---|
|format|展示日期的格式，参考dayjs|string |`YYYY`|
|defaultValue|默认日期|CalendarValue |`-`|
|value|日历组件的值|CalendarValue |`-`|

### QuarterPicker

|参数名|描述|类型|默认值|
|---|---|---|---|
|format|展示日期的格式，参考dayjs|string |`YYYY-[Q]Q`|
|defaultValue|默认日期|CalendarValue |`-`|
|value|日历组件的值|CalendarValue |`-`|

### RangePicker

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|clearRangeOnReselect|当重新选择范围的时候，会清空之前的范围重新进行选择|boolean |`-`|2.23.0|
|disabledTime|不可选取的时间|(current: Dayjs, type: 'start' \| 'end') => DisabledTimeProps |`-`|-|
|mode|范围选择器的类型，可以是日期、月份。|'date' \| 'month' \| 'week' \| 'year' \| 'quarter' |`date`|-|
|onSelect|选中日期发生改变但组件值未改变时的回调|(dateString: string[], value: Dayjs[], extra: &#123; type: 'start' \| 'end' }) => void |`-`|`extra` in `2.23.0`|
|triggerElement|触发元素。|ReactNode |`-`|2.9.0|
|defaultPickerValue|默认面板显示的日期|CalendarValue[] |`-`|-|
|defaultValue|默认日期|CalendarValue[] |`-`|-|
|disabled|是否禁用|boolean \| boolean[] |`-`|-|
|format|展示日期的格式，参考dayjs|string \| string[] |`YYYY-MM-DD`|string[] in 2.55.0|
|inputProps|原生输入框属性|React.InputHTMLAttributes&lt;HTMLInputElement&gt;[] |`-`|2.60.0|
|pickerValue|面板显示的日期。|CalendarValue[] |`-`|2.9.0|
|placeholder|提示文案|string[] |`-`|-|
|showTime|是否增加时间选择，如果传入的是个对象，会把参数传给内置的 TimePicker。|boolean \| TimePickerRangeProps |`-`|-|
|timepickerProps|时间显示的参数，参考 TimePickerProps，作用同 `showTime`。|TimePickerProps |`-`|-|
|value|日历组件的值|CalendarValue[] |`-`|-|
|onChange|日历组件值发生改变时的回调|(dateString: string[], date: Dayjs[]) => void |`-`|-|
|onOk|点击确认按钮的回调|(dateString: string[], date: Dayjs[]) => void |`-`|-|
|onPickerValueChange|面板日期改变的回调。|(dateString: string[], value: Dayjs[]) => void |`-`|2.9.0|

### ShortcutType

```js
export type ShortcutType = {
  text: ReactNode;
  value: () => Dayjs | Dayjs[];
} & Record<string, any>;
```

### CalendarValue

```js
export type CalendarValue = number | string | Date | Dayjs;
```

### TimePickerProps

```js
export type TimePickerProps = BaseTimePickerProps & PickerProps;
```

### DisabledTimeProps

```js
export type DisabledTimeProps = {
  disabledHours?: () => number[];
  disabledMinutes?: () => number[];
  disabledSeconds?: () => number[];
};
```

### TimePickerRangeProps

```js
export type TimePickerRangeProps = Omit<TimePickerProps, "defaultValue"> & {
  defaultValue?: CalendarValue[];
};
```

