import { Result, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Result
        status="403"
        subTitle="Access to this resource on the server is denied."
        extra={<Button type="primary">Back</Button>}
      ></Result>
    </div>
  );
}
