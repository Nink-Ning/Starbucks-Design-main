import React from 'react';
import { Space, Trigger, Skeleton, Button, Input } from '@sbux/starbucks-design-react';

export default function Demo() {
  function Popup() {
    return (
      <div className="demo-trigger-popup" style={{ width: 300 }}>
        <Skeleton />
      </div>
    );
  }

  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);
  return (
    <Space size={40}>
      <Trigger
        popupVisible={visible}
        popup={() => <Popup />}
        trigger="click"
        classNames="zoomInTop"
        onVisibleChange={(visible) => {
          setVisible(visible);
        }}
      >
        <Button >Click Me (controlled)</Button>
      </Trigger>
      <Trigger
        popupVisible={visible3}
        popup={() => <Popup />}
        trigger="click"
        classNames="zoomInTop"
        onClickOutside={() => {
          setVisible3(false);
        }}
      >
        <Button
          onClick={() => {
            setVisible3(!visible3);
          }}
        >
          no onVisibleChange (controlled)
        </Button>
      </Trigger>
      <Trigger
        blurToHide={false}
        popupVisible={visible2}
        popup={() => <Popup />}
        trigger="focus"
        classNames="zoomInTop"
        onClickOutside={() => {
          setVisible2(false);
        }}
        onVisibleChange={(visible) => {
          setVisible2(visible);
        }}
      >
        <Input style={{ width: 200 }} placeholder="Focus Me (controlled)"></Input>
      </Trigger>
    </Space>
  );
}
