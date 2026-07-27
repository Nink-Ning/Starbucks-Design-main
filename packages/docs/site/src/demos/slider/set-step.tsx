import { useState } from 'react';
import { Slider, Space, Typography, InputNumber, Switch } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [step, setStep] = useState(1);
  const [showTicks, setShowTicks] = useState(true);
  return (
    <div style={{ maxWidth: '40%', minWidth: '20%' }}>
      <Space style={{ marginBottom: 20, lineHeight: '32px' }} size={20}>
        <div>
          <Typography.Text style={{ margin: '0 4px' }}>step</Typography.Text>
          <InputNumber
            value={step}
            min={1}
            max={10}
            onChange={setStep}
            style={{ width: 68 }}
          />
        </div>
        <div>
          <Typography.Text style={{ margin: '0 4px'}}>showTicks</Typography.Text>
          <Switch checked={showTicks} onChange={setShowTicks} />
        </div>
      </Space>
      <div>
        <Typography.Text>0</Typography.Text>
        <Slider
          defaultValue={5}
          max={10}
          step={step}
          showTicks={showTicks}
          style={{
            width: 258,
            marginLeft:8,
            marginRight: 8,
            verticalAlign: 'middle',
          }}
        />
        <Typography.Text>10</Typography.Text>
      </div>
    </div>
  );
}
