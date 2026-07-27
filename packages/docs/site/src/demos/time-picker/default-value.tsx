import { TimePicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <TimePicker
        defaultValue="18:24:23"
        style={{
          width: 194,
          marginRight: 24,
          marginBottom: 24,
        }}
      />
      <TimePicker.RangePicker
        defaultValue={['09:24:53', '18:44:33']}
        style={{ width: 252, marginBottom: 24 }}
      />
    </div>
  );
}
