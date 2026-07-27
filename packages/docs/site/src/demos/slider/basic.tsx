import { useState } from 'react';
import { Slider } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState(30);
  return <Slider value={value} onChange={setValue} style={{ width: 200 }} />;
}
