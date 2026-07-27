import { Space, Trigger, Tooltip, Skeleton, Typography, Button, Input } from '@sbux/starbucks-design-react';

export default function Demo() {
  function Popup() {
    return (
      <div className="demo-trigger-popup" style={{ width: 300 }}>
        <Tooltip content="123" defaultPopupVisible>
          <span>123123</span>
        </Tooltip>
        <Skeleton />
      </div>
    );
  }

  return (
    <Space style={{ width: 1000, overflow: 'auto' }} size={40}>
      <Trigger
        popup={() => <Popup />}
        mouseEnterDelay={400}
        mouseLeaveDelay={400}
        position="bottom"
      >
        <Typography.Text style={{ marginRight: 20 }}>
          Hover me
        </Typography.Text>
      </Trigger>
      <Trigger  popup={() => <Popup />} trigger="click" position="bottom" classNames="zoomInTop">
        <Button>Click me</Button>
      </Trigger>
      <Trigger popup={() => <Popup />} trigger="focus" position="top" classNames="zoomInBottom">
        <Input style={{ width: 200 }} placeholder="Focus on me" />
      </Trigger>
    </Space>
  );
}
