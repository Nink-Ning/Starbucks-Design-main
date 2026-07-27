import { Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div style={{ width: '100%' }}>
      <Grid.Row className="grid-demo">
        <Grid.Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
        </Grid.Col>
        <Grid.Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
        </Grid.Col>
        <Grid.Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}
