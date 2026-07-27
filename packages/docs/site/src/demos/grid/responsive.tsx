import { Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Grid.Row className="grid-demo">
      <Grid.Col xs={2} sm={4} md={6} lg={8} xl={10} xxl={8}>
        Col
      </Grid.Col>
      <Grid.Col xs={20} sm={16} md={12} lg={8} xl={4} xxl={8}>
        Col
      </Grid.Col>
      <Grid.Col xs={2} sm={4} md={6} lg={8} xl={10} xxl={8}>
        Col
      </Grid.Col>
    </Grid.Row>
  );
}
