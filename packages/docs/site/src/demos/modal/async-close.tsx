import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm()

  function onOk() {
    form.validate().then((res) => {
      setConfirmLoading(true)
      setTimeout(() => {
        Message.success('Success !')
        setVisible(false)
        setConfirmLoading(false)
      }, 1500)
    })
  }

  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    }
  }
  return (
    <div>
      <Button onClick={() => setVisible(true)} type="primary">
        Open Modal with async logic
      </Button>
      <Modal
        title="Add User"
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{
            style: { flexBasis: 90 }
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(100% - 90px)' }
          }}
        >
          <Form.Item label="Name" field="name" rules={[{ required: true }]}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="Gender" required field="sex" rules={[{ required: true }]}>
            <Select options={['男', '女']} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
