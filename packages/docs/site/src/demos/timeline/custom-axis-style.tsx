import { Timeline, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Timeline>
        <Timeline.Item label="2017-03-10" lineType="dashed">
          The first milestone
          <br />
          <Typography.Text
            type="secondary"
            style={{
              fontSize: 12,
              marginTop: 4,
            }}
          >
            This is a descriptive message
          </Typography.Text>
        </Timeline.Item>
        <Timeline.Item label="2018-05-12" lineType="dashed">
          The second milestone
          <br />
          <Typography.Text
            type="secondary"
            style={{
              fontSize: 12,
              marginTop: 4,
            }}
          >
            This is a descriptive message
          </Typography.Text>
        </Timeline.Item>
        <Timeline.Item label="2020-09-30" lineType="dashed">
          The third milestone
          <br />
          <Typography.Text
            type="secondary"
            style={{
              fontSize: 12,
              marginTop: 4,
            }}
          >
            This is a descriptive message
          </Typography.Text>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
