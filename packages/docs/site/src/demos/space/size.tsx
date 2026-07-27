import { useState } from 'react';
import { Space, Button, Radio } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [size, setSize] = useState('small');
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Radio.Group
          options={['mini', 'small', 'medium', 'large']}
          value={size}
          onChange={(value) => setSize(value)}
          type="button"
        />
      </div>
      <Space size={size}>
        <Button type="primary">Item1</Button>
        <Button type="primary">Item2</Button>
        <Button type="primary">Item3</Button>
      </Space>
    </div>
  );
}
