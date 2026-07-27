import { Button, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Button
      onClick={() => {
        Message.info({
          content: 'This is an info message!',
          transitionClassNames: 'my-animation',
          transitionTimeout: {
            enter: 1000,
            exit: 500
          }
        })
      }}
      type="primary"
    >
      Open Message
    </Button>
  );
}
