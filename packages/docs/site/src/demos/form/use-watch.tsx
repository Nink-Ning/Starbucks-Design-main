import { Form, Input, InputNumber, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [form] = Form.useForm();
  const name = Form.useWatch('name', form);
  const age = Form.useWatch('age', form);
  return (
    <div>
      <Form form={form} autoComplete="off">
        <Form.Item label="门店名称" field="name">
          <Input placeholder="请输入门店名称" />
        </Form.Item>

        <Form.Item label="运营年限" field="age">
          <InputNumber placeholder="请输入运营年限" />
        </Form.Item>
        <Form.Item label=" ">
          <Typography.Text code>
            门店名称: {name}; 运营年限: {age}
          </Typography.Text>
        </Form.Item>
      </Form>
    </div>
  );
}
