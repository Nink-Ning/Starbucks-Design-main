import { Timeline, Tag } from '@sbux/starbucks-design-react';
import { IconCheckCircleFill } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Timeline>
      <Timeline.Item label={<Tag icon={<IconCheckCircleFill />}>Passed</Tag>}>
        Code Review
      </Timeline.Item>
    </Timeline>
  );
}
