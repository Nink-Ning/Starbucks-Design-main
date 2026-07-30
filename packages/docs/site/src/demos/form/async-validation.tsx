import { Form, Input, Button, Message, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      autoComplete="off"
      style={{
        width: '100%',
      }}

    >
      <Form.Item
        label="门店名称"
        field="name"
        required
        hasFeedback
        rules={[
          {
            validator: async (value, callback) => {
              return new Promise((resolve) => {
                if (value !== '上海烘焙工坊') {
                  setTimeout(() => {
                    callback('门店名称必须为上海烘焙工坊');
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
        <Input placeholder="请输入门店名称"  />
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
        </Space>
      </Form.Item>
    </Form>
  );
}
