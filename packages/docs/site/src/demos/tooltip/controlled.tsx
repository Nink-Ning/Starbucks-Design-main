import React from 'react';
import { Tooltip, Typography, Switch, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Typography.Text style={{ marginRight: 10, }} >
        {visible ? 'Hide' : 'Show'} Tooltip
      </Typography.Text>
      <Switch
        onChange={() => {
          setVisible(!visible);
        }}
      ></Switch>
      <br />
      <br />
      <Tooltip position="bottom" content="Mouse over to display tooltip" popupVisible={visible}>
        <Button>Be Controled</Button>
      </Tooltip>
    </div>
  );
}
