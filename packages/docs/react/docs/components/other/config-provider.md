---
sidebar_position: 1
---

# 全局配置 ConfigProvider

在应用的最外层进行配置，一次设置，全局生效。一般用于设置国际化语言等功能。

## 基础用法

设置国际化语言的基础用法。

```jsx live

function App() {
  return (
    <ConfigProvider
      componentConfig={{
        Button: {
          type: 'primary',
          shape: 'round',
        },
      }}
    >
      <Space direction="vertical">
        <Space>
          <Button>Button 1</Button>
          <Button status="success">Button 2</Button>
          <Button type="secondary">Button 3</Button>
        </Space>
        <DatePicker showTime style={{ width: 250 }} />
      </Space>
    </ConfigProvider>
  );
}
```

## 主题配置

```jsx live

function App() {
  const themes = {
    blue: {
      primaryColor: '#3370ff',
    },
    red: {
      primaryColor: '#ee4d38',
    },
    green: {
      primaryColor: '#0fbf60',
    },
    orange: {
      primaryColor: '#f58505',
    },
  };
  const [theme, setTheme] = useState(null);
  return (
    <ConfigProvider theme={theme && themes[theme]}>
      <Radio.Group
        name="theme"
        options={['blue', 'red', 'green', 'orange']}
        onChange={(theme) => {
          setTheme(theme);
        }}
        style={{ display: 'block', marginBottom: 40 }}
      />
      <Button
        style={{ marginRight: 40 }}
        type="primary"
      >
        Button
      </Button>
      <Input
        style={{ width: 200 }}
        placeholder="Please Enter ..."
      />
    </ConfigProvider>
  );
}
```

## 表格分页配置

配置全局的表格分页参数，比如可以全局设置 `tablePagination.hideOnSinglePage`, 当表格数据小于等于一页的时候隐藏分页。

```jsx live

function App() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
  ];
  const [hideOnSinglePage, setHideOnSinglePage] = useState(true);
  return (
    <ConfigProvider
      tablePagination={{
        hideOnSinglePage,
      }}
    >
      <Space style={{ marginBottom: 10 }}>
        <Typography.Text>tablePagination.hideOnSinglePage</Typography.Text>
        <Switch checked={hideOnSinglePage} onChange={(checked) => setHideOnSinglePage(checked)} />
      </Space>
      <Table columns={columns} data={data} />
    </ConfigProvider>
  );
}
```

## 空元素

通过 `renderEmpty` 可以定义组件内显示的空元素。

```jsx live

function Demo() {
  function renderEmpty(componentName) {
    switch (componentName) {
      case 'Cascader':
        return <Typography.Text>Cascader no data!</Typography.Text>;

      case 'Select':
        return <Typography.Text>Select no data!</Typography.Text>;

      case 'TreeSelect':
        return <Typography.Text>TreeSelect no data!</Typography.Text>;

      case 'List':
        return <Empty description="List no data!" />;

      case 'Table':
        return <Empty description="Table no data!" />;

      default:
        return <Empty />;
    }
  }
  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      <Space>
        <Cascader style={{ width: 200 }} placeholder="Cascader" />
        <Select style={{ width: 200 }} placeholder="Select" />
        <TreeSelect style={{ width: 200 }} placeholder="TreeSelect" />
      </Space>
      <List header="Empty List" style={{ marginTop: 20 }}/>
      <Table
        data={[]}
        columns={[
          {
            title: 'Name',
            key: 'name',
          },
          {
            title: 'Age',
            key: 'age',
          },
        ]}
        style={{ marginTop: 20 }} />
    </ConfigProvider>
  );
};
```

## 组件配置

全局设置各组件默认配置。

```jsx live

function App() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const componentConfig = {
    Button: {
      type: 'primary',
      shape: 'round',
    },
    DatePicker: {
      dayStartOfWeek: 2,
      utcOffset: 0,
    },
    InputNumber: {
      mode: 'button',
    },
    'Radio.Group': {
      type: 'button',
    },
    Space: {
      size: 'large',
    },
    Table: {
      border: false,
      noDataElement: 'Oops, no data ~',
    },
    Tag: {
      color: 'arcoblue',
      size: 'large',
    },
  };
  return (
    <ConfigProvider componentConfig={componentConfig}>
      <Space direction="vertical">
        <Space>
          <Button>Button 1</Button>
          <Button status="success">Button 2</Button>
          <Button type="secondary">Button 2</Button>
        </Space>
        <Space>
          <Radio.Group options={['JavaScript', 'CSS', 'React', 'Vue']} defaultValue="JavaScript" />
          <Radio.Group options={['Light', 'Dark']} defaultValue="Light" />
        </Space>
        <Space>
          <DatePicker showTime />
          <DatePicker.RangePicker />
        </Space>
        <Space>
          <InputNumber defaultValue={2} />
          <InputNumber defaultValue={3} />
        </Space>
        <Space>
          <Tag>ArcoDesign</Tag>
          <Tag>Design System</Tag>
          <Tag>Component</Tag>
          <Tag>Design Lab</Tag>
        </Space>
        <Table columns={columns} data={[]} />
      </Space>
    </ConfigProvider>
  );
}
```

## RTL 视图

设置组件为从右向左阅读的视图。

```jsx live

function App() {
  const [rtl, setRtl] = useState(true);

  return (
    <div>
      <Switch checkedText='RTL' uncheckedText='LTR' checked={rtl} onChange={(checked) => setRtl(checked)} />
      <Divider />
      <ConfigProvider rtl={rtl} effectGlobalNotice={false}>
        <Tabs defaultActiveTab='1' style={{ marginBottom: 20 }}>
          <Tabs.TabPane key='1' title='Tab 1' />
          <Tabs.TabPane key='2' title='Tab 2' />
          <Tabs.TabPane key='3' title='Tab 3' />
        </Tabs>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space size="large">
            <Badge count={9}>
              <Avatar shape='square' />
            </Badge>
            <Badge
              count={9}
              dot
              dotStyle={{ width: 10, height: 10 }}
            >
              <Avatar shape='square' />
            </Badge>
            <Tag color="red" closable>red</Tag>
            <Tag color="arcoblue" closable>arcoblue</Tag>
            <Tag color="green" closable>green</Tag>
          </Space>
          <Space>
            <DatePicker />
            <DatePicker.RangePicker style={{ width: 300 }} />
          </Space>
          <Pagination defaultCurrent={5} total={200} sizeCanChange />
        </Space>
      </ConfigProvider>
    </div>
  );
}
```

## 局部修改 Message 配置

通过 `ConfigProvider` 设置的 `prefixCls` 和 `rtl` 默认会作用在所有的 `Message` 和 `Notification` 上

如果希望能只在 `ConfigProvider` 内部作用，需要结合 `useMessage` 或者  `useNotification` 使用，并且关闭 `effectGlobalNotice`

**此功能在2.40.0支持**

```jsx live

function App() {
  const [message, messageHolder] = Message.useMessage();
  const [notification, notificationHolder] = Notification.useNotification();

  return (
    <Space direction="vertical" size={20}>
      <ConfigProvider rtl effectGlobalNotice={false} effectGlobalModal={false}>
        <Typography.Title heading={6}> 局部 RTL 视图</Typography.Title>
        <div className="demo-holder-wrapper">
          {messageHolder}
          {notificationHolder}
        </div>
        <Space>
          <Button
            onClick={() => {
              message.info && message.info('This is an info message!');
            }}
            type="primary"
          >
            Open Message
          </Button>
          <Button
            onClick={() => {
            notification.info && notification.info({
                closable: true,
                title: 'Notification',
                content: 'This is a notification!',
              });
            }}
            type="primary"
          >
            Open Notification
          </Button>
        </Space>
      </ConfigProvider>
      <div>
        <Typography.Title heading={6}> 正常视图 </Typography.Title>
        <Space>
          <Button
            onClick={() => {
              Message.info('This is an info message!');
            }}
          >
            Open Message
          </Button>

          <Button
            onClick={() => {
              Notification.info({
                closable: true,
                title: 'Notification',
                content: 'This is a notification!',
              });
            }}
          >
            Open Notification
          </Button>
        </Space>
      </div>
    </Space>
  );
}
```

## 局部修改 Modal 配置

通过 `ConfigProvider` 设置的 `prefixCls` 和 `rtl` 默认会作用在所有的 `Modal` 函数方法上，如果希望局部设置不影响全局配置，可以关闭 `effectGlobalModal`。

**此功能在2.61.0支持**

```jsx live

function App() {
  const confirm = () => {
    Modal.confirm({
      title: 'Confirm deletion',
      content: 'Are you sure you want to delete the 3 selected items? Once you press the delete button, the items will be deleted immediately. You can’t undo this action.',
      okButtonProps: {
        status: 'danger',
      },
      onOk: () => {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch((e) => {
          Message.error({
            content: 'Error occurs!',
          });
          throw e;
        });
      },
    });
  };

  return (
    <Space direction="vertical" size={20}>
      <ConfigProvider rtl effectGlobalNotice={false} effectGlobalModal={false}>
        <Typography.Title heading={6}>局部 RTL 视图</Typography.Title>
        <Tabs defaultActiveTab='1' style={{ marginBottom: 20 }}>
          <Tabs.TabPane key='1' title='Tab 1' />
          <Tabs.TabPane key='2' title='Tab 2' />
          <Tabs.TabPane key='3' title='Tab 3' />
        </Tabs>
        <Space>
          <Button type='primary' onClick={confirm}>
            Confirm
          </Button>
        </Space>
      </ConfigProvider>
    </Space>
  );
}
```

## API

### ConfigProvider

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|autoInsertSpaceInButton|当按钮中是两个汉字时，自动在两个汉字中添加一个空格。|boolean |`-`|2.3.0|
|effectGlobalModal|是否全局设置所有 `Modal` 的配置。|boolean |`true`|2.61.0|
|effectGlobalNotice|是否全局设置所有 `Message` 和 `Notification` 的配置。如果用了 `useMessage` 的 hook 局部设置请设置为 false|boolean |`true`|2.40.0|
|rtl|视图的表现形式是从右开始向左结束。|boolean |`-`|2.36.0|
|prefixCls|全局组件类名前缀|string |`arco`|-|
|size|配置组件的默认尺寸，只会对支持`size`属性的组件生效。|'mini' \| 'small' \| 'default' \| 'large' |`default`|-|
|loadingElement|全局的加载中图标，作用于所有组件。|ReactNode |`-`|-|
|componentConfig|用于全局配置所有组件的默认参数|ComponentConfig |`-`|2.23.0|
|focusLock|全局配置弹出框的 `focusLock`，作用于 `Modal` `Drawer` 组件。|&#123;modal?: boolean \| &#123; autoFocus?: boolean };drawer?: boolean \| &#123; autoFocus?: boolean };} |`&#123; modal: &#123; autoFocus: true }, drawer: &#123; autoFocus: true }}`|2.13.0|
|locale|设置语言包|Locale |`-`|-|
|tablePagination|Table 全局的分页配置。|PaginationProps |`-`|2.6.0|
|theme|主题配置|ThemeConfig |`-`|-|
|getPopupContainer|全局弹出框挂载的父级节点。|(node: HTMLElement) => Element |`() => document.body`|-|
|renderEmpty|全局配置组件内的空组件。|(componentName?: string) => ReactNode |`-`|2.10.0|

### ComponentConfig

```js
export type ComponentConfig = {
  Affix?: AffixProps;
  Alert?: AlertProps;
  AutoComplete?: AutoCompleteProps;
  Avatar?: AvatarProps;
  "Avatar.Group"?: AvatarGroupProps;
  Anchor?: AnchorProps;
  "Anchor.Link"?: AnchorLinkProps;
  BackTop?: BackTopProps;
  Badge?: BadgeProps;
  Breadcrumb?: BreadcrumbProps;
  Button?: ButtonProps;
  Calendar?: CalendarProps;
  Card?: CardProps;
  Carousel?: CarouselProps;
  Cascader?: CascaderProps;
  Checkbox?: CheckboxProps;
  Collapse?: CollapseProps;
  Comment?: CommentProps;
  ColorPicker?: ColorPickerProps;
  DatePicker?: Omit<
    DatePickerCommonProps,
    | "placeholder"
    | "onChange"
    | "onSelect"
    | "onOk"
    | "defaultPickerValue"
    | "pickerValue"
    | "onPickerValueChange"
    | "inputProps"
  >;
  Descriptions?: DescriptionsProps;
  Divider?: DividerProps;
  Drawer?: DrawerProps;
  Dropdown?: DropdownProps;
  "Dropdown.Button"?: DropdownButtonProps;
  Empty?: EmptyProps;
  "Typography.Ellipsis"?: TypographyEllipsisProps;
  Form?: FormProps;
  "Grid.Row"?: RowProps;
  "Grid.Col"?: ColProps;
  Grid?: GridProps;
  "Grid.GridItem"?: GridItemProps;
  Image?: ImageProps;
  Input?: InputProps;
  InputNumber?: InputNumberProps;
  VerificationCode?: VerificationCodeProps;
  Watermark?: WatermarkProps;
  InputTag?: InputTagProps;
  Layout?: LayoutProps;
  Link?: LinkProps;
  List?: ListProps;
  "List.Item"?: ListItemProps;
  Mentions?: MentionsProps;
  Menu?: MenuProps;
  Modal?: ModalProps;
  PageHeader?: PageHeaderProps;
  Pagination?: PaginationProps;
  Popconfirm?: PopconfirmProps;
  Popover?: PopoverProps;
  Progress?: ProgressProps;
  Radio?: RadioProps;
  "Radio.Group"?: RadioGroupProps;
  Rate?: RateProps;
  ResizeBox?: ResizeBoxProps;
  Result?: ResultProps;
  Select?: SelectProps;
  Skeleton?: SkeletonProps;
  Slider?: SliderProps;
  Space?: SpaceProps;
  Spin?: SpinProps;
  Statistic?: StatisticProps;
  Steps?: StepsProps;
  Switch?: SwitchProps;
  Table?: TableProps;
  Tabs?: TabsProps;
  TreeProps?: TreeProps;
  TriggerProps?: TriggerProps;
  Tag?: TagProps;
  Timeline?: TimelineProps;
  "Timeline.Item"?: TimelineItemProps;
  TimePicker?: TimePickerCommonProps;
  Tooltip?: TooltipProps;
  Transfer?: TransferProps;
  Tree?: TreeProps;
  TreeSelect?: TreeSelectProps;
  Trigger?: TriggerProps;
  Upload?: UploadProps;
};
```

### Locale

```js
export interface Locale {
  locale: string;
  dayjsLocale?: string;
  Calendar: CalendarType;
  DatePicker: {
    Calendar: CalendarType;
    [key: string]: any;
  };
  Drawer: Record<string, any>;
  Empty: Record<string, any>;
  Modal: Record<string, any>;
  Pagination: Record<string, any>;
  Popconfirm: Record<string, any>;
  Table: Record<string, any>;
  TimePicker: Record<string, any>;
  Upload: Record<string, any>;
  Progress: Record<string, any>;
  Typography: Record<string, any>;
  Transfer: Record<string, any>;
  ImagePreview: Record<string, any>;
  Form?: Record<string, any>;
  ColorPicker: Record<string, any>;
}
```

### CalendarType

```js
type CalendarType = {
  today: string;
  view: Record<string, any>;
  month: {
    short: Record<string, any>;
    long: Record<string, any>;
  };
  week: {
    short: Record<string, any>;
    long: Record<string, any>;
  };
  formatYear?: string;
  formatMonth?: string;
  monthBeforeYear?: boolean;
};
```

### ThemeConfig

```js
export type ThemeConfig = Record<string, any>;
```

