import { Divider, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div className="divider-demo">
      <Typography.Text>Item 1</Typography.Text>
      <Divider type="vertical" />
      <Typography.Text>Item 2</Typography.Text>
      <Divider type="vertical" />
      <Typography.Text>Item 3</Typography.Text>
    </div>
  );
}
