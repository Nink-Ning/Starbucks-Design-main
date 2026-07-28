import { Form, Input, InputNumber, Button } from '@sbux/starbucks-design-react';

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
        <div style={{ display: 'flex', gap: 16 }}>
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
              form.setFieldsValue({
                name: '上海烘焙工坊',
                age: 11,
              });
            }}
          >
            填充表单
          </Button>

          <Button
            type="text"
            onClick={() => {
              // 仅校验值，不会有 UI 表现
              form
                .validate({ validateOnly: true })
                .then(() => {
                  console.log('pass');
                })
                .catch((e) => {
                  console.log(e.errors);
                });
            }}
          >
            仅校验
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
