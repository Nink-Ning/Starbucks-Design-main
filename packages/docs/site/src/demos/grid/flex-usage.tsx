import { Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div style={{ width: '100%' }}>
      <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Grid.Col flex="100px">
          <div>100px</div>
        </Grid.Col>
        <Grid.Col flex="auto">
          <div>auto</div>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Grid.Col flex="100px">
          <div>100px</div>
        </Grid.Col>
        <Grid.Col flex="auto">
          <div>auto</div>
        </Grid.Col>
        <Grid.Col flex="100px">
          <div>100px</div>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Grid.Col flex={3}>
          <div>3 / 12</div>
        </Grid.Col>
        <Grid.Col flex={4}>
          <div>4 / 12</div>
        </Grid.Col>
        <Grid.Col flex={5}>
          <div>5 / 12</div>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}
