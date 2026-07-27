import React from 'react';
import { Button, Modal, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [visible1, setVisible1] = React.useState(false)
  return (
    <Space>
      <Button onClick={() => setVisible(true)} type="primary">
        Left align title
      </Button>
      <Modal
        title={<div style={{ textAlign: 'left' }}>Modal Title</div>}
        visible={visible}
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

      <Button onClick={() => setVisible1(true)} type="primary">
        Center align title
      </Button>
      <Modal
        title="Modal Title"
        visible={visible1}
        onCancel={() => {
          setVisible1(false)
        }}
        onOk={() => {
          setVisible1(false)
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
