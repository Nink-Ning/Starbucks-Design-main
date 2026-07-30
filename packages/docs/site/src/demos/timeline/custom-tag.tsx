import { Timeline, Tag } from '@sbux/starbucks-design-react';
import { IconCheckCircleFill } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Timeline>
      <Timeline.Item label={<Tag icon={<IconCheckCircleFill />}>已上线</Tag>}>
        焦糖玛奇朵活动发布
      </Timeline.Item>
    </Timeline>
  );
}
