import { Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div style={{ width: '100%' }}>
      <Grid.Row
        className="grid-demo"
        style={{ marginBottom: 16, backgroundColor: 'var(--color-fill-2)' }}
      >
        <Grid.Col span={8}>col - 8</Grid.Col>
        <Grid.Col span={8} offset={8}>
          col - 8 | offset - 8
        </Grid.Col>
      </Grid.Row>
      <Grid.Row
        className="grid-demo"
        style={{ marginBottom: 16, backgroundColor: 'var(--color-fill-2)' }}
      >
        <Grid.Col span={6} offset={8}>
          col - 6 | offset - 8
        </Grid.Col>
        <Grid.Col span={6} offset={4}>
          col - 6 | offset - 4
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="grid-demo" style={{ backgroundColor: 'var(--color-fill-2)' }}>
        <Grid.Col span={12} offset={8}>
          col - 12 | offset - 8
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}
