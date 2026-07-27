import { Space, Tag } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size="large">
      <Tag checkable>Awesome</Tag>
      <Tag checkable color="red" defaultChecked>
        Toutiao
      </Tag>
      <Tag checkable color="arcoblue" defaultChecked>
        Lark
      </Tag>
    </Space>
  );
}
