import React from 'react';
import { Grid, Typography, Radio, Timeline } from '@sbux/starbucks-design-react';

export default function Demo() {

  const [mode, setMode] = React.useState('left');
  const [pos, setLabelPos] = React.useState('same');
  return (
    <div>
      <Grid.Row align="center">
        <Typography.Text>labelPosition: &nbsp; &nbsp;</Typography.Text>
        <Radio.Group
          value={pos}
          onChange={setLabelPos}
          options={[
            {
              label: 'same',
              value: 'same',
            },
            {
              label: 'relative',
              value: 'relative',
            },
          ]}
        />
      </Grid.Row>
      <Grid.Row align="center" style={{ margin: '20px 0 24px' }}>
        <Typography.Text>mode: &nbsp; &nbsp;</Typography.Text>
        <Radio.Group
          value={mode}
          onChange={setMode}
          options={[
            {
              label: 'left',
              value: 'left',
            },
            {
              label: 'right',
              value: 'right',
            },
            {
              label: 'alternate',
              value: 'alternate',
            },
          ]}
        />
      </Grid.Row>
      <Timeline mode={mode} labelPosition={pos}>
        <Timeline.Item label="2026-03-10" dotColor="var(--color-success)">
          春季拿铁配方确认
        </Timeline.Item>
        <Timeline.Item label="2026-05-12" dotColor="var(--color-danger)" labelPosition="same">
          冷萃物料配送延迟
        </Timeline.Item>
        <Timeline.Item label="2026-09-30">
          秋季会员活动上线
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
