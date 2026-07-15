---
sidebar_position: 1
---

# 数值显示 Statistic

突出展示某个或某组数字、带描述的统计类数据。

## 基础用法

当需要突出某个或某组数字或展示带描述的统计类数据时使用。

```jsx live
function Demo() {
  return (
    <div>
      <Statistic title="Downloads" value={125670} groupSeparator style={{ marginRight: 60 }} />
      <Statistic extra="Comments" value={40509} groupSeparator precision={2} />
    </div>
  );
};
```

## 前缀后缀/自定义样式

这个示例展示了添加前缀后缀，并且可以自定义数值显示的样式。

```jsx live
function Demo() {
  return (
    <div>
      <Statistic
        title="New Users"
        value={192393}
        suffix={<IconArrowRise style={{ color: '#ee4d38' }} />}
        style={{ marginRight: 60, marginBottom: 20 }}
      />
      <Statistic
        title="Active Users"
        value={934230}
        suffix={<IconArrowFall style={{ color: '#0fbf60' }} />}
        style={{ marginRight: 60, marginBottom: 20 }}
      />
      <Statistic
        title="User Growth Rate"
        value={50.32}
        precision={2}
        prefix={<IconArrowRise style={{ color: '#ee4d38' }} />}
        suffix="%"
        styleValue={{ color: '#ee4d38' }}
        style={{ marginRight: 60, marginBottom: 20 }}
      />
    </div>
  );
};
```

## 数值动效

利用 `Statistic`，你可以作出一些好玩儿的效果，比如，数值缓动变大，让数值的展示更加具有视觉效果。
如果你设置了 `countUp`，那么在组件 mount 之后，会执行动效。
如果你想自己控制动效，也可以通过 `ref` 拿到实例，执行 `ins.countUp()` 即可。

```jsx live

class App extends React.Component {
  render() {
    return (
      <Grid.Row>
        <Grid.Col span={4}>
          <Statistic
            ref={(ref) => (this.refGrowth = ref)}
            title="User Growth Rate"
            value={50.32}
            precision={2}
            prefix={<IconArrowRise />}
            suffix="%"
            countUp
            styleValue={{ color: '#0fbf60' }}
          />
          <Button
            onClick={() => {
              this.refGrowth.countUp();
            }}
            style={{ display: 'block', marginTop: 10 }}
            type="primary"
          >
            Start
          </Button>
        </Grid.Col>
        <Grid.Col span={4}>
          <Statistic
            ref={(ref) => (this.refBugs = ref)}
            title="Population Growth Rate"
            value={2.59}
            precision={2}
            prefix={<IconArrowFall />}
            suffix="%"
            countUp
            styleValue={{ color: '#ee4d38' }}
          />
          <Button
            onClick={() => {
              this.refBugs.countUp();
            }}
            style={{ display: 'block', marginTop: 10 }}
            type="primary"
          >
            Start
          </Button>
        </Grid.Col>
      </Grid.Row>
    );
  }
}
```

## 计时组件

倒计时组件。可以通过 `now` 来传入 `Date.now()`，用于修复初始值显示的小误差问题。

```jsx live
function App() {
  const now = Date.now();
  const [start, setStart] = React.useState(false);

  const _now = Date.now();

  return (
    <Space direction="vertical" size={40}>
      <Space size={60}>
        <Statistic.Countdown title="Countdown" value={now + 1000 * 60 * 60 * 2} now={now} />
        <Statistic.Countdown
          value={now + 1000 * 60 * 60 * 2}
          now={now}
          renderFormat={(_diff, _value) => {
            const minutes = Math.floor(_diff / (1000 * 60));
            const seconds = Math.floor(_diff / 1000);
            let diffTimes = '';
            if (minutes) {
              diffTimes = `${minutes}min 后`;
            } else {
              diffTimes = `${seconds}s 后`;
            }
            return <Statistic title="Countdown renderFormat" value={_value} suffix={diffTimes} />;
          }}
        />
        <Statistic.Countdown
          title="Milliseconds"
          value={now + 1000 * 60 * 60 * 2}
          format="HH:mm:ss.SSS"
          now={now}
        />
      </Space>
      <Space align="start" size={40}>
        <Statistic.Countdown
          title="Days"
          value={now + 1000 * 60 * 60 * 24 * 4}
          format="D 天 H 时 m 分 s 秒"
          now={now}
        />
        <div>
          <Statistic.Countdown
            title="Trigger on finish"
            value={_now + 1000 * 5}
            format="HH:mm:ss.SSS"
            start={start}
            now={_now}
            onFinish={() => {
              Message.info({
                content: 'Finish!',
              });
              setStart(false);
            }}
          />
          <Button
            onClick={() => {
              setStart(true);
            }}
            style={{ display: 'block', marginTop: 10 }}
            type="primary"
          >
            Start
          </Button>
        </div>
      </Space>
    </Space>
  );
}
```

## 时间格式

时间显示。通过 dayjs 来进行时间格式化，`format` 即 dayjs 的 format。

```jsx live
function Demo() {
  return <Statistic title="CreatedTime" value={1554869813383} format="YYYY/MM/DD HH:mm:ss" />;
};
```

## 加载中

通过 `loading` 可以控制是否显示加载中状态。

```jsx live

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Switch checked={loading} onChange={setLoading} />
        <Typography.Text style={{ margin: '0 10px' }}>Loading</Typography.Text>
      </div>
      <Statistic title="Downloads" value={125670} groupSeparator loading={loading} />
    </div>
  );
}
```

## API
### Statistic

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|countUp|数字动态变大|boolean |`-`|-|
|groupSeparator|显示千位分割符|boolean |`-`|-|
|loading|数字是否加载中|boolean |`-`|2.20.0|
|countDuration|动态变大的过渡时间 (ms)|number |`2000`|-|
|countFrom|从什么数字开始动态变大|number |`0`|-|
|precision|数字精度|number |`-`|-|
|format|dayjs's format|string |`-`|-|
|renderFormat|自定义 render 函数。`formattedValue` 表示格式化后的值。|(value: StatisticProps['value'], formattedValue: string) => ReactNode |`-`|2.36.0|
|extra|在数值下展示额外内容|ReactNode |`-`|-|
|prefix|前缀|string \| ReactNode |`-`|-|
|suffix|后缀|string \| ReactNode |`-`|-|
|title|数值的标题|string \| ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|styleDecimal|数值小数部分的样式|CSSProperties |`-`|2.47.0|
|styleValue|数值的样式|CSSProperties |`-`|-|
|value|数值|string \| number \| Dayjs |`-`|-|

### Statistic.Countdown

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|start|是否开始倒计时，默认为 `true`，可以通过设置该值控制倒计时的时机|boolean |`true`|-|
|format|dayjs's format|string |`HH:mm:ss`|-|
|title|数值的标题|string \| ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|now|用于修正初始化时间显示不正确|number \| string \| Date \| Dayjs |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|styleValue|数值的样式|CSSProperties |`-`|-|
|value|倒计时的时间|number \| string \| Date \| Dayjs |`-`|-|
|onFinish|倒计时完成后触发的回调|() => void |`-`|-|
|renderFormat|自定义 render 函数。`valueDiff` 表示两个时间的时间差，`formattedDiff` 表示格式化后的时间差，|(valueDiff: number, formattedDiff: string) => ReactNode |`-`|2.36.0|

