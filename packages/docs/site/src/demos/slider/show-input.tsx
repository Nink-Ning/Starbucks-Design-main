import { Slider, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <>
      <Space size={60}>
        <Slider defaultValue={80} showInput style={{ width: 280 }} />
        <Slider defaultValue={[10, 80]} range showInput style={{ width: 360 }} />
      </Space>
      <Space style={{ marginTop: '20px' }} size={60}>
        <Slider
          defaultValue={80}
          showInput={{
            hideControl: false,
            style: {
              width: 80,
            },
          }}
          style={{ width: 280 }}
        />
        <Slider
          defaultValue={[10, 80]}
          showInput={{
            hideControl: false,
            style: {
              width: 80,
            },
          }}
          range
          style={{ width: 360 }}
        />
      </Space>
    </>
  );
}
