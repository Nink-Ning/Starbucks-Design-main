import { Statistic } from '@sbux/starbucks-design-react';
import { IconArrowRise, IconArrowFall } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <div>
      <Statistic
        title="New Users"
        value={192393}
        suffix={<IconArrowRise style={{ color: 'var(--color-danger)' }} />}
        style={{ marginRight: 60, marginBottom: 20 }}
      />
      <Statistic
        title="Active Users"
        value={934230}
        suffix={<IconArrowFall style={{ color: 'var(--color-success)' }} />}
        style={{ marginRight: 60, marginBottom: 20 }}
      />
      <Statistic
        title="User Growth Rate"
        value={50.32}
        precision={2}
        prefix={<IconArrowRise style={{ color: 'var(--color-danger)' }} />}
        suffix="%"
        styleValue={{ color: 'var(--color-danger)' }}
        style={{ marginRight: 60, marginBottom: 20 }}
      />
    </div>
  );
}
