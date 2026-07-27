import { TimePicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <TimePicker.RangePicker
      style={{ width: 252 }}
      onSelect={(valueString, value) => console.log('onSelect:', valueString, value)}
      onChange={(valueString, value) => console.log('onChange:', valueString, value)}
    />
  );
}
