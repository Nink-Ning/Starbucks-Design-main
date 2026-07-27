import { Alert } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Alert banner type="info" showIcon content="General text" style={{ marginTop: 4, marginBottom: 20 }} />
      <Alert banner type="info" showIcon closable content="General text" style={{ marginBottom: 20 }} />
      <Alert
        banner
        type="info"
        showIcon
        title="General text"
        content="Here is an example text"
        style={{ marginBottom: 20 }}
      />
      <Alert banner type="success" showIcon title="Success text" style={{ marginBottom: 20 }} />
    </div>
  );
}
