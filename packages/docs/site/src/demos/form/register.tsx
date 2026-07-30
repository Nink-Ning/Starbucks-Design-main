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
        Message.success('注册成功');
      }}
    >
      <Form.Item field="name" rules={[{ required: true, message: '请输入门店名称' }]}>
        <Input placeholder="请输入门店名称" />
      </Form.Item>
      <Form.Item field="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder="请输入密码" />
      </Form.Item>
      <Form.Item
        field="confirm_password"
        dependencies={['password']}
        rules={[{
          validator: (v, cb) => {
            if (!v) {
              return cb('请再次输入密码')
            } else if (form.getFieldValue('password') !== v) {
              return cb('两次输入的密码不一致')
            }
            cb(null)
          }
        }]}
      >
        <Input placeholder="请再次输入密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" long>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
}
