import { useState, useEffect } from 'react';
import { DatePicker, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState();
  const [valueRange, setValueRange] = useState();
  useEffect(() => {
    setValue(Date.now());
    setValueRange([Date.now(), Date.now()]);
  }, []);
  return (
    <Space>
      <DatePicker
        showTime
        value={value}
        onChange={(v) => setValue(v)}
        style={{ width: 200 }}
      />
      <DatePicker.RangePicker
        showTime
        value={valueRange}
        onChange={(v) => setValueRange(v)}
        style={{ width: 380 }}
      />
    </Space>
  );
}
