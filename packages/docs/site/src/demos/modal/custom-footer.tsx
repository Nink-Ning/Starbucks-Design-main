import React from 'react';
import { Button, Modal, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [visible1, setVisible1] = React.useState(false)
  const [loading1, setLoading1] = React.useState(false)
  const [visible2, setVisible2] = React.useState(false)
  return (
    <Space size="large">
      <Button onClick={() => setVisible(true)} type="primary">
        Open Modal with customized button props
      </Button>
      <Modal
        title="Modal Title"
        visible={visible}
        okButtonProps={{
          disabled: true
        }}
        cancelButtonProps={{
          disabled: true
        }}
        onCancel={() => {
          setVisible(false)
        }}
        onOk={() => {
          setVisible(false)
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>

      <Button
        onClick={() => {
          setVisible1(true)
        }}
        type="primary"
      >
        Open Modal with customized footer
      </Button>
      <Modal
        title="Modal Title"
        visible={visible1}
        footer={
          <>
            <Button
              onClick={() => {
                setVisible1(false)
              }}
            >
              Return
            </Button>
            <Button
              loading={loading1}
              onClick={() => {
                setLoading1(true)
                setTimeout(() => {
                  setLoading1(false)
                  setVisible1(false)
                }, 1500)
              }}
              type="primary"
            >
              Submit
            </Button>
          </>
        }
        onCancel={() => {
          setVisible1(false)
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>

      <Button
        onClick={() => {
          setVisible2(true)
        }}
        type="primary"
      >
        Open Modal without footer
      </Button>
      <Modal
        title="Modal Title"
        visible={visible2}
        footer={null}
        onCancel={() => {
          setVisible2(false)
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>
    </Space>
  )
}
