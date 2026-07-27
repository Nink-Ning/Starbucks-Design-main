import { Slider, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size={60}>
      <Slider defaultValue={30} style={{ width: 200 }} />
      <Slider defaultValue={30} disabled={true} style={{ width: 200 }} />
    </Space>
  );
}
