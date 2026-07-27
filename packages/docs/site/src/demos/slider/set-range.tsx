import { useState } from 'react';
import { Slider, Space, InputNumber } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState(30);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  return (
    <Space size={16}>
      <InputNumber
        value={min}
        onChange={(val) => setMin(val)}
        style={{ width: 78 }}
      />
      <Slider
        value={value}
        min={min}
        max={max}
        onChange={(val) => setValue(val)}
        style={{ width: 200 }}
      />
      <InputNumber
        value={max}
        onChange={(val) => setMax(val)}
        style={{ width: 78 }}
      />
    </Space>
  );
}
