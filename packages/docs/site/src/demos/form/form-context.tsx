import React, { useRef, useEffect } from 'react';
import { Form, Button, Switch, Input, InputNumber, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = React.useState(false);

  function DemoButton() {
    const { form, disabled, isSubmitting } = Form.useFormContext();
    const messageRef = useRef(null)

    useEffect(() => {
      if (isSubmitting) {
        messageRef.current = 'id-' + Date.now()
        Message.loading({
          id: messageRef.current,
          content: 'submitting',
          duration: 0
        });
      } else {
        if (messageRef.current) {
          const isError = Object.keys(form.getFieldsError()).length > 0;

          Message[isError ? 'error' : 'success']({
            id: messageRef.current,
            content: isError ? 'validate failed' : 'submitted',
            duration: 3000
          });
        }
        messageRef.current = null
      }
    }, [isSubmitting])

    return (
      <>
        <Button
          type="primary"
          htmlType="submit"
          disabled={disabled}
          loading={isSubmitting}
          style={{ marginRight: 24 }}
        >
          Submit
        </Button>
        <Button
          disabled={disabled}
          style={{ marginRight: 24 }}
          onClick={() => {
            form.resetFields();
          }}
        >
          Reset
        </Button>
      </>
    );
  }

  return (
    <Form
      form={form}
      autoComplete="off"
      style={{ width: 600 }}
      initialValues={{ name: 'admin' }}
      disabled={disabled}
      onValuesChange={(v, vs) => {
        console.log(v, vs);
      }}
      onSubmit={(v) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(1)
          }, 3000)
        })
      }}
    >
      <Form.Item label="Disabled" disabled={false}>
        <Switch onChange={setDisabled}></Switch>
      </Form.Item>
      <Form.Item label="Username" field="name" rules={[{ required: true }]}>
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
        <DemoButton />
      </Form.Item>
    </Form>
  );
}
