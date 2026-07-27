import { Button, Message, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size="large">
      <Button
        onClick={() =>
          Message.info({
            content: 'This is a message!',
            showIcon: true,
            position: 'top'
          })
        }
        type="primary"
      >
        Top
      </Button>
      <Button
        onClick={() =>
          Message.info({
            content: 'This is a message!',
            showIcon: true,
            position: 'bottom'
          })
        }
        type="primary"
      >
        Bottom
      </Button>
    </Space>
  );
}
