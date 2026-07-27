import { Result, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Result title="Your operation has been performed." extra={<Button type="primary">Back</Button>}></Result>
    </div>
  );
}
