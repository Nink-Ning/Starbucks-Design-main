import React from 'react';
import { Button, Drawer, Radio } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [visible, setVisible] = React.useState()
  const [placement, setPlacement] = React.useState('right')
  return (
    <div>
      <Radio.Group name="placement" defaultValue={placement} onChange={setPlacement}>
        <Radio value="top">Top</Radio>
        <Radio value="bottom">Bottom</Radio>
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
      </Radio.Group>
      <br />
      <Button
        onClick={() => {
          setVisible(true)
        }}
        type="primary"
        style={{ marginTop: 20 }}
      >
        Open Drawer
      </Button>
      <Drawer
        width={332}
        height={332}
        title={<span>Basic Information </span>}
        visible={visible}
        placement={placement}
        onOk={() => {
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <div>Here is an example text. </div>
        <div>Here is an example text.</div>
      </Drawer>
    </div>
  )
}
