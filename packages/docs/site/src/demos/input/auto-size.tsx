import { Input, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space wrap align="top">
      <Input.TextArea
        placeholder="Enter something"
        defaultValue="This is the contents of the textarea. "
        autoSize
        style={{ width: 350 }}
      />
      <Input.TextArea
        placeholder="Enter something"
        autoSize={{ minRows: 2, maxRows: 6 }}
        style={{ width: 350 }}
        defaultValue="This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea. "
      />
    </Space>
  );
}
