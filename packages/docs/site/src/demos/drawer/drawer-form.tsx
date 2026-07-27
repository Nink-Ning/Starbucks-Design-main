import React from 'react';
import { Button, DatePicker, Drawer, Form, Input, Select } from '@sbux/starbucks-design-react';

export default function Demo() {
  const formItemLayout = {
    wrapperCol: {
      span: 24
    }
  }
  const [visible, setVisible] = React.useState(false)
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true)
        }}
        type="primary"
      >
        Open Drawer
      </Button>
      <Drawer
        width={314}
        title={<span>Basic Information </span>}
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={() => {
          form.validate().then((res) => {
            setConfirmLoading(true)
            setTimeout(() => {
              setVisible(false)
              setConfirmLoading(false)
            }, 1500)
          })
        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <Form {...formItemLayout} form={form} layout="vertical">
          <Form.Item label="Name" field="name" rules={[{ required: true }]}>
            <Input placeholder="Plear enter" />
          </Form.Item>
          <Form.Item label="URL" required field="url" rules={[{ required: true }]}>
            <Input placeholder="Plear enter" prefix="http://" suffix=".com" />
          </Form.Item>
          <Form.Item label="Hometown" field="hometown" rules={[{ required: true }]}>
            <Select placeholder="Plear select" options={['Beijing', 'Shanghai']} />
          </Form.Item>
          <Form.Item label="Date of Birth" field="birthday" rules={[{ required: true }]}>
            <DatePicker placeholder="Plear select" />
          </Form.Item>
          <Form.Item label="Self Introduction" required field="introduction" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Plear enter" />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}
