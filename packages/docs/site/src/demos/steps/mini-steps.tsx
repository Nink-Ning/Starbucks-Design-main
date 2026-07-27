import { Steps, Divider } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Steps current={2} style={{ maxWidth: 780, margin: '0 auto' }} size="small">
        <Steps.Step title="Succeeded" />
        <Steps.Step title="Processing" />
        <Steps.Step title="Pending" />
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
