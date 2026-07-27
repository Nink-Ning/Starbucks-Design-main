import { Button, Notification } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Button
      onClick={() =>
        Notification.info({
          style: { width: 500 },
          title: 'Notification',
          content: 'This is a notification! This is a notification! This is a notification! This is a notification! '
        })
      }
      type="primary"
    >
      Open Notification
    </Button>
  );
}
