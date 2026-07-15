---
sidebar_position: 1
---

# 标签 Tag

用于信息的选择、筛选、分类。用户通过标签进行信息反馈和交互操作。

## 基础用法

标签的基础用法。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Tag>Default</Tag>
      <Tag>Tag 1</Tag>
      <Tag>Tag 2</Tag>
      <Tag icon={<IconCheckCircleFill />}>Complete</Tag>
    </Space>
  );
};
```

## 可关闭标签

可设置 `closable` 属性控制标签是否可关闭，可关闭标签可通过 `onClose` 事件执行一些关闭后操作。也可通过 `visible` 属性控制标签的显示隐藏。

```jsx live

function App() {
  const [visible, setVisible] = useState(true);

  function onClose() {
    setVisible(!visible);
  }

  return (
    <div>
      <Tag
        closable
        visible={visible}
        onClose={onClose}
        style={{ margin: '0 24px', }}
      >
        Tag
      </Tag>
      <Tag icon={<IconStar />} closable visible={visible} onClose={onClose}>
        Tag
      </Tag>
      <div
        style={{ marginTop: 24, }}
      >
        <Switch
          style={{ margin: '0 8px', }}
          size="small"
          checked={visible}
          onChange={onClose}
        />
        <Typography.Text>Toggle</Typography.Text>
      </div>
    </div>
  );
}
```

## 可选中

通过参数 `checkable`，可以实现点击选中的效果。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Tag checkable>Awesome</Tag>
      <Tag checkable color="red" defaultChecked>
        Toutiao
      </Tag>
      <Tag checkable color="arcoblue" defaultChecked>
        Lark
      </Tag>
    </Space>
  );
};
```

## 多色标签

我们提供多种预设色彩的标签样式，通过 `color` 设置不同颜色。如果预设值不能满足你的需求，`color` 字段也可以设置自定义色值。

```jsx live
function Demo() {
  const COLORS = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'purple',
    'pinkpurple',
    'magenta',
    'gray',
  ];
  const COLORS_CUSTOM = [
    '#f53f3f',
    '#7816ff',
    '#00b42a',
    '#165dff',
    '#ff7d00',
    '#eb0aa4',
    '#7bc616',
    '#86909c',
    '#b71de8',
    '#0fc6c2',
    '#ffb400',
    '#168cff',
    '#ff5722',
  ];

  return (
    <div>
      {COLORS.map((color, i) => (
        <Tag key={i} closable color={color} style={{ margin: '0 16px 16px 0 ' }}>
          {color}
        </Tag>
      ))}
      <h3 style={{ color: 'var(--color-text-2)' }}>Custom Color</h3>
      {COLORS_CUSTOM.map((color, i) => (
        <Tag key={i} closable color={color} style={{ margin: '0 16px 16px 0 ' }}>
          {color}
        </Tag>
      ))}
    </div>
  );
};
```

## 动态编辑标签

可动态添加和删除标签。

```jsx live

function App() {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  function addTag() {
    if (inputValue) {
      tags.push(inputValue);
      setTags(tags);
      setInputValue('');
    }

    setShowInput(false);
  }

  function removeTag(removeTag) {
    const newTags = tags.filter((tag) => tag !== removeTag);
    setTags(newTags);
  }

  return (
    <Space size={20}>
      {tags.map((tag, index) => {
        return (
          <Tag
            key={tag}
            closable={index !== 0}
            onClose={() => removeTag(tag)}
          >
            {tag}
          </Tag>
        );
      })}
      {showInput ? (
        <Input
          autoFocus
          size="mini"
          value={inputValue}
          style={{ width: 84 }}
          onPressEnter={addTag}
          onBlur={addTag}
          onChange={setInputValue}
        />
      ) : (
        <Tag
          icon={<IconPlus />}
          style={{
            width: 84,
            backgroundColor: 'var(--color-fill-2)',
            border: '1px dashed var(--color-fill-3)',
            cursor: 'pointer',
          }}
          className="add-tag"
          tabIndex={0}
          onClick={() => setShowInput(true)}
          onKeyDown={e => {
            const keyCode = e.keyCode || e.which;
            if (keyCode === 13) { // enter
              setShowInput(true)
            }
          }}
        >
          Add Tag
        </Tag>
      )}
    </Space>
  );
}
```

## 不同尺寸

标签分为：小、中、大、巨大，可以在不同场景下选择合适按钮尺寸。推荐及默认尺寸为「中」。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Tag size="large" closable>
        Large
      </Tag>
      <Tag size="medium" closable>
        Medium
      </Tag>
      <Tag size="default" closable>
        default
      </Tag>
      <Tag size="small" closable>
        small
      </Tag>
    </Space>
  );
};
```

## 异步关闭

如果 `onClose` 返回一个 `Promise`，可以异步关闭标签，并且在未关闭时展示加载效果。

```jsx live
function Demo() {
  return (
    <Tag
      closable
      onClose={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() >= 0.5) {
              resolve();
            } else {
              Message.error('Close failed');
              reject();
            }
          }, 3000);
        });
      }}
    >
      Tag 1
    </Tag>
  );
};
```

## 带图标的标签

可通过设置 `icon` 在标签中加入图标。

```jsx live
function Demo() {
  return (
    <Space size="large">
      <Tag color="gray" icon={<IconGithub />}>
        Github
      </Tag>
      <Tag color="orangered" icon={<IconGitlab />}>
        Gitlab
      </Tag>
      <Tag color="blue" icon={<IconTwitter />}>
        Twitter
      </Tag>
      <Tag color="arcoblue" icon={<IconFacebook />}>
        Facebook
      </Tag>
    </Space>
  );
};
```

## 带边框的标签

通过参数 `bordered`，可以显示带边框的标签。

```jsx live
function Demo() {
  const COLORS = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'purple',
    'pinkpurple',
    'magenta',
    'gray',
  ];

  return (
    <Space wrap>
      <Tag bordered>Default</Tag>
      {COLORS.map((color, i) => (
        <Tag key={i} color={color} bordered>
          {color}
        </Tag>
      ))}
    </Space>
  );
};
```

## API

### Tag

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|checkable|是否支持选中|boolean |`-`|-|
|checked|是否选中（受控模式）|boolean |`-`|-|
|closable|是否可关闭标签|boolean |`-`|-|
|defaultChecked|是否默认选中|boolean |`-`|-|
|visible|设置标签显示隐藏|boolean |`-`|-|
|color|设置标签背景颜色|string |`-`|-|
|size|标签尺寸|'small' \| 'default' \| 'medium' \| 'large' |`default`|-|
|closeIcon|自定义关闭图标|ReactNode |`-`|-|
|icon|设置图标|ReactNode |`-`|-|
|bordered|是否显示边框|Boolean |`-`|2.26.0|
|className|节点类名|string \| string[] |`-`|-|
|onClose|关闭标签回调函数|(e) =&gt; Promise&lt;any&gt; \| void |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|onCheck|选中的回调|(checked: boolean) => void |`-`|-|

