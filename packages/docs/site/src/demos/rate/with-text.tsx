import { useState } from 'react';
import { Rate, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [rate, setRate] = useState(5);
  const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Excellent'];
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Rate value={rate} onChange={(value) => setRate(value)} />
      <Typography.Text
        style={{
          margin: '0 16px',
        }}
      >
        {desc[rate - 1]}
      </Typography.Text>
    </div>
  );
}
