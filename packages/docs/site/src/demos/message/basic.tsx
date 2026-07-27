import { Button, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Button
      onClick={() => {
        Message.info('This is an info message!')
      }}
      type="primary"
    >
      Open Message
    </Button>
  );
}
