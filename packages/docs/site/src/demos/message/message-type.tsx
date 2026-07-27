import { Button, Message, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size="large">
      <Button onClick={() => Message.info('This is an info message!')} type="primary">
        Info
      </Button>
      <Button onClick={() => Message.success('This is a success message!')} type="primary" status="success">
        Success
      </Button>
      <Button onClick={() => Message.warning('This is a warning message!')} type="primary" status="warning">
        Warning
      </Button>
      <Button onClick={() => Message.error('This is an error message!')} type="primary" status="danger">
        Error
      </Button>
      <Button type="secondary" onClick={() => Message.normal('This is a message!')}>
        Normal
      </Button>
    </Space>
  );
}
