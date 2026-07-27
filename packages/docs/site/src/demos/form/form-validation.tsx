import { Form, Input, InputNumber, Button, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form form={form} autoComplete="off" style={{ width: 600 }}>
      <Form.Item
        label="Username"
        field="name"
        required
        rules={[
          {
            validator(value, cb) {
              if (value !== 'hahaha') {
                return cb('必须填写hahaha');
              }

              return cb();
            },
          },
        ]}
      >
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
        <Button
          type="primary"
          onClick={async () => {
            try {
              await form.validate();
              Message.success('校验通过');
            } catch (e) {
              Message.error('校验失败');
            }
          }}
          style={{ marginRight: 24 }}
        >
          Validate Form
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            try {
              await form.validate(['name']);
              Message.success('Username 校验通过');
            } catch (e) {
              Message.error('Username 校验失败');
            }
          }}
          style={{ marginRight: 24 }}
        >
          Validate Username
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
