import React from 'react';
import { Button, Link, Popover, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const style = {
    margin: 0,
  };

  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  return (
    <Space size={40}>
      <Popover
        title="Title"
        popupVisible={visible}
        onVisibleChange={setVisible}
        content={
          <span>
            <p style={style}>Here is the text content</p>
            <p style={style}>Here is the text content</p>
            <p style={{ ...style, textAlign: 'right', marginTop: 4 }}>
              <Link onClick={() => setVisible(false)}>Close</Link>
            </p>
          </span>
        }
      >
        <Button type="primary">
          Hover
        </Button>
      </Popover>
      <Popover
        title="Title"
        popupVisible={visible2}
        onVisibleChange={(visible) => {
          if (visible) {
            setVisible2(true);
          }
        }}
        content={
          <span>
            <p style={style}>Here is the text content</p>
            <p style={style}>Here is the text content</p>
            <p style={{ ...style, textAlign: 'right', marginTop: 4 }}>
              <Link onClick={() => setVisible2(false)}>Close</Link>
            </p>
          </span>
        }
      >
        <Button type="primary">Will not close when moved out</Button>
      </Popover>
    </Space>
  );
}
