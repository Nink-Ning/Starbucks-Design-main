import { Form, InputNumber, Typography, Space, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [form] = Form.useForm();
  const ageState = Form.useFormState('age', form) || {};

  console.log(ageState)

  return (
    <div>
      <Form form={form} autoComplete="off">

        <Form.Item label="运营年限" field="age" rules={[
          {required: true},
          {
            validator: async (value, callback) => {
              return new Promise((resolve) => {
                if (value !== 20) {
                  setTimeout(() => {
                    callback('运营年限必须为 20');
                    resolve();
                  }, 1000);
                } else {
                  resolve();
                }
              });
            },
          },]}>
          <InputNumber placeholder="请输入运营年限" />
        </Form.Item>
        <Form.Item label=" ">
          <div>
            表单提交中:
            <Typography.Text code>
              {JSON.stringify(ageState.isSubmitting)}
            </Typography.Text>
          </div>
          <div>
            校验状态:
            <Typography.Text code>
              {ageState.validateStatus}
            </Typography.Text>
          </div>
          <div>
            错误信息:
            <Typography.Text code>
              {JSON.stringify(ageState.errors, null, 2)}
            </Typography.Text>
          </div>
          <div>
            警告信息:
            <Typography.Text code>
              {JSON.stringify(ageState.warnings, null, 2)}
            </Typography.Text>
          </div>
        </Form.Item>

        <Form.Item label=" ">
          <Space size={16}>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
