import { Space, Tag } from '@sbux/starbucks-design-react';
import { IconCheckCircleFill } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size="large">
      <Tag>Default</Tag>
      <Tag>Tag 1</Tag>
      <Tag>Tag 2</Tag>
      <Tag icon={<IconCheckCircleFill />}>Complete</Tag>
    </Space>
  );
}
