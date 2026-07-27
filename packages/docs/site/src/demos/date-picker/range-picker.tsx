import { useState } from 'react';
import { DatePicker, Radio, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  function onSelect(dateString, date) {
    console.log('onSelect', dateString, date);
  }

  function onChange(dateString, date) {
    console.log('onChange: ', dateString, date);
  }

  const [value, setValue] = useState('date');
  const mode = value === 'date time' ? 'date' : value;
  const style =
    value === 'date time'
      ? {
          width: 380,
        }
      : {
          width: 254,
          marginBottom: 20,
        };
  return (
    <Space direction="vertical">
      <Radio.Group
        options={['date', 'week', 'month', 'year', 'quarter', 'date time']}
        value={value}
        onChange={(v) => setValue(v)}
        type="button"
      />
      <DatePicker.RangePicker
        mode={mode}
        onChange={onChange}
        onSelect={onSelect}
        style={style}
        showTime={value === 'date time'}
      />
    </Space>
  );
}
