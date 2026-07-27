import { Result, Button } from '@sbux/starbucks-design-react';
import { IconFaceSmileFill } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <div>
      <Result
        status={null}
        icon={<IconFaceSmileFill style={{ color: 'rgb(var(--arcoblue-6))' }} />}
        title="Your operation has been performed."
        extra={<Button type="primary">Back</Button>}
      ></Result>
    </div>
  );
}
