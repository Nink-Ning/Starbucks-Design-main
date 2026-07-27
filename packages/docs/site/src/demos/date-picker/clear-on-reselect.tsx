import { DatePicker, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space direction="vertical">
      <div>默认行为（保留已有范围）</div>
      <DatePicker.RangePicker style={{ width: 360 }} />

      <div>开启 clearRangeOnReselect</div>
      <DatePicker.RangePicker style={{ width: 360 }} clearRangeOnReselect />
    </Space>
  );
}
