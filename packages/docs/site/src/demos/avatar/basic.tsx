import { Avatar, Space } from '@sbux/starbucks-design-react';
import { IconUser } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size="large">
      <Avatar>A</Avatar>
      <Avatar style={{ backgroundColor: 'var(--color-primary-hover)' }}>
        <IconUser />
      </Avatar>
      <Avatar style={{ backgroundColor: 'var(--color-success)' }}>Nink</Avatar>
      <Avatar style={{ backgroundColor: 'var(--color-warning)' }}>Starbucks</Avatar>
      <Avatar>
        <img
          alt="avatar"
          src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />
      </Avatar>
    </Space>
  );
}
