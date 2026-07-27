import { Button, Message, Popconfirm } from '@sbux/starbucks-design-react';

export default function Demo() {
  function delayClose() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        Message.info({
          content: 'ok'
        });
      }, 2000);
    });
  }

  return (
    <Popconfirm
      title="Are you sure you want to delete?"
      onOk={delayClose}
      onCancel={() => {
        Message.error({
          content: 'cancel'
        });
      }}
      focusLock
    >
      <Button style={{ marginRight: 20 }}>Async close</Button>
    </Popconfirm>
  );
}
