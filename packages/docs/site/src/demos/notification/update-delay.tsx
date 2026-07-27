import { Button, Notification } from '@sbux/starbucks-design-react';

export default function Demo() {
  function updateNotification() {
    Notification.warning({
      id: 'need_update_duration',
      title: 'Ready to update',
      content: 'Will update after 2 seconds...',
      duration: 3000
    });
    setTimeout(() => {
      Notification.success({
        id: 'need_update_duration',
        title: 'Success',
        content: 'Will close after 3 seconds!',
        duration: 3000
      });
    }, 2000);
  }

  return (
    <Button onClick={updateNotification} type="primary">
      Update Notification
    </Button>
  );
}
