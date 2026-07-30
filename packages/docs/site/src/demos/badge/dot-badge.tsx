import { Badge, Link, Space } from '@sbux/starbucks-design-react';
import { IconNotification } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size={40}>
      <Badge count={9} dot offset={[6, -2]}>
        <Link href="#">Link</Link>
      </Badge>
      <Badge count={9} dot offset={[2, -2]}>
        <IconNotification
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: 18,
            verticalAlign: -3
          }}
        />
      </Badge>
    </Space>
  );
}
