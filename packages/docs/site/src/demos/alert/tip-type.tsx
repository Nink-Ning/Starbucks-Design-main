import { Alert, Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Grid.Row gutter={40}>
        <Grid.Col span={12}>
          <Alert style={{ marginBottom: 20 }} type="info" content="Here is an info text" />
          <Alert type="warning" content="Here is a warning text" />
        </Grid.Col>
        <Grid.Col span={12}>
          <Alert style={{ marginBottom: 20 }} type="success" content="Here is a success text" />
          <Alert type="error" content="Here is an error text" />
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}
