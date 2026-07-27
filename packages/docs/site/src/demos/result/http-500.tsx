import { Result, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Result status="500" subTitle="This page isn’t working." extra={<Button type="primary">Back</Button>}></Result>
    </div>
  );
}
