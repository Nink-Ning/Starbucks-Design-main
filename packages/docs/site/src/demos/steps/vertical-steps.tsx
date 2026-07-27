import { useState } from 'react';
import { Steps, Divider, Button } from '@sbux/starbucks-design-react';
import { IconLeft, IconRight } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const [current, setCurrent] = useState(1);

  function renderContent(step) {
    return (
      <div
        style={{
          width: '100%',
          height: 272,
          textAlign: 'center',
          background: 'var(--color-bg-2)',
          color: '#C2C7CC',
        }}
      >
        <div style={{ lineHeight: '200px' }}>Step{step} Content</div>

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
        display: 'flex',
        maxWidth: 780,
        padding: 40,
        background: 'var(--color-fill-2)',
      }}
    >
      <div
        style={{
          background: 'var(--color-bg-2)',
          padding: 24,
          height: 272,
          boxSizing: 'border-box',
        }}
      >
        <Steps direction="vertical" current={current} style={{ width: 170 }}>
          <Steps.Step title="Succeeded" description="This is a description" />
          <Steps.Step title="Processing" description="This is a description" />
          <Steps.Step title="Pending" description="This is a description" />
        </Steps>
      </div>
      <Divider type="vertical" style={{ display: "block", height: "auto" }}/>
      {renderContent(current)}
    </div>
  );
}
