import { Space, Typography, Tag, Button, Switch } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space>
      <Typography.Text>Space:</Typography.Text>
      <Tag color="arcoblue">Tag</Tag>
      <Button type="primary">Item1</Button>
      <Button type="primary">Item2</Button>
      <Switch defaultChecked />
    </Space>
  );
}
