import { Progress } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <div style={{ width: '40%', marginBottom: 20 }}>
        <Progress percent={30} trailColor="var(--color-primary-light-1)" />
      </div>
      <div style={{ width: '40%', marginBottom: 20 }}>
        <Progress steps={4} percent={30} trailColor="var(--color-primary-light-1)" />
      </div>
      <Progress percent={30} type="circle" trailColor="var(--color-primary-light-1)" />
    </div>
  );
}
