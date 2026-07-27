import { Result, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Result
        status="success"
        title="Success message"
        subTitle="This is a success description."
        extra={[
          <Button key="again" type="secondary" style={{ margin: '0 16px' }}>
            Again
          </Button>,
          <Button key="back" type="primary">
            Back
          </Button>
        ]}
      ></Result>
    </div>
  );
}
