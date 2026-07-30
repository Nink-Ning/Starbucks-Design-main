import { Form, Input, InputNumber, Button, Message, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form form={form} autoComplete="off" style={{ width: '100%' }}>
      <Form.Item
        label="门店名称"
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
        <Input placeholder="请输入门店名称" />
      </Form.Item>
      <Form.Item
        label="运营年限"
        field="age"
        rules={[{ required: true, type: 'number', min: 0, max: 99 }]}
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
                await form.validate(['name']);
                Message.success('门店名称 校验通过');
              } catch (e) {
                Message.error('门店名称 校验失败');
              }
            }}
          >校验门店名称</Button>
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
