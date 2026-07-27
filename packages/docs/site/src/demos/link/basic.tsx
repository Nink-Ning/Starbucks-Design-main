import { Link, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size={40}>
      <Link href="#"> Link </Link>
      <Link href="#" disabled>
        Link
      </Link>
    </Space>
  );
}
