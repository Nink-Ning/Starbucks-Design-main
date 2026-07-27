import { useState } from 'react';
import { Radio, Space, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  return (
    <div>
      <Space size="large">
        <Radio checked={checked1} onChange={setChecked1}>
          controlled
        </Radio>
        <Radio checked>binding "true"</Radio>
        <Radio checked={checked2}>binding value2</Radio>
        <Radio defaultChecked>uncontrolled state</Radio>
      </Space>
      <div style={{ marginTop: 20 }}>
        <Space size="large">
          <Button type="primary" onClick={() => setChecked2(!checked2)}>
            {checked2 ? 'uncheck' : 'check'} value2
          </Button>
          <Button
            onClick={() => {
              setChecked1(false);
              setChecked2(false);
            }}
          >
            reset all
          </Button>
        </Space>
      </div>
    </div>
  );
}
