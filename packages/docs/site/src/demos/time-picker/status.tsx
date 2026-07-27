import { Space, TimePicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Space wrap>
        <TimePicker status="error" placeholder="error status" style={{ width: 200 }} />
        <TimePicker.RangePicker
          status="error"
          placeholder={['error status', 'error status']}
          style={{ width: 250 }}
        />
      </Space>
      <br />
      <Space wrap>
        <TimePicker status="warning" placeholder="warning status" style={{ width: 200 }} />
        <TimePicker.RangePicker
          status="warning"
          placeholder={['warning status', 'warning status']}
          style={{ width: 250 }}
        />
      </Space>
    </div>
  );
}
