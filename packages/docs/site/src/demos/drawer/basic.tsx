import React from 'react';
import { Button, Drawer } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [visible, setVisible] = React.useState(false)
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
        width={332}
        title={<span>Basic Information </span>}
        visible={visible}
        onOk={() => {
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <div>Here is an example text.</div>

        <div>Here is an example text.</div>
      </Drawer>
    </div>
  )
}
