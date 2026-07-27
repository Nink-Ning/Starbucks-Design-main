import { Result, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Result
        status="warning"
        title="There is a problem with your operation."
        extra={<Button type="primary">Back</Button>}
      ></Result>
    </div>
  );
}
