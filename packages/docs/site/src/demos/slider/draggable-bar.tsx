import { Slider } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Slider
      style={{ width: 200 }}
      max={10}
      range={{
        draggableBar: true,
      }}
      defaultValue={[3, 6]}
    />
  );
}
