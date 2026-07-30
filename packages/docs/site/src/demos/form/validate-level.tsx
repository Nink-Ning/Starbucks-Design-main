import { Form, Input, InputNumber, Button, Message, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form form={form} autoComplete="off" style={{ width: '100%' }}>
      <Form.Item
        field="email"
        label="邮箱"
        rules={[
          {
            type: 'email',
            validateLevel: 'warning',
          },
          {
            required: true,
            type: 'string',
            minLength: 6,
          },
        ]}
      >
        <Input placeholder="input placeholder" />
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
          >校验表单</Button>
          <Button
            type="primary"
            onClick={async () => {
              try {
                await form.validate(['email']);
                Message.success('邮箱校验通过');
              } catch (e) {
                Message.error('邮箱校验失败');
              }
            }}
          >校验邮箱</Button>
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
