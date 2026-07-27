import { Progress } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Progress percent={80} animation width={300} />
      <br />
      <br />
      <Progress percent={80} status="success" animation width={300} />
    </div>
  );
}
