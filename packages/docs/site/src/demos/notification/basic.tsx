import { Button, Notification } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Button
      onClick={() =>
        Notification.info({
          closable: false,
          title: 'Notification',
          content: 'This is a notification!'
        })
      }
      type="primary"
    >
      Open Notification
    </Button>
  );
}
