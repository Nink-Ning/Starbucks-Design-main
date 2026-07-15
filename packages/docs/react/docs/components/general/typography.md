---
sidebar_position: 1
---

# 排版 Typography

用于展示标题、段落、文本内容。

## 组合使用

排版组件用于展示标题、段落、文本内容，这里展示了排版的组合使用。

```jsx live
function Demo() {
  return (
    <Typography style={{ marginTop: -40 }}>
      <Typography.Title>Design system</Typography.Title>
      <Typography.Paragraph>
        A design is a plan or specification for the construction of an object or system or for the implementation of an
        activity or process, or the result of that plan or specification in the form of a prototype, product or process.
        The verb to design expresses the process of developing a design.
      </Typography.Paragraph>
      <Typography.Paragraph>
        In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some
        engineering, coding, and graphic design) may also be considered
        <Typography.Text bold>to be a design activity.</Typography.Text>
      </Typography.Paragraph>
      <Typography.Title heading={2}>ArcoDesign</Typography.Title>
      <Typography.Paragraph>
        The ArcoDesign component library defines a set of default particle variables, and a custom theme is to
        <Typography.Text mark>customize</Typography.Text> and <Typography.Text underline>overwrite</Typography.Text> this variable list.
      </Typography.Paragraph>
      <Typography.Paragraph blockquote>
        A design is a plan or specification for the construction of an object or system or for the implementation of an
        activity or process, or the result of that plan or specification in the form of a <Typography.Text code>prototype</Typography.Text>
        <Typography.Text code>product</Typography.Text> or
        <Typography.Text code>process</Typography.Text>. The verb to design expresses the process of developing a design.
      </Typography.Paragraph>
      <Typography.Paragraph mark underline delete>
        A design is a plan or specification for the construction of an object or system or for the implementation of an
        activity or process.
      </Typography.Paragraph>
      <Typography.Paragraph>
        <ul>
          <li>
            Architectural blueprints
            <ul>
              <li>Architectural blueprints</li>
            </ul>
          </li>
          <li>Engineering drawings</li>
          <li>Business processes</li>
        </ul>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <ol>
          <li>Architectural blueprints</li>
          <li>Engineering drawings</li>
          <li>Business processes</li>
        </ol>
      </Typography.Paragraph>
    </Typography>
  )
}
```

## 标题

展示不同级别的标题。

```jsx live
function Demo() {
  return (
    <Typography>
      <Typography.Title>H1. The Pragmatic Romanticism</Typography.Title>
      <Typography.Title heading={2}>H2. The Pragmatic Romanticism</Typography.Title>
      <Typography.Title heading={3}>H3. The Pragmatic Romanticism</Typography.Title>
      <Typography.Title heading={4}>H4. The Pragmatic Romanticism</Typography.Title>
      <Typography.Title heading={5}>H5. The Pragmatic Romanticism</Typography.Title>
      <Typography.Title heading={6}>H6. The Pragmatic Romanticism</Typography.Title>
    </Typography>
  )
}
```

## 文本

不同样式的文本以及超链接组件。

```jsx live
function Demo() {
  function Layout(props) {
    return React.Children.map(props.children, (child) => {
      return <div style={{ marginBottom: 10 }}>{child}</div>
    })
  }

  return (
    <Layout>
      <Typography.Text>Arco Design</Typography.Text>
      <Typography.Text type="secondary">Secondary</Typography.Text>
      <Typography.Text type="primary">Primary</Typography.Text>
      <Typography.Text type="success">Success</Typography.Text>
      <Typography.Text type="warning">Warning</Typography.Text>
      <Typography.Text type="error">Error</Typography.Text>
      <Typography.Text bold>Bold</Typography.Text>
      <Typography.Text disabled>Disabled</Typography.Text>
      <Typography.Text mark>Mark</Typography.Text>
      <Typography.Text underline>Underline</Typography.Text>
      <Typography.Text delete>Line through</Typography.Text>
      <Typography.Text code>Code snippet</Typography.Text>
    </Layout>
  )
}
```

## 段落

文本段落样式。

```jsx live
function Demo() {
  return (
    <Typography>
      <Typography.Title heading={5}>Default</Typography.Title>
      <Typography.Paragraph>
        A design is a plan or specification for the construction of an object or system or for the implementation of an
        activity or process, or the result of that plan or specification in the form of a prototype, product or process.
        The verb to design expresses the process of developing a design. In some cases, the direct construction of an
        object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may
        also be considered to be a design activity.
      </Typography.Paragraph>
      <Typography.Title heading={5}>Secondary</Typography.Title>
      <Typography.Paragraph type="secondary">
        A design is a plan or specification for the construction of an object or system or for the implementation of an
        activity or process, or the result of that plan or specification in the form of a prototype, product or process.
        The verb to design expresses the process of developing a design. In some cases, the direct construction of an
        object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may
        also be considered to be a design activity.
      </Typography.Paragraph>
      <Typography.Title heading={5}>Spacing default</Typography.Title>
      <Typography.Paragraph>
        A design is a plan or specification for the construction of an object or system or for the implementation of an
        activity or process, or the result of that plan or specification in the form of a prototype, product or process.
        The verb to design expresses the process of developing a design. In some cases, the direct construction of an
        object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may
        also be considered to be a design activity.
      </Typography.Paragraph>
      <Typography.Title heading={5}>Spacing close</Typography.Title>
      <Typography.Paragraph type="secondary" spacing="close">
        A design is a plan or specification for the construction of an object or system or for the implementation of an
        activity or process, or the result of that plan or specification in the form of a prototype, product or process.
        The verb to design expresses the process of developing a design.
      </Typography.Paragraph>
    </Typography>
  )
}
```

## 可交互

提供复制、编辑文本等功能。

```jsx live

function App() {
  const [str, setStr] = useState('Click the icon to edit this text.')
  return (
    <Typography>
      <Typography.Paragraph copyable>Click the icon to copy this text.</Typography.Paragraph>
      <Typography.Paragraph
        editable={{
          onChange: setStr
        }}
      >
        {str}
      </Typography.Paragraph>
      {[...new Array(6)].map((_, index) => {
        return (
          <Typography.Title editable heading={index + 1} style={{ margin: 0 }}>
            H{index + 1}. The Pragmatic Romanticism
          </Typography.Title>
        )
      })}
    </Typography>
  )
}
```

## 文本省略（推荐）

当文字内容超出容器后会自动显示省略号。当 `rows = 1` 时为单行省略，此时操作按钮默认不会展示，可以设置 `expandable = &#123; single: true }` 开启。

```jsx live
function App() {
  const defaultText =
    'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.'

  const [form] = Form.useForm()
  const [config, setConfig] = useState({
    disabled: false,
    expandable: true,
    expandableSingle: false,
    expanded: false,
    showTooltip: false
  })
  const [text, setText] = useState(defaultText)
  const [rows, setRows] = useState(1)

  return (
    <div>
      <Space align="start" size={120}>
        <Form
          form={form}
          initialValues={config}
          onValuesChange={(_, values) => setConfig(values)}
          style={{ width: '400px' }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          size="small"
        >
          <Form.Item label="展开/折叠" field="expanded" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="省略提示" field="showTooltip" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="展示操作按钮" field="expandable" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="展示操作按钮（单行）" field="expandableSingle" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="禁用省略" field="disabled" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="省略展示">
            <Space size="medium">
              <Button onClick={() => setRows(Math.max(1, rows - 1))}>row-</Button>
              <Button onClick={() => setRows(rows + 1)}>row+</Button>
            </Space>
          </Form.Item>
          <Form.Item label="文字操作">
            <Input.TextArea value={text} onChange={setText} />
          </Form.Item>
        </Form>
        <Descriptions
          column={1}
          title="当前配置"
          data={[
            ...Object.entries(config).map(([label, value]) => ({
              label,
              value: String(value)
            })),
            {
              label: 'rows',
              value: rows
            }
          ]}
          style={{ marginBottom: 20 }}
          labelStyle={{ paddingRight: 36 }}
        />
      </Space>

      <ResizeBox
        directions={['right']}
        style={{
          width: 500,
          minWidth: 100
        }}
      >
        <Typography.Ellipsis
          rows={rows}
          {...config}
          expandable={config.expandableSingle ? { single: true } : config.expandable}
          onExpand={(v) =>
            form.setFieldsValue({
              expanded: v
            })
          }
        >
          {text}
        </Typography.Ellipsis>
      </ResizeBox>
    </div>
  )
}
```

## 文本省略 - 操控按钮（推荐）

通过 `expandRender` 自定义操控按钮。

```jsx live
function App() {
  const text =
    'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.'

  const [expanded, setExpanded] = useState(true)

  const expandRender = (expanded) => {
    if (!expanded) {
      return <IconDoubleDown className="action-btn" />
    }
    return <IconDoubleUp className="action-btn" />
  }

  return (
    <div>
      <Typography.Ellipsis rows={4} expanded={expanded} expandRender={expandRender} onExpand={setExpanded}>
        {text}
      </Typography.Ellipsis>
    </div>
  )
}
```

## 省略（不推荐）

**不推荐使用 ellipsis 属性开启折叠，建议使用 Typography.Ellipsis 组件替代。**

在空间不足时省略多行文本内容。

**注意**：父元素 `flex` 模式下， 省略的 `Typography` 的 `ellipsis` 场景会收到影响，可以添加 `width: 100%` 使 `Typography` 充满整个父元素。

&lt;br/> **注意注意注意： 使用谷歌翻译页面导致页面白屏报错？**

组件用了 `React.Fragement` 导致的问题。React 原生的问题 （Issue 链接）。可以设置 `ellipsis.wrapper` 解决。比如 `ellipsis=&#123;&#123; wrapper: 'span' }}`。

```jsx live
function Demo() {
  const mockText =
    'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.'
  const mockTitle =
    ' A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process.'

  return (
    <div>
      <Typography.Title heading={4} ellipsis={{ wrapper: 'span' }}>
        {mockTitle}
      </Typography.Title>
      <Typography.Paragraph ellipsis={{ rows: 2, showTooltip: true, expandable: true, wrapper: 'span' }}>
        {mockText}
      </Typography.Paragraph>
      <Typography.Paragraph ellipsis={{ suffix: '---width: 100%', wrapper: 'span' }}>{mockTitle}</Typography.Paragraph>
    </div>
  )
}
```

## 省略受控（不推荐）

**不推荐使用 ellipsis 属性开启折叠，建议使用 Typography.Ellipsis 组件替代**

省略操作及相关配置受控案例

```jsx live
function Demo() {
  const defaultText = `A design is a plan or specification for the construction of an object or system or for the
implementation of an activity or process. A design is a plan or specification for the
construction of an object or system or for the implementation of an activity or process. `
  const defaultConfig = {
    ellipsisStr: '...'
  }

  const [config, setConfig] = useState(defaultConfig)
  const [rows, setRows] = useState(1)
  const [text, setText] = useState(defaultText)
  const { ellipsis, ellipsisStr, expandable, suffix } = config
  return (
    <div>
      <Space align="start" size={120}>
        <Form
          onValuesChange={(_, values) => setConfig(values)}
          style={{ width: '400px' }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          size="small"
        >
          <Form.Item label="超出省略" field="ellipsis" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="展开/折叠" field="expandable" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="省略号" field="ellipsisStr" initialValue={defaultConfig.ellipsisStr}>
            <Input />
          </Form.Item>
          <Form.Item label="suffix" field="suffix">
            <Input />
          </Form.Item>
          <Form.Item label="省略展示">
            <Space size="medium">
              <Button onClick={() => setRows(Math.max(1, rows - 1))}> row- </Button>
              <Button onClick={() => setRows(rows + 1)}> row+ </Button>
            </Space>
          </Form.Item>
          <Form.Item label="文字操作">
            <Button onClick={() => setText(text + defaultText)} type="primary">
              addText
            </Button>
          </Form.Item>
        </Form>
        <Descriptions
          column={1}
          title="当前配置"
          data={[
            ...Object.entries(config).map(([label, value]) => ({
              label,
              value: String(value)
            })),
            {
              label: 'rows',
              value: rows
            }
          ]}
          style={{ marginBottom: 20 }}
          labelStyle={{ paddingRight: 36 }}
        />
      </Space>

      <div>
        <Typography.Paragraph
          ellipsis={
            ellipsis
              ? {
                  rows: rows,
                  expandable,
                  suffix,
                  ellipsisStr,
                  wrapper: 'div'
                }
              : undefined
          }
        >
          {text}
        </Typography.Paragraph>
      </div>
    </div>
  )
}
```

## API

### Typography

| 参数名    | 描述     | 类型               | 默认值 |
| --------- | -------- | ------------------ | ------ |
| className | 节点类名 | string \| string[] | `-`    |
| style     | 节点样式 | CSSProperties      | `-`    |

### Typography.Title

| 参数名 | 描述 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| bold | 粗体 | boolean | `-` | - |
| code | 代码块样式 | boolean | `-` | - |
| delete | 删除线样式 | boolean | `-` | - |
| disabled | 禁用状态 | boolean | `-` | - |
| underline | 下划线样式 | boolean | `-` | - |
| type | 文本类型 | 'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' | `-` | - |
| className | 节点类名 | string \| string[] | `-` | - |
| ellipsis | 自动溢出省略（只支持字符串），具体参数配置看 EllipsisConfig。不推荐使用，建议 `Typography.Ellipsis` 替代 | boolean \| EllipsisConfig | `-` | - |
| heading | 标题级别，相当于 `h1` `h2` `h3` `h4` `h5` `h6` | 1 \| 2 \| 3 \| 4 \| 5 \| 6 | `1` | - |
| mark | 标记样式 | boolean \| &#123; color: string } | `-` | - |
| style | 节点样式 | CSSProperties | `-` | - |
| copyable | 开启复制功能 | \| boolean\| &#123;text?: string;onCopy?: (text: string, e) => void;icon?: ReactNode;tooltips?: [ReactNode, ReactNode];tooltipProps?: TooltipProps;} | `-` | `onCopy` params `e` in `2.31.0` |
| editable | 开启可编辑功能 | \| boolean\| &#123;editing?: boolean;tooltipProps?: TooltipProps;onStart?: (text, e) => void;onChange?: (text) => void;onEnd?: (text) => void;} | `-` | `onStart` params `e` in `2.31.0` |

### Typography.Paragraph

| 参数名 | 描述 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| blockquote | 长引用 | boolean | `-` | - |
| bold | 粗体 | boolean | `-` | - |
| code | 代码块样式 | boolean | `-` | - |
| delete | 删除线样式 | boolean | `-` | - |
| disabled | 禁用状态 | boolean | `-` | - |
| underline | 下划线样式 | boolean | `-` | - |
| spacing | 段落的的行高，长文本(大于5行)的时候推荐使用默认行高，短文本(小于等于3行)推荐使用 `close` 紧密的行高。 | 'default' \| 'close' | `default` | - |
| type | 文本类型 | 'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' | `-` | - |
| className | 节点类名 | string \| string[] | `-` | - |
| ellipsis | 自动溢出省略（只支持字符串），具体参数配置看 EllipsisConfig。不推荐使用，建议 `Typography.Ellipsis` 替代 | boolean \| EllipsisConfig | `-` | - |
| mark | 标记样式 | boolean \| &#123; color: string } | `-` | - |
| style | 节点样式 | CSSProperties | `-` | - |
| copyable | 开启复制功能 | \| boolean\| &#123;text?: string;onCopy?: (text: string, e) => void;icon?: ReactNode;tooltips?: [ReactNode, ReactNode];tooltipProps?: TooltipProps;} | `-` | `onCopy` params `e` in `2.31.0` |
| editable | 开启可编辑功能 | \| boolean\| &#123;editing?: boolean;tooltipProps?: TooltipProps;onStart?: (text, e) => void;onChange?: (text) => void;onEnd?: (text) => void;} | `-` | `onStart` params `e` in `2.31.0` |

### Typography.Text

| 参数名 | 描述 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| bold | 粗体 | boolean | `-` | - |
| code | 代码块样式 | boolean | `-` | - |
| delete | 删除线样式 | boolean | `-` | - |
| disabled | 禁用状态 | boolean | `-` | - |
| underline | 下划线样式 | boolean | `-` | - |
| type | 文本类型 | 'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' | `-` | - |
| className | 节点类名 | string \| string[] | `-` | - |
| ellipsis | 自动溢出省略（只支持字符串），具体参数配置看 EllipsisConfig。不推荐使用，建议 `Typography.Ellipsis` 替代 | boolean \| EllipsisConfig | `-` | - |
| mark | 标记样式 | boolean \| &#123; color: string } | `-` | - |
| style | 节点样式 | CSSProperties | `-` | - |
| copyable | 开启复制功能 | \| boolean\| &#123;text?: string;onCopy?: (text: string, e) => void;icon?: ReactNode;tooltips?: [ReactNode, ReactNode];tooltipProps?: TooltipProps;} | `-` | `onCopy` params `e` in `2.31.0` |
| editable | 开启可编辑功能 | \| boolean\| &#123;editing?: boolean;tooltipProps?: TooltipProps;onStart?: (text, e) => void;onChange?: (text) => void;onEnd?: (text) => void;} | `-` | `onStart` params `e` in `2.31.0` |

### EllipsisConfig

| 参数名 | 描述 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| cssEllipsis | 自动溢出省略（只支持字符串），在大量使用情况下建议开启提高性能。 | boolean | `-` | `2.36.0` 将默认值改为 `false` 并支持多行CSS省略。 |
| defaultExpanded | 默认展开 | boolean | `-` | `2.33.0` |
| expandable | 显示展开/折叠按钮 | boolean | `-` | - |
| expanded | 是否展开 | boolean | `-` | `2.33.0` |
| rows | 显示省略的行数 | number | `1` | - |
| ellipsisStr | 省略号 | string | `...` | - |
| suffix | 后缀 | string | `-` | - |
| showTooltip | 配置省略时的弹出框 | boolean \| &#123; type?: 'tooltip' \| 'popover'; props?: Record&lt;string, any&gt; } | `-` | - |
| expandNodes | 配置 折叠 / 展开 的元素 | ReactNode[] | `-` | - |
| onEllipsis | 在省略发生改变的时候触发，通常是窗口resize情况会触发。 | (isEllipsis: boolean) => void | `-` | - |
| onExpand | 在折叠/展开状态发生改变的时候触发，通常是点击折叠/展开按钮触发。 | (isExpand: boolean, e) => void | `-` | e in `2.27.0` |

### Typography.Ellipsis

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultExpanded | 默认展开 | boolean | `-` |
| disabled | 是否禁用省略功能 | boolean | `-` |
| expanded | 是否展开 | boolean | `-` |
| rows | 显示省略的行数 | number | `1` |
| className | 节点类名 | string \| string[] | `-` |
| expandable | 是否显示操控按钮。`2.61.0` 版本支持 `single` 属性 | boolean \| &#123; single?: boolean } | `true` |
| showTooltip | 是否显示弹出提示 | boolean \| TooltipProps | `-` |
| style | 节点样式 | CSSProperties | `-` |
| expandRender | 自定义渲染操控按钮 | (expanded: boolean) => ReactNode | `-` |
| onEllipsis | 当省略状态发生改变时触发，首次省略时也会触发 | (isEllipsis: boolean) => void | `-` |
| onExpand | 点击展开、折叠时触发 | (isExpand: boolean, ev: Event) => void | `-` |

## 关于超出省略

超出省略目前通过两种方式实现分别是 **js二分法计算截断值** 和 **CSS超出省略** 两种优缺点如下：

| 指标 | js二分法                  | CSS省略           |
| ---- | ------------------------- | ----------------- |
| 性能 | 差(二分法多次操作dom计算) | 好                |
| 功能 | 好                        | 差（只支持字符串) |

- 默认使用 **js二分法** 不断进行截断计算从而得到省略临界值，同时 `resize` 时还会多次触发重新计算。所以在大量使用对性能影响较大，但此方法不会在排版组件下插入额外样式dom。

- 开启 `ellipsis.cssEllipsis` 将通过 **CSS样式** 进行省略展示，对于大量使用场景下会有显著性能提高。但因为需要添加 `text-overflow` 样式，`.arco-typography` 节点下将会新增两个 `&lt;span/>` dom.

**注意 `2.36.0` 版本对超出省略进行重构优化，造成Breaking Change 主要如下：**

- 开启 `ellipsis.cssEllipsis` 时，为了添加 `text-overflow` 在排版组件下插入了额外样式 dom，造成 dom 结构变化。
- `ellipsis.cssEllipsis` 支持多行省略场景，并且默认值由 `true` 变为 `false` （规避升级后 dom 结构变化）。
