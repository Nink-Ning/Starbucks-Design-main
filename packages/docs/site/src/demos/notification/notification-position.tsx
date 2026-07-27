import { Button, Space, Notification } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size="large">
      <Button
        onClick={() =>
          Notification.success({
            title: 'Title',
            content: 'This is a Notification!',
            showIcon: true,
            position: 'topLeft'
          })
        }
        type="primary"
      >
        Top Left
      </Button>
      <Button
        onClick={() =>
          Notification.success({
            title: 'Title',
            content: 'This is a Notification!',
            showIcon: true,
            position: 'topRight'
          })
        }
        type="primary"
      >
        Top Right
      </Button>
      <Button
        onClick={() =>
          Notification.success({
            title: 'Title',
            content: 'This is a Notification!',
            showIcon: true,
            position: 'bottomLeft'
          })
        }
        type="primary"
      >
        Bottom Left
      </Button>
      <Button
        onClick={() =>
          Notification.success({
            title: 'Title',
            content: 'This is a Notification!',
            showIcon: true,
            position: 'bottomRight'
          })
        }
        type="primary"
      >
        Bottom Right
      </Button>
    </Space>
  );
}
