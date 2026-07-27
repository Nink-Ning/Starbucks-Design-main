import { Divider, Select, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = [...new Array(20)].map((_, index) => `label ${index}`);
  return (
    <Space size="large" direction="vertical">
      <div>
        <Divider orientation="left"> 最多显示三个 Tag </Divider>
        <Select
          defaultValue={options.slice(0, 4)}
          maxTagCount={3}
          style={{ width: 350 }}
          placeholder="Select an item"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        ></Select>
      </div>
      <div>
        <Divider orientation="left"> 最多显示三个 Tag，并自定义渲染省略节点 </Divider>
        <Select
          defaultValue={options.slice(0, 4)}
          maxTagCount={{ count: 3, render: (invisibleCount) => `+${invisibleCount}` }}
          style={{ width: 350 }}
          placeholder="Select an item"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        ></Select>
      </div>

      <div>
        <Divider orientation="left"> 最多显示三个 Tag，隐藏节点以 Popover 展示 </Divider>
        <Select
          defaultValue={options.slice(0, 4)}
          maxTagCount={{ count: 3, showPopover: true,  }}
          style={{ width: 350 }}
          placeholder="Select an item"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        ></Select>
      </div>
      <div>
        <Divider orientation="left"> 根据 select 宽度自适应渲染 Tag 个数 </Divider>
        <Select
          defaultValue={options.slice(0, 5)}
          maxTagCount="responsive"
          style={{ width: 350 }}
          placeholder="Select an item"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        ></Select>
      </div>
    </Space>
  );
}
