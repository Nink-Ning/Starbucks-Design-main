import { DatePicker, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space direction="vertical">
      <Space>
        <DatePicker style={{ width: 260 }} />
        <DatePicker style={{ width: 260 }} hideNotInViewDates />
      </Space>
      <Space>
        <DatePicker.RangePicker style={{ width: 360 }} />
        <DatePicker.RangePicker style={{ width: 360 }} hideNotInViewDates />
      </Space>
    </Space>
  );
}
