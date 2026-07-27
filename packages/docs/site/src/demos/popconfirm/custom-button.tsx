import { Button, Message, Popconfirm } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Popconfirm
        focusLock
        title="Do you want to discard the draft?"
        okText="Discard"
        cancelText="Cancel"
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
        <Button>Discard</Button>
      </Popconfirm>
    </div>
  );
}
