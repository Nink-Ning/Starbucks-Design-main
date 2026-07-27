import { useState } from 'react';
import { Space, Button, Radio, Typography, Card } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [align, setAlign] = useState('center');
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Radio.Group
          options={['start', 'center', 'end', 'baseline']}
          value={align}
          onChange={(value) => setAlign(value)}
          type="button"
        />
      </div>
      <Space
        align={align}
        style={{ backgroundColor: 'var(--color-fill-2)', padding: 10 }}
      >
        <Typography.Text>Space:</Typography.Text>
        <Button type="primary">Item2</Button>
        <Card title="Card">Card content</Card>
      </Space>
    </div>
  );
}
