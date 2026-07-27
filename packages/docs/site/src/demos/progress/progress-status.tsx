import React from 'react';
import { Progress, Space, Slider } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = React.useState(30);
  return (
    <div>
      <Space size={20}>
        <div style={{ width: '300px' }}>
          <Progress percent={value} color="#C9CDD4" formatText={() => 'Waiting...'} style={{ marginBottom: 20 }} />
          <br />
          <Progress
            percent={value}
            status="warning"
            formatText={(val) => `${val} / 100`}
            style={{ marginBottom: 20 }}
          />
          <br />
          <Progress percent={value} buffer />
        </div>
        <div style={{ width: '300px' }}>
          <Progress percent={value} status="error" style={{ marginBottom: 20 }} />
          <br />
          <Progress percent={value} status="success" style={{ marginBottom: 20 }} />
          <br />
          <Progress percent={value} showText={false} />
        </div>
      </Space>
      <div style={{ marginTop: 40 }}>
        <Slider value={value} onChange={setValue} style={{ width: 100 }}></Slider>
      </div>
    </div>
  );
}
