import { DatePicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  const highlightStyle = {
    border: '1px solid rgb(var(--arcoblue-6))',
  };

  return (
    <DatePicker
      dateRender={(current) => {
        const date = current.date();
        const highlightDates = [6, 14, 22];
        return (
          <div className="arco-picker-date">
            <div
              className="arco-picker-date-value"
              style={highlightDates.indexOf(date) > -1 ? highlightStyle : {}}
            >
              {current.date()}
            </div>
          </div>
        );
      }}
      style={{ width: 200 }}
    />
  );
}
