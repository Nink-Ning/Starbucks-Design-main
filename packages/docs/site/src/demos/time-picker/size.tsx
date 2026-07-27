import { useState } from 'react';
import { Radio, TimePicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [size, setSize] = useState('default');
  return (
    <div>
      <Radio.Group
        value={size}
        options={['large', 'default', 'small', 'mini']}
        onChange={(value) => setSize(value)}
        type="button"
        style={{ marginBottom: 24 }}
      />
      <br />
      <TimePicker style={{ width: 194 }} size={size} placeholder="请选择时间" />
    </div>
  );
}
