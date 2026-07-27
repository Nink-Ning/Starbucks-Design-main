import { Result, Button, Typography } from '@sbux/starbucks-design-react';
import { IconFaceFrownFill } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <div>
      <Result
        status="error"
        icon={<IconFaceFrownFill />}
        title="No internet"
        subTitle="DNS_PROBE_FINISHED_NO_INTERNET"
        extra={<Button type="primary">Refresh</Button>}
      >
        <Typography className="result-content" style={{ background: 'var(--color-fill-2)', padding: 24 }}>
          <Typography.Paragraph>Try:</Typography.Paragraph>
          <ul>
            <li> Checking the network cables, modem, and router </li>
            <li> Reconnecting to Wi-Fi </li>
          </ul>
        </Typography>
      </Result>
    </div>
  );
}
