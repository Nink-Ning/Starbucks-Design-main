import { Space, TimePicker } from '@sbux/starbucks-design-react';
import { IconInfoCircle } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space>
      <TimePicker prefix={<IconInfoCircle />} style={{ width: 200 }} />
      <TimePicker.RangePicker prefix={<IconInfoCircle />} style={{ width: 250 }} />
    </Space>
  );
}
