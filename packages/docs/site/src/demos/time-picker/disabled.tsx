import { TimePicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <TimePicker disabled style={{ margin: '0 24px 24px 0' }} />
      <TimePicker.RangePicker disabled style={{ width: 252, margin: '0 24px 24px 0' }} />
    </div>
  );
}
