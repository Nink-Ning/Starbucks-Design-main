import { useState } from 'react';
import { Avatar, Button, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [index, setIndex] = useState(0);
  const list = ['B', 'Arco', 'Design', 'Tom', 'AD'];
  return (
    <Space>
      <Avatar>{list[index]}</Avatar>
      <Button type="secondary" onClick={() => setIndex(index >= 4 ? 0 : index + 1)}>
        Change
      </Button>
    </Space>
  );
}
