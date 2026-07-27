import { useState } from 'react';
import { Badge, Avatar, Space, Switch, Button } from '@sbux/starbucks-design-react';
import { IconPlus, IconMinus } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const [count, setCount] = useState(12);
  const [dot, setDot] = useState(true);

  return (
    <Space direction="vertical" size="large">
      <Space size="large">
        <Badge dot={dot} count={dot ? count : 0}>
          <Avatar shape="square"> </Avatar>
        </Badge>
        <Switch checked={dot} onChange={setDot}></Switch>
      </Space>
      <Space size="large">
        <Badge count={count}>
          <Avatar shape="square"> </Avatar>
        </Badge>
        <Button.Group>
          <Button icon={<IconPlus />} onClick={() => setCount((c) => c + 1)}></Button>
          <Button icon={<IconMinus />} onClick={() => setCount((c) => Math.max(c - 1, 0))}></Button>
        </Button.Group>
      </Space>
    </Space>
  );
}
