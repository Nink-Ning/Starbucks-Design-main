import { Button, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  function updateMessage() {
    const close = Message.info({
      content: 'Close after 2 seconds...',
      duration: 0
    })
    setTimeout(() => {
      close()
    }, 2000)
  }
  return (
    <Button onClick={updateMessage} type="primary">
      Close after 2 seconds
    </Button>
  );
}
