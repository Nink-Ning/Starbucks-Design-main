import { Avatar, Message, Space } from '@sbux/starbucks-design-react';
import { IconCamera, IconEdit, IconUser } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size="large">
      <Avatar
        triggerIcon={<IconCamera />}
        triggerIconStyle={{
          color: 'var(--color-primary)'
        }}
        onClick={() => Message.info('Upload...')}
        autoFixFontSize={false}
        style={{
          backgroundColor: 'var(--color-primary)'
        }}
      >
        A
      </Avatar>
      <Avatar
        triggerIcon={<IconEdit />}
        onClick={() => Message.info('Upload...')}
        style={{ backgroundColor: 'var(--color-success)' }}
      >
        <IconUser />
      </Avatar>
      <Avatar
        shape="square"
        triggerIcon={<IconEdit />}
        onClick={() => Message.info('Upload...')}
        style={{ backgroundColor: 'var(--color-warning)' }}
      >
        <IconUser />
      </Avatar>
      <Avatar triggerIcon={<IconCamera />} triggerType="mask">
        <img
          alt="avatar"
          src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />
      </Avatar>
    </Space>
  );
}
