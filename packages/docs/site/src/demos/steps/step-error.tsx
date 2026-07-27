import { Steps } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Steps current={2} status="error" style={{ maxWidth: 780, marginBottom: 40 }}>
      <Steps.Step title="Succeeded" description="This is a description" />
      <Steps.Step title="Processing" description="This is a description" />
      <Steps.Step title="Pending" description="This is a description" />
    </Steps>
  );
}
