import { Timeline } from '@sbux/starbucks-design-react';
import { IconExclamationCircleFill } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <div>
      <Timeline>
        <Timeline.Item label="2017-03-10" dotColor="#00B42A">
          The first milestone
        </Timeline.Item>
        <Timeline.Item label="2018-05-22">The second milestone</Timeline.Item>
        <Timeline.Item label="2020-06-22" dotColor="#F53F3F">
          The third milestone
          <IconExclamationCircleFill
            style={{
              color: 'F53F3F',
              fontSize: 12,
              marginLeft: 4,
            }}
          />
        </Timeline.Item>
        <Timeline.Item label="2020-09-30" dotColor="#C9CDD4">
          The fourth milestone
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
