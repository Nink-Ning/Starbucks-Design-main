import { Button, Notification } from '@sbux/starbucks-design-react';

export default function Demo() {
  function updateNotification() {
    const id = `${Date.now()}`;
    Notification.info({
      id,
      title: 'Notification',
      content: 'This is a notification!',
      duration: 0,
      btn: (
        <span>
          <Button type="secondary" size="small" onClick={() => Notification.remove(id)} style={{ margin: '0 12px' }}>
            Cancel
          </Button>
          <Button type="primary" size="small" onClick={() => Notification.remove(id)}>
            OK
          </Button>
        </span>
      )
    });
  }

  return (
    <Button onClick={updateNotification} type="primary">
      Open Notification
    </Button>
  );
}
