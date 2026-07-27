import { Divider, Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div style={{ width: '100%' }}>
      <Divider orientation="left">Horizontal</Divider>
      <Grid.Row className="grid-gutter-demo" gutter={24}>
        <Grid.Col span={12}>
          <div>col - 12</div>
        </Grid.Col>
        <Grid.Col span={12}>
          <div>col - 12</div>
        </Grid.Col>
      </Grid.Row>
      <Divider orientation="left">Responsive</Divider>
      <Grid.Row className="grid-gutter-demo" gutter={{ md: 8, lg: 24, xl: 32 }}>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
      </Grid.Row>
      <Divider orientation="left">Horizontal and Vertical</Divider>
      <Grid.Row className="grid-gutter-demo" gutter={[24, 12]}>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col - 6</div>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}
