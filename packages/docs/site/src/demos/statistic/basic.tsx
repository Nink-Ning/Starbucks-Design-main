import { Statistic } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Statistic title="Downloads" value={125670} groupSeparator style={{ marginRight: 60 }} />
      <Statistic extra="Comments" value={40509} groupSeparator precision={2} />
    </div>
  );
}
