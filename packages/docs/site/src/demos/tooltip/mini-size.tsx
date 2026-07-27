import { Tooltip, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Tooltip mini content="123456789">
      <Typography.Text>Mouse over to display tooltip</Typography.Text>
    </Tooltip>
  );
}
