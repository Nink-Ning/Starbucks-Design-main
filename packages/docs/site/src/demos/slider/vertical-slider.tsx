import { useState } from 'react';
import { Slider, Space } from '@sbux/starbucks-design-react';
import { IconSound, IconMute } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const [value, setValue] = useState(10);
  return (
    <Space style={{ maxWidth: '60%', minWidth: '20%' }} size={100}>
      <div
        style={{
          width: 22,
          textAlign: 'center',
          display: 'inline-block',
        }}
      >
        <Slider value={value} onChange={setValue} vertical />
        {value ? <IconSound style={{ fontSize: 16, color: 'var(--color-text-1)' }} /> : null}
        {!value ? <IconMute style={{ fontSize: 16, color: 'var(--color-text-1)' }} /> : null}
      </div>
      <Slider
        range
        max={20}
        vertical
        defaultValue={[5, 10]}
        marks={{
          5: '5km',
          10: '10km',
        }}
        style={{ verticalAlign: 'top' }}
      />
    </Space>
  );
}
