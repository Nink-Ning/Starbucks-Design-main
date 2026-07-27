import { Calendar } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <Calendar defaultValue="2020-04-01" />
    </div>
  );
}
