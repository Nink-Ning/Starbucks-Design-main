import { Form, Input, InputNumber, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      style={{ width: 600 }}
      initialValues={{ name: 'admin' }}
      autoComplete="off"
      onValuesChange={(v, vs) => {
        console.log(v, vs);
      }}
      onSubmit={(v) => {
        console.log(v);
      }}
    >
      <Form.Item label="Username" field="name" rules={[{ required: true }]}>
        <Input placeholder="please enter your username" />
      </Form.Item>
      <Form.Item
        label="Age"
        field="age"
        rules={[{ required: true, type: 'number', min: 0, max: 99 }]}
      >
        <InputNumber placeholder="please enter your age" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: 24 }}>
          Submit
        </Button>
        <Button
          style={{ marginRight: 24 }}
          onClick={() => {
            form.resetFields();
          }}
        >
          Reset
        </Button>
        <Button
          type="text"
          onClick={() => {
            form.setFields({
              age: {
                value: 200,
                error: {
                  message: 'Maximum is 200',
                },
                warning: <div>warning info ...</div>,
              },
            });
          }}
        >
          Set Error Age
        </Button>
      </Form.Item>
    </Form>
  );
}
