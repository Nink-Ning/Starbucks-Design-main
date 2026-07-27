import { useState } from 'react';
import { Steps } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [current, setCurrent] = useState(1);
  return (
    <div>
      <Steps
        type="navigation"
        current={current}
        onChange={setCurrent}
        style={{ width: 780, marginBottom: 60 }}
      >
        <Steps.Step title="Succeeded" />
        <Steps.Step title="Processing" />
        <Steps.Step title="Pending" />
      </Steps>
      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={setCurrent}
        style={{ width: 780, marginBottom: 60 }}
      >
        <Steps.Step title="Succeeded" />
        <Steps.Step title="Processing" />
        <Steps.Step title="Pending" />
      </Steps>
      <Steps type="navigation" current={current} onChange={setCurrent} style={{ width: 780 }}>
        <Steps.Step title="Succeeded" description="This is a description" />
        <Steps.Step title="Processing" description="This is a description" />
        <Steps.Step title="Pending" description="This is a description" />
      </Steps>
    </div>
  );
}
