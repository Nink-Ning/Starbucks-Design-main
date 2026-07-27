import { useState } from 'react';
import { Grid, Switch, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ width: '100%' }}>
        <div style={{ marginBottom: '20px' }}>
            <Typography.Text>折叠：</Typography.Text>
            <Switch checked={collapsed} onChange={setCollapsed}  />
        </div>
        <Grid collapsed={collapsed} cols={3} colGap={12} rowGap={16} className="grid-demo-grid">
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item" offset={1}>item | offset - 1</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item" span={3}>item | span - 3</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item" suffix>{
              ({ overflow }) => `suffix | overflow: ${!!overflow}`
            }</Grid.GridItem>
        </Grid>
    </div>
  );
}
