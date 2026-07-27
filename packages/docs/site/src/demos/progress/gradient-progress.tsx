import { Progress } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Progress
        percent={80}
        color={{
          '0%': 'rgb(var(--primary-6))',
          '100%': 'rgb(var(--success-6))'
        }}
        animation
        width={300}
      />
      <br />
      <Progress
        percent={100}
        color={{
          '0%': 'rgb(var(--primary-6))',
          '100%': 'rgb(var(--success-6))'
        }}
        animation
        width={300}
      />
      <br />
      <br />
      <Progress
        style={{
          margin: '0 20px'
        }}
        type="circle"
        color={{
          '0%': 'rgb(var(--primary-6))',
          '100%': 'rgb(var(--success-6))'
        }}
        percent={80}
      />
      <Progress
        type="circle"
        color={{
          '0%': 'rgb(var(--primary-6))',
          '100%': 'rgb(var(--success-6))'
        }}
        percent={100}
      />
    </div>
  );
}
