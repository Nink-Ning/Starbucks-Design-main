import { Form, Input, InputNumber, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [form] = Form.useForm();
  const name = Form.useWatch('name', form);
  const age = Form.useWatch('age', form);
  return (
    <div>
      <Form form={form} autoComplete="off">
        <Form.Item label="Name" field="name">
          <Input placeholder="enter name" />
        </Form.Item>

        <Form.Item label="Age" field="age">
          <InputNumber placeholder="enter age" />
        </Form.Item>
        <Form.Item label=" ">
          <Typography.Text code>
            Name: {name}; Age: {age}
          </Typography.Text>
        </Form.Item>
      </Form>
    </div>
  );
}
