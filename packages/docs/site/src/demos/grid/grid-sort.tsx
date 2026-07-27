import { Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div style={{ width: '100%' }}>
      <Grid.Row
        className="grid-demo"
        style={{ marginBottom: 16, backgroundColor: 'var(--color-fill-2)' }}
      >
        <Grid.Col span={8} push={16}>
          col - 8 | push - 16
        </Grid.Col>
        <Grid.Col span={16} pull={8}>
          col - 16 | pull - 8
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}
