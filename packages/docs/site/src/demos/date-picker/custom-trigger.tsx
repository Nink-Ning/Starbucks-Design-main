import { useState } from 'react';
import { Button, DatePicker, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState();
  const [rangeValue, setRangeValue] = useState();
  return (
    <Space>
      <DatePicker
        triggerElement={<Button>{value || '请选择日期'}</Button>}
        style={{ width: 268 }}
        value={value}
        onChange={(v) => setValue(v)}
      />
      <DatePicker.RangePicker
        triggerElement={
          <Button>{(rangeValue && rangeValue.join(' - ')) || '请选择日期范围'}</Button>
        }
        style={{ width: 268 }}
        value={rangeValue}
        onChange={(v) => setRangeValue(v)}
      />
    </Space>
  );
}
