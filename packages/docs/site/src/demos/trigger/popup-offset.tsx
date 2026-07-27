import { Trigger, Skeleton, Space, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  function Popup() {
    return <Skeleton className="demo-trigger-popup" style={{ width: 300 }} />;
  }

  return (
    <div style={{ background: 'var(--color-fill-2)', padding: 40 }}>
      <Space size={[40, 10]} wrap>
        <Trigger
          trigger="click"
          position="top"
          popupAlign={{
            top: 20,
          }}
          popup={() => <Popup />}
        >
          <Button type="primary">
            Top
          </Button>
        </Trigger>
        <Trigger
          trigger="click"
          position="top"
          popupAlign={{
            top: [100, 20],
          }}
          popup={() => <Popup />}
        >
          <Button type="primary">
            Top offset [100, 20]
          </Button>
        </Trigger>
        <Trigger
          trigger="click"
          position="top"
          popupAlign={{
            top: [-100, 20],
          }}
          popup={() => <Popup />}
        >
          <Button type="primary">
            Top offset [-100, 20]
          </Button>
        </Trigger>
        <Trigger
          trigger="click"
          position="right"
          popupAlign={{
            right: 30,
          }}
          popup={() => <Popup />}
        >
          <Button type="primary">
            Right
          </Button>
        </Trigger>
        <Trigger
          trigger="click"
          position="right"
          popupAlign={{
            right: [30, 50],
          }}
          popup={() => <Popup />}
        >
          <Button type="primary">
            Right offset [30, 50]
          </Button>
        </Trigger>
        <Trigger
          trigger="click"
          position="right"
          popupAlign={{
            right: [30, -50],
          }}
          popup={() => <Popup />}
        >
          <Button type="primary">
            Right offset [30, -50]
          </Button>
        </Trigger>
      </Space>
    </div>
  );
}
