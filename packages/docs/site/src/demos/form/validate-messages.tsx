import { Form, Input, InputNumber, Button, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      autoComplete="off"
      style={{ width: '100%' }}
      validateMessages={{
        required: (_, { label }) => `必须填写 ${label}`,
        string: {
          length: `字符数必须是 #{length}`,
          match: `不匹配正则 #{pattern}`,
        },
        number: {
          min: `最小值为 #{min}`,
          max: `最大值为 #{max}`,
        },
      }}
    >
      <Form.Item
        label="门店名称"
        field="name"
        required
        rules={[
          {
            type: 'string',
            required: true,
            length: 3,
            match: /abc/,
          },
        ]}
      >
        <Input placeholder="请输入门店名称" />
      </Form.Item>
      <Form.Item
        label="运营年限"
        field="age"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber placeholder="请输入运营年限" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Space size={16}>
          <Button type="primary" htmlType="submit">校验</Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
