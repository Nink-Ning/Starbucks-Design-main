---
sidebar_position: 1
---

# 下拉菜单 Dropdown

页面上的命令过多时，可将备选命令收纳到向下展开的浮层容器中。

## 基础用法

基础下拉菜单。

```jsx live
function Demo() {
  const dropList = (
    <Menu>
      <Menu.Item key="1">Beijing</Menu.Item>
      <Menu.Item key="2">Shanghai</Menu.Item>
      <Menu.Item key="3">Guangzhou</Menu.Item>
    </Menu>
  );

  return (
    <Space className="dropdown-demo">
      <Dropdown droplist={dropList} position="bl">
        <Button type="text">
          Hover me <IconDown />
        </Button>
      </Dropdown>

      <Dropdown droplist={dropList} position="bl" disabled>
        <Button type="text">
          Hover me <IconDown />
        </Button>
      </Dropdown>
    </Space>
  );
}
```

## 弹出方向

通过 `position` 支持指定 6 种弹出方位，分别是：`top: 向上`, `tl: 左上`, `tr: 右上`, `bottom: 下方`, `bl: 左下(默认)`, `br: 右下`。

```jsx live
function Demo() {
  const positions = ['bl', 'bottom', 'br', 'tl', 'top', 'tr'];
  const descriptions = ['BottomLeft', 'BottomCenter', 'BottomRight', 'TopLeft', 'Top', 'TopRight'];

  return (
    <Space size="large" className="dropdown-demo">
      {positions.map((position, index) => (
        <Dropdown
          key={index}
          position={position}
          droplist={
            <Menu>
              <Menu.Item key="1">Menu Item 1</Menu.Item>
              <Menu.Item key="2">Menu Item 2</Menu.Item>
              <Menu.Item key="3">Menu Item 3</Menu.Item>
            </Menu>
          }
        >
          <Button type="secondary">{descriptions[index]}</Button>
        </Dropdown>
      ))}
    </Space>
  );
};
```

## 其他元素

设置 Menu 禁用项和插入分割线。

```jsx live
function Demo() {
  const dropList = (
    <Menu>
      <Menu.Item key="1">Beijing</Menu.Item>
      <Menu.Item key="2">Shanghai</Menu.Item>
      <Menu.Item key="3">Guangzhou</Menu.Item>
      <Divider style={{ margin: '4px 0' }} />
      <Menu.Item key="4" disabled>
        Shenzhen
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="dropdown-demo">
      <Dropdown droplist={dropList} position="br">
        <Button type="text">
          Hover
          <IconDown />
        </Button>
      </Dropdown>
    </div>
  );
}
```

## 触发方式

通过 `trigger` 指定触发方式。

```jsx live
function Demo() {
  const dropList = (
    <Menu>
      <Menu.Item key="1">Beijing</Menu.Item>
      <Menu.Item key="2">Shanghai</Menu.Item>
      <Menu.Item key="3">Guangzhou</Menu.Item>
    </Menu>
  );

  return (
    <Space size="large" className="dropdown-demo">
      <Dropdown droplist={dropList} position="br">
        <Button type="text">
          Hover
          <IconDown />
        </Button>
      </Dropdown>
      <Dropdown droplist={dropList} trigger="click" position="br">
        <Button type="text">
          Click
          <IconDown />
        </Button>
      </Dropdown>
    </Space>
  );
}
```

## 触发事件

通过 `Menu.onClickMenuItem` 来为菜单指定点击菜单项时触发的回调函数。

```jsx live
function Demo() {
  const dropList = (
    <Menu onClickMenuItem={(key) => Message.info(`You clicked ${key}`)}>
      <Menu.Item key="Beijing">Beijing</Menu.Item>
      <Menu.Item key="Shanghai">Shanghai</Menu.Item>
      <Menu.Item key="Guangzhou">Guangzhou</Menu.Item>
    </Menu>
  );

  return (
    <div className="dropdown-demo">
      <Dropdown droplist={dropList} position="bl" triggerProps={{ autoAlignPopupWidth: true }}>
        <Button type="text">
          Hover me and click an item <IconDown />
        </Button>
      </Dropdown>
    </div>
  );
}
```

## 按钮下拉框

使用 `&lt;Dropdown.Button>` 可以使用右边是额外的相关功能菜单的按钮。

```jsx live
function Demo() {
  const dropList = (
    <Menu>
      <Menu.Item key="1">Save now</Menu.Item>
      <Menu.Item key="2">Save and Publish</Menu.Item>
    </Menu>
  );

  return (
    <Space size="large" className="dropdown-demo">
      <Dropdown.Button type="secondary" droplist={dropList}>
        Publish
      </Dropdown.Button>
      <Dropdown.Button type="secondary" droplist={dropList} disabled>
        Disabled
      </Dropdown.Button>
      <Dropdown.Button type="primary" droplist={dropList} icon={<IconDown />}>
        Publish
      </Dropdown.Button>
      <Dropdown.Button
        type="primary"
        droplist={dropList}
        buttonsRender={([leftButton, rightButton]) => [
          <Tooltip content="Tooltip">{leftButton}</Tooltip>,
          React.cloneElement(rightButton, {
            loading: true,
          }),
        ]}
      >
        With Tooltip
      </Dropdown.Button>
    </Space>
  );
};
```

## 多级菜单

带有多级菜单的下拉框。

```jsx live
function Demo() {
  const data = [
    ['Beijing', ['Haidian', 'Chaoyang', 'Daxing']],
    ['Shanghai', ['Pudong', 'Huangpu', 'Xuhui']],
    ['Guangzhou', ['Baiyun', 'Tianhe', 'Fanyu']],
    ['Shenzhen', ['Futian', 'Luohu', 'Nanshan']],
  ];
  const dropList = (
    <Menu>
      {data.map((city, outerIndex) => {
        if (city.length > 1) {
          const districts = city[1];
          return (
            <Menu.SubMenu key={outerIndex} title={<span>{city[0]}</span>}>
              {districts.map((district, innerIndex) => {
                return (
                  <Menu.Item key={`${outerIndex}_${innerIndex}`}>{districts[innerIndex]}</Menu.Item>
                );
              })}
            </Menu.SubMenu>
          );
        }

        return <Menu.Item key={outerIndex}>{city[0]}</Menu.Item>;
      })}
    </Menu>
  );

  return (
    <div className="dropdown-demo">
      <Dropdown trigger="click" droplist={dropList} position="bl">
        <Button type="text">
          Click
          <IconDown />
        </Button>
      </Dropdown>
    </div>
  );
}
```

## 隐藏菜单

通过 `popupVisible` 和 `onVisibleChange` 控制下拉框的展开和收起。具体 `onVisibleChange` 的触发时机可查看Trigger组件文档。
如果 `droplist` 是 `Menu`，可以通过在 `onClickMenuItem` 中返回 `false` 来避免菜单自动隐藏。

```jsx live
function Demo() {
  const [popupVisible, setPopupVisible] = useState(false);
  const refMenuItemClicked = useRef(null);

  return (
    <Space size="large">
      <Dropdown
        droplist={
          <Menu
            onClickMenuItem={(key) => {
              refMenuItemClicked.current = key;
            }}
          >
            <Menu.Item key="1">Won't close the menu</Menu.Item>
            <Menu.Item key="2">Will close the menu</Menu.Item>
          </Menu>
        }
        trigger="click"
        position="bl"
        popupVisible={popupVisible}
        onVisibleChange={(visible) => {
          if (refMenuItemClicked.current === null || refMenuItemClicked.current === '2') {
            setPopupVisible(visible);
          }

          refMenuItemClicked.current = null;
        }}
      >
        <Button type="text">
          Click
          <IconDown />
        </Button>
      </Dropdown>
      <Dropdown
        droplist={
          <Menu
            onClickMenuItem={(key) => {
              if (key === '1') {
                return false;
              }
            }}
          >
            <Menu.Item key="1">Return false in onClickMenuItem callback</Menu.Item>
            <Menu.Item key="2">Will close the menu</Menu.Item>
          </Menu>
        }
        trigger="click"
        position="bl"
      >
        <Button type="text">
          Click
          <IconDown />
        </Button>
      </Dropdown>
    </Space>
  );
}
```

## 分组菜单

通过 `Menu.ItemGroup` 使用分组。

```jsx live
function Demo() {
  const dropList = (
    <Menu>
      <Menu.ItemGroup title="Beijing">
        <Menu.Item>Haidian</Menu.Item>
        <Menu.Item>Chaoyang</Menu.Item>
        <Menu.Item>Shunyi</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Hebei Province">
        <Menu.Item>Tangshan</Menu.Item>
        <Menu.Item>Baoding</Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <div className="dropdown-demo">
      <Dropdown
        trigger="click"
        position="bl"
        droplist={dropList}
        triggerProps={{ autoAlignPopupWidth: true }}
      >
        <Button type="text">
          Group Menu <IconDown />
        </Button>
      </Dropdown>
    </div>
  );
}
```

## 右键菜单

移入区域后，可点击鼠标右键触发。

```jsx live
function Demo() {
  return (
    <Dropdown
      trigger="contextMenu"
      position="bl"
      droplist={
        <Menu>
          <Menu.Item key="1">Haidian</Menu.Item>
          <Menu.Item key="2">Chaoyang</Menu.Item>
          <Menu.Item key="3">Daxing</Menu.Item>
        </Menu>
      }
    >
      <Grid.Row
        align="center"
        justify="center"
        style={{
          width: 320,
          height: 160,
          backgroundColor: 'var(--bg-color-component)',
          color: 'var(--color-text-primary)',
        }}
      >
        <span>Right-click</span>
      </Grid.Row>
    </Dropdown>
  );
}
```

## 带图标的菜单

菜单项前可以添加图标。

```jsx live
function Demo() {
  const iconStyle = {
    marginRight: 8,
    fontSize: 16,
    transform: 'translateY(1px)',
  };
  const dropList = (
    <Menu>
      <Menu.Item key="1">
        <IconLocation style={iconStyle} />
        Beijing
      </Menu.Item>
      <Menu.Item key="2">
        <IconLocation style={iconStyle} />
        Shanghai
      </Menu.Item>
      <Menu.Item key="3">
        <IconLocation style={iconStyle} />
        Guangzhou
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="dropdown-demo">
      <Dropdown droplist={dropList} trigger="click" position="bl">
        <Button type="text">
          Click me <IconDown />
        </Button>
      </Dropdown>
    </div>
  );
}
```

## API

### Dropdown

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|defaultPopupVisible|控制下拉框是否默认打开|boolean |`-`|-|
|disabled|是否禁用弹出|boolean |`-`|2.16.0|
|popupVisible|控制下拉框是否打开（受控模式）|boolean |`-`|-|
|unmountOnExit|隐藏后是否销毁 DOM 结构|boolean |`true`|-|
|position|下拉框的弹出位置|'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' |`bl`|-|
|trigger|触发下拉框弹出的方式|TriggerProps['trigger'] |`hover`|-|
|droplist|下拉框的内容|ReactNode |`-`|-|
|triggerProps|弹出框下可接受所有 `Trigger` 组件的 `Props`|Partial&lt;TriggerProps&gt; |`-`|-|
|getPopupContainer|弹出框挂在的父级节点|(node: HTMLElement) => Element |`-`|-|
|onVisibleChange|弹出框打开/关闭时会触发|(visible: boolean) => void |`-`|-|

### Dropdown.Button

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|defaultPopupVisible|控制下拉框是否默认打开|boolean |`-`|-|
|disabled|是否禁用弹出|boolean |`-`|2.16.0|
|popupVisible|控制下拉框是否打开（受控模式）|boolean |`-`|-|
|unmountOnExit|隐藏后是否销毁 DOM 结构|boolean |`true`|-|
|position|下拉框的弹出位置|'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' |`br`|-|
|size|等同于 `Button` 的 size|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|trigger|触发下拉框弹出的方式|TriggerProps['trigger'] |`hover`|-|
|type|等同于 `Button` 的 type|'default' \| 'primary' \| 'secondary' \| 'dashed' \| 'outline' \| 'text' |`default`|-|
|droplist|下拉框的内容|ReactNode |`-`|-|
|icon|右侧显示内容，可以是 icon 或者任意 dom 元素|ReactNode |`&lt;IconMore />`|-|
|buttonProps|接收 button 按钮的所有 Props，应用于左侧按钮|ButtonProps |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|triggerProps|弹出框下可接受所有 `Trigger` 组件的 `Props`|Partial&lt;TriggerProps&gt; |`-`|-|
|buttonsRender|自定义两个按钮的渲染|(buttons: ReactNode[]) => ReactNode[] |`-`|-|
|getPopupContainer|弹出框挂在的父级节点|(node: HTMLElement) => Element |`-`|-|
|onClick|左侧按钮的点击事件|(e: Event) => void |`-`|-|
|onVisibleChange|弹出框打开/关闭时会触发|(visible: boolean) => void |`-`|-|
