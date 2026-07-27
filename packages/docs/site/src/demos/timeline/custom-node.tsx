import { Space, Timeline } from '@sbux/starbucks-design-react';
import { IconClockCircle, IconCheck } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size={40}>
      <Timeline>
        <Timeline.Item label="2020-04-12" dotColor="#00B42A">
          The first milestone
        </Timeline.Item>
        <Timeline.Item label="2020-05-17">The second milestone</Timeline.Item>
        <Timeline.Item
          label="2020-06-22"
          dot={<IconClockCircle style={{ fontSize: 12, color: '#F53F3F' }} />}
        >
          The third milestone
        </Timeline.Item>
        <Timeline.Item label="2020-06-22" dotColor="var(--color-fill-4)">
          The third milestone
        </Timeline.Item>
      </Timeline>

      <Timeline
      >
        <Timeline.Item
          label="2020-04-12"
          dot={
            <IconCheck
              style={{
                fontSize: 12,
                padding: 2,
                boxSizing: 'border-box',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light-1)',
              }}
            />
          }
        >
          The first milestone
        </Timeline.Item>
        <Timeline.Item
          label="2020-05-17"
          dot={
            <IconCheck
              style={{
                fontSize: 12,
                padding: 2,
                boxSizing: 'border-box',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light-1)',
              }}
            />
          }
        >
          The second milestone
        </Timeline.Item>
        <Timeline.Item label="2020-06-22">The third milestone</Timeline.Item>
        <Timeline.Item label="2020-06-22" dotColor="var(--color-fill-4)">
          The third milestone
        </Timeline.Item>
      </Timeline>

      <Timeline>
        <Timeline.Item label="2020-04-12">The first milestone</Timeline.Item>
        <Timeline.Item label="2020-05-17" dotColor="var(--color-fill-4)">
          The second milestone
        </Timeline.Item>
        <Timeline.Item label="2020-06-22" dotColor="var(--color-fill-4)">
          The third milestone
        </Timeline.Item>
      </Timeline>
    </Space>
  );
}
