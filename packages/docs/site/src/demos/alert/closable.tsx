import { Alert, Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Grid.Row gutter={40}>
        <Grid.Col span={12}>
          <Alert closable style={{ marginBottom: 20 }} type="info" content="Here is an info text" />
          <Alert
            closable
            style={{ marginBottom: 20 }}
            type="warning"
            title="Warning"
            content="Here is a warning text"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Alert closable style={{ marginBottom: 20 }} type="success" content="Here is a success text" />
          <Alert closable style={{ marginBottom: 20 }} type="error" title="Error" content="Here is an error text" />
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}
