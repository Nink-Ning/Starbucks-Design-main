import { DatePicker, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
   <div>
    <Space wrap>
      <DatePicker status="error" placeholder="error status" style={{ width: 200 }}/>
      <DatePicker.RangePicker status="error"  placeholder="warning status"  style={{ width: 250 }}/>
    </Space>
    <br/>
    <Space wrap>
      <DatePicker status="warning"  placeholder="warning status"  style={{ width: 200 }}/>
      <DatePicker.RangePicker status="warning"  placeholder="warning status"  style={{ width: 250 }}/>
    </Space>
    </div>
  );
}
