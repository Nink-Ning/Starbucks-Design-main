import { useState } from 'react';
import { Slider } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState([0, 50]);
  return (
    <div style={{ width: 200 }}>
      <Slider range value={value} onChange={setValue} />
    </div>
  );
}
