import React from 'react';
import { Button, Drawer } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [visible2, setVisible2] = React.useState(false)
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
        width={500}
        title={<span>First Drawer </span>}
        visible={visible}
        onOk={() => {
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <Button
          onClick={() => {
            setVisible2(true)
          }}
          type="primary"
          style={{ marginTop: 20 }}
        >
          Open Drawer
        </Button>
      </Drawer>
      <Drawer
        width={332}
        title={<span>Second Drawer </span>}
        visible={visible2}
        onOk={() => {
          setVisible2(false)
        }}
        onCancel={() => {
          setVisible2(false)
        }}
      >
        <div>Here is an example text.</div>

        <div>Here is an example text.</div>
      </Drawer>
    </div>
  )
}
