import { Button, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Button
      onClick={() => {
        Message.info({
          content: 'This is a message!',
          closable: true,
          duration: 10000
        })
      }}
      type="primary"
    >
      Open Message
    </Button>
  );
}
