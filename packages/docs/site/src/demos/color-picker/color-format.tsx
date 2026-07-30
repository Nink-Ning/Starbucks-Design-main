import { useState } from 'react';
import { ColorPicker, Radio } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [format, setFormat] = useState('hex');

  return (
    <div>
      <Radio.Group
        type="button"
        mode="fill"
        name="size"
        value={format}
        onChange={setFormat}
        style={{ marginBottom: 24 }}
      >
        {['hex', 'rgb'].map((x) => {
          return (
            <Radio key={x} value={x}>
              {x}
            </Radio>
          );
        })}
      </Radio.Group>
      <div style={{ marginTop: 10 }} />
      <ColorPicker defaultValue={'#00754A'} showText format={format} />
    </div>
  );
}
