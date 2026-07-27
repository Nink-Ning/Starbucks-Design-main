import { Button, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  function updateMessage() {
    Message.loading({
      id: 'need_update',
      content: 'Will update after 2 seconds...'
    })
    setTimeout(() => {
      Message.success({
        id: 'need_update',
        content: 'Update success!'
      })
    }, 2000)
  }
  return (
    <Button onClick={updateMessage} type="primary">
      Update message
    </Button>
  );
}
