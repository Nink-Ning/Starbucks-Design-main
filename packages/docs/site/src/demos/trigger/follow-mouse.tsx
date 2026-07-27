import React from 'react';
import { Grid, Typography, Select, Trigger, Skeleton } from '@sbux/starbucks-design-react';

export default function Demo() {
  function Popup() {
    return (
      <div
        className="demo-trigger-popup"
        style={{
          width: 300,
        }}
      >
        <Skeleton />
      </div>
    );
  }

  const [trigger, setTrigger] = React.useState(['click']);
  return (
    <div>
      <Grid.Row align="center" style={{ marginBottom: 20 }}>
        <Typography.Text>Trigger</Typography.Text>
        <Select
          value={trigger}
          style={{ width: 300, margin: '0 20px' }}
          options={['click', 'hover', 'contextMenu']}
          onChange={setTrigger}
          mode="multiple"
        ></Select>
      </Grid.Row>
      <Trigger
        popup={() => <Popup />}
        alignPoint
        position="bl"
        popupAlign={{
          bottom: 8,
          left: 8,
        }}
        trigger={trigger}
      >
        <div className="demo-trigger-manual">
          <Typography.Text>Click</Typography.Text>
        </div>
      </Trigger>
    </div>
  );
}
