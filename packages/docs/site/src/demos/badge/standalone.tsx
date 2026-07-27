import { Badge, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size={40}>
      <Badge count={2} />
      <Badge count={2} dotStyle={{ background: '#E5E6EB', color: '#86909C' }} />
      <Badge count={16} />
      <Badge maxCount={99} count={1000} />
    </Space>
  );
}
