import { Calendar, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space align="start">
      <Calendar
        panel
        defaultValue="2020-04-01"
        panelTodayBtn
        style={{ marginRight: 50 }}
        onChange={(a) => console.log(a)}
      />
      <Calendar panel defaultValue="2020-03" mode="year" />
    </Space>
  );
}
