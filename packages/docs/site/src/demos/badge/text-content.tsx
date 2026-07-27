import { Badge, Avatar, Space } from '@sbux/starbucks-design-react';
import { IconUser } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size={40}>
      <Badge text="NEW">
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
      <Badge text="HOT">
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
    </Space>
  );
}
