import { Result, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Result
        status="404"
        subTitle="Whoops, that page is gone. "
        extra={[
          <Button key="again" style={{ margin: '0 16px' }}>
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
