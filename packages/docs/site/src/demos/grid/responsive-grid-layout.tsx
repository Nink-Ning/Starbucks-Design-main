import { Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div style={{ width: '100%' }}>
        <Grid cols={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }} colGap={12} rowGap={16} className="grid-responsive-demo">
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item">item</Grid.GridItem>
            <Grid.GridItem className="demo-item" span={{ xl: 4, xxl: 6 }} suffix>
                suffix
            </Grid.GridItem>
        </Grid>
    </div>
  );
}
