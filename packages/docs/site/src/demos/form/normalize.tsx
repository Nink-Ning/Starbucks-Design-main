import { Form, Input, DatePicker, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Form style={{ width: 600 }}>
      <Form.Item
        label="Number"
        extra="Please enter number"
        field="number"
        autoComplete="off"
        rules={[{ required: true, message: 'Please enter number' }]}
        normalize={(value) => {
          if (value) {
            const val = value.replace(/[^\d]/g, '');
            return `$ ${val}`;
          }

          return value;
        }}
      >
        <Input placeholder="please enter..." />
      </Form.Item>
      <Form.Item
        label="Date"
        extra="Please enter number"
        field="date"
        rules={[{ required: true, message: 'Please enter number' }]}
        normalize={(value) => {
          return {
            begin: value && value[0],
            end: value && value[1],
          };
        }}
        formatter={(value) => {
          return value && value.begin ? [value.begin, value.end] : [];
        }}
      >
        <DatePicker.RangePicker placeholder="please enter..." />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button type="primary" htmlType="submit">
          OK
        </Button>
      </Form.Item>
      <Form.Item shouldUpdate>
        {(value) => {
          return <pre>{JSON.stringify(value, null, 2)}</pre>;
        }}
      </Form.Item>
    </Form>
  );
}
