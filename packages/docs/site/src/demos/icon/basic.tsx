import { Space } from '@sbux/starbucks-design-react';
import { IconHome, IconUser, IconSettings, IconSearch, IconStar } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size="large">
      <IconHome style={{ fontSize: 24 }} />
      <IconUser style={{ fontSize: 24 }} />
      <IconSettings style={{ fontSize: 24 }} />
      <IconSearch style={{ fontSize: 24 }} />
      <IconStar style={{ fontSize: 24 }} />
    </Space>
  );
}
