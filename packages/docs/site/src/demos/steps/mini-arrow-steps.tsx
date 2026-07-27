import { Steps } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Steps type="arrow" size="small" current={2} style={{ maxWidth: 780, marginBottom: 20 }}>
        <Steps.Step title="Succeeded" />
        <Steps.Step title="Processing" />
        <Steps.Step title="Pending" />
      </Steps>
      <Steps type="arrow" size="small" status="error" current={2} style={{ maxWidth: 780 }}>
        <Steps.Step title="Succeeded" />
        <Steps.Step title="Processing" />
        <Steps.Step title="Pending" />
      </Steps>
    </div>
  );
}
