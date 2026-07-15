---
sidebar_position: 1
---

# 菜单 Menu

收纳、排列并展示一系列选项的列表。

## 顶部导航菜单

设置 `mode` 为 `horizontal` 时，使用水平菜单。

```jsx live
function App() {
  return (
    <div className="menu-demo">
      <Menu mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item
          key="0"
          style={{ padding: 0, marginRight: 38, }}
          disabled
        >
          <div
            style={{
              width: 80,
              height: 30,
              borderRadius: 2,
              background: 'var(--color-fill-3)',
              cursor: 'text',
            }}
          />
        </Menu.Item>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Solution</Menu.Item>
        <Menu.Item key="3">Cloud Service</Menu.Item>
        <Menu.Item key="4">Cooperation</Menu.Item>
      </Menu>
    </div>
  );
}
```

## 深色模式导航

通过 `theme` 指定主题，分为 `light` 和 `dark` 两种。

```jsx live
function App() {
  return (
    <div className="menu-demo">
      <Menu mode="horizontal" theme="dark" defaultSelectedKeys={['1']}>
        <Menu.Item key="0" style={{ padding: 0, marginRight: 38 }} disabled>
          <div
            style={{
              width: 80,
              height: 30,
              background: 'var(--color-fill-3)',
              cursor: 'text',
            }}
          />
        </Menu.Item>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Solution</Menu.Item>
        <Menu.Item key="3">Cloud Service</Menu.Item>
        <Menu.Item key="4">Cooperation</Menu.Item>
      </Menu>
    </div>
  );
}
```

## 缩起内嵌菜单

通过 `collapse` 来指定菜单收起。通过 `renderItemInTooltip` 指定菜单收起时，`Tooltip` 中展示的菜单项内容。

```jsx live

function App() {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="menu-demo">
      <Button
        style={{
          padding: '0 12px',
          height: 30,
          lineHeight: '30px',
          marginBottom: 4,
        }}
        type="primary"
        onClick={() => setCollapse(!collapse)}
      >
        {collapse ? <IconMenuUnfold /> : <IconMenuFold />}
      </Button>
      <Menu
        style={{ width: 200, borderRadius: 4 }}
        theme="dark"
        collapse={collapse}
        defaultOpenKeys={['0']}
        defaultSelectedKeys={['0_2']}
      >
        <Menu.SubMenu
          key="0"
          title={
            <>
              <IconApps /> Navigation 1
            </>
          }
        >
          <Menu.Item key="0_0">Menu 1</Menu.Item>
          <Menu.Item key="0_1">Menu 2</Menu.Item>
          <Menu.Item key="0_2">Menu 3</Menu.Item>
          <Menu.Item key="0_3">Menu 4</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="1"
          title={
            <>
              <IconBug /> Navigation 2
            </>
          }
        >
          <Menu.Item key="1_0">Menu 1</Menu.Item>
          <Menu.Item key="1_1">Menu 2</Menu.Item>
          <Menu.Item key="1_2">Menu 3</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="2"
          title={
            <>
              <IconBulb /> Navigation 3
            </>
          }
        >
          <Menu.Item key="2_0">Menu 1</Menu.Item>
          <Menu.Item key="2_1">Menu 2</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item renderItemInTooltip={() => 'NAVIGATION-4'}>
          <IconBook /> Navigation 4
        </Menu.Item>
      </Menu>
    </div>
  );
}
```

## 内嵌菜单

菜单内可以嵌入多个子项，通过 `defaultOpenKeys` 可以设置默认打开的子项。

```jsx live
function Demo() {
  return (
    <div className="menu-demo" style={{ height: 600 }}>
      <Menu
        style={{ width: 200, height: '100%' }}
        hasCollapseButton
        defaultOpenKeys={['0']}
        defaultSelectedKeys={['0_1']}
      >
        <Menu.SubMenu
          key="0"
          title={
            <>
              <IconApps /> Navigation 1
            </>
          }
        >
          <Menu.Item key="0_0">Menu 1</Menu.Item>
          <Menu.Item key="0_1">Menu 2</Menu.Item>
          <Menu.Item key="0_2" disabled>
            Menu 3
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="1"
          title={
            <>
              <IconBug /> Navigation 2
            </>
          }
        >
          <Menu.Item key="1_0">Menu 1</Menu.Item>
          <Menu.Item key="1_1">Menu 2</Menu.Item>
          <Menu.Item key="1_2">Menu 3</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="2"
          title={
            <>
              <IconBulb /> Navigation 3
            </>
          }
        >
          <Menu.ItemGroup key="2_0" title="Menu Group 1">
            <Menu.Item key="2_0_0">Menu 1</Menu.Item>
            <Menu.Item key="2_0_1">Menu 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="2_1" title="Menu Group 1">
            <Menu.Item key="2_1_0">Menu 3</Menu.Item>
            <Menu.Item key="2_1_1">Menu 4</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};
```

## 不同大小菜单

通过 `style` 自由指定菜单的宽度和菜单项的高度。

```jsx live

function App() {
  const [width, setWidth] = useState(240);
  return (
    <div className="menu-demo" style={{ height: 600 }}>
      <Slider
        style={{ width: 320, marginBottom: 24 }}
        value={width}
        onChange={(value) => setWidth(value)}
        step={10}
        min={160}
        max={400}
      />
      <Menu
        style={{ width: width, height: 'calc(100% - 28px)' }}
        hasCollapseButton
        defaultOpenKeys={['0']}
        defaultSelectedKeys={['0_1']}
      >
        <Menu.SubMenu
          key="0"
          title={
            <>
              <IconApps /> Navigation 1
            </>
          }
        >
          <Menu.Item key="0_0">Menu 1</Menu.Item>
          <Menu.Item key="0_1">Menu 2</Menu.Item>
          <Menu.Item key="0_2" disabled>
            Menu 3
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="1"
          title={
            <>
              <IconBug /> Navigation 2
            </>
          }
        >
          <Menu.Item key="1_0">Menu 1</Menu.Item>
          <Menu.Item key="1_1">Menu 2</Menu.Item>
          <Menu.Item key="1_2">Menu 3</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="2"
          title={
            <>
              <IconBulb /> Navigation 3
            </>
          }
        >
          <Menu.Item key="2_0">Menu 1</Menu.Item>
          <Menu.Item key="2_1">Menu 2</Menu.Item>
          <Menu.Item key="2_2">Menu 3</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}
```

## 悬浮菜单

指定 `mode` 为 `pop` 可以使用悬浮菜单。

```jsx live
function Demo() {
  return (
    <div className="menu-demo-round" style={{ height: 600 }}>
      <Menu style={{ width: 200 }} mode="pop" hasCollapseButton>
        <Menu.Item key="0">
          <IconApps />
          Navigation 1
        </Menu.Item>
        <Menu.SubMenu
          key="1"
          title={
            <>
              <IconRobot />
              Navigation 2
            </>
          }
        >
          <Menu.Item key="1_0">Beijing</Menu.Item>
          <Menu.Item key="1_1">Shanghai</Menu.Item>
          <Menu.Item key="1_2">Guangzhou</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="2"
          title={
            <>
              <IconBulb />
              Navigation 3
            </>
          }
        >
          <Menu.Item key="2_0">Wuhan</Menu.Item>
          <Menu.Item key="2_1">Chengdu</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="3">
          <IconSafe />
          Navigation 4
        </Menu.Item>
        <Menu.Item key="4">
          <IconFire />
          Navigation 5
        </Menu.Item>
      </Menu>
    </div>
  );
};
```

## 悬浮按钮菜单

指定 `mode` 为 `popButton` 使用按钮组样式的悬浮菜单。

```jsx live

function App() {
  const renderMenu = () => {
    return (
      <Menu
        style={{ marginBottom: -4 }}
        mode="popButton"
        tooltipProps={{ position: 'left' }}
        hasCollapseButton
      >
        <Menu.Item key="1">
          <IconBug />
          Bugs
        </Menu.Item>
        <Menu.Item key="2">
          <IconBulb />
          Ideas
        </Menu.Item>
      </Menu>
    );
  };

  const [popupVisibleOne, setPopupVisibleOne] = useState(false);
  const [popupVisibleTwo, setPopupVisibleTwo] = useState(false);
  return (
    <div className="menu-demo menu-demo-button">
      <Trigger
        popup={renderMenu}
        trigger={['click', 'hover']}
        clickToClose
        position="top"
        onVisibleChange={(v) => setPopupVisibleOne(v)}
      >
        <div className={`button-trigger ${popupVisibleOne ? 'button-trigger-active' : ''}`}>
          {popupVisibleOne ? <IconClose /> : <IconMessage />}
        </div>
      </Trigger>

      <Trigger
        popup={renderMenu}
        trigger={['click', 'hover']}
        clickToClose
        position="top"
        onVisibleChange={(v) => setPopupVisibleTwo(v)}
      >
        <div className={`button-trigger ${popupVisibleTwo ? 'button-trigger-active' : ''}`}>
          {popupVisibleTwo ? <IconClose /> : <IconMessage />}
        </div>
      </Trigger>
    </div>
  );
}
```

## API

### Menu

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|accordion|开启手风琴效果|boolean |`-`|-|
|autoOpen|默认展开所有多级菜单|boolean |`-`|-|
|autoScrollIntoView|是否自动滚动选中项目到可见区域|boolean |`-`|-|
|collapse|是否水平折叠收起菜单|boolean |`-`|-|
|hasCollapseButton|是否内置折叠按钮|boolean |`-`|-|
|selectable|菜单选项是否可选|boolean |`true`|-|
|levelIndent|层级之间的缩进量|number |`-`|-|
|mode|菜单类型，目前支持垂直（vertical）、水平菜单（horizontal）、弹出（pop）|'vertical' \| 'horizontal' \| 'pop' \| 'popButton' |`vertical`|-|
|theme|菜单风格|'light' \| 'dark' |`light`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultOpenKeys|初始展开的子菜单 key 数组|string[] |`-`|-|
|defaultSelectedKeys|初始选中的菜单项 key 数组|string[] |`-`|-|
|ellipsis|水平菜单是否自动溢出省略|\| boolean\| &#123;text?: ReactNode;} |`true`|2.24.0|
|icons|用于定制图标|&#123;horizontalArrowDown?: ReactNode \| null;popArrowRight?: ReactNode \| null;collapseDefault?: ReactNode \| null;collapseActive?: ReactNode \| null;} |`-`|-|
|openKeys|展开的子菜单 key 数组（受控模式）|string[] |`-`|-|
|scrollConfig|滚动到可见区域的配置项，接收所有scroll-into-view-if-needed的参数|&#123; [key: string]: any } |`-`|-|
|selectedKeys|选中的菜单项 key 数组（受控模式）|string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|tooltipProps|弹出模式下可接受所有 `ToolTip` 的 `Props`|Partial&lt;TooltipProps&gt; |`-`|-|
|triggerProps|弹出模式下可接受所有 `Trigger` 的 `Props`|Partial&lt;TriggerProps&gt; |`-`|-|
|onClickMenuItem|点击菜单项的回调|(key: string, event, keyPath: string[]) => any |`-`|`event` in 2.15.0, `keyPath` in 2.19.0|
|onClickSubMenu|点击子菜单标题的回调|(key: string, openKeys: string[], keyPath: string[]) => void |`-`|`keyPath` in 2.19.0|
|onCollapseChange|折叠状态改变时的回调|(collapse: boolean) => void |`-`|-|
|onEllipsisChange|水平菜单自动超出省略发生变化时的回调|(status: &#123; lastVisibleIndex: number; overflowNodes: ReactNode[] }) => void |`-`|2.57.0|

### Menu.SubMenu

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|selectable|是否将多级菜单头也作为一个菜单项，支持点击选中等状态。|boolean |`-`|-|
|key|唯一标志|string  **(必填)**|`-`|-|
|title|子菜单的标题|string \| ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|triggerProps|弹出模式下可接受所有 `Trigger` 的 `Props`|Partial&lt;TriggerProps&gt; |`-`|2.19.0|
|popup|是否强制使用弹出模式，`level` 表示当前子菜单的层级|boolean \| ((level: number) => boolean) |`-`|2.8.0|

### Menu.ItemGroup

|参数名|描述|类型|默认值|
|---|---|---|---|
|title|菜单组的标题|string \| ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### Menu.Item

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|disabled|菜单项禁止选中|boolean |`-`|-|
|key|唯一标志|string  **(必填)**|`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|wrapper|配置最外层标签，可以是 html 标签或是组件|string \| React.FC&lt;any&gt; \| React.ComponentClass&lt;any&gt; |`div`|2.16.0|
|renderItemInTooltip|菜单折叠时，指定在 Tooltip 中展示的菜单项节点|() => ReactNode |`-`|2.51.0|

