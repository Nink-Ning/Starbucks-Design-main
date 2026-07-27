import { Input, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space wrap>
      <Input.TextArea placeholder="Enter something" style={{ minHeight: 64, width: 350 }} />
      <Input.TextArea defaultValue="Disabled" style={{ minHeight: 64, width: 350 }} disabled />
    </Space>
  );
}
