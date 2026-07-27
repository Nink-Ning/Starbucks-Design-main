import { Steps, Divider } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Steps labelPlacement="vertical" current={2} style={{ maxWidth: 780, margin: '0 auto' }}>
        <Steps.Step title="Succeeded" description="This is a description" />
        <Steps.Step title="Processing" description="This is a description" />
        <Steps.Step title="Pending" description="This is a description" />
      </Steps>
      <Divider />
      <div
        style={{
          lineHeight: '140px',
          textAlign: 'center',
          color: '#C9CDD4',
        }}
      >
        Step 2 Content
      </div>
    </div>
  );
}
