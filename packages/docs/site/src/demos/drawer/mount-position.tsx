import React from 'react';
import { Button, Drawer } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [visible, setVisible] = React.useState(false)
  const refWrapper = React.useRef(null)
  const wrapperStyle = {
    width: '100%',
    height: 300,
    backgroundColor: 'var(--color-fill-2)',
    position: 'relative',
    overflow: 'hidden',
    lineHeight: '300px',
    textAlign: 'center'
  }
  return (
    <div ref={refWrapper} style={wrapperStyle}>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open
      </Button>
      <Drawer
        title="Basic"
        visible={visible}
        getPopupContainer={() => refWrapper && refWrapper.current}
        footer={null}
        onOk={() => {
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <div style={{ textAlign: 'left' }}>Here is an example text.</div>
      </Drawer>
    </div>
  )
}
