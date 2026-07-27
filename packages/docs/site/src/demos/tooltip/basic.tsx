import { Tooltip, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Tooltip content="This is tooltip content">
        <Typography.Text style={{ marginRight: 20, }} >
          Mouse over to display tooltip
        </Typography.Text>
      </Tooltip>
      <Tooltip content="This is a two-line tooltip content.This is a two-line tooltip content.">
        <Typography.Text>Mouse over to display multiple lines tooltip</Typography.Text>
      </Tooltip>
    </div>
  );
}
