import { Link, Space } from '@sbux/starbucks-design-react';
import { IconEdit } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size={0} direction="vertical">
      <Space size="large">
        <Link href="#" icon>
          Hyperlinks
        </Link>
        <Link href="#" icon disabled>
          Hyperlinks
        </Link>
      </Space>
      <Space size="large">
        <Link href="#" icon={<IconEdit />}>
          Hyperlinks
        </Link>
        <Link href="#" icon={<IconEdit />} disabled>
          Hyperlinks
        </Link>
      </Space>
    </Space>
  );
}
