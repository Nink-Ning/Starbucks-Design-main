import { Form, Input, InputNumber, Button, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      style={{ width: '100%' }}
      initialValues={{ name: '上海烘焙工坊' }}
      autoComplete="off"
      onValuesChange={(v, vs) => {
        console.log(v, vs);
      }}
      onSubmit={(v) => {
        console.log(v);
      }}
    >
      <Form.Item label="门店名称" field="name" rules={[{ required: true }]}>
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
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            重置
          </Button>
          <Button
            type="text"
            onClick={() => {
              form.setFields({
                age: {
                  value: 200,
                  error: {
                    message: '运营年限不能超过 99',
                  },
                  warning: <div>预警信息...</div>,
                },
              });
            }}
          >
            设置运营年限错误
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
