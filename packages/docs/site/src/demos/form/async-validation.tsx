import { Form, Input, Button, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      autoComplete="off"
      style={{
        width: 600,
      }}

    >
      <Form.Item
        label="Username"
        field="name"
        required
        hasFeedback
        rules={[
          {
            validator: async (value, callback) => {
              return new Promise((resolve) => {
                if (value !== 'admin') {
                  setTimeout(() => {
                    callback('Name must be admin');
                    resolve();
                  }, 1000);
                } else {
                  resolve();
                }
              });
            },
          },
        ]}
      >
        <Input placeholder="please enter your username"  />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: 24 }}
        >
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
      </Form.Item>
    </Form>
  );
}
