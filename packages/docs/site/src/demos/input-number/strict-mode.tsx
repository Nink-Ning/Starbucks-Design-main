import { useState } from 'react';
import { InputNumber } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState(1e20);
  return (
    <InputNumber
      style={{ width: 480 }}
      strictMode
      mode="button"
      value={value}
      step={1e-20}
      onChange={(value) => {
        console.log('InputNumber value is ', value);
        setValue(value);
      }}
    />
  );
}
