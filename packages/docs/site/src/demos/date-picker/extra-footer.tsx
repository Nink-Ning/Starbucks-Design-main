import { DatePicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <DatePicker
        extra="Extra footer"
        style={{ width: 200, marginBottom: 20 }}
      />
      <br />
      <DatePicker.RangePicker
        showTime
        extra="Extra footer"
        style={{ width: 380 }}
      />
    </div>
  );
}
