import { Alert, Button, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Alert
        content="Here is an example text"
        action={
          <Button size="mini" type="primary">
            Detail
          </Button>
        }
        closable
      />
      <Alert
        title="Example"
        content="Here is an example text"
        action={
          <Button size="mini" type="primary">
            Detail
          </Button>
        }
        closable
        style={{ marginTop: 10 }}
      />
      <Alert
        title="Example"
        content="Here is an example text"
        action={
          <Space direction="vertical">
            <Button size="mini" type="primary">
              Detail
            </Button>
            <Button size="mini" type="primary" status="danger">
              Close
            </Button>
          </Space>
        }
        style={{ marginTop: 10 }}
      />
    </div>
  );
}
