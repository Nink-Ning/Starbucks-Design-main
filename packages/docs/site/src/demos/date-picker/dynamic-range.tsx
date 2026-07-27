import { useState } from 'react';
import { DatePicker, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [dates, setDates] = useState([]);
  const [timeDates, setTimeDates] = useState([]);

  return (
    <Space size={24} direction="vertical">
      <DatePicker.RangePicker
        style={{ width: 300 }}
        onSelect={(valueString, value) => {
          setDates(value);
        }}
        onVisibleChange={(visible) => {
          if (!visible) {
            setDates([]);
          }
        }}
        disabledDate={(current) => {
          if (dates && dates.length) {
            const tooLate = dates[0] && Math.abs(current.diff(dates[0], 'day')) > 7;
            const tooEarly = dates[1] && Math.abs(dates[1].diff(current, 'day')) > 7;
            return tooEarly || tooLate;
          }

          return false;
        }}
        clearRangeOnReselect
      />

      <DatePicker.RangePicker
        showTime
        style={{ width: 400 }}
        onSelect={(valueString, value) => {
          setTimeDates(value);
        }}
        onVisibleChange={(visible) => {
          if (!visible) {
            setTimeDates([]);
          }
        }}
        disabledDate={(current) => {
          if (timeDates && timeDates.length) {
            const tooLate =
              timeDates[0] && Math.abs(current.diff(timeDates[0].startOf('day'), 'day')) > 7;
            const tooEarly =
              timeDates[1] && Math.abs(timeDates[1].endOf('day').diff(current, 'day')) > 7;
            return tooEarly || tooLate;
          }
          return false;
        }}
        clearRangeOnReselect
      />
    </Space>
  );
}
