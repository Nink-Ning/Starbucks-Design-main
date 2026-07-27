import { TimePicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <TimePicker
      defaultValue="10:25:30"
      step={{
        hour: 2,
        minute: 5,
        second: 10,
      }}
      style={{ width: 194 }}
    />
  );
}
