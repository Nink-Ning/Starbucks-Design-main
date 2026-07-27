import { Form, Input, Button, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      style={{ width: 320 }}
      wrapperCol={{ span: 24 }}
      autoComplete="off"
      onValuesChange={(v, vs) => {
        console.log(v, vs);
      }}
      onSubmit={(v) => {
        console.log(v);
        Message.success('success');
      }}
    >
      <Form.Item field="name" rules={[{ required: true, message: 'username is required' }]}>
        <Input placeholder="please enter your username" />
      </Form.Item>
      <Form.Item field="password" rules={[{ required: true, message: 'password is required' }]}>
        <Input placeholder="please enter your password" />
      </Form.Item>
      <Form.Item
        field="confirm_password"
        dependencies={['password']}
        rules={[{
          validator: (v, cb) => {
            if (!v) {
              return cb('confirm_password is required')
            } else if (form.getFieldValue('password') !== v) {
              return cb('confirm_password must be equal with password')
            }
            cb(null)
          }
        }]}
      >
        <Input placeholder="please confirm your password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" long>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
