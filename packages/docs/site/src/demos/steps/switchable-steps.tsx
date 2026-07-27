import { useState } from 'react';
import { Steps } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [current, setCurrent] = useState(1);
  return (
    <div>
      <Steps type="arrow" current={current} onChange={setCurrent} style={{ marginBottom: 20 }}>
        <Steps.Step title="Succeeded" description="This is a description" />
        <Steps.Step title="Processing" description="This is a description" />
        <Steps.Step title="Pending" description="This is a description" />
      </Steps>
      <Steps current={current} onChange={setCurrent} direction="vertical">
        <Steps.Step title="Succeeded" description="This is a description" />
        <Steps.Step title="Processing" description="This is a description" />
        <Steps.Step title="Pending" description="This is a description" />
      </Steps>
    </div>
  );
}
