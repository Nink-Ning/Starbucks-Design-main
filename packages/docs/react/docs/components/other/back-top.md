---
sidebar_position: 1
---

# 返回顶部 BackTop

可一键返回顶部的按钮。

## 基础用法

当滚动到一定高度的时候，在右下角会出现一个返回顶部的按钮。

```jsx live
function Demo() {
  return (
    <div style={{ position: 'relative', padding: '8px 12px' }}>
      <BackTop
        visibleHeight={30}
        style={{ position: 'absolute' }}
        target={() => document.getElementById('custom_backtop0')}
      />
      <Typography.Paragraph>
        The button will appear in the bottom corner of the scrolling area
      </Typography.Paragraph>
      <div
        id="custom_backtop0"
        style={{ height: 300, overflow: 'auto' }}
      >
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
      </div>
    </div>
  );
};
```

## 自定义按钮

可以自定义返回顶部的按钮。

```jsx live
function Demo() {
  return (
    <div style={{ position: 'relative', padding: '8px 12px' }}>
      <BackTop
        style={{ position: 'absolute' }}
        visibleHeight={30}
        target={() => document.getElementById('custom_backtop')}
      >
        <Button
          type="primary"
          iconOnly
          style={{ width: 40, height: 40 }}
        >
          UP
        </Button>
      </BackTop>
      <div
        id="custom_backtop"
        style={{ height: 300, overflow: 'auto' }}
      >
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
      </div>
    </div>
  );
};
```

## 滚动类型和滚动时间

当然，我们提供了更丰富的功能可供使用，你可以通过指定 `easing` 和 `duration` 来指定滚动到顶部的过度效果和滚动时间。

```jsx live
function Demo() {
  const easingTypes = [
    'linear',
    'quadIn',
    'quadOut',
    'quadInOut',
    'cubicIn',
    'cubicOut',
    'cubicInOut',
    'quartIn',
    'quartOut',
    'quartInOut',
    'quintIn',
    'quintOut',
    'quintInOut',
    'sineIn',
    'sineOut',
    'sineInOut',
    'bounceIn',
    'bounceOut',
    'bounceInOut',
  ];

  const [easing, setEasing] = useState('linear');
  const [duration, setDuration] = useState(200);
  return (
    <div>
      <Space size={10} style={{ margin: 12 }}>
        <Typography.Text>
          Easing
        </Typography.Text>
        <Select
          onChange={setEasing}
          defaultValue={easing}
          style={{ width: 200 }}
        >
          {easingTypes.map((easing) => (
            <Select.Option key={easing} value={easing}>
              {easing}
            </Select.Option>
          ))}
        </Select>
        <Typography.Text>
          Time
        </Typography.Text>
        <Input
          onChange={setDuration}
          style={{ width: 200 }}
          value={duration}
          placeholder="Please enter the easing time"
        />
      </Space>
      <div
        style={{ position: 'relative' }}
      >
        <BackTop
          easing={easing}
          duration={duration}
          style={{
            position: 'absolute',
            right: 60,
            bottom: 60,
          }}
          visibleHeight={30}
          target={() => document.getElementById('custom_backtop2')}
        >
          <div className="custom-backtop" tabIndex={0} role="button" aria-label="scroll to top">
            <IconCaretUp />
            <br />
            TOP
          </div>
        </BackTop>
        <div
          id="custom_backtop2"
          style={{
            height: 300,
            overflow: 'auto',
            padding: '8px 12px',
          }}
        >
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
        </div>
      </div>
    </div>
  );
}
```

## API

### BackTop

|参数名|描述|类型|默认值|
|---|---|---|---|
|duration|滚动到顶部的时间。|number |`400`|
|visibleHeight|当滚动到这个高度时，显示返回顶部按钮。|number |`400`|
|easing|滚动到顶部的缓动方式类型, 所有类型：easing。|string |`quartOut`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|onClick|点击返回顶部时的回调函数。|() => void |`-`|
|target|设置需要监听其滚动事件的元素，值为一个返回对应 `DOM` 元素的函数。|() => HTMLElement \| Window |`() => window`|
