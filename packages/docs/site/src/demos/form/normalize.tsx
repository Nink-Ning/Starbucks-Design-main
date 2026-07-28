import { Form, Input, DatePicker, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Form style={{ maxWidth: 650 }}>
      <Form.Item
        label="数字"
        extra="请输入数字"
        field="number"
        autoComplete="off"
        rules={[{ required: true, message: '请输入数字' }]}
        normalize={(value) => {
          if (value) {
            const val = value.replace(/[^\d]/g, '');
            return `$ ${val}`;
          }

          return value;
        }}
      >
        <Input placeholder="请输入..." style={{ width: 350 }} />
      </Form.Item>
      <Form.Item
        label="日期"
        extra="请输入数字"
        field="date"
        rules={[{ required: true, message: '请输入数字' }]}
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
        <DatePicker.RangePicker placeholder="请输入..." style={{ width: 360 }} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button type="primary" htmlType="submit">
          提交
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
