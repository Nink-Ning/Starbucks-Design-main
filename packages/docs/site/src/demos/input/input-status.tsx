import { Input, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space wrap>
      <Input style={{ width: 350 }} status="error" placeholder="error status" />
      <Input style={{ width: 350 }} status="warning" placeholder="warning status" />
      <Input style={{ width: 350 }} disabled placeholder="disabled input" />
    </Space>
  );
}
