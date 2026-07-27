import { Alert, Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Grid.Row gutter={40}>
      <Grid.Col span={12}>
        <Alert style={{ marginBottom: 20 }} showIcon={false} type="info" content="Here is an info text" />
        <Alert
          style={{ marginBottom: 20 }}
          showIcon={false}
          type="warning"
          title="Warning"
          content="Here is a warning text"
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Alert style={{ marginBottom: 20 }} showIcon={false} type="success" content="Here is a success text" />
        <Alert
          style={{ marginBottom: 20, color: 'red' }}
          showIcon={false}
          type="error"
          title="Error"
          content="Here is an error text"
        />
      </Grid.Col>
    </Grid.Row>
  );
}
