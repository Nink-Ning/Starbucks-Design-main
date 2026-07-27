import { useState } from 'react';
import { Slider, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState([0, 20, 50]);
  return (
    <div style={{ width: 200 }}>
      <Slider range value={value} onChange={setValue} />
      <br/>
      <Typography.Text code>value: {JSON.stringify(value)}</Typography.Text>
    </div>
  );
}
