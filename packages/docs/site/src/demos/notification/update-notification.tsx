import { Button, Notification } from '@sbux/starbucks-design-react';

export default function Demo() {
  function updateNotification() {
    Notification.warning({
      id: 'need_update',
      title: 'Ready to update',
      content: 'Will update after 2 seconds...'
    });
    setTimeout(() => {
      Notification.success({
        id: 'need_update',
        title: 'Success',
        content: 'Update success!'
      });
    }, 2000);
  }

  return (
    <Button onClick={updateNotification} type="primary">
      Update Notification
    </Button>
  );
}
