import { ColorPicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <ColorPicker defaultValue={'#165DFF'} disabledAlpha />
      <br />
      <ColorPicker defaultValue={'#165DFF80'} disabledAlpha />
    </div>
  );
}
