import { Badge, Avatar, Space } from '@sbux/starbucks-design-react';
import { IconClockCircle } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size={40}>
      <Badge count={9}>
        <Avatar shape="square" />
      </Badge>
      <Badge count={9} dot dotStyle={{ width: 10, height: 10 }}>
        <Avatar shape="square" />
      </Badge>
      <Badge
        count={<IconClockCircle style={{ verticalAlign: 'middle', color: 'var(--color-text-2)' }} />}
        dotStyle={{
          height: 16,
          width: 16,
          fontSize: 14
        }}
      >
        <Avatar shape="square" />
      </Badge>
    </Space>
  );
}
