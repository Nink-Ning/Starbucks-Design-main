import { useState } from 'react';
import { TimePicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState();
  return (
    <TimePicker
      style={{ width: 194 }}
      value={value}
      onChange={(valueString) => setValue(valueString)}
    />
  );
}
