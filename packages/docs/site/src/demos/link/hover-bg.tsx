import { Link, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size={40}>
      <Link hoverable={false}> Link </Link>
      <Link hoverable={false} status="error">
        Link
      </Link>
    </Space>
  );
}
