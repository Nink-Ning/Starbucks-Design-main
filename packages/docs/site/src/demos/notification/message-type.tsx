import { Button, Space, Notification } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size="large">
      <Button
        onClick={() =>
          Notification.info({
            title: 'Normal',
            content: 'This is an error Notification!'
          })
        }
        type="primary"
      >
        Info
      </Button>
      <Button
        onClick={() =>
          Notification.success({
            title: 'Success',
            content: 'This is a success Notification!'
          })
        }
        type="primary"
        status="success"
      >
        Success
      </Button>
      <Button
        onClick={() =>
          Notification.warning({
            title: 'Warning',
            content: 'This is a warning Notification!'
          })
        }
        type="primary"
        status="warning"
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          Notification.error({
            title: 'Error',
            content: 'This is an error Notification!'
          })
        }
        type="primary"
        status="danger"
      >
        Error
      </Button>
      <Button
        onClick={() =>
          Notification.normal({
            title: 'Normal',
            content: 'This is an normal  Notification!'
          })
        }
        type="secondary"
      >
        Normal
      </Button>
    </Space>
  );
}
