import { Button, Message, Popconfirm } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Popconfirm
        focusLock
        title="Confirm"
        content="Are you sure you want to delete?"
        onOk={() => {
          Message.info({
            content: 'ok'
          });
        }}
        onCancel={() => {
          Message.error({
            content: 'cancel'
          });
        }}
      >
        <Button>Delete</Button>
      </Popconfirm>
    </div>
  );
}
