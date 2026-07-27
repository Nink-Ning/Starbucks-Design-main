import { Input, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space wrap>
      <Input.Password defaultValue="password" style={{ width: 350 }} />
      <Input.Password
        defaultValue="password"
        defaultVisibility={true}
        placeholder="Enter password"
        style={{ width: 350 }}
      />
    </Space>
  );
}
