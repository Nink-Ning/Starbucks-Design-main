import { Button, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  function updateMessage() {
    Message.loading({
      id: 'need_update',
      content: 'Will update after 2 seconds...',
      duration: 3000
    })
    setTimeout(() => {
      Message.success({
        id: 'need_update',
        content: 'Will update after 3 seconds!',
        duration: 3000
      })
    }, 2000)
  }
  return (
    <Button onClick={updateMessage} type="primary">
      Update message
    </Button>
  );
}
