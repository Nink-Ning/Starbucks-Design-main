---
sidebar_position: 1
---

# 步骤条 Steps

明示任务流程和当前完成程度，引导用户按照步骤完成任务。

## 基础用法

这是步骤条组件的基础用法。

```jsx live
function Demo() {
  return (
    <div>
      <Steps current={2} style={{ maxWidth: 780, margin: '0 auto' }}>
        <Steps.Step title="Succeeded" />
        <Steps.Step title="Processing" />
        <Steps.Step title="Pending" />
      </Steps>
      <Divider />
      <div
        style={{
          lineHeight: '140px',
          textAlign: 'center',
          color: 'var(--color-text-placeholder)',
        }}
      >
        Step 2 Content
      </div>
    </div>
  );
};
```

## 小型步骤条

通过`size`属性可以设置展示小型步骤条

```jsx live
function Demo() {
  return (
    <div>
      <Steps current={2} style={{ maxWidth: 780, margin: '0 auto' }} size="small">
        <Steps.Step title="Succeeded" />
        <Steps.Step title="Processing" />
        <Steps.Step title="Pending" />
      </Steps>
      <Divider />
      <div
        style={{
          lineHeight: '140px',
          textAlign: 'center',
          color: 'var(--color-text-placeholder)',
        }}
      >
        Step 2 Content
      </div>
    </div>
  );
};
```

## 展示描述信息

使用 `description` 可以添加描述信息。

```jsx live
function Demo() {
  return (
    <Steps current={2} style={{ maxWidth: 780, marginBottom: 40 }}>
      <Steps.Step title="Succeeded" description="This is a description" />
      <Steps.Step title="Processing" description="This is a description" />
      <Steps.Step title="Pending" description="This is a description" />
    </Steps>
  );
};
```

## 自定义图标

指定`icon`可以自定义图标显示。

```jsx live
function Demo() {
  return (
    <Steps current={2}>
      <Steps.Step icon={<IconHome />} title="Succeeded" description="This is a description" />
      <Steps.Step icon={<IconLoading />} title="Processing" description="This is a description" />
      <Steps.Step icon={<IconThumbUp />} title="Pending" description="This is a description" />
    </Steps>
  );
};
```

## 标签放置位置

标签描述文字放置的位置，默认 `horizontal` 水平放在图标右侧，可选 `vertical` 放在图标下方。

```jsx live
function Demo() {
  return (
    <div>
      <Steps labelPlacement="vertical" current={2} style={{ maxWidth: 780, margin: '0 auto' }}>
        <Steps.Step title="Succeeded" description="This is a description" />
        <Steps.Step title="Processing" description="This is a description" />
        <Steps.Step title="Pending" description="This is a description" />
      </Steps>
      <Divider />
      <div
        style={{
          lineHeight: '140px',
          textAlign: 'center',
          color: 'var(--color-text-placeholder)',
        }}
      >
        Step 2 Content
      </div>
    </div>
  );
};
```

## 步骤错误

通过指定参数 `status` 来指定错误状态。

```jsx live
function Demo() {
  return (
    <Steps current={2} status="error" style={{ maxWidth: 780, marginBottom: 40 }}>
      <Steps.Step title="Succeeded" description="This is a description" />
      <Steps.Step title="Processing" description="This is a description" />
      <Steps.Step title="Pending" description="This is a description" />
    </Steps>
  );
};
```

## 隐藏连接线

使用 `lineless` 可以使用无连接线模式。

```jsx live
function Demo() {
  return (
    <Steps lineless current={2} style={{ maxWidth: 780, marginBottom: 40 }}>
      <Steps.Step title="Succeeded" description="This is a description" />
      <Steps.Step title="Processing" description="This is a description" />
      <Steps.Step title="Pending" description="This is a description" />
    </Steps>
  );
};
```

## 竖直步骤条

竖直方向的步骤条。

```jsx live

function Demo() {
  const [current, setCurrent] = useState(1);

  function renderContent(step) {
    return (
      <div
        style={{
          width: '100%',
          height: 272,
          textAlign: 'center',
          background: 'var(--bg-color-container)',
          color: 'var(--color-text-placeholder)',
        }}
      >
        <div style={{ lineHeight: '200px' }}>Step{step} Content</div>

        <div>
          <Button
            type="secondary"
            disabled={current <= 1}
            onClick={() => setCurrent(current - 1)}
            style={{ paddingLeft: 8 }}
          >
            <IconLeft />
            Back
          </Button>
          <Button
            disabled={current >= 3}
            onClick={() => setCurrent(current + 1)}
            style={{ marginLeft: 20, paddingRight: 8 }}
            type="primary"
          >
            Next
            <IconRight />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        maxWidth: 780,
        padding: 40,
        background: 'var(--bg-color-secondarycontainer)',
      }}
    >
      <div
        style={{
          background: 'var(--bg-color-container)',
          padding: 24,
          height: 272,
          boxSizing: 'border-box',
        }}
      >
        <Steps direction="vertical" current={current} style={{ width: 170 }}>
          <Steps.Step title="Succeeded" description="This is a description" />
          <Steps.Step title="Processing" description="This is a description" />
          <Steps.Step title="Pending" description="This is a description" />
        </Steps>
      </div>
      <Divider type="vertical" style={{ display: "block", height: "auto" }}/>
      {renderContent(current)}
    </div>
  );
}
```

## 箭头步骤条

指定 `type: 'arrow'`， 可以使用箭头类型的步骤条。**注意**：仅支持水平步骤条。

```jsx live
function Demo() {
  return (
    <Steps type="arrow" current={2} style={{ maxWidth: 780 }}>
      <Steps.Step title="Succeeded" description="This is a description" />
      <Steps.Step title="Processing" description="This is a description" />
      <Steps.Step title="Pending" description="This is a description" />
    </Steps>
  );
};
```

## 迷你箭头步骤条

指定 `type: 'arrow', size: 'small'`， 可以使用迷你箭头类型的步骤条。仅支持水平步骤条。`description` 会被忽略。

```jsx live
function Demo() {
  return (
    <div>
      <Steps type="arrow" size="small" current={2} style={{ maxWidth: 780, marginBottom: 20 }}>
        <Steps.Step title="Succeeded" />
        <Steps.Step title="Processing" />
        <Steps.Step title="Pending" />
      </Steps>
      <Steps type="arrow" size="small" status="error" current={2} style={{ maxWidth: 780 }}>
        <Steps.Step title="Succeeded" />
        <Steps.Step title="Processing" />
        <Steps.Step title="Pending" />
      </Steps>
    </div>
  );
};
```

## 步骤切换

通过改变 `current` 参数，可以跳转到不同的步骤。

```jsx live

function Demo() {
  const [current, setCurrent] = useState(1);

  function renderContent(step) {
    return (
      <div
        style={{
          width: '100%',
          height: 200,
          textAlign: 'center',
          background: 'var(--bg-color-container)',
          color: 'var(--color-text-placeholder)',
        }}
      >
        <div style={{ lineHeight: '160px' }}>Step{step} Content</div>

        <div>
          <Button
            type="secondary"
            disabled={current <= 1}
            onClick={() => setCurrent(current - 1)}
            style={{ paddingLeft: 8 }}
          >
            <IconLeft />
            Back
          </Button>
          <Button
            disabled={current >= 3}
            onClick={() => setCurrent(current + 1)}
            style={{ marginLeft: 20, paddingRight: 8 }}
            type="primary"
          >
            Next
            <IconRight />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 780,
      }}
    >
      <Steps current={current}>
        <Steps.Step title="Succeeded" />
        <Steps.Step title="Processing" />
        <Steps.Step title="Pending" />
      </Steps>
      {renderContent(current)}
    </div>
  );
}
```

## 点状步骤条

指定 `type: 'dot'`， 可以使用点状的步骤条。
**注意**：水平步骤条的标签只可位于其下方，竖直步骤条的标签只可位于其右侧；

```jsx live
function Demo() {
  return (
    <div>
      <Steps type="dot" current={2} style={{ maxWidth: 780, marginBottom: 40 }}>
        <Steps.Step title="Succeeded" description="This is a description" />
        <Steps.Step title="Processing" description="This is a description" />
        <Steps.Step title="Pending" description="This is a description" />
      </Steps>
      <Steps type="dot" direction="vertical" current={2} style={{ maxWidth: 780 }}>
        <Steps.Step title="Succeeded" description="This is a description" />
        <Steps.Step title="Processing" description="This is a description" />
        <Steps.Step title="Pending" description="This is a description" />
      </Steps>
    </div>
  );
};
```

## 自定义节点

通过设置 `customDot` 可以自定义节点，可以给节点添加弹出或任意自定义操作。

```jsx live

function Demo() {
  const [current, setCurrent] = useState(2);

  const customDot = (dot, { status, index, title, description }) => {
    const visible = index === current;
    return (
      <Popover popupVisible={visible} content={<span>Step: {index}</span>}>
        {dot}
      </Popover>
    );
    return dot;
  };

  return (
    <div style={{ overflow: 'hidden', textAlign: 'center' }}>
      <Steps type="dot" current={current} customDot={customDot} style={{ marginTop: 20 }}>
        <Steps.Step title="Succeeded" description="This is a description" />
        <Steps.Step title="Processing" description="This is a description" />
        <Steps.Step title="Pending" description="This is a description" />
      </Steps>
      <div style={{ marginTop: 40 }}>
        <Button
          type="secondary"
          disabled={current <= 1}
          onClick={() => setCurrent(current - 1)}
          style={{ paddingLeft: 8 }}
        >
          <IconLeft />
          Back
        </Button>
        <Button
          disabled={current >= 3}
          onClick={() => setCurrent(current + 1)}
          style={{ marginLeft: 20, paddingRight: 8 }}
          type="primary"
        >
          Next
          <IconRight />
        </Button>
      </div>
    </div>
  );
}
```

## 可点击切换步骤

设置 `onChange` 之后，步骤条支持点击切换步骤。

```jsx live

function Demo() {
  const [current, setCurrent] = useState(1);
  return (
    <div>
      <Steps type="arrow" current={current} onChange={setCurrent} style={{ marginBottom: 20 }}>
        <Steps.Step title="Succeeded" description="This is a description" />
        <Steps.Step title="Processing" description="This is a description" />
        <Steps.Step title="Pending" description="This is a description" />
      </Steps>
      <Steps current={current} onChange={setCurrent} direction="vertical">
        <Steps.Step title="Succeeded" description="This is a description" />
        <Steps.Step title="Processing" description="This is a description" />
        <Steps.Step title="Pending" description="This is a description" />
      </Steps>
    </div>
  );
}
```

## 导航步骤条

导航类型的步骤条。

```jsx live

function Demo() {
  const [current, setCurrent] = useState(1);
  return (
    <div>
      <Steps
        type="navigation"
        current={current}
        onChange={setCurrent}
        style={{ width: 780, marginBottom: 60 }}
      >
        <Steps.Step title="Succeeded" />
        <Steps.Step title="Processing" />
        <Steps.Step title="Pending" />
      </Steps>
      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={setCurrent}
        style={{ width: 780, marginBottom: 60 }}
      >
        <Steps.Step title="Succeeded" />
        <Steps.Step title="Processing" />
        <Steps.Step title="Pending" />
      </Steps>
      <Steps type="navigation" current={current} onChange={setCurrent} style={{ width: 780 }}>
        <Steps.Step title="Succeeded" description="This is a description" />
        <Steps.Step title="Processing" description="This is a description" />
        <Steps.Step title="Pending" description="This is a description" />
      </Steps>
    </div>
  );
}
```

## API

### Steps

|参数名|描述|类型|默认值|
|---|---|---|---|
|lineless|无连接线模式|boolean |`-`|
|current|当前步数|number |`1`|
|direction|显示方向|'vertical' \| 'horizontal' |`horizontal`|
|labelPlacement|标签描述文字放置的位置，默认 `horizontal` 水平放在图标右侧，可选 `vertical` 放在图标下方|'horizontal' \| 'vertical' |`horizontal`|
|size|步骤条的尺寸|'default' \| 'small' |`default`|
|status|当前步数的节点状态|'wait' \| 'process' \| 'finish' \| 'error' |`-`|
|type|节点样式类型|'default' \| 'arrow' \| 'dot' \| 'navigation' |`default`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|customDot|自定义步骤条节点 ，不支持箭头模式|(IconDot: ReactNode, stepConfig: CustomDotRecord) => ReactNode |`-`|
|onChange|点击步骤切换的回调，设置这个属性后，步骤条可点击切换。|(current: number, id: any) => void |`-`|

### Steps.Step

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|disabled|当前步骤点击被禁用|boolean |`-`|-|
|status|节点状态|'wait' \| 'process' \| 'finish' \| 'error' |`-`|-|
|description|节点描述|string \| ReactNode |`-`|-|
|title|节点标题|string \| ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|2.11.0|
|id|指定节点的 ID，将在 onChange 回调中作为参数。|any |`-`|-|
|style|节点样式|CSSProperties |`-`|2.11.0|
|onClick|点击回调|(index: number, id: any, e) => void |`-`|`e` in `2.40.0`|

### CustomDotRecord

```js
export type CustomDotRecord = {
  index: number;
  status: string;
  title: ReactNode;
  description: ReactNode;
};
```
