import { useState } from 'react';
import { Alert, DatePicker, Select, Space, Tag, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const zoneList = ['America/Los_Angeles', 'Europe/London', 'Africa/Cairo', 'Asia/Shanghai'];
  const defaultValue = new Date('2022-02-22');
  const defaultRangeValue = [new Date(2022, 1, 22, 8), new Date(2022, 2, 22, 10)];

  const [timezone, setTimezone] = useState('Asia/Shanghai');
  const [value, setValue] = useState(defaultValue);
  const [rangeValue, setRangeValue] = useState(defaultRangeValue);
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
        <DatePicker
          showTime
          timezone={timezone}
          value={value}
          onChange={(v, vd) => setValue(vd && vd.toDate())}
        />
        <DatePicker.RangePicker
          showTime
          timezone={timezone}
          value={rangeValue}
          onChange={(v, vd) => setRangeValue(vd && vd.map((d) => d.toDate()))}
        />
      </Space>
      <Alert
        showIcon={false}
        content={
          <Space direction="vertical">
            <Tag bordered color="gray">
              DatePicker
            </Tag>
            <div>
              <Typography.Text bold>Locale String:</Typography.Text>
              {value ? value.toLocaleString('en-US') : '-'}
            </div>
            <div>
              <Typography.Text bold>ISO String:</Typography.Text>
              {value ? value.toISOString() : '-'}
            </div>
            <div>
              <Typography.Text bold>Timestamp:</Typography.Text>
              {value ? value.valueOf() : '-'}
            </div>
          </Space>
        }
      />
      <Alert
        showIcon={false}
        content={
          <Space direction="vertical">
            <Tag bordered color="gray">
              RangePicker
            </Tag>
            <div>
              <Typography.Text bold>Locale String:</Typography.Text>
              {rangeValue ? rangeValue.map((v) => v.toLocaleString('en-US')).join(' --- ') : '-'}
            </div>
            <div>
              <Typography.Text bold>ISO String:</Typography.Text>
              {rangeValue ? rangeValue.map((v) => v.toISOString()).join(' --- ') : '-'}
            </div>
            <div>
              <Typography.Text bold>Timestamp:</Typography.Text>
              {rangeValue ? rangeValue.map((v) => v.valueOf()).join(' --- ') : '-'}
            </div>
          </Space>
        }
      />
    </Space>
  );
}
