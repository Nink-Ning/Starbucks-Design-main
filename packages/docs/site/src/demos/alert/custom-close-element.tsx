import { Alert, Grid } from '@sbux/starbucks-design-react';
import { IconCheck } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Grid.Row gutter={40}>
      <Grid.Col span={12}>
        <Alert
          closable
          style={{ marginBottom: 20 }}
          type="success"
          content="Here is a success text"
          closeElement={<IconCheck />}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Alert
          closable
          style={{ marginBottom: 20 }}
          type="success"
          content="Here is a success text"
          closeElement="Close"
        />
      </Grid.Col>
    </Grid.Row>
  );
}
