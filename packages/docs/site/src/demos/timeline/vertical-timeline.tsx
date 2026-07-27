import React from 'react';
import { Grid, Typography, Radio, Timeline } from '@sbux/starbucks-design-react';

export default function Demo() {

  const imageStyle = {
    margin: '0 12px 12px 12px'
  }

  const [mode, setMode] = React.useState('left');
  return (
    <div>
      <Grid.Row align="center" style={{ marginBottom: 24 }}>
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
      <Timeline mode={mode} labelPosition="relative">
        <Timeline.Item label="2012-08">
          <Grid.Row style={{ display: 'inline-flex', alignItems: 'center' }}>
            <img
              width="40"
              style={imageStyle}
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b5d834b83708a269b4562924436eac48.png~tplv-uwbnlip3yd-png.png"
            />
            <div style={{ marginBottom: 12 }}>
              Toutiao
              <div style={{ fontSize: 12, color: '#4E5969' }}>Founded in 2012</div>
            </div>
          </Grid.Row>
        </Timeline.Item>
        <Timeline.Item label="2017-05">
          <Grid.Row style={{ display: 'inline-flex', alignItems: 'center' }}>
            <img
              width="40"
              style={imageStyle}
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png"
            />
            <div style={{ marginBottom: 12 }}>
              Xigua Video
              <div style={{ fontSize: 12, color: '#4E5969' }}>Founded in 2017</div>
            </div>
          </Grid.Row>
        </Timeline.Item>
        <Timeline.Item label="2018-07">
          <Grid.Row style={{ display: 'inline-flex', alignItems: 'center' }}>
            <img
              width="40"
              style={imageStyle}
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/73a34d47f2885cf5182d755aa0c8a7d4.png~tplv-uwbnlip3yd-png.png"
            />
            <div style={{ marginBottom: 12 }}>
              Pipidance
              <div
                style={{
                  fontSize: 12,
                  color: '#4E5969',
                }}
              >
                Founded in 2018
              </div>
            </div>
          </Grid.Row>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
