import { Trigger, Skeleton, Space, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div style={{ background: 'var(--color-fill-2)', padding: 40 }}>
      <Space size={40}>
        <Trigger
          showArrow
          trigger="click"
          position="bl"
          popup={() => (
            <div className="demo-trigger-popup" style={{ width: 300 }}>
              <Skeleton />
            </div>
          )}
        >
          <Button type="primary">
            Click Me
          </Button>
        </Trigger>
        <Trigger
          showArrow
          arrowProps={{
            style: {
              background: 'red',
            },
          }}
          trigger="click"
          position="bl"
          popup={() => (
            <div className="demo-trigger-popup">
              <Skeleton />
            </div>
          )}
        >
          <Button type="primary">Click Me（arrowProps）</Button>
        </Trigger>
      </Space>
    </div>
  );
}
