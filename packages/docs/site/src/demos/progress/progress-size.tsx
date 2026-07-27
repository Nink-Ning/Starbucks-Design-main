import React from 'react';
import { Progress, Slider, Grid, Typography, Radio } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = React.useState(90);
  const [size, setSize] = React.useState('default');
  return (
    <div>
      <Grid.Row align="center" style={{ marginBottom: 44 }}>
        <Typography.Text>Size: &nbsp; &nbsp;</Typography.Text>
        <Radio.Group options={['small', 'default', 'large']} value={size} onChange={setSize} />
      </Grid.Row>
      <Grid.Row gutter={44} style={{ marginBottom: 44 }}>
        <Grid.Col span={7}>
          <div>
            <Progress
              color="#C9CDD4"
              percent={value}
              size={size}
              formatText={() => 'waiting...'}
              style={{
                marginBottom: 44
              }}
            />
          </div>
          <div>
            <Progress percent={value} size={size} status="error" />
          </div>
        </Grid.Col>
        <Grid.Col span={7}>
          <div>
            <Progress
              percent={value}
              size={size}
              style={{
                marginBottom: 44
              }}
            />
          </div>
          <div>
            <Progress percent={value} size={size} status="success" />
          </div>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Progress
          type="circle"
          size={size}
          percent={value}
          style={{
            margin: '0 20px'
          }}
        />
        <Progress
          type="circle"
          size={size}
          percent={value}
          status="error"
          style={{
            margin: '0 20px'
          }}
        />
        <Progress
          type="circle"
          size={size}
          percent={value}
          status="success"
          style={{
            margin: '0 20px'
          }}
        />
      </Grid.Row>
      <div style={{ width: 100, marginTop: 44 }}>
        <Slider value={value} onChange={setValue}></Slider>
      </div>
    </div>
  );
}
