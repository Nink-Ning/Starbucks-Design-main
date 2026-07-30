import React, { useRef, useEffect } from 'react';
import { Form, Button, Switch, Input, InputNumber, Message, Space } from '@sbux/starbucks-design-react';

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
          content: '提交中',
          duration: 0
        });
      } else {
        if (messageRef.current) {
          const isError = Object.keys(form.getFieldsError()).length > 0;

          Message[isError ? 'error' : 'success']({
            id: messageRef.current,
            content: isError ? '校验失败' : '提交成功',
            duration: 3000
          });
        }
        messageRef.current = null
      }
    }, [isSubmitting])

    return (
      <Space size={16}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={disabled}
          loading={isSubmitting}
        >
          提交
        </Button>
        <Button
          disabled={disabled}
          onClick={() => {
            form.resetFields();
          }}
        >
          重置
        </Button>
      </Space>
    );
  }

  return (
    <Form
      form={form}
      autoComplete="off"
      style={{ width: '100%' }}
      initialValues={{ name: '上海烘焙工坊' }}
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
      <Form.Item label="禁用表单" disabled={false}>
        <Switch onChange={setDisabled}></Switch>
      </Form.Item>
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
        <DemoButton />
      </Form.Item>
    </Form>
  );
}
