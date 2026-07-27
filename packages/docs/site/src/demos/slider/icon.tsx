import { useState } from 'react';
import { Slider, Space } from '@sbux/starbucks-design-react';
import { IconMute, IconSound } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const [value, setValue] = useState(10);
  return (
    <Space size={60}>
      <Space>
        <img
          style={{ width: 22, verticalAlign: 'bottom' }}
          src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/48872c084d77494ebc0ddd0892d97e3d~tplv-uwbnlip3yd-image.image"
        />
        <Slider defaultValue={50} style={{ width: 200 }} />
        <img
          style={{ width: 22, verticalAlign: 'bottom' }}
          src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/40b91e0c13cb4069976ae726da62aa75~tplv-uwbnlip3yd-image.image"
        />
      </Space>
      <Space>
        <IconMute
          style={{
            fontSize: 16,
            color: value > 0 ? 'var(--color-text-4)' : 'var(--color-text-1)',
          }}
        />
        <Slider value={value} onChange={setValue} style={{ width: 200 }} />
        <IconSound
          style={{
            fontSize: 16,
            color: value === 0 ? 'var(--color-text-4)' : 'var(--color-text-1)',
          }}
        />
      </Space>
    </Space>
  );
}
