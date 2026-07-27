import { DatePicker, Space } from '@sbux/starbucks-design-react';
import { IconInfoCircle } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space>
      <DatePicker style={{ width: 200 }} prefix={<IconInfoCircle />}/>
      <DatePicker.RangePicker style={{ width: 350 }} prefix={<IconInfoCircle />}/>
    </Space>
  );
}
