import { useState } from 'react';
import { Statistic, Switch, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Switch checked={loading} onChange={setLoading} />
        <Typography.Text style={{ margin: '0 10px' }}>Loading</Typography.Text>
      </div>
      <Statistic title="Downloads" value={125670} groupSeparator loading={loading} />
    </div>
  );
}
