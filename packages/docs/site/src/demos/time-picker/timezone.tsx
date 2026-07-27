import { useState } from 'react';
import { Alert, Select, Space, TimePicker, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const zoneList = ['America/Los_Angeles', 'Europe/London', 'Africa/Cairo', 'Asia/Shanghai'];
  const defaultValue = new Date('2022-02-22');

  const [timezone, setTimezone] = useState('Asia/Shanghai');
  const [value, setValue] = useState(defaultValue);
  return (
    <Space direction="vertical">
      <Space>
        <Select
          defaultValue={timezone}
          options={zoneList}
          onChange={(tz) => setTimezone(tz)}
          triggerProps={{
            autoAlignPopupWidth: false,
            position: 'bl',
          }}
        />
        <TimePicker
          timezone={timezone}
          defaultValue={defaultValue}
          onChange={(v, vd) => setValue(vd && vd.toDate())}
        />
      </Space>
      <Alert
        showIcon={false}
        content={
          <Space direction="vertical">
            <div>
              <Typography.Text bold>Locale String:</Typography.Text> {value.toLocaleString('en-US')}
            </div>
            <div>
              <Typography.Text bold>ISO String:</Typography.Text> {value.toISOString()}
            </div>
            <div>
              <Typography.Text bold>Timestamp:</Typography.Text> {value.valueOf()}
            </div>
          </Space>
        }
      />
    </Space>
  );
}
