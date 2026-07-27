import { Space, Divider, Link } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space split={<Divider type="vertical" />}>
      <Link>Link 1</Link>
      <Link>Link 2</Link>
      <Link>Link 3</Link>
    </Space>
  );
}
