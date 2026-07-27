import { ConfigProvider, Space, Typography, Button, Message, Notification } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [message, messageHolder] = Message.useMessage();
  const [notification, notificationHolder] = Notification.useNotification();

  return (
    <Space direction="vertical" size={20}>
      <ConfigProvider rtl effectGlobalNotice={false} effectGlobalModal={false}>
        <Typography.Title heading={6}> 局部 RTL 视图</Typography.Title>
        <div className="demo-holder-wrapper">
          {messageHolder}
          {notificationHolder}
        </div>
        <Space>
          <Button
            onClick={() => {
              message.info && message.info('This is an info message!');
            }}
            type="primary"
          >
            Open Message
          </Button>
          <Button
            onClick={() => {
            notification.info && notification.info({
                closable: true,
                title: 'Notification',
                content: 'This is a notification!',
              });
            }}
            type="primary"
          >
            Open Notification
          </Button>
        </Space>
      </ConfigProvider>
      <div>
        <Typography.Title heading={6}> 正常视图 </Typography.Title>
        <Space>
          <Button
            onClick={() => {
              Message.info('This is an info message!');
            }}
          >
            Open Message
          </Button>

          <Button
            onClick={() => {
              Notification.info({
                closable: true,
                title: 'Notification',
                content: 'This is a notification!',
              });
            }}
          >
            Open Notification
          </Button>
        </Space>
      </div>
    </Space>
  );
}
