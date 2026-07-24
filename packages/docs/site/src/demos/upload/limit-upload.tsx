import { Upload, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Upload
      action="/"
      limit={3}
      multiple
      onExceedLimit={() => {
        Message.warning('超过上传数量限制！最多上传3个');
      }}
    />
  );
}
