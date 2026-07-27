import { Typography, Form, VerificationCode, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div className="demo-verify-code-wrapper">
      <Typography.Title heading={5}>Verification Code</Typography.Title>
      <Form wrapperCol={{ span: 24 }}>
        <Form.Item
          field="code"
          rules={[
            {
              validator: (v, cb) => {
                return v !== '123456' ? cb('must be 123456') : cb();
              },
            },
          ]}
          validateTrigger={['onFinish']}
        >
          <VerificationCode size="large" validate={({inputValue}) => /\d/.test(inputValue)} />
        </Form.Item>
        <Button type="primary" size="large" htmlType="submit" style={{marginTop: 20}}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
