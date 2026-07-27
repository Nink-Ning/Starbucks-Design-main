import { Timeline } from '@sbux/starbucks-design-react';

export default function Demo({ mode }) {
  return (
    <Timeline mode={mode} style={{ flex: 1 }}>
      <Timeline.Item label="2017-03-10">The first milestone</Timeline.Item>
      <Timeline.Item label="2018-05-12">The second milestone</Timeline.Item>
      <Timeline.Item label="2020-09-30">
        The third milestone
      </Timeline.Item>
    </Timeline>
  );
}
