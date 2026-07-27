import { Button, Space } from '@sbux/starbucks-design-react';
import { IconPlus, IconDelete } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size="large">
      <Button type="primary" icon={<IconPlus />} />
      <Button type="primary" icon={<IconDelete />}>
        Delete
      </Button>
    </Space>
  );
}
