import { Select, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size="large">
      <Select
        placeholder="Select city"
        style={{ width: 154 }}
        triggerProps={{
          autoAlignPopupWidth: false,
          position: 'bl',
        }}
      >
        <Select.Option value="1">Beijing</Select.Option>
        <Select.Option disabled value="2">
          Shanghai
        </Select.Option>
        <Select.Option value="3">Guangzhou</Select.Option>
        <Select.Option value="4">Shenzhen</Select.Option>
      </Select>
      <Select
        placeholder="Select city"
        style={{ width: 154 }}
        triggerProps={{
          autoAlignPopupWidth: false,
          autoAlignPopupMinWidth: true,
          position: 'bl',
        }}
      >
        <Select.Option value="1">Beijing Beijing Beijing Beijing Beijing</Select.Option>
        <Select.Option disabled value="2">
          Shanghai
        </Select.Option>
        <Select.Option value="3">Guangzhou</Select.Option>
        <Select.Option value="4">Shenzhen</Select.Option>
      </Select>
    </Space>
  );
}
