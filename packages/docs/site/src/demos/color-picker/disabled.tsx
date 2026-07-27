import { ColorPicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <ColorPicker defaultValue={'#165DFF'} disabled />
      <div style={{ marginTop: 10 }} />
      <ColorPicker defaultValue={'#165DFF'} showText disabled />
    </div>
  );
}
