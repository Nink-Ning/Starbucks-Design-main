import React from 'react';
import { Button, Checkbox, Drawer } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [hasHeader, setHeader] = React.useState(true)
  const [hasFooter, setFooter] = React.useState(true)
  const [hasClose, setClose] = React.useState(true)
  return (
    <div>
      <Checkbox
        onChange={(value) => {
          setHeader(!value)
        }}
        style={{ marginRight: 20 }}
      >
        Hide title
      </Checkbox>
      <Checkbox
        onChange={(value) => {
          setFooter(!value)
        }}
        style={{ marginRight: 20 }}
      >
        Hide footer
      </Checkbox>
      <Checkbox
        onChange={(value) => {
          setClose(!value)
        }}
      >
        Hide close icon
      </Checkbox>
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
        width={320}
        title={hasHeader ? 'Basic Information' : null}
        footer={hasFooter ? <span>footer</span> : null}
        closable={hasClose}
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
