import { useState } from 'react';
import { Alert, Select, Space, TimePicker, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const utcList = [];
  let uo = -12;

  for (let i = 0; i < 25; i++) {
    utcList[i] = {
      label: `UTC ${uo ? (uo > 0 ? `+${uo}` : uo) : ''}`,
      value: uo++,
    };
  }

  const [utcOffset, setUtcOffset] = useState(0);
  const [value, setValue] = useState(new Date('2022-02-22'));
  return (
    <Space direction="vertical">
      <Space>
        <Select
          defaultValue={utcOffset}
          options={utcList}
          onChange={(offset) => setUtcOffset(offset)}
          triggerProps={{
            autoAlignPopupWidth: false,
            position: 'bl',
          }}
        />
        <TimePicker
          utcOffset={utcOffset}
          value={value}
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
