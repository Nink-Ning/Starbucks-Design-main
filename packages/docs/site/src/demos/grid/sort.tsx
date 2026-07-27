import { Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div style={{ width: '100%' }}>
      <Grid.Row className="grid-demo">
        <Grid.Col span={6} order={4}>
          <div>1 col-order-4</div>
        </Grid.Col>
        <Grid.Col span={6} order={3}>
          <div>2 col-order-3</div>
        </Grid.Col>
        <Grid.Col span={6} order={2}>
          <div>3 col-order-2</div>
        </Grid.Col>
        <Grid.Col span={6} order={1}>
          <div>4 col-order-1</div>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}
