import { useState } from 'react';
import { DatePicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState();
  const [pickerValue, setPickerValue] = useState();
  const [rangeValue, setRangeValue] = useState();
  const [rangePickerValue, setRangePickerValue] = useState();
  return (
    <div>
      <DatePicker
        triggerElement={null}
        style={{ width: 268 }}
        value={value}
        onChange={(v) => setValue(v)}
        pickerValue={pickerValue}
        onPickerValueChange={(v) => setPickerValue(v)}
      />
      <DatePicker.RangePicker
        triggerElement={null}
        style={{ width: 560, marginTop: 20 }}
        value={rangeValue}
        onChange={(v) => setRangeValue(v)}
        pickerValue={rangePickerValue}
        onPickerValueChange={(v) => setRangePickerValue(v)}
      />
    </div>
  );
}
