import { Trigger, Skeleton, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  function Popup() {
    return <Skeleton className="demo-trigger-popup" style={{ width: 300 }} />;
  }

  return (
    <div
      style={{
        background: 'var(--color-fill-2)',
        padding: 40,
        height: 100,
        overflow: 'auto',
      }}
    >
      <div style={{ height: 200 }}>
        <Trigger trigger="click" position="bottom" popup={() => <Popup />} updateOnScroll>
          <Button type="primary" style={{ marginTop: 80 }}>
            Button
          </Button>
        </Trigger>
      </div>
    </div>
  );
}
