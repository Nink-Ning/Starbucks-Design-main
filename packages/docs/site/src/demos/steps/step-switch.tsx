import { useState } from 'react';
import { Steps, Button } from '@sbux/starbucks-design-react';
import { IconLeft, IconRight } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const [current, setCurrent] = useState(1);

  function renderContent(step) {
    return (
      <div
        style={{
          width: '100%',
          height: 200,
          textAlign: 'center',
          background: 'var(--color-bg-2)',
          color: '#C2C7CC',
        }}
      >
        <div style={{ lineHeight: '160px' }}>Step{step} Content</div>

        <div>
          <Button
            type="secondary"
            disabled={current <= 1}
            onClick={() => setCurrent(current - 1)}
            style={{ paddingLeft: 8 }}
          >
            <IconLeft />
            Back
          </Button>
          <Button
            disabled={current >= 3}
            onClick={() => setCurrent(current + 1)}
            style={{ marginLeft: 20, paddingRight: 8 }}
            type="primary"
          >
            Next
            <IconRight />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 780,
      }}
    >
      <Steps current={current}>
        <Steps.Step title="Succeeded" />
        <Steps.Step title="Processing" />
        <Steps.Step title="Pending" />
      </Steps>
      {renderContent(current)}
    </div>
  );
}
