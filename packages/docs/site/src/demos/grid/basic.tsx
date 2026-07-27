import { Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div style={{ width: '100%' }} className="grid-demo-background">
      <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Grid.Col span={24}>
          <div>24 - 100%</div>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Grid.Col span={12}>
          <div>12 - 50%</div>
        </Grid.Col>
        <Grid.Col span={12}>
          <div>12 - 50%</div>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Grid.Col span={8}>
          <div>8 - 33.33%</div>
        </Grid.Col>
        <Grid.Col span={8}>
          <div>8 - 33.33%</div>
        </Grid.Col>
        <Grid.Col span={8}>
          <div>8 - 33.33%</div>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Grid.Col span={6}>
          <div>6 - 25%</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>6 - 25%</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>6 - 25%</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>6 - 25%</div>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="grid-demo">
        <Grid.Col span={4}>
          <div>4 - 16.66%</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>4 - 16.66%</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>4 - 16.66%</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>4 - 16.66%</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>4 - 16.66%</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>4 - 16.66%</div>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}
